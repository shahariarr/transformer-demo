'use client';

import { useEffect, useRef } from 'react';
import { DATA } from '@/lib/data';
import { useUI } from './UIProvider';
import SectionHead from './SectionHead';

export default function Faq({ split = false }) {
  const { openFaqs, toggleFaq } = useUI();
  const items = useRef([]);

  // `is-open` sits on the same element as the reveal class, so it is toggled directly
  useEffect(() => {
    items.current.forEach((el, i) => el && el.classList.toggle('is-open', openFaqs.has(i)));
  }, [openFaqs]);

  const questionsList = (
    <div className="faq" data-animate="slideInLeft">
      {DATA.faq.map((f, i) => (
        <div className="faq__item" key={f.q} ref={el => { items.current[i] = el; }}>
          <h3>
            <button
              type="button"
              className="faq__q"
              id={`faq-q${i}`}
              aria-expanded={openFaqs.has(i)}
              aria-controls={`faq-a${i}`}
              onClick={() => toggleFaq(i)}
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
          <div className="faq__a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}>
            <div className="faq__a-content">
              <p>{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (split) {
    return (
      <div className="wrap">
        <div className="faq-split">
          <div className="faq-split__header">
            <SectionHead
              label="COMMON INQUIRIES & TECHNICAL SPECIFICATIONS"
              title={<>Frequently Asked <span className="text-accent">Questions</span></>}
              desc="Clear guidance on transformer engineering configurations, manufacturing lead times, testing protocols, and substation EPC integration."
            />
          </div>

          <div className="faq-split__body">
            {questionsList}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <SectionHead
        label="COMMON INQUIRIES & TECHNICAL SPECIFICATIONS"
        title={<>Frequently Asked <span className="text-accent">Questions</span></>}
        desc="Clear guidance on transformer engineering configurations, manufacturing lead times, testing protocols, and substation EPC integration."
      />
      {questionsList}
    </div>
  );
}
