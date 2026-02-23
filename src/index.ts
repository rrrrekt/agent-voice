import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

import { createApp } from './app.js';

const app = createApp();
const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, '🎙️  agent-voice listening');
});

function shutdown(signal: string) {
  logger.info({ signal }, 'Shutting down...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
