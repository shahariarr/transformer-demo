'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DATA } from '@/lib/data';
import { SERVICES } from '@/lib/services';
import styles from '@/app/sitemap/page.module.css';

// -------------------------------------------------------------
// STATIC DIRECTORY STRUCTURES
// -------------------------------------------------------------

const CORPORATE_PAGES = [
  { href: '/', title: 'Home', desc: 'BPEL corporate homepage, high-voltage transformer manufacturing, switchgear & turnkey substations.', tag: 'Main', category: 'Corporate' },
  { href: '/about/', title: 'About BPEL', desc: 'Company history, 40+ years engineering legacy, manufacturing capabilities & mission.', tag: 'Corporate', category: 'Corporate' },
  { href: '/about/leaders/', title: 'Leadership & Board of Directors', desc: 'Executive leadership team, board members, and senior power engineering directors.', tag: 'Leadership', category: 'Corporate' },
  { href: '/about/ets/', title: 'ETS Manufacturing Facility', desc: 'Electro Technology Services (ETS) state-of-the-art production plant & high-voltage lab.', tag: 'Facility', category: 'Corporate' },
  { href: '/about/partners/', title: 'Strategic Partners & Alliances', desc: 'Global technology partners, raw material suppliers, and testing consortiums.', tag: 'Partners', category: 'Corporate' },
  { href: '/engineering/', title: 'Engineering & Manufacturing Discipline', desc: 'Precision winding, core cutting, vacuum drying, tank fabrication, and quality assurance.', tag: 'Factory', category: 'Corporate' },
  { href: '/certifications/', title: 'Quality Certifications & Test Reports', desc: 'ISO 9001:2015, ISO 14001, ISO 45001, and CPRI / BSTI type-test certifications.', tag: 'Compliance', category: 'Corporate' },
  { href: '/careers/', title: 'Careers & Opportunities', desc: 'Engineering careers, production openings, and graduate trainee electrical programs.', tag: 'HR', category: 'Corporate' },
  { href: '/contact/', title: 'Contact & Quotation (RFQ)', desc: 'Global sales offices, factory address, contact numbers, and RFQ submission portal.', tag: 'Sales', category: 'Corporate' }
];

const FEATURED_CALCULATORS = [
  { href: '/calculators/kva/', title: 'kVA Sizing Calculator', desc: 'Compute exact apparent power from kW active load and power factor.', standard: 'IEC 60076-1' },
  { href: '/calculators/sizing-advisor/', title: 'Sizing Advisor Wizard', desc: 'Interactive step-by-step recommendation for oil vs dry-type transformers.', standard: 'Application Matrix' },
  { href: '/calculators/cable-sizing/', title: 'Cable Sizing Calculator', desc: 'Determine primary and secondary copper/aluminium cable cross-sections.', standard: 'IEC 60287' },
  { href: '/calculators/tco/', title: '30-Year TCO Capitalization', desc: 'Evaluate lifecycle purchase cost vs capitalized no-load & load losses.', standard: 'IEEE C57.120' }
];

const CALCULATOR_PAGES = [
  { href: '/calculators/', title: 'Engineering Calculators Hub', desc: 'All 15 online electrical engineering tools & transformer sizing wizards.', tag: 'All Tools', category: 'Calculators' },
  { href: '/calculators/kva/', title: 'kVA Sizing Calculator', desc: 'Determine transformer size from voltage, current, or active load (kW).', tag: 'Core Tool', category: 'Calculators' },
  { href: '/calculators/sizing-advisor/', title: 'Sizing Advisor Wizard', desc: 'Interactive step-by-step recommendation for oil vs dry-type transformers.', tag: 'Wizard', category: 'Calculators' },
  { href: '/calculators/cable-sizing/', title: 'Cable Sizing Calculator', desc: 'Copper/aluminium cable cross-section sizing per IEC 60287.', tag: 'IEC 60287', category: 'Calculators' },
  { href: '/calculators/loss-efficiency/', title: 'Loss & Efficiency Calculator', desc: 'No-load core losses, load copper losses, and efficiency curves.', tag: 'EcoDesign', category: 'Calculators' },
  { href: '/calculators/tco/', title: 'Total Cost of Ownership (TCO)', desc: '30-year lifecycle capitalization of core and copper energy losses.', tag: 'Financial', category: 'Calculators' },
  { href: '/calculators/voltage-drop/', title: 'Voltage Drop Calculator', desc: 'Calculate impedance regulation and voltage drop under power factor.', tag: 'Grid', category: 'Calculators' },
  { href: '/calculators/overload/', title: 'Overload Capacity Guide', desc: 'Permissible emergency thermal loading according to IEC 60076-7.', tag: 'Thermal', category: 'Calculators' },
  { href: '/calculators/short-circuit/', title: 'Short Circuit Calculator', desc: 'Secondary symmetrical short-circuit current (kA) and fault MVA.', tag: 'Protection', category: 'Calculators' },
  { href: '/calculators/unit-converter/', title: 'Unit Converter', desc: 'Convert kVA to HP, Amps, kW, and international engineering units.', tag: 'Utility', category: 'Calculators' },
  { href: '/calculators/tap-changer/', title: 'Tap Changer Range', desc: 'Calculate OLTC / OCTC tap positions and voltage adjustment percentages.', tag: 'Regulation', category: 'Calculators' },
  { href: '/calculators/oil-volume/', title: 'Oil Volume & Weight', desc: 'Estimate mineral insulating oil mass, volume, and thermal expansion.', tag: 'Oil', category: 'Calculators' },
  { href: '/calculators/currency-converter/', title: 'Currency Converter', desc: 'Multi-currency live exchange conversion for international tenders.', tag: 'Tender', category: 'Calculators' },
  { href: '/calculators/commodities/', title: 'Commodity Monitor', desc: 'Live LME copper, aluminium, and electrical steel price benchmarks.', tag: 'LME', category: 'Calculators' },
  { href: '/calculators/material-cost/', title: 'Material Cost Estimator', desc: 'Active part material cost breakdown and bill-of-materials analysis.', tag: 'BOM', category: 'Calculators' },
  { href: '/calculators/co2-savings/', title: 'CO₂ Lifecycle Savings', desc: 'Estimate lifetime greenhouse gas reductions from high-efficiency units.', tag: 'ESG', category: 'Calculators' }
];

const RESOURCE_PAGES = [
  { href: '/resources/', title: 'Technical Resources Hub', desc: 'Knowledge base, white papers, and engineering guides for electrical engineers.', tag: 'Hub', category: 'Resources' },
  { href: '/blog/', title: 'Engineering Blog & Technical Insights', desc: 'In-depth articles on grid reliability, transformer oil testing, and EcoDesign.', tag: 'Articles', category: 'Resources' },
  { href: '/resources/sizing-guide/', title: 'Transformer Sizing Guide', desc: 'Comprehensive technical handbook for selecting transformer ratings and K-factors.', tag: 'Handbook', category: 'Resources' },
  { href: '/resources/faq/', title: 'Frequently Asked Questions (FAQ)', desc: 'Answers to common technical, manufacturing, testing, and delivery inquiries.', tag: 'FAQ', category: 'Resources' },
  { href: '/resources/glossary/', title: 'Electrical Engineering Glossary', desc: 'Alphabetical reference of 100+ power transformer and switchgear terminology.', tag: 'Glossary', category: 'Resources' },
  { href: '/resources/standards/', title: 'International Engineering Standards', desc: 'Summary of IEC 60076, IEEE C57, ANSI, BS, and BSTI compliance benchmarks.', tag: 'Standards', category: 'Resources' },
  { href: '/privacy/', title: 'Privacy Policy & Data Protection', desc: 'Detailed disclosure of client data handling, RFQ drawings security, and ISO compliance.', tag: 'Legal', category: 'Resources' },
  { href: '/terms/', title: 'Terms of Use & Conditions', desc: 'Legal terms governing website usage, engineering tools, and copyright protections.', tag: 'Legal', category: 'Resources' }
];

export default function SitemapDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productDivision, setProductDivision] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [viewMode, setViewMode] = useState('bento'); // 'bento' | 'tree' | 'az'
  const searchInputRef = useRef(null);

  // Keyboard shortcut "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prepare Dynamic Data Sources
  const servicePages = useMemo(() => {
    return [
      { href: '/services/', title: 'All Turnkey EPC Services', desc: 'Turnkey power engineering, procurement, testing, and asset lifecycle maintenance.', tag: 'All Services', category: 'Services' },
      ...SERVICES.map(s => ({
        href: `/services/${s.slug}/`,
        title: s.title,
        desc: s.short || s.tagline || 'Specialized high-voltage engineering service.',
        tag: s.badge ? s.badge.split(' ')[0] : 'Turnkey',
        category: 'Services'
      }))
    ];
  }, []);

  const industryPages = useMemo(() => {
    return [
      { href: '/industries/', title: 'All Industry Solutions', desc: 'Power infrastructure tailored for utility grids, industry, renewable, and transit.', tag: 'All Sectors', category: 'Industries' },
      ...DATA.industries.map(i => ({
        href: `/industries/${i.slug}/`,
        title: i.name,
        desc: i.desc || `${i.name} power transmission & distribution solutions.`,
        tag: 'Sector',
        category: 'Industries'
      }))
    ];
  }, []);

  const projectPages = useMemo(() => {
    return [
      { href: '/projects/', title: 'All Landmark Projects', desc: 'Documented grid substations, industrial feeds, and metro power deployments.', tag: 'All Projects', category: 'Projects' },
      ...DATA.projects.map(p => ({
        href: `/projects/${p.slug}/`,
        title: p.title,
        desc: `${p.scope} • ${p.location}`,
        tag: p.cat || 'Project',
        category: 'Projects'
      }))
    ];
  }, []);

  const productPages = useMemo(() => {
    return [
      { href: '/products/', title: 'Complete Products Catalog (Overview)', desc: 'Full portfolio of oil-immersed, dry-type, compact substations, and switchgear.', tag: 'Index', division: 'all', category: 'Products' },
      ...DATA.products.map(p => {
        let div = 'Transformers';
        if (p.division === 'Switchgear' || (p.cat && p.cat.toLowerCase().includes('switchgear'))) {
          div = 'Switchgear Assemblies';
        } else if (p.category === 'Medium and High Voltage' || (p.cat && p.cat.toLowerCase().includes('voltage'))) {
          div = 'Medium and High Voltage';
        }
        return {
          href: `/products/${p.slug}/`,
          title: p.name,
          desc: p.desc || 'High-performance electrical power distribution equipment.',
          tag: p.cat || 'Product',
          division: div,
          category: 'Products'
        };
      })
    ];
  }, []);

  // Filtered Products by Division
  const filteredProductsByDiv = useMemo(() => {
    if (productDivision === 'all') return productPages;
    return productPages.filter(p => p.division === productDivision || p.division === 'all');
  }, [productPages, productDivision]);

  // Search filter helper
  const matchesSearch = (item, term) => {
    if (!term) return true;
    return (
      (item.title && item.title.toLowerCase().includes(term)) ||
      (item.desc && item.desc.toLowerCase().includes(term)) ||
      (item.tag && item.tag.toLowerCase().includes(term)) ||
      (item.href && item.href.toLowerCase().includes(term))
    );
  };

  const q = searchQuery.trim().toLowerCase();

  // Filtered lists based on search
  const filteredCorporate = useMemo(() => CORPORATE_PAGES.filter(p => matchesSearch(p, q)), [q]);
  const filteredProducts = useMemo(() => filteredProductsByDiv.filter(p => matchesSearch(p, q)), [filteredProductsByDiv, q]);
  const filteredCalculators = useMemo(() => CALCULATOR_PAGES.filter(p => matchesSearch(p, q)), [q]);
  const filteredServices = useMemo(() => servicePages.filter(p => matchesSearch(p, q)), [servicePages, q]);
  const filteredIndustries = useMemo(() => industryPages.filter(p => matchesSearch(p, q)), [industryPages, q]);
  const filteredProjects = useMemo(() => projectPages.filter(p => matchesSearch(p, q)), [projectPages, q]);
  const filteredResources = useMemo(() => RESOURCE_PAGES.filter(p => matchesSearch(p, q)), [q]);

  const totalMatches = (
    filteredCorporate.length +
    filteredProducts.length +
    filteredCalculators.length +
    filteredServices.length +
    filteredIndustries.length +
    filteredProjects.length +
    filteredResources.length
  );

  const allItemsFlat = useMemo(() => {
    return [
      ...CORPORATE_PAGES,
      ...productPages,
      ...CALCULATOR_PAGES,
      ...servicePages,
      ...industryPages,
      ...projectPages,
      ...RESOURCE_PAGES
    ];
  }, [productPages, servicePages, industryPages, projectPages]);

  // A-Z Grouped Map
  const azGrouped = useMemo(() => {
    const sorted = [...allItemsFlat]
      .filter(p => matchesSearch(p, q))
      .sort((a, b) => a.title.localeCompare(b.title));

    const groups = {};
    sorted.forEach(item => {
      const firstChar = item.title.charAt(0).toUpperCase();
      const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(item);
    });
    return groups;
  }, [allItemsFlat, q]);

  // Helper to highlight matching text
  const renderHighlighted = (text, term) => {
    if (!term || !text) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} className={styles.highlightText}>{part}</span>
      ) : (
        part
      )
    );
  };

  const shouldShow = (catId) => {
    if (selectedCategory === 'all') return true;
    return selectedCategory === catId;
  };

  const visibleProducts = useMemo(() => {
    if (q) return filteredProducts;
    if (showAllProducts) return filteredProducts;
    return filteredProducts.slice(0, 12);
  }, [filteredProducts, q, showAllProducts]);

  return (
    <div className={styles.sitemapPage}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className="wrap">
          <div className={styles.heroTopRow}>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><span style={{ color: '#94a3b8' }}>Directory</span></li>
                <li><span aria-current="page" style={{ color: '#ffffff' }}>Sitemap</span></li>
              </ol>
            </nav>

            <div className={styles.heroActionPills}>
              <button
                type="button"
                className={styles.heroActionBtn}
                onClick={() => setShowAllProducts(!showAllProducts)}
              >
                <span>{showAllProducts ? '▲ Collapse Catalog' : '▼ Expand All Units'}</span>
              </button>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroActionBtn}
              >
                <span>📄 XML Sitemap</span>
              </a>
            </div>
          </div>

          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            <span>ENTERPRISE TAXONOMY & DIRECTORY</span>
          </div>

          <h1 className={styles.heroTitle}>
            BPEL Comprehensive <span className={styles.heroTitleGradient}>Site Index & Architecture</span>
          </h1>

          <p className={styles.heroLead}>
            A unified technical taxonomy of 70+ power transformer and switchgear specifications, 15 engineering calculation tools, 
            4 turnkey EPC stages, 8 critical industry sectors, and accredited publications.
          </p>

          <div className={styles.heroStatsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>70+</span>
                <span className={styles.statLabel}>Products & Models</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="8" y1="10" x2="16" y2="10"></line>
                  <line x1="8" y1="14" x2="12" y2="14"></line>
                  <circle cx="15" cy="16" r="2"></circle>
                </svg>
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>15</span>
                <span className={styles.statLabel}>Online Calculators</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z"></path>
                </svg>
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>08</span>
                <span className={styles.statLabel}>Industry Solutions</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIconBox}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>{allItemsFlat.length}+</span>
                <span className={styles.statLabel}>Total Indexed Pages</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTROLS BAR (SEARCH, VIEW SWITCHER & CATEGORY FILTERS) */}
      <section className="wrap" aria-label="Sitemap Search & Controls">
        <div className={styles.controlsWrapper}>
          <div className={styles.controlsCard}>
            <div className={styles.searchAndViewsRow}>
              {/* Search Box */}
              <div className={styles.searchBox}>
                <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Instant search by title, rating, IEC standard, or route..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search sitemap directory"
                />
                {!searchQuery && <span className={styles.searchKbdHint}>/</span>}
                {searchQuery && (
                  <button
                    className={styles.searchClearBtn}
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* View Mode Switcher */}
              <div className={styles.viewModeSelector} role="tablist" aria-label="Directory layout mode">
                <button
                  type="button"
                  className={`${styles.viewModeBtn} ${viewMode === 'bento' ? styles.viewModeBtnActive : ''}`}
                  onClick={() => setViewMode('bento')}
                  role="tab"
                  aria-selected={viewMode === 'bento'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Bento Overview</span>
                </button>

                <button
                  type="button"
                  className={`${styles.viewModeBtn} ${viewMode === 'tree' ? styles.viewModeBtnActive : ''}`}
                  onClick={() => setViewMode('tree')}
                  role="tab"
                  aria-selected={viewMode === 'tree'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="6" y1="3" x2="6" y2="21"></line>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="18" cy="18" r="3"></circle>
                    <path d="M6 6h9"></path>
                    <path d="M6 18h9"></path>
                  </svg>
                  <span>Visual Tree</span>
                </button>

                <button
                  type="button"
                  className={`${styles.viewModeBtn} ${viewMode === 'az' ? styles.viewModeBtnActive : ''}`}
                  onClick={() => setViewMode('az')}
                  role="tab"
                  aria-selected={viewMode === 'az'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="12" x2="14" y2="12"></line>
                    <line x1="4" y1="18" x2="18" y2="18"></line>
                  </svg>
                  <span>A–Z Index</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Active in Bento mode) */}
            {viewMode === 'bento' && (
              <div className={styles.filterPillsRow}>
                {[
                  { id: 'all', label: 'All Sections', count: totalMatches },
                  { id: 'company', label: 'Company & Governance', count: filteredCorporate.length },
                  { id: 'products', label: 'Products & Equipment', count: filteredProducts.length },
                  { id: 'calculators', label: 'Calculators & Tools', count: filteredCalculators.length },
                  { id: 'services', label: 'Turnkey EPC Services', count: filteredServices.length },
                  { id: 'industries', label: 'Industries & Sectors', count: filteredIndustries.length },
                  { id: 'projects', label: 'Projects & Case Studies', count: filteredProjects.length },
                  { id: 'resources', label: 'Resources & Legal', count: filteredResources.length }
                ].map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.filterPill} ${selectedCategory === cat.id ? styles.filterPillActive : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <span className={styles.pillBadge}>{cat.count}</span>
                  </button>
                ))}
              </div>
            )}

            {searchQuery && (
              <div className={styles.searchResultCountBar}>
                <span>
                  Found <strong>{totalMatches}</strong> matching pages for &quot;<strong>{searchQuery}</strong>&quot;
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: '#0b5cab', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------
            MODE 1: BENTO OVERVIEW GRID
           --------------------------------------------------------- */}
        {viewMode === 'bento' && (
          <div className={styles.sitemapGrid}>
            {totalMatches === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
                <h3 className={styles.emptyTitle}>No matching pages found</h3>
                <p className={styles.emptyDesc}>
                  We could not find any pages matching &quot;{searchQuery}&quot;. Try checking for alternative technical terms or reset your query.
                </p>
                <button
                  className={styles.emptyResetBtn}
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* CARD 1: COMPANY & GOVERNANCE */}
            {shouldShow('company') && filteredCorporate.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardCorporate} ${styles.col6}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxBlue}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                        <line x1="9" y1="6" x2="9.01" y2="6"></line>
                        <line x1="15" y1="6" x2="15.01" y2="6"></line>
                        <line x1="9" y1="10" x2="9.01" y2="10"></line>
                        <line x1="15" y1="10" x2="15.01" y2="10"></line>
                        <line x1="9" y1="14" x2="9.01" y2="14"></line>
                        <line x1="15" y1="14" x2="15.01" y2="14"></line>
                        <line x1="9" y1="18" x2="15" y2="18"></line>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Company & Governance</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredCorporate.length} Pages</span>
                </div>
                <p className={styles.cardDesc}>
                  Executive board profiles, factory production lines, ISO accreditations, and corporate contact centers.
                </p>
                <ul className={styles.linksList}>
                  {filteredCorporate.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CARD 2: TURNKEY EPC SERVICES */}
            {shouldShow('services') && filteredServices.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardServices} ${styles.col6}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxGreen}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Turnkey EPC Services</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredServices.length} Stages</span>
                </div>
                <p className={styles.cardDesc}>
                  Turnkey lifecycle from enquiry to energisation: precision supply, civil foundations, testing, and AMC contracts.
                </p>
                <ul className={styles.linksList}>
                  {filteredServices.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CARD 3: 15 ENGINEERING CALCULATORS WITH FEATURED PREVIEW */}
            {shouldShow('calculators') && filteredCalculators.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardCalculators} ${styles.col12}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxAmber}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                        <line x1="8" y1="6" x2="16" y2="6"></line>
                        <line x1="8" y1="10" x2="16" y2="10"></line>
                        <line x1="8" y1="14" x2="12" y2="14"></line>
                        <line x1="8" y1="18" x2="10" y2="18"></line>
                        <circle cx="15" cy="16" r="2"></circle>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Engineering Calculators & Sizing Wizards</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredCalculators.length} Online Tools</span>
                </div>
                <p className={styles.cardDesc}>
                  15 interactive electrical engineering utilities compliant with IEC 60076, IEEE C57, and IEC 60287.
                </p>

                {/* 4 Featured Tool Mini-Cards */}
                {!q && (
                  <div className={styles.featuredCalculatorsRow}>
                    {FEATURED_CALCULATORS.map(fc => (
                      <Link key={fc.href} href={fc.href} className={styles.calcFeatureCard}>
                        <div>
                          <h4 className={styles.calcFeatureTitle}>{fc.title}</h4>
                          <p className={styles.calcFeatureDesc}>{fc.desc}</p>
                        </div>
                        <div className={styles.calcFeatureFooter}>
                          <span>{fc.standard}</span>
                          <span>Launch Tool →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <ul className={styles.productsColumnsList}>
                  {filteredCalculators.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CARD 4: COMPLETE PRODUCTS CATALOG (70+ UNITS WITH SUB-DIVISIONS) */}
            {shouldShow('products') && filteredProducts.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardProducts} ${styles.col12}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxBlue}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Transformers & Power Distribution Equipment</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredProducts.length} Specifications</span>
                </div>

                {/* Division Sub-Filters */}
                <div className={styles.productsSubFilter}>
                  {[
                    { id: 'all', label: `All Units (${productPages.length})` },
                    { id: 'Transformers', label: 'Oil & Dry-Type Transformers' },
                    { id: 'Medium and High Voltage', label: 'Medium & High Voltage' },
                    { id: 'Switchgear Assemblies', label: 'Switchgear Assemblies & RMU' }
                  ].map(div => (
                    <button
                      key={div.id}
                      className={`${styles.subFilterBtn} ${productDivision === div.id ? styles.subFilterBtnActive : ''}`}
                      onClick={() => { setProductDivision(div.id); setShowAllProducts(false); }}
                    >
                      {div.label}
                    </button>
                  ))}
                </div>

                <p className={styles.cardDesc}>
                  Engineering submittals, single-line diagrams, winding specifications, and routine test data sheets.
                </p>

                <ul className={styles.productsColumnsList}>
                  {visibleProducts.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {!q && filteredProducts.length > 12 && (
                  <div className={styles.showMoreBar}>
                    <button
                      className={styles.showMoreBtn}
                      onClick={() => setShowAllProducts(!showAllProducts)}
                    >
                      {showAllProducts
                        ? '▲ Collapse Product List'
                        : `▼ View All ${filteredProducts.length} Product Models`}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CARD 5: INDUSTRIES & CRITICAL SECTORS */}
            {shouldShow('industries') && filteredIndustries.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardIndustries} ${styles.col6}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxPurple}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z"></path>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Industries & Sectors</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredIndustries.length} Sectors</span>
                </div>
                <p className={styles.cardDesc}>
                  Industry-specific power engineering: grid utilities, textile manufacturing, data centers, and renewable parks.
                </p>
                <ul className={styles.linksList}>
                  {filteredIndustries.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CARD 6: PROJECTS & LANDMARK CASE STUDIES */}
            {shouldShow('projects') && filteredProjects.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardProjects} ${styles.col6}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxPink}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Projects & Case Studies</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredProjects.length} Deployments</span>
                </div>
                <p className={styles.cardDesc}>
                  Verified grid-interconnection, utility substation, and heavy industrial plant commissioning portfolios.
                </p>
                <ul className={styles.linksList}>
                  {filteredProjects.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CARD 7: RESOURCES, ENGINEERING BLOG & LEGAL */}
            {shouldShow('resources') && filteredResources.length > 0 && (
              <div className={`${styles.sitemapCard} ${styles.cardResources} ${styles.col12}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <div className={`${styles.headerIconBox} ${styles.iconBoxSlate}`}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                    <h2 className={styles.cardTitle}>Resources, Engineering Insights & Governance</h2>
                  </div>
                  <span className={styles.cardCounter}>{filteredResources.length} Publications</span>
                </div>
                <p className={styles.cardDesc}>
                  Technical sizing handbooks, engineering research articles, FAQ portal, electrical glossary, and compliance policies.
                </p>
                <ul className={styles.productsColumnsList}>
                  {filteredResources.map(item => (
                    <li key={item.href} className={styles.linkItem}>
                      <Link href={item.href} className={styles.linkAnchor}>
                        <div className={styles.linkTextGroup}>
                          <span className={styles.linkTitle}>{renderHighlighted(item.title, q)}</span>
                          <span className={styles.linkSnippet}>{renderHighlighted(item.desc, q)}</span>
                        </div>
                        <div className={styles.linkMetaGroup}>
                          <span className={styles.linkTag}>{item.tag}</span>
                          <span className={styles.linkArrow}>→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------------
            MODE 2: VISUAL HIERARCHY TREE VIEW
           --------------------------------------------------------- */}
        {viewMode === 'tree' && (
          <div className={styles.treeWrapper}>
            <div className={styles.treeHeaderArea}>
              <h3 className={styles.treeHeaderTitle}>Architectural Site Tree</h3>
              <p className={styles.treeHeaderDesc}>
                Hierarchical taxonomy of the BPEL web platform structured from primary domain roots down to granular spec sheets.
              </p>
            </div>

            {/* Branch 1: Corporate */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>🏢 Corporate & Operations</span>
                <span className={styles.pillBadge}>{CORPORATE_PAGES.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {CORPORATE_PAGES.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Branch 2: Engineering Calculators */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>⚡ Online Engineering Calculators</span>
                <span className={styles.pillBadge}>{CALCULATOR_PAGES.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {CALCULATOR_PAGES.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Branch 3: Turnkey EPC Services */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>🛠️ Turnkey EPC Engineering Services</span>
                <span className={styles.pillBadge}>{servicePages.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {servicePages.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Branch 4: Target Industries */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>🏭 Critical Industry Solutions</span>
                <span className={styles.pillBadge}>{industryPages.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {industryPages.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Branch 5: Landmark Projects */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>🏗️ Case Studies & Site Commissionings</span>
                <span className={styles.pillBadge}>{projectPages.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {projectPages.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Branch 6: Technical Resources & Legal */}
            <div className={styles.treeBranch}>
              <h4 className={styles.treeBranchTitle}>
                <span>📚 Technical Resources & Governance</span>
                <span className={styles.pillBadge}>{RESOURCE_PAGES.length}</span>
              </h4>
              <div className={styles.treeNodesGrid}>
                {RESOURCE_PAGES.map(p => (
                  <Link key={p.href} href={p.href} className={styles.treeNodeItem}>
                    <span className={styles.treeNodeTitle}>{p.title}</span>
                    <span className={styles.treeNodeTag}>{p.tag}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------
            MODE 3: ALPHABETICAL A-Z DIRECTORY VIEW
           --------------------------------------------------------- */}
        {viewMode === 'az' && (
          <div className={styles.azWrapper}>
            {/* Quick Letter Nav */}
            <div className={styles.azLetterNav}>
              {Object.keys(azGrouped).map(letter => (
                <a key={letter} href={`#az-${letter}`} className={styles.azLetterBtn}>
                  {letter}
                </a>
              ))}
            </div>

            {/* Letter Blocks */}
            {Object.keys(azGrouped).map(letter => (
              <div key={letter} id={`az-${letter}`} className={styles.azSectionBlock}>
                <h3 className={styles.azLetterHeader}>{letter}</h3>
                <div className={styles.azLinksGrid}>
                  {azGrouped[letter].map(item => (
                    <Link key={item.href} href={item.href} className={styles.azLinkCard}>
                      <span className={styles.azTitle}>{renderHighlighted(item.title, q)}</span>
                      <span className={styles.linkTag}>{item.category || item.tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. BOTTOM TECHNICAL ASSISTANCE / RFQ BANNER */}
        <div className={styles.bottomCtaBanner}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Need Custom Engineering Specifications?</h3>
            <p className={styles.ctaDesc}>
              Our engineering team prepares custom transformer tender drawings, loss evaluations, and single-line diagrams 
              within 24 business hours. Connect directly with our high-voltage technical desk.
            </p>
          </div>
          <div className={styles.ctaButtonGroup}>
            <Link href="/contact/" className={styles.ctaBtnPrimary}>
              <span>Request Custom RFQ</span>
              <span>→</span>
            </Link>
            <Link href="/calculators/sizing-advisor/" className={styles.ctaBtnOutline}>
              <span>Use Sizing Advisor</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
