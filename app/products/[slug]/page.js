import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DATA } from '@/lib/data';
import { TRANSFORMER_DETAILS } from '@/lib/products-data';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';

const find = slug => DATA.products.find(p => p.slug === slug);

export function generateStaticParams() {
  return DATA.products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = find((await params).slug);
  if (!p) return {};
  const t = TRANSFORMER_DETAILS[p.slug];
  const title = `${p.name} | BPEL Industrial Power Engineering`;
  const description = t?.overviewParagraph?.slice(0, 160) || p.desc;
  return { title, description };
}

/* SVG Engineering Icons */
const Icons = {
  Shield: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Gauge: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m14 14-4-4" />
      <path d="M12 6v2" />
      <path d="M6 12h2" />
      <path d="M18 12h-2" />
    </svg>
  ),
  Sound: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  Core: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" />
      <path d="M7 2v20" />
      <path d="M17 2v20" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Clamping: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Cooling: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Document: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.28-1.93 1.34-.52.06-1.19.09-3.87-1.02-3.23-1.34-5.32-4.63-5.48-4.85-.16-.22-1.3-1.74-1.3-3.32 0-1.58.83-2.35 1.12-2.67.3-.32.65-.4 0.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.56.27.68.92 2.27 1 2.44.08.17.14.37.03.59-.11.22-.16.35-.32.55-.16.2-.34.45-.49.6-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.71-.08.19-.22.82-.95 1.04-1.28.22-.33.44-.27.73-.16.29.11 1.84.87 2.16 1.03.32.16.54.24.62.38.08.14.08.82-.16 1.5z" />
    </svg>
  ),
  Calculator: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
};

export default async function ProductPage({ params }) {
  const p = find((await params).slug);
  if (!p) notFound();

  // Load detailed engineering model data, with safe fallback
  const d = TRANSFORMER_DETAILS[p.slug] || {
    ratingMva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${parseInt((p.name.match(/([\d,]+)\s*kva/i) || [])[1].replace(/,/g, '')) / 1000} MVA` : 'Power Unit',
    powerKva: (p.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${(p.name.match(/([\d,]+)\s*kva/i) || [])[1]} kVA` : 'Standard Rating',
    voltagePrimary: '33 kV / 11 kV (Custom available)',
    voltageSecondary: '11 kV / 6.6 kV / 415 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN / ONAF Forced Air',
    efficiency: '99.35% (at 75°C)',
    impedance: '6.5% – 7.5%',
    vectorGroup: 'Dyn11 (Standard)',
    tapChanger: 'Off-Circuit ±2×2.5% or OLTC',
    fluidType: 'Naphthenic Mineral Oil (IEC 60296)',
    soundLevel: '< 60 dB(A)',
    bilImpulse: '170 kV (33kV) / 75 kV (11kV)',
    powerFrequencyAc: '70 kV / 28 kV (1 min)',
    windingMaterial: 'Electrolytic Grade OFHC Copper',
    coreMaterial: 'Hi-B Laser-Scribed CRGO Steel',
    insulationClass: 'Class A, Winding 65K Rise',
    tankConstruction: 'Welded Steel Tank with Anti-Corrosion Coating',
    totalWeight: 'Engineered to specification',
    dimensions: 'Custom plinth dimensions',
    noLoadLoss: 'Guaranteed Low Loss',
    loadLoss: 'Optimized to IEC standards',
    tagline: 'High-Performance Power & Industrial Distribution Transformer',
    overviewParagraph: p.desc,
    trustPills: [
      'BPDB & DESCO Utility Pre-Approved',
      'IEC 60076 & IEEE C57 Compliant',
      'ASTA / CESI STL Witnessed',
      'EcoDesign Tier 2 Standard',
      'ISO 9001 / ISO 14001 Registered'
    ],
    highlights: [
      { title: 'Hi-B Grain-Oriented Core', desc: 'Precision step-lap miter cut laminations to minimize magnetizing losses and audible hum.' },
      { title: 'Dynamic Fault Withstand', desc: 'Rigid axial clamping system engineered to withstand maximum short-circuit electromagnetic stresses.' },
      { title: 'Advanced Cooling Architecture', desc: 'Galvanized radiator banks engineered for continuous thermal transfer in +55°C ambient.' },
      { title: 'Comprehensive Protection Suite', desc: 'Gas-actuated Buchholz relays, pressure relief valves, and magnetic oil level gauges.' }
    ],
    deployments: [
      { title: 'Utility Distribution Substations', desc: 'Primary step-down transformation for municipal and rural grid networks.' },
      { title: 'Heavy Manufacturing & Processing', desc: 'Reliable uninterrupted feed for steel mills, cement plants, and textile mills.' },
      { title: 'Renewable Energy Integration', desc: 'Step-up substation for centralized utility-scale solar PV and wind farms.' },
      { title: 'Mission-Critical Infrastructure', desc: 'Hospital campuses, commercial data centers, and metro transit stations.' }
    ]
  };

  const others = DATA.products.filter(x => x.slug !== p.slug);
  const quoteUrl = `/contact/?service=${encodeURIComponent(p.name)}`;
  const waUrl = `https://wa.me/${DATA.contact.whatsapp}?text=${encodeURIComponent(`Hello BPEL Engineering Desk, I am inquiring about technical specifications, GA drawings, and pricing for the ${p.name}.`)}`;
  const phoneTel = `tel:${DATA.contact.phoneDisplay.replace(/[^\d+]/g, '')}`;

  // Comprehensive IEC 60076 Spec Matrix Rows
  const specRows = [
    { label: 'Rated Capacity', value: `${d.powerKva} (${d.ratingMva})`, group: 'Electrical Ratings' },
    { label: 'Primary Rated Voltage', value: d.voltagePrimary, group: 'Electrical Ratings' },
    { label: 'Secondary Rated Voltage', value: d.voltageSecondary, group: 'Electrical Ratings' },
    { label: 'Rated Frequency', value: d.frequency, group: 'Electrical Ratings' },
    { label: 'Vector Group', value: d.vectorGroup, group: 'Electrical Ratings' },
    { label: 'Cooling Classification', value: d.coolingType, group: 'Thermal & Mechanical' },
    { label: 'Short-Circuit Impedance (%Z)', value: d.impedance, group: 'Electrical Ratings' },
    { label: 'Tap Changing Mechanism', value: d.tapChanger, group: 'Voltage Regulation' },
    { label: 'Dielectric Insulation Fluid', value: d.fluidType, group: 'Thermal & Mechanical' },
    { label: 'Peak Efficiency Rating', value: d.efficiency, group: 'Electrical Ratings' },
    { label: 'Acoustic Sound Emission', value: d.soundLevel, group: 'Acoustic & Vibration' },
    { label: 'Lightning Impulse Withstand (BIL)', value: d.bilImpulse, group: 'Dielectric Withstand' },
    { label: 'Power Frequency Withstand AC', value: d.powerFrequencyAc, group: 'Dielectric Withstand' },
    { label: 'Guaranteed No-Load Loss (Po)', value: d.noLoadLoss, group: 'Loss Guaranteed Values' },
    { label: 'Guaranteed Full Load Loss (Pk)', value: d.loadLoss, group: 'Loss Guaranteed Values' },
    { label: 'Winding Conductor Material', value: d.windingMaterial, group: 'Core & Coil Construction' },
    { label: 'Magnetic Core Laminations', value: d.coreMaterial, group: 'Core & Coil Construction' },
    { label: 'Thermal Temperature Rise Limits', value: d.insulationClass, group: 'Thermal & Mechanical' },
    { label: 'Enclosure & Tank Construction', value: d.tankConstruction, group: 'Thermal & Mechanical' },
    { label: 'Overall Approximate Weight', value: d.totalWeight, group: 'Weights & Physical Envelope' },
    { label: 'Envelope Dimensions (L × W × H)', value: d.dimensions, group: 'Weights & Physical Envelope' }
  ];

  // Testing Standards checklist (Emirates Transformer style)
  const testCertifications = [
    { name: 'Routine Loss & Ratio Test', std: 'IEC 60076-1', desc: 'Winding resistance, voltage ratio, phase displacement, load loss, and no-load current.' },
    { name: 'Full-Wave Lightning Impulse', std: 'IEC 60076-3', desc: '170 kV BIL surge withstand verification on HV bushings and internal winding layers.' },
    { name: 'Thermal Temperature Rise', std: 'IEC 60076-2', desc: 'Full-load thermal equilibrium testing verifying winding rise ≤65K and top oil ≤60K.' },
    { name: 'Acoustic Sound Pressure', std: 'IEC 60076-10', desc: 'Sound intensity survey confirming whisper-quiet operation under 62 dB(A).' },
    { name: 'Dielectric Oil Breakdown', std: 'IEC 60296 / 60156', desc: 'Breakdown voltage (>60 kV), moisture content (<15 ppm), and tan-delta dissipation.' },
    { name: 'Pressure & Vacuum Deflection', std: 'IEC 60076-1', desc: 'Mechanical tank integrity under sustained positive hydraulic pressure and vacuum.' }
  ];

  // Technical Procurement FAQs
  const productFaqs = [
    {
      q: `Can BPEL supply this ${d.powerKva} transformer with customized impedance and dual primary voltages?`,
      a: `Yes. BPEL’s engineering team customizes short-circuit impedance (%Z from 5.5% to 10%), dual primary voltage taps (e.g. 33 kV and 11 kV switchable), and custom vector configurations (YNd11, Dyn5) to align with specific utility substation standards and tender schedules.`
    },
    {
      q: 'What type test reports and certifications accompany each transformer delivery?',
      a: 'Every transformer undergoes full routine testing with a certified Factory Acceptance Test (FAT) dossier according to IEC 60076. In addition, BPEL transformers hold valid ASTA / CESI / KEMA STL-witnessed short-circuit withstand and lightning impulse type test certifications.'
    },
    {
      q: 'What is the operational benefit of ONAN versus ONAF cooling modes?',
      a: 'In ONAN (Oil Natural Air Natural) mode, cooling relies on natural thermal siphon circulation without auxiliary power. Under peak ambient or emergency overload demand, the dual-speed ONAF (Forced Air) cooling fans automatically engage, boosting transformer continuous capacity by up to 33% without overheating.'
    },
    {
      q: 'Can this transformer be filled with biodegradable natural ester fluid (FR3)?',
      a: 'Yes. BPEL offers high-fire-point natural bio-ester fluids (such as Cargill Envirotemp FR3) as an alternative to conventional mineral oil. Bio-ester provides K-class fire safety (>300°C fire point), 100% biodegradability, and extended insulation life, making it ideal for indoor substations and environmentally sensitive zones.'
    },
    {
      q: 'What is the standard manufacturing lead time and site commissioning support in Bangladesh?',
      a: 'Standard production lead times range from 6 to 10 weeks depending on tap changer configuration (OLTC vs Off-Circuit). BPEL provides full turnkey on-site rigging, plinth positioning, vacuum oil-filling, pre-commissioning testing, and BPDB/DESCO grid inspection handover.'
    }
  ];

  return (
    <>
      {/* 1. Page Hero with Breadcrumbs & Action Buttons */}
      <PageHero
        crumbs={[{ label: 'Products', href: '/products/' }, { label: p.name }]}
        label="HIGH-CAPACITY POWER TRANSFORMER"
        title={p.name}
        desc={d.tagline}
      >
        <a className="btn btn--primary" href={quoteUrl}>
          Request Specification Quote <ArrowRight />
        </a>
        <a className="btn btn--ghost" href={waUrl} target="_blank" rel="noopener noreferrer">
          <Icons.WhatsApp /> WhatsApp Tech Desk
        </a>
        <a className="btn btn--ghost" href="/products/">
          All Products
        </a>
      </PageHero>

      {/* 2. Authority & Standards Trust Bar (Emirates Transformer Style) */}
      <section className="prod-trust-bar" aria-label="Certifications & Pre-approvals">
        <div className="wrap prod-trust-bar__inner">
          {d.trustPills.map((pill, idx) => (
            <div key={idx} className="prod-trust-bar__item">
              <span className="prod-trust-bar__icon">
                <Icons.Check />
              </span>
              <span className="prod-trust-bar__text">{pill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Main Overview & Specification Section */}
      <section className="sec" aria-label="Product Engineering Overview">
        <div className="wrap">
          <div className="prod-main-grid">
            
            {/* Left Column: Visual Showcase & Engineering Drawing Box */}
            <div className="prod-media-col fade-in-left">
              <div className="prod-media-card">
                <div className="prod-media-card__badges">
                  <span className="badge badge--navy">{d.ratingMva} / 33kV Class</span>
                  <span className="badge badge--accent">{d.coolingType.split(' ')[0]} Cooling</span>
                </div>

                <figure className="prod-media-card__figure">
                  <img
                    src={p.image}
                    alt={`${p.name} - High-capacity oil-immersed power transformer manufactured by BPEL`}
                    loading="eager"
                    decoding="async"
                  />
                </figure>

                <div className="prod-media-card__footer">
                  <div className="prod-cad-callout">
                    <div className="prod-cad-callout__icon">
                      <Icons.Document />
                    </div>
                    <div className="prod-cad-callout__text">
                      <strong>Need Engineering GA Drawings?</strong>
                      <p>Full dimensional outline, plinth foundation drawings, and terminal arrangement SLDs available upon tender request.</p>
                    </div>
                  </div>

                  <div className="prod-media-card__ctas">
                    <a className="btn btn--primary btn--sm" href={quoteUrl}>
                      Request GA Drawing & SLD <ArrowRight />
                    </a>
                    <a className="btn btn--ghost btn--sm" href={phoneTel}>
                      Tender Desk: {DATA.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              {/* Fast Technical Summary Card */}
              <div className="prod-summary-card">
                <h3 className="prod-summary-card__title">Dielectric & Thermal Standard</h3>
                <ul className="prod-summary-card__list">
                  <li>
                    <span className="k">Insulation Class:</span>
                    <span className="v">Class A (105°C), Winding 65K / Oil 60K Rise</span>
                  </li>
                  <li>
                    <span className="k">Standard Applicable:</span>
                    <span className="v">IEC 60076-1 to 10, IEEE C57.12</span>
                  </li>
                  <li>
                    <span className="k">Ambient Temperature:</span>
                    <span className="v">-5°C to +55°C (Tropical Severe Ambient)</span>
                  </li>
                  <li>
                    <span className="k">Installation Type:</span>
                    <span className="v">Outdoor Substation Plinth / Indoor Vault</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Bento KPIs, Narrative & Detailed Spec Table */}
            <div className="prod-content-col fade-in-right">
              
              {/* Bento KPI Chips (Emirates Transformer Style) */}
              <div className="prod-kpis-grid">
                <div className="prod-kpi-chip">
                  <span className="prod-kpi-chip__icon"><Icons.Bolt /></span>
                  <div className="prod-kpi-chip__val">{d.ratingMva}</div>
                  <div className="prod-kpi-chip__lbl">Rated Power ({d.powerKva})</div>
                </div>

                <div className="prod-kpi-chip">
                  <span className="prod-kpi-chip__icon"><Icons.Shield /></span>
                  <div className="prod-kpi-chip__val">{d.voltagePrimary.split(' ')[0]}</div>
                  <div className="prod-kpi-chip__lbl">Primary Grid Voltage</div>
                </div>

                <div className="prod-kpi-chip">
                  <span className="prod-kpi-chip__icon"><Icons.Gauge /></span>
                  <div className="prod-kpi-chip__val">{d.efficiency.split(' ')[0]}</div>
                  <div className="prod-kpi-chip__lbl">Peak Efficiency (EcoDesign)</div>
                </div>

                <div className="prod-kpi-chip">
                  <span className="prod-kpi-chip__icon"><Icons.Sound /></span>
                  <div className="prod-kpi-chip__val">{d.soundLevel.split(' ')[0]} {d.soundLevel.split(' ')[1]}</div>
                  <div className="prod-kpi-chip__lbl">Audible Acoustic Sound</div>
                </div>
              </div>

              {/* Engineering Narrative Box */}
              <div className="prod-narrative-box">
                <h2 className="prod-narrative-box__title">Engineering Dossier & Utility Design</h2>
                <p className="prod-narrative-box__desc">{d.overviewParagraph}</p>
              </div>

              {/* Comprehensive Technical Specification Table */}
              <div className="prod-spec-container">
                <div className="prod-spec-container__header">
                  <h3>Guaranteed Technical Parameters</h3>
                  <span className="badge badge--pill">IEC 60076 Conformance</span>
                </div>

                <div className="prod-spec-table-wrap">
                  <table className="prod-spec-table" aria-label="Technical Specification Matrix">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '45%' }}>Engineering Parameter</th>
                        <th scope="col" style={{ width: '55%' }}>Guaranteed Rating / Specification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specRows.map((row, idx) => (
                        <tr key={idx}>
                          <th scope="row">
                            <span className="prod-spec-table__param">{row.label}</span>
                            <span className="prod-spec-table__group">{row.group}</span>
                          </th>
                          <td>
                            <strong className="prod-spec-table__val">{row.value}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="prod-spec-footer">
                  <p className="prod-spec-footer__note">
                    * Parameters conform to guaranteed tolerances per IEC 60076-1. Custom impedance, loss capitalisation values, and alternative vector groups are engineered to project schedules.
                  </p>
                  <div className="prod-spec-footer__actions">
                    <a className="btn btn--primary" href={quoteUrl}>
                      Request Tailored Parameters <ArrowRight />
                    </a>
                    <a className="btn btn--ghost" href={waUrl} target="_blank" rel="noopener noreferrer">
                      <Icons.WhatsApp /> Inquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Core Engineering Pillars (Emirates Transformer Style Construction Advantages) */}
      <section className="sec sec--alt" aria-label="Core Engineering Advantages">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">CONSTRUCTION EXCELLENCE</p>
            <h2>Emirates-Grade Engineering Pillars</h2>
            <p className="sec-head__sub">
              Manufactured with laser-cut magnetic steel, vacuum oil-filling chambers, and electromagnetic fault-containment bracing for a 35+ year operating lifespan.
            </p>
          </header>

          <div className="prod-pillars-grid">
            {d.highlights.map((h, i) => (
              <div key={i} className="prod-pillar-card fade-in-up" data-delay={i * 80}>
                <div className="prod-pillar-card__header">
                  <span className="prod-pillar-card__number">{String(i + 1).padStart(2, '0')}</span>
                  <div className="prod-pillar-card__icon-box">
                    {i === 0 && <Icons.Core />}
                    {i === 1 && <Icons.Clamping />}
                    {i === 2 && <Icons.Cooling />}
                    {i === 3 && <Icons.Cpu />}
                  </div>
                </div>
                <h3 className="prod-pillar-card__title">{h.title}</h3>
                <p className="prod-pillar-card__desc">{h.desc}</p>
                <div className="prod-pillar-card__tag">
                  <Icons.Check /> High-Reliability Specification
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deployment Scenarios & Applications */}
      <section className="sec" aria-label="Typical Deployment Scenarios">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">APPLICATION DOMAINS</p>
            <h2>Proven Performance Across Critical Infrastructure</h2>
            <p className="sec-head__sub">
              Engineered to endure severe cyclic load profiles, high ambient humidity, and continuous industrial operations.
            </p>
          </header>

          <div className="prod-apps-grid">
            {d.deployments.map((app, idx) => (
              <div key={idx} className="prod-app-card fade-in-up" data-delay={idx * 70}>
                <div className="prod-app-card__badge">Scenario 0{idx + 1}</div>
                <h3 className="prod-app-card__title">{app.title}</h3>
                <p className="prod-app-card__desc">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Rigorous Factory Testing & STL Witnessed Assurance */}
      <section className="sec sec--alt" aria-label="Testing and Quality Assurance">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">QUALITY ASSURANCE</p>
            <h2>IEC 60076 Testing & Factory Acceptance (FAT)</h2>
            <p className="sec-head__sub">
              Every unit undergoes exhaustive dielectric, thermal, and mechanical test sequences witnessed by third-party inspectors before dispatch.
            </p>
          </header>

          <div className="prod-testing-grid">
            {testCertifications.map((t, idx) => (
              <div key={idx} className="prod-test-card fade-in-up" data-delay={idx * 60}>
                <div className="prod-test-card__head">
                  <span className="prod-test-card__std">{t.std}</span>
                  <span className="prod-test-card__status">
                    <Icons.Check /> Certified
                  </span>
                </div>
                <h3 className="prod-test-card__name">{t.name}</h3>
                <p className="prod-test-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Interactive Engineering Tools & Calculators Widget */}
      <section className="sec" aria-label="Engineering Calculation Tools">
        <div className="wrap">
          <div className="prod-tools-banner fade-in-up">
            <div className="prod-tools-banner__content">
              <span className="label" style={{ color: '#60A5FA' }}>INTERACTIVE DESIGN DESK</span>
              <h2>Calculate Transformer Sizing & TCO Losses</h2>
              <p>
                Evaluate capitalized lifecycle losses (A and B factors), fault currents, and voltage drop margins for your substation design using BPEL’s suite of engineering calculators.
              </p>
              <div className="prod-tools-banner__links">
                <Link href="/resources/sizing-guide/" className="btn btn--primary">
                  <Icons.Calculator /> Transformer Sizing Tool
                </Link>
                <Link href="/contact/" className="btn btn--ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  Request Loss Evaluation Sheet
                </Link>
              </div>
            </div>
            <div className="prod-tools-banner__metrics">
              <div className="prod-tools-metric">
                <span className="prod-tools-metric__val">35+ Yrs</span>
                <span className="prod-tools-metric__lbl">Design Life Cycle</span>
              </div>
              <div className="prod-tools-metric">
                <span className="prod-tools-metric__val">Tier 2</span>
                <span className="prod-tools-metric__lbl">EcoDesign Loss Compliance</span>
              </div>
              <div className="prod-tools-metric">
                <span className="prod-tools-metric__val">100%</span>
                <span className="prod-tools-metric__lbl">Factory FAT Witnessed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Technical Procurement FAQ Accordion */}
      <section className="sec sec--alt" aria-label="Frequently Asked Technical Questions">
        <div className="wrap prod-faq-wrap">
          <header className="sec-head fade-in-up">
            <p className="label">ENGINEERING CLARIFICATIONS</p>
            <h2>Frequently Asked Questions for Consultants & EPCs</h2>
            <p className="sec-head__sub">
              Detailed answers regarding compliance, dielectric fluids, testing, and procurement lead times.
            </p>
          </header>

          <div className="prod-faq-list">
            {productFaqs.map((faq, idx) => (
              <details key={idx} className="prod-faq-item fade-in-up" open={idx === 0}>
                <summary className="prod-faq-summary">
                  <span className="prod-faq-question">{faq.q}</span>
                  <span className="prod-faq-toggle" aria-hidden="true">+</span>
                </summary>
                <div className="prod-faq-body">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Related Transformer Ratings Range */}
      <section className="sec" aria-label="Other transformer ratings in the range">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">ALTERNATIVE CAPACITIES</p>
            <h2>Other Ratings in the BPEL Power Transformer Range</h2>
            <p className="sec-head__sub">Explore our full line of oil-immersed medium and power transformers from 4,000 kVA to 16,000 kVA.</p>
          </header>
          <div className="lgrid">
            {others.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/products/${o.slug}/`}
                image={o.image}
                contain
                kicker={o.cat}
                title={o.name}
                text={o.desc}
                more="View specifications"
                delay={(i % 4) * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. Direct Tender Consultation CTA Banner */}
      <section className="sec sec--alt" style={{ paddingTop: '1rem', paddingBottom: '4rem' }} aria-label="Submit Tender Schedule">
        <div className="wrap">
          <div className="prod-cta-card fade-in-up">
            <div className="prod-cta-card__left">
              <span className="badge badge--navy" style={{ background: 'rgba(11, 92, 171, 0.1)', color: '#0B5CAB' }}>
                DIRECT TENDER CONSULTATION
              </span>
              <h2>Ready to specify this {d.powerKva} unit for your project?</h2>
              <p>
                Send your single-line diagram (SLD), required loss guarantees, or utility tender specifications to our engineering team. We deliver guaranteed technical proposals within 24 to 48 hours.
              </p>
              <div className="prod-cta-card__actions">
                <a className="btn btn--primary" href={quoteUrl}>
                  Submit Tender Schedule <ArrowRight />
                </a>
                <a className="btn btn--ghost" href={waUrl} target="_blank" rel="noopener noreferrer">
                  <Icons.WhatsApp /> Direct WhatsApp Desk
                </a>
                <a className="btn btn--ghost" href={phoneTel}>
                  Call: {DATA.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

