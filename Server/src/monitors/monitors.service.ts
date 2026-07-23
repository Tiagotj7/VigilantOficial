import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MonitorsService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: quando o Supabase Auth estiver plugado, filtrar por
  // organizationId derivado do usuário autenticado (guard/decorator),
  // em vez de aceitar qualquer organizationId vindo da query.
  findAll(organizationId: string) {
    return this.prisma.monitor.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const monitor = await this.prisma.monitor.findUnique({
      where: { id },
      include: {
        checks: { orderBy: { checkedAt: 'desc' }, take: 20 },
        incidents: { orderBy: { startedAt: 'desc' }, take: 10 },
      },
    });

    if (!monitor) {
      throw new NotFoundException(`Monitor ${id} não encontrado`);
    }

    return monitor;
  }
}
