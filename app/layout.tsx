import type { Metadata, Viewport } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import { PickACardProvider } from "@/components/pickacard/PickACardProvider";

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YoNumbers — Pick a Card & Win",
  description:
    "Play and stand a chance to win Airtime, Data & More with YoNumbers by Econet Wireless. Every card hides a reward — dial *647#.",
  manifest: "/manifest.webmanifest",
  applicationName: "YoNumbers",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "YoNumbers" },
  icons: { icon: "/brand/logo-yonumbers-navy.png", apple: "/brand/logo-yonumbers-navy.png" },
};

export const viewport: Viewport = {
  themeColor: "#2B368A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} font-body`}>
        <PickACardProvider>{children}</PickACardProvider>
      </body>
    </html>
  );
}
