export function formatViewCount(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M views`;
  if (n >= 10_000) return `${Math.round(n / 1000)}K views`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K views`;
  return `${n.toLocaleString()} views`;
}

export function formatCount(n: number, suffix: string): string {
  if (!Number.isFinite(n)) return "—";
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v >= 10 ? Math.round(v) : v.toFixed(1)}M ${suffix}`;
  }
  if (n >= 10_000) return `${Math.round(n / 1000)}K ${suffix}`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K ${suffix}`;
  return `${n.toLocaleString()} ${suffix}`;
}
