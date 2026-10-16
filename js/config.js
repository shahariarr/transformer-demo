// Site-wide settings. Both video placements read these paths.
window.SITE = {
  name: 'BPEL',                                 // Official company name
  logo: 'assets/images/logo.png',               // Official company logo
  videoSrc: 'assets/videos/transformer-animation.mp4',
  poster: 'assets/videos/transformer-poster.png',
  videoPlaybackRate: 2.0,                       // Animation video playback speed (2.0 = 2x fast playback)
  slideDuration: 5500,                          // Hero slide auto-advance duration in ms
  nav: [
    { label: 'Home', href: '#home' },
    {
      label: 'Products',
      href: '#products',
      children: [
        {
          title: 'Oil-Immersed Transformers',
          desc: '10kV–35kV high-efficiency distribution units',
          href: '#products',
          icon: 'transformer'
        },
        {
          title: 'Power Substation Units',
          desc: 'Up to 16,000 kVA high-capacity heavy power',
          href: '#products',
          icon: 'substation'
        },
        {
          title: 'Hermetically Sealed & Low Loss',
          desc: 'Corrugated tank maintenance-free designs',
          href: '#products',
          icon: 'shield'
        },
        {
          title: 'Custom Engineering & RFQ',
          desc: 'Custom voltage, BIL & tap changer options',
          href: '#contact',
          icon: 'settings'
        }
      ]
    },
    {
      label: 'Industries',
      href: '#industries',
      children: [
        {
          title: 'Power Utilities & Grid',
          desc: 'Substations & transmission infrastructure',
          href: '#industries',
          icon: 'zap'
        },
        {
          title: 'Manufacturing & Heavy Plants',
          desc: 'Continuous high-load factory operations',
          href: '#industries',
          icon: 'factory'
        },
        {
          title: 'Commercial & High-Rise Towers',
          desc: 'Compact indoor substations & risers',
          href: '#industries',
          icon: 'building'
        },
        {
          title: 'Textile & Garment Mills',
          desc: 'High-demand dedicated industrial feeds',
          href: '#industries',
          icon: 'layers'
        },
        {
          title: 'Renewable Energy & Solar',
          desc: 'Grid-tied step-up inverter systems',
          href: '#industries',
          icon: 'sun'
        },
        {
          title: 'Metro & Public Transit',
          desc: 'Traction substations & water facilities',
          href: '#industries',
          icon: 'train'
        }
      ]
    },
    {
      label: 'About',
      href: '#about',
      children: [
        {
          title: 'Company Overview',
          desc: 'BPEL engineering heritage & manufacturing',
          href: '#about',
          icon: 'info'
        },
        {
          title: 'Capabilities & Key Metrics',
          desc: 'Production scale & high-voltage capacity',
          href: '#stats',
          icon: 'activity'
        },
        {
          title: 'Why Work With BPEL',
          desc: 'In-house production, premium materials & R&D',
          href: '#quality',
          icon: 'check-circle'
        },
        {
          title: 'Turnkey Project Lifecycle',
          desc: 'End-to-end 7-stage EPC engineering',
          href: '#lifecycle',
          icon: 'cpu'
        }
      ]
    },
    {
      label: 'Resources',
      href: '#projects',
      children: [
        {
          title: 'Project Showcase',
          desc: 'Completed grid & industrial deployments',
          href: '#projects',
          icon: 'briefcase'
        },
        {
          title: 'Global Certifications & Partners',
          desc: 'International testing standards & alliances',
          href: '#partners',
          icon: 'award'
        },
        {
          title: 'Technical FAQ & Sizing',
          desc: 'Transformer specs & consultation guides',
          href: '#faq',
          icon: 'help-circle'
        },
        {
          title: 'Turnkey EPC Workflow',
          desc: 'Manufacturing to on-site energisation',
          href: '#lifecycle',
          icon: 'workflow'
        }
      ]
    },
    { label: 'Contact', href: '#contact' }
  ]
};
