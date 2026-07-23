import type { Request, Response } from 'express';
import { createApp } from '../src/bootstrap';

type ExpressHandler = (request: Request, response: Response) => void;

// A instância fica em cache enquanto a função serverless estiver quente.
// Isso evita reconectar o Prisma e reinicializar o Nest a cada requisição.
let handlerPromise: Promise<ExpressHandler> | undefined;

async function getHandler(): Promise<ExpressHandler> {
  if (!handlerPromise) {
    handlerPromise = createApp()
      .then(async (app) => {
        await app.init();
        return app.getHttpAdapter().getInstance() as ExpressHandler;
      })
      .catch((error: unknown) => {
        handlerPromise = undefined;
        throw error;
      });
  }

  return handlerPromise;
}

export default async function handler(request: Request, response: Response) {
  const app = await getHandler();
  return app(request, response);
}
