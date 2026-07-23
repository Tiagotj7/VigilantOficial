import { MonitorKind } from '@prisma/client';

export class CreateMonitorDto {
  name!: string;
  target!: string;
  kind?: MonitorKind;
  intervalSec?: number;
}

/** Validação manual simples (sem class-validator, para não crescer deps). */
export function assertValidCreateMonitorDto(
  body: unknown,
): asserts body is CreateMonitorDto {
  if (typeof body !== 'object' || body === null) {
    throw new Error('Corpo da requisição inválido.');
  }

  const b = body as Record<string, unknown>;

  if (typeof b.name !== 'string' || b.name.trim().length < 2) {
    throw new Error('Informe um nome válido para o monitor.');
  }

  if (typeof b.target !== 'string' || b.target.trim().length < 3) {
    throw new Error('Informe um alvo válido (URL, host:porta ou IP).');
  }

  const validKinds = ['WEB', 'DB', 'VPS', 'TCP'];
  if (b.kind !== undefined && !validKinds.includes(b.kind as string)) {
    throw new Error('Tipo de monitor inválido.');
  }

  if (
    b.intervalSec !== undefined &&
    (typeof b.intervalSec !== 'number' || b.intervalSec < 10)
  ) {
    throw new Error('Intervalo de checagem inválido (mínimo 10s).');
  }
}
