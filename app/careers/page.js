import { PageHero, Icon } from '@/components/PageParts';
import { CAREER_REASONS, CAREER_AREAS } from '@/lib/resources';
import { DATA } from '@/lib/data';

export const metadata = {
  title: 'Careers',
  description: 'Build what powers industry. Careers in transformer design, manufacturing, testing and field service at BPEL.'
};

const ICONS = [
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
];

export default function CareersPage() {
  const apply = `mailto:${DATA.contact.email}?subject=${encodeURIComponent('Job application')}`;
  return (
    <>
      <PageHero crumbs={[{ label: 'About', href: '/about/' }, { label: 'Careers' }]} label="CAREERS" title="Build What Powers Industry"
        desc="Join the engineers, technicians and specialists who design, build and commission power equipment."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg">
        <a className="btn btn--primary" href={apply}>Send Your CV</a>
      </PageHero>

      <section className="sec" aria-label="Why join us">
        <div className="wrap">
          <header className="sec-head fade-in-up"><p className="label">WHY JOIN US</p><h2>Work that matters, every day</h2></header>
          <div className="lgrid">
            {CAREER_REASONS.map((r, i) => (
              <div className="panel fade-in-up" data-delay={i * 80} key={r.t}>
                <span className="lcard__icon" style={{ margin: 0 }} aria-hidden="true"><Icon d={ICONS[i]} /></span>
                <h3>{r.t}</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)' }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-label="Open positions">
        <div className="wrap split">
          <div>
            <p className="label fade-in-up">TEAMS</p>
            <h2 className="fade-in-up" data-delay="80">Where you could work</h2>
            <ul className="ticks ticks--2col fade-in-up" data-delay="160" style={{ marginTop: '1.5rem' }}>
              {CAREER_AREAS.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <aside className="panel fade-in-right">
            <h3>Open positions</h3>
            <p style={{ margin: 0, color: 'var(--ink-2)' }}>No vacancies are listed on this demo site yet. Send your CV and tell us which team interests you; we keep applications on file for future roles.</p>
            <a className="btn btn--primary" href={apply}>Send Your CV</a>
          </aside>
        </div>
      </section>
    </>
  );
}
