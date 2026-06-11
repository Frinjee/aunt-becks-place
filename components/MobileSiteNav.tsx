"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { site } from "@/lib/content";
import {
  siteNavDonateLink,
  siteNavPrimaryLinks,
  siteNavSecondaryLinks,
  type SiteNavLink,
} from "@/lib/nav";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function NavMenuLink({ link, onNavigate }: { link: SiteNavLink; onNavigate: () => void }) {
  return (
    <li>
      <Link href={link.href} prefetch={link.prefetch} onClick={onNavigate}>
        {link.label}
      </Link>
    </li>
  );
}

export function MobileSiteNav() {
  const menuId = useId();
  const mobileRootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  // Move focus to the first menu link when the panel opens.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const panel = menuPanelRef.current;
    if (!panel) {
      return;
    }

    const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();
  }, [isOpen]);

  // Return focus to the menu button after close so keyboard users keep context.
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      return;
    }

    if (!wasOpenRef.current) {
      return;
    }

    menuButtonRef.current?.focus();
  }, [isOpen]);

  // Keep page content inert while the menu is open so focus cannot leak behind the overlay.
  useEffect(() => {
    const main = document.getElementById("content");
    if (!main) {
      return;
    }

    if (isOpen) {
      main.inert = true;
      return () => {
        main.inert = false;
      };
    }

    main.inert = false;
  }, [isOpen]);

  // Trap Tab inside the open menu and close on Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const root = mobileRootRef.current;
      if (!root) {
        return;
      }

      const focusable = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hasAttribute("disabled") && element.tabIndex !== -1
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isOpen]);

  return (
    <div ref={mobileRootRef} className="site-header__mobile">
      <nav className="site-header__mobile-bar" aria-label="Site">
        <Link className="site-header__mobile-brand" href="/" aria-label={`${site.name} home`}>
          <Image
            className="site-header__mobile-brand-icon"
            src={site.navBarLogo}
            alt=""
            width={site.navBarLogoWidth}
            height={site.navBarLogoHeight}
            sizes="44px"
            priority
          />
        </Link>

        <p className="site-header__mobile-tagline">{site.eyebrow}</p>

        <div className="site-header__mobile-actions">
          <Link className="site-header__mobile-donate" href={siteNavDonateLink.href}>
            {siteNavDonateLink.label}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="site-header__menu-button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <svg aria-hidden="true" className="site-header__menu-icon" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isOpen ? (
        <>
          <button
            type="button"
            className="site-header__mobile-backdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            ref={menuPanelRef}
            id={menuId}
            className="site-header__mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile site navigation"
          >
            <nav aria-label="Mobile site navigation">
              <p className="site-header__mobile-menu-label meta-label">Explore</p>
              <ul className="site-header__mobile-menu-list site-header__mobile-menu-list--primary">
                {siteNavPrimaryLinks.map((link) => (
                  <NavMenuLink key={link.label} link={link} onNavigate={closeMenu} />
                ))}
              </ul>

              <p className="site-header__mobile-menu-label meta-label">Connect</p>
              <ul className="site-header__mobile-menu-list site-header__mobile-menu-list--secondary">
                {siteNavSecondaryLinks.map((link) => (
                  <NavMenuLink key={link.label} link={link} onNavigate={closeMenu} />
                ))}
              </ul>

              <Link
                className="site-header__mobile-menu-donate donations__link"
                href={siteNavDonateLink.href}
                onClick={closeMenu}
              >
                {siteNavDonateLink.label}
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
