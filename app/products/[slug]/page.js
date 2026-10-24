import { notFound } from 'next/navigation';
import { DATA } from '@/lib/data';
import { TRANSFORMER_DETAILS } from '@/lib/products-data';
import { PageHero, ArrowRight } from '@/components/PageParts';
import PadMountedProductView from '@/components/PadMountedProductView';

const find = slug => {
  if (!slug) return null;
  const clean = slug.toLowerCase().replace(/\/$/, '');
  if (clean === 'pad-mounted' || clean === 'pad-mounted-transformers') {
    return DATA.products.find(p => p.slug === 'pad-mounted-transformers') || {
      name: 'Pad Mounted Transformers',
      slug: 'pad-mounted-transformers',
      cat: 'Transformers',
      desc: 'Tamper-resistant, dead-front pad-mounted transformers designed for underground distribution systems. UL 1562 listed and built to ANSI/IEEE C57.12.34.'
    };
  }
  return DATA.products.find(p => p.slug === clean || p.slug === `${clean}-transformers` || p.slug.replace(/-transformers$/, '') === clean);
};

export function generateStaticParams() {
  const base = DATA.products.map(p => ({ slug: p.slug }));
  base.push({ slug: 'pad-mounted' });
  return base;
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const p = find(resolved?.slug);
  if (!p) return {};
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

const Icons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.28-1.93 1.34-.52.06-1.19.09-3.87-1.02-3.23-1.34-5.32-4.63-5.48-4.85-.16-.22-1.3-1.74-1.3-3.32 0-1.58.83-2.35 1.12-2.67.3-.32.65-.4 0.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.56.27.68.92 2.27 1 2.44.08.17.14.37.03.59-.11.22-.16.35-.32.55-.16.2-.34.45-.49.6-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.71-.08.19-.22.82-.95 1.04-1.28.22-.33.44-.27.73-.16.29.11 1.84.87 2.16 1.03.32.16.54.24.62.38.08.14.08.82-.16 1.5z" />
    </svg>
  )
};

export default async function ProductPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const p = find(slug);
  if (!p) notFound();

  const quoteUrl = `/contact/?service=${encodeURIComponent(p.name)}`;
  const waUrl = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent(`Hello BPEL / ETS Engineering Desk, I am inquiring about technical specifications, GA drawings, and pricing for the ${p.name}.`)}`;
  const phoneTel = `tel:${DATA.contact.phoneDisplay.replace(/[^\d+]/g, '')}`;

  // Load detailed engineering model data, with safe fallback
  const d = TRANSFORMER_DETAILS[p.slug] || {
    ratingMva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${parseInt((p.name.match(/([\d,]+)\s*kva/i) || [])[1].replace(/,/g, '')) / 1000} MVA` : 'Power Unit',
    powerKva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${(p.name.match(/([\d,]+)\s*kva/i) || [])[1]} kVA` : 'Standard Rating',
    voltagePrimary: '33 kV / 11 kV (Custom available)',
    voltageSecondary: '11 kV / 6.6 kV / 415 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN / ONAF Forced Air',
    efficiency: '99.35% (at 75°C)',
    impedance: '6.5% – 7.5%',
    vectorGroup: 'Dyn11 (Standard)',
    tapChanger: 'Off-Circuit ±2×2.5% or OLTC',
    fluidType: 'Naphthenic Mineral Oil (IEC 60296)',
    soundLevel: '< 60 dB(A)',
    bilImpulse: '170 kV (33kV) / 75 kV (11kV)',
    powerFrequencyAc: '70 kV / 28 kV (1 min)',
    windingMaterial: 'Electrolytic Grade OFHC Copper',
    coreMaterial: 'Hi-B Laser-Scribed CRGO Steel',
    insulationClass: 'Class A, Winding 65K Rise',
    tankConstruction: 'Welded Steel Tank with Anti-Corrosion Coating',
    totalWeight: 'Engineered to specification',
    dimensions: 'Custom plinth dimensions',
    noLoadLoss: 'Guaranteed Low Loss',
    loadLoss: 'Optimized to IEC standards',
    tagline: p.slug === 'pad-mounted-transformers' ? 'Tamper-Resistant, Dead-Front Underground Distribution Transformer' : 'High-Performance Power & Industrial Distribution Transformer',
    overviewParagraph: p.desc
  };

  const others = DATA.products.filter(x => x.slug !== p.slug);

  return (
    <>
      {/* 1. Page Hero with Breadcrumbs & Action Buttons */}
      <PageHero
        crumbs={[{ label: 'Products', href: '/products/' }, { label: p.name }]}
        label={p.cat ? `${p.cat.toUpperCase()} · HIGH-SPECIFICATION UNIT` : "HIGH-CAPACITY POWER TRANSFORMER"}
        title={p.name}
        desc={d.tagline || p.desc}
      >
        <a className="btn btn--primary" href={quoteUrl}>
          Request Specification Quote <ArrowRight />
        </a>
        <a className="btn btn--ghost" href={waUrl} target="_blank" rel="noopener noreferrer">
          <Icons.WhatsApp /> WhatsApp Tech Desk
        </a>
        <a className="btn btn--ghost" href="/products/">
          All Products
        </a>
      </PageHero>

      {/* 2. Full Emirates Transformer Cloned Showcase & Technical Dossier */}
      <PadMountedProductView
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
