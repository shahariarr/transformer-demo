'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VACANCIES } from '@/lib/careers';
import JobCard from './JobCard';

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function CareersVacancyDirectory({ showOpenBanner = true }) {
  const [activeDept, setActiveDept] = useState('All');

  const departments = ['All', ...Array.from(new Set(VACANCIES.map((j) => j.dept)))];

  const filtered = activeDept === 'All'
    ? VACANCIES
    : VACANCIES.filter((j) => j.dept === activeDept);

  return (
    <div className="vacancies-section">
      {/* Department Filter Tabs */}
      <div className="vacancies-filter-tabs" role="tablist" aria-label="Filter vacancies by department">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            role="tab"
            aria-selected={activeDept === dept}
            className={`vacancies-filter-tab ${activeDept === dept ? 'is-active' : ''}`}
            onClick={() => setActiveDept(dept)}
          >
            {dept}
            {dept === 'All' ? (
              <span className="vacancies-filter-tab__count">{VACANCIES.length}</span>
            ) : (
              <span className="vacancies-filter-tab__count">
                {VACANCIES.filter((j) => j.dept === dept).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Structured Job Cards List */}
      <div className="vacancies-cards-list">
        {filtered.map((job) => (
          <JobCard key={job.slug} job={job} />
        ))}
      </div>

      {/* Speculative Pool Banner */}
      {showOpenBanner && (
        <div className="vacancy-open-banner">
          <div className="vacancy-open-banner__copy">
            <span className="vacancy-open-tag">GENERAL TALENT POOL</span>
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
      )}
    </div>
  );
}
