import { sundayDinner } from "@/lib/content";

export function SundayDinner() {
  return (
    <article className="sunday-dinner" aria-labelledby="sunday-dinner-title">
      <div className="sunday-dinner__heart" aria-hidden="true" />
      <div className="sunday-dinner__content">
        <p className="meta-label">Neighborhood table</p>
        <h2 id="sunday-dinner-title">{sundayDinner.title}</h2>
        {sundayDinner.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </article>
  );
}
