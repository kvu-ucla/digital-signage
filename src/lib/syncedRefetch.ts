/**
 * Calculate delay until next 3-minute wall-clock mark (:00, :03, :06, :09...)
 * Used to synchronize refetch intervals across all clients.
 */
export function getDelayToNext3MinMark(): number {
  const now = new Date();
  const totalSeconds = now.getMinutes() * 60 + now.getSeconds();
  const secondsInto3MinBlock = totalSeconds % 180; // 180 seconds = 3 minutes
  const secondsUntilNext = 180 - secondsInto3MinBlock;
  return secondsUntilNext * 1000;
}
