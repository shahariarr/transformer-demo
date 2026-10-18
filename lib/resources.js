/* Engineering process, test programme, glossary, standards and sizing-guide data */

export const MANUFACTURING_STEPS = [
  { t: 'Technical Approval', d: 'Client specification review, load demand evaluation, and technical compliance sign-off.' },
  { t: 'Design Approval', d: 'Detailed electrical and mechanical drawings, single-line diagrams, and GA engineering approval.' },
  { t: 'Budgetary Approval', d: 'Commercial baseline estimation, cost finalisation, and formal project budget sanction.' },
  { t: 'Purchase Approval', d: 'Internal requisition clearance and management authorisation for material procurement.' },
  { t: 'Supplier PO Submission', d: 'Formal purchase orders placed with certified suppliers for core steel, copper, and accessories.' },
  { t: 'Purchase', d: 'Procurement, incoming material inspection, and inventory staging of quality-certified components.' },
  { t: 'Production', d: 'Precision core cutting, high-tension winding, insulation, core-coil assembly, and tanking.' },
  { t: 'Testing', d: 'Routine, type, and special dielectric tests under factory conditions to IEC 60076 standards.' },
  { t: 'Delivery', d: 'Protective packaging, heavy-transport logistics, and insured transit delivery to site.' },
  { t: 'Installation & Commissioning', d: 'Rigging onto foundation, bushing fitment, oil filtration, cabling, and site pre-commissioning.' },
  { t: 'ELB', d: 'Electrical Licensing Board statutory inspection, compliance certification, and energisation clearance.' },
  { t: 'Invoice Submission', d: 'Handover documentation, warranty packs, commissioning certificates, and final billing submission.' }
];

export const TEST_GROUPS = [
  {
    t: 'Routine Tests',
    badge: '100% Mandatory',
    tag: 'Factory Acceptance (FAT)',
    standard: 'IEC 60076-1 & 3',
    d: 'Conducted on every single unit before dispatch to verify guaranteed losses, insulation integrity and impedance.',
    accent: 'blue',
    icon: 'shield',
    items: [
      { name: 'Winding resistance measurement', note: 'Cold DC resistance across all tap positions' },
      { name: 'Voltage ratio & vector group check', note: 'Phase sequence and vector displacement check' },
      { name: 'Short-circuit impedance & load loss', note: 'Accurate copper loss and %Z measurement' },
      { name: 'No-load loss & excitation current', note: 'Core magnetising losses at rated voltage' },
      { name: 'Separate-source AC withstand', note: 'Power frequency test for ground insulation' },
      { name: 'Induced overvoltage withstand', note: 'Double voltage test for inter-turn dielectric' }
    ],
    footer: 'Mandatory on 100% of finished transformers'
  },
  {
    t: 'Type Tests',
    badge: 'Design Baseline',
    tag: 'Design Proof Testing',
    standard: 'IEC 60076-2, 3 & 10',
    d: 'Carried out on representative production units to validate fundamental thermal, dielectric and acoustic performance.',
    accent: 'cyan',
    icon: 'lightning',
    items: [
      { name: 'Temperature rise test', note: 'Continuous rated load thermal equilibrium run' },
      { name: 'Full-wave lightning impulse test', note: 'High-voltage lightning surge withstand (BIL)' },
      { name: 'Acoustic sound level measurement', note: 'Decibel noise rating measured at full flux' },
      { name: 'Zero-sequence impedance test', note: 'Essential data for power system protection' }
    ],
    footer: 'Proven on representative design prototypes'
  },
  {
    t: 'Special Tests',
    badge: 'Customer Specified',
    tag: 'Advanced Diagnostics',
    standard: 'IEC 60076-5 & IEEE',
    d: 'Advanced non-destructive diagnostics executed to satisfy tender requirements and critical substation specifications.',
    accent: 'orange',
    icon: 'wave',
    items: [
      { name: 'Short-circuit dynamic withstand', note: 'Certified short-circuit mechanical capability' },
      { name: 'Partial discharge measurement (PD)', note: 'Ultra-low picocoulomb internal discharge check' },
      { name: 'Frequency response analysis (SFRA)', note: 'Mechanical signature of winding and core geometry' },
      { name: 'Dissolved gas analysis (DGA)', note: 'Pre-shipment oil insulation baseline matrix' }
    ],
    footer: 'Available on customer request & witnessed FAT'
  }
];

export const GLOSSARY = [
  ['BIL', 'Basic Insulation Level. The lightning impulse voltage a winding is designed to withstand, in kV peak.'],
  ['Cast resin transformer', 'A dry-type transformer whose windings are encapsulated in epoxy resin. Used indoors where oil is not wanted.'],
  ['Conservator', 'A tank above an oil-immersed transformer that lets the oil expand and contract with temperature.'],
  ['CRGO steel', 'Cold-rolled grain-oriented silicon steel, used for transformer cores because of its low magnetic losses.'],
  ['DGA', 'Dissolved Gas Analysis. Testing the gases dissolved in transformer oil to detect developing faults.'],
  ['Hermetically sealed', 'A transformer with no conservator, where a corrugated tank absorbs oil expansion. Needs less maintenance.'],
  ['Impedance voltage', 'The voltage, as a percentage of rated voltage, needed to circulate rated current with the secondary shorted. Sets fault level.'],
  ['kVA / MVA', 'Apparent power rating of a transformer. 1 MVA = 1,000 kVA.'],
  ['Load loss', 'Losses in the windings when the transformer carries load, mostly from winding resistance.'],
  ['No-load loss', 'Losses in the core whenever the transformer is energised, whether or not it carries load.'],
  ['OLTC', 'On-Load Tap Changer. Adjusts the voltage ratio while the transformer stays in service.'],
  ['ONAN / ONAF', 'Cooling classes: Oil Natural Air Natural, and Oil Natural Air Forced (with fans).'],
  ['Package substation', 'A factory-built unit combining MV switchgear, transformer and LV distribution in one enclosure.'],
  ['SFRA', 'Sweep Frequency Response Analysis. A test that detects mechanical movement of windings and core.'],
  ['Vector group', 'Code describing how windings are connected (e.g. Dyn11) and the phase shift between primary and secondary.']
];

export const STANDARDS = [
  ['IEC 60076-1', 'Power transformers: general requirements'],
  ['IEC 60076-2', 'Temperature rise for liquid-immersed transformers'],
  ['IEC 60076-3', 'Insulation levels, dielectric tests and clearances'],
  ['IEC 60076-5', 'Ability to withstand short circuit'],
  ['IEC 60076-10', 'Determination of sound levels'],
  ['IEC 60076-11', 'Dry-type transformers'],
  ['IEC 60296', 'Unused mineral insulating oils for transformers and switchgear'],
  ['IEC 62271-200', 'AC metal-enclosed switchgear for 1 kV to 52 kV'],
  ['IEC 61439', 'Low-voltage switchgear and controlgear assemblies'],
  ['IEEE C57.12.00', 'General requirements for liquid-immersed distribution, power and regulating transformers'],
  ['ISO 9001', 'Quality management systems'],
  ['ISO 14001', 'Environmental management systems'],
  ['ISO 45001', 'Occupational health and safety management systems']
];

/* Common IEC preferred ratings, in kVA */
export const STANDARD_KVA = [25, 50, 100, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];

export const CAREER_REASONS = [
  { t: 'Real engineering', d: 'Work on transformers and substations that end up powering utilities, factories and cities.' },
  { t: 'Learn the full cycle', d: 'See projects from first drawing through factory testing to energisation on site.' },
  { t: 'Safety first', d: 'Work under an ISO 45001 occupational health and safety system.' },
  { t: 'Grow with us', d: 'Training, mentoring and room to take on more responsibility.' }
];

export const CAREER_AREAS = ['Design & Engineering', 'Manufacturing & Production', 'Testing & Quality', 'Field Service & Commissioning', 'Sales & Project Management', 'Supply Chain & Logistics'];
