import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/** Cria a aplicação sem iniciar uma porta, para uso local e serverless. */
export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  return app;
}

export function logStartup(port: number) {
  new Logger('Bootstrap').log(`API disponível na porta ${port}`);
}
