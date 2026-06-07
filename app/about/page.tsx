import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { missionContent, site, storyContent } from "@/lib/content";

export const metadata = {
  title: "About | Aunt Becks Place",
  description: "Mission, vision, and story for Aunt Becks Place.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--contact-match" aria-labelledby="about-title">
        <p className="eyebrow">{site.eyebrow}</p>
        <h1 id="about-title" className="page-hero__title--contact-match">
          About Aunt Becks Place
        </h1>
        <p>{site.manifesto}</p>
      </section>

      <section className="simple-grid" aria-label="About content">
        <Reveal>
          <StoryCard title="Mission" eyebrow="Restorative justice">
            <p>{missionContent.mission}</p>
            <h3>Vision</h3>
            <p>{missionContent.vision}</p>
            <h3>Join Our Village</h3>
            <p>{missionContent.join}</p>
          </StoryCard>
        </Reveal>
        <Reveal delay={1}>
          <StoryCard title="Our Story" eyebrow="Community support">
            {storyContent.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </StoryCard>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
