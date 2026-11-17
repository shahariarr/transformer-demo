'use client';

import { useState } from 'react';
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

const FACILITIES = [
  {
    id: 'dubai-jafza',
    name: 'ETS Manufacturing LLC',
    tag: 'Group HQ',
    location: 'Dubai, JAFZA — UAE',
    area: '35,000 m² Campus',
    capacity: 'Up to 132 kV / 100 MVA',
    desc: 'Group HQ and primary manufacturing campus. ISO/IEC 17025 accredited test lab, full R&D and engineering centre.',
    image: '/assets/images/about-campus.jpg',
    highlights: ['ISO/IEC 17025 Accredited Test Lab', 'Full R&D & Engineering Centre', 'Primary Power Transformer Campus', 'Certified by DEWA, ADNOC & ARAMCO']
  },
  {
    id: 'switchgear-dip',
    name: 'HS Transformer & Switchgear',
    tag: 'Switchgear Hub',
    location: 'Dubai Investment Park — UAE',
    area: '18,500 m² Facility',
    capacity: '11 kV – 33 kV MV & LV',
    desc: 'Dedicated switchgear and package substation manufacturing center, delivering medium-voltage and low-voltage distribution assemblies.',
    image: '/assets/images/projects/mv-switchgear-installation.jpg',
    highlights: ['Air & Gas Insulated Switchgear', 'Turnkey Package Substations', 'Motor Control Centers (MCC)', 'Form 4 Type-Tested Assemblies']
  },
  {
    id: 'rak-plant',
    name: 'ETS Ras Al Khaimah',
    tag: '12,000 MT/yr',
    location: 'Ras Al Khaimah, UAE',
    area: '12,000 MT/year Capacity',
    capacity: 'Tank Fabrication & Radiators',
    desc: 'Heavy fabrication and tank manufacturing campus with 12,000 MT annual throughput, precision core slitting and advanced surface treatment lines.',
    image: '/assets/images/services/installation-crane.jpg',
    highlights: ['12,000 MT/year Capacity', 'Precision Step-Lap CRGO Cores', 'Hermetic Corrugated Tanks', 'Automated Shot-Blasting Sa 2.5']
  },
  {
    id: 'ieo-netherlands',
    name: 'IEO Transformatoren BV',
    tag: 'EU Hub',
    location: 'Netherlands',
    area: 'EU Manufacturing Center',
    capacity: 'Cast Resin & Dry-Type',
    desc: 'European manufacturing and engineering hub specializing in cast resin dry-type transformers, EcoDesign Tier 2 compliance, and European utility support.',
    image: '/assets/images/about-tower.jpg',
    highlights: ['European Engineering Heritage', 'Cast Resin Dry-Type Transformers', 'EcoDesign Tier 2 Compliance', 'European Grid Type Approvals']
  }
];

export default function ETSAboutPage() {
  const [activeFacility, setActiveFacility] = useState(FACILITIES[0]);

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
        <a className="btn btn--primary" href="#facilities">
          Explore Facilities <ArrowRight />
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

      {/* =========================================================
          4. GLOBAL FOOTPRINT (4 MANUFACTURING FACILITIES)
          ========================================================= */}
      <section id="facilities" className="sec sec--alt" aria-label="Global Manufacturing Campuses">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">GLOBAL MANUFACTURING FOOTPRINT</p>
            <h2>Four World-Class Facilities Across UAE &amp; Europe</h2>
            <p className="sec-head__desc">
              Over 65,000 m² of specialized production capacity engineered to international IEC, ANSI/IEEE, and UL standards.
            </p>
          </header>

          <div className="ets-facilities-layout">
            {/* Left Column: Interactive Facility Tabs */}
            <div className="ets-facilities-tabs" role="tablist" aria-label="Facility selection">
              {FACILITIES.map(fac => {
                const isSelected = activeFacility.id === fac.id;
                return (
                  <button
                    key={fac.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`ets-facility-tab ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveFacility(fac)}
                  >
                    <div className="ets-facility-tab__icon">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z" />
                      </svg>
                    </div>
                    <div className="ets-facility-tab__content">
                      <div className="ets-facility-tab__top">
                        <h3 className="ets-facility-tab__name">{fac.name}</h3>
                        <span className="ets-facility-tab__tag">{fac.tag}</span>
                      </div>
                      <p className="ets-facility-tab__loc">{fac.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Dynamic Facility Visual Showcase */}
            <div className="ets-facility-showcase">
              <div className="ets-facility-showcase__media">
                <img
                  src={activeFacility.image}
                  alt={activeFacility.name}
                  className="ets-facility-showcase__img"
                />
                <div className="ets-facility-showcase__overlay">
                  <span className="ets-facility-showcase__pill">{activeFacility.location}</span>
                </div>
              </div>

              <div className="ets-facility-showcase__body">
                <div className="ets-facility-showcase__head">
                  <div>
                    <span className="ets-facility-showcase__tag">{activeFacility.tag}</span>
                    <h3 className="ets-facility-showcase__title">{activeFacility.name}</h3>
                  </div>
                  <div className="ets-facility-showcase__meta">
                    <span className="ets-facility-showcase__metric-val">{activeFacility.capacity}</span>
                    <span className="ets-facility-showcase__metric-lbl">{activeFacility.area}</span>
                  </div>
                </div>

                <p className="ets-facility-showcase__desc">{activeFacility.desc}</p>

                <div className="ets-facility-showcase__specs">
                  {activeFacility.highlights.map((h, i) => (
                    <div key={i} className="ets-facility-spec-item">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ets-spec-check" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
