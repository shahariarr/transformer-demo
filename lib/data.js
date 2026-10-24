import etsProductsList from './ets-products.json';

/* All editable content lives here. To use a real photo, set `image` to a file
   path (e.g. '/assets/images/products/power-transformers.jpg'). Empty `image`
   shows a clearly labelled placeholder that names the suggested file. */
/* URL slug from a display name, e.g. '16000 Kva Oil-filled Transformer' -> '16000-kva-oil-filled-transformer' */
export const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const ETS_FORMATTED = etsProductsList.map(p => ({
  name: p.name,
  cat: p.cat || (p.division === 'Switchgear' ? 'Switchgear' : 'Transformers'),
  image: p.image,
  desc: p.desc,
  specs: p.specs,
  dir: 'products',
  slug: p.slug
}));

export const DATA = {
  contact: {
    email: 'info@bpel-power.com',
    whatsapp: '8801713000001',
    phoneDisplay: '+880 2 988 5601',
    address: 'Level 11, BPEL Tower, Plot 34, Gulshan South Avenue, Gulshan-1, Dhaka 1212',
    waMessage: 'Hello, I would like to discuss a power engineering transformer project with BPEL.',
    emailSubject: 'Project Inquiry - Basic Power Engineering Ltd'
  },

  products: [
    ...ETS_FORMATTED,
    { name: '16000 kVA Oil-Filled Transformer', cat: 'Transformers', hint: 'oil-immersed-transformer.png',
      image: '/assets/images/products/oil-immersed-transformer.png',
      desc: '16,000 kVA high-efficiency oil-immersed distribution transformer with low-loss core and robust thermal performance.',
      specs: [
        'Coil Material: Copper / Aluminum',
        'Primary Voltage: 10 – 35 kV',
        'Rated Frequency: 50 Hz / 60 Hz',
        'Cooling Method: ONAN / ONAF'
      ] },
    { name: '10000 kVA Oil-Filled Transformer', cat: 'Transformers', hint: 'power-transformer.png',
      image: '/assets/images/products/power-transformer.png',
      desc: '10,000 kVA power transformer engineered for high-voltage substations and continuous industrial transmission.',
      specs: [
        'Coil Material: Copper / Aluminum',
        'Primary Voltage: 10 – 35 kV',
        'Rated Frequency: 50 Hz / 60 Hz',
        'Cooling Method: ONAN / ONAF'
      ] },
    { name: '6000 kVA Oil-Filled Transformer', cat: 'Transformers', hint: 'distribution-transformer.png',
      image: '/assets/images/products/distribution-transformer.png',
      desc: '6,000 kVA distribution transformer featuring corrugated cooling fins for superior heat dissipation.',
      specs: [
        'Coil Material: Copper / Aluminum',
        'Primary Voltage: 10 – 35 kV',
        'Rated Frequency: 50 Hz / 60 Hz',
        'Cooling Method: ONAN / ONAF'
      ] },
    { name: '5000 kVA Oil-Filled Transformer', cat: 'Transformers', hint: 'hermetically-sealed-transformer.png',
      image: '/assets/images/products/hermetically-sealed-transformer.png',
      desc: '5,000 kVA hermetically sealed transformer with integrated control box and corrugated tank structure.',
      specs: [
        'Coil Material: Copper / Aluminum',
        'Primary Voltage: 33 kV / 35 kV',
        'Rated Frequency: 50 Hz / 60 Hz',
        'Cooling Method: ONAN / ONAF'
      ] },
    { name: '4000 kVA Oil-Filled Transformer', cat: 'Transformers', hint: '4000kva-oil-filled-transformer.png',
      image: '/assets/images/products/4000kva-oil-filled-transformer.png',
      desc: '4,000 kVA liquid-filled industrial transformer designed for dedicated factory and commercial power systems.',
      specs: [
        'Coil Material: Copper / Aluminum',
        'Primary Voltage: 10 – 35 kV',
        'Rated Frequency: 50 Hz / 60 Hz',
        'Cooling Method: ONAN / ONAF'
      ] }
  ].map(p => ({ ...p, dir: 'products', slug: p.slug || slugify(p.name) })),

  industries: [
    { name: 'Power Utilities & Grid Infrastructure', hint: 'utilities-grid.jpg',
      image: '/assets/images/industries/utilities-grid.jpg',
      desc: 'Equipment for substations and distribution networks.' },
    { name: 'Manufacturing & Industrial Facilities', hint: 'manufacturing.jpg',
      image: '/assets/images/industries/manufacturing.jpg',
      desc: 'Reliable supply for production lines and plant loads.' },
    { name: 'Textile & Garment Industries', hint: 'textile-garment.jpg',
      image: '/assets/images/industries/textile-garment.jpg',
      desc: 'Power distribution for high-load, continuous operations.' },
    { name: 'Commercial Buildings & Real Estate', hint: 'commercial-buildings.jpg',
      image: '/assets/images/industries/commercial-buildings.jpg',
      desc: 'Substations and panels for offices, malls and towers.' },
    { name: 'Hospitals & Healthcare Facilities', hint: 'healthcare.jpg',
      image: '/assets/images/industries/healthcare.jpg',
      desc: 'Dependable power for critical care environments.' },
    { name: 'Water Treatment & Public Infrastructure', hint: 'water-treatment.jpg',
      image: '/assets/images/industries/water-treatment.jpg',
      desc: 'Electrical systems for pumping and treatment plants.' },
    { name: 'Transportation & Metro Infrastructure', hint: 'metro-transport.jpg',
      image: '/assets/images/industries/metro-transport.jpg',
      desc: 'Traction and station power for rail and transit.' },
    { name: 'Energy & Renewable Power', hint: 'renewable-energy.jpg',
      image: '/assets/images/industries/renewable-energy.jpg',
      desc: 'Grid connection equipment for solar and other generation.' }
  ].map(p => ({ ...p, dir: 'industries', slug: slugify(p.name) })),

  projects: [
    { title: 'Electrical Substation Installation', cat: 'Substations', hint: 'substation-installation.jpg',
      image: '/assets/images/projects/substation-installation.jpg',
      location: 'Dhaka, Bangladesh',
      scope: '33/11kV Turnkey Substation',
      specs: '2× 20 MVA • SCADA Automated • Complete GIS Switchgear',
      desc: 'Complete turnkey engineering, civil foundation works, transformer placement, GIS switchgear coupling, and protection system energisation for a municipal distribution substation.' },
    { title: 'Industrial Transformer Supply', cat: 'Transformers', hint: 'industrial-transformer-supply.jpg',
      image: '/assets/images/projects/industrial-transformer-supply.jpg',
      location: 'Chattogram, Bangladesh',
      scope: 'Heavy Industrial Power Feed',
      specs: '35kV Oil-Immersed • OLTC • Low-Loss Magnetic Core',
      desc: 'Delivery and site rigging of custom heavy-duty power transformers designed with automated on-load tap changers to handle severe cyclic motor-starting loads.' },
    { title: 'Medium-Voltage Switchgear Installation', cat: 'Switchgear', hint: 'mv-switchgear-installation.jpg',
      image: '/assets/images/projects/mv-switchgear-installation.jpg',
      location: 'Gazipur, Bangladesh',
      scope: 'Industrial Distribution Hub',
      specs: '11kV Vacuum Breakers • Arc-Resistant Panels',
      desc: 'Installation, busbar alignment, secondary wiring, and functional relay testing of metal-clad medium-voltage switchgear panels for an industrial manufacturing facility.' },
    { title: 'Commercial Building Power Infrastructure', cat: 'Commercial', hint: 'commercial-power.jpg',
      image: '/assets/images/projects/commercial-power.jpg',
      location: 'Sylhet, Bangladesh',
      scope: 'Integrated Building Network',
      specs: 'Cast Resin Dry-Type • Low Acoustic Noise • Compact',
      desc: 'Indoor substation installation featuring fire-retardant cast resin dry-type transformers, busduct risers, and power factor correction units tailored for commercial architecture.' },
    { title: 'Water Treatment Plant Electrical Systems', cat: 'Public Infrastructure', hint: 'water-plant-electrical.jpg',
      image: '/assets/images/projects/water-plant-electrical.jpg',
      location: 'Khulna, Bangladesh',
      scope: 'Municipal Pumping Infrastructure',
      specs: 'Harmonic Filters • VFD Inverter Feeds • Dual Redundant',
      desc: 'Turnkey motor control center (MCC), step-down transformers, and automated failover power systems ensuring 24/7 continuous water pumping and filtration operations.' },
    { title: 'Metro Station Power Infrastructure', cat: 'Transit Power', hint: 'metro-station-power.jpg',
      image: '/assets/images/projects/metro-station-power.jpg',
      location: 'Dhaka, Bangladesh',
      scope: 'Urban Transit Electrification',
      specs: 'Dual Redundant Feeds • Traction Auxiliary Substations',
      desc: 'Engineering and deployment of high-reliability auxiliary substations providing synchronized power distribution for passenger concourses, signaling, and traction substations.' }
  ].map(p => ({ ...p, dir: 'projects', slug: slugify(p.title) })),

  lifecycle: [
    {
      id: 1,
      phase: 'Stage 01',
      chipText: 'Requirement',
      title: 'Requirement & Project Approval',
      tagline: 'Feasibility Assessment & Commercial Alignment',
      summary: 'Collaborative engineering consultation to evaluate grid connection criteria, load demand sizing, site constraints, and statutory utility approvals.',
      image: '/assets/images/lifecycle/01-requirement-approval.jpg',
      duration: 'Weeks 1–2',
      milestone: 'Approved Project Charter',
      accentColor: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      bgTint: 'rgba(56, 189, 248, 0.1)',
      points: [
        'Initial client consultation & site requirement survey',
        'Load flow, fault level & harmonic demand assessment',
        'Formal scope definition & turnkey EPC budget baseline',
        'Technical & commercial sign-off by licensed engineers'
      ]
    },
    {
      id: 2,
      phase: 'Stage 02',
      chipText: 'Engineering',
      title: 'Engineering & Detailed Design',
      tagline: 'Custom CAD Schematics & Electrical Simulation',
      summary: 'Translating project requirements into precision 3D CAD models, single-line diagrams (SLD), protection coordination studies, and foundation layouts.',
      image: '/assets/images/lifecycle/02-engineering-design.jpg',
      duration: 'Weeks 3–5',
      milestone: 'Issued For Construction (IFC)',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      bgTint: 'rgba(16, 185, 129, 0.1)',
      points: [
        'Detailed electrical single-line & wiring schematics',
        'Thermal gradient, magnetic loss & short-circuit simulation',
        'Custom equipment sizing (MVA, BIL, Impedance, OLTC)',
        'Client & regulatory authority drawing approval'
      ]
    },
    {
      id: 3,
      phase: 'Stage 03',
      chipText: 'Planning',
      title: 'Planning & Material Procurement',
      tagline: 'Certified Raw Materials & Supply Chain Control',
      summary: 'Rigorous sourcing of laser-cut CRGO silicon steel, 99.99% pure electrolytic copper, and certified mineral or ester oils from vetted global mills.',
      image: '/assets/images/lifecycle/03-procurement-planning.jpg',
      duration: 'Weeks 6–7',
      milestone: 'Verified Bill of Materials (BOM)',
      accentColor: '#eab308',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      bgTint: 'rgba(234, 179, 8, 0.1)',
      points: [
        'High-grade CRGO electrical steel core procurement',
        'Oxygen-free electrolytic copper winding conductor sourcing',
        'Vetted European/Japanese OLTC and bushing accessories',
        'Comprehensive raw material quality audit & traceability'
      ]
    },
    {
      id: 4,
      phase: 'Stage 04',
      chipText: 'Manufacturing',
      title: 'Manufacturing & Factory Testing (FAT)',
      tagline: 'Precision Assembly & Impulse Laboratory Verification',
      summary: 'Automated step-lap core stacking, constant-tension coil winding, vacuum pressure drying, and 100% full-scale FAT testing with customer witness.',
      image: '/assets/images/lifecycle/04-manufacturing-fat.jpg',
      duration: 'Weeks 8–12',
      milestone: 'FAT Factory Acceptance Certificate',
      accentColor: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      bgTint: 'rgba(249, 115, 22, 0.12)',
      points: [
        'Automated step-lap core assembly & coil winding',
        'High-vacuum drying ovens & oil impregnation (VPI)',
        'Full FAT battery (routine, temperature rise, lightning impulse)',
        'Official inspection sign-off & export-grade packaging'
      ]
    },
    {
      id: 5,
      phase: 'Stage 05',
      chipText: 'Site Delivery',
      title: 'Site Delivery & Civil Installation',
      tagline: 'Heavy-Rigging & Substation Placement',
      summary: 'Specialized low-bed hydraulic logistics, certified mobile crane hoisting onto concrete foundations, and precision busbar/cable coupling.',
      image: '/assets/images/lifecycle/05-site-installation.jpg',
      duration: 'Weeks 13–15',
      milestone: 'Site Mechanical Completion',
      accentColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      bgTint: 'rgba(239, 68, 68, 0.1)',
      points: [
        'Multi-axle heavy transport with digital impact recorders',
        'Engineered mobile crane rigging onto substation plinths',
        'Radiator, conservator, bushing & switchgear coupling',
        'High-voltage cabling, surge arresters & earthing grid bond'
      ]
    },
    {
      id: 6,
      phase: 'Stage 06',
      chipText: 'On-Site Testing',
      title: 'On-Site Testing & Commissioning',
      tagline: 'Dielectric Verification & System Energisation',
      summary: 'Comprehensive SAT testing, primary injection, protection relay tripping matrix validation, and supervised step-by-step grid synchronisation.',
      image: '/assets/images/lifecycle/06-testing-commissioning.jpg',
      duration: 'Weeks 16–17',
      milestone: 'Grid Energisation Certificate',
      accentColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      bgTint: 'rgba(168, 85, 247, 0.1)',
      points: [
        'Oil breakdown voltage (BDV) & moisture content testing',
        'Winding insulation resistance & SFRA frequency response',
        'Protective relay scheme calibration & interlock verification',
        'First-time energisation & 24-hour no-load thermal monitoring'
      ]
    },
    {
      id: 7,
      phase: 'Stage 07',
      chipText: 'Handover, Training',
      title: 'Handover, Training & Lifecycle Care',
      tagline: 'As-Built Documentation & Ongoing Support',
      summary: 'Delivery of complete as-built documentation, O&M manuals, SCADA telemetry integration, client operations training, and long-term warranty.',
      image: '/assets/images/lifecycle/07-handover-documentation.jpg',
      duration: 'Week 18 & Beyond',
      milestone: 'Final Commercial Acceptance (COD)',
      accentColor: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      bgTint: 'rgba(6, 182, 212, 0.1)',
      points: [
        'Full as-built engineering drawings & test dossiers',
        'Client operator hands-on training for OLTC and relays',
        'SCADA telemetry commissioning & remote diagnostics setup',
        'Comprehensive warranty coverage and rapid emergency SLA'
      ]
    }
  ],

  faq: [
    { q: 'What types of transformers do you offer?', a: 'Our demo catalogue lists power, distribution, dry-type and oil-immersed transformers. The final range will be confirmed once company details are supplied.' },
    { q: 'Can you provide complete substation solutions?', a: 'Substation engineering is part of the services shown on this site. Tell us your requirement and we will confirm what can be supplied for it.' },
    { q: 'Do you support engineering, installation and commissioning?', a: 'The project lifecycle on this page shows how engineering, installation and commissioning typically fit together. Scope for a specific project is agreed during consultation.' },
    { q: 'Can products be configured for project-specific requirements?', a: 'Requirements differ between sites, so please share your load, voltage and site details and our team will discuss what is possible.' },
    { q: 'What information is required to request a quotation?', a: 'Typically the equipment type, capacity and voltage levels, project location, and any applicable standards or drawings. Send what you have; we can ask for the rest.' },
    { q: 'How can I discuss a project with your team?', a: 'Use the contact form, email or WhatsApp in the Contact section. These details are placeholders until the company supplies its own.' }
  ]
};

export function waLink() {
  const c = DATA.contact;
  return `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}`;
}

export function mailLink(body = '') {
  const c = DATA.contact;
  return `mailto:${c.email}?subject=${encodeURIComponent(c.emailSubject)}${body ? '&body=' + encodeURIComponent(body) : ''}`;
}
