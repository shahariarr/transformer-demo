import { PageHero } from '@/components/PageParts';
import OfficesDirectory from '@/components/OfficesDirectory';
import ModernContactSection from '@/components/ModernContactSection';

export const metadata = {
  title: 'Contact Us | 3 Strategic Facilities & Engineering Hubs',
  description: 'Connect with BPEL Corporate Headquarters in Dhaka, our Heavy Manufacturing Plant & High-Voltage Lab in Gazipur, or our Maritime Port Logistics Hub in Chattogram.'
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        label="CONTACT US & STRATEGIC FACILITIES"
        title="Connect With Our Engineering Teams Across Bangladesh"
        desc="Corporate Headquarters in Dhaka, Heavy Manufacturing & Accredited Type-Test Lab in Gazipur, and Maritime Port Logistics Hub in Chattogram."
        image="/assets/images/about-campus.jpg"
      />

      {/* 3 Strategic Facilities: Compact & Convenient Interactive Directory */}
      <section id="offices" className="sec sec--alt" aria-label="Our 3 Strategic Facilities">
        <div className="wrap">
          <OfficesDirectory />
        </div>
      </section>

      {/* Modern Technical RFQ Form & Project Consultation */}
      <section id="inquiry" className="sec" aria-label="Submit Project Requirements">
        <div className="wrap">
          <ModernContactSection />
        </div>
      </section>
    </>
  );
}
