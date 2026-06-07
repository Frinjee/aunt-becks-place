import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { missionContent, site, storyContent } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "About Aunt Becks Place | Restorative Justice & Mutual Aid in Baltimore",
  },
  description:
    "Learn about Aunt Becks Place, a Baltimore-based mutual-aid nonprofit practicing restorative justice through Sunday dinners, community care, and support for homeless neighbors.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/about",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/about",
    title: "About Aunt Becks Place | Restorative Justice & Mutual Aid in Baltimore",
    description:
      "Aunt Becks Place is a traditional neighborhood gathering place in Baltimore where everyone is welcomed, loved, and belongs—practicing restorative justice through Sunday dinners and mutual-aid community support.",
    images: [
      {
        url: "https://www.auntbecksplace.live/images/about-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aunt Becks Place | Restorative Justice & Mutual Aid in Baltimore",
    description:
      "Get to know Aunt Becks Place—our story, mission, and vision to restore the social fabric of Baltimore City through community, meals, and love.",
    images: ["https://www.auntbecksplace.live/images/about-og.jpg"],
  },
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
