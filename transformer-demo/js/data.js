/* All editable content lives here. To use a real photo, set `image` to a file
   path (e.g. 'assets/images/products/power-transformers.jpg'). Empty `image`
   shows a clearly labelled placeholder that names the suggested file. */
window.DATA = {
  contact: {
    email: 'info@example.com',                 // PLACEHOLDER
    whatsapp: '0000000000',                    // PLACEHOLDER, digits only with country code
    phoneDisplay: '+00 000 000 0000',          // PLACEHOLDER
    address: 'Placeholder Street, City, Country', // PLACEHOLDER
    waMessage: 'Hello, I would like to discuss a power engineering project.',
    emailSubject: 'Project Inquiry'
  },

  products: [
    { name: 'Power Transformers', cat: 'Transformers', hint: 'power-transformers.jpg',
      desc: 'Large units for transmission networks and heavy industrial supply.' },
    { name: 'Distribution Transformers', cat: 'Transformers', hint: 'distribution-transformers.jpg',
      desc: 'Pole- and pad-mounted units that step voltage down for local networks.' },
    { name: 'Dry-Type / Cast Resin Transformers', cat: 'Transformers', hint: 'dry-type-transformers.jpg',
      desc: 'Oil-free designs suited to indoor and occupied-building installations.' },
    { name: 'Oil-Immersed Transformers', cat: 'Transformers', hint: 'oil-immersed-transformers.jpg',
      desc: 'Liquid-cooled units for outdoor substations and industrial plants.' },
    { name: 'Compact Substations', cat: 'Substations', hint: 'compact-substations.jpg',
      desc: 'Factory-assembled enclosures combining transformer and switchgear.' },
    { name: 'Medium-Voltage Switchgear', cat: 'Switchgear', hint: 'mv-switchgear.jpg',
      desc: 'Switching, protection and isolation for medium-voltage distribution.' },
    { name: 'Low-Voltage Switchgear & Distribution Panels', cat: 'Switchgear', hint: 'lv-switchgear.jpg',
      desc: 'Main and sub-distribution boards for buildings and factories.' },
    { name: 'Busbar Trunking Systems', cat: 'Distribution', hint: 'busbar-trunking.jpg',
      desc: 'Enclosed conductors for high-current distribution within a facility.' },
    { name: 'Protection and Control Panels', cat: 'Control', hint: 'protection-control-panels.jpg',
      desc: 'Relay, metering and control equipment for substations and plants.' },
    { name: 'Substation Equipment and Accessories', cat: 'Substations', hint: 'substation-equipment.jpg',
      desc: 'Supporting equipment and fittings that complete a substation.' }
  ].map(p => ({ image: '', ...p, dir: 'products' })),

  industries: [
    { name: 'Power Utilities & Grid Infrastructure', hint: 'utilities-grid.jpg', desc: 'Equipment for substations and distribution networks.' },
    { name: 'Manufacturing & Industrial Facilities', hint: 'manufacturing.jpg', desc: 'Reliable supply for production lines and plant loads.' },
    { name: 'Textile & Garment Industries', hint: 'textile-garment.jpg', desc: 'Power distribution for high-load, continuous operations.' },
    { name: 'Commercial Buildings & Real Estate', hint: 'commercial-buildings.jpg', desc: 'Substations and panels for offices, malls and towers.' },
    { name: 'Hospitals & Healthcare Facilities', hint: 'healthcare.jpg', desc: 'Dependable power for critical care environments.' },
    { name: 'Water Treatment & Public Infrastructure', hint: 'water-treatment.jpg', desc: 'Electrical systems for pumping and treatment plants.' },
    { name: 'Transportation & Metro Infrastructure', hint: 'metro-transport.jpg', desc: 'Traction and station power for rail and transit.' },
    { name: 'Energy & Renewable Power', hint: 'renewable-energy.jpg', desc: 'Grid connection equipment for solar and other generation.' }
  ].map(p => ({ image: '', ...p, dir: 'industries' })),

  projects: [
    { title: 'Electrical Substation Installation', cat: 'Substations', hint: 'substation-installation.jpg',
      desc: 'Example of site works, equipment placement and energisation for a distribution substation.' },
    { title: 'Industrial Transformer Supply', cat: 'Transformers', hint: 'industrial-transformer-supply.jpg',
      desc: 'Example of supplying and delivering a transformer to an industrial site.' },
    { title: 'Medium-Voltage Switchgear Installation', cat: 'Switchgear', hint: 'mv-switchgear-installation.jpg',
      desc: 'Example of installing and verifying medium-voltage switchgear.' },
    { title: 'Commercial Building Power Infrastructure', cat: 'Commercial', hint: 'commercial-power.jpg',
      desc: 'Example of power distribution planning for a commercial building.' },
    { title: 'Water Treatment Plant Electrical Systems', cat: 'Public infrastructure', hint: 'water-plant-electrical.jpg',
      desc: 'Example of electrical systems for a treatment and pumping facility.' },
    { title: 'Metro Station Power Infrastructure', cat: 'Transit', hint: 'metro-station-power.jpg',
      desc: 'Example of station power supply and distribution for a metro line.' }
  ].map(p => ({ image: '', location: 'Location to be added', ...p, dir: 'projects' })),

  lifecycle: [
    { title: 'Requirement & Project Approval', summary: 'Agreeing what will be built, and signing it off.',
      points: ['Initial client consultation', 'Requirement assessment', 'Scope definition', 'Technical and commercial approval'] },
    { title: 'Engineering & Design', summary: 'Turning the requirement into approved drawings.',
      points: ['Site and load assessment', 'Electrical design', 'Equipment selection', 'Drawings and design approval'] },
    { title: 'Planning & Procurement', summary: 'Lining up materials, suppliers and budget.',
      points: ['Bill of materials preparation', 'Budgetary approval', 'Supplier selection', 'Purchase orders and procurement'] },
    { title: 'Manufacturing & Quality Testing', summary: 'Building the equipment and checking it before it ships.',
      points: ['Equipment manufacturing or assembly', 'Quality inspections', 'Factory testing where applicable', 'Technical documentation'] },
    { title: 'Site Preparation & Installation', summary: 'Getting the site ready and the equipment in place.',
      points: ['Site readiness verification', 'Equipment transportation', 'Transformer and switchgear installation', 'Cable, earthing and associated works'] },
    { title: 'Testing & Commissioning', summary: 'Proving the system works safely before it goes live.',
      points: ['Electrical and functional testing', 'Protection-system verification', 'Safety and quality checks', 'Commissioning approval'] },
    { title: 'Handover & Documentation', summary: 'Closing out the project with the client.',
      points: ['Final inspection', 'Handover documentation', 'Client orientation where applicable', 'Project completion'] }
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
