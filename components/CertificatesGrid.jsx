'use client';

import { useState, useMemo } from 'react';
import { QA_CERTS } from '@/lib/quality';
import { useUI } from './UIProvider';

const CATEGORIES = [
  { id: 'all', label: 'All Documents' },
  { id: 'iso', label: 'ISO Management Systems' },
  { id: 'type-test', label: 'Type Test Reports' },
  { id: 'iec-special', label: 'IEC Dielectric & Special Tests' },
  { id: 'conformity', label: 'CE & Conformity' }
];

export default function CertificatesGrid() {
  const { openCert } = useUI();
  const [activeTab, setActiveTab] = useState('all');

  const filteredCerts = useMemo(() => {
    return QA_CERTS.map((cert, index) => ({ ...cert, originalIndex: index })).filter((c) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'iso') return c.badge.includes('ISO');
      if (activeTab === 'type-test') return c.badge.includes('Type Test') || c.badge.includes('IEC 60076-2') || c.badge.includes('IEC 60076-10');
      if (activeTab === 'iec-special') return c.badge.includes('IEC 60076-5') || c.badge.includes('IEC 60076-3') || c.badge.includes('IEC 60296') || c.badge.includes('Routine');
      if (activeTab === 'conformity') return c.badge.includes('CE');
      return true;
    });
  }, [activeTab]);

  return (
    <div className="wrap">
      {/* Section Header */}
      <div className="cert-grid-header fade-in-up">
        <div className="cert-header-eyebrow">
          <span className="cert-eyebrow-pulse" aria-hidden="true" />
          <span>INDEPENDENT THIRD-PARTY VERIFICATION</span>
        </div>
        <h2 className="cert-grid-title">Official Certificates &amp; Laboratory Test Reports</h2>
        <p className="cert-grid-lead">
          Every certificate, ISO accreditation, and laboratory type-test report is issued by accredited national and international inspection bodies (CNAS, IAF, ilac-MRA, UDEM). Click any document to inspect the full report.
        </p>

        {/* Filter Tabs */}
        <div className="cert-filter-bar" role="tablist" aria-label="Filter Certificates by Category">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all'
              ? QA_CERTS.length
              : QA_CERTS.filter((c) => {
                  if (cat.id === 'iso') return c.badge.includes('ISO');
                  if (cat.id === 'type-test') return c.badge.includes('Type Test') || c.badge.includes('IEC 60076-2') || c.badge.includes('IEC 60076-10');
                  if (cat.id === 'iec-special') return c.badge.includes('IEC 60076-5') || c.badge.includes('IEC 60076-3') || c.badge.includes('IEC 60296') || c.badge.includes('Routine');
                  if (cat.id === 'conformity') return c.badge.includes('CE');
                  return true;
                }).length;

            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`cert-pill-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="cert-pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Certificate Cards */}
      <div className="cert-cards-grid">
        {filteredCerts.map((c, i) => (
          <article
            key={c.certNo + i}
            className="cert-card fade-in-up"
            data-delay={(i % 3) * 80}
            role="button"
            tabIndex="0"
            aria-label={`Inspect official document: ${c.title}`}
            onClick={() => openCert(c.originalIndex)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCert(c.originalIndex);
              }
            }}
          >
            {/* Document Matte Frame Preview */}
            <div className="cert-card__preview">
              <div className="cert-card__frame">
                <img
                  src={c.src}
                  alt={c.alt}
                  className="cert-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Hover Inspect Overlay */}
              <div className="cert-card__overlay" aria-hidden="true">
                <span className="cert-card__inspect-pill">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>Click to Inspect</span>
                </span>
              </div>

              {/* Top Document Badge */}
              <div className="cert-card__top-badge">
                <span className="cert-card__badge-tag">{c.badge}</span>
              </div>
            </div>

            {/* Document Card Info */}
            <div className="cert-card__body">
              <span className="cert-card__cert-no">{c.certNo}</span>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__sub">{c.sub}</p>
              <p className="cert-card__desc">{c.desc}</p>

              <div className="cert-card__footer">
                <span className="cert-card__issuer" title={c.issuer}>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>{c.issuer}</span>
                </span>

                <button
                  type="button"
                  className="cert-card__btn"
                  aria-hidden="true"
                  tabIndex="-1"
                >
                  <span>Inspect</span>
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
