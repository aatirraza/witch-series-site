/** localStorage keys. These match the original site so returning visitors keep their progress. */
export const STORAGE = {
  matchBest: "ws_mbest",
  matchDone: "ws_mdone",
  secrets: "ws_secrets",
  memories: "ws_mems",
  threads: "ws_threads",
  sound: "ws_sound",
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
