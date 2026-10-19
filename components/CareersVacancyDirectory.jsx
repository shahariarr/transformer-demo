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
  { id: 'dhaka', label: 'Dhaka Headquarters' },
  { id: 'gazipur', label: 'Gazipur Heavy Plant' },
  { id: 'chittagong', label: 'Chattogram Hub' }
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export default function CareersVacancyDirectory() {
  const [activeDept, setActiveDept] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobSlug, setExpandedJobSlug] = useState(null);

  const filteredVacancies = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return VACANCIES.filter((v) => {
      const matchDept = activeDept === 'all' || v.dept.toLowerCase() === activeDept.toLowerCase();
      const matchLoc = locationFilter === 'all' || v.locationCode.toLowerCase() === locationFilter.toLowerCase();
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
  };

  const handleLocationChange = (locId) => {
    setLocationFilter(locId);
  };

  const isFiltered = activeDept !== 'all' || locationFilter !== 'all' || searchQuery.trim().length > 0;

  const resetFilters = () => {
    setActiveDept('all');
    setLocationFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="vacancies-section">
      {/* 1. Filter Toolbar (Matching Home Page Search & Pill Pattern) */}
      <div className="vacancies-filter-panel fade-in-up">
        {/* Top Controls Row: Search Input & Location Dropdown */}
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
              placeholder="Search roles by title, skills (e.g. Design, AutoCAD, Testing, Winding)..."
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

          <div className="vacancies-loc-filter">
            <div className="vacancy-select-wrap">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="loc-icon" aria-hidden="true">
                <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <select
                id="loc-select"
                value={locationFilter}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="vacancy-loc-select"
                aria-label="Filter vacancies by facility location"
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

        {/* Department Tab Pills */}
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

        {/* Filter Summary Row */}
        <div className="vacancies-filter-meta">
          <div className="vacancies-meta-count">
            <span className="vacancies-pulse-dot" aria-hidden="true" />
            <span>Showing <strong>{filteredVacancies.length}</strong> of {VACANCIES.length} open positions</span>
          </div>
          {isFiltered ? (
            <button
              type="button"
              className="vacancies-reset-btn"
              onClick={resetFilters}
            >
              Reset All Filters
            </button>
          ) : null}
        </div>
      </div>

      {/* 2. Structured Card Grid (Following Home Page .pgrid & .pcard Layout) */}
      <div className="vacancies-grid">
        {filteredVacancies.length === 0 ? (
          <div className="vacancies-empty-state">
            <div className="empty-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h4>No matching positions found</h4>
            <p>Try clearing your search query or selecting &quot;All Roles&quot; and &quot;All Facilities&quot;.</p>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredVacancies.map((job, idx) => {
            return (
              <article
                key={job.slug}
                className="vacancy-pcard fade-in-up"
                data-delay={(idx % 3) * 90}
              >
                {/* 1. Card Media Header - matching .pcard & .services-showcase-card */}
                <div className="vacancy-pcard__media">
                  <img
                    src={job.image || '/assets/images/lifecycle/02-engineering-design.jpg'}
                    alt={job.title}
                    className="vacancy-pcard__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="vacancy-pcard__media-overlay" aria-hidden="true" />
                  <span className="vacancy-pcard__dept-badge">{job.dept}</span>
                  {job.badge ? (
                    <span className="vacancy-pcard__status-badge">
                      <span className="badge-live-dot" aria-hidden="true" />
                      <span>{job.badge}</span>
                    </span>
                  ) : (
                    <span className="vacancy-pcard__type-badge">{job.type.split(',')[0]}</span>
                  )}
                </div>

                {/* 2. Card Body */}
                <div className="vacancy-pcard__body">
                  <div className="vacancy-pcard__meta-bar">
                    <div className="vacancy-pcard__loc-item">
                      <PinIcon />
                      <span>{job.location}</span>
                    </div>
                    <span className="vacancy-pcard__timing">{job.type.split(',')[0]}</span>
                  </div>

                  <h3 className="vacancy-pcard__title">
                    <Link href={`/careers/apply?job=${job.slug}`}>{job.title}</Link>
                  </h3>

                  <p className="vacancy-pcard__desc">{job.summary}</p>

                  {/* 3. Specs Box: Identical to Home Page .pcard__specs-box */}
                  <dl className="pcard__specs-box vacancy-pcard__specs-box">
                    <div className="pcard__spec-row">
                      <dt className="pcard__spec-key">Experience</dt>
                      <dd className="pcard__spec-val">{job.experience}</dd>
                    </div>
                    <div className="pcard__spec-row">
                      <dt className="pcard__spec-key">Education</dt>
                      <dd className="pcard__spec-val">{job.education.split('(')[0].trim()}</dd>
                    </div>
                    <div className="pcard__spec-row">
                      <dt className="pcard__spec-key">Compensation</dt>
                      <dd className="pcard__spec-val">{job.salary.split('(')[0].trim()}</dd>
                    </div>
                    <div className="pcard__spec-row">
                      <dt className="pcard__spec-key">Deadline</dt>
                      <dd className="pcard__spec-val">{job.deadline}</dd>
                    </div>
                  </dl>

                  {/* 4. Action Buttons Row: Matching Home Page .pcard__actions */}
                  <div className="vacancy-pcard__actions">
                    <Link
                      href={`/careers/apply?job=${job.slug}`}
                      className="btn btn--primary btn--sm vacancy-pcard__btn-apply"
                    >
                      <span>Apply Now</span>
                      <Arrow />
                    </Link>
                    <Link
                      href={`/careers/apply?job=${job.slug}`}
                      className="btn btn--ghost btn--sm vacancy-pcard__btn-details"
                    >
                      <span>View Scope</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* 3. Bottom Speculative Pool Banner (matching Home Page Card Style) */}
      <div className="vacancy-open-banner fade-in-up">
        <div className="vacancy-open-banner__copy">
          <span className="vacancy-open-tag">GENERAL POOL APPLICATION</span>
          <h3 className="vacancy-open-title">Don&apos;t See Your Specific Discipline Listed?</h3>
          <p className="vacancy-open-desc">
            We are always looking for exceptional high-voltage power engineers, CAD draftsmen, quality control technicians, and factory fabricators. Submit an open talent application and our technical HR team will keep your credentials active for upcoming projects.
          </p>
        </div>
        <div className="vacancy-open-banner__action">
          <Link href="/careers/apply?job=open-application" className="btn btn--primary">
            <span>Submit Open Application</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
