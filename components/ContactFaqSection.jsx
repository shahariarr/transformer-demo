'use client';

import { useState } from 'react';
import SectionHead from './SectionHead';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

const CONTACT_FAQS = [
  {
    q: 'How quickly will I receive a formal quotation and technical data sheet?',
    a: 'For standard distribution and power transformers (4,000 to 16,000 kVA), our engineering estimation team delivers preliminary pricing, loss evaluations, and outline drawings within 24 to 48 hours. Complex substation packages or customized high-voltage specifications typically take 3 to 5 business days.'
  },
  {
    q: 'Can client consultants or third-party inspectors witness Factory Acceptance Testing (FAT)?',
    a: 'Yes. We welcome client engineers, utility representatives (BPDB, DPDC, DESCO, BREB), and third-party inspection agencies (such as Bureau Veritas or SGS) to our accredited high-voltage laboratory at our Gazipur campus to witness full routine, type, and temperature rise testing.'
  },
  {
    q: 'Can transformers be customized for high-ambient temperatures and heavy industrial harmonics?',
    a: 'Every BPEL transformer is engineered with specific derating margins tailored for Bangladesh’s tropical ambient climate (up to 45°C–50°C ambient). For heavy steel mills, textile plants, and VFD motor loads, we incorporate electrostatic shielding, custom K-factor winding calculations, and enhanced ONAN/ONAF cooling radiator fins.'
  },
  {
    q: 'What information is required to prepare an accurate technical quotation?',
    a: 'Ideally: rated capacity (kVA or MVA), primary and secondary voltages, frequency (50 Hz), cooling method (ONAN/ONAF), tap-changer preference (off-circuit or on-load OLTC with AVR), site altitude/ambient temperature, and any specific utility compliance requirements. Even if you only have a preliminary single-line diagram (SLD), our team will help complete the specification.'
  },
  {
    q: 'Do you provide turnkey installation, site testing, and energisation services?',
    a: 'Yes. Beyond manufacturing and FAT, our certified field engineering teams handle transportation to site, precision foundation placement, oil filtration, dielectric breakdown testing, protection relay coordination, and final energisation alongside local utility authorities.'
  }
];

export default function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = i => {
    setOpenIndex(prev => (prev === i ? -1 : i));
  };

  return (
    <div className="wrap">
      <SectionHead
        title="Frequently Asked Inquiries"
        desc="Key answers regarding proposal turnaround, laboratory testing witness protocols, custom technical specifications, and turnkey delivery."
      />

      <div className="contact-faq-grid">
        <div className="contact-faq-list">
          {CONTACT_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className={`contact-faq-item fade-in-up ${isOpen ? 'is-open' : ''}`}
                data-delay={i * 70}
              >
                <button
                  type="button"
                  className="contact-faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="contact-faq-number">{`0${i + 1}`}</span>
                  <span className="contact-faq-text">{faq.q}</span>
                  <span className="contact-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      {isOpen ? (
                        <line x1="5" y1="12" x2="19" y2="12" />
                      ) : (
                        <>
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="contact-faq-answer fade-in-up">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Engineering Help Sidebar Box */}
        <aside className="contact-faq-sidebar fade-in-up" data-delay="140">
          <div className="contact-faq-help-box">
            <span className="contact-faq-help-tag">TECHNICAL SUPPORT</span>
            <h4 className="contact-faq-help-title">Have custom single-line diagrams or tender drawings?</h4>
            <p className="contact-faq-help-text">
              Our chief electrical engineers are available to review DWG / PDF drawings and provide free preliminary sizing calculations and loss evaluations.
            </p>
            <div className="contact-faq-help-actions">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--wa contact-faq-help-btn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d={WA_PATH} />
                </svg>
                <span>Chat with an Engineer</span>
              </a>
              <a
                href="mailto:tenders@bpel-power.com?subject=Tender%20Drawing%20Review"
                className="contact-faq-help-email"
              >
                Or email drawings to tenders@bpel-power.com
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
