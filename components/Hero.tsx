import Image from "next/image";

import { site } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="site-title">
      <p className="eyebrow">{site.eyebrow}</p>
      <div className="hero__mark">
        <Image
          src={site.brandMark}
          alt="Aunt Becks Place cross street sign"
          width={180}
          height={180}
          priority
          sizes="(max-width: 720px) 88px, 120px"
        />
      </div>
      <h1 id="site-title">{site.name}</h1>
    </section>
  );
}
