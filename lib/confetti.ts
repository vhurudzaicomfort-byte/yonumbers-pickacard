"use client";

import confetti from "canvas-confetti";

/** Celebratory burst. No-op under reduced-motion. */
export function fireConfetti() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const colors = ["#FFD217", "#E546FF", "#67EB00", "#FF60D2", "#7654FD"];
  const shoot = (particleRatio: number, opts: confetti.Options) =>
    confetti({
      origin: { y: 0.55 },
      colors,
      disableForReducedMotion: true,
      particleCount: Math.floor(160 * particleRatio),
      ...opts,
    });
  shoot(0.25, { spread: 26, startVelocity: 55 });
  shoot(0.2, { spread: 60 });
  shoot(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
  shoot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  shoot(0.1, { spread: 120, startVelocity: 45 });
}
