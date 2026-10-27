import clonedProducts from './cloned-products.json';
import etsProducts from './ets-products.json';

// Normalize string for resilient searching and filtering
export const norm = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .replace(/[\u2013\u2014–—]/g, '-')
    .replace(/[≤]/g, '<=')
    .replace(/\s+/g, ' ')
    .trim();

// Map and format all products
const CLONED = clonedProducts.map(p => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  category: p.category,
  subCategory: p.subCategory,
  division: p.division,
  image: p.image,
  desc: p.desc,
  specs: p.specs || [],
  specRows: p.specRows || [],
  badges: p.badges || ['ISO 9001', 'IEC Standard'],
  tags: p.tags || []
}));

const clonedSlugs = new Set(CLONED.map(p => p.slug));

const EXTRA_ETS = etsProducts
  .filter(p => !clonedSlugs.has(p.slug))
  .map((p, idx) => ({
    id: CLONED.length + idx + 1,
    name: p.name,
    slug: p.slug,
    category: p.division === 'Switchgear' ? 'Switchgear Assemblies' : 'Transformer',
    subCategory: p.productType || (p.division === 'Switchgear' ? 'Low Voltage Switchgear' : 'Distribution Transformers'),
    division: p.division,
    image: p.image,
    desc: p.desc,
    specs: p.specs || [],
    specRows: p.specRows || [],
    badges: p.badges || [],
    tags: p.tags || []
  }));

export const ALL_PRODUCTS = [...CLONED, ...EXTRA_ETS];

export const CATEGORY_TREE = [
  {
    id: 'transformer',
    title: 'Transformer',
    subcategories: [
      'Distribution Transformers',
      'Dry Type / Cast Resin',
      'Medium Power (GSU)',
      'Pad Mounted (UL)'
    ]
  },
  {
    id: 'medium-and-high-voltage',
    title: 'Medium and High Voltage',
    subcategories: [
      'Vacuum Circuit Breakers',
      'Load Switches',
      'Isolation Switches',
      'Current Transformers',
      'Voltage Transformers',
      'Grounding Switches',
      'Fuses',
      'Power Quality Management'
    ]
  },
  {
    id: 'switchgear-assemblies',
    title: 'Switchgear Assemblies',
    subcategories: [
      'Transformer Substations',
      'Ring Main Units',
      'Metalclad AC Enclosed Switchgear',
      'Low Voltage Switchgear',
      'Package Substations'
    ]
  }
];

export const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 8);
