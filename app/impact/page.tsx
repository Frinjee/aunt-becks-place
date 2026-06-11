import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { missionContent, site } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: "Community Impact in Baltimore | Aunt Becks Place",
  },
  description:
    "See how Aunt Becks Place restores the village one meal at a time through Sunday Dinners, mutual aid, restorative justice, and neighborhood care in Baltimore City.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/impact",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/impact",
    title: "Community Impact in Baltimore | Aunt Becks Place",
    description:
      "Aunt Becks Place nourishes neighbors through Sunday Dinners, mutual aid, and restorative justice that strengthens Baltimore City.",
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
    title: "Community Impact in Baltimore | Aunt Becks Place",
    description:
      "Sunday Dinners, mutual aid, and restorative justice that restore the social fabric of Baltimore City.",
    images: [site.openGraphImage],
  },
};

export default function ImpactPage() {
  return (
    <>
      <section className="page-hero page-hero--contact-match" aria-labelledby="impact-title">
        <p className="eyebrow">{site.eyebrow}</p>
        <h1 id="impact-title" className="page-hero__title--contact-match">
          Community impact
        </h1>
        <p>{site.manifesto}</p>
      </section>

      <section className="simple-grid" aria-label="Impact content">
        <Reveal>
          <StoryCard title="Mission" eyebrow="Restorative justice">
            <p>{missionContent.mission}</p>
            <h3>Vision</h3>
            <p>{missionContent.vision}</p>
          </StoryCard>
        </Reveal>
        <Reveal delay={1}>
          <StoryCard title="Join Our Village" eyebrow="Mutual aid">
            <p>{missionContent.join}</p>
            <ul className="label-list" aria-label="Impact focus areas">
              {missionContent.labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </StoryCard>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
