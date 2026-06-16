import type { Metadata } from "next";

const CONTACT_EMAIL = "jenifer_hammond@pm.me";

export const metadata: Metadata = {
  title: {
    absolute: "WebX service discontinued",
  },
  description:
    "This website is no longer in service. Project assets are available upon email request until July 1, 2026.",
  alternates: {
    canonical: "https://www.auntbecksplace.live/",
  },
  openGraph: {
    type: "website",
    siteName: "Aunt Becks Place",
    url: "https://www.auntbecksplace.live/",
    title: "WebX service discontinued",
    description:
      "This website is no longer in service. Project assets are available upon email request until July 1, 2026.",
  },
  twitter: {
    card: "summary",
    title: "WebX service discontinued",
    description:
      "This website is no longer in service. Project assets are available upon email request until July 1, 2026.",
  },
};

export default function Home() {
  return (
    <section className="notice" aria-labelledby="notice-title">
      <h1 id="notice-title">WebX service discontinued</h1>
      <p>This website is no longer in service.</p>
      <p>
        Project assets are saved until July 1, 2026 and are available upon email request. Requests
        must be submitted by June 30, 2026 at 11:59 PM Eastern Time. Nothing will be stored past
        July 1, 2026.
      </p>
      <p>
        For asset requests, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </section>
  );
}
