'use client';

import { useState } from 'react';
import Link from 'next/link';

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default function PadMountedProductView({
  product,
  details,
  quoteUrl = '/contact/',
  waUrl = 'https://wa.me/8801713000001',
  phoneTel = 'tel:+88029885601',
  others = []
}) {
  const isPadMounted = !product || product.slug === 'pad-mounted-transformers' || product.slug === 'pad-mounted';

  // Gallery images downloaded locally
  const padGalleryImages = [
    {
      src: '/assets/images/products/pad-mounted/pad-mounted-cover-hero.webp',
      alt: 'Pad Mounted Transformers — 3D Front Isometric View',
      label: 'Cover Hero View'
    },
    {
      src: '/assets/images/products/pad-mounted/front.webp',
      alt: 'Pad Mounted Transformers — Enclosure Front Elevation',
      label: 'Cabinet Front'
    },
    {
      src: '/assets/images/products/pad-mounted/interior.webp',
      alt: 'Pad Mounted Transformers — Terminal Compartment & Bushings',
      label: 'HV/LV Compartment'
    },
    {
      src: '/assets/images/products/pad-mounted/pad-mounted-radiator-fins-midclose.webp',
      alt: 'Pad Mounted Transformers — Cooling Radiator Fins Detail',
      label: 'Radiator Fins'
    },
    {
      src: '/assets/images/products/pad-mounted/angle.webp',
      alt: 'Pad Mounted Transformers — Three-Quarter Angle View',
      label: 'Three-Quarter Angle'
    },
    {
      src: '/assets/images/products/pad-mounted/pad-mounted-interior-compartment-midclose.webp',
      alt: 'Pad Mounted Transformers — Dead-Front Interior Compartment',
      label: 'Interior Compartment'
    },
    {
      src: '/assets/images/products/pad-mounted/pad-mounted-front-three-quarter-cabinet-open.webp',
      alt: 'Pad Mounted Transformers — Front Cabinet Doors Open',
      label: 'Doors Open View'
    },
    {
      src: '/assets/images/products/pad-mounted/pad-mounted-cover-feature.webp',
      alt: 'Pad Mounted Transformers — Engineered Core & Radiators',
      label: 'Engineering View'
    }
  ];

  const genericGalleryImages = [
    {
      src: product?.image || '/assets/images/products/oil-immersed-transformer.png',
      alt: `${product?.name || 'Power Transformer'} — Primary Elevation`,
      label: 'Main Elevation'
    },
    {
      src: '/assets/images/products/ets/distribution-transformers.webp',
      alt: 'Substation Core Assembly & Radiators',
      label: 'Core & Radiators'
    },
    {
      src: '/assets/images/products/ets/medium-power-transformers-gsu.webp',
      alt: 'Bushing Configuration & Conservator Tank',
      label: 'Conservator View'
    },
    {
      src: '/assets/images/products/ets/package-substation-transformers.webp',
      alt: 'Terminal Arrangement & Housing',
      label: 'Terminal Layout'
    }
  ];

  const galleryImages = isPadMounted ? padGalleryImages : genericGalleryImages;
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // 6 Engineering Features
  const padFeatures = [
    {
      id: 'ul1562',
      title: 'UL 1562 Listed',
      desc: 'Full North American compliance — accepted by all major utilities across the USA, Canada, and Middle East export projects.'
    },
    {
      id: 'deadfront',
      title: 'Dead-Front Design',
      desc: 'Tamper-resistant cabinet enclosure with completely shielded bushings and no exposed live conductors, guaranteeing maximum public safety in residential subdivisions and shopping centers.'
    },
    {
      id: 'loopfeed',
      title: 'Loop-Feed Capability',
      desc: 'Configurable for radial or loop-feed distribution loops with 200 A loadbreak or 600 A deadbreak elbow connectors, enabling seamless section switching and grid isolation.'
    },
    {
      id: 'tamper',
      title: 'Tamper-Resistant Cabinet',
      desc: 'Heavy-gauge steel housing with recessed penta-head captive locking bolts, dual padlock hasps, and labyrinth door flanges certified to IEEE C57.12.28 tamper-resistance standards.'
    },
    {
      id: 'bayonet',
      title: 'Bayonet Fuse Protection',
      desc: 'Dual-sensing Bay-O-Net expulsion fuses coordinated in series with internal partial-range current-limiting fuses (ELSP) for total transformer overload and fault containment.'
    },
    {
      id: 'fr3',
      title: 'FR3 Bio-Ester Option',
      desc: 'Available with Cargill Envirotemp FR3 natural ester fluid offering K-class fire safety (>300°C fire point), 100% biodegradability, and extended dielectric insulation life.'
    }
  ];

  const genericFeatures = [
    {
      id: 'hib-core',
      title: 'Hi-B Laser-Scribed CRGO Core',
      desc: 'Stacked using premium Japanese laser-etched electrical steel with step-lap miter cuts to slash no-load excitation losses and magnetostriction hum.'
    },
    {
      id: 'fault-withstand',
      title: 'Dynamic Fault Withstand',
      desc: 'Rigid axial clamping system with high-density Weidmann insulation blocks, fully type-tested to endure maximum asymmetrical short-circuit electromagnetic stresses.'
    },
    {
      id: 'dual-cooling',
      title: 'Dual-Stage ONAN / ONAF Cooling',
      desc: 'Removable galvanized radiator banks equipped with temperature-triggered cooling fans providing an immediate continuous overload boost during peak grid demand.'
    },
    {
      id: 'protection-suite',
      title: 'Comprehensive Protection Suite',
      desc: 'Gas-actuated Buchholz relays, pressure relief valves, magnetic oil level gauges (MOG), and winding temperature indicators (WTI) with SCADA telemetry.'
    },
    {
      id: 'dielectric-insulation',
      title: 'Dielectric Fluid Integrity',
      desc: 'Super-refined naphthenic mineral oil per IEC 60296 or Cargill Envirotemp FR3 natural ester fluid offering high-fire-point (>300°C) K-class safety.'
    },
    {
      id: 'corrosion-coating',
      title: 'C5M Marine Anti-Corrosion',
      desc: 'Multi-layer zinc-rich epoxy polyurethane coating system engineered for continuous outdoor substation plinths in severe tropical and coastal atmospheres.'
    }
  ];

  const features = isPadMounted ? padFeatures : (details?.highlights?.length >= 4 ? [
    ...details.highlights.map((h, i) => ({ id: `feat-${i}`, title: h.title, desc: h.desc })),
    { id: 'feat-fluid', title: 'Biodegradable FR3 Option', desc: 'Environmentally safe natural ester dielectric fluid providing enhanced thermal stability and K-class fire protection.' },
    { id: 'feat-test', title: 'ASTA / CESI STL Witnessed', desc: 'Complete third-party type test verification for short-circuit withstand, temperature rise, and BIL lightning impulse.' }
  ].slice(0, 6) : genericFeatures);

  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  // Technical Data Rows
  const technicalData = isPadMounted ? [
    { param: 'Rated Power', value: '75 kVA – 10 MVA' },
    { param: 'Primary Voltage', value: '4.16 – 34.5 kV' },
    { param: 'Secondary Voltage', value: '120/240 V – 480 V / 415 V' },
    { param: 'Frequency', value: '50 / 60 Hz' },
    { param: 'Impedance (%Z)', value: '1.5% – 5.75%' },
    { param: 'BIL Primary', value: '95 – 200 kV' },
    { param: 'BIL Secondary', value: '30 kV' },
    { param: 'Temperature Rise', value: '55°C / 65°C' },
    { param: 'Fluid Volume', value: 'Per unit rating (Naphthenic Mineral Oil or FR3)' },
    { param: 'Approximate Weight', value: 'From 450 kg to 12,000 kg' }
  ] : [
    { param: 'Rated Power', value: `${details?.powerKva || 'Custom Rating'} (${details?.ratingMva || 'Power Class'})` },
    { param: 'Primary Rated Voltage', value: details?.voltagePrimary || '33 kV / 11 kV' },
    { param: 'Secondary Rated Voltage', value: details?.voltageSecondary || '11 kV / 6.6 kV / 415 V' },
    { param: 'Rated Frequency', value: details?.frequency || '50 Hz / 60 Hz' },
    { param: 'Vector Group', value: details?.vectorGroup || 'Dyn11 (Standard)' },
    { param: 'Cooling Classification', value: details?.coolingType || 'ONAN / ONAF' },
    { param: 'Short-Circuit Impedance (%Z)', value: details?.impedance || '6.5% – 7.5%' },
    { param: 'Tap Changing Mechanism', value: details?.tapChanger || 'Off-Circuit ±2×2.5% or OLTC' },
    { param: 'Dielectric Insulation Fluid', value: details?.fluidType || 'Naphthenic Mineral Oil (IEC 60296)' },
    { param: 'Peak Efficiency Rating', value: details?.efficiency || '99.35% (at 75°C)' },
    { param: 'Acoustic Sound Emission', value: details?.soundLevel || '< 60 dB(A)' },
    { param: 'Lightning Impulse (BIL)', value: details?.bilImpulse || '170 kV (33kV) / 75 kV (11kV)' },
    { param: 'Approximate Weight', value: details?.totalWeight || 'Engineered to specification' },
    { param: 'Plinth Envelope Dimensions', value: details?.dimensions || 'Custom footprint dimensions' }
  ];

  // GCC Trust Signals
  const trustSignals = [
    { title: 'DEWA Approved', desc: 'Dubai Electricity & Water Authority vendor' },
    { title: 'ADDC / AADC', desc: 'Abu Dhabi Distribution Company approved' },
    { title: 'SEWA / FEWA', desc: 'Sharjah & Federal Electricity authorities' },
    { title: 'ADNOC AVL', desc: 'ADNOC Approved Vendor List' },
    { title: 'IEC 60076', desc: 'International standard for power transformers' },
    { title: 'ARAMCO 17-SAMSS', desc: 'Saudi ARAMCO material specification' },
    { title: 'ISO 50001:2018', desc: 'Energy Management System (LRQA-certified)' }
  ];

  // Applications
  const applications = [
    {
      num: '01',
      title: 'DEWA / ADDC Underground Networks',
      desc: 'DEWA and ADDC approved pad-mounted transformers for underground distribution in new urban developments across the UAE.'
    },
    {
      num: '02',
      title: 'GCC Master-Planned Communities',
      desc: 'Pad-mounted transformers for Emaar, Aldar, ROSHN and other GCC master-planned residential and mixed-use communities.'
    },
    {
      num: '03',
      title: 'Jebel Ali Free Zone & KIZAD',
      desc: 'Tropical-rated pad-mounted units for JAFZA, KIZAD and Saudi industrial city secondary distribution.'
    },
    {
      num: '04',
      title: 'GCC EV Charging Infrastructure',
      desc: 'Compact pad-mounted transformers for UAE and Saudi EV charging networks supporting national e-mobility roadmaps.'
    }
  ];

  // 6 Testing & Quality Assurance Cards
  const testCertifications = [
    { name: 'Routine Loss & Ratio Test', std: 'IEC 60076-1', desc: 'Winding resistance, voltage ratio, phase displacement, load loss, and no-load current.' },
    { name: 'Full-Wave Lightning Impulse', std: 'IEC 60076-3', desc: '170 kV BIL surge withstand verification on HV bushings and internal winding layers.' },
    { name: 'Thermal Temperature Rise', std: 'IEC 60076-2', desc: 'Full-load thermal equilibrium testing verifying winding rise ≤65K and top oil ≤60K.' },
    { name: 'Acoustic Sound Pressure', std: 'IEC 60076-10', desc: 'Sound intensity survey confirming whisper-quiet operation under 62 dB(A).' },
    { name: 'Dielectric Oil Breakdown', std: 'IEC 60296 / 60156', desc: 'Breakdown voltage (>60 kV), moisture content (<15 ppm), and tan-delta dissipation.' },
    { name: 'Pressure & Vacuum Deflection', std: 'IEC 60076-1', desc: 'Mechanical tank integrity under sustained positive hydraulic pressure and vacuum.' }
  ];

  // 10 Verified FAQs
  const faqs = [
    {
      q: 'What are ETS pad mounted transformers designed for?',
      a: 'Our pad mounted transformers are purpose-built for underground distribution networks, serving residential communities, commercial developments, and campus installations. Ratings range from 300 kVA to 10 MVA with voltages up to 36 kV.'
    },
    {
      q: 'Which standards govern ETS pad mounted transformer design?',
      a: 'Units are manufactured to IEC 60076 and can be supplied to ANSI C57.12.28 (pad-mounted, compartmental type) or ANSI C57.12.34 (pad-mounted, loop-feed). For the UAE market, DEWA and ADDC specifications are fully supported.'
    },
    {
      q: 'Are pad mounted transformers suitable for Middle East climate conditions?',
      a: 'Yes. Our units are rated for tropical ambient temperatures up to 50 °C and feature enhanced ONAN cooling with corrugated tank walls. All external surfaces receive heavy-duty anti-corrosion treatment for long life in desert and coastal environments.'
    },
    {
      q: 'What safety features do your pad mounted transformers include?',
      a: 'All units feature tamper-resistant, lockable cabinet design with dead-front or live-front construction. Internal components include Bay-O-Net fuses, load-break switches, and pressure relief devices for comprehensive protection.'
    },
    {
      q: 'Does ETS perform full testing on pad mounted transformers?',
      a: 'Yes. Every unit undergoes full routine testing per IEC or ANSI standards including ratio, impedance, losses, applied voltage, induced voltage, and insulation resistance. BIL testing is performed per voltage class.'
    },
    {
      q: 'What is the lead time for pad mounted transformer orders?',
      a: 'Standard pad mounted units can be manufactured on schedules aligned with project specifications. Bulk utility orders benefit from our high-volume production line with staggered delivery schedules to match project rollout timelines.'
    },
    {
      q: 'Why do developers and utilities choose ETS pad mounted transformers?',
      a: 'Local manufacturing in Dubai means competitive pricing, fast delivery, and responsive after-sales support. With both IEC and ANSI compliance capability, ETS pad mounted units are versatile enough for any Middle East project specification.'
    },
    {
      q: 'How long is the lead time for a DEWA / IEC 60076-approved pad mounted transformers order in the UAE?',
      a: 'Standard lead time is scheduled per project specification, ex-works Jebel Ali, Dubai, and confirmed at order acknowledgement. Project-specific timelines are confirmed within 48 hours of receiving your technical specification.'
    },
    {
      q: 'How do I request a quote for 11 kV / 33 kV pad mounted transformers in UAE?',
      a: 'The fastest path is to share kVA rating, primary/secondary voltages, vector group, impedance, cooling type and site delivery address. Use our RFQ form or WhatsApp desk — our commercial engineering team replies within one working day.'
    },
    {
      q: 'Can ETS deliver an emergency replacement pad mounted transformers in UAE?',
      a: 'Yes. ETS holds stock of standard-rating distribution units and operates a 24/7 emergency response desk for UAE and cross-border GCC deliveries (KSA, Oman, Kuwait, Bahrain, Qatar).'
    }
  ];

  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Related Engineering Calculators
  const calculators = [
    {
      title: 'kVA / kW / Amps Calculator',
      desc: 'Size single-phase and three-phase pad-mounted ratings for utility and commercial loops.',
      href: '/calculators/'
    },
    {
      title: 'Transformer Sizing Advisor',
      desc: 'Recommend a pad-mounted transformer for residential, commercial and light-industrial loads.',
      href: '/calculators/'
    },
    {
      title: 'Short Circuit Calculator',
      desc: 'Calculate fault levels at the pad-mounted secondary to spec downstream protection.',
      href: '/calculators/'
    },
    {
      title: 'Loss & Efficiency Calculator',
      desc: 'Validate DOE 2016 / NRCan 2019 efficiency targets for utility pad-mounted procurement.',
      href: '/calculators/'
    },
    {
      title: 'Voltage Drop Calculator',
      desc: 'Verify cable runs from the pad-mounted secondary to commercial / residential service entrances.',
      href: '/calculators/'
    }
  ];

  // Alternative Capacities in the Range (matching home page product cards)
  const defaultAlternatives = [
    {
      name: 'Distribution Transformers',
      slug: 'distribution-transformers',
      cat: 'Transformers',
      badge: '75 kVA – 5 MVA',
      typeTag: 'Oil-Immersed',
      image: '/assets/images/products/ets/distribution-transformers.webp',
      desc: 'High-performance distribution transformers engineered to international standards for critical power infrastructure.',
      specRows: [
        { key: 'Capacity', val: '75 kVA – 5 MVA' },
        { key: 'Primary Voltage', val: '≤ 36 kV' },
        { key: 'Cooling', val: 'ONAN' },
        { key: 'Standards', val: 'IEC 60076 / ANSI' }
      ],
      tags: ['Distribution', 'Type Tested', 'Low Loss']
    },
    {
      name: 'Medium Power Transformers (GSU)',
      slug: 'medium-power-transformers-gsu',
      cat: 'Transformers',
      badge: 'Up to 100 MVA',
      typeTag: 'Step-Up GSU',
      image: '/assets/images/products/ets/medium-power-transformers-gsu.webp',
      desc: 'Custom-engineered generator step-up (GSU) and medium power transformers built for heavy utilities and industrial generation.',
      specRows: [
        { key: 'Capacity', val: '5 MVA – 100 MVA' },
        { key: 'Primary Voltage', val: 'Up to 145 kV' },
        { key: 'Cooling', val: 'ONAN / ONAF' },
        { key: 'Standards', val: 'IEC 60076 / IEEE' }
      ],
      tags: ['Medium Power', 'GSU', 'Utility Grade']
    },
    {
      name: 'Package Substation Transformers',
      slug: 'package-substation-transformers',
      cat: 'Transformers',
      badge: 'Up to 3,150 kVA',
      typeTag: 'Turnkey Skid',
      image: '/assets/images/products/ets/package-substation-transformers.webp',
      desc: 'Integrated, factory-assembled package substations combining transformer, MV switchgear, and LV distribution in a weatherproof enclosure.',
      specRows: [
        { key: 'Capacity', val: '315 kVA – 3,150 kVA' },
        { key: 'Voltage Class', val: '11 kV / 22 kV / 33 kV' },
        { key: 'Enclosure', val: 'IP54 Outdoor / C5M' },
        { key: 'Standards', val: 'IEC 62271-202' }
      ],
      tags: ['Package Substation', 'Skid-Mounted', 'Weatherproof']
    }
  ];

  const alternativeCapacities = others.length >= 3 ? others.slice(0, 3).map(o => ({
    name: o.name,
    slug: o.slug,
    cat: o.cat || 'Transformers',
    badge: (o.name.match(/([\d,]+)\s*kva/i) || [])[1] ? `${(o.name.match(/([\d,]+)\s*kva/i) || [])[1]} kVA` : 'Type Tested',
    typeTag: o.typeTag || 'Oil-Immersed',
    image: o.image,
    desc: o.desc,
    specRows: (o.specs || []).filter(s => s.includes(':')).map(s => {
      const [k, ...v] = s.split(':');
      return { key: k.trim(), val: v.join(':').trim() };
    }),
    tags: o.tags || ['Utility Grade', 'Low Loss', 'IEC 60076']
  })) : defaultAlternatives;

  const productName = product?.name || 'Pad Mounted Transformers';
  const productDesc = details?.overviewParagraph || product?.desc || 'Tamper-resistant, dead-front pad-mounted transformers designed for underground distribution systems. UL 1562 listed and built to ANSI/IEEE C57.12.34.';

  return (
    <article className="pad-mounted-page">
      
      {/* 1. AUTHORITY & STANDARDS TRUST BAR (Matches Emirates Transformer trust strip) */}
      <section className="pad-trust-bar" aria-label="Utility Pre-Approvals & Standards">
        <div className="wrap pad-trust-bar__inner">
          {trustSignals.map((item, idx) => (
            <div key={idx} className="pad-trust-bar__item">
              <span className="pad-trust-bar__icon">
                <CheckIcon />
              </span>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. HERO SHOWCASE & PROCUREMENT SIDEBAR */}
      <section className="sec pad-hero-sec" aria-label="Product Showcase & Technical Specifications">
        <div className="wrap">
          <div className="pad-hero-grid">
            
            {/* LEFT COLUMN: INTERACTIVE GALLERY & GA DRAWING CALLOUT */}
            <div className="pad-gallery-col">
              <div className="pad-gallery-main">
                {/* Image Stage */}
                <div className="pad-gallery-stage">
                  <img
                    key={galleryImages[activeImgIdx]?.src || product?.image}
                    src={galleryImages[activeImgIdx]?.src || product?.image}
                    alt={galleryImages[activeImgIdx]?.alt || productName}
                    className="pad-gallery-stage__img"
                    loading="eager"
                  />
                  {/* Listing Badge */}
                  <div className="pad-gallery-badge">
                    <span>{isPadMounted ? 'UL Listed' : 'Type Tested'}</span>
                  </div>

                  {/* Overlaid Bottom Metric Bar (Emirates Transformer Signature) */}
                  <div className="pad-gallery-metrics">
                    <div className="pad-metric-box">
                      <div className="pad-metric-box__val">
                        {isPadMounted ? '10' : (details?.ratingMva?.split(' ')[0] || '16')}
                        <span>{isPadMounted ? 'MVA' : (details?.ratingMva?.split(' ')[1] || 'MVA')}</span>
                      </div>
                      <div className="pad-metric-box__lbl">Max Capacity</div>
                    </div>
                    <div className="pad-metric-box">
                      <div className="pad-metric-box__val">
                        {isPadMounted ? '36' : (details?.voltagePrimary?.match(/\d+/)?.[0] || '33')}
                        <span>kV</span>
                      </div>
                      <div className="pad-metric-box__lbl">Voltage Class</div>
                    </div>
                    <div className="pad-metric-box">
                      <div className="pad-metric-box__val">
                        {isPadMounted ? 'UL' : 'IEC'}
                        <span>{isPadMounted ? '1562' : '60076'}</span>
                      </div>
                      <div className="pad-metric-box__lbl">Standard</div>
                    </div>
                    <div className="pad-metric-box">
                      <div className="pad-metric-box__val">
                        {isPadMounted ? '200' : 'Dyn11'}
                        <span>{isPadMounted ? 'A' : ''}</span>
                      </div>
                      <div className="pad-metric-box__lbl">{isPadMounted ? 'Elbow Rated' : 'Vector Group'}</div>
                    </div>
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="pad-thumbs-row" aria-label="Product Image Views">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIdx(idx)}
                      className={`pad-thumb-btn ${activeImgIdx === idx ? 'is-active' : ''}`}
                      aria-label={`View ${img.label}`}
                      title={img.label}
                    >
                      <img src={img.src} alt={img.label} loading="lazy" />
                    </button>
                  ))}
                </div>

                {/* Engineering GA Drawings Callout Box */}
                <div className="pad-cad-callout">
                  <div className="pad-cad-callout__left">
                    <div className="pad-cad-callout__icon">
                      <DocumentIcon />
                    </div>
                    <div className="pad-cad-callout__text">
                      <strong>Need Engineering GA Drawings?</strong>
                      <p>Full dimensional outline, plinth foundation drawings, and terminal arrangement SLDs available upon tender request.</p>
                    </div>
                  </div>
                  <div className="pad-cad-callout__action">
                    <a className="btn btn--primary btn--sm" href={quoteUrl}>
                      Request GA Drawing & SLD <Arrow />
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: PROCUREMENT SIDEBAR CARD */}
            <div className="pad-sidebar-col">
              <div className="pad-sidebar-card">
                
                {/* Header Kicker */}
                <div className="pad-kicker">
                  <span className="pad-kicker__bar"></span>
                  <span className="pad-kicker__text">
                    {isPadMounted ? 'UL Listed · Dead-Front · Underground' : 'IEC 60076 · Low Loss · Utility Pre-Approved'}
                  </span>
                </div>

                <h2 className="pad-title">{productName}</h2>
                
                <p className="pad-desc">{productDesc}</p>

                {/* Standards Badges */}
                <div className="pad-chips">
                  {isPadMounted ? (
                    <>
                      <span className="pad-chip">UL 1562</span>
                      <span className="pad-chip">ANSI/IEEE C57</span>
                      <span className="pad-chip">ISO 9001</span>
                      <span className="pad-chip">CSA (optional)</span>
                    </>
                  ) : (
                    <>
                      <span className="pad-chip">IEC 60076</span>
                      <span className="pad-chip">IEEE C57</span>
                      <span className="pad-chip">ASTA / STL</span>
                      <span className="pad-chip">ISO 9001:2015</span>
                    </>
                  )}
                </div>

                <div className="pad-divider"></div>

                {/* Key Specification Matrix */}
                <div className="pad-quick-specs">
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Capacity Range</span>
                    <strong className="pad-quick-spec-item__v">{details?.powerKva ? `${details.powerKva} (${details.ratingMva})` : '300 kVA – 5 MVA (up to 10 MVA)'}</strong>
                  </div>
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Voltage Class</span>
                    <strong className="pad-quick-spec-item__v">{details?.voltagePrimary || '≤36 kV'}</strong>
                  </div>
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Design</span>
                    <strong className="pad-quick-spec-item__v">{isPadMounted ? 'Dead-Front, Loop Feed' : (details?.coolingType || 'ONAN / ONAF Forced Air')}</strong>
                  </div>
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Standards</span>
                    <strong className="pad-quick-spec-item__v">{isPadMounted ? 'ANSI/IEEE C57.12.34' : 'IEC 60076-1 to 10'}</strong>
                  </div>
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Listing / Approvals</span>
                    <strong className="pad-quick-spec-item__v">{isPadMounted ? 'UL 1562' : 'BPDB, DESCO, DEWA, ADDC'}</strong>
                  </div>
                  <div className="pad-quick-spec-item">
                    <span className="pad-quick-spec-item__k">Dielectric Fluid</span>
                    <strong className="pad-quick-spec-item__v">{details?.fluidType?.split(' ')[0] || 'Mineral Oil'} / FR3 Ester</strong>
                  </div>
                </div>

                <div className="pad-divider"></div>

                {/* Action CTAs */}
                <div className="pad-actions">
                  <a className="btn btn--primary pad-btn-main" href={quoteUrl}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                      <path d="m21.854 2.147-10.94 10.939" />
                    </svg>
                    <span>Request Specification Quote</span>
                  </a>

                  <a className="btn btn--ghost pad-btn-sub" href="/contact/">
                    Speak to an Application Engineer
                  </a>

                  <a className="btn btn--wa pad-btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.28-1.93 1.34-.52.06-1.19.09-3.87-1.02-3.23-1.34-5.32-4.63-5.48-4.85-.16-.22-1.3-1.74-1.3-3.32 0-1.58.83-2.35 1.12-2.67.3-.32.65-.4 0.87-.4.22 0 .43 0 .62.01.2.01.47-.08.73.56.27.68.92 2.27 1 2.44.08.17.14.37.03.59-.11.22-.16.35-.32.55-.16.2-.34.45-.49.6-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.71-.08.19-.22.82-.95 1.04-1.28.22-.33.44-.27.73-.16.29.11 1.84.87 2.16 1.03.32.16.54.24.62.38.08.14.08.82-.16 1.5z" />
                    </svg>
                    <span>WhatsApp Tech Desk</span>
                  </a>
                </div>

                {/* Installation Support Banner */}
                <div className="pad-support-banner">
                  <div className="pad-support-banner__icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
                      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
                    </svg>
                  </div>
                  <div className="pad-support-banner__content">
                    <strong>Installation Support available on request</strong>
                    <p>Support from a BPEL / ETS engineer during installation and commissioning, available on request.</p>
                  </div>
                </div>

                {/* Direct Tender Consultation Banner */}
                <div className="pad-support-banner">
                  <div className="pad-support-banner__icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="pad-support-banner__content">
                    <strong>Direct Tender Consultation</strong>
                    <p>Our engineering team can provide turnkey EPC pricing, detailed SLD reviews, and on-site commissioning support for your tender projects.</p>
                  </div>
                </div>

                {/* Bottom Trust Badges */}
                <div className="pad-trust-strip">
                  <div className="pad-trust-strip__item">
                    <CheckIcon />
                    <span>Type Tested</span>
                  </div>
                  <span className="pad-trust-strip__dot"></span>
                  <div className="pad-trust-strip__item">
                    <CheckIcon />
                    <span>35-Yr Design Life</span>
                  </div>
                  <span className="pad-trust-strip__dot"></span>
                  <div className="pad-trust-strip__item">
                    <CheckIcon />
                    <span>Global Standards</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ENGINEERING FEATURES (NAVY ACCENT SECTION) */}
      <section className="sec sec--dark pad-features-sec" aria-label="Core Engineering Advantages">
        <div className="wrap">
          <div className="pad-features-card">
            <div className="pad-features-grid">
              
              {/* Left Column: Feature List Selectors */}
              <div className="pad-features-left">
                <div className="pad-features-head">
                  <div className="pad-kicker pad-kicker--light">
                    <span className="pad-kicker__bar"></span>
                    <span className="pad-kicker__text">ENGINEERING FEATURES</span>
                  </div>
                  <h2>Core Technical Advantages</h2>
                </div>

                <div className="pad-features-nav" role="tablist">
                  {features.map((feat, idx) => {
                    const isActive = activeFeatureIdx === idx;
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveFeatureIdx(idx)}
                        className={`pad-feature-tab ${isActive ? 'is-active' : ''}`}
                      >
                        <span className="pad-feature-tab__check">
                          <CheckIcon />
                        </span>
                        <span className="pad-feature-tab__title">{feat.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Visual Stage with Dynamic Callout Box */}
              <div className="pad-features-right">
                <div className="pad-features-visual">
                  <img
                    src={isPadMounted ? "/assets/images/products/pad-mounted/pad-mounted-cover-feature.webp" : (product?.image || "/assets/images/products/power-transformer.png")}
                    alt={`${productName} — engineering features showcase`}
                    className="pad-features-visual__img"
                    loading="lazy"
                  />
                  <div className="pad-features-callout">
                    <h3>{features[activeFeatureIdx]?.title}</h3>
                    <p>{features[activeFeatureIdx]?.desc}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL DATA TABLE (GTP MATRIX) */}
      <section className="sec sec--alt pad-specs-sec" aria-label="Guaranteed Technical Particulars">
        <div className="wrap">
          <header className="sec-head">
            <div className="pad-kicker">
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">TECHNICAL DATA</span>
            </div>
            <h2>Guaranteed Technical Particulars (GTP)</h2>
            <p className="sec-head__sub">
              Manufactured and tested to ANSI/IEEE C57.12.34 and IEC 60076 standards. Custom vector groups and loss evaluations are engineered per tender schedule.
            </p>
          </header>

          <div className="pad-table-card">
            <div className="pad-table-wrap">
              <table className="pad-table" aria-label="Technical Data Table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '40%' }}>Engineering Parameter</th>
                    <th scope="col" style={{ width: '60%' }}>Guaranteed Rating / Particulars</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="pad-table__param">{row.param}</td>
                      <td className="pad-table__val"><strong>{row.value}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pad-table-card__footer">
              <p>* Guaranteed ratings conform to IEC 60076 and IEEE standards. Custom impedance, BIL withstand levels, and specialized loss limits are tailored to client project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGIONAL OVERVIEW */}
      <section className="sec pad-regional-sec" aria-label="Regional Overview">
        <div className="wrap">
          <div className="pad-regional-card">
            <div className="pad-kicker" style={{ marginBottom: '1rem' }}>
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">REGIONAL OVERVIEW</span>
            </div>
            <p className="pad-regional-text">
              {isPadMounted ? (
                "Pad-mounted distribution transformers for the GCC's high-density urban and commercial sites — dead-front, tamper-proof and corrosion-protected for the region's saline-coastal and 50 °C+ ambient environments. 300 kVA to 5 MVA at 11 kV / 22 kV / 33 kV per IEC 60076. Approved for DEWA, ADDC, SEWA and FEWA distribution and widely deployed at malls, mixed-use developments, fuel stations and EV-charging infrastructure across the UAE and Saudi Arabia."
              ) : (
                `BPEL heavy-duty power and distribution transformers are engineered to withstand continuous high ambient temperatures up to +55°C, high cyclic inductive motor loads, and tropical marine humidity. Certified for utility grid substations, export processing zones, and continuous 24/7 manufacturing operations across South Asia and Middle East export infrastructure.`
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHERE PAD MOUNTED TRANSFORMERS EXCEL (APPLICATIONS) */}
      <section className="sec sec--alt pad-apps-sec" aria-label="Where Product Excels">
        <div className="wrap">
          <header className="sec-head">
            <div className="pad-kicker">
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">APPLICATIONS</span>
            </div>
            <h2>Where {productName} Excels</h2>
            <p className="sec-head__sub">
              Engineered for seamless installation in critical infrastructure where safety, security, and continuous electrical reliability are paramount.
            </p>
          </header>

          <div className="pad-apps-grid">
            {applications.map((app) => (
              <div key={app.num} className="pad-app-card">
                <span className="pad-app-card__num-watermark" aria-hidden="true">{app.num}</span>
                <div className="pad-app-card__pill">{app.num}</div>
                <h3 className="pad-app-card__title">{app.title}</h3>
                <p className="pad-app-card__desc">{app.desc}</p>
                <div className="pad-app-card__accent-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RIGOROUS FACTORY TESTING & STL WITNESSED ASSURANCE */}
      <section className="sec pad-testing-sec" aria-label="Factory Acceptance Testing">
        <div className="wrap">
          <header className="sec-head">
            <div className="pad-kicker">
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">QUALITY ASSURANCE</span>
            </div>
            <h2>IEC 60076 Testing & Factory Acceptance (FAT)</h2>
            <p className="sec-head__sub">
              Every transformer undergoes exhaustive dielectric, thermal, and mechanical test sequences witnessed by third-party inspectors before dispatch.
            </p>
          </header>

          <div className="pad-testing-grid">
            {testCertifications.map((t, idx) => (
              <div key={idx} className="pad-test-card">
                <div className="pad-test-card__head">
                  <span className="pad-test-card__std">{t.std}</span>
                  <span className="pad-test-card__status">
                    <CheckIcon /> Certified
                  </span>
                </div>
                <h3 className="pad-test-card__name">{t.name}</h3>
                <p className="pad-test-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RELATED ENGINEERING TOOLS & CALCULATORS */}
      <section className="sec sec--alt pad-tools-sec" aria-label="Related Engineering Tools">
        <div className="wrap">
          <header className="sec-head">
            <div className="pad-kicker">
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">ENGINEERING TOOLS</span>
            </div>
            <h2>Related Engineering Calculators</h2>
            <p className="sec-head__sub">
              Specify, size, and validate this transformer with our free engineering calculators — used by EPCs and consultants worldwide.
            </p>
          </header>

          <div className="pad-tools-grid">
            {calculators.map((calc, idx) => (
              <Link key={idx} href={calc.href} className="pad-tool-card">
                <div className="pad-tool-card__head">
                  <div className="pad-tool-card__icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <line x1="8" x2="16" y1="6" y2="6" />
                      <line x1="16" x2="16" y1="14" y2="18" />
                      <path d="M16 10h.01" />
                      <path d="M12 10h.01" />
                      <path d="M8 10h.01" />
                      <path d="M12 14h.01" />
                      <path d="M8 14h.01" />
                      <path d="M12 18h.01" />
                      <path d="M8 18h.01" />
                    </svg>
                  </div>
                  <span className="pad-tool-card__arrow">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </span>
                </div>
                <h3 className="pad-tool-card__title">{calc.title}</h3>
                <p className="pad-tool-card__desc">{calc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="sec pad-faq-sec" aria-label="Frequently Asked Questions">
        <div className="wrap pad-faq-wrap">
          <header className="sec-head" style={{ textAlign: 'center' }}>
            <div className="pad-kicker" style={{ justifyContent: 'center' }}>
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">FAQ</span>
            </div>
            <h2>Frequently Asked Questions</h2>
            <p className="sec-head__sub" style={{ marginInline: 'auto' }}>
              Technical answers covering standards, safety, climate resilience, and procurement schedules.
            </p>
          </header>

          <div className="pad-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={`pad-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="pad-faq-trigger"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="pad-faq-question">{faq.q}</span>
                    <span className="pad-faq-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pad-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. ALTERNATIVE CAPACITIES (MATCHING HOME PAGE PCARD) */}
      <section className="sec sec--alt pad-related-sec" aria-label="Alternative Capacities in Range">
        <div className="wrap">
          <header className="sec-head">
            <div className="pad-kicker">
              <span className="pad-kicker__bar"></span>
              <span className="pad-kicker__text">ALTERNATIVE CAPACITIES</span>
            </div>
            <h2>Other Ratings & Capacities in the Range</h2>
            <p className="sec-head__sub">
              Explore our full line of oil-immersed medium power, distribution, and packaged substation units engineered to IEC 60076 and ANSI/IEEE standards.
            </p>
          </header>

          <div className="pgrid">
            {alternativeCapacities.map((p) => (
              <article className="pcard" key={p.slug}>
                {/* Image Header with Badges */}
                <div className="pcard__img">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                  />
                  {p.badge && (
                    <span className="pcard__badge">
                      <BoltIcon />
                      <span>{p.badge}</span>
                    </span>
                  )}
                  <span className="pcard__type-tag">{p.typeTag}</span>
                </div>

                {/* Body Details */}
                <div className="pcard__body">
                  <div className="pcard__cat">
                    <span className="pcard__dot" aria-hidden="true" />
                    <span>{p.cat}</span>
                  </div>

                  <h3 className="pcard__title">
                    <Link href={`/products/${p.slug}/`}>{p.name}</Link>
                  </h3>

                  <p className="pcard__desc">{p.desc}</p>

                  {/* Specs Box */}
                  {p.specRows && p.specRows.length > 0 && (
                    <dl className="pcard__specs-box">
                      {p.specRows.map((spec) => (
                        <div className="pcard__spec-row" key={spec.key}>
                          <dt className="pcard__spec-key">{spec.key}</dt>
                          <dd className="pcard__spec-val">{spec.val}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {/* Tags */}
                  {p.tags && p.tags.length > 0 && (
                    <ul className="pcard__tags">
                      {p.tags.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}

                  {/* Action Buttons */}
                  <div className="pcard__actions">
                    <Link href={`/products/${p.slug}/`} className="pcard__btn pcard__btn--main">
                      <span>View Details</span>
                      <Arrow />
                    </Link>
                    <a
                      href={`/contact/?product=${encodeURIComponent(p.name)}`}
                      className="pcard__btn pcard__btn--ghost"
                    >
                      Inquiry
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="pad-nav-bar">
            <Link href="/products/cast-resin-dry-type-transformers/" className="pad-nav-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <span>Cast Resin Dry Type Transformers</span>
            </Link>

            <Link href="/products/" className="pad-nav-all">
              All Products
            </Link>

            <Link href="/products/solar-pv-transformers/" className="pad-nav-link">
              <span>Solar PV Transformers</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. BOTTOM PROPOSAL CTA BANNER */}
      <section className="sec pad-cta-sec" aria-label="Request Technical Proposal">
        <div className="wrap">
          <div className="pad-cta-card">
            <div className="pad-cta-card__bg">
              <img
                src="/assets/images/products/pad-mounted/pad-mounted-cover-gallery.webp"
                alt="Pad Mounted Transformers background"
                loading="lazy"
              />
              <div className="pad-cta-card__overlay"></div>
            </div>
            
            <div className="pad-cta-card__inner">
              <div className="pad-cta-card__text">
                <h2>Ready to Specify {productName}?</h2>
                <p>
                  Share your technical single-line diagram (SLD) or tender schedule with our engineering desk. We deliver guaranteed technical proposals with full loss calculations within 24 to 48 hours.
                </p>
              </div>

              <div className="pad-cta-card__btns">
                <a className="btn btn--primary pad-btn-cta" href={quoteUrl}>
                  <span>Request Technical Proposal</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a className="btn btn--wa pad-btn-cta-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
                  <span>Direct WhatsApp Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </article>
  );
}
