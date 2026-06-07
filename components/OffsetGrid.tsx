import Link from "next/link";

import { EditorialLine } from "@/components/EditorialLine";
import { StoryCard } from "@/components/StoryCard";
import { SundayDinner } from "@/components/SundayDinner";
import { missionContent, storyContent } from "@/lib/content";

export function OffsetGrid() {
  return (
    <section className="section offset-section" id="community" aria-label="Community">
      <div className="offset-grid">
        <div className="offset-grid__item offset-grid__item--story">
          <StoryCard title="Our Story" eyebrow="A Traditional Neighborhood Spot">
            {storyContent.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <EditorialLine />
            <p className="meta-label">Gather the village, nourish your spirit</p>
            <h2>Mission</h2>
            <EditorialLine className="editorial-line--title" />
            <h3>Restorative Justice</h3>
            <p>{missionContent.mission}</p>
            <h3>Vision</h3>
            <p>{missionContent.vision}</p>
            <h3>Join Our Village</h3>
            <p>{missionContent.join}</p>
            <div className="story-card__footer">
              <h3>Mutual aid</h3>
              <p>
                Donations welcome. Your gift fuels mutual aid and Sunday Dinners for Baltimore
                neighbors.
              </p>
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
