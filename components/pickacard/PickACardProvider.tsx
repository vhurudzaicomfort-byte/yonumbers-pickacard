"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";

// The modal is client-only and lazy — keeps the portal out of the initial bundle.
const PickACardModal = dynamic(
  () => import("./PickACardModal").then((m) => m.PickACardModal),
  { ssr: false },
);

interface OpenOptions {
  /** Element that launched the pop-up, so focus can return to it. */
  launcher?: HTMLElement | null;
  /** Show the welcome/qualify entry state before the grid (login auto-open). */
  intro?: boolean;
}

interface PickACardContextValue {
  isOpen: boolean;
  open: (launcherOrOpts?: HTMLElement | OpenOptions | null) => void;
  close: () => void;
  /** Element that launched the pop-up, so focus can return to it. */
  launcherRef: React.MutableRefObject<HTMLElement | null>;
}

const Ctx = createContext<PickACardContextValue | null>(null);

export function usePickACard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePickACard must be used within PickACardProvider");
  return ctx;
}

export function PickACardProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const launcherRef = useRef<HTMLElement | null>(null);

  const open = useCallback((launcherOrOpts?: HTMLElement | OpenOptions | null) => {
    const opts: OpenOptions =
      launcherOrOpts instanceof HTMLElement ? { launcher: launcherOrOpts } : launcherOrOpts ?? {};
    launcherRef.current = opts.launcher ?? (document.activeElement as HTMLElement | null);
    setIntro(!!opts.intro);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("pickacard", "open");
      window.history.replaceState({}, "", url);
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("pickacard");
      window.history.replaceState({}, "", url);
    }
    // restore focus to the launching element
    requestAnimationFrame(() => launcherRef.current?.focus?.());
  }, []);

  const value = useMemo(
    () => ({ isOpen, open, close, launcherRef }),
    [isOpen, open, close],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {isOpen && <PickACardModal intro={intro} />}
    </Ctx.Provider>
  );
}
