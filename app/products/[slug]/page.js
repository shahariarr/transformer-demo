import { notFound } from 'next/navigation';
import { DATA } from '@/lib/data';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';

const find = slug => DATA.products.find(p => p.slug === slug);

export function generateStaticParams() {
  return DATA.products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = find((await params).slug);
  return p ? { title: p.name, description: p.desc } : {};
}

const APPLICATIONS = ['Utility primary and distribution substations', 'Industrial plants and heavy process loads', 'Commercial and infrastructure projects', 'Renewable energy grid connection'];

export default async function ProductPage({ params }) {
  const p = find((await params).slug);
  if (!p) notFound();

  const rating = (p.name.match(/([\d,]+)\s*kva/i) || [])[1];
  const specs = p.specs || [];
  const rows = [
    ...(rating ? [['Rated power', `${rating} kVA`]] : []),
    ['Type', p.cat === 'Transformers' ? 'Oil-immersed transformer' : p.cat],
    ...specs.filter(s => s.includes(':')).map(s => { const [k, ...v] = s.split(':'); return [k.trim(), v.join(':').trim()]; })
  ];
  const features = specs.filter(s => !s.includes(':'));
  const others = DATA.products.filter(x => x.slug !== p.slug);
  const quote = `/contact/?service=${encodeURIComponent(p.name)}`;

  return (
    <>
      <PageHero crumbs={[{ label: 'Products', href: '/products/' }, { label: p.name }]} label={p.cat.toUpperCase()} title={p.name} desc={p.desc}>
        <a className="btn btn--primary" href={quote}>Request a Quote</a>
        <a className="btn btn--ghost" href="/products/">All Products</a>
      </PageHero>

      <section className="sec" aria-label="Product details">
        <div className="wrap detail">
          <figure className="detail__media detail__media--contain fade-in-left">
            <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
          </figure>
          <div className="detail__content">
            <div className="fade-in-up">
              <h2>Technical overview</h2>
              <table className="spec-table">
                <tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody>
              </table>
            </div>
            {features.length ? (
              <div className="fade-in-up">
                <h2>Key features</h2>
                <ul className="ticks">{features.map(f => <li key={f}>{f}</li>)}</ul>
              </div>
            ) : null}
            <div className="fade-in-up">
              <h2>Typical applications</h2>
              <ul className="ticks">{APPLICATIONS.map(a => <li key={a}>{a}</li>)}</ul>
            </div>
            <div className="note-box fade-in-up"><p>Full technical specifications and product details will be added once the company supplies them. Final ratings are confirmed for each project.</p></div>
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href={quote}>Request a Quote <ArrowRight /></a>
              <a className="btn btn--ghost" href="/resources/sizing-guide/">Sizing Guide</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-label="Other products">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">MORE PRODUCTS</p><h2>Other ratings in the range</h2></header>
          <div className="lgrid">
            {others.map((o, i) => (
              <LinkCard key={o.slug} href={`/products/${o.slug}/`} image={o.image} contain kicker={o.cat} title={o.name} text={o.desc} more="View product" delay={(i % 4) * 80} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
