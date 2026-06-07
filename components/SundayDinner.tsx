import { EditorialLine } from "@/components/EditorialLine";
import { sundayDinner } from "@/lib/content";

export function SundayDinner() {
  return (
    <article className="sunday-dinner" aria-labelledby="sunday-dinner-title">
      <div className="sunday-dinner__heart" aria-hidden="true" />
      <div className="sunday-dinner__content">
        <p className="meta-label">Restore the village one meal at a time</p>
        <h2 id="sunday-dinner-title">{sundayDinner.title}</h2>
        <EditorialLine className="editorial-line--title" />
        {sundayDinner.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </article>
  );
}
