import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { INDUSTRY_DETAILS } from '@/lib/industries';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import Stats from '@/components/Stats';
import styles from './page.module.css';

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

const INDUSTRY_SPECS_MAP = {
  'power-utilities-and-grid-infrastructure': {
    voltage: '11 kV – 132 kV Transmission',
    capacity: 'Up to 100 MVA Substation',
    profile: '24/7/365 Continuous Grid Feed',
    focus: 'Dynamic Short-Circuit & Ultra-Low Loss'
  },
  'manufacturing-and-industrial-facilities': {
    voltage: '11 kV – 33 kV Medium Voltage',
    capacity: '1,000 kVA – 16,000 kVA',
    profile: 'Continuous High-Load Factory Duty',
    focus: 'VFD Harmonics & High-Torque Motor Starting'
  },
  'textile-and-garment-industries': {
    voltage: '11 kV / 33 kV Dual Feed',
    capacity: '500 kVA – 5,000 kVA Units',
    profile: 'Continuous Spinning & Dyeing Lines',
    focus: '50°C Tropical Ambient & Automatic PFI'
  },
  'commercial-buildings-and-real-estate': {
    voltage: '11 kV – 33 kV Step-Down',
    capacity: 'Up to 4,000 kVA Cast Resin',
    profile: 'Indoor Basements & Tower Risers',
    focus: 'F1 Fire-Safe, Zero Leakage & Whisper Quiet'
  },
  'hospitals-and-healthcare-facilities': {
    voltage: '11 kV / 415 V Isolated Feed',
    capacity: '500 kVA – 2,500 kVA Vaults',
    profile: 'Mission-Critical Zero-Downtime',
    focus: 'Sub-ms ATS Failover & Medical Galvanic Isolation'
  },
  'water-treatment-and-public-infrastructure': {
    voltage: '11 kV – 33 kV Intake Feeds',
    capacity: '750 kVA – 6,300 kVA Outdoor',
    profile: 'Heavy Inductive Pump Operation',
    focus: 'IP65 Weatherproof & C5 Marine Anti-Corrosion'
  },
  'transportation-and-metro-infrastructure': {
    voltage: '33 kV Traction / 11 kV Station',
    capacity: '1,500 kVA – 8,000 kVA Traction',
    profile: 'Rapid Cyclic Transit Acceleration',
    focus: 'NFPA 130 Fire Safety & Low-Smoke Halogen-Free'
  },
  'energy-and-renewable-power': {
    voltage: '33 kV – 132 kV Grid Tie-In',
    capacity: 'Multi-Megawatt Inverter Skids',
    profile: 'Solar Inverter Multi-Winding Duty',
    focus: '99.4% Peak Efficiency & DC Inverter Tolerance'
  }
};

const DEFAULT_INDUSTRY_SPECS = {
  voltage: 'Medium & High Voltage',
  capacity: 'Engineered Turnkey Range',
  profile: 'Continuous Heavy Duty',
  focus: 'IEC 60076 & ISO Quality Standards'
};

export default async function IndustryPage({ params }) {
  const ind = find((await params).slug);
  if (!ind) notFound();
  const d = INDUSTRY_DETAILS[ind.slug] || { intro: ind.desc, needs: [], supply: [], standards: [], gallery: [] };
  const others = DATA.industries.filter(x => x.slug !== ind.slug).slice(0, 4);
  const stats = INDUSTRY_STATS_MAP[ind.slug] || DEFAULT_STATS;
  const meta = INDUSTRY_SPECS_MAP[ind.slug] || DEFAULT_INDUSTRY_SPECS;
  const recommendedProducts = DATA.products.slice(0, 4);

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

          <div className={styles.detailContent}>
            {/* 1. Sector Challenge Intro */}
            <div className={`${styles.detailHeaderBlock} fade-in-up`}>
              <span className="label" style={{ marginBottom: '0.35rem' }}>THE SECTOR CHALLENGE</span>
              <h2>Engineering Demand &amp; Operating Environment</h2>
              <div className={styles.detailIntroBox}>
                <p>{d.intro}</p>
              </div>
            </div>

            {/* 2. Quick Sector Specifications / Meta Grid */}
            <div className={`fade-in-up ${styles.industryMetaGrid}`} data-delay="80">
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>VOLTAGE CLASS</span>
                <span className={styles.metaValue}>{meta.voltage}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>EQUIPMENT CAPACITY</span>
                <span className={styles.metaValue}>{meta.capacity}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>OPERATING PROFILE</span>
                <span className={styles.metaValue}>{meta.profile}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>ENGINEERING FOCUS</span>
                <span className={styles.metaValue}>{meta.focus}</span>
              </div>
            </div>

            {/* 3. Testing Standards & Code Compliance Chips */}
            {d.standards && d.standards.length > 0 && (
              <div className={`fade-in-up ${styles.detailStandardsCard}`} data-delay="120">
                <div className={styles.detailStandardsHeader}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>TESTING STANDARDS &amp; CODE COMPLIANCE</span>
                </div>
                <div className={styles.detailStandardsChips}>
                  {d.standards.map((std) => (
                    <span key={std} className={styles.detailStdChip}>
                      <span className={styles.detailStdDot} aria-hidden="true" />
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CTAs */}
            <div className={`${styles.detailActions} fade-in-up`}>
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

          <div className={styles.industrySpecsGrid}>
            {/* Technical Criteria Card */}
            <div className={`${styles.detailSpecCard} fade-in-up`} data-delay="100">
              <div className={styles.detailSpecCardHead}>
                <div className={`${styles.detailSpecCardIcon} ${styles.detailSpecCardIconCriteria}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <span className={styles.detailSpecCardLabel}>TECHNICAL CRITERIA</span>
                  <h3 className={styles.detailSpecCardTitle}>What the Equipment Must Deliver</h3>
                </div>
              </div>
              <ul className={styles.detailSpecList}>
                {d.needs.map((x) => (
                  <li key={x} className={styles.detailSpecItem}>
                    <span className={styles.detailSpecIcon} aria-hidden="true">
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
            <div className={`${styles.detailSpecCard} fade-in-up`} data-delay="180">
              <div className={styles.detailSpecCardHead}>
                <div className={`${styles.detailSpecCardIcon} ${styles.detailSpecCardIconScope}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div>
                  <span className={styles.detailSpecCardLabel}>TURNKEY SUPPLY SCOPE</span>
                  <h3 className={styles.detailSpecCardTitle}>What We Engineer &amp; Deliver</h3>
                </div>
              </div>
              <ul className={styles.detailSpecList}>
                {d.supply.map((x) => (
                  <li key={x} className={styles.detailSpecItem}>
                    <span className={`${styles.detailSpecIcon} ${styles.detailSpecIconGold}`} aria-hidden="true">
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

          <div className="lgrid">
            {recommendedProducts.map((prod, i) => (
              <LinkCard
                key={prod.name}
                href={`/products/${prod.slug}/`}
                image={prod.image}
                contain={true}
                title={prod.name}
                text={prod.desc}
                more="Learn more"
                delay={i * 80}
              />
            ))}
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

    </>
  );
}

