"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { EconetFooter } from "@/components/brand/EconetFooter";
import { Button } from "@/components/ui/Button";
import { PillToggle } from "@/components/ui/PillToggle";
import { PhoneInput, isValidPhone } from "@/components/ui/PhoneInput";
import { PackageSelector } from "@/components/ui/PackageSelector";
import { OtpInput } from "@/components/ui/OtpInput";
import { sendOtp, verifyOtp, OTP_LENGTH, OTP_TTL_SECONDS, type SentOtp } from "@/lib/otpService";
import { playStore } from "@/lib/pointsStore";
import { useSound } from "@/lib/useSound";
import { vibrate } from "@/lib/haptics";
import { cn } from "@/lib/cn";
import type { AuthMode, PackageOption } from "@/lib/types";

type Step = "form" | "otp" | "success";

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" className="h-12 w-12 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const play = useSound();
  const [step, setStep] = useState<Step>("form");
  const [mode, setMode] = useState<AuthMode>("login");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState<PackageOption["id"] | null>("daily");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState<SentOtp | null>(null);
  const [remaining, setRemaining] = useState(OTP_TTL_SECONDS);
  const [busy, setBusy] = useState(false);

  const formValid = isValidPhone(phone) && (mode === "login" || !!pkg);

  useEffect(() => {
    if (step !== "otp") return;
    setRemaining(OTP_TTL_SECONDS);
    void sendOtp("+263" + phone).then(setSent);
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [step, phone]);

  const submitForm = () => {
    if (!formValid) return;
    setStep("otp");
  };

  const confirm = async () => {
    setBusy(true);
    await verifyOtp(code, sent); // DEMO: always succeeds
    setBusy(false);
    play("win");
    vibrate([15, 30, 15]);
    setStep("success");
  };

  const finish = () => {
    playStore.setAuthed(true, phone);
    router.push("/home");
  };

  return (
    <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col bg-surface">
      <div className="flex items-center justify-between px-4 py-3 safe-t">
        <Link href="/home" className="font-display text-sm font-bold text-navy-500 hover:text-navy-700">
          ← Skip for now
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 px-6 pb-10">
        <Logo variant="navy" className="mt-2 w-40" priority />

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="flex w-full max-w-[360px] flex-col gap-5"
            >
              <PillToggle value={mode} onChange={setMode} />
              <PhoneInput value={phone} onChange={setPhone} />
              <AnimatePresence initial={false} mode="wait">
                {mode === "subscribe" && (
                  <motion.div
                    key="pkg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <PackageSelector value={pkg} onChange={setPkg} />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button variant="red" size="lg" disabled={!formValid} className="w-full" onClick={submitForm}>
                {mode === "subscribe" ? "Subscribe" : "Login"}
              </Button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="flex w-full max-w-[360px] flex-col items-center gap-5 text-center"
            >
              <h1 className="self-start font-display text-2xl font-extrabold text-navy-700">OTP Verification</h1>
              <p className="self-start text-left font-body text-navy-500">
                We have sent the one-time pin to <span className="font-bold text-navy-700">+263{phone}</span> via SMS.
              </p>
              <OtpInput value={code} onChange={setCode} />
              <p className="font-body text-sm font-bold text-navy-500">
                Time remaining:{" "}
                <span className={cn(remaining <= 10 ? "text-brand-red" : "text-navy-700")}>{remaining} seconds</span>
              </p>
              <Button variant="red" size="lg" disabled={code.length < OTP_LENGTH || busy} className="w-full" onClick={confirm}>
                {busy ? "Checking…" : "Confirm"}
              </Button>
              <button
                onClick={() => {
                  setCode("");
                  setStep("otp");
                  void sendOtp("+263" + phone).then(setSent);
                  setRemaining(OTP_TTL_SECONDS);
                }}
                className="font-body text-sm font-bold text-navy-500 hover:text-navy-700"
              >
                Lost pin? Haven&rsquo;t received it yet? <span className="text-brand-red">Retry here</span>
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-[360px] flex-col items-center gap-5 pt-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
                className="grid h-28 w-28 place-items-center rounded-pill border-[3px] border-brand-red bg-brand-red/10"
              >
                <CheckCircle />
              </motion.div>
              <h1 className="font-display text-3xl font-extrabold text-navy-700">Success!</h1>
              <p className="max-w-[280px] font-body text-navy-500">
                Congratulations, you have been successfully authenticated.
              </p>
              <Button variant="red" size="lg" className="w-full" onClick={finish}>
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto w-full max-w-[360px] pt-6">
          <EconetFooter action={mode} />
        </div>
      </div>
    </main>
  );
}
