import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import ServiceFaq from '@/components/ServiceFaq';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import styles from './page.module.css';

const find = slug => SERVICES.find(s => s.slug === slug);

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = find((await params).slug);
  return s ? { title: `${s.title} | BPEL Industrial Power Engineering`, description: s.short } : {};
}

/* SVG Engineering Icons matching Emirates Transformer layout */
const Icons = {
  Package: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
      <path d="M12 22V12" />
      <polyline points="3.3 7 12 12 20.7 7" />
      <polyline points="7.5 4.3 16.5 9.5" />
    </svg>
  ),
  Factory: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1M12 18h1M7 18h1" />
    </svg>
  ),
  Switchgear: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 8h10M7 12h10M7 16h10M12 4v16" />
    </svg>
  ),
  Substation: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6M9 14h6M9 18h6" />
    </svg>
  ),
  FileCheck: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  ClipboardCheck: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <polyline points="9 14 11 16 15 12" />
    </svg>
  ),
  Gauge: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m14 14-4-4M12 6v2M6 12h2M18 12h-2" />
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Cog: () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
};

/* Emirates Transformer Content Mapping for All 4 Single Service Pages */
const SERVICE_PAGE_DATA = {
  'equipment-supply': {
    heroPills: ['IEC / ANSI / UL', 'Factory Tested', 'Global Delivery'],
    heroTitle: 'Engineered. Tested. Delivered.',
    heroSubtitle: 'From design freeze to dispatch — every transformer is custom-built, fully type-tested, and delivered with complete documentation.',
    introLead: 'Our state-of-the-art manufacturing facility supplies utility and industry-approved IEC 60076 distribution and power transformers up to 100 MVA, cast-resin dry-type units, and turnkey package substations to utilities and infrastructure operators worldwide.',
    portfolioKicker: 'SUPPLY SCOPE',
    portfolioTitle: 'Complete Equipment Portfolio',
    portfolioDesc: 'Full range of power transformers, distribution transformers, switchgear and packaged substations — engineered to IEC, ANSI/IEEE and UL standards.',
    portfolioCards: [
      {
        icon: 'Package',
        title: 'Power & EHV Transformers',
        desc: 'Custom-engineered oil-immersed transformers for transmission, generation, and heavy industrial grid applications.',
        bullets: [
          'Up to 100 MVA, 230 kV',
          'Short-circuit tested',
          'OLTC with 33+ positions',
          'Vapour Phase Dried (VPD)',
          'Low-noise design < 62 dB',
          'IEC 60076 & IEEE compliant'
        ]
      },
      {
        icon: 'Factory',
        title: 'Distribution Transformers',
        desc: 'Hermetically sealed, oil-immersed, and cast-resin transformers for utility, commercial, and solar distribution.',
        bullets: [
          '100 kVA to 5,000 kVA',
          'Hermetically sealed tank',
          'Cast resin dry type options',
          '55°C severe tropical ambient',
          'Pad-mounted dead-front',
          'EcoDesign Tier 2 low loss'
        ]
      },
      {
        icon: 'Switchgear',
        title: 'Switchgear & Protection',
        desc: 'Medium and low-voltage switchgear assemblies, feeder pillars, RTCC panels, and digital protection systems.',
        bullets: [
          '11kV / 33kV MV switchgear',
          'Vacuum circuit breakers (VCB)',
          'LV distribution feeder pillars',
          'RTCC automatic tap control',
          'Digital protection relays',
          'Type-tested arc-proof panels'
        ]
      },
      {
        icon: 'Substation',
        title: 'Packaged Substations',
        desc: 'Factory-assembled, containerized, and skid-mounted compact substations ready for rapid plinth installation.',
        bullets: [
          'Pre-wired containerized unit',
          'Skid-mounted compact layouts',
          'Integrated MV + LV sections',
          'Desert & tropical weatherproof',
          'IP54 / IP65 enclosures',
          'Plug-and-play field hookup'
        ]
      }
    ],
    processKicker: 'SUPPLY PROCESS',
    processTitle: 'From Order to Delivery',
    processDesc: 'Disciplined step-by-step engineering lifecycle ensuring on-time delivery and zero defects at energisation.',
    processSteps: [
      { num: '01', title: 'Technical Review', desc: 'Engineers review single-line diagrams, utility specifications, and site ambient conditions.' },
      { num: '02', title: 'Design & Engineering', desc: '3D electromagnetic FEA simulation, thermal modeling, and short-circuit impedance matching.' },
      { num: '03', title: 'Manufacturing', desc: 'Step-lap mitred core stacking, automated copper winding, VPD drying, and tank fabrication.' },
      { num: '04', title: 'Quality Inspection', desc: 'Rigorous in-process QC checks, dimensional tolerance surveys, and certified raw materials.' },
      { num: '05', title: 'Factory Testing', desc: 'Routine and type testing in ISO/IEC 17025 accredited bay with customer FAT witnessing.' },
      { num: '06', title: 'Packing & Dispatch', desc: 'Nitrogen gas blanketing, seaworthy crating, multi-axle logistics, and delivery tracking.' }
    ],
    customCard: {
      title: 'Custom Engineering',
      desc: 'Every transformer is engineered to your exact single-line diagram and tender parameters — never an off-the-shelf compromise.',
      bullets: [
        'Application-specific thermal design for +55°C ambient',
        'Multi-standard compliance (IEC 60076 / IEEE C57 / UL)',
        'Capitalized loss evaluation optimization (A and B factors)',
        'Corrosion protection C5-M for coastal & desert environments'
      ],
      linkText: 'Discuss Your Requirements'
    },
    deliveryCard: {
      title: 'Delivery & Logistics',
      desc: 'Turnkey logistics coordination from factory floor to jobsite plinth with specialized low-bed trailers and impact recording.',
      metrics: [
        { val: '8–14wk', lbl: 'Standard Lead Time' },
        { val: '6wk', lbl: 'Fast-Track Available' },
        { val: '100%', lbl: 'FAT Witnessed' },
        { val: 'Global', lbl: 'Export Delivery Reach' }
      ],
      linkText: 'Get Delivery Timeline'
    },
    ctaTitle: 'Ready to Specify Your Equipment?',
    ctaDesc: 'Our engineering team will review your specifications, SLD, and loss capitalisation requirements to provide a technical proposal within 48 hours.'
  },
  'installation': {
    heroPills: ['Turnkey EPC', 'Certified Rigging', 'Substation Energisation'],
    heroTitle: 'Precision Rigging. Seamless Energisation.',
    heroSubtitle: 'From site civil inspection to heavy crane placement and live grid synchronization — certified engineers on site.',
    introLead: 'Our specialized substation installation division handles high-voltage equipment placement, multi-ton crane rigging, busbar coupling, and supervised commissioning for primary utilities, industrial complexes, and renewable energy substations.',
    portfolioKicker: 'INSTALLATION SCOPE',
    portfolioTitle: 'Complete Substation Installation Scope',
    portfolioDesc: 'End-to-end site erection, mechanical assembly, stress-cone cabling, and protective tripping verification.',
    portfolioCards: [
      {
        icon: 'Package',
        title: 'Heavy Rigging & Plinth Placement',
        desc: 'Specialized hydraulic jacking, multi-axle low-bed positioning, and laser-guided plinth alignment.',
        bullets: [
          'Cranes up to 120-ton capacity',
          'Hydraulic skidding tracks',
          'Laser plinth leveling check',
          'Anti-vibration pad seating',
          'Seismic anchor bolt fixing',
          'Zero-damage rigging protocols'
        ]
      },
      {
        icon: 'Factory',
        title: 'Mechanical Accessory Assembly',
        desc: 'Torque-calibrated installation of radiators, conservator tanks, dehydrating breathers, and relays.',
        bullets: [
          'Radiator bank alignment',
          'Bushing & turret mounting',
          'Conservator tank fitting',
          'Dehydrating breather prep',
          'Buchholz & PRD fitting',
          'Calibrated torque recording'
        ]
      },
      {
        icon: 'Switchgear',
        title: 'HV / LV Cable & Busbar Coupling',
        desc: 'Stress-cone high-voltage cable terminations, busduct flexible links, and substation earthing grids.',
        bullets: [
          'Cold-shrink HV terminations',
          'Copper busbar alignment',
          'Substation perimeter earthing',
          'Surge arrestor connection',
          'Control wiring & RTCC coupling',
          'Torque witness marking'
        ]
      },
      {
        icon: 'Substation',
        title: 'Testing & Supervised Energisation',
        desc: 'Site acceptance tests (SAT), interlock tripping simulations, and utility witness handover.',
        bullets: [
          'Dielectric insulation testing',
          'Voltage turns ratio & vector',
          'Protective relay trip checks',
          'Phase angle synchronization',
          'Pre-energisation safety audit',
          'Official utility energisation'
        ]
      }
    ],
    processKicker: 'INSTALLATION PROCESS',
    processTitle: 'From Delivery to Energisation',
    processDesc: 'Disciplined site engineering milestones ensuring safe, compliant, and on-schedule grid energisation.',
    processSteps: [
      { num: '01', title: 'Site & Plinth Survey', desc: 'Civil foundation inspection, load-bearing verification, and crane access road clearance.' },
      { num: '02', title: 'Heavy Crane Rigging', desc: 'Multi-axle hydraulic transport unloading and laser-guided plinth positioning.' },
      { num: '03', title: 'Mechanical Assembly', desc: 'Radiators, conservators, high-voltage bushings, and Buchholz piping assembly.' },
      { num: '04', title: 'Vacuum Oil Topping', desc: 'High-vacuum oil degasification, particle filtration, and level compensation under vacuum.' },
      { num: '05', title: 'Cabling & Earthing', desc: 'HV stress-cone terminations, earthing grid bonding, and protection control cabling.' },
      { num: '06', title: 'SAT & Energisation', desc: 'Pre-commissioning tests, relay tripping verification, and supervised grid tie-in.' }
    ],
    customCard: {
      title: 'Safety & Quality Discipline',
      desc: 'Our installation teams maintain strict safety protocols with ISO 45001 certification and zero-lost-time injury compliance.',
      bullets: [
        'Strict Lock-Out / Tag-Out (LOTO) utility clearances',
        'Calibrated digital torque wrenches with QA log sheets',
        'Dust-free clean environmental enclosures for bushing work',
        'Certified high-voltage substation commissioning engineers'
      ],
      linkText: 'Review Site Procedures'
    },
    deliveryCard: {
      title: 'Mobilisation & Readiness',
      desc: 'Rapid site deployment equipped with mobile crane trucks, oil trailers, and test equipment nationwide.',
      metrics: [
        { val: '24–48h', lbl: 'Emergency Mobilisation' },
        { val: '120t', lbl: 'Max Crane Lift Capacity' },
        { val: '100%', lbl: 'Zero-Harm Safety Track' },
        { val: '230 kV', lbl: 'Max Grid Voltage Class' }
      ],
      linkText: 'Request Installation Quote'
    },
    ctaTitle: 'Planning Substation Installation or Upgrades?',
    ctaDesc: 'Our senior site engineers provide turnkey rigging plans, foundation checks, and installation quotations within 48 hours.'
  },
  'testing': {
    heroPills: ['ISO/IEC 17025', 'DGA Chromatography', 'Condition Diagnostics'],
    heroTitle: 'Predictive Insight. Certified Integrity.',
    heroSubtitle: 'Complete factory acceptance (FAT), site acceptance (SAT), and dissolved gas chromatography diagnostics.',
    introLead: 'Our advanced high-voltage testing laboratory and on-site diagnostic fleet evaluate dielectric insulation, mechanical winding integrity, and dissolved fault gases with laboratory precision according to IEC and IEEE standards.',
    portfolioKicker: 'DIAGNOSTIC SCOPE',
    portfolioTitle: 'Comprehensive Testing & Diagnostic Services',
    portfolioDesc: 'State-of-the-art diagnostic portfolio from routine loss verification to non-invasive internal fault forensics.',
    portfolioCards: [
      {
        icon: 'Package',
        title: 'Dissolved Gas Analysis (DGA)',
        desc: 'Precision laboratory gas chromatography detecting arcing, corona discharge, and cellulose overheating down to 1 ppm.',
        bullets: [
          '7-gas ppm concentration profile',
          'Duval Triangle 1, 4 & 5 analysis',
          'Rogers Ratios fault scoring',
          'Moisture in oil (Karl Fischer ppm)',
          'Dielectric breakdown voltage (BDV)',
          'Acidity & interfacial tension'
        ]
      },
      {
        icon: 'Factory',
        title: 'Sweep Frequency Response (SFRA)',
        desc: 'Electromagnetic swept-frequency fingerprinting revealing micro-millimeter winding movement and core deformation.',
        bullets: [
          '10 Hz to 20 MHz sweep range',
          'Short-circuit fault deformation',
          'Core grounding & clamping check',
          'Transit shock impact survey',
          'Phase-to-phase baseline overlay',
          'IEEE C57.149 conformance'
        ]
      },
      {
        icon: 'Switchgear',
        title: 'Dielectric & Insulation Testing',
        desc: 'Automated high-voltage insulation resistance, polarisation index, dielectric dissipation (Tan Delta), and capacitance.',
        bullets: [
          '10 kV automated Megger profile',
          'Polarisation Index (PI) & DAR',
          'Winding resistance by Kelvin bridge',
          'Tan Delta (loss tangent) survey',
          'Condenser bushing C1 & C2 test',
          'Excitation current diagnostics'
        ]
      },
      {
        icon: 'Substation',
        title: 'Factory & Site Acceptance (FAT/SAT)',
        desc: 'Comprehensive routine and type testing witnessed in our accredited bay or on-site prior to live handover.',
        bullets: [
          'Turns ratio & vector verification',
          'No-load loss & current survey',
          'Full-load impedance & loss check',
          'Induced & applied AC overvoltage',
          'Lightning impulse surge verification',
          'Acoustic sound level survey'
        ]
      }
    ],
    processKicker: 'DIAGNOSTIC PROCESS',
    processTitle: 'From Sampling to Health Prognosis',
    processDesc: 'Systematic diagnostic testing methodology delivering actionable asset recommendations within hours.',
    processSteps: [
      { num: '01', title: 'Asset Scope Definition', desc: 'Review of transformer nameplate ratings, historical maintenance logs, and operational duty.' },
      { num: '02', title: 'On-Site Sampling & Testing', desc: 'Gas-tight glass syringe oil sampling and precision digital field electrical measurements.' },
      { num: '03', title: 'Laboratory Chromatography', desc: 'Gas chromatography for dissolved fault gases, moisture ppm, and dielectric breakdown.' },
      { num: '04', title: 'SFRA & Electrical Analysis', desc: 'Swept-frequency curve comparison and winding resistance temperature compensation.' },
      { num: '05', title: 'Fault Diagnostic Matrix', desc: 'Evaluation against Duval Triangle, IEC 60599, and IEEE C57 limits to locate anomalies.' },
      { num: '06', title: 'Health Dossier & Advice', desc: 'Color-coded condition report with residual lifespan prognosis and action plan.' }
    ],
    customCard: {
      title: 'Non-Invasive Diagnostic Science',
      desc: 'Our testing protocols evaluate internal condition while transformers remain on-load, avoiding costly shutdowns.',
      bullets: [
        'Live on-load oil sampling via bottom valves without interruption',
        'ISO/IEC 17025 accredited laboratory calibration',
        'Duval Triangles 1, 4 & 5 fault diagnosis methodology',
        'Expert evaluation by senior high-voltage diagnostic specialists'
      ],
      linkText: 'Explore Lab Capabilities'
    },
    deliveryCard: {
      title: 'Turnaround Benchmarks',
      desc: 'Rapid laboratory processing with emergency 12-hour turnaround for critical tripping investigations.',
      metrics: [
        { val: '12h', lbl: 'Emergency DGA Turnaround' },
        { val: '48h', lbl: 'Standard Report Turnaround' },
        { val: '1 ppm', lbl: 'DGA Detection Sensitivity' },
        { val: '100%', lbl: 'FAT / SAT Certification' }
      ],
      linkText: 'Order Diagnostic Testing'
    },
    ctaTitle: 'Need Immediate Oil Testing or Diagnostics?',
    ctaDesc: 'Send your oil samples or request on-site diagnostic testing. Our diagnostic lab provides rapid results within 12 to 48 hours.'
  },
  'maintenance': {
    heroPills: ['Life Extension', 'Mobile Oil Dehydration', 'OLTC Overhaul'],
    heroTitle: 'Reliability Preserved. Lifespan Extended.',
    heroSubtitle: 'Proactive maintenance, high-vacuum oil dehydration, and tap changer overhaul adding 10 to 15 years of dependable service.',
    introLead: 'Our mobile maintenance fleet brings factory-level transformer servicing directly to your substation plinth. We restore dielectric oil breakdown strength, eliminate gasket leaks, and overhaul on-load tap changers during scheduled plant shutdowns.',
    portfolioKicker: 'MAINTENANCE SCOPE',
    portfolioTitle: 'Complete Lifecycle Maintenance Scope',
    portfolioDesc: 'Preventive and corrective maintenance programs designed to eliminate catastrophic failures and cut total cost of ownership.',
    portfolioCards: [
      {
        icon: 'Package',
        title: 'High-Vacuum Oil Filtration',
        desc: 'Mobile 6,000 L/hr high-vacuum oil dehydration and degasification trailers restoring dielectric oil to pristine condition.',
        bullets: [
          'Moisture reduced below 5 ppm',
          'Dissolved gas stripped < 0.25%',
          'Particulate filtering down to 0.2µ',
          'Breakdown voltage restored > 70 kV',
          'Online & offline filtration modes',
          'De-sludging of active core/coils'
        ]
      },
      {
        icon: 'Factory',
        title: 'OLTC Inspection & Overhaul',
        desc: 'Comprehensive servicing of on-load tap changers including transition contact inspection, timing, and diverter oil renewal.',
        bullets: [
          'Diverter contact wear measurement',
          'Vacuum interrupter condition check',
          'Motor drive mechanism lubrication',
          'Transition resistor verification',
          'Diverter compartment flushing',
          'MR, Huaming & ABB specialists'
        ]
      },
      {
        icon: 'Switchgear',
        title: 'Gasket & Leak Remediation',
        desc: 'Complete resealing of radiator flanges, bushing turrets, and manhole covers with high-temperature Viton and NBR seals.',
        bullets: [
          'High-grade Viton / NBR gaskets',
          'Radiator flange seal replacement',
          'Bushing turret gasket rejuvenation',
          'Calibrated torque tightening',
          'Active valve gland repacking',
          'Guaranteed leak-free handover'
        ]
      },
      {
        icon: 'Substation',
        title: 'Substation Refurbishment & Rewind',
        desc: 'Core re-tightening, coil re-winding, silica gel breather renewal, and exterior anti-corrosion repainting.',
        bullets: [
          'Core clamp torque re-tightening',
          'Coil rewinding & re-insulation',
          'Silica gel breather charge renewal',
          'Anti-corrosion C5 epoxy repainting',
          'Protection relay recalibration',
          'Adds 10–15 years operating life'
        ]
      }
    ],
    processKicker: 'MAINTENANCE PROCESS',
    processTitle: 'From Condition Survey to Renewal',
    processDesc: 'Structured maintenance workflow minimizing plant downtime while maximizing asset residual life.',
    processSteps: [
      { num: '01', title: 'Asset Condition Survey', desc: 'Infrared thermography, acoustic sound survey, and baseline oil DGA sample extraction.' },
      { num: '02', title: 'Shutdown & Isolation', desc: 'Lock-out / Tag-out (LOTO) protocols, earthing connections, and safety area barricading.' },
      { num: '03', title: 'High-Vacuum Filtration', desc: 'Continuous oil processing through two-stage vacuum chamber to extract moisture and gas.' },
      { num: '04', title: 'OLTC & Contact Overhaul', desc: 'Inspection of diverter contacts, motor mechanism servicing, and transition resistor tests.' },
      { num: '05', title: 'Gasket & Seal Replacement', desc: 'Removal of aged cork seals and installation of oil-resistant Viton gaskets.' },
      { num: '06', title: 'Post-Maintenance Testing', desc: 'Dielectric breakdown verification, insulation check, and supervised return to service.' }
    ],
    customCard: {
      title: 'Proactive Asset Preservation',
      desc: 'Scheduled preventive maintenance and online oil conditioning cost less than 5% of replacement while avoiding unplanned downtime.',
      bullets: [
        'Extends transformer operating life by 10 to 15 years',
        'Mobile oil filtration trailers capable of on-site processing',
        'Infrared thermographic hot-spot detection during operation',
        'Factory-trained specialists for MR, Huaming, and ABB tap changers'
      ],
      linkText: 'Schedule Maintenance Audit'
    },
    deliveryCard: {
      title: 'Field Capacity Benchmarks',
      desc: 'Mobile fleets equipped to handle complete substation maintenance shutdowns within tight turnaround windows.',
      metrics: [
        { val: '6,000 L/h', lbl: 'Vacuum Filtration Rate' },
        { val: '< 5 ppm', lbl: 'Residual Moisture Guarantee' },
        { val: '+15 Yrs', lbl: 'Asset Life Extension' },
        { val: '24/7', lbl: 'Emergency Support Hotline' }
      ],
      linkText: 'Request Maintenance Quote'
    },
    ctaTitle: 'Need Transformer Maintenance or Oil Filtration?',
    ctaDesc: 'Our mobile maintenance engineering team deploys nationwide to inspect, filter oil, and overhaul your substation transformers.'
  }
};

export default async function ServicePage({ params }) {
  const resolved = await params;
  const s = find(resolved?.slug);
  if (!s) notFound();

  const allServices = SERVICES;
  const data = SERVICE_PAGE_DATA[s.slug] || SERVICE_PAGE_DATA['equipment-supply'];

  return (
    <>
      {/* 1. Hero with Emirates Transformer Style Pills, Bold Heading & CTAs */}
      <PageHero
        crumbs={[{ label: 'Services', href: '/services/' }, { label: s.title }]}
        label={s.badge || 'OEM ELECTRICAL SERVICES'}
        title={data.heroTitle || s.title}
        desc={data.heroSubtitle || s.short}
        image={s.image}
      >
        <a className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
          Request Specification Quote <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Tech Desk</span>
        </a>
        <a className="btn btn--ghost" href="/services/">
          All Services
        </a>
      </PageHero>

      {/* 2. Executive Capability & Facility Overview (Image Left, Text Right) */}
      <section className={styles.etsLeadSec} aria-label="Executive Service Overview">
        <div className="wrap">
          <div className={styles.etsLeadGrid}>
            {/* Left Column: Image with Facility Badge */}
            <div className={`${styles.etsLeadMedia} fade-in-left`}>
              <img
                src={s.gallery?.[0] || s.image}
                alt={`${s.title} — Engineering & Execution Facility`}
                loading="lazy"
                decoding="async"
              />
              <span className={styles.etsLeadMediaBadge}>
                <span className={styles.etsLeadMediaDot} aria-hidden="true" />
                <span>{s.badge || 'Field & Factory View'}</span>
              </span>
            </div>

            {/* Right Column: Text & Engineering Authority */}
            <div className={`${styles.etsLeadContent} fade-in-right`}>
              <span className="label">ENGINEERING AUTHORITY &amp; CAPACITY</span>
              <h2>Turnkey Accountability From Design to Handover</h2>
              <div className={styles.etsLeadBox}>
                <p>{data.introLead || s.intro}</p>
              </div>

              <ul className={styles.etsLeadTrustList}>
                <li className={styles.etsLeadTrustItem}>
                  <Icons.ShieldCheck />
                  <span>Utility Pre-Approved &amp; Certified to IEC / IEEE Standards</span>
                </li>
                <li className={styles.etsLeadTrustItem}>
                  <Icons.ShieldCheck />
                  <span>Direct Access to Practicing High-Voltage Substation Engineers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Complete Equipment / Service Portfolio (2x2 Grid with 6-Bullet Grids) */}
      <section className="sec" aria-label="Service portfolio and scope">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">{data.portfolioKicker}</p>
            <h2>{data.portfolioTitle}</h2>
            <p className="sec-head__desc">{data.portfolioDesc}</p>
          </header>

          <div className={styles.etsPortfolioGrid}>
            {data.portfolioCards.map((card, idx) => {
              const IconComp = Icons[card.icon] || Icons.Package;
              return (
                <div key={idx} className={`${styles.etsPcard} fade-in-up`} data-delay={idx * 80}>
                  <div className={styles.etsPcardHead}>
                    <div className={styles.etsPcardIcon}>
                      <IconComp />
                    </div>
                    <div className={styles.etsPcardHeaderText}>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </div>

                  <ul className={styles.etsPcardBullets}>
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className={styles.etsPcardBulletItem}>
                        <span className={styles.etsPcardBulletDot} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Disciplined Step-by-Step Lifecycle (6-Step Timeline Process) */}
      <section className="sec sec--alt" aria-label="Step-by-step process">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">{data.processKicker}</p>
            <h2>{data.processTitle}</h2>
            <p className="sec-head__desc">{data.processDesc}</p>
          </header>

          <div className={styles.etsStepsGrid}>
            {data.processSteps.map((step, idx) => {
              const stepIcons = [Icons.FileCheck, Icons.Cpu, Icons.Factory, Icons.ClipboardCheck, Icons.Gauge, Icons.Truck];
              const StepIcon = stepIcons[idx % stepIcons.length];
              return (
                <div key={idx} className={`${styles.etsStepCard} fade-in-up`} data-delay={idx * 60}>
                  <span className={styles.etsStepCardNum}>{step.num}</span>
                  <div className={styles.etsStepCardIcon}>
                    <StepIcon />
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Two Differentiators: Custom Engineering & Delivery / Logistics */}
      <section className="sec" aria-label="Engineering differentiators">
        <div className="wrap">
          <div className={styles.etsDiffGrid}>
            {/* Left Card: Dark Card for Custom Engineering Rigor */}
            <div className={`${styles.etsDiffCard} ${styles.etsDiffCardDark} fade-in-up`}>
              <div style={{ marginBottom: '1.25rem', color: '#E09F3E' }}>
                <Icons.Cog />
              </div>
              <h3>{data.customCard.title}</h3>
              <p className={styles.etsDiffDesc}>{data.customCard.desc}</p>

              <ul className={styles.etsDiffBullets}>
                {data.customCard.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.etsDiffBullet}>
                    <Icons.ShieldCheck />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.etsDiffAction}>
                <a className={styles.etsDiffLink} href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                  {data.customCard.linkText} <ArrowRight />
                </a>
              </div>
            </div>

            {/* Right Card: Light Card with 4-KPI Metric Grid */}
            <div className={`${styles.etsDiffCard} ${styles.etsDiffCardLight} fade-in-up`} data-delay="100">
              <div style={{ marginBottom: '1.25rem', color: 'var(--primary)' }}>
                <Icons.Clock />
              </div>
              <h3>{data.deliveryCard.title}</h3>
              <p className={styles.etsDiffDesc}>{data.deliveryCard.desc}</p>

              <div className={styles.etsMetricGrid}>
                {data.deliveryCard.metrics.map((m, idx) => (
                  <div key={idx} className={styles.etsMetricItem}>
                    <div className={styles.etsMetricItemVal}>{m.val}</div>
                    <div className={styles.etsMetricItemLbl}>{m.lbl}</div>
                  </div>
                ))}
              </div>

              <div className={styles.etsDiffAction}>
                <a className={styles.etsDiffLink} href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                  {data.deliveryCard.linkText} <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Technical Specifications & Official Handover Dossier */}
      {s.specs && (
        <section className="sec sec--alt" aria-label="Technical specifications and deliverables">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">TECHNICAL PARAMETERS &amp; DELIVERABLES</p>
              <h2>Operating Specifications &amp; Handover Package</h2>
            </header>

            <div className={styles.serviceSpecsWrap}>
              {/* Spec Table */}
              <div className={`${styles.serviceSpecsCard} fade-in-up`}>
                <div className={styles.serviceSpecsCardHead}>
                  <Icons.Gauge />
                  <h3>Key Technical Parameters</h3>
                </div>
                <table className={styles.serviceSpecTable}>
                  <tbody>
                    {s.specs.map(item => (
                      <tr key={item.label}>
                        <th scope="row">{item.label}</th>
                        <td>{item.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Documentation Deliverables Dossier */}
              {s.deliverables && (
                <div className={`${styles.serviceDeliverablesCard} fade-in-up`} data-delay="100">
                  <div className={styles.serviceDelivHead}>
                    <div className={styles.serviceDelivBadge}>
                      <Icons.FileCheck />
                      <span>OFFICIAL DOSSIER</span>
                    </div>
                    <h3>Certified Project Deliverables</h3>
                    <p>Every service contract includes a formal, signed engineering handover dossier:</p>
                  </div>

                  <ul className={styles.serviceDelivList}>
                    {s.deliverables.map((doc, idx) => (
                      <li key={idx}>
                        <Icons.ShieldCheck />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.serviceDelivFooter}>
                    <a className="btn btn--primary btn--sm" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                      Request Technical Proposal <ArrowRight />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 7. Signature High-Impact Ready to Specify CTA Banner */}
      <section className="sec" aria-label="Ready to specify CTA">
        <div className="wrap">
          <div className={`${styles.etsCtaCard} fade-in-up`}>
            <div className={styles.etsCtaCardContent}>
              <h2>{data.ctaTitle}</h2>
              <p>{data.ctaDesc}</p>
            </div>
            <div className={styles.etsCtaCardActions}>
              <a className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                Request a Quote <ArrowRight />
              </a>
              <a className="btn btn--ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} href={waLink()} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Service-Specific Frequently Asked Questions */}
      {s.faqs && (
        <section className="sec sec--alt" aria-label="Service technical inquiries">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">FREQUENTLY ASKED QUESTIONS</p>
              <h2>Common Technical Inquiries About {s.title}</h2>
              <p className="sec-head__desc">
                Direct answers to questions regarding test witnessing, turnaround lead times, and site procedures.
              </p>
            </header>

            <ServiceFaq faqs={s.faqs} />
          </div>
        </section>
      )}

      {/* 9. More Services Navigation */}
      <section className="sec" aria-label="Other services">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MORE SERVICES</p>
            <h2>Combine Services into One Turnkey Solution</h2>
            <p className="sec-head__desc">
              Explore complementary electrical engineering services to streamline project execution.
            </p>
          </header>
          <div className="services-more-grid">
            {allServices.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/services/${o.slug}/`}
                image={o.image}
                title={o.title}
                text={o.short}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
