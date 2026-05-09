const RECENT_KEY = "mh_recent_searches";
const MAX_RECENT = 8;

export function loadRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRecent(query: string) {
  const prev = loadRecent().filter((q) => q !== query);
  const recent = [query, ...prev].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  return recent;
}
