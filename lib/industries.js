/* Extra detail for each industry page (/industries/[slug]), keyed by slug from lib/data.js */
export const INDUSTRY_DETAILS = {
  'power-utilities-and-grid-infrastructure': {
    intro: 'Public power utilities and regional transmission authorities require grid-connected equipment engineered for continuous 24/7/365 operation, ultra-low lifetime losses, and dynamic short-circuit withstand. BPEL designs, manufactures, and tests primary substation transformers, distribution units, and compact package substations fully aligned with IEC 60076, IEEE C57, and national utility technical submittals.',
    needs: [
      'Compliance with utility specifications and approvals (DEWA, BPDB, DESCO, BREB, PGCB approved designs)',
      'Low no-load core losses and high-permeability step-lap CRGO magnetic circuits for multi-decade lifecycle efficiency',
      'High dynamic short-circuit tolerance verified by accredited independent test laboratories',
      'Lightning impulse voltage withstand up to 200 kV BIL for grid surge resilience and insulation coordination',
      'Hermetically sealed or conservator tank construction with automated Sa 2.5 shot-blasting and C5 marine-grade protective coating'
    ],
    supply: [
      'Primary Substation Power Transformers (Up to 132 kV / 100 MVA with On-Load Tap Changers)',
      'Network Distribution Transformers (11 kV & 33 kV step-down distribution units)',
      'Medium-Voltage Air & Gas-Insulated Switchgear (GIS/AIS up to 36 kV with vacuum circuit breakers)',
      'Turnkey Outdoor Package Substations (Factory pre-assembled, pre-wired, and routine tested)',
      'Single-Line Diagram (SLD) engineering, FAT witness testing, and live utility grid energisation'
    ],
    standards: ['IEC 60076', 'IEEE C57.12.00', 'IEC 62271-200', 'ISO 9001:2015', 'EcoDesign Tier 2'],
    gallery: [
      '/assets/images/industries/utilities-grid-substation.jpg',
      '/assets/images/industries/utilities-grid-transmission.jpg'
    ]
  },

  'manufacturing-and-industrial-facilities': {
    intro: 'Modern production lines depend on uninterrupted, clean power. Motor starting, cyclic factory loads, variable-frequency drives, and severe network harmonics all place continuous stress on transformers and medium-voltage switchgear assemblies.',
    needs: [
      'Heavy-duty thermal withstand capacity for frequent high-inertia motor-starting and cyclic plant loads',
      'K-Factor rated electromagnetic coils engineered to tolerate high harmonic distortion from VFDs and power electronics',
      'Sub-cycle fault isolation and vacuum circuit-breaker coordination to protect upstream production machinery',
      'On-load tap changer (OLTC) automation to stabilize secondary distribution voltage during plant load swings'
    ],
    supply: [
      'Dedicated Industrial Power Transformers (1,000 kVA – 16,000 kVA with automated on-load tap changers)',
      'Medium-Voltage Metal-Clad Switchgear (11 kV – 33 kV) with vacuum breakers and arc-resistant safety barriers',
      'Intelligent Motor Control Centers (MCC) and sub-distribution panels for precision plant load segregation',
      'Power Factor Correction (PFC) banks and harmonic detuning reactor units for optimal tariff efficiency'
    ],
    standards: ['IEC 60076', 'IEEE C57.12.00', 'IEC 61439-1/2', 'ISO 9001:2015', 'IP54 Protection'],
    gallery: [
      '/assets/images/industries/manufacturing-assembly-line.jpg',
      '/assets/images/industries/manufacturing-heavy-machinery.jpg'
    ]
  },

  'textile-and-garment-industries': {
    intro: 'Textile spinning, weaving, and wet-processing plants run around the clock with massive continuous loads, exposed to hot, humid, and fiber-laden ambient factory environments.',
    needs: [
      'Continuous 100% full-load thermal endurance under 50°C tropical ambient conditions',
      'Hermetically sealed corrugated tanks preventing oil degradation from atmospheric humidity and lint',
      'Rapid harmonic attenuation for automated spinning frames and electronic jacquard knitting machinery',
      'Dual-redundant incoming feeders ensuring zero production interruption across continuous dyeing lines'
    ],
    supply: [
      'High-Efficiency Oil-Immersed Distribution Transformers (500 kVA – 5,000 kVA)',
      'Pre-fabricated Compact Substation Units (CSS) engineered for rapid plant floor footprint expansion',
      'Automatic Power Factor Improvement (PFI) plant installations maintaining >0.98 power factor',
      'Busbar Trunking Systems (BBT) engineered for safe, low-impedance current distribution across multi-story mills'
    ],
    standards: ['IEC 60076', 'Class F Insulation', 'ISO 14001:2015', 'IEC 62271-200', 'Energy Star Rated'],
    gallery: [
      '/assets/images/industries/textile-spinning-mill.jpg',
      '/assets/images/industries/textile-plant-substation.jpg'
    ]
  },

  'commercial-buildings-and-real-estate': {
    intro: 'High-rise towers, corporate complexes, and retail shopping malls demand ultra-compact, whisper-quiet, and strictly fire-safe substations situated directly inside or beneath occupied premises.',
    needs: [
      'F1 fire-behavior certified cast-resin dry-type construction with zero toxic gas or liquid leakage hazards',
      'Ultra-low acoustic noise emission (<55 dB) compliant with commercial interior occupancy standards',
      'Compact modular footprint for basement substations and tight vertical riser shafts',
      'Seamless Building Management System (BMS) integration via Modbus/BACnet IoT power monitoring'
    ],
    supply: [
      'Cast Resin Dry-Type Transformers (up to 35 kV / 4,000 kVA with Class F/H insulation)',
      'Low-Voltage Main Distribution Boards (MDB) with automated bus-coupler transfer systems',
      'High-amperage Sandwich-Type Copper Busduct Risers engineered for vertical tower distribution',
      'Compact Indoor Package Substations pre-tested and certified for zero building hazard'
    ],
    standards: ['IEC 60076-11 (Dry-Type)', 'F1 Fire Behavior', 'E2 Environmental', 'ISO 9001:2015', 'UL 1561 Listed'],
    gallery: [
      '/assets/images/industries/commercial-indoor-substation.jpg',
      '/assets/images/industries/commercial-switchgear-room.jpg'
    ]
  },

  'hospitals-and-healthcare-facilities': {
    intro: 'Hospitals and healthcare campuses cannot tolerate a single second of electrical outage. Critical care ICUs, surgery suites, and diagnostic radiology require isolated, fail-safe redundant power.',
    needs: [
      'Dual-redundant primary feeder failover with sub-millisecond Automatic Transfer Switch (ATS) capability',
      'Galvanically isolated medical-grade power with ultra-low earth leakage for life-support apparatus',
      'Zero liquid combustible hazard using fire-retardant dry-type or biodegradable natural ester transformers',
      'Harmonic filtration protecting sensitive MRI, CT scan, and precision surgical imaging suites'
    ],
    supply: [
      'Cast Resin Dry-Type Distribution Transformers for indoor electrical vault placement',
      'Medical Isolated Power Supply (IPS) systems and line isolation monitoring panels for operating rooms',
      'Dual-redundant MV Switchgear assemblies with automated PLC synchronisation and generator tie-in',
      'Harmonic Active Power Filters (APF) and transient voltage surge suppressors (TVSS)'
    ],
    standards: ['IEC 60364-7-710', 'IEC 61558-2-15', 'ISO 13485 Compliance', 'IEC 60076-11', 'NFPA 99'],
    gallery: [
      '/assets/images/industries/healthcare-backup-substation.jpg',
      '/assets/images/industries/healthcare-isolation-power.jpg'
    ]
  },

  'water-treatment-and-public-infrastructure': {
    intro: 'Municipal pumping stations, desalination plants, and water treatment facilities drive massive high-torque pump motors at outdoor and remote sites exposed to severe moisture and chemical atmospheres.',
    needs: [
      'Dynamic torque endurance for heavy centrifugal pumps with high inductive starting currents',
      'Severe C5 marine-grade anti-corrosive paint finishes and IP65 weatherproof outdoor enclosures',
      'Active harmonic mitigation for high-power variable-speed intake and booster drives',
      'N+1 redundancy architecture guaranteeing non-stop municipal potable water distribution'
    ],
    supply: [
      'Outdoor Liquid-Immersed Power Transformers with corrugated or tubular radiator banks',
      'Medium-Voltage Motor Control Centers (MV-MCC) with solid-state soft starters',
      'Outdoor Pad-Mounted Substations with integrated ring main units (RMU) and vacuum circuit breakers',
      'Remote SCADA telemetry interfaces for pump flow synchronisation and remote alarm trip logging'
    ],
    standards: ['IEC 60076', 'C5 Marine Protective Coating', 'IP65 Enclosure Rating', 'ISO 50001', 'IEEE C57.12'],
    gallery: [
      '/assets/images/industries/water-treatment-substation.jpg',
      '/assets/images/industries/water-pumping-drives.jpg'
    ]
  },

  'transportation-and-metro-infrastructure': {
    intro: 'Electrified rail lines, metro transit tunnels, and passenger terminals require uncompromising power stability for traction propulsion, signaling safety, passenger station lifts, and tunnel ventilation.',
    needs: [
      'Severe cyclic load profile handling rapid acceleration and regenerative braking current spikes',
      'Fire-safe, halogen-free, and low-smoke zero-halogen (LSZH) cast-resin transformers for underground stations',
      'Dual-source redundant ring feeds ensuring continuous train control and emergency life-safety egress',
      'High insulation impulse withstand against lightning surges along elevated overhead catenary tracks'
    ],
    supply: [
      'Traction Step-Down and Auxiliary Transformers engineered for DC rectifier and AC railway substations',
      'Gas-Insulated Switchgear (GIS) compact modular bays tailored for subterranean metro station rooms',
      'Trackside Compact Substations with integrated SCADA protection relays and interlocking safety switches',
      'Emergency tunnel ventilation distribution switchboards with automated standby generator transfer'
    ],
    standards: ['EN 50124 (Railway)', 'IEC 62271-200', 'IEC 60076-11 F1', 'NFPA 130 Fire Safety', 'ISO 9001:2015'],
    gallery: [
      '/assets/images/industries/metro-traction-substation.jpg',
      '/assets/images/industries/metro-signaling-power.jpg'
    ]
  },

  'energy-and-renewable-power': {
    intro: 'Utility-scale solar farms and renewable generation facilities require specialized step-up transformers that interface multi-megawatt inverter blocks cleanly and efficiently into the regional high-voltage grid.',
    needs: [
      'Step-up capability from low-voltage inverter outputs (600V – 800V) directly to transmission grid levels (33 kV – 132 kV)',
      'Tolerance of high DC bias, inverter carrier frequencies, and daily thermal cycling from zero to 100% capacity',
      'Outdoor weatherproof performance under extreme desert heat, UV exposure, and desert dust storms',
      'Ultra-low no-load core losses maximizing levelized cost of energy (LCOE) and grid feed-in revenue'
    ],
    supply: [
      'Solar Inverter-Duty Transformers with multi-winding configurations (dual, triple or quad LV windings)',
      'Integrated Skid Package Substations combining inverter-duty transformer, MV ring main unit, and LV breaker',
      'High-voltage substation step-up transformers (up to 100 MVA) for regional transmission tie-in',
      'SCADA grid-compliance monitoring packages with fiber-optic temperature sensors inside transformer windings'
    ],
    standards: ['IEC 60076-16 (Solar/Wind)', 'IEEE C57.159 (Inverter Duty)', 'National Grid Code', 'EcoDesign Tier 2', 'ISO 14001:2015'],
    gallery: [
      '/assets/images/industries/renewable-solar-inverter.jpg',
      '/assets/images/industries/renewable-grid-substation.jpg'
    ]
  }
};
