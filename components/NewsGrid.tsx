import { MediaFeature } from "@/components/MediaFeature";
import { Reveal } from "@/components/Reveal";
import type { NewsEntry } from "@/lib/content";

type NewsGridProps = {
  readonly entries: readonly NewsEntry[];
};

export function NewsGrid({ entries }: NewsGridProps) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="news-grid">
      {sortedEntries.map((entry, index) => (
        <Reveal key={entry.href} delay={index}>
          <MediaFeature entry={entry} />
        </Reveal>
      ))}
    </div>
  );
}
