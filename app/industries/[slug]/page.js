import { notFound } from 'next/navigation';
import { DATA } from '@/lib/data';
import { INDUSTRY_DETAILS } from '@/lib/industries';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';

const find = slug => DATA.industries.find(i => i.slug === slug);

export function generateStaticParams() {
  return DATA.industries.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const i = find((await params).slug);
  return i ? { title: i.name, description: i.desc } : {};
}

export default async function IndustryPage({ params }) {
  const ind = find((await params).slug);
  if (!ind) notFound();
  const d = INDUSTRY_DETAILS[ind.slug] || { intro: ind.desc, needs: [], supply: [] };
  const others = DATA.industries.filter(x => x.slug !== ind.slug).slice(0, 4);

  return (
    <>
      <PageHero crumbs={[{ label: 'Industries', href: '/industries/' }, { label: ind.name }]} label="INDUSTRIES" title={ind.name} desc={ind.desc} image={ind.image}>
        <a className="btn btn--primary" href="/contact/">Discuss Your Project</a>
      </PageHero>

      <section className="sec" aria-label="Industry details">
        <div className="wrap detail">
          <DetailGallery mainImage={ind.image} gallery={d.gallery} alt={ind.name} badgeLabel="Industry Application" />
          <div className="detail__content">
            <div className="fade-in-up">
              <h2>The challenge</h2>
              <p className="lead">{d.intro}</p>
            </div>
            <div className="fade-in-up">
              <h2>What the equipment must do</h2>
              <ul className="ticks">{d.needs.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="fade-in-up">
              <h2>What we supply</h2>
              <ul className="ticks">{d.supply.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="note-box fade-in-up"><p>Illustrative industry until the company&apos;s actual customer sectors are confirmed.</p></div>
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href="/products/">View Products <ArrowRight /></a>
              <a className="btn btn--ghost" href="/services/">Our Services</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-label="Other industries">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">MORE INDUSTRIES</p><h2>Other sectors we serve</h2></header>
          <div className="lgrid">
            {others.map((o, i) => <LinkCard key={o.slug} href={`/industries/${o.slug}/`} image={o.image} title={o.name} text={o.desc} delay={i * 80} />)}
          </div>
        </div>
      </section>
    </>
  );
}
