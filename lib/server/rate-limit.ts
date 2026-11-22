import "server-only";

/**
 * Limitation de débit en mémoire (fenêtre glissante).
 * Suffisant pour une instance unique. En production multi-instance ou serverless,
 * remplacer par un stockage partagé (Upstash Redis...) : voir .agents/rules/security.md.
 */

const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
  return true;
}
