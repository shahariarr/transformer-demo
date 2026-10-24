import CalculatorsDirectory from '@/components/CalculatorsDirectory';

export function generateStaticParams() {
  return [
    { slug: 'kva' },
    { slug: 'sizing-advisor' },
    { slug: 'cable-sizing' },
    { slug: 'loss-efficiency' },
    { slug: 'tco' },
    { slug: 'voltage-drop' },
    { slug: 'overload' },
    { slug: 'short-circuit' },
    { slug: 'unit-converter' },
    { slug: 'tap-changer' },
    { slug: 'oil-volume' },
    { slug: 'currency-converter' },
    { slug: 'commodities' },
    { slug: 'material-cost' },
    { slug: 'co2-savings' }
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const names = {
    kva: 'kVA Sizing Calculator',
    'sizing-advisor': 'Sizing Advisor Wizard',
    'cable-sizing': 'Cable Sizing Calculator',
    'loss-efficiency': 'Loss & Efficiency Calculator',
    tco: 'Total Cost of Ownership (TCO)',
    'voltage-drop': 'Voltage Drop Calculator',
    overload: 'Overload Capacity Guide',
    'short-circuit': 'Short Circuit Calculator',
    'unit-converter': 'Unit Converter',
    'tap-changer': 'Tap Changer Range',
    'oil-volume': 'Oil Volume & Weight',
    'currency-converter': 'Currency Converter',
    commodities: 'Commodity Monitor',
    'material-cost': 'Material Cost Estimator',
    'co2-savings': 'CO₂ Lifecycle Savings'
  };

  const title = names[slug] || 'Electrical Engineering Calculator';

  return {
    title: `${title} | BPEL Engineering Calculators`,
    description: `IEC 60076 compliant ${title} for power and distribution transformer engineering.`
  };
}

export default async function CalculatorSlugPage({ params }) {
  const { slug } = await params;
  return <CalculatorsDirectory initialTool={slug} initialView="studio" />;
}
