import { EditorialLine } from "@/components/EditorialLine";
import { SocialButton } from "@/components/ui/SocialButton";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <EditorialLine />
      <div className="site-footer__inner">
        <p className="site-footer__note">
          Made with 💜
          <br />
          {site.name} ©2026
        </p>
        <div className="site-footer__socials" aria-label="Social links">
          <SocialButton href={site.facebook} label="Facebook">
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          </SocialButton>
          <SocialButton href={site.instagram} label="Instagram">
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </SocialButton>
        </div>
      </div>
    </footer>
  );
}
