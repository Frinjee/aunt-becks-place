import { SocialButton } from "@/components/ui/SocialButton";
import { site } from "@/lib/content";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
      <path d="M13.5 8.2h2.2V5.5h-2.2c-2.4 0-3.9 1.6-3.9 4.1v1.9H7.7v2.6h1.9v5.4h2.7v-5.4h2.2l.4-2.6h-2.6V9.9c0-1 .4-1.7 1.2-1.7Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
      <path d="M16.4 3.5H7.6A4.1 4.1 0 0 0 3.5 7.6v8.8a4.1 4.1 0 0 0 4.1 4.1h8.8a4.1 4.1 0 0 0 4.1-4.1V7.6a4.1 4.1 0 0 0-4.1-4.1Zm1.3 12.9c0 .7-.6 1.3-1.3 1.3H7.6c-.7 0-1.3-.6-1.3-1.3V7.6c0-.7.6-1.3 1.3-1.3h8.8c.7 0 1.3.6 1.3 1.3v8.8Z" />
      <path d="M12 8.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Zm0 4.9a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z" />
      <circle cx="16.8" cy="7.2" r="1" />
    </svg>
  );
}

type SocialLinksProps = {
  readonly className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className} aria-label="Social links">
      <SocialButton href={site.facebook} label="Facebook">
        <FacebookIcon />
      </SocialButton>
      <SocialButton href={site.instagram} label="Instagram">
        <InstagramIcon />
      </SocialButton>
    </div>
  );
}
