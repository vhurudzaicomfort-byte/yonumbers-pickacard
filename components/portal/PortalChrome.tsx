"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { SidebarMenu } from "./SidebarMenu";
import { BottomTabBar } from "./BottomTabBar";
import { FloatingLauncher } from "./FloatingLauncher";
import { MenuIcon } from "./icons";

/**
 * Portal frame: top bar (title + Menu), slide-in sidebar, bottom tab bar and
 * the floating Pick-a-Card launcher. Wraps every portal page.
 */
export function PortalChrome({
  title,
  children,
  showTabs = true,
  showLauncher = true,
}: {
  title: string;
  children: React.ReactNode;
  showTabs?: boolean;
  showLauncher?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative mx-auto min-h-[100dvh] w-full max-w-[480px] bg-surface lg:my-6 lg:min-h-[calc(100dvh-3rem)] lg:rounded-[36px] lg:shadow-card lg:overflow-hidden">
      {/* ambient desktop backdrop so the centred column reads as intentional */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 hidden lg:block"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, #eef0fb 0%, #e7e9f7 45%, #dfe1f3 100%)" }}
      />
      <div className="bg-grad-navy-foot">
        <header className="sticky top-0 z-[600] flex h-16 items-center justify-between gap-4 bg-surface/90 px-4 backdrop-blur safe-t">
          <div className="flex min-w-0 items-center gap-2">
            <Logo variant="navy" className="w-8 shrink-0" priority />
            <h1 className="truncate font-display text-[22px] font-extrabold leading-none text-navy-700">{title}</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setMenuOpen(true)}
            className="flex h-10 shrink-0 items-center gap-2 rounded-pill border-2 border-navy-700/15 px-4 text-sm font-display font-bold text-navy-700"
            aria-label="Open menu"
          >
            <MenuIcon className="h-[18px] w-[18px]" />
            <span className="leading-none">Menu</span>
          </motion.button>
        </header>

        <main className={showTabs ? "px-4 pb-28" : "px-4 pb-10"}>{children}</main>
      </div>

      <SidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {showLauncher && <FloatingLauncher />}
      {showTabs && <BottomTabBar />}
    </div>
  );
}
