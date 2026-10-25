// Site-wide settings. Both video placements read these paths.
export const SITE = {
  name: 'BPEL',                                 // Official company name
  logo: '/assets/images/logo.png',               // Official company logo
  videoSrc: '/assets/videos/transformer-animation.mp4',
  poster: '/assets/videos/transformer-poster.png',
  videoPlaybackRate: 2.0,                       // Animation video playback speed (2.0 = 2x fast playback)
  slideDuration: 5500,                          // Hero slide auto-advance duration in ms
  nav: [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      href: '/products/',
      sections: [
        {
          title: 'Products',
          href: '/products/',
          items: [
            { title: 'Oil-Immersed Transformers', desc: '10kV–35kV high-efficiency distribution units', href: '/products/', icon: 'transformer' },
            { title: 'High-Capacity Power Units', desc: 'Up to 16,000 kVA high-capacity heavy power', href: '/products/16000-kva-oil-filled-transformer/', icon: 'substation' },
            { title: 'Hermetically Sealed & Low Loss', desc: 'Corrugated tank maintenance-free designs', href: '/products/5000-kva-oil-filled-transformer/', icon: 'shield' },
            { title: 'Custom Engineering & RFQ', desc: 'Custom voltage, BIL & tap changer options', href: '/contact/', icon: 'settings' }
          ]
        },
        {
          title: 'Services',
          href: '/services/',
          items: [
            { title: 'Equipment Supply', desc: 'Specified, built and delivered to schedule', href: '/services/equipment-supply/', icon: 'briefcase' },
            { title: 'Installation & Commissioning', desc: 'Rigging, cabling and first energisation', href: '/services/installation/', icon: 'zap' },
            { title: 'Testing & Diagnostics', desc: 'Acceptance and condition testing on site', href: '/services/testing/', icon: 'activity' },
            { title: 'Maintenance & Repair', desc: 'Planned service and fault repair', href: '/services/maintenance/', icon: 'settings' }
          ]
        },
        {
          title: 'Industries',
          href: '/industries/',
          items: [
            { title: 'Power Utilities & Grid', desc: 'Substations & transmission infrastructure', href: '/industries/power-utilities-and-grid-infrastructure/', icon: 'zap' },
            { title: 'Manufacturing & Heavy Plants', desc: 'Continuous high-load factory operations', href: '/industries/manufacturing-and-industrial-facilities/', icon: 'factory' },
            { title: 'Commercial & High-Rise Towers', desc: 'Compact indoor substations & risers', href: '/industries/commercial-buildings-and-real-estate/', icon: 'building' },
            { title: 'Textile & Garment Mills', desc: 'High-demand dedicated industrial feeds', href: '/industries/textile-and-garment-industries/', icon: 'layers' },
            { title: 'Renewable Energy & Solar', desc: 'Grid-tied step-up inverter systems', href: '/industries/energy-and-renewable-power/', icon: 'sun' },
            { title: 'Metro & Public Transit', desc: 'Traction substations & station power', href: '/industries/transportation-and-metro-infrastructure/', icon: 'train' }
          ]
        }
      ]
    },
    {
      label: 'About',
      href: '/about/',
      sections: [
        {
          title: 'About BPEL',
          href: '/about/',
          items: [
            { title: 'Company Overview', desc: 'BPEL engineering heritage & manufacturing', href: '/about/', icon: 'info' },
            { title: 'ETS', desc: 'Emirates Transformer & Switchgear — Dubai Since 1987', href: '/about/ets/', icon: 'building' },
            { title: 'Leadership & Board', desc: 'Executive board and engineering directors', href: '/about/leaders/', icon: 'users' },
            { title: 'Partners & Alliances', desc: 'Global technology & accredited testing bodies', href: '/about/partners/', icon: 'handshake' },
            { title: 'Engineering & Manufacturing', desc: 'From design to factory testing', href: '/engineering/', icon: 'cpu' },
            { title: 'Certifications & Test Reports', desc: 'Accreditations and type test reports', href: '/certifications/', icon: 'award' }
          ]
        },
        {
          title: 'Resources',
          href: '/resources/',
          items: [
            { title: 'Project Showcase', desc: 'Completed grid & industrial deployments', href: '/projects/', icon: 'briefcase' },
            { title: 'Engineering Calculators', desc: '15 sizing, loss, TCO & electrical tools', href: '/resources/sizing-guide/', icon: 'activity' },
            { title: 'Technical FAQ', desc: 'Specs, quotations & consultation', href: '/resources/faq/', icon: 'help-circle' },
            { title: 'Glossary & Standards', desc: 'Terms and IEC / IEEE references', href: '/resources/glossary/', icon: 'workflow' }
          ]
        },
        {
          title: 'Blog',
          href: '/blog/',
          items: [
            { title: 'Engineering Blog & Insights', desc: 'Technical transformer guides & grid updates', href: '/blog/', icon: 'book-open' }
          ]
        }
      ]
    },
    { label: 'Careers', href: '/careers/' },
    { label: 'Contact', href: '/contact/' }
  ]
};

// Backward compatibility: attach flattened children array to any sectioned nav item
SITE.nav.forEach(item => {
  if (item.sections && !item.children) {
    item.children = item.sections.flatMap(s => s.items);
  }
});
