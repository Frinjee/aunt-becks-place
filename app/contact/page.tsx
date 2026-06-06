import { submitContactForm } from "@/app/contact/actions";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact | Aunt Becks Place",
  description: "Contact Aunt Becks Place about volunteering, donations, and community care.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero" aria-labelledby="contact-title">
        <h1 id="contact-title">Connect with Aunt Becks Place</h1>
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
