import ProductsDirectory from '@/components/ProductsDirectory';
import { PageHero } from '@/components/PageParts';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import styles from './page.module.css';

export const metadata = {
  title: 'Transformer & Switchgear Catalogue | Proven to Perform',
  description: 'Explore the complete product catalogue — power and distribution transformers, cast-resin dry type, pad-mounted units, package substations and LV/MV switchgear built to IEC 60076 and IEC 61439 for utility, renewable and industrial projects.'
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        label="TRANSFORMER & SWITCHGEAR CATALOGUE"
        title="Every Unit. Proven to Perform."
        desc="Explore our full product catalogue — power and distribution transformers, cast-resin dry type, pad-mounted units, package substations, and LV/MV switchgear built to IEC 60076 and IEC 61439 for critical utility, renewable, and industrial projects."
        image="/assets/images/factory-bg.png"
      >
        <a className="btn btn--primary" href="/contact/">
          <span>Request a Quote</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '4px' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      <section className="sec sec--alt" aria-label="Product range">
        <ProductsDirectory />
      </section>
    </>
  );
}
