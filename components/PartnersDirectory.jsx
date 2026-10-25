'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_PARTNERS, PARTNER_CATEGORIES } from '@/lib/partners';
import RawSvg from '@/components/RawSvg';
import { ArrowRight } from '@/components/PageParts';
import styles from '@/app/about/partners/page.module.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function PartnersDirectory() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = useMemo(() => {
    return ALL_PARTNERS.filter(partner => {
      const matchesCategory = activeCategory === 'all' || partner.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        partner.name.toLowerCase().includes(q) ||
        partner.origin.toLowerCase().includes(q) ||
        partner.allianceType.toLowerCase().includes(q) ||
        partner.standard.toLowerCase().includes(q) ||
        partner.summary.toLowerCase().includes(q) ||
        partner.scopes.some(s => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="partners-dir">
      {/* ── Controls Bar: Category Pills + Search Filter (matches Blog & Insights) ── */}
      <div className={`${styles.toolbar} fade-in-up`}>
        <div className={styles.catTabs} role="tablist" aria-label="Filter partners by category">
          {PARTNER_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            const label = cat.id === 'all' ? 'All' : cat.label;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.catPill}${isActive ? ` ${styles.isActive}` : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {label}
              </button>
            );
          })}
        </div>

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
              <div className="partner-card__header">
                <div className="partner-card__logo-box" title={partner.name}>
                  <RawSvg markup={partner.svg} className="partner-card__svg" />
                </div>
                <div className="partner-card__meta">
                  <span className="partner-card__origin">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    {partner.origin}
                  </span>
                  <span className="partner-card__standard-pill" title={`Standard: ${partner.standard}`}>
                    {partner.standard}
                  </span>
                </div>
              </div>

              <div className="partner-card__body">
                <span className="partner-card__type">{partner.allianceType}</span>
                <h3 className="partner-card__name">{partner.name}</h3>
                <p className="partner-card__summary">{partner.summary}</p>

                <div className="partner-card__scopes">
                  <h4 className="partner-card__scopes-title">Technical Scope &amp; Assurance:</h4>
                  <ul className="partner-card__scopes-list">
                    {partner.scopes.map((scope, idx) => (
                      <li key={idx} className="partner-card__scope-item">
                        <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{scope}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="partner-card__footer">
                <Link
                  href={`/contact/?ref=partner&partner=${encodeURIComponent(partner.name)}`}
                  className="partner-card__action"
                >
                  <span>Request Specifications</span>
                  <ArrowRight />
                </Link>
              </div>
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
          <h3>No matching partners or alliances found</h3>
          <p>We could not find any partners matching &ldquo;{searchQuery}&rdquo; in this category.</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
