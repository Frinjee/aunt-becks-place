import type { Metadata } from "next";

import { Donations } from "@/components/Donations";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Support Grassroots Mutual Aid in Baltimore | Give To Aunt Becks Place",
  },
  description:
    "Give today to support free Sunday dinners and mutual-aid food programs for homeless and food-insecure neighbors in Baltimore City.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/donate",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/donate",
    title: "Donate to Feed Our Neighbors in Baltimore | Aunt Becks Place",
    description:
      "Your gift helps provide free Sunday dinners, hot meals, and community support for homeless and food-insecure neighbors in Baltimore City.",
    images: [
      {
        url: "https://www.auntbecksplace.live/images/donate-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to Feed Our Neighbors in Baltimore | Aunt Becks Place",
    description:
      "Support free Sunday dinners and mutual-aid food programs for our homeless and food-insecure neighbors in Baltimore City.",
    images: ["https://www.auntbecksplace.live/images/donate-og.jpg"],
  },
};

export default function DonatePage() {
  return (
    <>
      <section className="page-hero page-hero--contact-match" aria-labelledby="donate-title">
        <p className="eyebrow">Donations Welcome</p>
        <h1 id="donate-title" className="page-hero__title--contact-match">
          Support Aunt Becks Place
        </h1>
        <p>
          If you practice servant leadership, have donations, or want to volunteer your time and
          talent, connect at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>

      <section className="single-panel" aria-label="Donation QR codes">
        <Reveal>
          <Donations />
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
