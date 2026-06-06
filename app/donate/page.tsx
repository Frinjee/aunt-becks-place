import { Donations } from "@/components/Donations";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/content";

export const metadata = {
  title: "Donate | Aunt Becks Place",
  description: "Donation QR codes for Aunt Becks Place.",
};

export default function DonatePage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="donate-title">
        <p className="eyebrow">Donations Welcome</p>
        <h1 id="donate-title">Support Aunt Becks Place</h1>
        <p>
          If you practice servant leadership, have donations, or want to volunteer your time and
          talent, connect at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>

      <section className="single-panel" aria-label="Donation QR codes">
        <Reveal>
          <Donations />
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
