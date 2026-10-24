import etsProductsRaw from './ets-products.json';

export const ETS_PRODUCTS = etsProductsRaw;

export const FILTER_OPTIONS = {
  divisions: [
    { id: 'all', label: 'All Divisions' },
    { id: 'Transformers', label: 'Transformers' },
    { id: 'Switchgear', label: 'Switchgear' }
  ],
  productTypes: [
    'All Types',
    'Pad Mounted (UL)',
    'Medium Power (GSU)',
    'EHV Transformers',
    'Distribution',
    'Dry Type / Cast Resin',
    'Application-Specific',
    'BESS',
    'Package Substations',
    'Containerized',
    'Special Transformers',
    'Auxiliary',
    'MV Switchgear',
    'LV Switchgear'
  ],
  voltageClasses: [
    'All Voltages',
    'Up to 36 kV',
    '36–132 kV',
    '132–220 kV',
    '220–765 kV'
  ],
  powerRatings: [
    'All Ratings',
    '≤ 1 MVA',
    '1–10 MVA',
    '10–60 MVA',
    '60–200 MVA',
    '200+ MVA'
  ],
  coolingTypes: [
    'All Cooling',
    'ONAN',
    'KNAN',
    'ONAF',
    'KNAF',
    'AN (Air Natural)'
  ],
  standards: [
    'All Standards',
    'IEC',
    'IEEE / ANSI',
    'UL Listed',
    'ATEX / IECEx'
  ]
};

export const getEtsProductBySlug = (slug) => {
  return ETS_PRODUCTS.find(p => p.slug === slug);
};
