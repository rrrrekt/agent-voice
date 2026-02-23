// Simple in-memory metrics store (resets on restart)
export const metrics = {
  requests: {
    total: 0,
    success: 0,
    failed: 0,
    throttled_429: 0,
  },
  usage: {
    characters_processed: 0,
    audio_seconds_generated: 0, // approximate based on char count or mp3 length
  },
  last_activity: Date.now(),
  start_time: Date.now(),
};

export function recordRequest(chars: number) {
  metrics.requests.total++;
  metrics.usage.characters_processed += chars;
  metrics.last_activity = Date.now();
}

export function recordSuccess() {
  metrics.requests.success++;
}

export function recordError(status: number) {
  metrics.requests.failed++;
  if (status === 429) {
    metrics.requests.throttled_429++;
  }
}

export function getMetrics() {
  const uptime = Math.floor((Date.now() - metrics.start_time) / 1000);
  return { ...metrics, uptime_seconds: uptime };
}
