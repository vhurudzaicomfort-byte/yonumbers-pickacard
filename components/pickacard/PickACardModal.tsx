"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { Coin } from "@/components/brand/Coin";
import { GridPanel } from "./Panels";
import { IntroPanel } from "./IntroPanel";
import { usePickACard } from "./PickACardProvider";
import { usePlayState, DAILY_PICK_LIMIT } from "@/lib/pointsStore";
import { useSound, useMuted } from "@/lib/useSound";

const Icon = {
  close: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  soundOn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  ),
  soundOff: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </svg>
  ),
};

export function PickACardModal({ intro = false }: { intro?: boolean }) {
  const { close } = usePickACard();
  const play = usePlayState();
  const sound = useSound();
  const [muted, toggleMuted] = useMuted();
  const reduced = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [points, setPoints] = useState(play.points);

  const picksLeft = Math.max(0, DAILY_PICK_LIMIT - play.picksToday);
  // Show the welcome/qualify beat only on an intro open when the user can play.
  const [phase, setPhase] = useState<"intro" | "play">(intro ? "intro" : "play");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    sound("open");
  }, [sound]);

  // Respect users who are already out of picks — skip the qualify message.
  useEffect(() => {
    if (phase === "intro" && picksLeft <= 0) setPhase("play");
  }, [phase, picksLeft]);

  useEffect(() => setPoints(play.points), [play.points]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound("close");
        close();
        return;
      }
      if (e.key === "Tab" && sheetRef.current) {
        const f = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>("button, input")?.focus());
    return () => document.removeEventListener("keydown", onKey);
  }, [close, sound]);

  const dismiss = () => {
    sound("close");
    close();
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-stretch justify-center" role="dialog" aria-modal="true" aria-label="Pick a Card and Win">
      <motion.button
        aria-label="Close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-navy-900/55 backdrop-blur-md"
      />

      <motion.div
        ref={sheetRef}
        initial={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative z-10 flex h-[100svh] w-full max-w-[460px] flex-col overflow-hidden bg-surface shadow-card sm:h-[min(100svh,900px)] sm:my-auto sm:rounded-[24px]"
      >
        {/* navy chrome header */}
        <header
          className="flex shrink-0 items-center justify-between gap-2 bg-navy-700 px-4 py-3"
          style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
          <Logo variant="white" className="w-12 shrink-0" priority />
          <div className="flex items-center gap-1.5 rounded-pill bg-white/12 px-3 py-1.5">
            <span className="font-display text-sm font-extrabold tabular-nums text-white">{points.toLocaleString()}</span>
            <Coin className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleMuted} aria-label={muted ? "Unmute sounds" : "Mute sounds"} aria-pressed={muted} className="grid h-9 w-9 place-items-center rounded-pill bg-white/12 text-white transition hover:bg-white/20">
              {muted ? Icon.soundOff : Icon.soundOn}
            </button>
            <button onClick={dismiss} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-pill bg-white/12 text-white transition hover:bg-white/20">
              {Icon.close}
            </button>
          </div>
        </header>

        {/* body — fills the space between header and footer, never scrolls */}
        {phase === "intro" ? (
          <IntroPanel onPlay={() => setPhase("play")} onDismiss={dismiss} />
        ) : (
          <GridPanel onPointsChange={setPoints} onClose={dismiss} />
        )}

        {/* Econet co-brand line */}
        <div
          className="flex shrink-0 items-center justify-center gap-2 bg-navy-700 py-2.5"
          style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
        >
          <span className="relative block h-4 w-16">
            <Image src="/brand/logo-econet.png" alt="Econet Wireless" fill sizes="64px" className="object-contain" />
          </span>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
