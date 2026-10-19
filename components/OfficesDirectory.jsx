'use client';

import { useState } from 'react';
import { OFFICES } from '@/lib/offices';

export default function OfficesDirectory({ onSelectOfficeForInquiry }) {
  const [activeOfficeId, setActiveOfficeId] = useState(OFFICES[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const activeOffice = OFFICES.find(o => o.id === activeOfficeId) || OFFICES[0];

  const copyAddress = (id, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="offices-container">
      {/* Section Masthead */}
      <div className="offices-masthead fade-in-up">
        <div className="offices-masthead__eyebrow">
          <span className="offices-pulse-dot" aria-hidden="true" />
          <span>OUR STRATEGIC LOCATIONS</span>
        </div>
        <h2 className="offices-masthead__title">3 Strategic Facilities Across Bangladesh</h2>
        <p className="offices-masthead__lead">
          Select any facility below to view its direct telephone, visiting guidelines, department routing, and interactive directions.
        </p>
      </div>

      {/* 3 Compact & Convenient Cards */}
      <div className="offices-compact-grid" role="tablist" aria-label="Select a BPEL facility">
        {OFFICES.map((office) => {
          const isSelected = activeOfficeId === office.id;

          return (
            <div
              key={office.id}
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              className={`office-compact-card fade-in-up ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setActiveOfficeId(office.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveOfficeId(office.id);
                }
              }}
            >
              {/* Top Row: City Chip + Role Badge */}
              <div className="compact-card__top">
                <span className="compact-city-chip">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <span>{office.city}</span>
                </span>

                <span className={`compact-role-badge compact-role-badge--${office.badgeType}`}>
                  {office.badge}
                </span>
              </div>

              {/* Title & Short Address */}
              <div className="compact-card__main">
                <h3 className="compact-card__title">{office.name}</h3>
                <p className="compact-card__address" title={office.address}>
                  {office.landmark}
                </p>
              </div>

              {/* Quick Contact & Status Bar */}
              <div className="compact-card__quick-info">
                <div className="compact-phone-item">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href={`tel:${office.phoneRaw}`}
                    onClick={(e) => e.stopPropagation()}
                    className="compact-phone-link"
                  >
                    {office.phone}
                  </a>
                </div>

                <span className="compact-status-chip">
                  <span className="compact-status-dot" aria-hidden="true" />
                  <span>Open Mon–Thu</span>
                </span>
              </div>

              {/* Card Footer: Selection Indicator & Action Link */}
              <div className="compact-card__footer">
                <div className="compact-select-indicator">
                  <span className="compact-radio-circle" aria-hidden="true" />
                  <span>{isSelected ? 'Active Location' : 'Click to View'}</span>
                </div>

                <div className="compact-card__quick-actions">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="compact-action-btn"
                    title={`Google Maps directions to ${office.name}`}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Map</span>
                  </a>

                  <a
                    href={`https://wa.me/${office.whatsapp}?text=Hello%20BPEL%20${encodeURIComponent(office.shortName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="compact-action-btn compact-action-btn--wa"
                    title={`WhatsApp ${office.shortName}`}
                  >
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
                    </svg>
                    <span>WA</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Focused Facility Details & Interactive Map (Shows Active Facility Cleanly) */}
      <div className="office-focused-panel fade-in-up">
        {/* Left Side: Active Office Details */}
        <div className="focused-panel__details">
          <div className="focused-panel__header">
            <div className="focused-panel__badge-row">
              <span className={`office-badge office-badge--${activeOffice.badgeType}`}>
                {activeOffice.badge}
              </span>
              <span className="focused-city-tag">📍 {activeOffice.city}, Bangladesh</span>
            </div>

            <h3 className="focused-panel__title">{activeOffice.name}</h3>
            <p className="focused-panel__visiting">{activeOffice.visitingInfo}</p>
          </div>

          <div className="focused-panel__meta-list">
            {/* Full Address with Copy */}
            <div className="focused-meta-item">
              <span className="focused-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className="focused-meta-content">
                <span className="focused-meta-label">Full Street Address</span>
                <p className="focused-address-text">{activeOffice.address}</p>
                <button
                  type="button"
                  className="focused-copy-btn"
                  onClick={() => copyAddress(activeOffice.id, activeOffice.address)}
                >
                  {copiedId === activeOffice.id ? (
                    <>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span style={{ color: '#059669' }}>Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Telephone & Mobile */}
            <div className="focused-meta-item">
              <span className="focused-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div className="focused-meta-content">
                <span className="focused-meta-label">Direct Lines</span>
                <div className="focused-phone-row">
                  <a href={`tel:${activeOffice.phoneRaw}`} className="focused-link">{activeOffice.phone}</a>
                  <span className="focused-sep">•</span>
                  <a href={`tel:${activeOffice.mobileRaw}`} className="focused-link">{activeOffice.mobile}</a>
                </div>
              </div>
            </div>

            {/* Department Email */}
            <div className="focused-meta-item">
              <span className="focused-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div className="focused-meta-content">
                <span className="focused-meta-label">Dedicated Branch Email</span>
                <a href={`mailto:${activeOffice.email}`} className="focused-link focused-link--email">
                  {activeOffice.email}
                </a>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="focused-panel__actions">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeOffice.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>Get Driving Directions</span>
            </a>

            <button
              type="button"
              className="btn btn--line"
              onClick={() => {
                if (onSelectOfficeForInquiry) onSelectOfficeForInquiry(activeOffice.id);
                const formEl = document.getElementById('contact-form');
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Inquire for {activeOffice.city}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side: Embedded Live Google Map */}
        <div className="focused-panel__map">
          <iframe
            title={`Map for ${activeOffice.name}`}
            src={activeOffice.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
