import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { SundayDinner } from "@/components/SundayDinner";
import { eventEntries, site } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Community Events & Fundraisers in Baltimore | Aunt Becks Place",
  },
  description:
    "Stay up to date on Aunt Becks Place events in Baltimore, from community BBQs and fundraisers to Sunday Dinners and village gatherings.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/events",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/events",
    title: "Community Events & Fundraisers in Baltimore | Aunt Becks Place",
    description:
      "See upcoming Aunt Becks Place events in Baltimore, including community BBQs, fundraisers, and Sunday Dinners that nourish neighbors and restore the village.",
    images: [
      {
        url: "https://www.auntbecksplace.live/images/events-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Events & Fundraisers in Baltimore | Aunt Becks Place",
    description:
      "Discover Aunt Becks Place events in Baltimore. BBQs, fundraisers, and Sunday Dinners that gather the village.",
    images: ["https://www.auntbecksplace.live/images/events-og.jpg"],
  },
};

export default function EventsPage() {
  return (
    <>
      <section className="page-hero page-hero--contact-match" aria-labelledby="events-title">
        <p className="eyebrow">Events</p>
        <h1 id="events-title" className="page-hero__title--contact-match">
          Community calendar
        </h1>
        <p>{site.manifesto}</p>
      </section>

      <section className="simple-grid" aria-label="Events content">
        <Reveal>
          <StoryCard title="Events" eyebrow="Upcoming">
            <div className="event-list">
              {eventEntries.map((event) => (
                <article className="event-item" key={event.title}>
                  <h3>{event.title}</h3>
                  <p>Time &amp; Date: {event.timeAndDate}</p>
                  <p>Location: {event.location}</p>
                  <p>
                    Contact: <a href={`mailto:${event.email}`}>{event.email}</a> | {event.phone}
                  </p>
                </article>
              ))}
            </div>
          </StoryCard>
        </Reveal>
        <Reveal delay={1}>
          <SundayDinner />
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
