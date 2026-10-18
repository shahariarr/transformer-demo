/* Services: overview cards + detail pages (/services/[slug]) */
export const SERVICES = [
  {
    slug: 'equipment-supply',
    title: 'Equipment Supply',
    short: 'Transformers, substations and switchgear specified, built and delivered to your project schedule.',
    image: '/assets/images/lifecycle/03-procurement-planning.jpg',
    intro: 'We supply power and distribution transformers, compact substations and medium-voltage switchgear built to your drawings, standards and site conditions, with one team accountable from enquiry to delivery.',
    includes: [
      'Technical review of tender drawings and specifications',
      'Equipment sizing: rating, voltage ratio, vector group, impedance and cooling',
      'Bill of materials with traceable, certified raw materials',
      'Factory acceptance testing, with customer witness on request',
      'Export packing, shipping documents and delivery coordination'
    ],
    steps: ['Enquiry & specification review', 'Technical offer & drawings', 'Manufacturing & FAT', 'Packing & dispatch']
  },
  {
    slug: 'installation',
    title: 'Installation & Commissioning',
    short: 'Site rigging, placement, cabling and energisation carried out by experienced field engineers.',
    image: '/assets/images/lifecycle/05-site-installation.jpg',
    intro: 'Our field engineers handle the work between delivery and energisation: unloading, placement, assembly of accessories, cable termination and the final checks before the unit goes live.',
    includes: [
      'Pre-installation site and foundation inspection',
      'Crane rigging and placement onto plinths',
      'Assembly of radiators, conservator, bushings and accessories',
      'HV/LV cable termination, earthing and surge protection',
      'Pre-commissioning checks and supervised first energisation'
    ],
    steps: ['Site survey', 'Delivery & placement', 'Assembly & cabling', 'Commissioning & handover']
  },
  {
    slug: 'testing',
    title: 'Testing & Diagnostics',
    short: 'Routine, site acceptance and condition tests that show how your equipment is really performing.',
    image: '/assets/images/lifecycle/06-testing-commissioning.jpg',
    intro: 'Testing confirms that equipment left the factory right and is still healthy in service. We carry out acceptance tests at site and condition assessments on units already in operation.',
    includes: [
      'Insulation resistance and polarisation index',
      'Winding resistance and turns ratio',
      'Oil breakdown voltage, moisture and dissolved gas analysis (DGA)',
      'Sweep frequency response analysis (SFRA)',
      'Protection relay and interlock function checks'
    ],
    steps: ['Test plan', 'On-site testing', 'Analysis', 'Report & recommendations']
  },
  {
    slug: 'maintenance',
    title: 'Maintenance & Repair',
    short: 'Planned maintenance and repair that extend equipment life and cut the risk of unplanned outages.',
    image: '/assets/images/lifecycle/07-handover-documentation.jpg',
    intro: 'A planned maintenance programme keeps transformers and switchgear reliable for decades. When something does go wrong, our team diagnoses the fault and restores the equipment.',
    includes: [
      'Scheduled inspection and preventive maintenance plans',
      'Oil filtration, regeneration and top-up',
      'Gasket, bushing and accessory replacement',
      'Tap changer inspection and servicing',
      'Fault investigation and repair'
    ],
    steps: ['Condition survey', 'Maintenance plan', 'Scheduled service', 'Records & review']
  }
];
