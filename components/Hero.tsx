import Image from "next/image";

import { site } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="site-title">
      <h1 className="hero__title" id="site-title">
        <Image
          className="hero__title-logo"
          src={site.heroLogo}
          alt={site.name}
          width={1376}
          height={768}
          priority
          sizes="100vw"
        />
      </h1>
    </section>
  );
}
