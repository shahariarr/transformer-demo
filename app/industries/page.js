import Industries from '@/components/Industries';
import { PageHero } from '@/components/PageParts';

export const metadata = {
  title: 'Industries',
  description: 'Transformers, substations and switchgear for utilities, industry, commercial buildings, healthcare, water, transport and renewable energy.'
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Industries' }]} label="INDUSTRIES WE SERVE" title="Power for the Sectors That Keep Things Running"
        desc="Each sector puts different demands on its electrical equipment. We design around them."
        image="/assets/images/industries-bg.jpg">
        <a className="btn btn--primary" href="/contact/">Discuss Your Sector</a>
      </PageHero>
      <section id="industries" className="sec sec--dark" aria-label="Industries"><Industries viewAll={false} /></section>
    </>
  );
}
