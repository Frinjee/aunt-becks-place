import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

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
          Reach out about volunteering, donations, Sunday dinners, or ways to support community
          care in Baltimore City.
        </p>
      </section>

      <section className="single-panel contact-panel" aria-label="Contact form">
        <Reveal>
          <article className="story-card">
            <p className="meta-label">Send a note</p>
            <h2>Contact form</h2>
            <form
              className="contact-form"
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
            >
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" required />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-topic">What are you reaching out about?</label>
                <select id="contact-topic" name="topic" defaultValue="volunteer" required>
                  <option value="volunteer">Volunteering</option>
                  <option value="donations">Donations</option>
                  <option value="sunday-dinner">Sunday Dinner</option>
                  <option value="community-support">Community support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  minLength={10}
                  required
                />
              </div>

              <p className="form-note">
                This template opens your email app and sends the message to{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>

              <button className="donations__link contact-form__submit" type="submit">
                Send message
              </button>
            </form>
          </article>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
