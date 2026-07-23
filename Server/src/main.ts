import { createApp, logStartup } from './bootstrap';

async function bootstrap() {
  const app = await createApp();
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  logStartup(port);
}

void bootstrap();
