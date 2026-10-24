'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ETS_PRODUCTS } from '@/lib/ets-products';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

// Normalization helper for resilient comparisons (handles en-dashes, <=, spaces)
const norm = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .replace(/[\u2013\u2014–—]/g, '-')
    .replace(/[≤]/g, '<=')
    .replace(/\s+/g, ' ')
    .trim();

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="21" x2="14" y1="4" y2="4" />
    <line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" />
    <line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" />
    <line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`prod-filter-chevron ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ServiceIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

export default function ProductsDirectory() {
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedVoltage, setSelectedVoltage] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [selectedCooling, setSelectedCooling] = useState('All');
  const [selectedStandard, setSelectedStandard] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Accordion open/close state for filter groups
  const [openGroups, setOpenGroups] = useState({
    division: true,
    type: true,
    voltage: true,
    rating: true,
    cooling: false,
    standard: false
  });

  const toggleGroup = (key) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter calculation
  const filteredProducts = useMemo(() => {
    const q = norm(searchQuery);

    return ETS_PRODUCTS.filter(p => {
      // 1. Division filter
      if (selectedDivision !== 'all' && norm(p.division) !== norm(selectedDivision)) {
        return false;
      }

      // 2. Product Type filter
      if (selectedType !== 'All' && norm(p.productType) !== norm(selectedType)) {
        return false;
      }

      // 3. Voltage filter
      if (selectedVoltage !== 'All') {
        const matchesVoltage = (p.voltageClasses || []).some(
          v => norm(v).includes(norm(selectedVoltage)) || norm(selectedVoltage).includes(norm(v))
        );
        if (!matchesVoltage) return false;
      }

      // 4. Power Rating filter
      if (selectedRating !== 'All') {
        const matchesRating = (p.powerRatings || []).some(
          r => norm(r) === norm(selectedRating)
        );
        if (!matchesRating) return false;
      }

      // 5. Cooling filter
      if (selectedCooling !== 'All') {
        const matchesCooling = (p.cooling || []).some(
          c => norm(c) === norm(selectedCooling)
        );
        if (!matchesCooling) return false;
      }

      // 6. Standards filter
      if (selectedStandard !== 'All') {
        const matchesStandard = (p.standards || []).some(
          s => norm(s) === norm(selectedStandard)
        );
        if (!matchesStandard) return false;
      }

      // 7. Search query
      if (q) {
        const inName = norm(p.name).includes(q);
        const inDesc = norm(p.desc).includes(q);
        const inBadges = (p.badges || []).some(b => norm(b).includes(q));
        const inSpecs = (p.specs || []).some(s => norm(s).includes(q));
        const inApps = (p.applications || []).some(a => norm(a).includes(q));
        const inType = norm(p.productType).includes(q);
        const inDiv = norm(p.division).includes(q);
        if (!inName && !inDesc && !inBadges && !inSpecs && !inApps && !inType && !inDiv) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDivision, selectedType, selectedVoltage, selectedRating, selectedCooling, selectedStandard, searchQuery]);

  const isFiltered =
    selectedDivision !== 'all' ||
    selectedType !== 'All' ||
    selectedVoltage !== 'All' ||
    selectedRating !== 'All' ||
    selectedCooling !== 'All' ||
    selectedStandard !== 'All' ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSelectedDivision('all');
    setSelectedType('All');
    setSelectedVoltage('All');
    setSelectedRating('All');
    setSelectedCooling('All');
    setSelectedStandard('All');
    setSearchQuery('');
  };

  // Handler for division click with automatic cross-filter reconciliation
  const handleDivisionClick = (divId) => {
    const nextDiv = selectedDivision === divId ? 'all' : divId;
    setSelectedDivision(nextDiv);
    // If selectedType doesn't belong to the new division, reset it
    if (nextDiv !== 'all' && selectedType !== 'All') {
      const typeStillValid = ETS_PRODUCTS.some(
        p => norm(p.division) === norm(nextDiv) && norm(p.productType) === norm(selectedType)
      );
      if (!typeStillValid) {
        setSelectedType('All');
      }
    }
  };

  // Handler for product type click with automatic division alignment
  const handleTypeClick = (typeLabel) => {
    const nextType = selectedType === typeLabel ? 'All' : typeLabel;
    setSelectedType(nextType);
    if (nextType !== 'All') {
      const matchedProd = ETS_PRODUCTS.find(p => norm(p.productType) === norm(nextType));
      if (matchedProd && selectedDivision !== 'all' && norm(matchedProd.division) !== norm(selectedDivision)) {
        setSelectedDivision(matchedProd.division);
      }
    }
  };

  // Filter option lists with item counts
  const divisions = [
    { id: 'all', label: 'All', count: ETS_PRODUCTS.length },
    { id: 'Transformers', label: 'Transformers', count: ETS_PRODUCTS.filter(p => p.division === 'Transformers').length },
    { id: 'Switchgear', label: 'Switchgear', count: ETS_PRODUCTS.filter(p => p.division === 'Switchgear').length }
  ];

  const productTypes = [
    'Pad Mounted (UL)',
    'Medium Power (GSU)',
    'EHV Transformers',
    'Distribution',
    'Dry Type / Cast Resin',
    'Application-Specific',
    'Auxiliary',
    'BESS',
    'Package Substations',
    'Containerized',
    'Special Transformers',
    'MV Switchgear',
    'LV Switchgear'
  ].map(t => ({
    label: t,
    count: ETS_PRODUCTS.filter(p => norm(p.productType) === norm(t)).length
  }));

  const voltageClasses = [
    'Up to 36 kV',
    '36–132 kV',
    '132–220 kV',
    '220–765 kV'
  ].map(v => ({
    label: v,
    count: ETS_PRODUCTS.filter(p => (p.voltageClasses || []).some(vc => norm(vc).includes(norm(v)) || norm(v).includes(norm(vc)))).length
  }));

  const powerRatings = [
    '≤ 1 MVA',
    '1–10 MVA',
    '10–60 MVA',
    '60–200 MVA',
    '200+ MVA'
  ].map(r => ({
    label: r,
    count: ETS_PRODUCTS.filter(p => (p.powerRatings || []).some(pr => norm(pr) === norm(r))).length
  }));

  const coolingTypes = [
    'ONAN',
    'KNAN',
    'ONAF',
    'KNAF',
    'AN (Air Natural)'
  ].map(c => ({
    label: c,
    count: ETS_PRODUCTS.filter(p => (p.cooling || []).some(cl => norm(cl) === norm(c))).length
  }));

  const standards = [
    'IEC',
    'IEEE / ANSI',
    'UL Listed',
    'ATEX / IECEx'
  ].map(s => ({
    label: s,
    count: ETS_PRODUCTS.filter(p => (p.standards || []).some(st => norm(st) === norm(s))).length
  }));

  return (
    <div className="wrap">
      {/* Main 2-Column Catalog Container (Filters on Left, Products on Right) */}
      <div className="prod-catalog-container">
        
        {/* LEFT SIDEBAR: FILTERS */}
        <aside className={`prod-sidebar ${showMobileFilters ? 'is-mobile-open' : ''}`}>
          <div className="prod-sidebar-inner">
            {/* Sidebar Top Header */}
            <div className="prod-sidebar-header">
              <span className="prod-sidebar-title">
                <FilterIcon />
                <span>Filters</span>
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="prod-sidebar-reset"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Keyword Search in Sidebar */}
            <div className="prod-side-search">
              <span className="prod-side-search-icon" aria-hidden="true"><SearchIcon /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, rating..."
                className="prod-side-search-input"
                aria-label="Search products"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="prod-side-search-clear"
                  aria-label="Clear search"
                >
                  <CloseIcon />
                </button>
              ) : null}
            </div>

            {/* Filter Group: Division */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('division')}
              >
                <span className="prod-filter-group-title">Division</span>
                <ChevronIcon isOpen={openGroups.division} />
              </button>
              {openGroups.division && (
                <div className="prod-filter-pill-list">
                  {divisions.map(d => {
                    const isActive = selectedDivision === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleDivisionClick(d.id)}
                      >
                        <span>{d.label}</span>
                        <span className="prod-pill-count">({d.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Group: Product Type */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('type')}
              >
                <span className="prod-filter-group-title">Product Type</span>
                <ChevronIcon isOpen={openGroups.type} />
              </button>
              {openGroups.type && (
                <div className="prod-filter-pill-list">
                  {productTypes.map(t => {
                    const isActive = norm(selectedType) === norm(t.label);
                    return (
                      <button
                        key={t.label}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleTypeClick(t.label)}
                      >
                        <span>{t.label}</span>
                        <span className="prod-pill-count">({t.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Group: Voltage Class */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('voltage')}
              >
                <span className="prod-filter-group-title">Voltage Class</span>
                <ChevronIcon isOpen={openGroups.voltage} />
              </button>
              {openGroups.voltage && (
                <div className="prod-filter-pill-list">
                  {voltageClasses.map(v => {
                    const isActive = norm(selectedVoltage) === norm(v.label);
                    return (
                      <button
                        key={v.label}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedVoltage(isActive ? 'All' : v.label)}
                      >
                        <span>{v.label}</span>
                        <span className="prod-pill-count">({v.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Group: Power Rating */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('rating')}
              >
                <span className="prod-filter-group-title">Power Rating</span>
                <ChevronIcon isOpen={openGroups.rating} />
              </button>
              {openGroups.rating && (
                <div className="prod-filter-pill-list">
                  {powerRatings.map(r => {
                    const isActive = norm(selectedRating) === norm(r.label);
                    return (
                      <button
                        key={r.label}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedRating(isActive ? 'All' : r.label)}
                      >
                        <span>{r.label}</span>
                        <span className="prod-pill-count">({r.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Group: Cooling Type */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('cooling')}
              >
                <span className="prod-filter-group-title">Cooling Type</span>
                <ChevronIcon isOpen={openGroups.cooling} />
              </button>
              {openGroups.cooling && (
                <div className="prod-filter-pill-list">
                  {coolingTypes.map(c => {
                    const isActive = norm(selectedCooling) === norm(c.label);
                    return (
                      <button
                        key={c.label}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedCooling(isActive ? 'All' : c.label)}
                      >
                        <span>{c.label}</span>
                        <span className="prod-pill-count">({c.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Filter Group: Standards */}
            <div className="prod-filter-group">
              <button
                type="button"
                className="prod-filter-group-header"
                onClick={() => toggleGroup('standard')}
              >
                <span className="prod-filter-group-title">Standards</span>
                <ChevronIcon isOpen={openGroups.standard} />
              </button>
              {openGroups.standard && (
                <div className="prod-filter-pill-list">
                  {standards.map(s => {
                    const isActive = norm(selectedStandard) === norm(s.label);
                    return (
                      <button
                        key={s.label}
                        type="button"
                        className={`prod-filter-pill ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedStandard(isActive ? 'All' : s.label)}
                      >
                        <span>{s.label}</span>
                        <span className="prod-pill-count">({s.count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: PRODUCTS CONTENT & 2-COLUMN GRID */}
        <main className="prod-main-content">
          {/* Content Topbar: Count, Active Filter Chips, Mobile Toggle */}
          <div className="prod-content-topbar">
            <div className="prod-count-badge">
              <span className="prod-status-indicator" aria-hidden="true" />
              <span><strong>{filteredProducts.length}</strong> products found</span>
            </div>

            {/* Active Filter Chips */}
            <div className="prod-active-chips">
              {selectedDivision !== 'all' && (
                <span className="prod-active-chip">
                  <span>Division: {selectedDivision}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedDivision('all')} aria-label="Remove division filter"><CloseIcon /></button>
                </span>
              )}
              {selectedType !== 'All' && (
                <span className="prod-active-chip">
                  <span>Type: {selectedType}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedType('All')} aria-label="Remove type filter"><CloseIcon /></button>
                </span>
              )}
              {selectedVoltage !== 'All' && (
                <span className="prod-active-chip">
                  <span>Voltage: {selectedVoltage}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedVoltage('All')} aria-label="Remove voltage filter"><CloseIcon /></button>
                </span>
              )}
              {selectedRating !== 'All' && (
                <span className="prod-active-chip">
                  <span>Rating: {selectedRating}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedRating('All')} aria-label="Remove rating filter"><CloseIcon /></button>
                </span>
              )}
              {selectedCooling !== 'All' && (
                <span className="prod-active-chip">
                  <span>Cooling: {selectedCooling}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedCooling('All')} aria-label="Remove cooling filter"><CloseIcon /></button>
                </span>
              )}
              {selectedStandard !== 'All' && (
                <span className="prod-active-chip">
                  <span>Standard: {selectedStandard}</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSelectedStandard('All')} aria-label="Remove standard filter"><CloseIcon /></button>
                </span>
              )}
              {searchQuery.trim() && (
                <span className="prod-active-chip">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button type="button" className="prod-chip-remove" onClick={() => setSearchQuery('')} aria-label="Remove search query"><CloseIcon /></button>
                </span>
              )}
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              className="prod-mobile-filter-btn"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <FilterIcon />
              <span>{showMobileFilters ? 'Hide Filters' : 'Filters'}</span>
            </button>
          </div>

          {/* 2-Column Product Grid Following Home Page .pcard Design */}
          {filteredProducts.length > 0 ? (
            <div className="prod-grid-2col">
              {filteredProducts.map((p) => {
                const firstBadge = p.badges[0] || (p.division === 'Switchgear' ? 'IEC 62271' : 'Type Tested');
                return (
                  <article className="pcard" key={p.slug}>
                    {/* Image Header with Badges */}
                    <div className="pcard__img">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                      />
                      {firstBadge && (
                        <span className="pcard__badge">
                          <BoltIcon />
                          <span>{firstBadge}</span>
                        </span>
                      )}
                      <span className="pcard__type-tag">{p.typeTag}</span>
                    </div>

                    {/* Body Details */}
                    <div className="pcard__body">
                      <div className="pcard__cat">
                        <span className="pcard__dot" aria-hidden="true" />
                        <span>{p.cat}</span>
                      </div>

                      <h3 className="pcard__title">
                        <Link href={`/products/${p.slug}/`}>{p.name}</Link>
                      </h3>

                      <p className="pcard__desc">{p.desc}</p>

                      {/* Specs Box */}
                      <dl className="pcard__specs-box">
                        {p.specRows.map((spec) => (
                          <div className="pcard__spec-row" key={spec.key}>
                            <dt className="pcard__spec-key">{spec.key}</dt>
                            <dd className="pcard__spec-val">{spec.val}</dd>
                          </div>
                        ))}
                      </dl>

                      {/* Tags */}
                      {p.tags && p.tags.length > 0 && (
                        <ul className="pcard__tags">
                          {Array.from(new Set(p.tags)).map(t => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}

                      {/* Action Buttons */}
                      <div className="pcard__actions">
                        <Link href={`/products/${p.slug}/`} className="pcard__btn pcard__btn--main">
                          <span>View Details</span>
                          <Arrow />
                        </Link>
                        <a
                          href={`/contact/?product=${encodeURIComponent(p.name)}`}
                          className="pcard__btn pcard__btn--ghost"
                        >
                          Inquiry
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Bespoke Custom Build Card (.pcard--more) */}
              <article className="pcard pcard--more">
                <div className="pcard__custom-visual" aria-hidden="true">
                  <div className="pcard__custom-pattern" />
                  <div className="pcard__custom-rings" />
                  <span className="pcard__more-badge">
                    <BoltIcon />
                    <span>Bespoke Engineering</span>
                  </span>
                  <span className="pcard__custom-tag">Custom Build</span>
                  <div className="pcard--more__icon">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                </div>

                <div className="pcard__body pcard__body--more">
                  <div className="pcard__cat pcard__cat--custom">
                    <span className="pcard__dot pcard__dot--gold" aria-hidden="true" />
                    <span>Specialist Engineering</span>
                  </div>

                  <h3 className="pcard__title pcard__title--more">Need a Custom Rating or Special Voltage?</h3>

                  <div className="pcard__specs-box pcard__specs-box--custom">
                    <div className="pcard__custom-feature">
                      <span className="pcard__custom-check"><CheckIcon /></span>
                      <span><strong>Capacity:</strong> 50 kVA up to 300,000 kVA (300 MVA)</span>
                    </div>
                    <div className="pcard__custom-feature">
                      <span className="pcard__custom-check"><CheckIcon /></span>
                      <span><strong>Primary Voltage:</strong> Tailored up to 400 kV</span>
                    </div>
                    <div className="pcard__custom-feature">
                      <span className="pcard__custom-check"><CheckIcon /></span>
                      <span><strong>Vector Group:</strong> Dyn11, YNd11, YNyn0 or custom</span>
                    </div>
                    <div className="pcard__custom-feature">
                      <span className="pcard__custom-check"><CheckIcon /></span>
                      <span><strong>Tap Changer:</strong> Off-circuit (DETC) or On-load (OLTC)</span>
                    </div>
                  </div>

                  <div className="pcard__actions">
                    <a href="/contact/" className="pcard__btn pcard__btn--quote">
                      <span>Request Custom Quote</span>
                      <Arrow />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            /* Empty State */
            <div className="prod-empty-state">
              <div className="prod-empty-icon" aria-hidden="true">
                <SearchIcon />
              </div>
              <h3>No products match your current filters</h3>
              <p>Try searching for a different keyword or resetting your filter criteria.</p>
              <button type="button" onClick={resetFilters} className="btn btn--primary">
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Engineering Support Help Box */}
      <div className="faq__footer-help fade-in-up" data-delay="200" style={{ marginTop: '3.5rem' }}>
        <div className="faq-help__main">
          <span className="faq-help__eyebrow">
            <ServiceIcon>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </ServiceIcon>
            Engineering Support
          </span>
          <h4>Still have questions about your project requirements?</h4>
          <p>
            Our power engineering team can assist with custom kVA sizing, Guaranteed Technical Particulars (GTP), and tailored manufacturing specifications for utility and industrial compliance.
          </p>
          <ul className="faq-help__services">
            <li>
              <ServiceIcon>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </ServiceIcon>
              <span>Custom kVA & Voltage Class</span>
            </li>
            <li>
              <ServiceIcon>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </ServiceIcon>
              <span>Technical Datasheets (GTP)</span>
            </li>
            <li>
              <ServiceIcon>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </ServiceIcon>
              <span>Factory Witness Testing & Lead Times</span>
            </li>
          </ul>
        </div>
        <div className="faq-help__aside">
          <p className="faq-help__aside-title">Talk to our engineers</p>
          <p className="faq-help__aside-text">Share your requirement and get a clear technical answer within 24 hours.</p>
          <div className="faq-help__actions">
            <a href="/contact/" className="btn btn--primary">
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
