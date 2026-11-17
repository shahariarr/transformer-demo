'use client';

import Link from 'next/link';
import { VACANCIES } from '@/lib/careers';

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

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GradIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const SalaryIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M15 9.5a2.5 2.5 0 0 0-5 0c0 3 5 2 5 5a2.5 2.5 0 0 1-5 0" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function CareersVacancyDirectory({ showOpenBanner = false }) {
  return (
    <div className="vacancies-section">
      {/* Structured Horizontal Job Board Cards */}
      <div className="vacancies-grid">
        {VACANCIES.map((job) => (
          <article
            key={job.slug}
            className="vacancy-pcard"
          >
            {/* Main Content Area */}
            <div className="vacancy-pcard__main">
              {/* Top Meta Row */}
              <div className="vacancy-pcard__top">
                <span className="vacancy-pcard__dept-badge">{job.dept}</span>
                <span className="vacancy-pcard__type-badge">{job.type.split(',')[0]}</span>
                {job.badge ? (
                  <span className="vacancy-pcard__status-badge">
                    <span className="badge-live-dot" aria-hidden="true" />
                    <span>{job.badge}</span>
                  </span>
                ) : null}
              </div>

              {/* Title */}
              <h3 className="vacancy-pcard__title">
                <Link href={`/careers/apply?job=${job.slug}`}>{job.title}</Link>
              </h3>

              {/* Summary */}
              <p className="vacancy-pcard__desc">{job.summary}</p>

              {/* Corporate Specs Row */}
              <div className="vacancy-pcard__specs-row">
                <div className="vacancy-spec-item" title="Facility Location">
                  <PinIcon />
                  <span>{job.location}</span>
                </div>
                <div className="vacancy-spec-item" title="Required Experience">
                  <BriefcaseIcon />
                  <span>{job.experience}</span>
                </div>
                <div className="vacancy-spec-item" title="Minimum Qualification">
                  <GradIcon />
                  <span>{job.education.split('(')[0].trim()}</span>
                </div>
                <div className="vacancy-spec-item" title="Compensation Package">
                  <SalaryIcon />
                  <span>{job.salary.split('(')[0].trim()}</span>
                </div>
                <div className="vacancy-spec-item vacancy-spec-item--deadline" title="Application Deadline">
                  <CalendarIcon />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
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
                className="vacancy-pcard__btn-details"
              >
                <span>View Scope & Requirements &rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Speculative Pool Banner */}
      {showOpenBanner && (
        <div className="vacancy-open-banner">
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
      )}
    </div>
  );
}
