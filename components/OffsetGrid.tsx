import Link from "next/link";

import { StoryCard } from "@/components/StoryCard";
import { SundayDinner } from "@/components/SundayDinner";
import { missionContent, storyContent } from "@/lib/content";

export function OffsetGrid() {
  return (
    <section className="section offset-section" id="community" aria-labelledby="community-title">
      <div className="section__heading">
        <p className="meta-label">Restore the village one meal at a time</p>
        <h2 id="community-title">Feed the village, nourish your spirit</h2>
      </div>

      <div className="offset-grid">
        <div className="offset-grid__item offset-grid__item--story">
          <StoryCard title="Our Story" eyebrow="A Traditional Neighborhood Spot">
            {storyContent.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>Mission</h2>
            <h3>Restorative justice</h3>
            <p>{missionContent.mission}</p>
            <h3>Vision</h3>
            <p>{missionContent.vision}</p>
            <h3>Join Our Village</h3>
            <p>{missionContent.join}</p>
            <div className="story-card__footer">
              <h3>Mutual aid</h3>
              <p>Donations are welcome to provide mutual aid.</p>
              <Link className="donations__link" href="/donate">
                Donate
              </Link>
            </div>
          </StoryCard>
        </div>

        <div className="offset-grid__item offset-grid__item--sunday">
          <SundayDinner />
        </div>
      </div>
    </section>
  );
}
