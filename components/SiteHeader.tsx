import Image from "next/image";
import Link from "next/link";

import { MobileSiteNav } from "@/components/MobileSiteNav";
import { site } from "@/lib/content";
import { siteNavDonateLink, siteNavPrimaryLinks, siteNavSecondaryLinks } from "@/lib/nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-header__nav site-header__nav--desktop" aria-label="Site">
        <div className="site-header__group site-header__group--left">
          {siteNavPrimaryLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="site-header__brand-stack">
          <Link className="site-header__brand" href="/" aria-label={`${site.name} home`}>
            <Image
              className="site-header__brand-icon"
              src={site.headerLogo}
              alt=""
              width={1376}
              height={768}
              sizes="84px"
              priority
            />
          </Link>
          <p className="site-header__brand-tagline">{site.eyebrow}</p>
        </div>
        <div className="site-header__group site-header__group--right">
          {siteNavSecondaryLinks.map((link) => (
            <Link key={link.label} href={link.href} prefetch={link.prefetch}>
              {link.label}
            </Link>
          ))}
          <Link href={siteNavDonateLink.href}>{siteNavDonateLink.label}</Link>
        </div>
      </nav>

      <MobileSiteNav />
    </header>
  );
}
