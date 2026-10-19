'use client';

import { useState } from 'react';
import { PageHero, ArrowRight } from '@/components/PageParts';
import ContactRFQSection from '@/components/ContactRFQSection';
import OfficesDirectory from '@/components/OfficesDirectory';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export default function ContactClient() {
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);

  const handleSelectOffice = (officeId) => {
    setSelectedOfficeId(officeId);
  };

  return (
    <>
      {/* 1. Page Hero with Breadcrumbs & Action Buttons */}
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        label="CONTACT US"
        title="Let's Power Your Next Project"
        desc="From technical proposals to custom transformer manufacturing and turnkey substation engineering — connect with our senior power engineers and strategic facilities across Bangladesh."
        image="/assets/images/about-tower.jpg"
      >
        <a className="btn btn--primary" href="#rfq">
          Request a Quote <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
          <span>WhatsApp Direct</span>
        </a>
        <a className="btn btn--line" href="#facilities" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}>
          <span>3 Strategic Facilities</span>
        </a>
      </PageHero>

      {/* 2. Primary Section: Request for Quote (RFQ) & Direct Contact Details */}
      <section id="rfq" className="sec" aria-label="Request for Quote">
        <ContactRFQSection preselectedOfficeId={selectedOfficeId} />
      </section>

      {/* 4. Secondary Section: Our 3 Strategic Facilities Across Bangladesh */}
      <section id="facilities" className="sec sec--alt" aria-label="Strategic Facilities Across Bangladesh">
        <div className="wrap">
          <OfficesDirectory onSelectOfficeForInquiry={handleSelectOffice} />
        </div>
      </section>
    </>
  );
}
