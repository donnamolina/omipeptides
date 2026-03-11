const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const FALLBACK_DOP_RATE = 63;

let cachedRate: number | null = null;
let cachedAt = 0;

export async function getDopRate(): Promise<number> {
  const now = Date.now();
  if (cachedRate !== null && now - cachedAt < CACHE_DURATION_MS) {
    return cachedRate;
  }

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const rate = data?.rates?.DOP;
    if (typeof rate === "number" && rate > 0) {
      cachedRate = rate;
      cachedAt = now;
      return rate;
    }
    throw new Error("Invalid rate data");
  } catch {
    cachedRate = FALLBACK_DOP_RATE;
    cachedAt = now;
    return FALLBACK_DOP_RATE;
  }
}
