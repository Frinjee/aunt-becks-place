import Image from "next/image";
import Link from "next/link";

import { donationCodes } from "@/lib/content";

type DonationsProps = {
  readonly showCodes?: boolean;
};

export function Donations({ showCodes = true }: DonationsProps) {
  return (
    <article className="donations" aria-labelledby="donations-title">
      <p className="meta-label">Mutual aid</p>
      <h2 id="donations-title">Donations Welcome</h2>
      {showCodes ? (
        <div className="donations__codes" aria-label="QR Codes">
          {donationCodes.map((code) => (
            <figure className="donations__code" key={code.label}>
              <Image src={code.src} alt={code.alt} width={220} height={220} sizes="220px" />
              <figcaption>{code.label}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="donations__summary">
          <p>Support Sunday Dinners and mutual aid that restore the village one meal at a time.</p>
          <Link className="donations__link" href="/donate">
            Donate
          </Link>
        </div>
      )}
    </article>
  );
}
