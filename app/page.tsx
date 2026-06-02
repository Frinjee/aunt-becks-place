import { EditorialLine } from "@/components/EditorialLine";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IndexRow } from "@/components/IndexRow";
import { NewsGrid } from "@/components/NewsGrid";
import { OffsetGrid } from "@/components/OffsetGrid";
import { Reveal } from "@/components/Reveal";
import { indexEntries, newsEntries } from "@/lib/content";

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
                <Reveal key={`${entry.title}-${entry.date}`} delay={index}>
                  <IndexRow entry={entry} index={index} />
                </Reveal>
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
