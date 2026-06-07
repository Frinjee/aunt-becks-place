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
  metadataBase: new URL("https://www.auntbecksplace.live"),
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
    siteName: site.name,
  },
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const gtmId = "GTM-MKQZ8WLZ";
  const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;

  return (
    <html lang="en" className={`${lexend.variable} ${inclusiveSans.variable} ${atkinson.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <header className="site-header">
          <nav className="site-header__nav" aria-label="Site">
            <Link className="site-header__brand" href="/" aria-label={`${site.name} home`}>
              <Image
                className="site-header__brand-icon"
                src={site.headerLogo}
                alt=""
                width={1376}
                height={768}
                sizes="84px"
              />
            </Link>
            <div className="site-header__links">
              <Link href="/about">About</Link>
              <Link href="/contact" prefetch={false}>
                Contact
              </Link>
              <Link href="/events">Events</Link>
              <Link href="/#media">Press</Link>
              <Link href="/donate">Donate</Link>
            </div>
          </nav>
        </header>
        <main className="page-shell" id="content">
          {children}
        </main>
      </body>
    </html>
  );
}
