import Image from "next/image";

import { OpensInNewTab } from "@/components/ui/OpensInNewTab";
import type { NewsEntry } from "@/lib/content";

type MediaFeatureProps = {
  readonly entry: NewsEntry;
  readonly featured?: boolean;
};

export function MediaFeature({ entry, featured = false }: MediaFeatureProps) {
  return (
    <article className={featured ? "media-feature media-feature--large" : "media-feature"}>
      <a href={entry.href} target="_blank" rel="noopener noreferrer">
        <OpensInNewTab />
        <span className="media-feature__image">
          <Image
            src={entry.image}
            alt={entry.alt}
            width={entry.width}
            height={entry.height}
            sizes={
              featured
                ? "(max-width: 900px) 100vw, (max-width: 1280px) 58vw, 50vw"
                : "(max-width: 900px) 100vw, (max-width: 1280px) 50vw, 42vw"
            }
          />
        </span>
        <span className="media-feature__overlay">
          <span className="meta-label">{entry.category}</span>
          <span className="media-feature__title">{entry.title}</span>
          <span className="media-feature__source">
            {entry.source}, {entry.date}
          </span>
        </span>
      </a>
    </article>
  );
}
