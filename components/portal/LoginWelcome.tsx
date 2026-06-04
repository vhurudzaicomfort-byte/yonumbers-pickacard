"use client";

import { useEffect } from "react";
import { usePickACard } from "@/components/pickacard/PickACardProvider";

const PENDING = "yonumbers.justLoggedIn";
const SHOWN = "yonumbers.introShown";

/**
 * Auto-surfaces the Pick a Card welcome pop-up once, just after a successful
 * login. The pending flag is set by the auth flow; we show the intro at most
 * once per session (persisted), so it never re-fires on navigation or refresh.
 */
export function LoginWelcome() {
  const { open } = usePickACard();

  useEffect(() => {
    if (typeof window === "undefined") return;
    let pending = false;
    try {
      pending = sessionStorage.getItem(PENDING) === "1" && sessionStorage.getItem(SHOWN) !== "1";
    } catch {
      return;
    }
    if (!pending) return;

    try {
      sessionStorage.removeItem(PENDING);
      sessionStorage.setItem(SHOWN, "1");
    } catch {
      /* ignore */
    }
    // a brief beat after landing on the portal
    const id = setTimeout(() => open({ intro: true }), 650);
    return () => clearTimeout(id);
  }, [open]);

  return null;
}
