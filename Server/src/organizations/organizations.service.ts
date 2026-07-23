import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthenticatedUser } from '../auth/supabase-auth.guard';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retorna o id da organização "principal" do usuário autenticado.
   *
   * Fluxo normal: signup no Supabase Auth dispara um trigger no banco
   * (ver prisma/migrations) que já cria profile + organization +
   * membership. Este método é o fallback idempotente para quando, por
   * qualquer motivo (trigger ainda não aplicado, usuário criado antes
   * dele existir etc.), esses registros não existirem — nunca aceitamos
   * um organizationId vindo do cliente.
   */
  async resolveOrganizationId(user: AuthenticatedUser): Promise<string> {
    await this.prisma.profile.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email ?? `${user.id}@sem-email.local`,
      },
    });

    const membership = await this.prisma.membership.findFirst({
      where: { profileId: user.id },
      orderBy: { createdAt: 'asc' },
    });

    if (membership) {
      return membership.organizationId;
    }

    const slug = `org-${user.id.slice(0, 8)}`;

    const organization = await this.prisma.organization.create({
      data: {
        name: 'Meu workspace',
        slug,
        members: {
          create: {
            profileId: user.id,
            role: 'OWNER',
          },
        },
      },
    });

    return organization.id;
  }
}
