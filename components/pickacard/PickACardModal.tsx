"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Coin } from "@/components/brand/Coin";
import { IntroPanel, AuthPanel, OtpPanel, GridPanel } from "./Panels";
import { usePickACard } from "./PickACardProvider";
import { usePlayState, playStore } from "@/lib/pointsStore";
import { useSound, useMuted } from "@/lib/useSound";
import { cn } from "@/lib/cn";

type Phase = "intro" | "auth" | "otp" | "grid";

const Icon = {
  close: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  soundOn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  ),
  soundOff: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M22 9l-6 6M16 9l6 6" />
    </svg>
  ),
};

export function PickACardModal() {
  const { close } = usePickACard();
  const play = usePlayState();
  const sound = useSound();
  const [muted, toggleMuted] = useMuted();
  const reduced = useReducedMotion();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const [phase, setPhase] = useState<Phase>(() => (playStore.get().authed ? "grid" : "intro"));
  const [points, setPoints] = useState(play.points);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    sound("open");
  }, [sound]);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC to close + focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound("close");
        close();
        return;
      }
      if (e.key === "Tab" && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
    // initial focus
    requestAnimationFrame(() => {
      sheetRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    });
    return () => document.removeEventListener("keydown", onKey);
  }, [close, sound]);

  const dismiss = () => {
    sound("close");
    close();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Pick a Card and Win"
    >
      {/* backdrop */}
      <motion.button
        aria-label="Close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={dismiss}
        className="absolute inset-0 cursor-default bg-navy-900/55 backdrop-blur-md"
      />

      {/* sheet */}
      <motion.div
        ref={sheetRef}
        initial={reduced ? { opacity: 0 } : { y: "100%", scale: 0.96, opacity: 0.6 }}
        animate={reduced ? { opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
        exit={reduced ? { opacity: 0 } : { y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        drag={reduced ? false : "y"}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 700) dismiss();
        }}
        className={cn(
          "relative z-10 flex max-h-[94dvh] w-full flex-col overflow-hidden bg-grad-game shadow-card",
          "rounded-t-card sm:max-w-[440px] sm:rounded-card",
        )}
      >
        {/* drag handle (mobile) */}
        <div className="flex justify-center pt-2 sm:hidden">
          <span className="h-1.5 w-12 rounded-pill bg-white/40" />
        </div>

        {/* portal-style chrome header */}
        <header className="flex items-center justify-between gap-2 px-4 py-3">
          <Logo variant="white" className="w-10" />
          <div className="flex items-center gap-1 rounded-pill bg-white/15 px-3 py-1.5">
            <span className="font-display text-sm font-extrabold tabular-nums text-white">
              {points.toLocaleString()}
            </span>
            <Coin className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleMuted}
              aria-label={muted ? "Unmute sounds" : "Mute sounds"}
              aria-pressed={muted}
              className="grid h-9 w-9 place-items-center rounded-pill bg-white/15 text-white transition hover:bg-white/25"
            >
              {muted ? Icon.soundOff : Icon.soundOn}
            </button>
            <button
              onClick={dismiss}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-pill bg-white/15 text-white transition hover:bg-white/25"
            >
              {Icon.close}
            </button>
          </div>
        </header>

        {/* game core — phases animate between, no route change */}
        <div className="no-scrollbar flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
            >
              {phase === "intro" && (
                <IntroPanel onPlay={() => setPhase(playStore.get().authed ? "grid" : "auth")} />
              )}
              {phase === "auth" && (
                <AuthPanel
                  onAuthed={(phone) => {
                    playStore.setAuthed(false, phone);
                    setPhase("otp");
                  }}
                />
              )}
              {phase === "otp" && (
                <OtpPanel
                  phone={playStore.get().phone}
                  onVerified={() => {
                    playStore.setAuthed(true);
                    setPhase("grid");
                  }}
                />
              )}
              {phase === "grid" && (
                <GridPanel onPointsChange={setPoints} onClose={dismiss} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
