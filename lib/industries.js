/* Extra detail for each industry page (/industries/[slug]), keyed by slug from lib/data.js */
export const INDUSTRY_DETAILS = {
  'power-utilities-and-grid-infrastructure': {
    intro: 'Utilities need equipment that runs continuously, connects cleanly to the existing network and meets the utility\'s own specifications.',
    needs: ['Compliance with utility specifications and approvals', 'Low no-load and load losses over decades of service', 'Short-circuit strength for high fault levels'],
    supply: ['Power transformers for primary substations', 'Distribution transformers for network feeders', 'Compact substations for urban networks'],
    gallery: [
      '/assets/images/industries/utilities-grid-substation.jpg',
      '/assets/images/industries/utilities-grid-transmission.jpg'
    ]
  },
  'manufacturing-and-industrial-facilities': {
    intro: 'Production lines depend on stable supply. Motor starting, variable loads and harmonics all put stress on transformers and switchgear.',
    needs: ['Capacity for motor-starting and cyclic loads', 'Tolerance of harmonics from drives', 'Fast fault isolation to protect production'],
    supply: ['Dedicated plant transformers with on-load tap changers', 'MV switchgear for incoming supply and feeders', 'Distribution boards for production areas'],
    gallery: [
      '/assets/images/industries/manufacturing-assembly-line.jpg',
      '/assets/images/industries/manufacturing-heavy-machinery.jpg'
    ]
  },
  'textile-and-garment-industries': {
    intro: 'Textile and garment plants run around the clock with high, steady loads, often in hot and humid conditions.',
    needs: ['Continuous full-load operation', 'Cooling sized for high ambient temperatures', 'Reliable supply to avoid production loss'],
    supply: ['Oil-immersed distribution transformers', 'Compact substations for plant expansion', 'Power factor correction equipment'],
    gallery: [
      '/assets/images/industries/textile-spinning-mill.jpg',
      '/assets/images/industries/textile-plant-substation.jpg'
    ]
  },
  'commercial-buildings-and-real-estate': {
    intro: 'Offices, malls and towers need compact, quiet and fire-safe equipment that fits inside the building.',
    needs: ['Small footprint for indoor substations', 'Low noise near occupied spaces', 'Fire-safe designs for indoor installation'],
    supply: ['Cast resin dry-type transformers', 'LV switchboards and busduct risers', 'Compact indoor substations'],
    gallery: [
      '/assets/images/industries/commercial-indoor-substation.jpg',
      '/assets/images/industries/commercial-switchgear-room.jpg'
    ]
  },
  'hospitals-and-healthcare-facilities': {
    intro: 'Hospitals cannot lose power. Critical care areas need redundant supply and equipment that stays reliable.',
    needs: ['Redundant supply paths', 'Clean power for sensitive medical equipment', 'Safe indoor installation'],
    supply: ['Dry-type transformers for indoor rooms', 'Switchgear with automatic transfer', 'Isolation transformers for critical areas'],
    gallery: [
      '/assets/images/industries/healthcare-backup-substation.jpg',
      '/assets/images/industries/healthcare-isolation-power.jpg'
    ]
  },
  'water-treatment-and-public-infrastructure': {
    intro: 'Pumping and treatment plants run large motor loads, often at remote sites that must keep working without interruption.',
    needs: ['Motor and drive loads with harmonics', 'Outdoor and harsh-environment installation', 'Redundancy for continuous pumping'],
    supply: ['Outdoor distribution transformers', 'Motor control centres and MV switchgear', 'Harmonic filtering and power quality equipment'],
    gallery: [
      '/assets/images/industries/water-treatment-substation.jpg',
      '/assets/images/industries/water-pumping-drives.jpg'
    ]
  },
  'transportation-and-metro-infrastructure': {
    intro: 'Rail and metro systems need dependable power for stations, signalling and auxiliary systems, often in tight underground spaces.',
    needs: ['High reliability for signalling and safety systems', 'Compact equipment for stations and tunnels', 'Fire-safe designs for enclosed spaces'],
    supply: ['Auxiliary substations for stations', 'Dry-type transformers for underground rooms', 'MV switchgear with redundant feeds'],
    gallery: [
      '/assets/images/industries/metro-traction-substation.jpg',
      '/assets/images/industries/metro-signaling-power.jpg'
    ]
  },
  'energy-and-renewable-power': {
    intro: 'Solar and other generation projects need transformers that step up inverter output and connect cleanly to the grid.',
    needs: ['Step-up from inverter voltage to grid voltage', 'Handling of inverter harmonics and cycling loads', 'Outdoor installation in exposed sites'],
    supply: ['Step-up and inverter-duty transformers', 'Compact substations for solar plants', 'Grid connection switchgear'],
    gallery: [
      '/assets/images/industries/renewable-solar-inverter.jpg',
      '/assets/images/industries/renewable-grid-substation.jpg'
    ]
  }
};
