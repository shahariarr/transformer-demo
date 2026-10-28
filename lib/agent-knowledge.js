/* Comprehensive BPEL Power Engineering Knowledge Base & Agent Engine */

export const BPEL_COMPANY_INFO = {
  name: 'Basic Power Engineering Ltd (BPEL)',
  established: '2008',
  tagline: 'Leading Heavy Power Transformer Manufacturer & Substation Engineering EPC in Bangladesh',
  headquarters: 'Level 11, BPEL Tower, Plot 34, Gulshan South Avenue, Gulshan-1, Dhaka 1212, Bangladesh',
  factory: 'BPEL Industrial Park, Tongi-Gazipur Highway, Gazipur, Bangladesh',
  hotline: '+880 2 988 5601',
  whatsapp: '+8801713000001',
  email: 'info@bpel-power.com',
  certifications: [
    'ISO 9001:2015 Quality Management System',
    'ISO 14001:2015 Environmental Management',
    'ISO 17025 Accredited High-Voltage Test Bay',
    'BSTI Certified Manufacturer',
    'IEC 60076 & IEEE C57 International Type Test Compliant',
    'ASTA / CESI / KEMA STL Witnessed'
  ],
  utilityApprovals: [
    'BPDB (Bangladesh Power Development Board)',
    'DESCO (Dhaka Electric Supply Company)',
    'DPDC (Dhaka Power Distribution Company)',
    'BREB (Bangladesh Rural Electrification Board / Palli Bidyut)',
    'WZPDCL (West Zone Power Distribution Company)',
    'NESCO (Northern Electricity Supply Company)'
  ]
};

// Base pricing benchmarks (in BDT / USD) for budgetary quotations & work orders
export const TRANSFORMER_PRICING = {
  '100 kVA': { minBdt: 450000, maxBdt: 580000, minUsd: 3800, maxUsd: 4900, leadWeeks: '1 - 2 Weeks' },
  '200 kVA': { minBdt: 680000, maxBdt: 850000, minUsd: 5700, maxUsd: 7100, leadWeeks: '1 - 2 Weeks' },
  '250 kVA': { minBdt: 780000, maxBdt: 960000, minUsd: 6500, maxUsd: 8000, leadWeeks: '2 - 3 Weeks' },
  '315 kVA': { minBdt: 920000, maxBdt: 1150000, minUsd: 7700, maxUsd: 9600, leadWeeks: '2 - 3 Weeks' },
  '500 kVA': { minBdt: 1350000, maxBdt: 1680000, minUsd: 11300, maxUsd: 14000, leadWeeks: '2 - 3 Weeks' },
  '630 kVA': { minBdt: 1650000, maxBdt: 1980000, minUsd: 13800, maxUsd: 16500, leadWeeks: '3 - 4 Weeks' },
  '800 kVA': { minBdt: 1950000, maxBdt: 2350000, minUsd: 16300, maxUsd: 19600, leadWeeks: '3 - 4 Weeks' },
  '1000 kVA': { minBdt: 2300000, maxBdt: 2750000, minUsd: 19200, maxUsd: 23000, leadWeeks: '3 - 4 Weeks' },
  '1250 kVA': { minBdt: 2800000, maxBdt: 3350000, minUsd: 23400, maxUsd: 28000, leadWeeks: '3 - 4 Weeks' },
  '1600 kVA': { minBdt: 3450000, maxBdt: 4100000, minUsd: 28800, maxUsd: 34200, leadWeeks: '4 - 5 Weeks' },
  '2000 kVA': { minBdt: 4200000, maxBdt: 4950000, minUsd: 35000, maxUsd: 41300, leadWeeks: '4 - 5 Weeks' },
  '2500 kVA': { minBdt: 5100000, maxBdt: 5980000, minUsd: 42500, maxUsd: 49900, leadWeeks: '4 - 6 Weeks' },
  '3150 kVA': { minBdt: 6300000, maxBdt: 7400000, minUsd: 52500, maxUsd: 61700, leadWeeks: '5 - 6 Weeks' },
  '4000 kVA': { minBdt: 7800000, maxBdt: 9100000, minUsd: 65000, maxUsd: 75900, leadWeeks: '5 - 7 Weeks' },
  '5000 kVA': { minBdt: 9500000, maxBdt: 11200000, minUsd: 79200, maxUsd: 93400, leadWeeks: '6 - 8 Weeks' },
  '6000 kVA': { minBdt: 11800000, maxBdt: 13800000, minUsd: 98400, maxUsd: 115000, leadWeeks: '6 - 8 Weeks' },
  '10000 kVA': { minBdt: 18500000, maxBdt: 22000000, minUsd: 154000, maxUsd: 183400, leadWeeks: '8 - 10 Weeks' },
  '16000 kVA': { minBdt: 32000000, maxBdt: 38000000, minUsd: 266700, maxUsd: 316700, leadWeeks: '10 - 12 Weeks' }
};

// Full Product Catalog with Real Image Assets
export const PRODUCT_CATALOG = [
  {
    name: '16000 kVA (16 MVA) Oil-Filled Power Transformer',
    slug: '16000-kva-oil-filled-transformer',
    image: '/assets/images/products/power-transformer.png',
    category: 'Oil-Immersed Power Transformers',
    capacity: '16,000 kVA (16 MVA)',
    primaryVoltage: '33 kV (Custom up to 35 kV)',
    secondaryVoltage: '11 kV / 6.6 kV / 415 V',
    cooling: 'ONAN / ONAF Dual-Stage Forced Air',
    efficiency: '99.48%',
    impedance: '7.5% - 8.0%',
    vectorGroup: 'Dyn11 / YNd11',
    description: 'Bulk utility step-down substations, solar PV grid tie-in, continuous heavy steel and cement manufacturing.',
    keyPoints: ['CRGO Laser-scribed Hi-B core', 'Dynamic short-circuit withstand tested', 'SCADA & Buchholz ready', 'BPDB & DESCO approved']
  },
  {
    name: '10000 kVA (10 MVA) Oil-Filled Power Transformer',
    slug: '10000-kva-oil-filled-transformer',
    image: '/assets/images/products/oil-immersed-transformer.png',
    category: 'Oil-Immersed Power Transformers',
    capacity: '10,000 kVA (10 MVA)',
    primaryVoltage: '33 kV / 11 kV',
    secondaryVoltage: '11 kV / 6.6 kV / 415 V',
    cooling: 'ONAN / ONAF',
    efficiency: '99.40%',
    impedance: '6.8% - 7.2%',
    vectorGroup: 'Dyn11 / YNd11',
    description: 'Municipal utility primary substations, export processing zones (EPZ), and large commercial hubs.',
    keyPoints: ['On-Load Tap Changer (OLTC) option', 'Naphthenic mineral oil or FR3 Bio-ester', 'ASTA/KEMA witnessed']
  },
  {
    name: '6000 kVA Oil-Filled Transformer',
    slug: '6000-kva-oil-filled-transformer',
    image: '/assets/images/products/distribution-transformer.png',
    category: 'Distribution Transformers',
    capacity: '6,000 kVA',
    primaryVoltage: '33 kV / 11 kV',
    secondaryVoltage: '11 kV / 415 V',
    cooling: 'ONAN / ONAF',
    efficiency: '99.35%',
    impedance: '6.5%',
    vectorGroup: 'Dyn11',
    description: 'Industrial captive power, large spinning & weaving composite textile mills, heavy chemical plants.',
    keyPoints: ['Low noise design <60 dB', 'Double corrugated radiator cooling', 'High thermal reserve']
  },
  {
    name: '5000 kVA Hermetically Sealed Transformer',
    slug: '5000-kva-oil-filled-transformer',
    image: '/assets/images/products/hermetically-sealed-transformer.png',
    category: 'Hermetically Sealed Transformers',
    capacity: '5,000 kVA',
    primaryVoltage: '33 kV / 11 kV',
    secondaryVoltage: '415 V / 400 V',
    cooling: 'ONAN',
    efficiency: '99.30%',
    impedance: '6.2%',
    vectorGroup: 'Dyn11',
    description: 'Corrugated tank without conservator, maintenance-free, sealed against atmospheric moisture.',
    keyPoints: ['No oil degradation from air exposure', 'Corrosion-resistant marine coating', 'Space-efficient']
  },
  {
    name: '4000 kVA Liquid-Filled Transformer',
    slug: '4000-kva-oil-filled-transformer',
    image: '/assets/images/products/4000kva-oil-filled-transformer.png',
    category: 'Distribution Transformers',
    capacity: '4,000 kVA',
    primaryVoltage: '11 kV / 33 kV',
    secondaryVoltage: '415 V',
    cooling: 'ONAN / ONAF',
    efficiency: '99.25%',
    impedance: '6.0%',
    vectorGroup: 'Dyn11',
    description: 'Factory power distribution, pharmaceutical complexes, food processing plants.',
    keyPoints: ['Heavy-duty low-loss design', 'Copper coils', 'Off-circuit tap changer']
  },
  {
    name: '2500 kVA Oil-Filled Distribution Transformer',
    slug: '2500-kva-oil-filled-transformer',
    image: '/assets/images/products/distribution-transformer.png',
    category: 'Distribution Transformers',
    capacity: '2,500 kVA',
    primaryVoltage: '11 kV / 33 kV',
    secondaryVoltage: '415 V',
    cooling: 'ONAN',
    efficiency: '99.20%',
    impedance: '5.75%',
    vectorGroup: 'Dyn11',
    description: 'Standard workhorse for garments factories, medium manufacturing units, and commercial plazas.',
    keyPoints: ['Ready inventory and quick turnaround', '100% Electrolytic copper windings', 'BSTI certified']
  },
  {
    name: '1000 kVA Distribution Transformer',
    slug: '1000-kva-oil-filled-transformer',
    image: '/assets/images/products/oil-immersed-transformer.png',
    category: 'Distribution Transformers',
    capacity: '1,000 kVA',
    primaryVoltage: '11 kV',
    secondaryVoltage: '415 V',
    cooling: 'ONAN',
    efficiency: '99.05%',
    impedance: '5.0%',
    vectorGroup: 'Dyn11',
    description: 'Most popular rating for commercial buildings, residential townships, and light factories.',
    keyPoints: ['High efficiency Tier 2 losses', 'Off-circuit tap switch ±2x2.5%', 'DESCO/DPDC approved']
  },
  {
    name: 'Cast Resin Dry-Type Transformers (100 kVA - 3150 kVA)',
    slug: 'cast-resin-dry-type-transformer',
    image: '/assets/images/products/ets/cast-resin-dry-type-transformers.webp',
    category: 'Dry-Type Transformers',
    capacity: '100 kVA to 3,150 kVA',
    primaryVoltage: '11 kV / 33 kV',
    secondaryVoltage: '415 V',
    cooling: 'AN (Natural Air) / AF (Forced Air)',
    efficiency: '98.9% - 99.3%',
    impedance: '4.0% - 6.0%',
    vectorGroup: 'Dyn11',
    description: 'Class F / Class H epoxy resin cast windings, zero oil fire hazard, self-extinguishing for hospitals, data centers, high-rises.',
    keyPoints: ['Zero flammability / Fire safe', 'Low partial discharge <10 pC', 'No environmental oil spill risk']
  },
  {
    name: 'Compact Kiosk Substation (Package Substation)',
    slug: 'compact-kiosk-substation',
    image: '/assets/images/products/ets/package-substation-transformers.webp',
    category: 'Prefabricated Substations',
    capacity: '315 kVA to 2,500 kVA',
    primaryVoltage: '11 kV / 33 kV',
    secondaryVoltage: '415 V',
    cooling: 'Integrated ventilation',
    efficiency: 'Integrated solution',
    impedance: 'System integrated',
    vectorGroup: 'Dyn11',
    description: 'Weatherproof outdoor IP54 steel kiosk housing MV SF6/Vacuum Ring Main Unit (RMU), transformer, and LV distribution switchboard.',
    keyPoints: ['Plug & play pre-commissioned', 'Saves 70% civil footprint', 'Utility lockable compartments']
  },
  {
    name: 'Vacuum Circuit Breaker (VCB) & MV Switchgear Panels',
    slug: 'vacuum-switchgear-panel',
    image: '/assets/images/products/ets/mv-switchgear-eclipse-range.webp',
    category: 'Switchgear & Automation',
    capacity: '630A to 3150A / 11kV - 33kV',
    primaryVoltage: '11 kV / 33 kV',
    secondaryVoltage: 'N/A',
    cooling: 'Air insulated',
    efficiency: 'Arc-resistant',
    impedance: 'N/A',
    vectorGroup: 'N/A',
    description: 'Medium voltage indoor draw-out type vacuum circuit breaker with microprocessor-based protection relays.',
    keyPoints: ['Internal arc classified IAC AFLR', 'Overcurrent & Earth fault relays', 'SCADA remote telemetry']
  }
];

// Flagship Projects & Case Studies
export const BPEL_PROJECTS = [
  {
    title: '33/11 kV Primary Substation Installation (2x 20 MVA)',
    client: 'Utility Distribution Grid Feeder',
    capacity: '40 MVA Total',
    scope: 'Complete Turnkey EPC: 2x 20 MVA low-loss power transformers with motorized OLTC, 33kV GIS switchgear, SCADA automation.',
    status: 'Commissioned & Live',
    location: 'Dhaka Metropolitan Network'
  },
  {
    title: 'Heavy Steel & Rolling Mill 16 MVA Transformer Supply',
    client: 'Heavy Industrial Steel Manufacturing Complex',
    capacity: '16 MVA / 35kV Feed',
    scope: 'Custom high-voltage liquid-filled unit with dynamic short-circuit mechanical bracing for extreme cyclic motor-starting surges.',
    status: 'Operational 24/7',
    location: 'Chittagong Industrial Belt'
  },
  {
    title: '50 MW Solar PV Grid Step-Up Substation',
    client: 'Renewable Solar Power Producer',
    capacity: '33 kV Step-Up Inverter Substations',
    scope: 'Multiple dual-LV winding solar inverter duty transformers with electrostatic shielding and low harmonic losses.',
    status: 'Energized & Delivering Power',
    location: 'Mymensingh Solar Park'
  },
  {
    title: 'Composite Garments & Textile Captive Substation (2x 2500 kVA)',
    client: 'Export Processing Zone (EPZ) Textile Hub',
    capacity: '5,000 kVA Total',
    scope: '2x 2500 kVA ONAN distribution transformers with automated PFI capacitor banks and 11kV VCB protection panels.',
    status: 'Zero Downtime',
    location: 'Gazipur EPZ Area'
  }
];

// Helper to format currency
export function formatBdt(amount) {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Crore BDT`;
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} Lakh BDT`;
  }
  return `${amount.toLocaleString()} BDT`;
}

// Work Order Terms
export const WORK_ORDER_TERMS = {
  payment: '30% Advance with official signed Work Order / PO, 70% prior to dispatch from Gazipur works (or 100% Irrevocable Letter of Credit - LC).',
  testing: 'Routine and Type Testing witnessed by client inspectors at BPEL ISO 17025 accredited High Voltage Laboratory before dispatch.',
  delivery: 'Ex-factory Gazipur or Delivered to site plinth anywhere in Bangladesh with crane rigging.',
  warranty: '24 Months Comprehensive Manufacturer Guarantee from commissioning date with 24/7 technical emergency response.'
};

// System prompt to send to Google Gemini API
export const GEMINI_SYSTEM_PROMPT = `
You are Engr. Tanvir Ahmed, the Autonomous Senior Technical Sales & Engineering Agent at Basic Power Engineering Ltd (BPEL), Bangladesh.
You are capable of conducting complete website research, handling customer inquiries, explaining products WITH THEIR REAL PHOTOS, providing instant budgetary quotations, and autonomously processing complete WORK ORDERS from start to finish without needing any human employee!

Key Facts:
- Company: Basic Power Engineering Ltd (BPEL), established 2008
- Headquarters: Level 11, BPEL Tower, Plot 34, Gulshan South Avenue, Gulshan-1, Dhaka 1212
- Factory: BPEL Industrial Park, Gazipur, Bangladesh (High-voltage ISO 17025 test bay)
- Approvals: BPDB, DESCO, DPDC, BREB (Palli Bidyut), WZPDCL, NESCO
- Standards: IEC 60076, IEEE C57, ISO 9001:2015, BSTI Certified, ASTA/KEMA STL Witnessed

Key Capabilities:
1. Product Information with Images: Whenever discussing a product, describe its specs (kVA, voltage, cooling, core, copper windings) and reference its image from BPEL catalog (/assets/images/products/power-transformer.png, /assets/images/products/oil-immersed-transformer.png, /assets/images/products/distribution-transformer.png, /assets/images/products/hermetically-sealed-transformer.png, /assets/images/products/ets/cast-resin-dry-type-transformers.webp, etc.).
2. Quotations: Generate structured quotations (Ref: BPEL-QT-2026-XXXX) with capacity, voltage ratio, cooling, copper conductor, realistic BDT price (and approx USD), lead time, and warranty.
3. Work Orders: You can collect client company name, project site location, required equipment, and issue a formal Work Order Confirmation (Ref: BPEL-WO-2026-XXXX) with full commercial terms (30% advance, 70% before delivery) and WhatsApp direct dispatch!
4. Image Inspection: If the user uploads a photo of a transformer, damaged core, nameplate, or single-line diagram (SLD), acknowledge the image and provide engineering analysis, identifying ratings and proposing replacement or maintenance solutions!
5. Language: Seamlessly respond in natural, professional Bengali / Banglish if the user asks in Bengali, or engineering English if the user asks in English.
`;
