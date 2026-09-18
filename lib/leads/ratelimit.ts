/** In-memory token buckets keyed by client IP (single pm2 instance). */
type Bucket = { tokens: number; updated: number };

const buckets10m = new Map<string, Bucket>();
const bucketsDay = new Map<string, Bucket>();

function take(map: Map<string, Bucket>, key: string, capacity: number, refillMs: number): boolean {
  const now = Date.now();
  const b = map.get(key) ?? { tokens: capacity, updated: now };
  const refill = ((now - b.updated) / refillMs) * capacity;
  b.tokens = Math.min(capacity, b.tokens + refill);
  b.updated = now;
  if (b.tokens < 1) {
    map.set(key, b);
    return false;
  }
  b.tokens -= 1;
  map.set(key, b);
  if (map.size > 5000) {
    // crude eviction of stale keys
    for (const [k, v] of map) if (now - v.updated > refillMs) map.delete(k);
  }
  return true;
}

export function allow(ip: string): boolean {
  const per10 = Number(process.env.RATE_LIMIT_PER_10MIN ?? 5);
  const perDay = Number(process.env.RATE_LIMIT_PER_DAY ?? 20);
  return take(buckets10m, ip, per10, 10 * 60 * 1000) && take(bucketsDay, ip, perDay, 24 * 60 * 60 * 1000);
}
