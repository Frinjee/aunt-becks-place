import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IndexRow } from "@/components/IndexRow";
import { NewsGrid } from "@/components/NewsGrid";
import { OffsetGrid } from "@/components/OffsetGrid";
import { indexEntries, newsEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
  },
  description:
    "Aunt Becks Place is a neighborhood gathering place in Baltimore offering free Sunday dinners, mutual-aid support, and restorative-justice community care for homeless and food-insecure neighbors.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/",
    title: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
    description:
      "Where everyone is welcomed, loved, and belongs. Join Aunt Becks Place in Baltimore for free Sunday dinners, mutual-aid support, and restorative-justice community care.",
    images: [
      {
        url: "https://www.auntbecksplace.live/images/home-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
    description:
      "Aunt Becks Place nurtures the village one meal at a time with free Sunday dinners and mutual-aid community care in Baltimore City.",
    images: ["https://www.auntbecksplace.live/images/home-og.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <OffsetGrid />

      <div className="calendar-news-layout">
        <section className="section index-section" id="index" aria-labelledby="index-title">
          <div className="section__inner">
            <div className="section__heading">
              <p className="meta-label">Current / Upcoming Events</p>
              <h2 id="index-title">Happenings</h2>
            </div>
            <div className="index-list">
              {indexEntries.map((entry, index) => (
                <IndexRow key={`${entry.title}-${entry.date}`} entry={entry} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section media-section" id="media" aria-labelledby="media-title">
          <div className="section__inner">
            <div className="section__heading">
              <p className="meta-label">In the News</p>
              <h2 id="media-title">Media features</h2>
            </div>
            <NewsGrid entries={newsEntries} />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
