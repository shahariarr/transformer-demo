import Link from 'next/link';
import { PageHero, ArrowRight } from '@/components/PageParts';
import Stats from '@/components/Stats';
import PartnersDirectory from '@/components/PartnersDirectory';
import { PARTNER_STATS, PARTNERSHIP_PILLARS } from '@/lib/partners';
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

      {/* =========================================================
          4. STRATEGIC PARTNERSHIP PILLARS (Bento Grid)
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Partnership Governance & Quality Assurance">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">QUALITY ASSURANCE INTEGRITY</p>
            <h2>Why Our Global Alliances Safeguard Grid Reliability</h2>
            <p className="sec-head__desc">
              By combining in-house engineering precision with vetted tier-1 international supply chains, BPEL guarantees that transformer losses, BIL impulse limits, and thermal ratings consistently exceed contract specifications.
            </p>
          </header>

          <div className="partners-pillars-grid">
            {PARTNERSHIP_PILLARS.map((pillar, i) => (
              <div key={i} className="partners-pillar-card fade-in-up" data-delay={i * 80}>
                <div className="partners-pillar-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: pillar.icon }} />
                </div>
                <div className="partners-pillar-card__content">
                  <span className="partners-pillar-card__label">{pillar.label}</span>
                  <h3 className="partners-pillar-card__title">{pillar.title}</h3>
                  <p className="partners-pillar-card__desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Partner and Vendor Inquiry Consultation">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TECHNICAL TENDERS &amp; VENDOR PRE-QUALIFICATION</span>
              <h3>Need Vendor Letters, Test Witness Reports, or OEM Configurations?</h3>
              <p>
                For official utility tender submittals, ASTA/CESI witness report verification, custom OEM switchgear integration, or prospective vendor registration, our technical team and directors are directly available.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href="/contact/?ref=partners-page">
                <span>Contact Engineering Directorate</span>
                <ArrowRight />
              </Link>
              <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
