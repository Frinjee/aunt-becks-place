import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Inclusive_Sans, Lexend } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import "@/app/globals.css";

import { site } from "@/lib/content";

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
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: site.brandMark,
    shortcut: site.brandMark,
    apple: site.brandMark,
  },
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${inclusiveSans.variable} ${atkinson.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="site-header">
          <nav className="site-header__nav" aria-label="Site">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/events">Events</Link>
            <Link href="/#media">Press</Link>
            <Link href="/donate">Donate</Link>
            <Link className="site-header__brand" href="/" aria-label={`${site.name} home`}>
              <Image
                className="site-header__brand-icon"
                src={site.headerLogo}
                alt=""
                width={1376}
                height={768}
                sizes="64px"
              />
            </Link>
          </nav>
        </header>
        <main className="page-shell" id="content">
          {children}
        </main>
      </body>
    </html>
  );
}
