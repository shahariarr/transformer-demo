/* Partner + certification logos (inline SVG markup) */
export const PARTNERS = [
  /* ─── Certification & Accreditation marks ─────────────────────── */
  {
    name: 'UL', color: '#CC0000',
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="53" stroke="currentColor" stroke-width="7"/>
      <text x="60" y="83" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="currentColor">UL</text>
      <circle cx="107" cy="16" r="11" fill="currentColor"/>
      <text x="107" y="20.5" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="900" fill="white">R</text>
    </svg>`
  },
  {
    name: 'IAF', color: '#00308F',
    svg: `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="56" r="52" stroke="currentColor" stroke-width="5"/>
      <circle cx="56" cy="56" r="41" stroke="currentColor" stroke-width="2" opacity="0.35"/>
      <text x="56" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="currentColor">INTERNATIONAL</text>
      <text x="56" y="64" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="26" font-weight="900" fill="currentColor">IAF</text>
      <text x="56" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" fill="currentColor">ACCREDITATION</text>
      <text x="56" y="91" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" fill="currentColor">FORUM</text>
    </svg>`
  },
  {
    name: 'ILAC MRA', color: '#00308F',
    svg: `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="56" r="52" stroke="currentColor" stroke-width="4"/>
      <!-- concentric arcs from top-left emanating rightward -->
      <path d="M24 88 A45 45 0 0 1 88 24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <path d="M30 88 A35 35 0 0 1 88 30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 88 A24 24 0 0 1 88 38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M48 88 A14 14 0 0 1 88 48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <text x="56" y="104" text-anchor="middle" font-family="Arial,sans-serif" font-size="0" fill="currentColor"/>
      <text x="20" y="60" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor" transform="rotate(-45 20 60)">ilac</text>
      <text x="66" y="100" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor">MRA</text>
    </svg>`
  },
  {
    name: 'CCC', color: '#1a1a1a',
    svg: `<svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="55" rx="60" ry="50" stroke="currentColor" stroke-width="6"/>
      <text x="65" y="77" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="54" font-weight="900" fill="currentColor">CCC</text>
    </svg>`
  },
  {
    name: 'MA', color: '#CC0000',
    svg: `<svg viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="45" rx="58" ry="37" stroke="currentColor" stroke-width="7"/>
      <text x="65" y="64" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="currentColor">MA</text>
    </svg>`
  },
  {
    name: 'CNAS', color: '#003087',
    svg: `<svg viewBox="0 0 130 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- circular arrow -->
      <path d="M18 58 A48 48 0 1 1 96 96" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
      <polygon points="88,108 98,90 112,104" fill="currentColor"/>
      <text x="65" y="66" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="30" font-weight="900" fill="currentColor">CNAS</text>
    </svg>`
  },
  {
    name: 'CHINT', color: '#003087',
    svg: `<svg viewBox="0 0 185 65" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">CH</text>
      <text x="108" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="#CC0000">I</text>
      <text x="124" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">NT</text>
    </svg>`
  },
  /* ─── Partner Companies ────────────────────────────────────────── */
  {
    name: 'ABB', color: '#FF0000',
    svg: `<svg viewBox="0 0 115 65" xmlns="http://www.w3.org/2000/svg">
      <text x="58" y="54" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="56" font-weight="900" fill="currentColor">ABB</text>
    </svg>`
  },
  {
    name: 'Schneider Electric', color: '#3DCD58',
    svg: `<svg viewBox="0 0 230 68" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="11" height="34" rx="2" fill="currentColor"/>
      <text x="22" y="38" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="currentColor">Schneider</text>
      <text x="22" y="60" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="500" font-style="italic" fill="currentColor">Electric</text>
    </svg>`
  },
  {
    name: 'Siemens', color: '#009999',
    svg: `<svg viewBox="0 0 195 55" xmlns="http://www.w3.org/2000/svg">
      <text x="97" y="43" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="31" font-weight="800" letter-spacing="3" fill="currentColor">SIEMENS</text>
    </svg>`
  },
  {
    name: 'ISO', color: '#CC0000',
    svg: `<svg viewBox="0 0 126 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="124" height="78" rx="6" fill="currentColor"/>
      <text x="63" y="57" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="white">ISO</text>
    </svg>`
  },
  {
    name: 'State Grid China', color: '#006633',
    svg: `<svg viewBox="0 0 200 85" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="42" r="33" stroke="currentColor" stroke-width="4" fill="none"/>
      <ellipse cx="38" cy="42" rx="17" ry="33" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <line x1="5" y1="42" x2="71" y2="42" stroke="currentColor" stroke-width="2.5"/>
      <line x1="8" y1="24" x2="68" y2="24" stroke="currentColor" stroke-width="1.5"/>
      <line x1="8" y1="60" x2="68" y2="60" stroke="currentColor" stroke-width="1.5"/>
      <text x="82" y="32" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">STATE GRID</text>
      <text x="82" y="48" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CORPORATION</text>
      <text x="82" y="64" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">OF CHINA</text>
    </svg>`
  },
  {
    name: 'China Southern Power Grid', color: '#003087',
    svg: `<svg viewBox="0 0 210 82" xmlns="http://www.w3.org/2000/svg">
      <!-- Three power lines (≡ style mark) -->
      <line x1="4" y1="20" x2="48" y2="20" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="38" x2="58" y2="38" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="56" x2="36" y2="56" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <text x="68" y="34" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CHINA SOUTHERN</text>
      <text x="68" y="52" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">POWER GRID</text>
    </svg>`
  },
  {
    name: 'ASTA (Intertek)', color: '#003B70',
    svg: `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="152" height="54" rx="6" stroke="currentColor" stroke-width="4" fill="none"/>
      <text x="80" y="46" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="34" font-weight="900" letter-spacing="3" fill="currentColor">ASTA</text>
    </svg>`
  },
  {
    name: 'CESI / KEMA', color: '#004B87',
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="26" stroke="currentColor" stroke-width="4.5" fill="none"/>
      <path d="M22 35h26M35 22v26" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <text x="72" y="34" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="currentColor">CESI</text>
      <text x="72" y="54" font-family="Arial,sans-serif" font-size="16" font-weight="800" letter-spacing="1.5" fill="currentColor">KEMA</text>
    </svg>`
  },
  {
    name: 'ETS Dubai', color: '#0B5CAB',
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="48" height="48" rx="6" fill="currentColor"/>
      <path d="M14 22h28M14 34h20M14 46h28" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <text x="62" y="38" font-family="Arial Black,sans-serif" font-size="26" font-weight="900" fill="currentColor">ETS</text>
      <text x="62" y="53" font-family="Arial,sans-serif" font-size="10" font-weight="800" letter-spacing="1" fill="#E65100">DUBAI · 1987</text>
    </svg>`
  }
];

export const PARTNER_CATEGORIES = [
  { id: 'all', label: 'All Alliances', count: 18 },
  { id: 'technology', label: 'Technology & Switchgear OEMs', count: 6 },
  { id: 'testing', label: 'Accredited Testing & Labs', count: 5 },
  { id: 'utility', label: 'Utility Grids & End-Users', count: 3 },
  { id: 'materials', label: 'Core Materials & Dielectrics', count: 4 }
];

export const ALL_PARTNERS = [
  /* ── 1. Technology & Switchgear OEMs ── */
  {
    id: 'abb',
    name: 'ABB (Asea Brown Boveri)',
    category: 'technology',
    origin: 'Zurich, Switzerland',
    allianceType: 'Global Technology & Switchgear OEM',
    standard: 'IEC 62271-100 / IEC 60255',
    color: '#FF0000',
    summary: 'Strategic integration partner for medium-voltage vacuum circuit breakers (VCB), numerical feeder protection relays, and smart substation communication architecture.',
    scopes: [
      'Vacuum Circuit Breaker (VCB) mechanisms rated 11kV–33kV',
      'Relion numerical protection & feeder automation relays',
      'Factory testing & SCADA communication interface integration'
    ],
    svg: `<svg viewBox="0 0 115 65" xmlns="http://www.w3.org/2000/svg">
      <text x="58" y="54" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="56" font-weight="900" fill="currentColor">ABB</text>
    </svg>`
  },
  {
    id: 'siemens',
    name: 'Siemens Energy',
    category: 'technology',
    origin: 'Munich, Germany',
    allianceType: 'Switchgear & High-Voltage Systems',
    standard: 'IEC 61850 / IEEE C37',
    color: '#009999',
    summary: 'Collaborative supplier of vacuum interrupters, gas-insulated switchgear (GIS) components, and SIPROTEC telemetry for utility and heavy industrial installations.',
    scopes: [
      'SIPROTEC 5 modular numerical protection & bay controllers',
      'Vacuum interrupter assemblies for extreme short-circuit ratings',
      'IEC 61850 grid substation automation compliance'
    ],
    svg: `<svg viewBox="0 0 195 55" xmlns="http://www.w3.org/2000/svg">
      <text x="97" y="43" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="31" font-weight="800" letter-spacing="3" fill="currentColor">SIEMENS</text>
    </svg>`
  },
  {
    id: 'schneider',
    name: 'Schneider Electric',
    category: 'technology',
    origin: 'Rueil-Malmaison, France',
    allianceType: 'Medium Voltage Distribution',
    standard: 'IEC 62271-200 / ISO 9001',
    color: '#3DCD58',
    summary: 'Technological synergy for medium-voltage switchgear architecture, Sepam digital relays, and intelligent thermal sensors for substation transformers.',
    scopes: [
      'SM6 & MCset medium-voltage modular switchboard integration',
      'Sepam / Easergy protection & arc flash mitigation modules',
      'EcoStruxure IoT asset health monitoring interfaces'
    ],
    svg: `<svg viewBox="0 0 230 68" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="11" height="34" rx="2" fill="currentColor"/>
      <text x="22" y="38" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="currentColor">Schneider</text>
      <text x="22" y="60" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="500" font-style="italic" fill="currentColor">Electric</text>
    </svg>`
  },
  {
    id: 'chint',
    name: 'CHINT Global',
    category: 'technology',
    origin: 'Shanghai, China',
    allianceType: 'Switchgear & Componentry Partner',
    standard: 'IEC 60947 / CE / CCC',
    color: '#003087',
    summary: 'Certified OEM partner for low and medium voltage switchgear components, molded case breakers, air circuit breakers (ACB), and auxiliary monitoring units.',
    scopes: [
      'Air Circuit Breakers (ACB) up to 6300A with intelligent trip units',
      'High-end modular contactors and motor protection circuits',
      'Compact sub-distribution boards for transformer auxiliary power'
    ],
    svg: `<svg viewBox="0 0 185 65" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">CH</text>
      <text x="108" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="#CC0000">I</text>
      <text x="124" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">NT</text>
    </svg>`
  },
  {
    id: 'state-grid',
    name: 'State Grid Corporation of China',
    category: 'technology',
    origin: 'Beijing, China',
    allianceType: 'Utility Grid Standard Alignment',
    standard: 'DL/T Technical Specification',
    color: '#006633',
    summary: 'Technical design exchange and engineering standard alignment for high-capacity bulk power distribution, ultra-low core loss criteria, and severe load cycling.',
    scopes: [
      'High-voltage distribution transformer design specifications',
      'Severe thermal cycling & short-circuit mechanical parameters',
      'Asset health and remote transformer diagnostic metrics'
    ],
    svg: `<svg viewBox="0 0 200 85" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="42" r="33" stroke="currentColor" stroke-width="4" fill="none"/>
      <ellipse cx="38" cy="42" rx="17" ry="33" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <line x1="5" y1="42" x2="71" y2="42" stroke="currentColor" stroke-width="2.5"/>
      <text x="82" y="32" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">STATE GRID</text>
      <text x="82" y="48" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CORPORATION</text>
      <text x="82" y="64" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">OF CHINA</text>
    </svg>`
  },
  {
    id: 'csg',
    name: 'China Southern Power Grid',
    category: 'technology',
    origin: 'Guangzhou, China',
    allianceType: 'Grid Distribution Technology Exchange',
    standard: 'IEC & CSG Distribution Codes',
    color: '#003087',
    summary: 'Engineering cooperation in high-humidity, coastal tropical distribution environments, low-noise acoustic enclosures, and high-efficiency core geometry.',
    scopes: [
      'Tropicalized insulation systems resistant to salt-fog corrosion',
      'Acoustic decibel suppression for high-density urban substations',
      'Grid telemetry protocols and automated tap-changer monitoring'
    ],
    svg: `<svg viewBox="0 0 210 82" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="20" x2="48" y2="20" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="38" x2="58" y2="38" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="56" x2="36" y2="56" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <text x="68" y="34" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CHINA SOUTHERN</text>
      <text x="68" y="52" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">POWER GRID</text>
    </svg>`
  },

  /* ── 2. Accredited Testing & Certification Labs ── */
  {
    id: 'asta',
    name: 'ASTA (Intertek UK)',
    category: 'testing',
    origin: 'London, United Kingdom',
    allianceType: 'Type Test Certification & STL Witness',
    standard: 'UKAS ISO/IEC 17025 Accredited',
    color: '#003B70',
    summary: 'World-renowned British certification body validating dynamic short-circuit withstand, temperature rise limits, and lightning impulse dielectric strength on BPEL transformer models.',
    scopes: [
      'ASTA Type Test Certificates for 11kV & 33kV distribution units',
      'Dynamic short-circuit withstand verification under fault conditions',
      'Independent witness inspections for export-bound equipment'
    ],
    svg: `<svg viewBox="0 0 160 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="152" height="54" rx="6" stroke="currentColor" stroke-width="4" fill="none"/>
      <text x="80" y="46" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="34" font-weight="900" letter-spacing="3" fill="currentColor">ASTA</text>
    </svg>`
  },
  {
    id: 'cesi-kema',
    name: 'CESI / KEMA Laboratories',
    category: 'testing',
    origin: 'Milan (Italy) & Arnhem (Netherlands)',
    allianceType: 'High-Power STL Laboratory Witnessing',
    standard: 'STL (Short-Circuit Testing Liaison)',
    color: '#004B87',
    summary: 'Premier global high-voltage and high-power test laboratories conducting full short-circuit verification, impulse withstand, and partial discharge audits on custom power transformers.',
    scopes: [
      'Short-circuit dynamic mechanical force verification at full fault MVA',
      'Lightning impulse withstand testing up to 200kV BIL',
      'Third-party accredited witness test reports accepted globally'
    ],
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="26" stroke="currentColor" stroke-width="4.5" fill="none"/>
      <path d="M22 35h26M35 22v26" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <text x="72" y="34" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="currentColor">CESI</text>
      <text x="72" y="54" font-family="Arial,sans-serif" font-size="16" font-weight="800" letter-spacing="1.5" fill="currentColor">KEMA</text>
    </svg>`
  },
  {
    id: 'ul',
    name: 'UL (Underwriters Laboratories)',
    category: 'testing',
    origin: 'Northbrook, Illinois, USA',
    allianceType: 'Global Safety & Standard Certification',
    standard: 'UL 1561 / UL 1562 / IEEE C57',
    color: '#CC0000',
    summary: 'Recognized global safety authority auditing electrical insulation flammability, thermal classifications, and component-level adherence for North American and international projects.',
    scopes: [
      'Dielectric insulation thermal endurance class verification',
      'Fire-safe design validation for indoor & enclosed substations',
      'Traceable component certification across production runs'
    ],
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="53" stroke="currentColor" stroke-width="7"/>
      <text x="60" y="83" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="currentColor">UL</text>
      <circle cx="107" cy="16" r="11" fill="currentColor"/>
      <text x="107" y="20.5" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="900" fill="white">R</text>
    </svg>`
  },
  {
    id: 'ilac-iaf',
    name: 'IAF & ILAC MRA',
    category: 'testing',
    origin: 'Global Accreditation Authorities',
    allianceType: 'Mutual Recognition Arrangements (MRA)',
    standard: 'ISO/IEC 17025 / ISO/IEC 17021',
    color: '#00308F',
    summary: 'International accreditation frameworks guaranteeing that BPEL laboratory calibration certificates, FAT test results, and ISO quality management are recognized worldwide.',
    scopes: [
      'Mutual recognition of test reports across 100+ member nations',
      'Calibrated factory test bench conformity per ISO/IEC 17025',
      'Zero redundant testing requirements for international tenders'
    ],
    svg: `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="56" r="52" stroke="currentColor" stroke-width="4"/>
      <path d="M24 88 A45 45 0 0 1 88 24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <path d="M30 88 A35 35 0 0 1 88 30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <text x="20" y="60" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor" transform="rotate(-45 20 60)">ilac</text>
      <text x="66" y="100" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor">MRA</text>
    </svg>`
  },
  {
    id: 'cnas',
    name: 'CNAS (China National Accreditation)',
    category: 'testing',
    origin: 'Beijing, China',
    allianceType: 'National Test Lab Accreditation',
    standard: 'ISO/IEC 17025 Certified',
    color: '#003087',
    summary: 'Official laboratory accreditation body certifying transformer acoustic noise levels, dielectric oil breakdown testing, and high-precision loss measurement systems.',
    scopes: [
      'Comprehensive no-load and load loss verification benches',
      'Induced overvoltage and separate source AC withstand testing',
      'Partial discharge measurement below 10 pC thresholds'
    ],
    svg: `<svg viewBox="0 0 130 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 58 A48 48 0 1 1 96 96" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
      <polygon points="88,108 98,90 112,104" fill="currentColor"/>
      <text x="65" y="66" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="30" font-weight="900" fill="currentColor">CNAS</text>
    </svg>`
  },

  /* ── 3. Utility Grids & End-Users ── */
  {
    id: 'ets-dubai',
    name: 'Emirates Transformer & Switchgear (ETS)',
    category: 'utility',
    origin: 'Dubai, United Arab Emirates',
    allianceType: 'Strategic Manufacturing JV & Middle East Partner',
    standard: 'DEWA, ADNOC, ARAMCO Pre-Approved',
    color: '#0B5CAB',
    summary: 'Dubai\'s premier transformer manufacturer since 1987. Four advanced manufacturing plants across the UAE and Europe delivering world-class power units to Middle East utilities.',
    scopes: [
      'Over 35 years manufacturing heritage in extreme desert ambient (+55°C)',
      'Pre-approved vendor for DEWA, ADNOC, Saudi ARAMCO, and TRANSCO',
      'Joint engineering excellence & high-capacity oil-immersed transformer production'
    ],
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="10" width="48" height="48" rx="6" fill="currentColor"/>
      <path d="M14 22h28M14 34h20M14 46h28" stroke="white" stroke-width="4" stroke-linecap="round"/>
      <text x="62" y="38" font-family="Arial Black,sans-serif" font-size="26" font-weight="900" fill="currentColor">ETS</text>
      <text x="62" y="53" font-family="Arial,sans-serif" font-size="10" font-weight="800" letter-spacing="1" fill="#E65100">DUBAI · 1987</text>
    </svg>`
  },
  {
    id: 'bpdb',
    name: 'Bangladesh Power Development Board (BPDB)',
    category: 'utility',
    origin: 'Dhaka, Bangladesh',
    allianceType: 'National Power Utility Pre-Approval',
    standard: 'BPDB Standard Specifications',
    color: '#006A4E',
    summary: 'The apex statutory body for national power generation and transmission. BPEL distribution transformers and turnkey substations are approved for national grid infrastructure.',
    scopes: [
      'Turnkey 33/11kV grid substation supply and commissioning',
      'Rigorous Factory Acceptance Testing (FAT) witnessed by board inspectors',
      'Thousands of operating distribution transformers across zonal divisions'
    ],
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="35" r="26" stroke="currentColor" stroke-width="4" fill="none"/>
      <path d="M36 17v12l10 6-10 6v12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="74" y="36" font-family="Arial Black,sans-serif" font-size="22" font-weight="900" fill="currentColor">BPDB</text>
      <text x="74" y="52" font-family="Arial,sans-serif" font-size="10" font-weight="800" letter-spacing="1.5" fill="#006A4E">POWER GRID</text>
    </svg>`
  },
  {
    id: 'desco-dpdc',
    name: 'DESCO & DPDC Metropolitan Utilities',
    category: 'utility',
    origin: 'Dhaka, Bangladesh',
    allianceType: 'Metropolitan Urban Grid Authority',
    standard: 'Urban Distribution Standards',
    color: '#00838F',
    summary: 'Dhaka Electric Supply Company & Dhaka Power Distribution Company powering the capital\'s commercial towers, government secretariats, and industrial zones with BPEL equipment.',
    scopes: [
      'Compact indoor substations designed for dense urban footprints',
      'Hermetically sealed corrugated tank distribution units',
      'Rapid turnaround emergency support and planned maintenance contracts'
    ],
    svg: `<svg viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="42" height="42" rx="6" stroke="currentColor" stroke-width="4" fill="none"/>
      <circle cx="27" cy="35" r="9" fill="currentColor"/>
      <text x="58" y="36" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="currentColor">DESCO</text>
      <text x="58" y="52" font-family="Arial,sans-serif" font-size="12" font-weight="800" letter-spacing="2" fill="#00838F">&amp; DPDC</text>
    </svg>`
  },

  /* ── 4. Premium Core Materials & Dielectric Fluids ── */
  {
    id: 'nippon-steel',
    name: 'Nippon Steel / JFE Steel',
    category: 'materials',
    origin: 'Tokyo, Japan',
    allianceType: 'CRGO Magnetic Core Material Supplier',
    standard: 'JIS C 2553 / IEC 60404-8-7',
    color: '#002D62',
    summary: 'The world\'s highest grade laser-scribed Grain-Oriented Electrical Steel (CRGO). Guarantees ultra-low no-load core losses, minimal magnetostriction, and whisper-quiet decibel levels.',
    scopes: [
      'High magnetic permeability laser-scribed grade (Hi-B M-Grade) steel',
      'Full mill test certificates and eddy current loss guarantees per batch',
      'Precision multi-step step-lap miter core stacking at BPEL plant'
    ],
    svg: `<svg viewBox="0 0 190 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="16" width="38" height="38" rx="4" fill="currentColor"/>
      <path d="M12 44L23 26l11 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="50" y="34" font-family="Arial Black,sans-serif" font-size="16" font-weight="900" fill="currentColor">NIPPON STEEL</text>
      <text x="50" y="50" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="1" fill="#757575">&amp; JFE STEEL</text>
    </svg>`
  },
  {
    id: 'nynas',
    name: 'Nynas AB',
    category: 'materials',
    origin: 'Stockholm, Sweden',
    allianceType: 'Naphthenic Insulating Mineral Oil',
    standard: 'IEC 60296 Type A / ASTM D3487',
    color: '#005596',
    summary: 'Swedish specialty naphthenic transformer oil offering exceptional low-temperature fluidity, superior dielectric breakdown (>70 kV), and high oxidation stability over decades.',
    scopes: [
      'Nytro 4000X / Taurus premium uninhibited and inhibited grades',
      'Zero corrosive sulfur content protecting copper windings',
      'Fast thermal convection for optimal transformer cooling efficiency'
    ],
    svg: `<svg viewBox="0 0 170 70" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 48 C 18 20, 36 20, 44 48 C 36 56, 18 56, 10 48 Z" fill="currentColor"/>
      <circle cx="27" cy="24" r="5" fill="#E65100"/>
      <text x="56" y="44" font-family="Arial Black,Impact,sans-serif" font-size="28" font-weight="900" fill="currentColor">NYNAS</text>
    </svg>`
  },
  {
    id: 'cargill-fr3',
    name: 'Cargill Envirotemp FR3',
    category: 'materials',
    origin: 'Wayzata, Minnesota, USA',
    allianceType: 'Natural Ester Bio-Dielectric Fluid',
    standard: 'IEC 62770 / IEEE C57.147',
    color: '#007A3D',
    summary: '100% renewable vegetable oil-based dielectric fluid with a K-class fire point (>360°C). Extends paper insulation life by up to 2x while delivering total environmental biodegradability.',
    scopes: [
      'K-Class fire safety eliminates expensive fire barriers and deluges',
      'Moisture-extracting chemistry doubles solid insulation paper longevity',
      '100% readily biodegradable, ideal for eco-sensitive substations'
    ],
    svg: `<svg viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="28" cy="35" rx="20" ry="22" fill="currentColor"/>
      <path d="M28 17 C 32 25, 42 35, 28 50 C 22 40, 20 30, 28 17 Z" fill="#7CB342"/>
      <text x="58" y="34" font-family="Arial Black,sans-serif" font-size="18" font-weight="900" fill="currentColor">Cargill</text>
      <text x="58" y="52" font-family="Arial,sans-serif" font-size="14" font-weight="800" fill="#007A3D">Envirotemp FR3</text>
    </svg>`
  },
  {
    id: 'weidmann',
    name: 'Weidmann Electrical Technology',
    category: 'materials',
    origin: 'Rapperswil-Jona, Switzerland',
    allianceType: 'High-Density Transformer Pressboard',
    standard: 'IEC 60641 / ISO 9001',
    color: '#E30613',
    summary: 'The global benchmark for transformer solid insulation. 100% pure unbleached kraft cellulose providing maximum mechanical withstand against destructive electromagnetic short-circuit forces.',
    scopes: [
      'Transformerboard TIV & TX cylinders, spacers, and phase barriers',
      'Exceptional mechanical compression strength under radial shock loads',
      'High dielectric strength and zero risk of metallic particle contamination'
    ],
    svg: `<svg viewBox="0 0 190 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="40" height="40" rx="4" fill="#E30613"/>
      <path d="M12 24l5 20 5-16 5 16 5-20" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="52" y="36" font-family="Arial Black,sans-serif" font-size="18" font-weight="900" fill="currentColor">WEIDMANN</text>
      <text x="52" y="50" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing="1" fill="#757575">ELECTRICAL TECH</text>
    </svg>`
  }
];

export const PARTNERSHIP_PILLARS = [
  {
    title: '100% Traceable Tier-1 Componentry',
    label: 'INTEGRITY FROM THE CORE',
    desc: 'We never compromise on substandard copper, uncertified steel, or reclaimed dielectric oil. Every batch of CRGO laminations, tap changers, and bushings arrives with verifiable mill test certificates and full chemical/physical traceability.',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline>'
  },
  {
    title: 'Independent STL Laboratory Witnessing',
    label: 'VERIFIED UNDER EXTREME FAULT',
    desc: 'BPEL transformers undergo rigorous short-circuit withstand, temperature rise, and BIL lightning impulse tests witnessed and certified by internationally accredited bodies including ASTA (UK), CESI (Italy), and KEMA (Netherlands).',
    icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>'
  },
  {
    title: 'Open-Door FAT & Client Inspection',
    label: 'COMPLETE FACTORY TRANSPARENCY',
    desc: 'Client engineering teams and independent third-party inspection agencies (SGS, Bureau Veritas, TÜV, or utility delegations) are provided unrestricted access to witness all routine and type Factory Acceptance Tests prior to dispatch.',
    icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
  }
];

export const PARTNER_STATS = [
  { target: 35, suffix: '+ Yrs', label: 'STRATEGIC ALLIANCE HERITAGE', format: false },
  { target: 45, suffix: '+', label: 'TIER-1 OEM & COMPONENT PARTNERS', format: false },
  { target: 100, suffix: '%', label: 'INDEPENDENT FAT TEST WITNESSING', format: false },
  { target: 8, suffix: '+', label: 'REGIONAL UTILITY GRID PRE-APPROVALS', format: false }
];

