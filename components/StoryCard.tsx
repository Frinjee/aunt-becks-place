import { type ReactNode } from "react";

import { EditorialLine } from "@/components/EditorialLine";

type StoryCardProps = {
  readonly title: string;
  readonly eyebrow?: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export function StoryCard({ title, eyebrow, children, className = "" }: StoryCardProps) {
  return (
    <article className={`story-card ${className}`}>
      {eyebrow ? <p className="meta-label">{eyebrow}</p> : null}
      <h2>{title}</h2>
      <EditorialLine />
      <div className="story-card__body">{children}</div>
    </article>
  );
}
