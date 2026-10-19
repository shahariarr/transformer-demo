/* Engineering Knowledge & Technical Insights Blog Data
   Modeled after the technical excellence of top power engineering leaders.
*/

export const BLOG_CATEGORIES = [
  'All',
  'Engineering',
  'Technology',
  'Industry',
  'Projects',
  'Standards'
];

export const BLOG_POPULAR_TAGS = [
  'Substations',
  'IEC 60076',
  '50°C Ambient',
  'Harmonics',
  'Solar PV',
  'DGA',
  'Corrosion',
  'Acoustics',
  'Motor Starting'
];

export const BLOG_POSTS = [
  {
    slug: 'installation-support-the-quiet-edge-behind-reliable-substations',
    featured: true,
    title: 'Installation Support: The Quiet Edge Behind Reliable Substations',
    category: 'Engineering',
    date: 'October 14, 2026',
    isoDate: '2026-10-14',
    readTime: '7 min read',
    readMinutes: 7,
    tags: ['Substations', 'Commissioning', 'Dielectric Oil', 'Maintenance'],
    author: {
      name: 'Eng. Tariq Rahman',
      role: 'Chief Technical Director, BPEL',
      avatar: '/assets/images/leaders/01-managing-director.png'
    },
    image: '/assets/images/lifecycle/05-site-installation.jpg',
    excerpt: 'Across heavy industrial and utility projects, the difference between a 40-year transformer and a 5-year headache is rarely the factory — it is what happens on site during rigging, oil filling, and first energisation.',
    takeaways: [
      'Over 68% of premature insulation breakdown is traceable to improper on-site oil filling and moisture contamination rather than factory manufacturing defects.',
      'Vacuum filling protocols must achieve sub-1 mbar pressure and be sustained for a minimum dwell period to eliminate trapped dielectric microbubbles.',
      'Proper core-ground and tank-ground separation testing during handover prevents circulating neutral currents that cause false differential relay trips.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'When a 16,000 kVA or 33 kV substation transformer completes factory acceptance testing (FAT), the test certificate confirms zero partial discharge, strict winding resistance balance, and dielectric breakdown voltage above 65 kV. Yet utility and industrial maintenance databases worldwide tell a sobering story: the majority of transformers that suffer catastrophic failure in their first seven years of service did not fail because of engineering miscalculations inside the winding shop. They failed because of errors committed between offloading from the low-bed transport trailer and final breaker closure.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Invisible Risk: Dielectric Oil Moisture Contamination On-Site'
      },
      {
        type: 'paragraph',
        text: 'Large power transformers are frequently shipped with dry nitrogen or dry synthetic air holding pressure between 0.2 and 0.35 bar to reduce transport weight and prevent internal condensation. The moment maintenance crews open inspection covers on site in humid coastal or tropical conditions without continuous dry-air flushing, atmospheric moisture immediately adsorbs onto cellulose paper insulation.'
      },
      {
        type: 'callout',
        title: 'Critical Moisture Threshold',
        text: 'Cellulose paper has an affinity for water roughly 1,000 times higher than mineral transformer oil. An increase in paper water content from 0.8% to just 2.2% cuts the dielectric life expectancy of kraft paper in half and slashes the lightning impulse withstand margin by nearly 30%.'
      },
      {
        type: 'paragraph',
        text: 'To counteract this, BPEL installation support teams enforce a rigorous on-site vacuum evacuation and oil processing cycle prior to first energisation:'
      },
      {
        type: 'image',
        src: '/assets/images/services/maintenance-oil-purification.jpg',
        caption: 'Figure 1: High-vacuum dielectric oil filtration and degasification plant deployed during 33 kV substation transformer commissioning.',
        credit: 'BPEL Site Engineering Division'
      },
      {
        type: 'specTable',
        caption: 'Standard On-Site Transformer Commissioning Dielectric Benchmarks',
        headers: ['Parameter', 'IEC 60076-1 / 60422 Requirement', 'BPEL Site Acceptance Standard'],
        rows: [
          ['Oil Breakdown Voltage (BDV)', '≥ 50 kV (2.5 mm gap)', '≥ 65 kV (2.5 mm gap)'],
          ['Moisture Content in Oil', '< 20 ppm at 20°C', '< 10 ppm at 20°C'],
          ['Dielectric Dissipation Factor (Tan δ at 90°C)', '≤ 0.015', '≤ 0.005'],
          ['Insulation Resistance (HV-LV & Ground)', '≥ 1,000 MΩ at 2.5 kV', '≥ 2,500 MΩ at 2.5 kV'],
          ['Vacuum Depth Prior to Oil Filling', '< 2.0 mbar', '< 0.5 mbar maintained for 12 hrs']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Mechanical Rigging & Bushing Alignment Precision'
      },
      {
        type: 'image',
        src: '/assets/images/services/installation-crane.jpg',
        caption: 'Figure 2: Precision hydraulic rigging and crane placement onto isolated reinforced concrete foundation plinth.',
        credit: 'BPEL Heavy Rigging Operations'
      },
      {
        type: 'paragraph',
        text: 'Skidding heavy transformer units onto concrete plinths without calibrated hydraulic jacking can twist the tank base plate, distorting internal core-clamp clamping torque and shearing copper busbar connections between the winding delta/wye terminations and porcelain or silicone bushings. Furthermore, high-voltage cable terminations must be torqued with calibrated dynamometric wrenches; improper terminal lug tightening generates thermal hotspots detectable only under thermographic survey during peak summer load.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The BPEL Comprehensive Site Commissioning Protocol'
      },
      {
        type: 'paragraph',
        text: 'By coupling in-house design engineering directly with turnkey site erection crews, BPEL guarantees that transformer protection relays, Buchholz gas collection floats, winding temperature indicators (WTI/OTI), and pressure relief devices (PRD) are dry-calibrated and loop-checked before the upstream circuit breaker is ever closed. This end-to-end stewardship is why our substation installations maintain a 99.98% first-year availability record.'
      }
    ]
  },
  {
    slug: 'k-factor-transformers-explained-vfd-harmonics',
    featured: false,
    title: 'What is a K-Factor Transformer — And Why Modern Buildings Cannot Live Without One',
    category: 'Technology',
    date: 'October 02, 2026',
    isoDate: '2026-10-02',
    readTime: '6 min read',
    readMinutes: 6,
    tags: ['Harmonics', 'VFD', 'Non-Linear Loads', 'High-Rise'],
    author: {
      name: 'Dr. K. Al-Hashemi',
      role: 'Head of Magnetic Design & R&D',
      avatar: '/assets/images/leaders/02-chief-operating-officer.png'
    },
    image: '/assets/images/projects/industrial-transformer-supply.jpg',
    excerpt: 'Every modern VFD, variable refrigerant flow chiller, and LED driver injects non-linear harmonic distortion into the neutral conductor. Here is how K-factor transformers eliminate eddy current hotspots and fire risks.',
    takeaways: [
      'Non-linear loads generate 3rd, 5th, 7th, and 9th triplen harmonics that do not cancel in the neutral conductor, causing neutral currents up to 173% of phase current.',
      'Standard distribution transformers suffer severe winding eddy current losses proportional to the square of the harmonic frequency (h²).',
      'K-factor rated units incorporate 200% rated copper neutral bars, transposed foil windings, and lower magnetic flux densities.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'In commercial high-rises, data processing hubs, textile manufacturing plants, and hospitals, linear sinusoidal loads are virtually extinct. Over 75% of connected electrical demand is drawn through switch-mode power supplies (SMPS), variable frequency motor drives (VFDs), server rectifier front-ends, and electronic LED ballasts. These non-linear loads draw current in steep, narrow pulses rather than smooth continuous sine waves.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Physics of Harmonic Heating'
      },
      {
        type: 'paragraph',
        text: 'When harmonic currents circulate through transformer copper windings, two primary loss mechanisms escalate dramatically: conductor eddy current losses and stray stray-load losses. While baseline 50 Hz resistive loss is simply I²R, eddy current losses increase in proportion to the square of the harmonic order multiplied by the harmonic current amplitude:'
      },
      {
        type: 'callout',
        title: 'Eddy Current Loss Formula',
        text: 'P_ec ∝ Σ [ I_h² · h² ] — A 5th harmonic current causes 25 times more internal eddy loss per ampere than standard fundamental frequency current; a 7th harmonic causes 49 times more.'
      },
      {
        type: 'specTable',
        caption: 'K-Factor Rating Selection Guide for Typical Commercial & Industrial Facilities',
        headers: ['K-Factor Rating', 'Allowable Harmonic Content', 'Typical Application Environments'],
        rows: [
          ['K-1', 'Standard linear loads (100% sine wave)', 'Resistive heaters, standard incandescent lighting, induction motors without drives'],
          ['K-4', 'Up to 35% non-linear load', 'Welders, induction heating, fluorescent lighting with electronic ballasts, standard commercial offices'],
          ['K-13', 'Up to 75% non-linear load', 'Telecommunication server rooms, healthcare imaging (MRI/CT), school computer laboratories'],
          ['K-20', 'Up to 100% non-linear load', 'Hyperscale data centres, heavy industrial VFD motor drives, broadcast transmitter stations']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Engineering Adaptations in K-Factor Construction'
      },
      {
        type: 'image',
        src: '/assets/images/lifecycle/04-manufacturing-fat.jpg',
        caption: 'Figure 1: Factory winding assembly with 200% rated copper neutral conductor and harmonic mitigation shielding.',
        credit: 'BPEL Advanced Transformer Works'
      },
      {
        type: 'paragraph',
        text: 'To endure these thermal stresses, BPEL K-factor transformers feature dual-size 200% copper neutral busbars capable of handling double the nominal phase current without overheating. Primary and secondary coils utilize multiple parallel-wound insulated strip conductors to minimize skin effect, coupled with grain-oriented M4 silicon steel cores operated at reduced magnetic induction (1.55 Tesla maximum) to prevent core saturation from DC bias.'
      }
    ]
  },
  {
    slug: 'high-voltage-transformer-cooling-50c-ambient',
    featured: false,
    title: 'Thermal Engineering for 50°C Ambients: Sustaining Transformer kVA in Severe Climates',
    category: 'Engineering',
    date: 'September 24, 2026',
    isoDate: '2026-09-24',
    readTime: '8 min read',
    readMinutes: 8,
    tags: ['50°C Ambient', 'Cooling Systems', 'Ester Fluid', 'Thermal'],
    author: {
      name: 'Eng. Shahriar Kabir',
      role: 'Thermal Systems Lead, BPEL',
      avatar: '/assets/images/leaders/03-director-engineering.png'
    },
    image: '/assets/images/lifecycle/04-manufacturing-fat.jpg',
    excerpt: 'When ambient temperatures reach 50°C and top-oil temperatures surge toward 115°C, standard IEC 60076-2 rating assumptions collapse. Here is how advanced radiator sizing, ester fluids, and forced cooling sustain full kVA.',
    takeaways: [
      'Standard IEC 60076-2 specifies a 30°C annual average and 40°C peak ambient; operating in 50°C ambients causes an unengineered transformer to lose 20–25% of its continuous kVA rating.',
      'Every 6°C rise in winding hot-spot temperature above the 98°C thermal threshold doubles the insulation degradation rate.',
      'High-flashpoint synthetic and natural ester dielectric fluids offer fire safety class K3 and withstand winding hot-spots up to 130°C.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'During peak summer periods across the Middle East, South Asia, and North Africa, ambient outdoor temperatures routinely exceed 48°C to 52°C in direct solar exposure. For transformer asset managers, this climate introduces extreme thermal management challenges. The cooling capacity of an oil-immersed transformer depends entirely on the temperature gradient (ΔT) between the circulating radiator oil and the surrounding ambient air.'
      },
      {
        type: 'image',
        src: '/assets/images/services/testing-field-diagnostics.jpg',
        caption: 'Figure 1: Full-load thermal imaging and cooling radiator airflow verification under high ambient conditions.',
        credit: 'BPEL Field Diagnostics Lab'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Mathematics of Ambient De-Rating'
      },
      {
        type: 'paragraph',
        text: 'Under IEC standards, the maximum allowable top-oil temperature rise is 60 K, and the average winding temperature rise is 65 K based on a 40°C maximum ambient. If the ambient temperature climbs to 50°C, the allowable top-oil rise must be restricted to 50 K to prevent cellulose paper embrittlement and catastrophic dielectric breakdown.'
      },
      {
        type: 'callout',
        title: 'Montsinger Thermal Aging Principle',
        text: 'The thermal life of electrical insulation obeys Arrhenius kinetics: continuous operation just 6°C above the design hot-spot limit halves the physical lifespan of the transformer from 30 years to less than 15 years.'
      },
      {
        type: 'paragraph',
        text: 'BPEL solves this by custom-engineering three cooling enhancements into every tropicalized substation transformer:'
      },
      {
        type: 'specTable',
        caption: 'Cooling Regime Comparisons for Extreme Ambient Environments',
        headers: ['Cooling Class', 'Radiator Surface Area Multiplier', 'Fan Stage Control', 'Oil Circulation'],
        rows: [
          ['ONAN (Natural Air)', '1.0x baseline', 'No fans (passive natural convection)', 'Thermosiphon convective flow'],
          ['ONAF (Forced Air)', '1.25x extended header', 'Two-stage staged temperature controller', 'Thermosiphon convective flow'],
          ['OFAF (Forced Oil & Air)', '1.45x heavy duty', 'Modulating high-flow axial fans', 'Positive displacement canned motor pumps'],
          ['ODAF (Directed Oil & Air)', '1.60x baffled channels', 'VFD-driven low-noise blowers', 'Internally guided winding oil ducting']
        ]
      },
      {
        type: 'paragraph',
        text: 'By coupling synthetic ester fluids (fire class K3, fire point > 300°C) with CFD-modeled winding cooling ducts, BPEL units sustain 100% nameplate kVA output even in closed, non-air-conditioned urban transformer vaults.'
      }
    ]
  },
  {
    slug: 'motor-starting-heavy-industrial-chillers-voltage-sag',
    featured: false,
    title: 'Motor-Starting Industrial Chillers & Smelters Without Tripping the Bus',
    category: 'Industry',
    date: 'September 11, 2026',
    isoDate: '2026-09-11',
    readTime: '6 min read',
    readMinutes: 6,
    tags: ['Motor Starting', 'Voltage Sag', 'Industrial', 'Impedance'],
    author: {
      name: 'Eng. Tariq Rahman',
      role: 'Chief Technical Director, BPEL',
      avatar: '/assets/images/leaders/01-managing-director.png'
    },
    image: '/assets/images/projects/commercial-power.jpg',
    excerpt: 'Starting 4,500 kW compressor motors produces inrush currents 6x full-load rating. Sizing transformer impedance, tap-changer response, and bus stiffening prevents voltage dips from tripping adjacent automation lines.',
    takeaways: [
      'Direct-on-line (DOL) and star-delta starting draw 450% to 650% full-load current at poor power factors (0.15–0.25 lagging).',
      'Excessive transformer impedance creates bus voltage sags exceeding 15%, causing sensitive PLC automation controllers and contactors to drop out.',
      'Optimizing short-circuit impedance (Z%) balances motor-starting voltage sag against downstream switchgear breaking capacity.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'In district cooling plants, cement manufacturing mills, and metal foundries, large medium-voltage motors ranging from 1,000 kW to 6,000 kW are the single largest dynamic loads on the electrical distribution system. When an operator initiates a start command for a centrifugal chiller compressor, the stationary motor acts momentarily as a bolted short circuit until the rotor accelerates toward synchronous speed.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Voltage Sag Calculation'
      },
      {
        type: 'paragraph',
        text: 'The momentary voltage drop at the transformer secondary bus during motor acceleration is governed by the ratio of motor starting kVA to the transformer short-circuit kVA capacity:'
      },
      {
        type: 'callout',
        title: 'Bus Voltage Dip Equation',
        text: 'V_dip (%) ≈ [ kVA_start / (kVA_start + kVA_tx / Z_tx) ] × 100 — Where Z_tx is per-unit transformer leakage impedance.'
      },
      {
        type: 'paragraph',
        text: 'If the transformer percentage impedance (Z%) is specified too high (e.g., 8.5% to restrict fault levels), the starting sag can reach 18–22%, tripping neighboring motor contactors, failing uninterruptible power supplies (UPS), and causing nuisance tripping across the entire plant.'
      },
      {
        type: 'paragraph',
        text: 'BPEL application engineers perform dynamic ETAP motor acceleration transient simulations during the tender phase to dial in the exact custom impedance percentage (such as 5.75% or 6.25%) that keeps bus voltage above 90% during startup while ensuring downstream air circuit breakers (ACB) remain comfortably within their 50 kA / 65 kA interrupting ratings.'
      }
    ]
  },
  {
    slug: 'renewable-energy-transformer-guide-solar-pv',
    featured: false,
    title: 'The Complete Engineering Guide to Step-Up Transformers for Solar PV Inverters',
    category: 'Projects',
    date: 'August 28, 2026',
    isoDate: '2026-08-28',
    readTime: '9 min read',
    readMinutes: 9,
    tags: ['Solar PV', 'Renewables', 'Inverter Duty', 'Grid-Tied'],
    author: {
      name: 'Farhan Ahmed',
      role: 'Senior Power Systems Engineer',
      avatar: '/assets/images/leaders/04-chief-financial-officer.png'
    },
    image: '/assets/images/projects/substation-installation.jpg',
    excerpt: 'From multi-winding low-voltage configurations to electrostatic shielding and solar duty thermal cycling, explore the exact technical specifications needed for utility-scale solar farms.',
    takeaways: [
      'Solar transformers endure radical daily load cycling: operating from 0% load at night to 110% peak irradiance midday.',
      'Split secondary windings (dual or quad LV) isolate adjacent central inverter bridges and prevent circulating carrier frequency harmonics.',
      'Grounded electrostatic copper shields between primary and secondary windings eliminate capacitive transfer of high-frequency inverter switching spikes.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Utility-scale solar photovoltaic plants present an operating environment fundamentally different from traditional baseload fossil generation. Where a municipal distribution transformer experiences smooth, predictable diurnal load curves, a solar step-up transformer is subjected to intense cyclic thermal expansion, rapid cloud-induced irradiance swings, and continuous high-frequency PWM voltage waveforms from central inverter IGBTs.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Split-Secondary Multi-Winding Configurations'
      },
      {
        type: 'paragraph',
        text: 'To interface with multiple central solar inverters (e.g., dual 1,560 kVA or 2,500 kVA skids), BPEL manufactures multi-split low-voltage units. A single 33 kV step-up unit incorporates two or four electrically independent, magnetically decoupled LV windings on a common core limb.'
      },
      {
        type: 'specTable',
        caption: 'Solar Inverter Step-Up Transformer Electrical Design Matrix',
        headers: ['Specification Feature', 'Standard Distribution Transformer', 'Solar Inverter Duty Transformer'],
        rows: [
          ['Daily Load Profile', 'Steady 40–80% continuous', '0% at night to 105% peak irradiance daily'],
          ['Voltage Harmonics (THD_v)', '< 2.5% clean sinusoidal', 'Elevated PWM switching harmonics up to 50 kHz'],
          ['LV Inter-Winding Decoupling', 'Not applicable (single winding)', 'High cross-impedance (> 10%) between LV1 & LV2'],
          ['Electrostatic Ground Shield', 'Rarely provided', 'Continuous grounded copper foil between HV & LV'],
          ['DC Bias Withstand', 'Sensitive to saturation', 'Reinforced core with anti-saturation air gap tolerance']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Combating Solar Inverter DC Component Injection'
      },
      {
        type: 'paragraph',
        text: 'Central inverters can leak small direct current (DC) offsets into the AC output during rapid maximum power point tracking (MPPT) adjustments. Even a tiny DC component (0.1% to 0.2% of rated AC current) causes unsymmetrical half-cycle core saturation, leading to sudden acoustic noise spikes, elevated excitation current, and severe tank wall overheating. BPEL cores utilize high-permeability, laser-scribed grain-oriented silicon sheets with low-loss joints engineered specifically to resist DC flux bias.'
      }
    ]
  },
  {
    slug: 'salt-spray-coastal-substation-corrosion-engineering',
    featured: false,
    title: 'Salt Spray and Coastal Humidity: Engineering Substations That Survive Severe Atmospheric Stress',
    category: 'Engineering',
    date: 'August 15, 2026',
    isoDate: '2026-08-15',
    readTime: '7 min read',
    readMinutes: 7,
    tags: ['Corrosion', 'C5-M Marine', 'Coastal', 'Hermetic'],
    author: {
      name: 'Eng. Shahriar Kabir',
      role: 'Thermal Systems Lead, BPEL',
      avatar: '/assets/images/leaders/03-director-engineering.png'
    },
    image: '/assets/images/projects/water-plant-electrical.jpg',
    excerpt: 'Within 5 km of coastlines and saline estuaries, salt-laden air attacks copper connections and tank paint. Here is how C5-M marine epoxy coatings, stainless hardware, and hermetic sealing deliver 30-year operational life.',
    takeaways: [
      'ISO 12944 Category C5-M (Marine) specifies multi-coat polyurethane paint systems capable of withstanding over 1,440 hours of continuous salt spray testing.',
      'Hermetically sealed corrugated tanks eliminate ambient air exchange entirely, keeping dielectric oil pristine in 98% relative humidity environments.',
      'Bi-metallic copper-aluminum transitions must be friction-welded or tin-plated to prevent galvanic corrosion.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Industrial substations installed at deepwater ports, desalination facilities, offshore petrochemical jetties, and coastal export processing zones operate under severe environmental stress. The combination of high ambient temperatures (35°C–45°C), high relative humidity (up to 95%), and airborne sodium chloride (NaCl) crystals accelerates galvanic and electrochemical corrosion by an order of magnitude.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Paint System Architecture (ISO 12944 C5-M Marine)'
      },
      {
        type: 'paragraph',
        text: 'A standard industrial single-coat primer and enamel topcoat will blister and peel within 24 to 36 months in coastal atmospheres. BPEL specifies an ultra-durable four-stage surface preparation and coating protocol for all outdoor coastal transformers:'
      },
      {
        type: 'specTable',
        caption: 'BPEL C5-M Marine Corrosion Protection Paint Schedule',
        headers: ['Layer Stage', 'Coating Chemistry', 'Dry Film Thickness (DFT)'],
        rows: [
          ['Surface Pre-Treatment', 'Automated centrifugal steel grit blasting to Sa 2.5', 'Surface profile 40–75 µm'],
          ['Primer Coat', 'Two-pack zinc-rich epoxy primer (min 80% zinc in dry film)', '60–75 µm'],
          ['Intermediate Barrier', 'Two-pack high-build micaceous iron oxide (MIO) epoxy', '120–150 µm'],
          ['Top Finish Coat', 'Two-pack aliphatic polyurethane with UV inhibitors', '60–80 µm'],
          ['Total System DFT', 'Continuous non-porous marine barrier system', '≥ 260 µm minimum']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Hardware & Gasket Resilience'
      },
      {
        type: 'paragraph',
        text: 'Every external fastener on BPEL coastal units is manufactured from A4-grade (AISI 316) marine stainless steel. Tank cover and bushing gaskets utilize oil-resistant fluoro-elastomer (Viton) or cork-neoprene compounds with precision compression stops, ensuring zero moisture breathing over a 30-year operational design life.'
      }
    ]
  },
  {
    slug: 'routine-vs-type-testing-iec-60076-dga-tan-delta',
    featured: false,
    title: 'Routine vs. Type Testing in Accredited High-Voltage Labs: Decoding Tan-Delta & DGA',
    category: 'Standards',
    date: 'July 30, 2026',
    isoDate: '2026-07-30',
    readTime: '8 min read',
    readMinutes: 8,
    tags: ['IEC 60076', 'DGA', 'Tan Delta', 'Impulse Testing'],
    author: {
      name: 'Dr. K. Al-Hashemi',
      role: 'Head of Magnetic Design & R&D',
      avatar: '/assets/images/leaders/02-chief-operating-officer.png'
    },
    image: '/assets/images/lifecycle/06-testing-commissioning.jpg',
    excerpt: 'Understanding the boundary between routine factory acceptance tests and rigorous type testing under IEC 60076 and IEEE C57 — including lightning impulse withstand, partial discharge, and dissolved gas analysis.',
    takeaways: [
      'Routine tests verify that every individual production unit is free of manufacturing flaws (ratio, resistance, no-load & load losses, applied & induced voltage).',
      'Type tests validate fundamental engineering design parameters across an entire product family (temperature rise test, full-wave lightning impulse test).',
      'Dissolved Gas Analysis (DGA) in oil identifies electrical arcing (acetylene C2H2), thermal overheating of oil (ethylene C2H4), and cellulose decomposition (CO/CO2).'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'When utility tender authorities and EPC engineering contractors evaluate transformer manufacturing qualifications, test documentation is the ultimate proof of quality. Under international standards such as IEC 60076 and IEEE C57.12.00, tests are divided into three distinct categories: Routine Tests, Type Tests, and Special Tests.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Routine Tests vs. Type Tests: The Critical Differences'
      },
      {
        type: 'paragraph',
        text: 'Routine tests are legally required on 100% of manufactured units leaving the factory gate. Type tests, by contrast, are expensive, destructive or extended-duration evaluations conducted on a representative prototype unit to validate calculations for an entire product class.'
      },
      {
        type: 'specTable',
        caption: 'Classification of Key High-Voltage Transformer Laboratory Tests',
        headers: ['Test Name', 'IEC 60076 Reference', 'Category', 'Pass/Fail Diagnostic Indicator'],
        rows: [
          ['Winding Resistance Measurement', 'IEC 60076-1 Clause 11.2', 'Routine', 'Phase-to-phase balance within ± 1.5%'],
          ['Voltage Ratio & Vector Group', 'IEC 60076-1 Clause 11.3', 'Routine', 'Ratio tolerance within ± 0.5% of nameplate'],
          ['No-Load Losses & Current', 'IEC 60076-1 Clause 11.5', 'Routine', 'Loss within contractual guarantee tolerance (+15%)'],
          ['Short-Circuit Impedance & Load Loss', 'IEC 60076-1 Clause 11.4', 'Routine', 'Impedance within ± 7.5% of nominal value'],
          ['Separate-Source AC Withstand', 'IEC 60076-3 Clause 10', 'Routine', 'No dielectric breakdown or flashover during 60s test'],
          ['Full-Wave Lightning Impulse (BIL)', 'IEC 60076-3 Clause 13', 'Type', 'Identical voltage and neutral current waveforms'],
          ['Temperature Rise Test', 'IEC 60076-2 Clause 5', 'Type', 'Winding rise ≤ 65 K, top oil rise ≤ 60 K at equilibrium'],
          ['Zero-Sequence Impedance', 'IEC 60076-1 Clause 11.7', 'Special', 'Accurate symmetrical component verification for relaying']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Diagnostic Power: Dissolved Gas Analysis (DGA)'
      },
      {
        type: 'image',
        src: '/assets/images/services/testing-oil-lab.jpg',
        caption: 'Figure 1: Accredited high-voltage chemical and dielectric testing laboratory for dissolved gas analysis (DGA).',
        credit: 'BPEL Quality & Testing Labs'
      },
      {
        type: 'paragraph',
        text: 'Before and immediately following temperature rise and dielectric withstand testing, oil samples are extracted via gas-tight glass syringes for gas chromatography. Under the Duval Triangle and Rogers Ratios frameworks, trace concentrations of dissolved gases reveal nascent defects: Acetylene (C2H2) signals high-energy electrical arcing; Ethylene (C2H4) flags thermal hotspots exceeding 700°C; and Hydrogen (H2) combined with Methane (CH4) points to low-energy corona discharge.'
      }
    ]
  },
  {
    slug: 'traction-substation-notes-2x25kv-metro-rail',
    featured: false,
    title: 'Traction Power Architecture: Autotransformer Feeding Systems for Rail & Metro',
    category: 'Projects',
    date: 'July 12, 2026',
    isoDate: '2026-07-12',
    readTime: '7 min read',
    readMinutes: 7,
    tags: ['Metro & Rail', '2x25 kV', 'Traction', 'Autotransformer'],
    author: {
      name: 'Farhan Ahmed',
      role: 'Senior Power Systems Engineer',
      avatar: '/assets/images/leaders/04-chief-financial-officer.png'
    },
    image: '/assets/images/projects/metro-station-power.jpg',
    excerpt: 'High-speed rail and metro networks demand exceptional short-circuit withstand and dynamic load handling. A technical teardown of 2x25 kV autotransformer distribution and neutral-point grounding.',
    takeaways: [
      'The 2x25 kV system transmits traction power at 50 kV between feeder wire and negative feeder, cutting line losses and electromagnetic interference by 75%.',
      'Trackside autotransformers spaced every 10–15 km step down 50 kV transmission to 25 kV train catenary voltage.',
      'Transformers must withstand over 1,000 short-circuit fault cycles per year caused by pantograph flashovers and bird strikes.'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Electrified high-speed railways, intercity freight corridors, and urban rapid transit networks represent some of the most punishing duty cycles in all of heavy electrical engineering. Unlike industrial plants where power demand shifts smoothly, an electric locomotive accelerating a 4,000-tonne freight train suddenly draws 10 to 15 MVA within seconds, followed by complete load release or regenerative braking feed into the catenary.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why Modern Rail Electrification Chooses 2x25 kV'
      },
      {
        type: 'paragraph',
        text: 'In classical 1x25 kV electrification, traction substations must be spaced every 15 to 25 km to limit voltage drop along the contact wire. In contrast, the modern 2x25 kV autotransformer (AT) feeding scheme doubles the transmission voltage to 50 kV across the positive catenary feeder and negative feeder wire, while keeping the catenary-to-rail voltage at the standard 25 kV locomotive operating level.'
      },
      {
        type: 'callout',
        title: 'Loss Reduction Principle',
        text: 'Because line losses scale inversely with voltage squared (P_loss ∝ 1/V²), doubling transmission voltage to 50 kV slashes catenary I²R losses by 75% and permits substations to be spaced up to 60 km apart.'
      },
      {
        type: 'paragraph',
        text: 'BPEL manufactures robust, hermetically sealed trackside autotransformers engineered with high mechanical short-circuit withstand forces. Coils are braced with densified laminated wood pressboards and high-tensile tie rods capable of enduring repetitive electromagnetic clamping forces during catenary flashovers without structural deformation.'
      }
    ]
  },
  {
    slug: 'why-transformers-hum-acoustic-analysis-magnetostriction',
    featured: false,
    title: 'Why Transformers Hum: Acoustic Analysis, Magnetostriction & Core Clamping',
    category: 'Technology',
    date: 'June 25, 2026',
    isoDate: '2026-06-25',
    readTime: '6 min read',
    readMinutes: 6,
    tags: ['Acoustics', 'Magnetostriction', 'Low Noise', 'CRGO Steel'],
    author: {
      name: 'Dr. K. Al-Hashemi',
      role: 'Head of Magnetic Design & R&D',
      avatar: '/assets/images/leaders/02-chief-operating-officer.png'
    },
    image: '/assets/images/lifecycle/02-engineering-design.jpg',
    excerpt: 'Transformer hum is not just an annoyance in commercial basements; it is a direct sonic signature of silicon steel core magnetostriction, clamping pressure distribution, and harmonic resonance.',
    takeaways: [
      'The primary acoustic source is magnetostriction: the microscopic physical elongation and contraction of grain-oriented electrical steel sheets twice per AC cycle (100 Hz / 120 Hz fundamental).',
      'Non-linear load harmonics create higher acoustic harmonics (200 Hz, 300 Hz, 400 Hz) that penetrate concrete building structures much more aggressively.',
      'Precision step-lap miter core cutting and resilient anti-vibration tank pads reduce radiated sound power by 10 to 14 dB(A).'
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Walk into any commercial building basement, hospital mechanical room, or residential substation compound, and you will hear a characteristic low-frequency hum. While often dismissed as an unavoidable byproduct of electrical operation, transformer acoustic noise is governed by strict municipal environmental limits (such as NEMA TR-1 and IEC 60076-10 sound pressure standards) and provides critical insight into internal mechanical stress.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Origin of the Hum: Magnetostriction'
      },
      {
        type: 'paragraph',
        text: 'When alternating current magnetizes the cold-rolled grain-oriented (CRGO) steel core laminations, the magnetic domains within the crystal lattice align with the applied field. This alignment causes the steel sheet to physically stretch along the direction of flux and contract transversely. Because this dimensional change occurs regardless of whether the magnetic flux is positive or negative, the core expands and contracts twice per AC electrical cycle, generating a fundamental acoustic tone at 100 Hz (on 50 Hz grids) or 120 Hz (on 60 Hz grids).'
      },
      {
        type: 'specTable',
        caption: 'Technological Strategies for Acoustic Sound Reduction in BPEL Transformers',
        headers: ['Acoustic Source', 'Mechanical Cause', 'BPEL Engineering Countermeasure'],
        rows: [
          ['Core Magnetostriction', 'Domain rotation in steel laminations', 'Laser-scribed low-loss CRGO steel operated at ≤ 1.6 Tesla'],
          ['Lamination Joint Flutter', 'Air gap turbulence at 90° butt joints', 'Precision 45° step-lap mitered core joints with epoxy coating'],
          ['Core Clamping Resonance', 'Uneven torque across tie-rods', 'Calibrated hydraulic torque-clamping across non-magnetic flitch plates'],
          ['Tank Shell Amplification', 'Structural acoustic vibration coupling', 'Flexible internal core isolators and external anti-vibration waffle pads']
        ]
      },
      {
        type: 'paragraph',
        text: 'Through precision step-lap miter cutting and laser-etched domain refinement, BPEL low-noise substation transformers achieve sound levels 8 to 12 dB(A) below NEMA TR-1 limits, making them suitable for silent operation in hospital courtyards, luxury hotel risers, and residential podiums.'
      }
    ]
  }
];

export function getAllPosts() {
  return BLOG_POSTS;
}

export function getFeaturedPost() {
  return BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const current = getPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  return BLOG_POSTS
    .filter(p => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === current.category && b.category !== current.category) return -1;
      if (b.category === current.category && a.category !== current.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
