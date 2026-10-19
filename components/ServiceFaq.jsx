'use client';

import { useState } from 'react';

export default function ServiceFaq({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="service-faq-list" role="region" aria-label="Service Frequently Asked Questions">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`service-faq-card ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="service-faq-btn"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              aria-expanded={isOpen}
              aria-controls={`svc-faq-${idx}`}
            >
              <span className="service-faq-q">
                <span className="service-faq-num">0{idx + 1}</span>
                <span>{faq.q}</span>
              </span>
              <span className="service-faq-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
            <div
              id={`svc-faq-${idx}`}
              className="service-faq-body"
              role="region"
              aria-labelledby={`svc-btn-${idx}`}
              style={{ display: isOpen ? 'block' : 'none' }}
            >
              <p className="service-faq-answer">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
