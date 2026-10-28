import { notFound } from 'next/navigation';
import { DATA, waLink } from '@/lib/data';
import { TRANSFORMER_DETAILS } from '@/lib/products-data';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { WA_PATH } from '@/lib/icons';
import ProductSingleView from '@/components/ProductSingleView';

const find = slug => {
  if (!slug) return null;
  const clean = slug.toLowerCase().replace(/\/$/, '').replace(/\.html$/, '');
  return DATA.products.find(p => p.slug === clean || p.slug === `${clean}-transformers` || p.slug.replace(/-transformers$/, '') === clean) || DATA.products[0];
};

export function generateStaticParams() {
  const base = DATA.products.map(p => ({ slug: p.slug }));
  base.push({ slug: 'pad-mounted' });
  base.push({ slug: 'single-phase-overhead-transformer' });
  return base;
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const p = find(resolved?.slug);
  if (!p) return {};
  if (p.slug === 'single-phase-overhead-transformer-product' || resolved?.slug?.includes('single-phase-overhead-transformer')) {
    return {
      title: 'Single Phase Overhead Transformer | ANSI Certified Manufacturer | BPEL',
      description: 'Discover high-quality single phase overhead transformers for efficient power distribution. Reliable, durable, and designed for optimal performance.'
    };
  }
  if (p.slug === 'pad-mounted-transformers' || resolved?.slug === 'pad-mounted') {
    return {
      title: 'Pad Mounted Transformers | UL 1562 Listed & ANSI/IEEE C57.12.34 Compliant',
      description: 'Tamper-resistant, dead-front pad-mounted transformers designed for underground distribution systems. UL 1562 listed and built to ANSI/IEEE C57.12.34 for utility and commercial networks.'
    };
  }
  const t = TRANSFORMER_DETAILS[p.slug];
  const title = `${p.name} | BPEL Industrial Power Engineering`;
  const description = t?.overviewParagraph?.slice(0, 160) || p.desc;
  return { title, description };
}

export default async function ProductPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const p = find(slug);
  if (!p) notFound();

  const quoteUrl = `/contact/?service=${encodeURIComponent(p.name)}`;
  const waUrl = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent(`Hello BPEL / Engineering Desk, I am inquiring about technical specifications, drawings, and quotation for ${p.name}.`)}`;
  const phoneTel = `tel:${DATA.contact.phoneDisplay.replace(/[^\d+]/g, '')}`;

  const d = TRANSFORMER_DETAILS[p.slug] || {
    ratingMva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${parseInt((p.name.match(/([\d,]+)\s*kva/i) || [])[1].replace(/,/g, '')) / 1000} MVA` : 'Overhead Pole-Mount Unit',
    powerKva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${(p.name.match(/([\d,]+)\s*kva/i) || [])[1]} kVA` : '3 – 333 kVA',
    voltagePrimary: '34.5 kV / 13.8 kV / 11 kV (Custom available)',
    voltageSecondary: '120/240 V, 240/480 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN Natural Convection',
    efficiency: 'Over 60% loss reduction',
    impedance: 'ANSI Standard',
    vectorGroup: 'Single Phase II-0',
    tapChanger: 'Off-Circuit ±2×2.5%',
    fluidType: 'NON-PCB Mineral Insulating Oil',
    soundLevel: '< 55 dB(A)',
    tagline: 'Single Phase Overhead Pole Mounted Transformer for Rural and Municipal Grids',
    overviewParagraph: p.desc
  };

  const others = DATA.products.filter(x => x.slug !== p.slug);

  return (
    <>
      {/* 1. PAGE-HERO SECTION (Matching Product Page Standard) */}
      <PageHero
        crumbs={[{ label: 'Products', href: '/products/' }, { label: p.name }]}
        label={p.cat ? `PRODUCT DOSSIER • ${p.cat.toUpperCase()}` : "TRANSFORMER & SWITCHGEAR"}
        title={p.name}
        desc={d.tagline || p.desc}
        image="/assets/images/factory-bg.png"
      >
        <a className="btn btn--primary" href={quoteUrl}>
          <span>Request a Quote</span>
          <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waUrl || waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
        <a className="btn btn--ghost" href="/products/">
          All Products
        </a>
      </PageHero>

      {/* 2. PRODUCT DETAILED DOSSIER VIEW */}
      <ProductSingleView
        product={p}
        details={d}
        quoteUrl={quoteUrl}
        waUrl={waUrl}
        phoneTel={phoneTel}
        others={others}
      />
    </>
  );
}
