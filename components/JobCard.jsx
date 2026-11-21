'use client';

import Link from 'next/link';

export function BriefcaseIcon({ width = 15, height = 15, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export function PinIcon({ width = 15, height = 15, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function CashIcon({ width = 15, height = 15, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

export function CalendarIcon({ width = 15, height = 15, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function ArrowRightIcon({ width = 16, height = 16, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function JobCard({ job }) {
  return (
    <article className="career-vacancy-card">
      {/* Left Logo / Initial Square */}
      <div
        className="career-vacancy-card__logo"
        style={{ backgroundColor: job.logoBg || '#006db8' }}
        aria-hidden="true"
      >
        <span>{job.logoLetter || job.title.charAt(0)}</span>
      </div>

      {/* Main Info */}
      <div className="career-vacancy-card__body">
        {/* Title row with Featured label */}
        <div className="career-vacancy-card__header">
          <h3 className="career-vacancy-card__title">
            <Link href={`/careers/${job.slug}/`}>{job.title}</Link>
          </h3>
        </div>

        {/* Metadata row with Department, Location, Salary */}
        <div className="career-vacancy-card__meta">
          <div className="career-vacancy-card__meta-item" title="Department">
            <BriefcaseIcon />
            <span>{job.dept}</span>
          </div>
          <div className="career-vacancy-card__meta-item" title="Location">
            <PinIcon />
            <span>{job.location}</span>
          </div>
          <div className="career-vacancy-card__meta-item" title="Salary Range">
            <CashIcon />
            <span>{job.salary}</span>
          </div>
        </div>

        {/* Tag pills: Full Time & Urgent */}
        <div className="career-vacancy-card__tags">
          <span className="career-pill career-pill--blue">Full Time</span>
          {job.badge && (
            <span className="career-pill career-pill--amber">{job.badge}</span>
          )}
        </div>
      </div>

      {/* Right Action: Arrow button with View text */}
      <div className="career-vacancy-card__action">
        <Link
          href={`/careers/${job.slug}/`}
          className="career-view-action"
          aria-label={`View ${job.title}`}
        >
          <span className="career-arrow-btn" aria-hidden="true">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </article>
  );
}
