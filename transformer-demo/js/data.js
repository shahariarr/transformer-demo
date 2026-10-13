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
    { name: '16000 Kva Oil-filled Transformer', cat: 'Transformers', hint: 'oil-immersed-transformer.png',
      image: 'assets/images/products/oil-immersed-transformer.png',
      desc: '16000 kVA high-efficiency oil-immersed distribution transformer with low-loss core and robust thermal performance.',
      specs: [
        'Coil Material: Copper/Aluminum',
        'Primary Voltage: 10-35kv',
        'Working Efficiency: 50HZ/60HZ',
        'Oil immersed distribution transformer',
        'Low loss transformer'
      ] },
    { name: '10000 Kva Oil-filled Transformer', cat: 'Transformers', hint: 'power-transformer.png',
      image: 'assets/images/products/power-transformer.png',
      desc: '10000 kVA power transformer engineered for high-voltage substations and continuous industrial transmission.',
      specs: [
        'Coil Material: Copper/Aluminum',
        'Primary Voltage: 10-35kv',
        'Working Efficiency: 50HZ/60HZ',
        'Oil immersed distribution transformer',
        'Low loss transformer'
      ] },
    { name: '6000 Kva Oil-filled Transformer', cat: 'Transformers', hint: 'distribution-transformer.png',
      image: 'assets/images/products/distribution-transformer.png',
      desc: '6000 kVA distribution transformer featuring corrugated cooling fins for superior heat dissipation.',
      specs: [
        'Coil Material: Copper/Aluminum',
        'Primary Voltage: 10-35kv',
        'Working Efficiency: 50HZ/60HZ',
        'Oil immersed distribution transformer',
        'Low loss transformer'
      ] },
    { name: '5000 Kva Oil-filled Transformer', cat: 'Transformers', hint: 'hermetically-sealed-transformer.png',
      image: 'assets/images/products/hermetically-sealed-transformer.png',
      desc: '5000 kVA hermetically sealed transformer with integrated control box and corrugated tank structure.',
      specs: [
        'Coil Material: Copper/Aluminum',
        'Primary Voltage: 33kV / 35kV',
        'Working Efficiency: 50HZ/60HZ',
        'Oil immersed distribution transformer',
        'Low loss transformer'
      ] },
    { name: '4000 Kva Oil-filled Transformer', cat: 'Transformers', hint: '4000kva-oil-filled-transformer.png',
      image: 'assets/images/products/4000kva-oil-filled-transformer.png',
      desc: '4000 kVA liquid-filled industrial transformer designed for dedicated factory and commercial power systems.',
      specs: [
        'Coil Material: Copper/Aluminum',
        'Primary Voltage: 10-35kv',
        'Working Efficiency: 50HZ/60HZ',
        'Oil immersed distribution transformer',
        'Low loss transformer'
      ] }
  ].map(p => ({ ...p, dir: 'products' })),

  industries: [
    { name: 'Power Utilities & Grid Infrastructure', hint: 'utilities-grid.jpg',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80',
      desc: 'Equipment for substations and distribution networks.' },
    { name: 'Manufacturing & Industrial Facilities', hint: 'manufacturing.jpg',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=80',
      desc: 'Reliable supply for production lines and plant loads.' },
    { name: 'Textile & Garment Industries', hint: 'textile-garment.jpg',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80',
      desc: 'Power distribution for high-load, continuous operations.' },
    { name: 'Commercial Buildings & Real Estate', hint: 'commercial-buildings.jpg',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      desc: 'Substations and panels for offices, malls and towers.' },
    { name: 'Hospitals & Healthcare Facilities', hint: 'healthcare.jpg',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80',
      desc: 'Dependable power for critical care environments.' },
    { name: 'Water Treatment & Public Infrastructure', hint: 'water-treatment.jpg',
      image: 'https://images.unsplash.com/photo-1548625149-720754874058?w=900&q=80',
      desc: 'Electrical systems for pumping and treatment plants.' },
    { name: 'Transportation & Metro Infrastructure', hint: 'metro-transport.jpg',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80',
      desc: 'Traction and station power for rail and transit.' },
    { name: 'Energy & Renewable Power', hint: 'renewable-energy.jpg',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80',
      desc: 'Grid connection equipment for solar and other generation.' }
  ].map(p => ({ ...p, dir: 'industries' })),

  projects: [
    { title: 'Electrical Substation Installation', cat: 'Substations', hint: 'substation-installation.jpg',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899a9bd5d5?w=900&q=80',
      location: 'Dhaka, Bangladesh',
      desc: 'Example of site works, equipment placement and energisation for a distribution substation.' },
    { title: 'Industrial Transformer Supply', cat: 'Transformers', hint: 'industrial-transformer-supply.jpg',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80',
      location: 'Chattogram, Bangladesh',
      desc: 'Example of supplying and delivering a transformer to an industrial site.' },
    { title: 'Medium-Voltage Switchgear Installation', cat: 'Switchgear', hint: 'mv-switchgear-installation.jpg',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
      location: 'Gazipur, Bangladesh',
      desc: 'Example of installing and verifying medium-voltage switchgear.' },
    { title: 'Commercial Building Power Infrastructure', cat: 'Commercial', hint: 'commercial-power.jpg',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
      location: 'Sylhet, Bangladesh',
      desc: 'Example of power distribution planning for a commercial building.' },
    { title: 'Water Treatment Plant Electrical Systems', cat: 'Public infrastructure', hint: 'water-plant-electrical.jpg',
      image: 'https://images.unsplash.com/photo-1548625149-720754874058?w=900&q=80',
      location: 'Khulna, Bangladesh',
      desc: 'Example of electrical systems for a treatment and pumping facility.' },
    { title: 'Metro Station Power Infrastructure', cat: 'Transit', hint: 'metro-station-power.jpg',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=900&q=80',
      location: 'Dhaka, Bangladesh',
      desc: 'Example of station power supply and distribution for a metro line.' }
  ].map(p => ({ ...p, dir: 'projects' })),

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
