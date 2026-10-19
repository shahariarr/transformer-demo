import { notFound } from 'next/navigation';
import { DATA } from '@/lib/data';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';

const find = slug => DATA.projects.find(p => p.slug === slug);

export function generateStaticParams() {
  return DATA.projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = find((await params).slug);
  return p ? { title: p.title, description: p.desc } : {};
}

export default async function ProjectPage({ params }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const others = DATA.projects.filter(x => x.slug !== p.slug).slice(0, 4);
  const specs = (p.specs || '').split('•').map(s => s.trim()).filter(Boolean);

  return (
    <>
      <PageHero crumbs={[{ label: 'Projects', href: '/projects/' }, { label: p.title }]} label={p.cat.toUpperCase()} title={p.title} desc={p.scope} image={p.image} />

      <section className="sec" aria-label="Project details">
        <div className="wrap detail">
          <figure className="detail__media fade-in-left"><img src={p.image} alt={p.title} loading="lazy" decoding="async" /></figure>
          <div className="detail__content">
            <dl className="facts fade-in-up">
              <div><dt>Location</dt><dd>{p.location}</dd></div>
              <div><dt>Category</dt><dd>{p.cat}</dd></div>
              <div><dt>Scope</dt><dd>{p.scope}</dd></div>
            </dl>
            <div className="fade-in-up">
              <h2>Project overview</h2>
              <p className="lead">{p.desc}</p>
            </div>
            {specs.length ? (
              <div className="fade-in-up">
                <h2>Key specifications</h2>
                <ul className="ticks">{specs.map(s => <li key={s}>{s}</li>)}</ul>
              </div>
            ) : null}
            <div className="note-box fade-in-up"><p>Illustrative example only. This is not a project completed by the company.</p></div>
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href="/contact/">Discuss a Similar Project <ArrowRight /></a>
              <a className="btn btn--ghost" href="/projects/">All Projects</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-label="More projects">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">MORE PROJECTS</p><h2>Related deployments</h2></header>
          <div className="lgrid">
            {others.map((o, i) => <LinkCard key={o.slug} href={`/projects/${o.slug}/`} image={o.image} kicker={`${o.cat} • ${o.location}`} title={o.title} text={o.scope} more="View project" delay={i * 80} />)}
          </div>
        </div>
      </section>
    </>
  );
}
