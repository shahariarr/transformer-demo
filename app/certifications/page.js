import { PageHero } from '@/components/PageParts';
import CertificatesGrid from '@/components/CertificatesGrid';
import StandardsSection from '@/components/StandardsSection';

export const metadata = {
  title: 'Certifications & Test Reports',
  description: 'ISO management system certificates, conformity attestations and laboratory type test reports.'
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Certifications' }]}
        label="QUALITY & COMPLIANCE"
        title="Certified Quality, Tested Performance"
        desc="Official management system certificates, conformity attestations, and independent laboratory type test reports. Click any document to inspect the verified report."
        image="/assets/images/about-campus.jpg"
      />

      {/* Certificates & Test Reports Grid View */}
      <section className="sec" aria-label="Official Certificates and Test Reports">
        <CertificatesGrid />
      </section>

      {/* Redesigned International Standards Matrix */}
      <section className="sec sec--alt" aria-label="International Engineering Standards">
        <StandardsSection />
      </section>
    </>
  );
}
