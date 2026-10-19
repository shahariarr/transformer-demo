'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { VACANCIES } from '@/lib/careers';

const DEPARTMENTS = [
  { id: 'all', label: 'All Roles' },
  { id: 'Engineering & Design', label: 'Engineering & Design' },
  { id: 'Manufacturing & Plant', label: 'Manufacturing & Plant' },
  { id: 'Testing & Quality Lab', label: 'Testing & Quality Lab' },
  { id: 'Field Operations & Service', label: 'Field Operations' },
  { id: 'Sales & Commercial', label: 'Sales & Commercial' }
];

const LOCATIONS = [
  { id: 'all', label: 'All Facilities' },
  { id: 'dhaka', label: 'Dhaka HQ' },
  { id: 'gazipur', label: 'Gazipur Plant' },
  { id: 'chittagong', label: 'Chittagong Hub' }
];

export default function CareersVacancyDirectory() {
  const [activeDept, setActiveDept] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobSlug, setExpandedJobSlug] = useState(null);

  const filteredVacancies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VACANCIES.filter((v) => {
      const matchDept = activeDept === 'all' || v.dept === activeDept;
      const matchLoc = locationFilter === 'all' || v.locationCode === locationFilter;
      const matchSearch = !q || (
        v.title.toLowerCase().includes(q) ||
        v.summary.toLowerCase().includes(q) ||
        v.dept.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.responsibilities.some(r => r.toLowerCase().includes(q)) ||
        v.requirements.some(req => req.toLowerCase().includes(q))
      );
      return matchDept && matchLoc && matchSearch;
    });
  }, [activeDept, locationFilter, searchQuery]);

  const toggleExpand = (slug) => {
    setExpandedJobSlug(prev => prev === slug ? null : slug);
  };

  const handleDeptClick = (deptId) => {
    setActiveDept(deptId);
    // If current location has 0 roles in this new department, auto-switch to all locations
    if (deptId !== 'all' && locationFilter !== 'all') {
      const existsInLoc = VACANCIES.some(v => v.dept === deptId && v.locationCode === locationFilter);
      if (!existsInLoc) {
        setLocationFilter('all');
      }
    }
  };

  const handleLocationChange = (locId) => {
    setLocationFilter(locId);
    // If current active department has 0 roles in this new location, auto-switch to all roles
    if (locId !== 'all' && activeDept !== 'all') {
      const existsInDept = VACANCIES.some(v => v.locationCode === locId && v.dept === activeDept);
      if (!existsInDept) {
        setActiveDept('all');
      }
    }
  };

  const isFiltered = activeDept !== 'all' || locationFilter !== 'all' || searchQuery.trim().length > 0;

  const resetFilters = () => {
    setActiveDept('all');
    setLocationFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="vacancies-section">
      {/* Masthead without redundant "WHY BUILD YOUR CAREER AT BPEL" */}
      <div className="vacancies-masthead fade-in-up">
        <div className="vacancies-eyebrow">
          <span className="vacancies-pulse-dot" aria-hidden="true" />
          <span>CURRENT JOB OPENINGS ({filteredVacancies.length} {filteredVacancies.length === 1 ? 'POSITION' : 'POSITIONS'})</span>
        </div>
        <p className="vacancies-lead">
          Explore open engineering and technical vacancies across transformer design, high-voltage testing, plant manufacturing, and substation commissioning.
        </p>

        {/* Filter Controls Bar */}
        <div className="vacancies-filter-panel">
          {/* Search Input & Location Select in Top Row */}
          <div className="vacancies-filter-controls">
            <div className="vacancies-search-wrap">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="search-icon" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, skills (e.g. Design, AutoCAD, Testing, Winding)..."
                className="vacancies-search-input"
                aria-label="Search vacancies by keywords"
              />
              {searchQuery ? (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              ) : null}
            </div>

            {/* Location Filter Select */}
            <div className="vacancies-loc-filter">
              <label htmlFor="loc-select" className="visually-hidden">Filter by Location</label>
              <div className="vacancy-select-wrap">
                <select
                  id="loc-select"
                  value={locationFilter}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="vacancy-loc-select"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.label}
                    </option>
                  ))}
                </select>
                <span className="vacancy-select-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Department Tabs Bar */}
          <div className="vacancies-dept-tabs" role="tablist" aria-label="Filter by department">
            {DEPARTMENTS.map((dept) => {
              const isActive = activeDept === dept.id;
              const count = dept.id === 'all'
                ? VACANCIES.length
                : VACANCIES.filter(v => v.dept === dept.id).length;

              return (
                <button
                  key={dept.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`vacancy-pill-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleDeptClick(dept.id)}
                >
                  <span>{dept.label}</span>
                  <span className="vacancy-pill-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Status Summary & Reset */}
          {isFiltered ? (
            <div className="vacancies-filter-meta">
              <span>Showing <strong>{filteredVacancies.length}</strong> of {VACANCIES.length} open positions</span>
              <button
                type="button"
                className="vacancies-reset-btn"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Compact Vacancies List */}
      <div className="vacancies-compact-list">
        {filteredVacancies.length === 0 ? (
          <div className="vacancies-empty-state">
            <div className="empty-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h4>No matching positions found</h4>
            <p>Try clearing your search query or selecting "All Roles" and "All Facilities".</p>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredVacancies.map((job) => {
            const isExpanded = expandedJobSlug === job.slug;

            return (
              <article
                key={job.slug}
                className={`vacancy-compact-card vacancy-compact-card--${job.deptColor} ${isExpanded ? 'is-expanded' : ''}`}
              >
                <div className="vacancy-compact-header-row">
                  {/* Left Column: Badges, Title, Specs */}
                  <div className="vacancy-compact-info">
                    <div className="vacancy-compact-tags">
                      <span className={`vacancy-dept-badge vacancy-dept-badge--${job.deptColor}`}>
                        {job.dept}
                      </span>
                      <span className="vacancy-loc-chip">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                        <span>{job.location}</span>
                      </span>
                      <span className="vacancy-type-chip">{job.type}</span>
                      {job.badge ? (
                        <span className="vacancy-special-badge">
                          <span className="badge-live-dot" aria-hidden="true" />
                          <span>{job.badge}</span>
                        </span>
                      ) : null}
                    </div>

                    <h3 className="vacancy-compact-title">
                      <Link href={`/careers/apply?job=${job.slug}`}>
                        <span>{job.title}</span>
                        <svg className="title-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </Link>
                    </h3>

                    {/* Minimal Iconic Specs Chips */}
                    <div className="vacancy-compact-specs">
                      <span className="spec-chip">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{job.experience}</span>
                      </span>

                      <span className="spec-chip">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        <span>{job.education.split('(')[0].trim()}</span>
                      </span>

                      <span className="spec-chip spec-chip--salary">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M6 12h.01M18 12h.01" />
                        </svg>
                        <span>{job.salary.split('(')[0].trim()}</span>
                      </span>

                      <span className="spec-chip">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Closes {job.deadline}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="vacancy-compact-actions">
                    <button
                      type="button"
                      className="vacancy-compact-toggle-btn"
                      onClick={() => toggleExpand(job.slug)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Hide' : 'View'} details for ${job.title}`}
                    >
                      <span>{isExpanded ? 'Hide Specs' : 'View Specs'}</span>
                      <svg
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    <Link
                      href={`/careers/apply?job=${job.slug}`}
                      className="vacancy-compact-apply-btn"
                    >
                      <span>Apply</span>
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Inline Expandable Drawer */}
                {isExpanded ? (
                  <div className="vacancy-compact-drawer">
                    <p className="vacancy-drawer-summary">{job.summary}</p>
                    <div className="vacancy-drawer-grid">
                      <div className="drawer-col">
                        <h4 className="drawer-col-title">Key Responsibilities</h4>
                        <ul className="vacancy-drawer-checklist">
                          {job.responsibilities.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="drawer-col">
                        <h4 className="drawer-col-title">Candidate Requirements</h4>
                        <ul className="vacancy-drawer-checklist">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="vacancy-drawer-footer">
                      <Link
                        href={`/careers/apply?job=${job.slug}`}
                        className="btn btn--primary btn--sm"
                      >
                        <span>Apply For {job.title}</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>

      {/* Open Application Banner */}
      <div className="vacancy-open-banner fade-in-up">
        <div className="vacancy-open-banner__copy">
          <span className="vacancy-open-tag">GENERAL POOL APPLICATION</span>
          <h3 className="vacancy-open-title">Don't See Your Specific Discipline Listed?</h3>
          <p className="vacancy-open-desc">
            We are always looking for exceptional high-voltage power engineers, CAD draftsmen, quality control technicians, and factory fabricators. Submit an open talent application and our HR department will keep your credentials active for future project allocations.
          </p>
        </div>
        <div className="vacancy-open-banner__action">
          <Link href="/careers/apply?job=open-application" className="btn btn--light">
            <span>Submit Open Application</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
