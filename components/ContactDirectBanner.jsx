'use client';

import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export default function ContactDirectBanner() {
  const c = DATA.contact;

  return (
    <div className="contact-direct-banner">
      <div className="wrap">
        <div className="contact-direct-banner__inner fade-in-up">
          <div className="contact-direct-banner__text">
            <h2 className="contact-direct-banner__title">
              Prefer to Speak Directly?
            </h2>
            <p className="contact-direct-banner__desc">
              Our senior power engineering team is available to discuss your electrical load, single-line diagrams, or custom substation requirements. Call or chat with us for immediate assistance.
            </p>
          </div>

          <div className="contact-direct-banner__actions">
            <a
              href={`tel:${c.phoneDisplay.replace(/\s+/g, '')}`}
              className="btn btn--primary contact-direct-banner__btn"
            >
              <span>{c.phoneDisplay}</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa contact-direct-banner__wa"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={WA_PATH} />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:tenders@bpel-power.com"
              className="btn btn--outline contact-direct-banner__email"
            >
              <span>tenders@bpel-power.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
