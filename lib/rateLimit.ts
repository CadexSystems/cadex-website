/**
 * Lightweight in-memory rate limiter for Next.js API routes.
 *
 * Works per-serverless-instance (no Redis required). Warm Vercel instances
 * persist the store between requests, so this stops the vast majority of
 * spam. For cross-instance enforcement, swap the store for Upstash Redis.
 */

interface Entry {
  count: number;
  resetAt: number;
}

// Module-level store — shared across requests on the same warm instance
const store = new Map<string, Entry>();

// Sweep stale entries periodically to prevent unbounded memory growth
function sweep() {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

let lastSweep = Date.now();

/**
 * @param ip      Identifier (IP address or any string key)
 * @param limit   Max requests allowed in the window
 * @param windowMs Window size in milliseconds
 * @returns `{ allowed: boolean; remaining: number; resetAt: number }`
 */
export function rateLimit(
  ip: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  // Sweep every 5 minutes
  if (now - lastSweep > 5 * 60 * 1000) {
    sweep();
    lastSweep = now;
  }

  const existing = store.get(ip);

  if (!existing || existing.resetAt <= now) {
    // New window
    const entry: Entry = { count: 1, resetAt: now + windowMs };
    store.set(ip, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Extracts the best available IP from a Next.js Request.
 */
export function getIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
