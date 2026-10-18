import Contact from '@/components/Contact';
import { PageHero } from '@/components/PageParts';

export const metadata = {
  title: 'Contact Us',
  description: 'Send your project requirements or request a quotation for transformers, substations and engineering services.'
};

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} label="CONTACT US" title="Discuss Your Project Requirements"
        desc="Tell us about your project and our engineers will get back to you with the next steps." />
      <section id="contact" className="sec" aria-label="Contact"><Contact /></section>
    </>
  );
}
