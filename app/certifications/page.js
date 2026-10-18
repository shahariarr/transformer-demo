import Quality from '@/components/Quality';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { STANDARDS } from '@/lib/resources';

export const metadata = {
  title: 'Certifications & Test Reports',
  description: 'ISO management system certificates, conformity attestations and laboratory type test reports.'
};

export default function CertificationsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About', href: '/about/' }, { label: 'Certifications' }]} label="QUALITY & COMPLIANCE" title="Certified Quality, Tested Performance"
        desc="Management system certificates and independent laboratory test reports. Click any document to inspect it." />

      <section className="sec" aria-label="Certificates"><Quality showWhy={false} /></section>

      <section className="sec sec--alt" aria-label="Standards">
        <div className="wrap split">
          <div>
            <p className="label fade-in-up">STANDARDS</p>
            <h2 className="fade-in-up" data-delay="80">Designed and tested to international standards</h2>
            <p className="lead fade-in-up" data-delay="160">Our transformers and quality systems follow recognised IEC, IEEE and ISO standards.</p>
            <p className="fade-in-up" data-delay="240"><a className="btn btn--primary" href="/resources/standards/">All Standards <ArrowRight /></a></p>
          </div>
          <dl className="deflist fade-in-right">
            {STANDARDS.slice(0, 7).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </section>
    </>
  );
}
