/** Haptic-style feedback via the Vibration API where available. */
export function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
    return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignored */
  }
}
