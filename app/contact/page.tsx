import type { Metadata } from "next";

import { submitContactForm } from "@/app/contact/actions";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Aunt Becks Place | Get in Touch in Baltimore",
  },
  description:
    "Contact Aunt Becks Place in Baltimore to ask about Sunday dinner, volunteering, donations, partnerships, or community support.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/contact",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/contact",
    title: "Contact Aunt Becks Place | Get in Touch in Baltimore",
    description:
      "Reach out to Aunt Becks Place in Baltimore with questions about free Sunday dinner, volunteering, donations, or partnering to support our neighbors.",
    images: [
      {
        url: "https://www.auntbecksplace.live/images/contact-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aunt Becks Place | Get in Touch in Baltimore",
    description:
      "Contact Aunt Becks Place to learn more about Sunday dinner, mutual-aid support, volunteering, or making a donation in Baltimore City.",
    images: ["https://www.auntbecksplace.live/images/contact-og.jpg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero--contact-match" aria-labelledby="contact-title">
        <h1 id="contact-title" className="page-hero__title--contact-match">
          Connect with Aunt Becks Place
        </h1>
        <p>
          Reach out about volunteering, donations, Sunday dinners, or ways to support community care
          in Baltimore City.
        </p>
      </section>

      <section className="single-panel contact-panel" aria-label="Contact form">
        <Reveal>
          <article className="story-card">
            <p className="meta-label">Send a note</p>
            <h2>Contact form</h2>
            <ContactForm action={submitContactForm} />
          </article>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
