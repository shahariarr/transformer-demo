'use client';

import { useState } from 'react';
import Link from 'next/link';
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

const CERTIFICATIONS = [
  { code: 'ISO 9001:2015', name: 'Quality Management System', desc: 'Internationally recognised framework ensuring consistent quality across all manufacturing processes.' },
  { code: 'ISO 14001:2015', name: 'Environmental Management System', desc: 'Systematic approach to minimising environmental footprint and energy consumption.' },
  { code: 'ISO 50001:2018', name: 'Energy Management System', desc: 'Framework to continuously improve energy efficiency across manufacturing operations.' },
  { code: 'ISO 45001:2018', name: 'Occupational Health & Safety', desc: 'Occupational health & safety management system for factory and site engineering excellence.' },
  { code: 'ISO/IEC 17025:2017', name: 'Testing Laboratory Accreditation', desc: 'The international gold standard for testing and calibration laboratories worldwide.' },
  { code: 'IEC 60076', name: 'International Power Transformer Standard', desc: 'The primary international standard for transformer design, routine, and type testing.' },
  { code: 'IEC 60076-11', name: 'Dry-Type Transformer Standard', desc: 'Standard for cast resin dry-type and air-cooled transformer manufacturing and testing.' },
  { code: 'UL 1562 Listed', name: 'Pad-Mounted Transformer Standard', desc: 'Underwriters Laboratories listing for pad-mounted units required for global utility networks.' },
  { code: 'UL 1561 Listed', name: 'Dry-Type Distribution Standard', desc: 'UL listing for indoor and outdoor dry-type distribution transformer installations.' },
  { code: 'ANSI / IEEE C57', name: 'North American Transformer Standard', desc: 'The definitive standard series for transformer design and withstand tolerance in the Americas.' },
  { code: 'ISO 3834', name: 'Welding Quality Requirements', desc: 'Standard for fusion welding of metallic materials in transformer tank and radiator fabrication.' },
  { code: 'EcoDesign 2019/1783', name: 'EU Tier 2 Loss Directive', desc: 'European Union mandate for ultra-low no-load core and copper loss performance.' }
];

const WITNESSES = ['CESI (IT)', 'ASTA (UK)', 'INTERTEK (Global)', 'KEMA (NL)', 'DEWA Approved', 'ADNOC Approved', 'ARAMCO Approved', 'TRANSCO Certified'];

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

      {/* =========================================================
          5. CERTIFICATIONS & ACCREDITATIONS
          ========================================================= */}
      <section id="certifications" className="sec sec--tight" aria-label="Certifications & Accreditations">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">CERTIFICATIONS &amp; STANDARDS</p>
            <h2>Globally Certified. Locally Trusted.</h2>
            <p className="sec-head__desc">
              Triple-standard compliance across IEC, ANSI/IEEE, and UL standards — verified by Lloyd&apos;s Register, UKAS, and accredited independent laboratories.
            </p>
          </header>

          <div className="ets-certs-grid">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="ets-cert-card">
                <div className="ets-cert-card__top">
                  <span className="ets-cert-card__num">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="ets-cert-card__text">
                  <h3 className="ets-cert-card__code">{cert.code}</h3>
                  <div className="ets-cert-card__name">{cert.name}</div>
                  <p className="ets-cert-card__desc">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Third-Party Laboratory Witnesses */}
          <div className="ets-witnesses-bar">
            <div className="ets-witnesses-bar__left">
              <span className="label" style={{ marginBottom: '0.25rem' }}>TYPE APPROVALS &amp; WITNESSES</span>
              <h3 className="ets-witnesses-title">Independent Test Laboratories</h3>
              <p className="ets-witnesses-sub">
                Type-test reports witnessed by accredited independent third-party laboratories — approved by utilities and regional grid operators.
              </p>
            </div>
            <div className="ets-witnesses-pills">
              {WITNESSES.map(w => (
                <span key={w} className="ets-witness-pill">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          6. SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Technical Consultation & Quotation">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">GLOBAL ENGINEERING &amp; PROCUREMENT</span>
              <h3>Need an Engineered Transformer Specification or Tender Quotation?</h3>
              <p>
                Our engineering team reviews single-line diagrams (SLD), calculates transformer load flows, evaluates regional grid clearances, and provides type-tested technical submittals.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href="/contact/">
                <span>Request Quotation</span>
                <ArrowRight />
              </Link>
              <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
