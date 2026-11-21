import Link from 'next/link';
import { PageHero, ArrowRight } from '@/components/PageParts';
import Stats from '@/components/Stats';
import PartnersDirectory from '@/components/PartnersDirectory';
import { PARTNER_STATS } from '@/lib/partners';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import styles from './page.module.css';

export const metadata = {
  title: 'Global Partners & Strategic Alliances | BPEL',
  description: 'Explore BPEL global engineering alliances with tier-1 switchgear OEMs (ABB, Siemens, Schneider), accredited testing laboratories (ASTA, CESI/KEMA, UL), and regional utility grid approvals.',
  openGraph: {
    title: 'Global Partners & Strategic Alliances | BPEL Transformer Engineering',
    description: 'Explore BPEL global engineering alliances with tier-1 switchgear OEMs, accredited testing laboratories, and regional utility grid approvals.',
    images: ['/assets/images/about-campus.jpg']
  }
};

export default function PartnersPage() {
  return (
    <>
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }, { label: 'Partners & Alliances' }]}
        label="GLOBAL STRATEGIC ALLIANCES & ACCREDITATIONS"
        title="Engineering Excellence Built on Trusted Global Alliances"
        desc="From European switchgear leaders and Japanese laser-scribed CRGO magnetic cores to ASTA/CESI/KEMA accredited laboratory witnessing and DEWA/BPDB utility approvals, BPEL delivers uncompromised power infrastructure."
        image="/assets/images/about-campus.jpg"
      >
        <Link className="btn btn--primary" href="/contact/">
          <span>Partner &amp; Vendor Inquiries</span>
          <ArrowRight />
        </Link>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* =========================================================
          2. METRICS / STATS BAND (Follows BPEL Stats Bar Standard)
          ========================================================= */}
      <section id="stats" className="stats-bar" aria-label="Partner Key Metrics">
        <Stats items={PARTNER_STATS} />
      </section>

      {/* =========================================================
          3. PARTNERS DIRECTORY WITH INTERACTIVE FILTERS
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Partners and Alliances Directory">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">STRATEGIC ECOSYSTEM &amp; VERIFIED VENDORS</p>
            <h2>Global Technology Partners &amp; Accredited Bodies</h2>
            <p className="sec-head__desc">
              Every unit manufactured at BPEL is backed by certified metallurgy, precision vacuum switchgear, and independent STL-accredited testing witnessing accepted by national power grids worldwide.
            </p>
          </header>

          {/* Interactive Partners Directory */}
          <PartnersDirectory />
        </div>
      </section>
    </>
  );
}
