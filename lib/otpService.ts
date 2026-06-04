/**
 * Mock OTP service. Sends a fixed dev code and verifies it. Replace with a
 * real SMS gateway later — the UI only depends on these two functions.
 */

export const OTP_LENGTH = 4;
export const OTP_TTL_SECONDS = 58;

/** The dev code the mock "SMS" always sends. Shown as a hint in dev. */
export const DEV_OTP = "1234";

export interface SentOtp {
  phone: string;
  expiresAt: number;
}

export function sendOtp(phone: string): Promise<SentOtp> {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve({ phone, expiresAt: Date.now() + OTP_TTL_SECONDS * 1000 }),
      350,
    );
  });
}

export function verifyOtp(code: string, sent: SentOtp | null): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!sent) return resolve(false);
      const expired = Date.now() > sent.expiresAt;
      resolve(!expired && code === DEV_OTP);
    }, 500);
  });
}
