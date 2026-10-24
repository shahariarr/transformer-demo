/* Comprehensive Technical Project Dossiers for BPEL Case Studies (/projects/[slug]) */

export const PROJECTS_DETAILS = {
  'electrical-substation-installation': {
    authority: 'Utility Distribution Grid',
    voltage: '33 / 11 kV Step-Down',
    capacity: '2× 20 MVA (40 MVA Total)',
    duration: '14 Months Turnkey EPC',
    commissioned: 'Q3 2024',
    stats: [
      { target: 40, suffix: ' MVA', label: 'TOTAL SUBSTATION CAPACITY', format: false },
      { target: 33, suffix: '/11 kV', label: 'VOLTAGE TRANSFORMATION RATIO', format: false },
      { target: 100, suffix: '%', label: 'GIS & SCADA AUTOMATION', format: false },
      { target: 14, suffix: ' Mos', label: 'TURNKEY EPC DELIVERY TIME', format: false }
    ],
    gallery: [
      '/assets/images/projects/substation-installation.jpg',
      '/assets/images/services/installation-crane.jpg',
      '/assets/images/services/installation-termination.jpg'
    ],
    overview: 'Complete turnkey EPC engineering, procurement, civil construction, equipment installation, and live network synchronisation of a 33/11 kV primary distribution substation. The facility incorporates dual 20 MVA low-loss power transformers with on-load tap changers, compact gas-insulated switchgear, automated protection relays, and remote SCADA monitoring.',
    challenges: [
      'Constrained urban plot requiring compact GIS switchgear footprint and strict fire-separation barriers',
      'Integration with live 33 kV regional grid feeder with zero unscheduled downtime during connection cut-over',
      'High seasonal water table requiring specialized deep piling foundations and waterproof cable vault drainage'
    ],
    scope: [
      'Civil engineering: Transformer blast-wall bays, oil containment pits, and GIS control building construction',
      'Primary equipment: 2× 20 MVA 33/11 kV liquid-immersed power transformers with motorized OLTC and RTCC panels',
      'Switchgear: 33 kV Gas-Insulated Switchgear (GIS) and 11 kV metal-clad air-insulated vacuum circuit breaker panels',
      'Protection & Control: Microprocessor-based differential, overcurrent, restricted earth fault (REF), and voltage regulation relays',
      'Auxiliary systems: Dual redundant 110V DC battery chargers, station service transformers, and fire deluge system',
      'Testing & Handover: On-site dielectric breakdown voltage (BDV) tests, SFRA sweep frequency diagnostics, and utility energisation'
    ],
    standards: ['IEC 60076-1', 'IEC 62271-200', 'IEEE C57', 'ISO 9001:2015', 'Grid Code Compliant']
  },

  'industrial-transformer-supply': {
    authority: 'Heavy Industrial Steel & Process Plant',
    voltage: '35 / 11 kV Distribution Feed',
    capacity: '16 MVA Low-Loss Unit',
    duration: '6 Months Fast-Track',
    commissioned: 'Q1 2025',
    stats: [
      { target: 35, suffix: ' kV', label: 'HIGH-VOLTAGE OIL IMMERSED', format: false },
      { target: 100, suffix: '%', label: 'ON-LOAD TAP CHANGER (OLTC)', format: false },
      { target: 30, suffix: '%', label: 'NO-LOAD LOSS REDUCTION', format: false },
      { target: 24, suffix: '/7', label: 'HEAVY PROCESS PLANT DUTY', format: false }
    ],
    gallery: [
      '/assets/images/projects/industrial-transformer-supply.jpg',
      '/assets/images/services/supply-warehouse.jpg',
      '/assets/images/services/maintenance-oil-purification.jpg'
    ],
    overview: 'Design, precision manufacturing, factory acceptance testing (FAT), and site rigging of custom heavy-duty liquid-filled power transformers equipped with automated on-load tap changers. Engineered specifically to withstand severe cyclic motor-starting surges and harmonic distortion from industrial electric arc and rolling mill drives.',
    challenges: [
      'Heavy cyclic load variations and rapid motor inrush currents requiring reinforced mechanical winding bracing',
      'Elevated harmonic content from high-power variable frequency drives (VFD) and thyristor converters',
      'Logistics of heavy oversized unit transport and precision rigging onto existing factory foundation plinths'
    ],
    scope: [
      'Electromagnetic design: High-permeability step-lap CRGO core minimizing harmonic eddy losses',
      'Winding construction: Disc windings with continuous transposition conductor (CTC) for maximum mechanical strength',
      'Cooling: Radiator banks with automated dual-speed forced-air fans (ONAN/ONAF ratings)',
      'Factory Testing: Full dielectric routine, impulse withstand (170 kV BIL), and temperature-rise testing witnessed by client QA',
      'Site Commissioning: Nitrogen purge, vacuum oil filling, winding resistance, and turns ratio verification'
    ],
    standards: ['IEC 60076', 'IEEE C57.12.00', 'ISO 9001:2015', 'High-Harmonic K-Factor Rated']
  },

  'medium-voltage-switchgear-installation': {
    authority: 'Manufacturing Distribution Hub',
    voltage: '11 kV / 33 kV Medium Voltage',
    capacity: '18 Integrated Feeder Panels',
    duration: '4 Months',
    commissioned: 'Q4 2024',
    stats: [
      { target: 11, suffix: ' kV', label: 'VACUUM CIRCUIT BREAKER CLASS', format: false },
      { target: 25, suffix: ' kA', label: 'SHORT-CIRCUIT WITHSTAND (3s)', format: false },
      { target: 100, suffix: '%', label: 'INTERNAL ARC CLASSIFICATION', format: false },
      { target: 18, suffix: ' Panels', label: 'INTEGRATED DISTRIBUTION LINE', format: false }
    ],
    gallery: [
      '/assets/images/projects/mv-switchgear-installation.jpg',
      '/assets/images/services/installation-termination.jpg',
      '/assets/images/services/testing-field-diagnostics.jpg'
    ],
    overview: 'Delivery, positioning, busbar torque alignment, secondary wiring, and functional relay commissioning of metal-clad medium-voltage switchgear panels. Built to Form 4 internal separation standards, providing operator safety and high-speed vacuum fault interruption for automated industrial lines.',
    challenges: [
      'Tight installation schedule coordinated during planned factory maintenance shutdown window',
      'Integration with existing multi-vendor SCADA system and electrical interlock matrix',
      'Operator safety mandate requiring Internal Arc Classification (IAC AFLR 25kA/1s)'
    ],
    scope: [
      'Panel fabrication: 2.0mm Aluzinc sheet construction with independent pressure relief flaps and gas ducting',
      'Switchgear components: Draw-out vacuum circuit breakers (VCB) with motorized racking and mechanical interlocks',
      'Protection: Digital multifunction feeder protection units with Modbus/IEC 61850 protocol support',
      'Busbar system: High-conductivity electrolytic copper busbars with heat-shrinkable insulation sleeves',
      'Commissioning: High-voltage insulation withstand (28 kV AC / 1 min), contact resistance, and breaker trip timing'
    ],
    standards: ['IEC 62271-200', 'IEC 62271-100', 'ISO 9001:2015', 'IAC AFLR 25kA/1s Certified']
  },

  'commercial-building-power-infrastructure': {
    authority: 'Commercial Tower & Mixed-Use Complex',
    voltage: '11 kV / 415 V Indoor Distribution',
    capacity: '4× 2,000 kVA Dry-Type Units',
    duration: '8 Months',
    commissioned: 'Q2 2024',
    stats: [
      { target: 8000, suffix: ' kVA', label: 'TOTAL BUILDING SUBSTATION POWER', format: true },
      { target: 1, suffix: ' Class', label: 'F1 FIRE-RETARDANT CAST RESIN', format: false },
      { target: 55, suffix: ' dB(A)', label: 'ULTRA-LOW ACOUSTIC NOISE LEVEL', format: false },
      { target: 100, suffix: '%', label: 'ZERO LIQUID LEAKAGE HAZARD', format: false }
    ],
    gallery: [
      '/assets/images/projects/commercial-power.jpg',
      '/assets/images/services/supply-warehouse.jpg',
      '/assets/images/services/testing-field-diagnostics.jpg'
    ],
    overview: 'Turnkey indoor basement substation engineering featuring fire-retardant cast resin dry-type transformers, high-capacity low-voltage switchboards, sandwich busduct risers, and automatic power factor correction (APFC) banks tailored for premium multi-story architecture.',
    challenges: [
      'Strict municipal fire-safety regulations prohibiting liquid-filled transformers inside occupied commercial towers',
      'Extremely low acoustic sound pressure requirements to prevent noise transmission to retail and office suites',
      'Basement access constraints requiring modular transformer transport and precision positioning'
    ],
    scope: [
      'Dry-Type Transformers: 4× 2,000 kVA Class F insulation cast resin units with IP31 protective enclosures',
      'Low-Voltage Distribution: Form 4b main switchboards with air circuit breakers (ACB) and motorized bus-couplers',
      'Busduct Risers: Compact copper sandwich busway systems delivering power up vertical building shafts',
      'Power Factor Correction: Automated capacitor banks maintaining system power factor > 0.98 under dynamic office loads',
      'Testing: High-voltage AC dielectric tests, partial discharge (PD < 10 pC), and thermal thermographic baseline scanning'
    ],
    standards: ['IEC 60076-11', 'IEC 61439-1/2', 'ISO 14001:2015', 'F1 Fire Retardant']
  },

  'water-treatment-plant-electrical-systems': {
    authority: 'Municipal Water & Sewerage Authority',
    voltage: '33 / 6.6 / 0.415 kV Pumping Grid',
    capacity: '2× 10 MVA + Motor Control Center',
    duration: '11 Months',
    commissioned: 'Q3 2024',
    stats: [
      { target: 20, suffix: ' MVA', label: 'WATER PLANT CONTINUOUS CAPACITY', format: false },
      { target: 100, suffix: '%', label: 'DUAL REDUNDANT PUMPING POWER', format: false },
      { target: 65, suffix: ' Sa', label: 'IP65 CORROSION C5 PROTECTION', format: false },
      { target: 24, suffix: '/7', label: 'MISSION CRITICAL WATER SUPPLY', format: false }
    ],
    gallery: [
      '/assets/images/projects/water-plant-electrical.jpg',
      '/assets/images/services/installation-crane.jpg',
      '/assets/images/services/testing-oil-lab.jpg'
    ],
    overview: 'Turnkey motor control centers (MCC), primary step-down transformers, harmonic filtering units, and automated dual-source failover power systems ensuring 24/7/365 uninterrupted drinking water pumping and filtration operations.',
    challenges: [
      'Harsh chemical and humid chlorine environment requiring specialized anti-corrosive enclosures (C5 paint rating)',
      'Severe motor starting torque and variable frequency drive (VFD) harmonics from 500 kW intake water pumps',
      'Critical infrastructure uptime requiring zero-second power interruption via automatic transfer switches (ATS)'
    ],
    scope: [
      'Outdoor Transformers: 2× 10 MVA 33/6.6 kV liquid-filled units with corrugated tanks and hermetic sealing',
      'Motor Control Centers: 6.6 kV vacuum contactor panels and 415V intelligent MCC with soft starters and VFD drives',
      'Harmonic Mitigation: Tuned passive and active harmonic filter banks ensuring THD(I) < 5% at point of common coupling',
      'Dual Redundancy: PLC-automated automatic transfer switchgear between two independent grid feeder lines',
      'Commissioning: Full functional loop testing with SCADA telemetry, motor insulation resistance, and vibration analysis'
    ],
    standards: ['IEC 60076', 'IEC 61439-2', 'ISO 9001:2015', 'Corrosion Class C5-M']
  },

  'metro-station-power-infrastructure': {
    authority: 'Mass Rapid Transit Electrification',
    voltage: '33 / 0.415 kV Auxiliary & Traction',
    capacity: 'Auxiliary Substations & Ring Mains',
    duration: '12 Months',
    commissioned: 'Q1 2025',
    stats: [
      { target: 33, suffix: ' kV', label: 'RING MAIN FEED VOLTAGE CLASS', format: false },
      { target: 100, suffix: '%', label: 'DUAL REDUNDANT TRANSIT FEED', format: false },
      { target: 1, suffix: ' Class', label: 'TUNNEL FIRE-SAFE CAST RESIN', format: false },
      { target: 0, suffix: ' Failures', label: 'SAFETY-CRITICAL SIGNAL POWER', format: false }
    ],
    gallery: [
      '/assets/images/projects/metro-station-power.jpg',
      '/assets/images/services/installation-termination.jpg',
      '/assets/images/services/testing-field-diagnostics.jpg'
    ],
    overview: 'Engineering and deployment of high-reliability auxiliary substations providing synchronized power distribution for passenger concourses, signaling interlocks, tunnel ventilation fans, and traction substation auxiliary feeds across mass transit stations.',
    challenges: [
      'Subterranean station room constraints requiring compact, low-heat emission dry-type transformers',
      'Strict transit authority safety standards requiring zero halogen toxic smoke emission in the event of external fire',
      'Coordination of live commissioning during restricted 3-hour overnight maintenance track access windows'
    ],
    scope: [
      'Station Transformers: 33/0.415 kV Cast Resin Dry-Type units classified E2, C2, F1 with low-smoke halogen-free materials',
      'Ring Main Units (RMU): SF6-free 33 kV vacuum ring main units for flexible network reconfiguration and fault sectionalising',
      'Signaling UPS Integration: Static transfer switches and isolated transformers for continuous trackside signaling',
      'Ventilation Power: High-temperature emergency smoke extract fan drive panels with fire-rated cabling',
      'Testing: High-voltage VLF withstand, partial discharge measurements (< 5 pC), and multi-stage emergency trip tests'
    ],
    standards: ['IEC 60076-11', 'IEC 62271-200', 'EN 50122 Transit Standard', 'NFPA 130 Compliant']
  }
};
