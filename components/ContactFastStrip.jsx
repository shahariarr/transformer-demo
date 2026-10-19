'use client';

import { CONTACT_CHANNELS } from '@/lib/offices';

export default function ContactFastStrip() {
  const { emergencyHotline, whatsappDesk, tenderDesk, responseTime } = CONTACT_CHANNELS;

  return (
    <div className="contact-fast-strip fade-in-up">
      <div className="fast-strip-card fast-strip-card--emergency">
        <div className="fast-strip-icon-wrap fast-strip-icon-wrap--red">
          <span className="fast-strip-pulse" aria-hidden="true" />
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="fast-strip-content">
          <span className="fast-strip-eyebrow">GRID OUTAGE &amp; EMERGENCY</span>
          <h4 className="fast-strip-title">{emergencyHotline.title}</h4>
          <a href={`tel:${emergencyHotline.numberRaw}`} className="fast-strip-action-link">
            {emergencyHotline.number}
          </a>
          <p className="fast-strip-note">{emergencyHotline.note}</p>
        </div>
      </div>

      <div className="fast-strip-card">
        <div className="fast-strip-icon-wrap fast-strip-icon-wrap--green">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
          </svg>
        </div>
        <div className="fast-strip-content">
          <span className="fast-strip-eyebrow">INSTANT MESSAGING</span>
          <h4 className="fast-strip-title">{whatsappDesk.title}</h4>
          <a href={whatsappDesk.link} target="_blank" rel="noopener noreferrer" className="fast-strip-action-link">
            Chat on WhatsApp →
          </a>
          <p className="fast-strip-note">{whatsappDesk.note}</p>
        </div>
      </div>

      <div className="fast-strip-card">
        <div className="fast-strip-icon-wrap fast-strip-icon-wrap--blue">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <div className="fast-strip-content">
          <span className="fast-strip-eyebrow">TENDERS &amp; DRAWINGS</span>
          <h4 className="fast-strip-title">{tenderDesk.title}</h4>
          <a href={`mailto:${tenderDesk.email}`} className="fast-strip-action-link">
            {tenderDesk.email}
          </a>
          <p className="fast-strip-note">{tenderDesk.note}</p>
        </div>
      </div>

      <div className="fast-strip-card fast-strip-card--stat">
        <div className="fast-strip-stat-block">
          <span className="fast-strip-stat-num">{responseTime.stat}</span>
          <span className="fast-strip-stat-label">{responseTime.label}</span>
          <span className="fast-strip-guarantee-pill">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Verified SLA</span>
          </span>
        </div>
      </div>
    </div>
  );
}
