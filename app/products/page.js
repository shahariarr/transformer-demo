import Products from '@/components/Products';
import { PageHero, ArrowRight } from '@/components/PageParts';

export const metadata = {
  title: 'Products',
  description: 'Oil-immersed power and distribution transformers from 4,000 to 16,000 kVA, built for utility and industrial networks.'
};

const OPTIONS = [
  'Copper or aluminium windings',
  'Primary voltage from 10 kV to 35 kV',
  '50 Hz or 60 Hz operation',
  'Off-circuit or on-load tap changers',
  'Conservator or hermetically sealed tank',
  'ONAN or ONAF cooling',
  'Vector group and impedance to suit your network',
  'Low-loss designs for reduced running cost'
];

export default function ProductsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Products' }]} label="OUR PRODUCTS" title="Transformers Engineered for Critical Power"
        desc="Oil-immersed power and distribution transformers designed, built and tested in-house, from 4,000 to 16,000 kVA."
        image="/assets/images/factory-bg.png">
        <a className="btn btn--primary" href="/contact/">Request a Quote</a>
        <a className="btn btn--ghost" href="/resources/sizing-guide/">Size Your Transformer</a>
      </PageHero>

      <section className="sec sec--alt" aria-label="Product range"><Products viewAll={false} /></section>

      <section className="sec" aria-label="Custom engineering">
        <div className="wrap split">
          <div>
            <p className="label fade-in-up">BUILT TO YOUR SPECIFICATION</p>
            <h2 className="fade-in-up" data-delay="80">Every unit configured for its site</h2>
            <p className="lead fade-in-up" data-delay="160">Standard ratings are a starting point. Each transformer is designed around the voltage, load profile, installation and standards of the project it is going into.</p>
            <ul className="ticks ticks--2col fade-in-up" data-delay="240" style={{ marginTop: '1.75rem' }}>
              {OPTIONS.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>
          <aside className="panel fade-in-right">
            <h3>Not sure what rating you need?</h3>
            <p>Use our sizing guide to estimate the kVA from your load, or send us your single-line diagram and our engineers will size it for you.</p>
            <div className="detail__actions">
              <a className="btn btn--primary" href="/resources/sizing-guide/">Sizing Guide <ArrowRight /></a>
              <a className="btn btn--ghost" href="/contact/">Ask an Engineer</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
