import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { AuthenticatedUser } from './supabase-auth.guard';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // O SupabaseAuthGuard já garantiu que request.user existe antes do
    // controller ser executado.
    return request.user as AuthenticatedUser;
  },
);
