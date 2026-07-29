/**
 * Tiny localStorage wrapper for surviving full page reloads (e.g. PlaceOS
 * playlists reload the app every rotation). Raw fetched text is cached and
 * re-parsed on boot so screens paint immediately with the last-known menu
 * while react-query refetches fresh data in the background.
 *
 * All calls are try/catch-guarded: kiosk webviews with storage disabled just
 * fall back to the normal loading path.
 */

const PREFIX = "signage-cache:";

export function readCache(key: string): string | null {
  try {
    return localStorage.getItem(PREFIX + key);
  } catch {
    return null;
  }
}

export function writeCache(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, value);
  } catch {
    // storage unavailable or full — persisting is best-effort
  }
}
