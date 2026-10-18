import Lifecycle from '@/components/Lifecycle';
import { PageHero, LinkCard } from '@/components/PageParts';
import { SERVICES } from '@/lib/services';

export const metadata = {
  title: 'Services',
  description: 'Equipment supply, installation and commissioning, testing and diagnostics, and maintenance for transformers and substations.'
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Services' }]} label="OUR SERVICES" title="Support Through the Whole Equipment Life"
        desc="From the first specification to decades of service, one team supplies, installs, tests and maintains your power equipment."
        image="/assets/images/lifecycle/05-site-installation.jpg">
        <a className="btn btn--primary" href="/contact/">Discuss Your Project</a>
      </PageHero>

      <section className="sec" aria-label="Services">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">WHAT WE DO</p>
            <h2>Four services, one accountable team</h2>
            <p className="sec-head__desc">Choose a single service or combine them into a turnkey package.</p>
          </header>
          <div className="lgrid">
            {SERVICES.map((s, i) => (
              <LinkCard key={s.slug} href={`/services/${s.slug}/`} image={s.image} kicker={`Service 0${i + 1}`} title={s.title} text={s.short} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      <section id="lifecycle" className="sec sec--dark" aria-label="Project lifecycle"><Lifecycle /></section>
    </>
  );
}
