import { PageHero, ArrowRight } from '@/components/PageParts';
import Stats from '@/components/Stats';
import CertificatesGrid from '@/components/CertificatesGrid';
import StandardsSection from '@/components/StandardsSection';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Certifications & Test Reports | BPEL',
  description: 'Official ISO management system certificates, conformity attestations, and independent laboratory type test reports.'
};

const CERT_STATS = [
  { target: 12, suffix: '+', label: 'OFFICIAL TEST CERTIFICATES', format: false },
  { target: 100, suffix: '%', label: 'FACTORY ACCEPTANCE (FAT) RATIO', format: false },
  { target: 200, suffix: ' kV', label: 'BIL IMPULSE WITHSTAND TESTED', format: false },
  { target: 4, suffix: '', label: 'GLOBAL ACCREDITATION BODIES', format: false }
];

export default function CertificationsPage() {
  return (
    <>
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }, { label: 'Certifications' }]}
        label="QUALITY & COMPLIANCE"
        title="Certified Quality, Tested Performance"
        desc="Official management system certificates, conformity attestations, and independent laboratory type test reports. Click any document to inspect the verified report."
        image="/assets/images/about-campus.jpg"
      >
        <a className="btn btn--primary" href="#certificates">
          Inspect Certificates <ArrowRight />
        </a>
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
      <section id="stats" className="stats-bar" aria-label="Key Quality & Certification Metrics">
        <Stats items={CERT_STATS} />
      </section>

      {/* =========================================================
          3. OFFICIAL CERTIFICATES & TEST REPORTS GRID
          ========================================================= */}
      <section id="certificates" className="sec sec--tight" aria-label="Official Certificates and Test Reports">
        <CertificatesGrid />
      </section>

      {/* =========================================================
          4. INTERNATIONAL ENGINEERING STANDARDS MATRIX
          ========================================================= */}
      <section id="standards" className="sec sec--tight sec--alt" aria-label="International Engineering Standards">
        <StandardsSection />
      </section>
    </>
  );
}

