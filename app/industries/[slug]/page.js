import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { INDUSTRY_DETAILS } from '@/lib/industries';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import Stats from '@/components/Stats';

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const find = slug => DATA.industries.find(i => i.slug === slug);

export function generateStaticParams() {
  return DATA.industries.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const i = find((await params).slug);
  return i ? { title: `${i.name} | Sector Applications | BPEL`, description: i.desc } : {};
}

const INDUSTRY_STATS_MAP = {
  'power-utilities-and-grid-infrastructure': [
    { target: 132, suffix: ' kV', label: 'MAX TRANSMISSION CLASS', format: false },
    { target: 100, suffix: ' MVA', label: 'SUBSTATION UNIT CAPACITY', format: false },
    { target: 140, suffix: '+', label: 'UTILITY SUBSTATIONS ENERGISED', format: false },
    { target: 40, suffix: '+ Yrs', label: 'DESIGN LIFESPAN (IEC 60076)', format: false }
  ],
  'manufacturing-and-industrial-facilities': [
    { target: 100, suffix: '%', label: 'CONTINUOUS MOTOR-DUTY RATING', format: false },
    { target: 35, suffix: ' kV', label: 'PRIMARY MV VOLTAGE CLASS', format: false },
    { target: 4000, suffix: ' kVA', label: 'INDIVIDUAL UNIT CAPACITY', format: true },
    { target: 24, suffix: '/7', label: 'UNINTERRUPTED PLANT RELIABILITY', format: false }
  ],
  'textile-and-garment-industries': [
    { target: 100, suffix: '%', label: 'CONTINUOUS RUNTIME RATING', format: false },
    { target: 50, suffix: ' °C', label: 'TROPICAL AMBIENT TOLERANCE', format: false },
    { target: 33, suffix: ' kV', label: 'INCOMING MV PRIMARY FEED', format: false },
    { target: 0, suffix: ' Downtime', label: 'MISSION CRITICAL UPTIME', format: false }
  ],
  'commercial-buildings-and-real-estate': [
    { target: 1, suffix: ' Class', label: 'F1 FIRE-RETARDANT CAST RESIN', format: false },
    { target: 55, suffix: ' dB(A)', label: 'ULTRA-LOW ACOUSTIC NOISE', format: false },
    { target: 33, suffix: ' kV', label: 'INDOOR COMPACT SUBSTATIONS', format: false },
    { target: 100, suffix: '%', label: 'ZERO LIQUID LEAKAGE HAZARD', format: false }
  ],
  'hospitals-and-healthcare-facilities': [
    { target: 100, suffix: '%', label: 'DUAL REDUNDANT FAILOVER', format: false },
    { target: 0, suffix: ' ms', label: 'ISOLATION NOISE MITIGATION', format: false },
    { target: 1, suffix: ' Class', label: 'F1 DRY-TYPE SAFE OPERATION', format: false },
    { target: 24, suffix: '/7', label: 'LIFE-SUPPORT POWER UPTIME', format: false }
  ],
  'water-treatment-and-public-infrastructure': [
    { target: 100, suffix: '%', label: 'HEAVY PUMPING MOTOR TOLERANCE', format: false },
    { target: 65, suffix: ' Sa', label: 'IP65 WEATHERPROOF CORROSION C5', format: false },
    { target: 33, suffix: ' kV', label: 'PRIMARY TRANSMISSION STEP-DOWN', format: false },
    { target: 35, suffix: '+ Yrs', label: 'OUTDOOR INFRASTRUCTURE LIFE', format: false }
  ],
  'transportation-and-metro-infrastructure': [
    { target: 33, suffix: ' kV', label: 'TRACTION & AUXILIARY STEP-DOWN', format: false },
    { target: 100, suffix: '%', label: 'DUAL REDUNDANT METRO FEED', format: false },
    { target: 1, suffix: ' Class', label: 'TUNNEL FIRE-SAFE CAST RESIN', format: false },
    { target: 0, suffix: ' Interruption', label: 'TRANSIT RELIABILITY RATING', format: false }
  ],
  'energy-and-renewable-power': [
    { target: 35, suffix: ' kV', label: 'GRID TIE-IN STEP-UP VOLTAGE', format: false },
    { target: 100, suffix: '%', label: 'INVERTER HARMONIC TOLERANCE', format: false },
    { target: 5000, suffix: ' kVA', label: 'SOLAR INVERTER TRANSFORMERS', format: true },
    { target: 99, suffix: '.4%', label: 'PEAK INVERTER DUTY EFFICIENCY', format: false }
  ]
};

const DEFAULT_STATS = [
  { target: 35, suffix: '+ Yrs', label: 'MANUFACTURING HERITAGE', format: false },
  { target: 100, suffix: '%', label: 'INDEPENDENT FAT TESTED', format: false },
  { target: 132, suffix: ' kV', label: 'MAX OPERATIONAL VOLTAGE', format: false },
  { target: 45, suffix: '+', label: 'INTERNATIONAL EXPORT REACH', format: false }
];

export default async function IndustryPage({ params }) {
  const ind = find((await params).slug);
  if (!ind) notFound();
  const d = INDUSTRY_DETAILS[ind.slug] || { intro: ind.desc, needs: [], supply: [], standards: [], gallery: [] };
  const others = DATA.industries.filter(x => x.slug !== ind.slug).slice(0, 4);
  const stats = INDUSTRY_STATS_MAP[ind.slug] || DEFAULT_STATS;
  const recommendedProducts = DATA.products.slice(0, 3);

  return (
    <>
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'Industries', href: '/industries/' }, { label: ind.name }]}
        label="SECTOR APPLICATION & ENGINEERING"
        title={ind.name}
        desc={ind.desc}
        image={ind.image}
      >
        <a className="btn btn--primary" href="#specifications">
          Sector Specifications <ArrowRight />
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
      <section id="stats" className="stats-bar" aria-label="Sector Engineering Benchmarks">
        <Stats items={stats} />
      </section>

      {/* =========================================================
          3. CORE APPLICATION & TECHNICAL DEMAND SECTION
          ========================================================= */}
      <section id="specifications" className="sec sec--tight" aria-label="Industry specifications and application">
        <div className="wrap detail">
          <DetailGallery
            mainImage={ind.image}
            gallery={d.gallery}
            alt={ind.name}
            badgeLabel="Sector Application"
          />

          <div className="detail__content">
            {/* 1. Sector Challenge Intro */}
            <div className="detail__header-block fade-in-up">
              <span className="label" style={{ marginBottom: '0.35rem' }}>THE SECTOR CHALLENGE</span>
              <h2>Engineering Demand &amp; Operating Environment</h2>
              <div className="detail__intro-box">
                <p>{d.intro}</p>
              </div>
            </div>

            {/* 2. Compliance & Standards Badges */}
            {d.standards && d.standards.length > 0 && (
              <div className="detail__standards-card fade-in-up" data-delay="100">
                <div className="detail__standards-header">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>VERIFIED COMPLIANCE &amp; CODES</span>
                </div>
                <div className="detail__standards-chips">
                  {d.standards.map((std) => (
                    <span key={std} className="detail__std-chip">
                      <span className="detail__std-dot" aria-hidden="true" />
                      <span>{std}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. CTAs */}
            <div className="detail__actions fade-in-up">
              <Link className="btn btn--primary" href="/products/">
                View Products Range <ArrowRight />
              </Link>
              <Link className="btn btn--ghost" href="/engineering/">
                Factory &amp; FAT Testing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. TECHNICAL CRITERIA & TURNKEY SUPPLY SCOPE (2 CARDS)
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Technical Criteria and Turnkey Supply Scope">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">TECHNICAL CRITERIA &amp; SUPPLY SCOPE</p>
            <h2>Sector Engineering Standards &amp; Turnkey Scope</h2>
            <p className="sec-head__desc">
              Guaranteed electrical performance benchmarks and complete turnkey supply scope engineered for {ind.name}.
            </p>
          </header>

          <div className="industry-specs-grid">
            {/* Technical Criteria Card */}
            <div className="detail__spec-card fade-in-up" data-delay="100">
              <div className="detail__spec-card-head">
                <div className="detail__spec-card-icon detail__spec-card-icon--criteria" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <span className="detail__spec-card-label">TECHNICAL CRITERIA</span>
                  <h3 className="detail__spec-card-title">What the Equipment Must Deliver</h3>
                </div>
              </div>
              <ul className="detail__spec-list">
                {d.needs.map((x) => (
                  <li key={x} className="detail__spec-item">
                    <span className="detail__spec-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Turnkey Supply Scope Card */}
            <div className="detail__spec-card fade-in-up" data-delay="180">
              <div className="detail__spec-card-head">
                <div className="detail__spec-card-icon detail__spec-card-icon--scope" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <span className="detail__spec-card-label">TURNKEY SUPPLY SCOPE</span>
                  <h3 className="detail__spec-card-title">What We Engineer &amp; Deliver</h3>
                </div>
              </div>
              <ul className="detail__spec-list">
                {d.supply.map((x) => (
                  <li key={x} className="detail__spec-item">
                    <span className="detail__spec-icon detail__spec-icon--gold" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. RECOMMENDED PRIMARY EQUIPMENT FOR THIS SECTOR
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Recommended Sector Equipment">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">RECOMMENDED EQUIPMENT</p>
            <h2>Transformers &amp; Grid Assemblies for {ind.name}</h2>
            <p className="sec-head__desc">
              Standard and custom-engineered power transformers and medium-voltage assemblies specified for {ind.name}.
            </p>
          </header>

          <div className="pgrid">
            {recommendedProducts.map((prod, i) => {
              const rawRating = (prod.name.match(/([\d,]+)\s*kva/i) || [])[1];
              const numRating = rawRating ? parseInt(rawRating.replace(/,/g, ''), 10) : null;
              const rating = numRating ? numRating.toLocaleString('en-US') : rawRating;

              return (
                <article className="pcard fade-in-up" data-delay={i * 80} key={prod.name}>
                  <div className="pcard__img">
                    <img src={prod.image} alt={prod.name} loading="lazy" decoding="async" />
                    {rating ? (
                      <span className="pcard__badge">
                        <BoltIcon />
                        <span>{rating} kVA</span>
                      </span>
                    ) : null}
                    <span className="pcard__type-tag">{prod.cat || 'Transformers'}</span>
                  </div>
                  <div className="pcard__body">
                    <div className="pcard__cat">
                      <span className="pcard__dot" aria-hidden="true" />
                      <span>{prod.cat || 'Transformers'}</span>
                    </div>
                    <h3 className="pcard__title">
                      <Link href={`/products/${prod.slug}/`}>{prod.name}</Link>
                    </h3>
                    <p className="pcard__desc">{prod.desc}</p>
                    <div className="pcard__actions">
                      <Link href={`/products/${prod.slug}/`} className="pcard__btn pcard__btn--main">
                        <span>Product Details</span>
                        <ArrowRight />
                      </Link>
                      <Link href={`/contact/?service=${encodeURIComponent(prod.name)}`} className="pcard__btn pcard__btn--ghost">
                        Inquiry
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. OTHER SECTORS WE SERVE
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Other industries">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EXPLORE SECTORS</p>
            <h2>Other Industries We Power</h2>
            <p className="sec-head__desc">
              Engineered electrical infrastructure tailored for manufacturing, transit, healthcare, municipal water, and renewable generation projects.
            </p>
          </header>
          <div className="lgrid">
            {others.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/industries/${o.slug}/`}
                image={o.image}
                title={o.name}
                text={o.desc}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Sector Technical Consultation">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TECHNICAL SIZING &amp; SLD CONSULTATION</span>
              <h3>Need Substation Sizing or Grid Tender Compliance for {ind.name}?</h3>
              <p>
                Our senior electrical engineering team reviews project single-line diagrams (SLD), calculates duty-cycle loss profiles, and prepares utility-compliant submittals tailored for your project.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(ind.name)}`}>
                <span>Request Sector Consultation</span>
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
    </>
  );
}

