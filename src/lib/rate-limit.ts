import "server-only";

/**
 * Small in-memory sliding-window rate limiter for the contact form.
 *
 * Honest scope note: this state is per serverless instance — it resets on
 * cold starts and isn't shared between concurrent instances. For a
 * portfolio contact form that's fine: bursts from one source land on the
 * warm instance and get cut off, and Resend's 100/day plan cap bounds the
 * absolute worst case. If real abuse ever shows up, swap this for a
 * shared store (e.g. Upstash Redis) behind the same function signature.
 */

/** Max submissions per IP within the window. */
const PER_IP_LIMIT = 3;
const PER_IP_WINDOW_MS = 15 * 60 * 1_000;
/** Safety net across all IPs on this instance. */
const GLOBAL_LIMIT = 50;
const GLOBAL_WINDOW_MS = 24 * 60 * 60 * 1_000;

const perIp = new Map<string, number[]>();
const globalHits: number[] = [];

function prune(hits: number[], windowMs: number, now: number): number[] {
  const cutoff = now - windowMs;
  return hits.filter((t) => t > cutoff);
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  const recentGlobal = prune(globalHits, GLOBAL_WINDOW_MS, now);
  globalHits.length = 0;
  globalHits.push(...recentGlobal);
  if (globalHits.length >= GLOBAL_LIMIT) return true;

  const recentForIp = prune(perIp.get(ip) ?? [], PER_IP_WINDOW_MS, now);
  if (recentForIp.length >= PER_IP_LIMIT) {
    perIp.set(ip, recentForIp);
    return true;
  }

  recentForIp.push(now);
  perIp.set(ip, recentForIp);
  globalHits.push(now);

  // Keep the map from growing unbounded on a long-lived instance.
  if (perIp.size > 1_000) {
    for (const [key, hits] of perIp) {
      if (prune(hits, PER_IP_WINDOW_MS, now).length === 0) perIp.delete(key);
    }
  }

  return false;
}
