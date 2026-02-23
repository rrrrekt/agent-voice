import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_API_KEY: z.string().min(1, 'GOOGLE_API_KEY is required'),
  PORT: z.string().default('3400').transform((v) => parseInt(v, 10)),
  ALFRED_VOICE: z.string().default('Kore'),
  NODE_ENV: z.string().default('development'),
});

function loadEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();
export type Env = typeof env;
