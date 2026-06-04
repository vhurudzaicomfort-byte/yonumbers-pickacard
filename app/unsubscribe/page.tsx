"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { EconetFooter } from "@/components/brand/EconetFooter";
import { Button } from "@/components/ui/Button";
import { playStore, usePlayState } from "@/lib/pointsStore";

const CheckCircle = () => (
  <svg viewBox="0 0 24 24" className="h-12 w-12 text-brand-red" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function UnsubscribePage() {
  const router = useRouter();
  const play = usePlayState();
  const [done, setDone] = useState(false);
  const masked = play.phone ? `+263 ${play.phone}` : "your Econet line";

  const confirm = () => {
    playStore.setSubscribed(false);
    setDone(true);
  };

  return (
    <main className="relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col bg-surface">
      <div className="flex items-center justify-between px-4 py-3 safe-t">
        <Link href="/home" className="font-display text-sm font-bold text-navy-500 hover:text-navy-700">
          ← Back
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 px-6 pb-10">
        <Logo variant="navy" className="mt-2 w-40" priority />

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="flex w-full max-w-[360px] flex-col items-center gap-5 text-center"
            >
              <h1 className="font-display text-2xl font-extrabold text-navy-700">Unsubscribe</h1>
              <p className="font-body text-slate-600">
                You&rsquo;re about to unsubscribe <span className="font-bold text-navy-700">{masked}</span> from
                YoNumbers. You can resubscribe anytime by dialling{" "}
                <span className="font-extrabold text-brand-red">*647#</span> or on the portal.
              </p>
              <Button variant="red" size="lg" className="w-full" onClick={confirm}>
                Confirm Unsubscribe
              </Button>
              <Link href="/home" className="py-1 font-display text-sm font-bold text-slate-400 hover:text-slate-600">
                Cancel
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="done"
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
              <h1 className="font-display text-3xl font-extrabold text-navy-700">Unsubscribed</h1>
              <p className="max-w-[300px] font-body text-slate-600">
                You have been unsubscribed from YoNumbers. Dial{" "}
                <span className="font-extrabold text-brand-red">*647#</span> to rejoin anytime.
              </p>
              <Button variant="red" size="lg" className="w-full" onClick={() => router.push("/home")}>
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto w-full max-w-[360px] pt-6">
          <EconetFooter action="confirm" />
        </div>
      </div>
    </main>
  );
}
