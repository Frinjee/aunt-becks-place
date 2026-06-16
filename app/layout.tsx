import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inclusive_Sans, Lexend } from "next/font/google";
import type { ReactNode } from "react";

import "@/app/globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-loaded",
});

const inclusiveSans = Inclusive_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-display-loaded",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-meta-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.auntbecksplace.live"),
  title: {
    default: "WebX service discontinued",
    template: "%s | Aunt Becks Place",
  },
  description:
    "This website is no longer in service. Project assets are available upon email request until July 1, 2026.",
  icons: {
    icon: "/assets/abp/imgs/x-street.webp",
    shortcut: "/assets/abp/imgs/x-street.webp",
    apple: "/assets/abp/imgs/x-street.webp",
  },
  openGraph: {
    title: "WebX service discontinued",
    description:
      "This website is no longer in service. Project assets are available upon email request until July 1, 2026.",
    type: "website",
    siteName: "Aunt Becks Place",
  },
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${lexend.variable} ${inclusiveSans.variable} ${atkinson.variable}`}>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <main className="page-shell" id="content">
          {children}
        </main>
      </body>
    </html>
  );
}
