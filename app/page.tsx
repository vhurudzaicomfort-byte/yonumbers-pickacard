"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { StarBurst } from "@/components/portal/StarBurst";

/** Splash / Loading — navy sunburst, logo entrance, determinate progress. */
export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    router.prefetch("/auth");
    const start = performance.now();
    const dur = 2000;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
      else router.replace("/auth");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [router]);

  return (
    <main className="relative grid min-h-[100dvh] place-items-center overflow-hidden bg-navy-700">
      <StarBurst />
      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
          <Logo variant="white" className="w-56" priority />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-[260px] font-body text-base font-semibold text-white/90"
        >
          Play &amp; Win Airtime, Data &amp; More!
        </motion.p>
        <div className="mt-10 h-2 w-56 overflow-hidden rounded-pill bg-white/20">
          <div
            className="h-full rounded-pill bg-white transition-[width] duration-100 ease-linear"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </main>
  );
}
