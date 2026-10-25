import CalculatorsDirectory from '@/components/CalculatorsDirectory';
import styles from './page.module.css';

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

export default async function SizingGuideSlugPage({ params }) {
  const { slug } = await params;
  return <CalculatorsDirectory initialTool={slug} initialView="studio" />;
}
