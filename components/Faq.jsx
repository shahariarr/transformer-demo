'use client';

import { useEffect, useRef } from 'react';
import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { useUI } from './UIProvider';
import SectionHead from './SectionHead';

const ServiceIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export default function Faq() {
  const { openFaqs, toggleFaq } = useUI();
  const items = useRef([]);

  // `is-open` sits on the same element as the reveal class, so it is toggled directly
  useEffect(() => {
    items.current.forEach((el, i) => el && el.classList.toggle('is-open', openFaqs.has(i)));
  }, [openFaqs]);

  return (
    <div className="wrap">
      <SectionHead label="COMMON INQUIRIES & TECHNICAL SPECIFICATIONS" title="Frequently Asked Questions"
        desc="Clear guidance on transformer engineering configurations, manufacturing lead times, testing protocols, and substation EPC integration." />
      <div className="faq">
        {DATA.faq.map((f, i) => (
          <div className="faq__item fade-in-up" data-delay={(i % 3) * 110} key={f.q} ref={el => { items.current[i] = el; }}>
            <h3>
              <button type="button" className="faq__q" id={`faq-q${i}`} aria-expanded={openFaqs.has(i)} aria-controls={`faq-a${i}`} onClick={() => toggleFaq(i)}>
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
            <div className="faq__a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
              <div className="faq__a-content">
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="faq__footer-help fade-in-up" data-delay="160">
        <div className="faq-help__main">
          <span className="faq-help__eyebrow">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Engineering Support
          </span>
          <h4>Still have questions about your project requirements?</h4>
          <p>Our power engineering team can provide custom calculation sheets, thermal ratings, and turnkey feasibility studies.</p>
          <ul className="faq-help__services">
            <li><ServiceIcon><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="11" x2="8" y2="11.01" /><line x1="12" y1="11" x2="12" y2="11.01" /><line x1="16" y1="11" x2="16" y2="11.01" /><line x1="8" y1="15" x2="8" y2="15.01" /><line x1="12" y1="15" x2="12" y2="15.01" /><line x1="16" y1="15" x2="16" y2="18" /></ServiceIcon><span>Calculation sheets</span></li>
            <li><ServiceIcon><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></ServiceIcon><span>Thermal ratings</span></li>
            <li><ServiceIcon><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></ServiceIcon><span>Feasibility studies</span></li>
          </ul>
        </div>
        <div className="faq-help__aside">
          <p className="faq-help__aside-title">Talk to our engineers</p>
          <div className="faq-help__actions">
            <a
              href="/contact/"
              className="btn btn--primary"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>Ask an Engineer</span>
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa facility-wa-btn"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={WA_PATH} />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
