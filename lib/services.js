/* Services: overview cards + detail pages (/services/[slug]) */
export const SERVICES = [
  {
    slug: 'equipment-supply',
    title: 'Equipment Supply',
    short: 'Transformers, substations and switchgear specified, built and delivered to your project schedule.',
    image: '/assets/images/lifecycle/03-procurement-planning.jpg',
    badge: 'OEM ELECTRICAL MANUFACTURING & SUPPLY',
    tagline: 'Precision engineering, certified metallurgy, and custom transformer design built to utility-grade specifications.',
    gallery: [
      '/assets/images/services/supply-warehouse.jpg',
      '/assets/images/services/supply-dispatch.jpg'
    ],
    highlights: [
      { label: 'Voltage Class', val: 'Up to 230 kV' },
      { label: 'Power Rating', val: '100 kVA – 100 MVA' },
      { label: 'Standards', val: 'IEC 60076 & IEEE C57' }
    ],
    intro: 'We supply power and distribution transformers, compact substations and medium-voltage switchgear built to your drawings, standards and site conditions, with one team accountable from enquiry to delivery.',
    includes: [
      'Technical review of tender drawings and specifications',
      'Equipment sizing: rating, voltage ratio, vector group, impedance and cooling',
      'Bill of materials with traceable, certified raw materials',
      'Factory acceptance testing, with customer witness on request',
      'Export packing, shipping documents and delivery coordination'
    ],
    includesDetailed: [
      {
        title: 'Technical Review of Tender Drawings & SLD',
        desc: 'In-depth assessment of single-line diagrams, short-circuit levels, load factor variations, and site ambient temperature profiles.'
      },
      {
        title: 'Equipment Sizing & Electromagnetic Modeling',
        desc: 'Custom winding calculations, impedance voltage matching, loss optimization (CRGO core grade selection), and ONAN/ONAF cooling design.'
      },
      {
        title: 'Certified Bill of Materials (Traceable BOM)',
        desc: 'Prime-grade laser-scribed Hi-B core steel, 99.99% pure oxygen-free electrolytic copper, pressboard insulation, and high-dielectric mineral oil.'
      },
      {
        title: 'Full Factory Acceptance Testing (FAT)',
        desc: 'Comprehensive routine and type testing witnessed in our accredited high-voltage laboratory with calibrated digital test instrumentation.'
      },
      {
        title: 'Export Packing & Multi-Axle Logistics',
        desc: 'Heavy-duty seaworthy crating, dry-nitrogen blanket preservation with continuous pressure loggers, and calibrated 3D impact sensors.'
      }
    ],
    deepDive: {
      heading: 'Engineering Methodology & Manufacturing Discipline',
      overview: 'Every transformer supplied by BPEL undergoes meticulous engineering from electromagnetic 3D FEA simulation to precision coil winding and computer-controlled vacuum drying. Our dedicated engineering office validates impedance, thermal hot spots, and seismic resilience prior to manufacturing release.',
      overviewSecondary: 'We maintain strict material traceability for every heat lot of CRGO silicon steel, conductor reel, and dielectric batch. Customer inspection teams and independent certifying bodies are provided with complete factory access to witness high-voltage dielectric tests and loss measurements.',
      capabilities: [
        {
          title: 'Electromagnetic & Thermal FEA',
          desc: '3D finite-element simulation optimizing magnetic flux leakage, preventing tank wall overheating, and minimizing acoustic resonance decibels.'
        },
        {
          title: 'Vacuum Autoclave & Vapor Drying',
          desc: 'Core-coil assemblies dried below 0.5% residual moisture in computer-controlled vacuum pressure autoclaves before oil impregnation.'
        },
        {
          title: 'Step-Lap Mitred Core Stacking',
          desc: 'High-speed CNC slitting and 45-degree step-lap mitred joints cutting excitation current by 12% and reducing no-load losses.'
        },
        {
          title: 'Accredited FAT Testing Bay',
          desc: 'Full routine and type test bay: applied voltage, induced overvoltage, partial discharge, winding resistance, and sound level validation.'
        }
      ]
    },
    specs: [
      { label: 'Applicable Standards', val: 'IEC 60076, IEEE C57, BS 171, ANSI C57.12' },
      { label: 'Rated Capacity Scope', val: '100 kVA to 100 MVA (Distribution & Power)' },
      { label: 'Primary Voltage Class', val: '11 kV, 33 kV, 66 kV, 132 kV, up to 230 kV' },
      { label: 'Vector Group Options', val: 'Dyn11, Ynd11, Dyn5, YNd1, or custom specification' },
      { label: 'Cooling Classes', val: 'ONAN, ONAF, OFAF, KNAN (synthetic ester) & AN (dry-type)' },
      { label: 'Magnetic Core Material', val: 'Cold Rolled Grain Oriented (CRGO) Prime Hi-B Steel' },
      { label: 'Winding Conductor', val: '99.99% pure electrolytic copper (round, rectangular or CTC)' },
      { label: 'Warranty & Design Life', val: 'Up to 36 months warranty with 30+ year engineered design life' }
    ],
    deliverables: [
      'Certified Factory Acceptance Test (FAT) Report & Curves',
      'Detailed As-Built General Arrangement (GA) CAD Drawings',
      'Terminal & Cable Box Wiring Schematics',
      'Raw Material Mill Test Certificates (MTC) for Core & Copper',
      'Operation, Maintenance & Installation Comprehensive Manual'
    ],
    faqs: [
      {
        q: 'Can our engineering team or third-party inspectors witness the FAT?',
        a: 'Yes. We welcome customer representatives, utility inspection bodies, and third-party inspectors (such as SGS, Bureau Veritas, or TUV) at our accredited testing bay. Every routine and type test is logged live with calibrated digital instrumentation.'
      },
      {
        q: 'What is the standard manufacturing lead time for custom power transformers?',
        a: 'Standard manufacturing lead times generally range between 8 to 16 weeks depending on MVA rating, voltage class, component availability, and on-load tap changer requirements. Expedited production slots are available for emergency replacements.'
      },
      {
        q: 'Do you offer synthetic ester fluid alternatives to conventional mineral oil?',
        a: 'Yes. For indoor substations, urban environments, and fire-sensitive installations, we supply biodegradable synthetic and natural ester dielectric liquids (e.g. MIDEL 7131 / Envirotemp FR3) with high fire points exceeding 300°C.'
      }
    ],
    steps: ['Enquiry & specification review', 'Technical offer & drawings', 'Manufacturing & FAT', 'Packing & dispatch']
  },
  {
    slug: 'installation',
    title: 'Installation & Commissioning',
    short: 'Site rigging, placement, cabling and energisation carried out by experienced field engineers.',
    image: '/assets/images/lifecycle/05-site-installation.jpg',
    badge: 'TURNKEY SUBSTATION & FIELD EPC',
    tagline: 'End-to-end site rigging, mechanical assembly, precision cabling, and supervised energisation by certified high-voltage field engineers.',
    gallery: [
      '/assets/images/services/installation-crane.jpg',
      '/assets/images/services/installation-termination.jpg'
    ],
    highlights: [
      { label: 'Substation Voltage', val: 'Up to 230 kV' },
      { label: 'Safety Record', val: 'Zero Incident Culture' },
      { label: 'Mobilisation Time', val: '24–48 Hours' }
    ],
    intro: 'Our field engineers handle the work between delivery and energisation: unloading, placement, assembly of accessories, cable termination and the final checks before the unit goes live.',
    includes: [
      'Pre-installation site and foundation inspection',
      'Crane rigging and placement onto plinths',
      'Assembly of radiators, conservator, bushings and accessories',
      'HV/LV cable termination, earthing and surge protection',
      'Pre-commissioning checks and supervised first energisation'
    ],
    includesDetailed: [
      {
        title: 'Pre-Rigging Civil & Foundation Survey',
        desc: 'Laser levelling, foundation load-bearing checks, plinth dimension verification, and crane boom access lane validation.'
      },
      {
        title: 'Heavy Crane Rigging & Precision Placement',
        desc: 'Multi-axle hydraulic low-bed transport unloading, skidding, and laser-guided placement onto substation transformer pads.'
      },
      {
        title: 'Mechanical Accessory & Radiator Assembly',
        desc: 'Torque-calibrated installation of radiators, conservator tanks, dehydrating breathers, Buchholz relays, and oil level gauges.'
      },
      {
        title: 'High-Voltage Cable & Busbar Termination',
        desc: 'Certified stress-cone cable termination, primary busbar alignment, surge arrestor mounting, and perimeter copper earthing grids.'
      },
      {
        title: 'Pre-Energisation Testing & Grid Synchronization',
        desc: 'Insulation verification, ratio checks, interlock tripping simulations, phase alignment, and first energisation under supervision.'
      }
    ],
    deepDive: {
      heading: 'Field Execution Standards & Substation Rigging Discipline',
      capabilities: [
        {
          title: 'Heavy Crane Rigging & Plinth Skidding',
          desc: 'Turnkey hydraulic jacking and heavy mobile cranes capable of lifting transformers exceeding 100 metric tons safely onto plinths.'
        },
        {
          title: 'Clean Bushing & Conservator Fitting',
          desc: 'Protective environmental shelters preventing atmospheric dust and humidity ingress during bushing and active tank work.'
        },
        {
          title: 'Vacuum Oil Degassing & Topping',
          desc: 'High-vacuum oil pumping plants bringing dielectric oil level to exact temperature-compensated markers with zero aeration.'
        },
        {
          title: 'Interlock & Protection Validation',
          desc: 'Comprehensive functional testing of Buchholz alarms, pressure relief devices (PRD), and tripping circuits to substation switchgear.'
        }
      ]
    },
    specs: [
      { label: 'Voltage Scope', val: 'Distribution, medium-voltage & primary substations up to 230 kV' },
      { label: 'Rigging Capacity', val: 'Single-lift capacities up to 120 metric tons' },
      { label: 'Site Personnel', val: 'Certified HV electrical engineers & licensed crane rigging operators' },
      { label: 'Testing Tools', val: 'Calibrated insulation testers, digital micro-ohmmeters, phase sequence meters' },
      { label: 'Earthing Resistance', val: 'Substation earth grid testing verified to IEEE 80 standards' },
      { label: 'Safety Accreditation', val: 'ISO 45001 compliant with zero-lost-time safety discipline' },
      { label: 'Mobilisation Window', val: 'Nationwide field deployment within 24 to 48 hours' }
    ],
    deliverables: [
      'Site Acceptance Test (SAT) Protocol & Sign-off Dossier',
      'Bushing & Cable Termination Torque Log Sheets',
      'Pre-Commissioning Insulation & Ratio Test Verification',
      'Protective Relay Tripping & Interlock Check Confirmation',
      'Handover Certificate & Grid Energisation Endorsement'
    ],
    faqs: [
      {
        q: 'Do you provide the crane rigging and heavy transport equipment?',
        a: 'Yes. We manage turnkey site logistics including specialized heavy-lift mobile hydraulic cranes, low-bed multi-axle trailers, hydraulic skidding tracks, and certified rigging teams.'
      },
      {
        q: 'How do you handle transformer oil filling at the job site?',
        a: 'When units are transported gas-filled with nitrogen, our mobile oil processing trailer pulls vacuum on the main tank, conducts vacuum hold tests, and fills high-dielectric oil under vacuum to prevent bubble formation.'
      },
      {
        q: 'Can you work inside active, live industrial substations?',
        a: 'Yes. Our site engineers possess high-voltage safety clearances and execute strict Lock-Out / Tag-Out (LOTO) protocols with clear safety barriers and supervised approach boundaries.'
      }
    ],
    steps: ['Site survey', 'Delivery & placement', 'Assembly & cabling', 'Commissioning & handover']
  },
  {
    slug: 'testing',
    title: 'Testing & Diagnostics',
    short: 'Routine, site acceptance and condition tests that show how your equipment is really performing.',
    image: '/assets/images/lifecycle/06-testing-commissioning.jpg',
    badge: 'HIGH-VOLTAGE DIAGNOSTICS & OIL LAB',
    tagline: 'Advanced condition monitoring, dissolved gas chromatography, and electromagnetic frequency response testing for critical power assets.',
    gallery: [
      '/assets/images/services/testing-oil-lab.jpg',
      '/assets/images/services/testing-field-diagnostics.jpg'
    ],
    highlights: [
      { label: 'Test Standard', val: 'IEC, IEEE & ASTM' },
      { label: 'DGA Chromatography', val: '7-Gas PPM Analysis' },
      { label: 'Reporting Speed', val: 'Emergency 12-hr Lab Turnaround' }
    ],
    intro: 'Testing confirms that equipment left the factory right and is still healthy in service. We carry out acceptance tests at site and condition assessments on units already in operation.',
    includes: [
      'Insulation resistance and polarisation index',
      'Winding resistance and turns ratio',
      'Oil breakdown voltage, moisture and dissolved gas analysis (DGA)',
      'Sweep frequency response analysis (SFRA)',
      'Protection relay and interlock function checks'
    ],
    includesDetailed: [
      {
        title: 'Dielectric Insulation Resistance & Polarisation Index',
        desc: '10 kV automated Megger profiling measuring 1-min / 10-min insulation resistance, PI values, and dielectric absorption ratio (DAR).'
      },
      {
        title: 'Winding Resistance & Dynamic Ratio Analysis',
        desc: 'Four-terminal Kelvin digital micro-ohmmeter measurement across all tap positions with automated temperature compensation.'
      },
      {
        title: 'Transformer Oil DGA & Dielectric Breakdown (BDV)',
        desc: 'Gas chromatography for hydrogen, methane, acetylene, ethylene, carbon oxides; breakdown voltage (kV), moisture ppm, and acidity.'
      },
      {
        title: 'Sweep Frequency Response Analysis (SFRA)',
        desc: 'High-resolution frequency response comparison detecting micro-millimeter core displacement, winding deformation, or mechanical short-circuit damage.'
      },
      {
        title: 'Protection Relays, CT/PT & Interlock Checks',
        desc: 'Secondary current injection, winding temperature indicator (WTI), oil temperature indicator (OTI), and trip contact calibration.'
      }
    ],
    deepDive: {
      heading: 'Analytical Rigor & Condition-Based Diagnostic Science',
      overview: 'Routine physical inspections only catch external issues. Comprehensive electrical testing and dissolved gas chromatography allow plant managers to see inside the tank while the transformer is in operation, preventing multi-million dollar outages before they happen.',
      overviewSecondary: 'Our diagnostic reports utilize industry-standard fault classification matrices including Duval’s Triangles 1, 4 & 5, Rogers Ratios, and IEC 60599 standards to pinpoint thermal hotspots, low-energy sparking, and partial discharge phenomena with high precision.',
      capabilities: [
        {
          title: 'Dissolved Gas Chromatography (DGA)',
          desc: 'Identifies arcing, overheating, and cellulose degradation using precision laboratory gas chromatography down to 1 ppm sensitivity.'
        },
        {
          title: 'SFRA Mechanical Integrity',
          desc: 'Swept frequency response analysis validating internal winding geometry against baseline curves after heavy grid fault currents.'
        },
        {
          title: 'Tan Delta & Capacitance Measurement',
          desc: 'High-voltage dielectric dissipation factor testing evaluating insulation aging on condenser bushings and winding paper.'
        },
        {
          title: 'Actionable Diagnostic Reports',
          desc: 'Clear condition traffic-light scoring (Good, Fair, Action Required) with prioritized maintenance recommendations.'
        }
      ]
    },
    specs: [
      { label: 'Diagnostic Standards', val: 'IEC 60076, IEEE C57.104, IEEE C57.149, ASTM D3612, IEC 60156' },
      { label: 'Dielectric Oil Parameters', val: 'BDV (kV), Moisture (ppm), Acidity (mg KOH/g), Interfacial Tension (mN/m)' },
      { label: 'Gas Chromatography', val: 'H2, CH4, C2H6, C2H4, C2H2, CO, CO2 detection limits down to 1 ppm' },
      { label: 'SFRA Test Spectrum', val: '10 Hz to 20 MHz with high dynamic range > 100 dB' },
      { label: 'Test Instruments', val: 'Omicron, Doble, Megger, and Shimadzu precision laboratory analyzers' },
      { label: 'Reporting Turnaround', val: 'Standard 48 hours; urgent field samples processed within 12 hours' }
    ],
    deliverables: [
      'Comprehensive Transformer Diagnostic Health Dossier',
      'Calibrated Oil Test Certificates (BDV, Moisture, DGA)',
      'Duval Triangle 1, 4 & 5 Diagnostic Fault Classification Charts',
      'SFRA Benchmark Comparison Overlay Curves',
      'Residual Asset Life Expectancy & Maintenance Recommendations'
    ],
    faqs: [
      {
        q: 'Why is Dissolved Gas Analysis (DGA) considered the most vital test?',
        a: 'When insulation paper or oil is stressed by heat or arcing, specific fault gases dissolve into the oil. DGA detects thermal hotspots, arcing, and corona discharges months before equipment failure occurs.'
      },
      {
        q: 'Can oil sampling be performed while the transformer is energized and on-load?',
        a: 'Yes. We extract oil samples using gas-tight glass syringes directly from bottom sampling valves while the transformer is running on-load, causing zero interruption to your facility.'
      },
      {
        q: 'What is the purpose of Sweep Frequency Response Analysis (SFRA)?',
        a: 'SFRA acts like an electromagnetic fingerprint of the transformer windings. Comparing baseline curves reveals winding displacement, deformation, or loose clamping caused by short circuits or transport shocks.'
      }
    ],
    steps: ['Test plan', 'On-site testing', 'Analysis', 'Report & recommendations']
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Repair',
    short: 'Planned maintenance and repair that extend equipment life and cut the risk of unplanned outages.',
    image: '/assets/images/lifecycle/07-handover-documentation.jpg',
    badge: 'LIFECYCLE EXTENSION & PLANT REHABILITATION',
    tagline: 'Planned preventive maintenance, mobile oil regeneration, tap changer overhaul, and rapid emergency field repairs.',
    gallery: [
      '/assets/images/services/maintenance-oil-purification.jpg',
      '/assets/images/services/maintenance-tap-changer.jpg'
    ],
    highlights: [
      { label: 'Oil Processing', val: 'Vacuum Degassing < 5ppm H2O' },
      { label: 'Asset Life Extension', val: '+10 to 15 Years' },
      { label: 'Emergency Support', val: '24/7 Rapid Response' }
    ],
    intro: 'A planned maintenance programme keeps transformers and switchgear reliable for decades. When something does go wrong, our team diagnoses the fault and restores the equipment.',
    includes: [
      'Scheduled inspection and preventive maintenance plans',
      'Oil filtration, regeneration and top-up',
      'Gasket, bushing and accessory replacement',
      'Tap changer inspection and servicing',
      'Fault investigation and repair'
    ],
    includesDetailed: [
      {
        title: 'Scheduled Preventive Substation Inspections',
        desc: 'Infrared thermographic thermal imaging of bushings and connections, silica gel reactivation, nitrogen pressure regulation, and earthing audits.'
      },
      {
        title: 'On-Site Vacuum Oil Filtration & Regeneration',
        desc: 'Mobile high-vacuum dehydration trailer removing moisture below 10 ppm, dissolved gases, and sludge particulates down to 0.2 micron.'
      },
      {
        title: 'Gasket, Seal & Leak Remediation',
        desc: 'Systematic replacement of degraded cork-neoprene gaskets with oil-resistant Viton/NBR materials and re-torquing of radiator flanges.'
      },
      {
        title: 'On-Load Tap Changer (OLTC) Servicing',
        desc: 'Complete inspection of transition contacts, vacuum interrupters, drive mechanisms, timing synchronization, and diverter oil purification.'
      },
      {
        title: 'Winding Refurbishment & Coil Rewinding',
        desc: 'Factory rewinding of burnt or degraded coils, core re-insulation, clamping re-tightening, and full re-testing back to OEM specs.'
      }
    ],
    deepDive: {
      heading: 'Proactive Asset Preservation & Plant Reliability',
      overview: 'Power transformers are capital-intensive infrastructure designed to operate for 30+ years. Without periodic oil conditioning, contact servicing, and seal rejuvenation, moisture ingress and dielectric degradation accelerate exponentially, leading to premature insulation breakdown.',
      overviewSecondary: 'Our mobile maintenance units bring factory-grade oil conditioning and overhaul capabilities right to your substation yard. By performing online oil dehydration and OLTC contact replacement during planned shutdowns, we add 10 to 15 years of dependable service life.',
      capabilities: [
        {
          title: 'High-Vacuum Mobile Dehydration Plant',
          desc: 'Processes up to 6,000 liters/hour through two-stage vacuum chambers, restoring oil breakdown voltage from 25kV to >70kV.'
        },
        {
          title: 'Precision OLTC Overhaul & Timing',
          desc: 'Diverter switch inspection, contact erosion measurement, motor drive mechanism servicing, and transition resistance checks.'
        },
        {
          title: 'Infrared Thermography Surveys',
          desc: 'FLIR thermal imaging identifying loose connections, unbalanced current loading, and radiator blockage under full load.'
        },
        {
          title: 'Emergency Mobile Response Team',
          desc: 'Rapid mobilization team equipped with replacement gaskets, bushings, dehydrating silica, and oil top-up facilities.'
        }
      ]
    },
    specs: [
      { label: 'Filtration Flow Rate', val: 'Up to 6,000 L/hr with two-stage vacuum system (< 0.05 mbar)' },
      { label: 'Moisture Reduction', val: 'Reduces moisture from > 40 ppm down to < 5 ppm' },
      { label: 'Gas Removal Efficiency', val: 'Dissolved air/gas reduced from 10% by volume to < 0.25%' },
      { label: 'Gasket Material Options', val: 'Viton, NBR, and oil-resistant cork-neoprene compound' },
      { label: 'OLTC Mechanisms Serviced', val: 'MR (Maschinenfabrik Reinhausen), Huaming, ABB, and BPEL' },
      { label: 'Rapid Response Availability', val: 'Dedicated 24/7 technical hotline and on-call field engineers' }
    ],
    deliverables: [
      'Complete Maintenance & Servicing Protocol Report',
      'Before & After Dielectric Oil Test Comparison Certificate',
      'Thermal Imaging Thermographic Analysis Dossier',
      'OLTC Contact Wear & Resistance Log',
      'Updated Equipment Service History & Recommended Schedule'
    ],
    faqs: [
      {
        q: 'Can oil filtration be conducted while the transformer remains energized?',
        a: 'Yes, for distribution and medium power transformers with suitable pipework, we can perform closed-loop online oil filtration without de-energizing the transformer, eliminating factory downtime.'
      },
      {
        q: 'How often should On-Load Tap Changers (OLTC) be serviced?',
        a: 'OLTCs should undergo inspection every 2 to 4 years or after 50,000 to 100,000 operations, depending on operating frequency and the manufacturer specifications.'
      },
      {
        q: 'What causes transformer oil leaks and how do you stop them?',
        a: 'Leaks typically occur due to thermal degradation and hardening of rubber gaskets around radiators, bushings, and manhole covers. We replace them with specialized nitrile/Viton seals torqued to precise factory specs.'
      }
    ],
    steps: ['Condition survey', 'Maintenance plan', 'Scheduled service', 'Records & review']
  }
];
