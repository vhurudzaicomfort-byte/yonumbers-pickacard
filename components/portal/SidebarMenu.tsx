"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { PickACardLogo } from "@/components/brand/PickACardLogo";
import { usePickACard } from "@/components/pickacard/PickACardProvider";
import { usePlayState } from "@/lib/pointsStore";
import { CloseIcon, ChevronRight, UserIcon } from "./icons";

const CATEGORIES = ["Action", "Adventure", "Arcade", "Strategy", "Intellectual", "Sport"];

export function SidebarMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { open: openGame } = usePickACard();
  const play = usePlayState();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[900] bg-navy-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 36 }}
            className="fixed right-0 top-0 z-[901] flex h-[100dvh] w-[85%] max-w-[360px] flex-col overflow-y-auto bg-white px-5 pb-8 pt-6 shadow-card safe-t"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Link href="/home" onClick={onClose} aria-label="YoNumbers home" className="rounded-pill">
                <Logo variant="navy" className="w-24" />
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-pill text-navy-700 hover:bg-surface-alt">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Featured promo: Pick a Card & Win */}
            <button
              onClick={() => {
                onClose();
                openGame();
              }}
              className="mt-5 flex w-full items-center gap-3 overflow-hidden rounded-card bg-grad-navy-card p-3.5 text-left shadow-soft"
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <PickACardLogo tone="dark" className="w-32" />
                  <span className="shrink-0 rounded-pill bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold uppercase text-navy-900">Promo</span>
                </span>
                <span className="mt-1.5 block truncate text-xs font-semibold text-white/85">Airtime, Data &amp; More!</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white" />
            </button>

            {/* Account — active subscribers always get a clear one-tap opt-out */}
            <Link
              href={play.subscribed ? "/unsubscribe" : "/auth"}
              onClick={onClose}
              className="mt-3 flex items-center gap-3 rounded-card border-2 border-divider p-3 text-navy-700 hover:border-navy-700/30"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-surface-alt text-navy-700">
                <UserIcon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-display font-bold">
                {play.subscribed ? "Unsubscribe" : "Login / Subscribe"}
              </span>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </Link>

            <nav className="mt-6 flex flex-col gap-1 font-body text-navy-700">
              <p className="px-1 font-display text-sm font-extrabold uppercase tracking-wide text-navy-700">Games</p>
              <Link href="/games" onClick={onClose} className="rounded-input px-3 py-2 font-semibold hover:bg-surface-alt">All Games</Link>
              <p className="mt-1 px-3 text-sm font-bold text-ink">Categories</p>
              {CATEGORIES.map((c) => (
                <Link key={c} href="/games" onClick={onClose} className="rounded-input px-5 py-1.5 text-sm font-semibold text-navy-500 hover:bg-surface-alt">{c}</Link>
              ))}
              <Link href="/leaderboard" onClick={onClose} className="mt-2 rounded-input px-3 py-2 font-semibold hover:bg-surface-alt">Leaderboard</Link>
            </nav>

            <div className="mt-6 border-t border-divider pt-4">
              {[
                { label: "How it works", href: "/info" },
                { label: "Terms & Conditions", href: "/info" },
                { label: "About", href: "/info" },
              ].map((l) => (
                <Link key={l.label} href={l.href} onClick={onClose} className="flex items-center justify-between rounded-input px-3 py-3 font-bold text-navy-700 hover:bg-surface-alt">
                  {l.label}
                  <ChevronRight className="h-4 w-4 text-ink" />
                </Link>
              ))}
            </div>

            <p className="mt-auto pt-6 text-center text-sm font-bold text-navy-700">
              Copyright © 2026 <span className="block">YoNumbers</span>
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
