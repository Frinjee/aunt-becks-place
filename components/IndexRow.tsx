import { EditorialLine } from "@/components/EditorialLine";
import { OpensInNewTab } from "@/components/ui/OpensInNewTab";
import type { IndexEntry } from "@/lib/content";

type IndexRowProps = {
  readonly entry: IndexEntry;
  readonly index: number;
};

export function IndexRow({ entry, index }: IndexRowProps) {
  const rowNumber = String(index + 1).padStart(2, "0");
  const content = (
    <>
      <span className="index-row__number">{rowNumber}</span>
      <span className="index-row__title">{entry.title}</span>
      <span className="index-row__meta">
        <span>{entry.category}</span>
        <span>{entry.date}</span>
      </span>
      {entry.detail ? (
        <span className="index-row__detail">
          {entry.detail.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      ) : null}
    </>
  );

  return (
    <div className="index-row-wrap">
      {entry.href ? (
        <a className="index-row" href={entry.href} target="_blank" rel="noopener noreferrer">
          {content}
          <OpensInNewTab />
        </a>
      ) : (
        <div className="index-row">{content}</div>
      )}
      <EditorialLine />
    </div>
  );
}
