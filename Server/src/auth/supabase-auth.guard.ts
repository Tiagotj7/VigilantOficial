import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { Request } from 'express';

export interface AuthenticatedUser {
  id: string;
  email: string | null;
}

declare module 'express' {
  interface Request {
    user?: AuthenticatedUser;
  }
}

// JWKS é cacheado e reutilizado entre requisições (busca as chaves públicas
// do Supabase só quando necessário / quando expira o cache interno do jose).
let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function getJwks() {
  if (!jwks) {
    const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL não configurada no ambiente.');
    }

    // SUPABASE_JWKS_URL é opcional: a URL pública é derivada do projeto.
    const jwksUrl =
      process.env.SUPABASE_JWKS_URL ??
      `${supabaseUrl}/auth/v1/.well-known/jwks.json`;
    jwks = createRemoteJWKSet(new URL(jwksUrl));
  }
  return jwks;
}

/**
 * Protege rotas exigindo um Bearer token válido emitido pelo Supabase Auth.
 * A assinatura é verificada criptograficamente contra o JWKS público do
 * projeto — o backend nunca confia em um userId/organizationId vindo do
 * corpo/query da requisição.
 */
@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de acesso ausente.');
    }

    const token = authHeader.slice('Bearer '.length).trim();

    try {
      const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
      if (!supabaseUrl) {
        throw new Error('SUPABASE_URL não configurada no ambiente.');
      }

      const { payload } = await jwtVerify(token, getJwks(), {
        issuer: `${supabaseUrl}/auth/v1`,
        audience: 'authenticated',
      });

      if (!payload.sub) {
        throw new UnauthorizedException('Token inválido.');
      }

      request.user = {
        id: payload.sub,
        email: typeof payload.email === 'string' ? payload.email : null,
      };

      return true;
    } catch (error) {
      this.logger.warn(`Falha ao validar token: ${(error as Error).message}`);
      throw new UnauthorizedException('Token de acesso inválido ou expirado.');
    }
  }
}
