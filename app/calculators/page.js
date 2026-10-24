import CalculatorsDirectory from '@/components/CalculatorsDirectory';
import styles from './page.module.css';

export const metadata = {
  title: 'Engineering Calculators & Transformer Sizing Hub | BPEL',
  description: '15 online electrical engineering tools: kVA sizing, cable cross-section, efficiency & losses, TCO lifecycle, short-circuit, overload capacity, unit conversions, and LME commodity benchmarks.'
};

export default function CalculatorsPage() {
  return <CalculatorsDirectory />;
}
