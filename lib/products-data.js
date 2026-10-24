/* Comprehensive Technical Specifications & Engineering Data for BPEL Transformers */

export const TRANSFORMER_DETAILS = {
  '16000-kva-oil-filled-transformer': {
    ratingMva: '16 MVA',
    powerKva: '16,000 kVA',
    voltagePrimary: '33 kV (Custom up to 35 kV)',
    voltageSecondary: '11 kV / 6.6 kV / 415 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN / ONAF Dual-Stage Forced Air',
    efficiency: '99.48% (at 75°C Reference)',
    impedance: '7.5% – 8.0% (IEC Standard)',
    vectorGroup: 'Dyn11 (Standard) / YNd11 on request',
    tapChanger: 'On-Load Tap Changer (OLTC) ±8×1.25% or Off-Circuit ±2×2.5%',
    fluidType: 'Super-Refined Naphthenic Mineral Oil (IEC 60296) or Cargill FR3 Bio-Ester',
    soundLevel: '< 62 dB(A) at 1 metre distance',
    bilImpulse: '170 kV BIL (33kV) / 75 kV BIL (11kV)',
    powerFrequencyAc: '70 kV / 28 kV (1 min withstand)',
    windingMaterial: '99.99% Electrolytic Grade OFHC Copper',
    coreMaterial: 'Hi-B Laser-Scribed CRGO Silicon Steel (JIS C 2553)',
    insulationClass: 'Class A (105°C), Winding 65K, Top Oil 60K Rise',
    tankConstruction: 'Rigid Welded Conservator Tank with Detachable Radiators & C5M Marine Coating',
    totalWeight: '~28,500 kg (Core & Windings: ~14,200 kg, Oil: ~8,200 kg)',
    dimensions: '4,850 mm (L) × 3,200 mm (W) × 3,900 mm (H)',
    noLoadLoss: '11.8 kW (Guaranteed Maximum)',
    loadLoss: '72.0 kW (at 75°C Full Load)',
    tagline: 'High-Capacity Primary Substation & Heavy Industrial Grid Transmission',
    overviewParagraph: 'The BPEL 16,000 kVA (16 MVA) oil-immersed power transformer is purpose-engineered for bulk utility step-down substations, renewable energy solar farm tie-ins, and high-demand continuous industrial manufacturing complexes. Designed with laser-scribed low-loss CRGO laminations, robust electromagnetic short-circuit mechanical bracing, and dual-speed ONAF forced-air radiators, this unit provides maximum operational efficiency and reliable continuity in tropical high-ambient conditions up to +55°C.',
    trustPills: [
      'BPDB & DESCO Utility Pre-Approved',
      'IEC 60076 & IEEE C57 Compliant',
      'ASTA / CESI / KEMA STL Witnessed',
      'EcoDesign Tier 2 Loss Performance',
      'OLTC Automated Voltage Regulation',
      'ISO 9001 / ISO 14001 / ISO 17025'
    ],
    highlights: [
      {
        title: 'Laser-Scribed Hi-B CRGO Core',
        desc: 'Built using premium Japanese laser-etched electrical steel stacked with precision step-lap miter cuts to slash no-load excitation losses and magnetostriction acoustic hum.'
      },
      {
        title: 'Dynamic Short-Circuit Withstand',
        desc: 'Rigid axial and radial clamping structure with high-density Weidmann insulation blocks, fully type-tested to endure maximum asymmetrical grid fault currents without deformation.'
      },
      {
        title: 'Dual-Stage ONAN / ONAF Cooling',
        desc: 'Removable galvanized radiator banks equipped with low-noise, temperature-triggered cooling fans providing an immediate 33% continuous overload boost during peak grid demand.'
      },
      {
        title: 'Intelligent Monitoring & SCADA Ready',
        desc: 'Equipped with multi-contact Buchholz gas relays, magnetic oil level gauges (MOG), winding temperature indicators (WTI), and optional optical fiber hot-spot sensors.'
      }
    ],
    deployments: [
      {
        title: 'Utility Grid Substations (33/11kV)',
        desc: 'Primary distribution and sub-transmission feeding municipal metropolitan zones and rural grid networks with automated tap regulation.'
      },
      {
        title: 'Steel, Cement & Heavy Industrial Plants',
        desc: 'Handles extreme cyclic inductive loads, frequent motor startups, and harmonic currents in continuous 24/7 operating environments.'
      },
      {
        title: 'Solar PV & Renewable Grid Step-Up',
        desc: 'Engineered for solar farm central inverter stations with dual low-voltage windings, electrostatic shielding, and low DC bias tolerance.'
      },
      {
        title: 'Commercial Towers & Data Hubs',
        desc: 'Delivers compact footprint, ultra-quiet sound emissions (<62 dB), and fail-safe power redundancy for mission-critical infrastructure.'
      }
    ]
  },

  '10000-kva-oil-filled-transformer': {
    ratingMva: '10 MVA',
    powerKva: '10,000 kVA',
    voltagePrimary: '33 kV / 11 kV (Custom up to 35 kV)',
    voltageSecondary: '11 kV / 6.6 kV / 415 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN / ONAF Dual-Stage Forced Air',
    efficiency: '99.40% (at 75°C Reference)',
    impedance: '6.8% – 7.2%',
    vectorGroup: 'Dyn11 / YNd11',
    tapChanger: 'On-Load Tap Changer (OLTC) ±8×1.25% or Off-Circuit ±2×2.5%',
    fluidType: 'Super-Refined Naphthenic Mineral Oil or Cargill FR3 Bio-Ester',
    soundLevel: '< 60 dB(A) at 1 metre distance',
    bilImpulse: '170 kV BIL (33kV) / 75 kV BIL (11kV)',
    powerFrequencyAc: '70 kV / 28 kV (1 min withstand)',
    windingMaterial: '99.99% Electrolytic Grade OFHC Copper',
    coreMaterial: 'Hi-B Laser-Scribed CRGO Silicon Steel',
    insulationClass: 'Class A (105°C), Winding 65K, Top Oil 60K Rise',
    tankConstruction: 'Rigid Welded Conservator Tank with Detachable Radiators & C5M Marine Coating',
    totalWeight: '~19,800 kg (Core & Windings: ~9,800 kg, Oil: ~5,600 kg)',
    dimensions: '4,200 mm (L) × 2,800 mm (W) × 3,450 mm (H)',
    noLoadLoss: '8.2 kW (Guaranteed Maximum)',
    loadLoss: '52.0 kW (at 75°C Full Load)',
    tagline: 'High-Voltage Substation & Industrial Primary Power Distribution',
    overviewParagraph: 'The BPEL 10,000 kVA (10 MVA) power transformer delivers robust, cost-effective high-voltage transformation engineered for municipal utility networks, export processing zones (EPZ), and heavy manufacturing facilities. Manufactured with vacuum oil-filling and high-temperature dielectric withstand, it ensures long-term operational peace of mind.',
    trustPills: [
      'BPDB & DESCO Utility Pre-Approved',
      'IEC 60076 & IEEE C57 Compliant',
      'ASTA / CESI / KEMA STL Witnessed',
      'EcoDesign Tier 2 Loss Performance',
      'Automated Voltage Regulation',
      'ISO 9001 / ISO 14001 / ISO 17025'
    ],
    highlights: [
      {
        title: 'Precision CRGO Core Geometry',
        desc: 'Advanced 45-degree mitered step-lap core stacking minimizes flux leakage, acoustic emission, and core excitation current.'
      },
      {
        title: 'Thermal Resilience Under High Ambient',
        desc: 'Optimized internal oil duct channels ensure rapid thermal siphon dissipation even when operating under sustained 50°C summer conditions.'
      },
      {
        title: 'Automated Tap-Changing Architecture',
        desc: 'Optional high-speed vacuum OLTC integrates seamlessly with substation SCADA for automated busbar voltage stabilisation.'
      },
      {
        title: 'Full Dielectric Protection Suite',
        desc: 'Includes double-float Buchholz relay, pressure relief device (PRD) with directional deflector, and dehydrated silica gel breather.'
      }
    ],
    deployments: [
      {
        title: 'Regional 33/11kV Substation Hubs',
        desc: 'Stepping down bulk grid transmission lines to 11kV distribution feeders with minimum system line loss.'
      },
      {
        title: 'Textile, Spinning & Garment Mills',
        desc: 'Supplies continuous, surge-tolerant electrical power to massive motor drives and automated weaving machines.'
      },
      {
        title: 'Centralized Solar Farms',
        desc: 'Efficient collection and step-up of multiple inverter strings for direct transmission into the national grid.'
      },
      {
        title: 'Chemical & Industrial Facilities',
        desc: 'Robust sealed tank with epoxy anti-corrosive paint designed to withstand airborne industrial contaminants.'
      }
    ]
  },

  '6000-kva-oil-filled-transformer': {
    ratingMva: '6 MVA',
    powerKva: '6,000 kVA',
    voltagePrimary: '33 kV / 11 kV',
    voltageSecondary: '11 kV / 6.6 kV / 415 V',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN / ONAF',
    efficiency: '99.31%',
    impedance: '6.25%',
    vectorGroup: 'Dyn11',
    tapChanger: 'Off-Circuit Tap Switch ±2×2.5% or OLTC',
    fluidType: 'Naphthenic Mineral Oil or Bio-Ester Fluid',
    soundLevel: '< 58 dB(A)',
    bilImpulse: '170 kV / 75 kV',
    powerFrequencyAc: '70 kV / 28 kV',
    windingMaterial: 'Electrolytic OFHC Copper',
    coreMaterial: 'Cold Rolled Grain-Oriented (CRGO) Steel',
    insulationClass: 'Class A, Winding 65K Rise',
    tankConstruction: 'Corrugated Radiator Tank with Anti-Corrosion Finish',
    totalWeight: '~13,500 kg',
    dimensions: '3,650 mm (L) × 2,450 mm (W) × 3,100 mm (H)',
    noLoadLoss: '5.6 kW',
    loadLoss: '36.0 kW',
    tagline: 'Medium-Power Distribution for Industrial Parks & Utility Nodes',
    overviewParagraph: 'The BPEL 6,000 kVA distribution unit balances high MVA capability with compact physical dimensions, making it the ideal workhorse for industrial feeder substations, dedicated captive power plants, and utility feeder reinforcement.',
    trustPills: [
      'Utility Approved Standard',
      'IEC 60076 Certified',
      'High Short-Circuit Strength',
      'Low Lifecycle Loss Guarantee',
      'ISO 9001:2015 Registered'
    ],
    highlights: [
      {
        title: 'Compact Footprint & Easy Rigging',
        desc: 'Optimized tank envelope and bidirectional roller wheels allow rapid installation on standard civil substation plinths.'
      },
      {
        title: 'Hermetic or Conservator Configuration',
        desc: 'Available as a hermetically sealed corrugated unit (zero maintenance) or conservator type with silica gel breather.'
      },
      {
        title: 'Precision Copper Winding Layers',
        desc: 'Continuously transposed conductors with thermally upgraded diamond-dotted paper insulation to eliminate localized hotspots.'
      },
      {
        title: 'Factory Type-Tested Integrity',
        desc: 'Every unit passes full routine testing including induced overvoltage, separate source AC, and loss verification before shipment.'
      }
    ],
    deployments: [
      { title: 'Industrial Manufacturing Hubs', desc: 'Continuous 3-shift power for fabrication lines, extruders, and furnaces.' },
      { title: 'Commercial Business Parks', desc: 'High-density commercial power distribution with low noise emission.' },
      { title: 'Substation Ring-Main Feeds', desc: 'Utility distribution nodes providing resilient secondary loop feeds.' },
      { title: 'Water Pumping & Utility Complexes', desc: 'Reliable step-down for high-power submersible pumps and filtration systems.' }
    ]
  },

  '5000-kva-oil-filled-transformer': {
    ratingMva: '5 MVA',
    powerKva: '5,000 kVA',
    voltagePrimary: '33 kV / 11 kV',
    voltageSecondary: '415 V (0.4 kV) / 6.6 kV',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN (Natural Convection)',
    efficiency: '99.29%',
    impedance: '6.0%',
    vectorGroup: 'Dyn11',
    tapChanger: 'Off-Circuit Tap Switch ±2×2.5%',
    fluidType: 'Naphthenic Mineral Oil or Envirotemp FR3 Bio-Fluid',
    soundLevel: '< 56 dB(A)',
    bilImpulse: '170 kV (33kV) / 75 kV (11kV)',
    powerFrequencyAc: '70 kV / 28 kV',
    windingMaterial: 'Electrolytic Copper Windings',
    coreMaterial: 'Cold Rolled Grain-Oriented Silicon Steel',
    insulationClass: 'Class A, 65K/60K Temperature Rise',
    tankConstruction: 'Corrugated Hermetically Sealed Tank',
    totalWeight: '~11,800 kg',
    dimensions: '3,400 mm (L) × 2,300 mm (W) × 2,950 mm (H)',
    noLoadLoss: '4.8 kW',
    loadLoss: '31.0 kW',
    tagline: 'Hermetically Sealed Corrugated Tank Distribution Transformer',
    overviewParagraph: 'The BPEL 5,000 kVA hermetically sealed transformer eliminates gas cushion contact with the atmosphere, preventing oil degradation and completely removing the need for periodic oil sampling or maintenance over its operating life.',
    trustPills: [
      'Hermetically Sealed Design',
      'Zero Maintenance Corrugated Tank',
      'IEC 60076 Compliant',
      'Pre-Approved Utility Standard',
      'ISO 9001 Quality Assured'
    ],
    highlights: [
      {
        title: 'Maintenance-Free Corrugated Tank',
        desc: 'Flexible elastic corrugated fin walls expand and contract with thermal oil expansion, maintaining airtight hermetic isolation.'
      },
      {
        title: 'Integrated Multifunction Protection',
        desc: 'Equipped with a compact multifunction protection relay (DMCR/RIS) monitoring internal pressure, temperature, and oil level.'
      },
      {
        title: 'High Short-Circuit Fault Survival',
        desc: 'Circular concentric coil geometry with epoxy-bonded winding spacers withstands severe low-voltage short-circuit currents.'
      },
      {
        title: 'Eco-Friendly Bio-Ester Ready',
        desc: '100% compatible with natural ester fluids for enhanced fire safety in sensitive industrial and commercial indoor vaults.'
      }
    ],
    deployments: [
      { title: 'Commercial High-Rise Towers', desc: 'Basement and rooftop indoor transformer rooms with low acoustic impact.' },
      { title: 'Industrial Processing Facilities', desc: 'Maintenance-free power distribution in dusty or chemical factory environments.' },
      { title: 'Metro Station Substations', desc: 'Compact footprint substations delivering traction and station utility power.' },
      { title: 'Hospital & Healthcare Campuses', desc: 'High-availability low-voltage power supply for critical healthcare systems.' }
    ]
  },

  '4000-kva-oil-filled-transformer': {
    ratingMva: '4 MVA',
    powerKva: '4,000 kVA',
    voltagePrimary: '33 kV / 11 kV',
    voltageSecondary: '415 V (0.4 kV)',
    frequency: '50 Hz / 60 Hz',
    coolingType: 'ONAN',
    efficiency: '99.24%',
    impedance: '5.75%',
    vectorGroup: 'Dyn11',
    tapChanger: 'Off-Circuit Tap Switch ±2×2.5%',
    fluidType: 'Naphthenic Mineral Oil (IEC 60296)',
    soundLevel: '< 55 dB(A)',
    bilImpulse: '170 kV (33kV) / 75 kV (11kV)',
    powerFrequencyAc: '70 kV / 28 kV',
    windingMaterial: 'Electrolytic Copper Windings',
    coreMaterial: 'Low-Loss CRGO Silicon Steel',
    insulationClass: 'Class A, 65K/60K Temperature Rise',
    tankConstruction: 'Corrugated Sealed Tank with Powder-Coated Finish',
    totalWeight: '~9,600 kg',
    dimensions: '3,150 mm (L) × 2,100 mm (W) × 2,750 mm (H)',
    noLoadLoss: '4.1 kW',
    loadLoss: '26.5 kW',
    tagline: 'Standard Industrial & Commercial Distribution Workhorse',
    overviewParagraph: 'The BPEL 4,000 kVA transformer is engineered for dedicated industrial process lines, commercial real estate complexes, and urban distribution substations requiring dependable 415V three-phase power.',
    trustPills: [
      'Compact Plinth Dimensions',
      'Corrugated Hermetic Tank',
      'Low Operating Noise',
      'IEC 60076 Standard',
      'Rapid Factory Dispatch'
    ],
    highlights: [
      {
        title: 'Optimized Energy Efficiency',
        desc: 'Exceeds standard distribution loss thresholds, delivering substantial 20-year savings on utility electrical bills.'
      },
      {
        title: 'Hermetically Sealed Construction',
        desc: 'Protects internal dielectric fluid from ambient humidity and oxygen, eliminating oil oxidation and sludging.'
      },
      {
        title: 'Dual-Voltage Flexibility',
        desc: 'Can be configured with dual primary voltage taps (e.g. 33kV and 11kV) to allow future grid transition.'
      },
      {
        title: 'Turnkey Commissioning Ready',
        desc: 'Pre-filled with tested dielectric oil, factory tested, and ready for immediate plinth connection upon arrival on site.'
      }
    ],
    deployments: [
      { title: 'Factory Production Lines', desc: 'Dedicated step-down feed for heavy machine tools and assembly robots.' },
      { title: 'Shopping Malls & Retail Plazas', desc: 'Handles cyclic air-conditioning and lighting loads with high stability.' },
      { title: 'Residential Micro-Grid Nodes', desc: 'Feeds residential subdivisions with quiet, low-vibration performance.' },
      { title: 'Public Infrastructure Buildings', desc: 'Reliable primary transformer for government secretariats and universities.' }
    ]
  },

  /* Emirates Transformer & Switchgear Catalogue Products */
  'pad-mounted-transformers': {
    "ratingMva": "300 kVA – 5 MVA (up to 10 MVA)",
    "powerKva": "300 kVA – 5 MVA (up to 10 MVA)",
    "voltagePrimary": "≤36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance pad mounted transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance pad mounted transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, UL Listed, IEEE / ANSI, CSA), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "UL Listed",
        "ANSI/IEEE",
        "IEC Certified",
        "UL Listed Certified",
        "IEEE / ANSI Certified",
        "CSA Certified"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and UL Listed and IEEE / ANSI and CSA specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'medium-power-transformers-gsu': {
    "ratingMva": "Up to 150 MVA",
    "powerKva": "Up to 150 MVA",
    "voltagePrimary": "Up to 220 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / KNAN / ONAF / KNAF / ODAF / OFAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "650 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance medium power transformers (gsu) engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance medium power transformers (gsu) engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, IEEE / ANSI), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Tested",
        "IEC + ANSI",
        "IEC Certified",
        "IEEE / ANSI Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and IEEE / ANSI specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'ehv-power-transformers': {
    "ratingMva": "Up to 300 MVA",
    "powerKva": "Up to 300 MVA",
    "voltagePrimary": "220–400 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / KNAN / ONAF / KNAF / ODAF / OFAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "1050 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance ehv power transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance ehv power transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, IEEE / ANSI), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Tested",
        "EHV Class",
        "IEC Certified",
        "IEEE / ANSI Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and IEEE / ANSI specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Transmission Infrastructure",
            "desc": "Field-proven for transmission operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Generation Infrastructure",
            "desc": "Field-proven for generation operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'inverter-duty-transformers': {
    "ratingMva": "500 kVA – 20 MVA",
    "powerKva": "500 kVA – 20 MVA",
    "voltagePrimary": "Up to 36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance inverter duty transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance inverter duty transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, IEEE / ANSI), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Converter Duty",
        "Low THD",
        "IEC Certified",
        "IEEE / ANSI Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and IEEE / ANSI specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Renewable Energy Infrastructure",
            "desc": "Field-proven for renewable energy operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'solar-pv-transformers': {
    "ratingMva": "200 kVA–15 MVA",
    "powerKva": "200 kVA–15 MVA",
    "voltagePrimary": "Up to 36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance solar pv transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance solar pv transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Renewable",
        "Low THD",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Renewable Energy Infrastructure",
            "desc": "Field-proven for renewable energy operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'bess-transformers': {
    "ratingMva": "1–300 MVA",
    "powerKva": "1–300 MVA",
    "voltagePrimary": "Up to 132 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / KNAN / ONAF / KNAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance bess transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance bess transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "BESS",
        "Bidirectional",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "BESS Infrastructure",
            "desc": "Field-proven for bess operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Renewable Energy Infrastructure",
            "desc": "Field-proven for renewable energy operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'distribution-transformers': {
    "ratingMva": "Up to 5 MVA",
    "powerKva": "Up to 5 MVA",
    "voltagePrimary": "≤36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance distribution transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance distribution transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Type Tested",
        "Low Loss",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'cast-resin-dry-type-transformers': {
    "ratingMva": "Up to 25 MVA",
    "powerKva": "Up to 25 MVA",
    "voltagePrimary": "Up to 36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "AN (Air Natural) / AF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Zero-Oil Epoxy Resin Cast",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class F (155°C) / Class H (180°C)",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance cast resin dry type transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance cast resin dry type transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Zero Oil",
        "Indoor Rated",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Data Centre Infrastructure",
            "desc": "Field-proven for data centre operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Hospital Infrastructure",
            "desc": "Field-proven for hospital operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'package-substation-transformers': {
    "ratingMva": "300 kVA – 5 MVA",
    "powerKva": "300 kVA – 5 MVA",
    "voltagePrimary": "≤72 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / ONAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance package substation transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance package substation transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Factory Tested",
        "Rapid Deploy",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'containerized-substation': {
    "ratingMva": "500 kVA – 5 MVA",
    "powerKva": "500 kVA – 5 MVA",
    "voltagePrimary": "Up to 36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance containerized substation engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance containerized substation engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, UL Listed, IEEE / ANSI, CSA), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Plug & Play",
        "UL Certified",
        "IEC Certified",
        "UL Listed Certified",
        "IEEE / ANSI Certified",
        "CSA Certified"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and UL Listed and IEEE / ANSI and CSA specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'special-transformers': {
    "ratingMva": "50 kVA – 100 MVA",
    "powerKva": "50 kVA – 100 MVA",
    "voltagePrimary": "Up to 220 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "650 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance special transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance special transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, IEEE / ANSI, ATEX / IECEx), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Custom-Engineered",
        "10 Variants",
        "IEC Certified",
        "IEEE / ANSI Certified",
        "ATEX / IECEx Certified",
        "100% FAT Witness Access"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and IEEE / ANSI and ATEX / IECEx specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'auxiliary-transformers': {
    "ratingMva": "50 kVA – 2 MVA",
    "powerKva": "50 kVA – 2 MVA",
    "voltagePrimary": "Up to 36 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / KNAN / ONAF / KNAF / ODAF / OFAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance auxiliary transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance auxiliary transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, IEEE / ANSI), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "Station Service",
        "Multi-Winding",
        "IEC Certified",
        "IEEE / ANSI Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and IEEE / ANSI specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'oil-and-gas-transformers': {
    "ratingMva": "100 kVA – 40 MVA",
    "powerKva": "100 kVA – 40 MVA",
    "voltagePrimary": "Up to 72 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "ONAN / KNAN / ONAF / KNAF",
    "efficiency": "99.45% (High Efficiency Eco-Design)",
    "impedance": "4.5% – 8.0% (IEC 60076-5)",
    "vectorGroup": "Dyn11 / YNd11 / Custom",
    "tapChanger": "Off-Circuit Tap Switch ±2×2.5% or OLTC ±8×1.25%",
    "fluidType": "Super-Refined Naphthenic Mineral Oil or Bio-Ester FR3",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Hi-B Laser-Scribed CRGO Silicon Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Rigid Welded Tank with C5M Anti-Corrosion Paint",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Tier 2 EcoDesign Compliant",
    "loadLoss": "Optimized Full Load Losses",
    "tagline": "High-performance oil & gas transformers engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance oil & gas transformers engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC, ATEX / IECEx), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "ATEX Certified",
        "Explosion-Proof",
        "IEC Certified",
        "ATEX / IECEx Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC and ATEX / IECEx specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Oil & Gas Infrastructure",
            "desc": "Field-proven for oil & gas operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Generation Infrastructure",
            "desc": "Field-proven for generation operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'mv-switchgear-eclipse-range': {
    "ratingMva": "630 / 1250 / 2000 A",
    "powerKva": "Industrial Spec",
    "voltagePrimary": "12 kV",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "AN (Air Natural)",
    "efficiency": "Low Contact Resistance (<15µΩ)",
    "impedance": "Busbar 63kA / 1s withstand",
    "vectorGroup": "Three-Phase 3-Wire / 4-Wire",
    "tapChanger": "Integrated Motorized Mechanism",
    "fluidType": "Air Insulated / SF6-Free Vacuum",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Epoxy Coated Busbars & Structural Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Heavy Duty Powder Coated Galvanized Steel (IP43–IP65)",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Minimal Idle Loss",
    "loadLoss": "Low Temperature Rise at Rated In",
    "tagline": "High-performance mv switchgear — eclipse range engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance mv switchgear — eclipse range engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "SF6-Free",
        "IEC 62271",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
},
  'lv-switchgear-and-control-panels': {
    "ratingMva": "Standard Class",
    "powerKva": "160 – 4000 A",
    "voltagePrimary": "433V AC",
    "voltageSecondary": "415 V / 433 V / 11 kV (Project Sized)",
    "frequency": "50 Hz / 60 Hz Dual Compatible",
    "coolingType": "AN (Air Natural)",
    "efficiency": "Low Contact Resistance (<15µΩ)",
    "impedance": "Busbar 63kA / 1s withstand",
    "vectorGroup": "Three-Phase 3-Wire / 4-Wire",
    "tapChanger": "Integrated Motorized Mechanism",
    "fluidType": "Air Insulated / SF6-Free Vacuum",
    "soundLevel": "< 60 dB(A) at 1 metre",
    "bilImpulse": "170 kV BIL",
    "powerFrequencyAc": "70 kV / 28 kV (1 min withstand)",
    "windingMaterial": "99.99% Electrolytic Grade OFHC Copper",
    "coreMaterial": "Epoxy Coated Busbars & Structural Steel",
    "insulationClass": "Class A (105°C), Winding 65K, Top Oil 60K Rise",
    "tankConstruction": "Heavy Duty Powder Coated Galvanized Steel (IP43–IP65)",
    "totalWeight": "Custom Engineered by Project Scope",
    "dimensions": "Optimized footprint according to site foundation",
    "noLoadLoss": "Minimal Idle Loss",
    "loadLoss": "Low Temperature Rise at Rated In",
    "tagline": "High-performance lv switchgear & control panels engineered to international standards for critical power infrastructure.",
    "overviewParagraph": "High-performance lv switchgear & control panels engineered to international standards for critical power infrastructure. Engineered specifically to stringent international criteria (IEC), featuring heavy-duty materials, dynamic short-circuit mechanical bracing, and proven longevity under extreme operating conditions.",
    "trustPills": [
        "IEC 61439",
        "IP65",
        "IEC Certified",
        "100% FAT Witness Access",
        "ASTA / CESI / KEMA Tested Basis",
        "ISO 9001 / ISO 14001 / ISO 45001"
    ],
    "highlights": [
        {
            "title": "Precision Structural Integrity",
            "desc": "Fabricated using certified steel and premium grade conductors to guarantee operational longevity and resist harsh environmental exposure."
        },
        {
            "title": "Rigorous Type Testing & FAT",
            "desc": "Each unit undergoes full routine and type test protocols in certified testing laboratories before dispatch."
        },
        {
            "title": "Thermal & Harmonic Stability",
            "desc": "Engineered with high thermal reserve margins to withstand peak loading, rapid duty cycles, and harmonics without overheating."
        },
        {
            "title": "Standard Compliance",
            "desc": "Built strictly compliant to IEC specifications with complete test certificates."
        }
    ],
    "deployments": [
        {
            "title": "Utility / Grid Infrastructure",
            "desc": "Field-proven for utility / grid operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Industrial Infrastructure",
            "desc": "Field-proven for industrial operations requiring 24/7 reliability, safety, and seamless power distribution."
        },
        {
            "title": "Commercial Infrastructure",
            "desc": "Field-proven for commercial operations requiring 24/7 reliability, safety, and seamless power distribution."
        }
    ]
  }
};
