import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IndexRow } from "@/components/IndexRow";
import { NewsGrid } from "@/components/NewsGrid";
import { OffsetGrid } from "@/components/OffsetGrid";
import { indexEntries, newsEntries, site } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
  },
  description:
    "Aunt Becks Place is a traditional neighborhood spot in Baltimore. We restore the village one meal at a time with free Sunday Dinners, mutual care, and restorative justice for neighbors who need food and resources to thrive.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/",
    title: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
    description:
      "Restore the village one meal at a time. Join Aunt Becks Place in Baltimore for free Sunday Dinners, mutual care, and a traditional neighborhood gathering place where everyone belongs.",
    images: [
      {
        url: site.openGraphImage,
        width: site.openGraphImageWidth,
        height: site.openGraphImageHeight,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aunt Becks Place | Free Sunday Dinner & Community Support in Baltimore",
    description:
      "Aunt Becks Place restores the village one meal at a time with free Sunday Dinners and mutual care in Baltimore City.",
    images: [site.openGraphImage],
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
