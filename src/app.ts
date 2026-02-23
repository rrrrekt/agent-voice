import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createRequire } from 'module';
import { logger } from './index.js';
import healthRouter from './routes/health.js';
import speechRouter from './routes/speech.js';
import { getMetrics } from './services/metrics.js';

const require = createRequire(import.meta.url);
// pino-http CJS module — use require to avoid ESM interop issues with its type declarations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildPinoHttp = require('pino-http') as (opts: Record<string, unknown>) => any;

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(buildPinoHttp({ logger }));

  app.use(healthRouter);
  app.use(speechRouter);

  // Simple metrics endpoint
  app.get('/metrics', (req, res) => {
    res.json(getMetrics());
  });

  return app;
}
