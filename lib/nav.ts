export type SiteNavLink = {
  readonly label: string;
  readonly href: string;
  readonly prefetch?: boolean;
};

export const siteNavPrimaryLinks = [
  { label: "About", href: "/about" },
  { label: "Impact", href: "/impact" },
  { label: "Events", href: "/events" },
] as const satisfies readonly SiteNavLink[];

export const siteNavSecondaryLinks = [
  { label: "Contact", href: "/contact", prefetch: false },
  { label: "Get Involved", href: "/contact", prefetch: false },
] as const satisfies readonly SiteNavLink[];

export const siteNavDonateLink = {
  label: "Donate",
  href: "/donate",
} as const satisfies SiteNavLink;
