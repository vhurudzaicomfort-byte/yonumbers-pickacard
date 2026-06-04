"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Lockup } from "@/components/brand/Lockup";
import { EconetFooter } from "@/components/brand/EconetFooter";
import { Button } from "@/components/ui/Button";
import { PillToggle } from "@/components/ui/PillToggle";
import { PhoneInput, isValidPhone } from "@/components/ui/PhoneInput";
import { PackageSelector } from "@/components/ui/PackageSelector";
import { OtpInput } from "@/components/ui/OtpInput";
import { TreasureCard, type CardState } from "@/components/game/TreasureCard";
import { RewardPanel } from "@/components/game/RewardPanel";
import { GRID_SIZE, pickCard } from "@/lib/gameService";
import { sendOtp, verifyOtp, OTP_LENGTH, OTP_TTL_SECONDS, DEV_OTP, type SentOtp } from "@/lib/otpService";
import { playStore } from "@/lib/pointsStore";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import { cn } from "@/lib/cn";
import type { AuthMode, PackageOption, PickResult } from "@/lib/types";

/* ------------------------------------------------------------------ Intro */

export function IntroPanel({ onPlay }: { onPlay: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-8 text-center">
      <Lockup variant="white" className="w-[78%] max-w-[300px]" priority />
      <div className="font-display font-extrabold uppercase tracking-wide text-white">
        <p className="text-lg text-gold-300">Airtime, Data &amp; More!</p>
        <p className="mt-1 text-sm text-white/90">
          Every card hides a reward. Play now &amp; see what&rsquo;s waiting for you.
        </p>
      </div>
      <Button variant="green" size="lg" className="mt-2 w-full max-w-[280px]" onClick={onPlay}>
        Play &amp; Win Now
      </Button>
      <EconetFooter action="play" tone="game" className="mt-2" />
    </div>
  );
}

/* ------------------------------------------------------------------- Auth */

export function AuthPanel({ onAuthed }: { onAuthed: (phone: string) => void }) {
  const [mode, setMode] = useState<AuthMode>("subscribe");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState<PackageOption["id"] | null>("daily");
  const valid = isValidPhone(phone) && (mode === "login" || !!pkg);

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-7">
      <Lockup variant="white" className="w-[60%] max-w-[230px]" />
      <PillToggle value={mode} onChange={setMode} />
      <PhoneInput value={phone} onChange={setPhone} />
      <AnimatePresence mode="wait">
        {mode === "subscribe" ? (
          <motion.div
            key="pkg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden"
          >
            <PackageSelector value={pkg} onChange={setPkg} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Button
        variant={mode === "subscribe" ? "green" : "gold"}
        size="lg"
        disabled={!valid}
        className="mt-1 w-full max-w-[280px]"
        onClick={() => onAuthed(phone)}
      >
        {mode === "subscribe" ? "Subscribe Now" : "Login Now"}
      </Button>
      <EconetFooter action={mode} tone="game" className="mt-1" />
    </div>
  );
}

/* -------------------------------------------------------------------- OTP */

type OtpStage = "entry" | "success" | "error";

export function OtpPanel({
  phone,
  onVerified,
}: {
  phone: string;
  onVerified: () => void;
}) {
  const [sent, setSent] = useState<SentOtp | null>(null);
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<OtpStage>("entry");
  const [remaining, setRemaining] = useState(OTP_TTL_SECONDS);
  const [busy, setBusy] = useState(false);
  const play = useSound();

  const startTimer = () => setRemaining(OTP_TTL_SECONDS);

  useEffect(() => {
    void sendOtp("+263" + phone).then(setSent);
    startTimer();
  }, [phone]);

  useEffect(() => {
    if (stage !== "entry") return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [stage]);

  const confirm = async () => {
    setBusy(true);
    const ok = await verifyOtp(code, sent);
    setBusy(false);
    if (ok) {
      setStage("success");
      play("win");
      vibrate([15, 30, 15]);
    } else {
      setStage("error");
      play("lose");
      vibrate(40);
    }
  };

  const retry = async () => {
    setCode("");
    setStage("entry");
    setSent(await sendOtp("+263" + phone));
    startTimer();
  };

  if (stage !== "entry") {
    const ok = stage === "success";
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-9 text-center">
        <h2 className="font-display text-2xl font-extrabold uppercase text-outline-magenta">
          OTP Verification
        </h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 14 }}
          className={cn("relative h-28 w-28", !ok && "animate-shake")}
        >
          <Image src={ok ? "/brand/otp-success.png" : "/brand/otp-error.png"} alt={ok ? "Success" : "Error"} fill sizes="112px" className="object-contain" />
        </motion.div>
        <div className="font-display font-extrabold uppercase text-white">
          <p className="text-2xl text-outline-magenta">{ok ? "Success!" : "Error!"}</p>
          <p className="mt-2 text-sm font-bold normal-case text-white/90">
            {ok
              ? "Congratulations, you have been successfully authenticated."
              : "Oops! You have entered a wrong or expired OTP."}
          </p>
        </div>
        {ok ? (
          <Button variant="pink" size="lg" className="w-full max-w-[260px]" onClick={onVerified}>
            Continue
          </Button>
        ) : (
          <Button variant="red" size="lg" className="w-full max-w-[260px]" onClick={retry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 px-6 py-8 text-center">
      <h2 className="font-display text-2xl font-extrabold uppercase text-outline-magenta">
        OTP Verification
      </h2>
      <p className="font-display text-sm font-bold uppercase tracking-wide text-white/90">
        We have sent the one-time pin to <br />
        <span className="text-gold-300">+263{phone}</span> via SMS.
      </p>
      <OtpInput value={code} onChange={setCode} />
      <p className="font-display text-xs font-bold uppercase tracking-wide text-white/80">
        Time remaining:{" "}
        <span className={cn(remaining <= 10 ? "text-brand-redSoft" : "text-white")}>
          {remaining} seconds
        </span>
      </p>
      <Button
        variant="red"
        size="lg"
        disabled={code.length < OTP_LENGTH || busy}
        className="w-full max-w-[260px]"
        onClick={confirm}
      >
        {busy ? "Checking…" : "Confirm OTP"}
      </Button>
      <button onClick={retry} className="font-display text-xs font-bold uppercase tracking-wide text-white/85 underline-offset-4 hover:underline">
        Lost pin? Haven&rsquo;t received it yet? <span className="text-gold-300">Retry here</span>
      </button>
      <p className="text-[10px] font-bold text-white/55">Dev hint: code is {DEV_OTP}</p>
    </div>
  );
}

/* ------------------------------------------------------------------- Grid */

export function GridPanel({
  onPointsChange,
  onClose,
}: {
  onPointsChange: (p: number) => void;
  onClose: () => void;
}) {
  const [states, setStates] = useState<CardState[]>(() => Array(GRID_SIZE).fill("idle"));
  const [picked, setPicked] = useState<number | null>(null);
  const [result, setResult] = useState<PickResult | null>(null);
  const [busy, setBusy] = useState(false);
  const play = useSound();
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const picksLeft = playStore.picksLeft();
  const exhausted = picksLeft <= 0 && !result;

  const handlePick = async (index: number) => {
    if (busy || picked !== null || playStore.picksLeft() <= 0) return;
    setBusy(true);
    setPicked(index);
    play("pick");
    vibrate(12);
    setStates((s) => s.map((v, i) => (i === index ? "flipping" : v)));
    if (liveRef.current) liveRef.current.textContent = "Great choice! Flipping your card…";

    const res = await pickCard(index);
    play("flip");
    const newTotal = playStore.addPick(res.prize.points);
    onPointsChange(newTotal);
    setStates((s) => s.map((v, i) => (i === index ? (res.win ? "won" : "lost") : v)));
    // let the flip settle, then reveal the modal
    setTimeout(() => setResult(res), 650);
    setBusy(false);
  };

  const reset = () => {
    setStates(Array(GRID_SIZE).fill("idle"));
    setPicked(null);
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 pt-3">
      {/* white game panel with the chest grid */}
      <div className="relative rounded-card bg-white p-3 shadow-card sm:p-4">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {states.map((st, i) => (
            <TreasureCard
              key={i}
              index={i}
              state={st}
              disabled={busy || (picked !== null && picked !== i) || exhausted}
              onPick={handlePick}
              onHover={() => !picked && play("hover")}
            />
          ))}
        </div>

        {/* reward overlay */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center rounded-card bg-navy-900/35 backdrop-blur-[2px]"
            >
              <RewardPanel
                result={result}
                onClaim={() => {
                  play("claim");
                  onClose();
                }}
                onRetry={() => {
                  if (playStore.picksLeft() > 0) reset();
                  else onClose();
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p ref={liveRef} aria-live="polite" className="min-h-[1.5rem] text-center font-display font-extrabold uppercase tracking-wide text-white/95">
        {exhausted
          ? "You're out of picks — come back tomorrow!"
          : picked === null
            ? "Pick a card to unlock your reward"
            : ""}
      </p>

      <p className="text-center font-display text-xs font-bold uppercase tracking-wide text-white/80">
        {picksLeft} {picksLeft === 1 ? "pick" : "picks"} left today
      </p>
    </div>
  );
}
