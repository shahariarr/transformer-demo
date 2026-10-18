import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/services';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';

const find = slug => SERVICES.find(s => s.slug === slug);

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = find((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }) {
  const s = find((await params).slug);
  if (!s) notFound();

  return (
    <>
      <PageHero crumbs={[{ label: 'Services', href: '/services/' }, { label: s.title }]} label="SERVICES" title={s.title} desc={s.short} image={s.image}>
        <a className="btn btn--primary" href="/contact/">Request This Service</a>
      </PageHero>

      <section className="sec" aria-label="Service details">
        <div className="wrap detail">
          <figure className="detail__media fade-in-left"><img src={s.image} alt={s.title} loading="lazy" decoding="async" /></figure>
          <div className="detail__content">
            <div className="fade-in-up">
              <h2>Overview</h2>
              <p className="lead">{s.intro}</p>
            </div>
            <div className="fade-in-up">
              <h2>What&apos;s included</h2>
              <ul className="ticks">{s.includes.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href="/contact/">Talk to an Engineer <ArrowRight /></a>
              <a className="btn btn--ghost" href="/engineering/">How We Work</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--dark" aria-label="How it works">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">HOW IT WORKS</p><h2>From first call to completion</h2></header>
          <ol className="steps steps--inline">
            {s.steps.map((t, i) => <li className="fade-in-up" data-delay={i * 80} key={t}><h3>{t}</h3></li>)}
          </ol>
        </div>
      </section>

      <section className="sec sec--alt" aria-label="Other services">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">MORE SERVICES</p><h2>Combine services into one package</h2></header>
          <div className="lgrid">
            {SERVICES.map((o, i) => <LinkCard key={o.slug} href={`/services/${o.slug}/`} image={o.image} title={o.title} text={o.short} delay={i * 80} />)}
          </div>
        </div>
      </section>
    </>
  );
}
