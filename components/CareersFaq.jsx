'use client';

import { useState } from 'react';
import SectionHead from './SectionHead';

const CAREERS_FAQS = [
  {
    q: 'What is the typical recruitment timeline from application to job offer?',
    a: 'Our hiring process typically takes between 2 to 3 weeks. Candidates receive initial resume screening feedback within 3 business days, followed by technical interviews and a facility tour before a formal offer is extended.'
  },
  {
    q: 'Does BPEL provide transport and accommodation for Gazipur plant roles?',
    a: 'Yes. We operate dedicated daily air-conditioned staff buses connecting key pickup hubs in Dhaka (Uttara, Mirpur, Mohakhali, Gazipur Bypass) with our Masterbari manufacturing plant. For senior engineering roles, subsidized guest accommodation is also available.'
  },
  {
    q: 'Do you hire fresh engineering graduates or offer student internships?',
    a: 'Absolutely. We run an annual Graduate Trainee Engineer (GTE) program for electrical and mechanical engineering graduates from BUET, CUET, RUET, KUET, and leading universities, as well as 3-month accredited industrial internships.'
  },
  {
    q: 'What professional development and IEB accreditation support is offered?',
    a: 'BPEL supports ongoing engineering education by sponsoring participation in IEEE and CIGRE technical conferences, covering IEB membership dues, and offering formal continuing professional development (CPD) credits.'
  },
  {
    q: 'How do I apply if my specific engineering specialization is not listed?',
    a: 'We always welcome speculative applications. You can use our "Submit Open CV" feature on this page or email your resume directly to hr@bpel.com.bd. Our talent acquisition team reviews speculative profiles weekly for upcoming projects.'
  }
];

export default function CareersFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(prev => prev === i ? -1 : i);
  };

  return (
    <div className="wrap">
      <SectionHead
        label="COMMON RECRUITMENT INQUIRIES"
        title="Frequently Asked Questions"
        desc="Clear guidance on interview stages, graduate opportunities, relocation benefits, and professional development at BPEL."
      />

      <div className="faq">
        {CAREERS_FAQS.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              className={`faq__item fade-in-up ${isOpen ? 'is-open' : ''}`}
              data-delay={(i % 3) * 100}
              key={f.q}
            >
              <h3>
                <button
                  type="button"
                  className="faq__q"
                  id={`careers-faq-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`careers-faq-a${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="faq__q-wrap">
                    <span className="faq__num">{`0${i + 1}`}</span>
                    <span className="faq__q-text">{f.q}</span>
                  </span>
                  <span className="faq__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                className="faq__a"
                id={`careers-faq-a${i}`}
                role="region"
                aria-labelledby={`careers-faq-q${i}`}
                style={{ maxHeight: isOpen ? '300px' : '0' }}
              >
                <div className="faq__a-content">
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
