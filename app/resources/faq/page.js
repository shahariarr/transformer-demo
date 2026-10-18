import Faq from '@/components/Faq';
import { PageHero } from '@/components/PageParts';

export const metadata = {
  title: 'Technical FAQ',
  description: 'Frequently asked questions about transformers, substations, quotations, engineering and commissioning.'
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources/' }, { label: 'FAQ' }]} label="RESOURCES" title="Frequently Asked Questions"
        desc="Can't find your answer? Our engineers are happy to help." />
      <section id="faq" className="sec" aria-label="FAQ"><Faq /></section>
    </>
  );
}
