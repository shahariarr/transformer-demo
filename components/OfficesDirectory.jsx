'use client';

import { useState } from 'react';
import SectionHead from './SectionHead';
import { OFFICES } from '@/lib/offices';
import { WA_PATH } from '@/lib/icons';

export default function OfficesDirectory({ onSelectOfficeForInquiry }) {
  const [activeOfficeId, setActiveOfficeId] = useState(OFFICES[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const activeOffice = OFFICES.find(o => o.id === activeOfficeId) || OFFICES[0];

  const copyAddress = (id, text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInquire = (officeId) => {
    if (onSelectOfficeForInquiry) {
      onSelectOfficeForInquiry(officeId);
    }
    const rfqElement = document.getElementById('rfq') || document.getElementById('contact-form');
    if (rfqElement) {
      rfqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="facilities-section">
      <SectionHead
        label="OUR STRATEGIC LOCATIONS"
        title="3 Strategic Facilities Across Bangladesh"
        desc="Visit or consult directly with our corporate headquarters in Dhaka, heavy manufacturing campus in Gazipur, or regional operations hub in Chattogram."
      />

      {/* 3 Facility Selector Tabs (Compact & Clean) */}
      <div className="facilities-selector-grid" role="tablist" aria-label="Select a BPEL facility">
        {OFFICES.map((office) => {
          const isSelected = activeOfficeId === office.id;

          return (
            <button
              key={office.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`facility-tab-card fade-in-up ${isSelected ? 'is-active' : ''}`}
              onClick={() => setActiveOfficeId(office.id)}
            >
              <div className="facility-tab-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>

              <div className="facility-tab-card__text">
                <div className="facility-tab-card__top">
                  <span className="facility-tab-card__city">{office.city}</span>
                  <span className={`facility-badge facility-badge--${office.badgeType}`}>
                    {office.badge}
                  </span>
                </div>
                <h3 className="facility-tab-card__name">{office.shortName}</h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Panel: Compact Details (Matching Above RFQ Section) + Live Embedded Google Map */}
      <div className="facility-showcase-panel fade-in-up" data-delay="120">
        {/* Left Side: Compact Facility Details matching RFQ section card */}
        <div className="facility-showcase__details">
          <div className="facility-showcase__header">
            <span className="facility-showcase__kicker">STRATEGIC FACILITY</span>
            <h3 className="facility-showcase__title">{activeOffice.name}</h3>
            <p className="facility-showcase__lead">{activeOffice.visitingInfo}</p>
          </div>

          <div className="facility-direct-list">
            {/* Street Address */}
            <div className="facility-direct-item">
              <div className="facility-direct-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="facility-direct-content">
                <div className="facility-direct-label-row">
                  <span className="facility-direct-label">FULL STREET ADDRESS</span>
                  <button
                    type="button"
                    className="facility-copy-link"
                    onClick={() => copyAddress(activeOffice.id, activeOffice.address)}
                    aria-label={`Copy address for ${activeOffice.name}`}
                  >
                    {copiedId === activeOffice.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="facility-direct-val facility-direct-val--address">
                  {activeOffice.address}
                </p>
              </div>
            </div>

            {/* Direct Telephone Lines */}
            <div className="facility-direct-item">
              <div className="facility-direct-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="facility-direct-content">
                <span className="facility-direct-label">DIRECT TELEPHONE & HOTLINE</span>
                <div className="facility-direct-val facility-direct-links">
                  <a href={`tel:${activeOffice.phoneRaw}`} className="facility-direct-link">
                    {activeOffice.phone}
                  </a>
                  <span className="facility-sep">•</span>
                  <a href={`tel:${activeOffice.mobileRaw}`} className="facility-direct-link">
                    {activeOffice.mobile}
                  </a>
                </div>
              </div>
            </div>

            {/* Dedicated Branch Email & Hours */}
            <div className="facility-direct-item">
              <div className="facility-direct-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="facility-direct-content">
                <span className="facility-direct-label">BRANCH EMAIL & SCHEDULE</span>
                <div className="facility-direct-val">
                  <a href={`mailto:${activeOffice.email}`} className="facility-direct-link facility-direct-link--primary">
                    {activeOffice.email}
                  </a>
                  <span className="facility-schedule-note">{activeOffice.hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="facility-showcase__actions">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeOffice.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              title={`Get Google Maps driving directions to ${activeOffice.name}`}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              <span>Get Driving Directions</span>
            </a>          
            <a
              href={`https://wa.me/${activeOffice.whatsapp}?text=Hello%20BPEL%20${encodeURIComponent(activeOffice.shortName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa facility-wa-btn"
              title={`WhatsApp ${activeOffice.shortName}`}
              aria-label={`WhatsApp ${activeOffice.shortName}`}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d={WA_PATH} />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Side: Embedded Live Google Map with Header Bar */}
        <div className="facility-showcase__map-wrap">
          <div className="facility-map-header">
            <div className="facility-map-header__info">
              <span className="facility-map-pulse-dot" aria-hidden="true" />
              <span className="facility-map-header__title">
                {activeOffice.shortName} • {activeOffice.city}
              </span>
            </div>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(activeOffice.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="facility-map-external-link"
              title="Open full map in Google Maps"
            >
              <span>Open in Google Maps</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>

          <div className="facility-map-frame">
            <iframe
              key={activeOffice.id}
              title={`Interactive Map for ${activeOffice.name}`}
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
    </div>
  );
}
