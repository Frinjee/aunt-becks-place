import { MediaFeature } from "@/components/MediaFeature";
import type { NewsEntry } from "@/lib/content";

type NewsGridProps = {
  readonly entries: readonly NewsEntry[];
};

export function NewsGrid({ entries }: NewsGridProps) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="news-grid">
      {sortedEntries.map((entry) => (
        <MediaFeature key={entry.href} entry={entry} />
      ))}
    </div>
  );
}
