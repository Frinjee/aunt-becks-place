import { EditorialLine } from "@/components/EditorialLine";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <EditorialLine />
      <div className="site-footer__inner">
        <p className="site-footer__note">
          Made with <span aria-hidden="true">💜</span>
          <br />
          {site.name} ©2026
        </p>
        <SocialLinks className="site-footer__socials" />
      </div>
    </footer>
  );
}
