'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATS = [
  { value: '1987', label: 'FOUNDED', sub: 'Established in Dubai, UAE' },
  { value: '1,000+', label: 'EMPLOYEES', sub: 'Global Engineering & Technical Staff' },
  { value: '4', label: 'FACILITIES', sub: 'Campuses Across UAE & Europe' },
  { value: '45+', label: 'COUNTRIES', sub: 'Critical Utility & Industrial Grids' }
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
  { code: 'ISO 9001:2015', name: 'Quality Management System', desc: 'Quality Management System — internationally recognised framework ensuring consistent quality across all manufacturing processes.' },
  { code: 'ISO 14001:2015', name: 'Environmental Management System', desc: 'Environmental Management System — systematic approach to minimising environmental impact.' },
  { code: 'ISO 50001:2018', name: 'Energy Management System', desc: 'Energy Management System — systematic framework to improve energy performance, efficiency, and consumption across manufacturing operations.' },
  { code: 'ISO 45001:2018', name: 'Occupational Health & Safety', desc: 'Occupational Health & Safety Management System for workplace safety excellence.' },
  { code: 'ISO/IEC 17025:2017', name: 'Testing Laboratory Accreditation', desc: 'Testing Laboratory Accreditation — the gold standard for testing and calibration laboratories worldwide.' },
  { code: 'IEC 60076', name: 'International Power Transformer Standard', desc: 'International Power Transformer Standard — the primary standard for transformer design and testing globally.' },
  { code: 'IEC 60076-11', name: 'Dry-Type Transformer Standard', desc: 'Dry-Type Transformer Standard for cast resin and air-cooled transformer design and testing.' },
  { code: 'UL 1562 Listed', name: 'Pad-Mounted Transformer Standard', desc: 'Underwriters Laboratories listing for pad-mounted transformers — required for North American utility markets.' },
  { code: 'UL 1561 Listed', name: 'Dry-Type Distribution Transformers', desc: 'UL listing for dry-type distribution transformers for indoor and outdoor applications.' },
  { code: 'ANSI / IEEE C57', name: 'North American Transformer Standard', desc: 'North American Transformer Standard — the definitive standard series for transformer design and testing in the Americas.' },
  { code: 'ISO 3834', name: 'Welding Quality Requirements', desc: 'Welding Quality Requirements — comprehensive standard for fusion welding of metallic materials in transformer tank and structural fabrication.' }
];

const WITNESSES = ['CESI (IT)', 'ASTA (UK)', 'INTERTEK (Global)', 'KEMA (NL)', 'DEWA Approved', 'ADNOC Approved', 'ARAMCO Approved', 'TRANSCO Certified'];

export default function ETSAboutPage() {
  const [activeFacility, setActiveFacility] = useState(FACILITIES[0]);

  return (
    <div className="ets-about-page">
      {/* =========================================================
          1. HERO SECTION (Cloned from /about/ PageHero)
          ========================================================= */}
      <section className="page-hero ets-about-hero" aria-label="About ETS Hero">
        <img
          src="/assets/images/about-campus.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="page-hero__img ets-about-hero__bg"
        />

        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about/">About Us</Link></li>
              <li><span aria-current="page">ETS</span></li>
            </ol>
          </nav>

          <p className="label fade-in-up">ABOUT ETS</p>

          <h1 className="fade-in-up" data-delay="80">
            Engineering Excellence Since 1987.
          </h1>

          <p className="page-hero__desc ets-about-hero__desc fade-in-up" data-delay="160">
            From a single facility in Dubai to a global network — powering critical infrastructure worldwide.
          </p>
         
        </div>
      </section>

      {/* =========================================================
          2. METRICS / STATS BAND
          ========================================================= */}
      <section className="ets-about-stats-sec" aria-label="Key Milestones & Metrics">
        <div className="wrap">
          <div className="ets-about-stats-box">
            <div className="ets-about-stats-grid">
              {STATS.map((s, idx) => (
                <div key={idx} className="ets-about-stat-item">
                  <div className="ets-about-stat-value">{s.value}</div>
                  <div className="ets-about-stat-label">{s.label}</div>
                  <div className="ets-about-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. HERITAGE / TIMELINE SECTION ("Our Heritage")
          ========================================================= */}
      <section id="heritage" className="ets-about-heritage-sec" aria-label="Our Heritage & Milestones">
        <div className="wrap">
          <div className="ets-about-sec-head text-center">
            <span className="ets-about-kicker">Our Heritage</span>
            <h2 className="ets-about-title">Nearly Four Decades of Impact.</h2>
            <p className="ets-about-subtitle">
              Key engineering and industrial milestones that shaped ETS into a global power infrastructure leader.
            </p>
          </div>

          <div className="ets-timeline">
            <div className="ets-timeline__line" aria-hidden="true" />

            <div className="ets-timeline__items">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <div key={item.year} className={`ets-timeline-row ${isEven ? 'ets-timeline-row--reverse' : ''}`}>
                    {/* Media Card */}
                    <div className="ets-timeline-col ets-timeline-col--media">
                      <div className="ets-timeline-card group">
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
                        <span className="ets-timeline-watermark-lg">{item.year}</span>
                        <div className="ets-timeline-tag-row">
                          <span className="ets-timeline-bar" />
                          <span className="ets-timeline-badge">{item.badge} · {item.year}</span>
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
          4. GLOBAL FOOTPRINT / FACILITIES SELECTOR
          ========================================================= */}
      <section id="facilities" className="ets-about-facilities-sec" aria-label="Global Manufacturing Facilities">
        <div className="wrap">
          <div className="ets-about-sec-head">
            <span className="ets-about-kicker">Global Footprint</span>
            <h2 className="ets-about-title">Four Facilities. UAE &amp; Europe.</h2>
            <p className="ets-about-facilities-tag">4 world-class campuses · UAE &amp; European Union</p>
          </div>

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
                    className={`ets-facility-tab ${isSelected ? 'ets-facility-tab--active' : ''}`}
                    onClick={() => setActiveFacility(fac)}
                  >
                    <div className="ets-facility-tab__icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ets-spec-check" aria-hidden="true">
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
          5. CERTIFICATIONS & STANDARDS SECTION
          ========================================================= */}
      <section id="certifications" className="ets-about-certs-sec" aria-label="Certifications and Testing Accreditations">
        <div className="wrap">
          <div className="ets-about-certs-head">
            <div>
              <span className="ets-about-kicker">Certifications &amp; Standards</span>
              <h2 className="ets-about-title">Globally Certified. Locally Trusted.</h2>
            </div>
            <p className="ets-about-certs-lead">
              Triple-standard compliance across IEC, ANSI/IEEE, and UL — rare among Middle Eastern manufacturers. Audited by Lloyd&apos;s Register and UKAS-recognised bodies.
            </p>
          </div>

          <div className="ets-certs-grid">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="ets-cert-card group">
                <div className="ets-cert-card__icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="8" r="6" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
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
              <h3 className="ets-witnesses-title">Independent Test Witnesses</h3>
              <p className="ets-witnesses-sub">
                Type-test reports witnessed by independent third-party laboratories — accepted by utilities and grid operators worldwide.
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
          6. CALL TO ACTION SECTION ("Ready to Partner With Us?")
          ========================================================= */}
      <section className="ets-about-cta-sec" aria-label="Partner With ETS">
        <div className="wrap">
          <div className="ets-about-cta-card">
            <div className="ets-about-cta-inner">
              <div>
                <h2 className="ets-about-cta-heading">Ready to Partner With Us?</h2>
                <p className="ets-about-cta-sub">
                  Whether you need a technical consultation or a competitive quotation — our team is ready.
                </p>
              </div>

              <div className="ets-about-cta-actions">
                <Link href="/contact/" className="ets-about-cta-btn ets-about-cta-btn--quote group">
                  <span>Get a Quote</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact/" className="ets-about-cta-btn ets-about-cta-btn--contact">
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
