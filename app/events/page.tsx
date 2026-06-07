import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { SundayDinner } from "@/components/SundayDinner";
import { eventEntries, site } from "@/lib/content";

export const metadata = {
  title: "Events | Aunt Becks Place",
  description: "Upcoming community events and Sunday Dinner details for Aunt Becks Place.",
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
