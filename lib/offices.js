/* Official 3 Strategic Facilities Data for Basic Power Engineering Ltd. (BPEL) */
export const OFFICES = [
  {
    id: 'dhaka-hq',
    name: 'Corporate Headquarters & Design Center',
    shortName: 'Dhaka Headquarters',
    city: 'Dhaka',
    region: 'Central Region',
    badge: 'Corporate HQ & Engineering',
    badgeType: 'hq',
    isPrimary: true,
    image: '/assets/images/about-tower.jpg',
    address: 'Level 11, BPEL Tower, Plot 34, Gulshan South Avenue, Gulshan-1, Dhaka 1212, Bangladesh',
    landmark: 'Adjacent to Gulshan-1 Circle & Navana Tower',
    phone: '+880 2 988 5601',
    phoneRaw: '+88029885601',
    mobile: '+880 1713 000 001',
    mobileRaw: '+8801713000001',
    whatsapp: '8801713000001',
    email: 'dhaka.hq@bpel-power.com',
    tenderEmail: 'tenders@bpel-power.com',
    hours: 'Sunday – Thursday: 08:30 – 18:00',
    visitingInfo: 'Open for engineering consultations, tender document submissions, and commercial project meetings.',
    mapQuery: 'Gulshan+1+Dhaka+Bangladesh',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gulshan-1+Dhaka+Bangladesh&output=embed',
    departments: [
      { name: 'Engineering & CAD Design', contact: 'design@bpel-power.com' },
      { name: 'Commercial & Tenders', contact: 'tenders@bpel-power.com' },
      { name: 'Executive Management', contact: 'management@bpel-power.com' }
    ],
    features: [
      '3D FEA Magnetic Simulation Suite',
      'Tender & RFQ Estimation Desk',
      'Executive Client Boardroom',
      'Substation Architectural Planning'
    ]
  },
  {
    id: 'gazipur-plant',
    name: 'Heavy Manufacturing Campus & High-Voltage Lab',
    shortName: 'Gazipur Plant & Lab',
    city: 'Gazipur',
    region: 'Industrial Manufacturing Zone',
    badge: 'Manufacturing & FAT Lab',
    badgeType: 'plant',
    isPrimary: false,
    image: '/assets/images/about-campus.jpg',
    address: 'BPEL Industrial Park, Sreepur Highway, Gazipur 1740, Bangladesh',
    landmark: '120,000 sq.ft Heavy Transformer Facility near Dhaka-Mymensingh Highway',
    phone: '+880 2 920 4110',
    phoneRaw: '+88029204110',
    mobile: '+880 1713 000 002',
    mobileRaw: '+8801713000002',
    whatsapp: '8801713000002',
    email: 'plant@bpel-power.com',
    tenderEmail: 'fat.testing@bpel-power.com',
    hours: 'Saturday – Thursday: 08:00 – 17:30',
    visitingInfo: 'Factory Acceptance Testing (FAT) witness visits and client technical inspections by prior appointment.',
    mapQuery: 'Gazipur+Industrial+Park+Bangladesh',
    mapEmbedUrl: 'https://www.google.com/maps?q=Gazipur+Bangladesh&output=embed',
    departments: [
      { name: 'Heavy Transformer Assembly', contact: 'production@bpel-power.com' },
      { name: 'Accredited Testing & QA Lab', contact: 'fat.testing@bpel-power.com' },
      { name: 'Switchgear & Panel Fabrication', contact: 'switchgear@bpel-power.com' }
    ],
    features: [
      '120,000 sq.ft Automated Manufacturing',
      '200kV Lightning Impulse Generator',
      'Vacuum Drying & Oil Degassing Autoclaves',
      'Client FAT Witness Observation Lounge'
    ]
  },
  {
    id: 'chittagong-hub',
    name: 'Regional Operations & Maritime Logistics Center',
    shortName: 'Chittagong Hub',
    city: 'Chattogram',
    region: 'South-Eastern Coastal Hub',
    badge: 'Port Logistics & Regional Hub',
    badgeType: 'logistics',
    isPrimary: false,
    image: '/assets/images/lifecycle/06-testing-commissioning.jpg',
    address: 'Suite 504, World Trade Center, 102 Agrabad Commercial Area, Chattogram 4100, Bangladesh',
    landmark: 'Agrabad C/A, 15 Minutes from Chittagong Port Terminals',
    phone: '+880 31 718 200',
    phoneRaw: '+88031718200',
    mobile: '+880 1713 000 003',
    mobileRaw: '+8801713000003',
    whatsapp: '8801713000003',
    email: 'ctg.branch@bpel-power.com',
    tenderEmail: 'logistics@bpel-power.com',
    hours: 'Sunday – Thursday: 09:00 – 18:00 (Emergency field dispatch 24/7)',
    visitingInfo: 'Regional client liaison, industrial site dispatch, port customs handling, and coastal project support.',
    mapQuery: 'Agrabad+Commercial+Area+Chittagong+Bangladesh',
    mapEmbedUrl: 'https://www.google.com/maps?q=Agrabad+Chittagong+Bangladesh&output=embed',
    departments: [
      { name: 'Port & Maritime Customs Logistics', contact: 'logistics@bpel-power.com' },
      { name: 'Regional Grid Maintenance Dispatch', contact: 'ctg.service@bpel-power.com' },
      { name: 'Export & Bulk Raw Material Hub', contact: 'export@bpel-power.com' }
    ],
    features: [
      'Heavy Transformer Spare Parts Depot',
      'Fast Chittagong Port Import Handling',
      '24/7 Coastal Emergency Grid Dispatch',
      'Certified Commissioning Field Crew'
    ]
  }
];

export const CONTACT_CHANNELS = {
  emergencyHotline: {
    title: '24/7 Grid Emergency Hotline',
    number: '+880 1713 999 999',
    numberRaw: '+8801713999999',
    note: 'Instant response for substation tripping & utility outages'
  },
  whatsappDesk: {
    title: 'Direct WhatsApp Engineer Chat',
    number: '+880 1713 000 001',
    link: 'https://wa.me/8801713000001?text=Hello%20BPEL%20Engineering%20Team%2C%20I%20have%20a%20project%20inquiry',
    note: 'Fast chat with senior electrical engineering consultants'
  },
  tenderDesk: {
    title: 'Tenders & RFQ Submissions',
    email: 'tenders@bpel-power.com',
    note: 'Send technical tender specs, single-line diagrams & schedules'
  },
  responseTime: {
    stat: '< 2 Hours',
    label: 'Average Engineering Response Time'
  }
};
