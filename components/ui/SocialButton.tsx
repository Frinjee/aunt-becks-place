import { type ReactNode } from "react";

type SocialButtonProps = {
  readonly href: string;
  readonly label: string;
  readonly children: ReactNode;
};

export function SocialButton({ href, label, children }: SocialButtonProps) {
  return (
    <a
      className="social-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}
