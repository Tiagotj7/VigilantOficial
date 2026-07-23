import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateMonitorDto } from './dto/create-monitor.dto';

@Injectable()
export class MonitorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(organizationId: string) {
    return this.prisma.monitor.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(organizationId: string, id: string) {
    const monitor = await this.prisma.monitor.findFirst({
      where: { id, organizationId },
      include: {
        checks: { orderBy: { checkedAt: 'desc' }, take: 20 },
        incidents: { orderBy: { startedAt: 'desc' }, take: 10 },
      },
    });

    if (!monitor) {
      throw new NotFoundException(`Monitor ${id} não encontrado.`);
    }

    return monitor;
  }

  create(organizationId: string, dto: CreateMonitorDto) {
    return this.prisma.monitor.create({
      data: {
        organizationId,
        name: dto.name.trim(),
        target: dto.target.trim(),
        kind: dto.kind ?? 'WEB',
        intervalSec: dto.intervalSec ?? 60,
      },
    });
  }

  async remove(organizationId: string, id: string) {
    const existing = await this.prisma.monitor.findFirst({
      where: { id, organizationId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException(`Monitor ${id} não encontrado.`);
    }

    await this.prisma.monitor.delete({ where: { id } });
    return { success: true };
  }

  /** Métricas agregadas reais para os cards do dashboard. */
  async stats(organizationId: string) {
    const monitors = await this.prisma.monitor.findMany({
      where: { organizationId },
      select: {
        status: true,
        lastLatencyMs: true,
        uptimePct: true,
      },
    });

    const activeIncidents = await this.prisma.incident.count({
      where: {
        monitor: { organizationId },
        status: { not: 'RESOLVED' },
      },
    });

    const total = monitors.length;
    const online = monitors.filter((m) => m.status === 'ONLINE').length;

    const latencies = monitors
      .map((m) => m.lastLatencyMs)
      .filter((v): v is number => typeof v === 'number');
    const avgLatencyMs = latencies.length
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
      : null;

    const avgUptimePct = total
      ? monitors.reduce((sum, m) => sum + Number(m.uptimePct), 0) / total
      : null;

    return {
      totalMonitors: total,
      onlineMonitors: online,
      avgLatencyMs,
      avgUptimePct,
      activeIncidents,
    };
  }

  /** Atividade recente real, derivada de incidentes e monitores criados. */
  async recentActivity(organizationId: string) {
    const [incidentUpdates, recentMonitors] = await Promise.all([
      this.prisma.incidentUpdate.findMany({
        where: { incident: { monitor: { organizationId } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { incident: { include: { monitor: true } } },
      }),
      this.prisma.monitor.findMany({
        where: { organizationId },
        orderBy: { createdAt: 'desc' },
        take: 3,
        select: { name: true, createdAt: true },
      }),
    ]);

    const fromIncidents = incidentUpdates.map((u) => ({
      title: u.incident.monitor.name,
      subtitle: u.message,
      time: u.createdAt.toISOString(),
      tone:
        u.status === 'RESOLVED'
          ? ('ok' as const)
          : u.status === 'INVESTIGATING'
            ? ('danger' as const)
            : ('warn' as const),
    }));

    const fromMonitors = recentMonitors.map((m) => ({
      title: m.name,
      subtitle: 'Novo monitoramento criado',
      time: m.createdAt.toISOString(),
      tone: 'info' as const,
    }));

    return [...fromIncidents, ...fromMonitors]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 6);
  }
}
