'use client';

import { useState, useMemo } from 'react';
import { ALL_PARTNERS } from '@/lib/partners';
import RawSvg from '@/components/RawSvg';
import styles from '@/app/about/partners/page.module.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function PartnersDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_PARTNERS;
    return ALL_PARTNERS.filter(partner => {
      return (
        partner.name.toLowerCase().includes(q) ||
        partner.origin.toLowerCase().includes(q) ||
        partner.allianceType.toLowerCase().includes(q) ||
        partner.standard.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="partners-dir">
      {/* ── Search Filter ── */}
      <div className={`${styles.toolbar} fade-in-up`}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search OEM, standard, laboratory or fluid..."
            className={styles.searchInput}
            aria-label="Search partners and alliances"
          />
          {searchQuery ? (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setSearchQuery('')}
              aria-label="Clear search input"
            >
              &times;
            </button>
          ) : null}
        </div>
      </div>

      {/* ── Results Info Bar ── */}
      <div className="partners-results-info">
        <span>
          Showing <strong>{filteredPartners.length}</strong> of <strong>{ALL_PARTNERS.length}</strong> verified strategic partners &amp; accreditations
        </span>
        {searchQuery ? (
          <span className="partners-results-badge">
            Search filter: &ldquo;{searchQuery}&rdquo;
          </span>
        ) : null}
      </div>

      {/* ── Partners Bento / Showcase Grid ── */}
      {filteredPartners.length > 0 ? (
        <div className="partners-grid" role="list">
          {filteredPartners.map(partner => (
            <article
              key={partner.id}
              className="partner-card fade-in-up"
              style={{ '--brand-color': partner.color }}
              role="listitem"
            >
              <div className="partner-card__logo-box" title={partner.name}>
                <RawSvg markup={partner.svg} className="partner-card__svg" />
              </div>
              <h3 className="partner-card__name">{partner.name}</h3>
            </article>
          ))}
        </div>
      ) : (
        <div className="partners-empty-state">
          <div className="partners-empty-state__icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3>No matching partners found</h3>
          <p>We could not find any partners matching &ldquo;{searchQuery}&rdquo;.</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
