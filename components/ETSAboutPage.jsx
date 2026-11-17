'use client';

import { PageHero, ArrowRight } from '@/components/PageParts';
import Stats from '@/components/Stats';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

const ETS_STATS = [
  { target: 1987, suffix: '', label: 'FOUNDED IN DUBAI', format: false },
  { target: 1000, suffix: '+', label: 'GLOBAL EMPLOYEES', format: true },
  { target: 4, suffix: '', label: 'MANUFACTURING CAMPUSES', format: false },
  { target: 45, suffix: '+', label: 'EXPORT COUNTRIES', format: false }
];

const TIMELINE = [
  {
    year: '1969',
    title: 'Patel Trading Company (PTC) Founded',
    desc: 'Patel Trading Company (PTC) founded — laying the engineering foundation for what would become ETS.',
    image: '/assets/images/lifecycle/01-requirement-approval.jpg',
    badge: 'Foundation'
  },
  {
    year: '1983',
    title: 'Acquisition of IEO Transformatoren BV',
    desc: 'IEO Transformatoren BV acquired in the Netherlands — adding European engineering heritage and IEC manufacturing capability.',
    image: '/assets/images/services/supply-warehouse.jpg',
    badge: 'European Heritage'
  },
  {
    year: '1987',
    title: 'Emirates Transformer & Switchgear Founded in Dubai',
    desc: 'Emirates Transformer & Switchgear founded in Dubai. First manufacturing facility commissioned in the UAE.',
    image: '/assets/images/about-campus.jpg',
    badge: 'UAE Manufacturing'
  },
  {
    year: '2026',
    title: 'Powering Infrastructure Worldwide',
    desc: 'Today: engineered transformers and switchgear powering utilities, industry and renewables worldwide.',
    image: '/assets/images/projects/substation-installation.jpg',
    badge: 'Present Day'
  }
];

export default function ETSAboutPage() {
  return (
    <div className="ets-page-wrap">
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }, { label: 'Emirates Transformer & Switchgear' }]}
        label="GLOBAL MANUFACTURING & ENGINEERING"
        title="Emirates Transformer & Switchgear (ETS)"
        desc="Founded in Dubai in 1987, ETS is Dubai's pioneer and most experienced transformer manufacturer with four world-class manufacturing campuses across the UAE and Europe, type-approved by DEWA, ADNOC, and ARAMCO."
        image="/assets/images/about-campus.jpg"
      >
        <a className="btn btn--primary" href="#heritage">
          Explore Heritage <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* =========================================================
          2. METRICS / STATS BAND (Follows BPEL Stats Bar Standard)
          ========================================================= */}
      <section id="stats" className="stats-bar" aria-label="Key Milestones & Metrics">
        <Stats items={ETS_STATS} />
      </section>

      {/* =========================================================
          3. HERITAGE & MILESTONES TIMELINE
          ========================================================= */}
      <section id="heritage" className="sec sec--tight" aria-label="Our Heritage & Milestones">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">OUR HERITAGE</p>
            <h2>Nearly Four Decades of Engineering Impact</h2>
            <p className="sec-head__desc">
              Key industrial and engineering milestones that established ETS as an international leader in high-voltage power transformation.
            </p>
          </header>

          <div className="ets-timeline">
            <div className="ets-timeline__line" aria-hidden="true" />

            <div className="ets-timeline__items">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div key={item.year} className={`ets-timeline-row ${isEven ? 'ets-timeline-row--reverse' : ''}`}>
                    {/* Media Card */}
                    <div className="ets-timeline-col ets-timeline-col--media">
                      <div className="ets-timeline-card">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="ets-timeline-card__img"
                        />
                        <div className="ets-timeline-card__overlay" />
                        <span className="ets-timeline-card__watermark">{item.year}</span>
                      </div>
                    </div>

                    {/* Timeline Node Center Dot */}
                    <div className="ets-timeline-node">
                      <div className="ets-timeline-node__dot" />
                    </div>

                    {/* Content Card */}
                    <div className="ets-timeline-col ets-timeline-col--content">
                      <div className="ets-timeline-info">
                        <div className="ets-timeline-tag-row">
                          <span className="ets-timeline-bar" />
                          <span className="ets-timeline-badge">{item.badge}</span>
                          <span className="ets-timeline-year-tag">{item.year}</span>
                        </div>
                        <h3 className="ets-timeline-item-title">{item.title}</h3>
                        <p className="ets-timeline-item-desc">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
