'use client';

import Link from 'next/link';

export default function LeaderCard({ leader, delay = 0 }) {
  return (
    <article
      className="leader-card fade-in-up"
      data-delay={delay}
      id={leader.slug}
    >
      {/* Top Image Box */}
      <div className="leader-card__media">
        <Link href={`/about/leaders/${leader.slug}/`} aria-label={`View ${leader.name} profile`}>
          <img
            src={leader.image}
            alt={leader.name}
            loading="lazy"
            decoding="async"
            className="leader-card__img"
          />
        </Link>
        <div className="leader-card__scrim" aria-hidden="true" />

        {/* Floating Badges */}
        <div className="leader-card__badges">
          <span className="leader-card__badge-dept">
            <span
              className="leader-card__dot"
              style={{ backgroundColor: leader.dotColor || '#0B5CAB' }}
              aria-hidden="true"
            />
            <span>{leader.dept}</span>
          </span>
          <span className="leader-card__badge-tenure">{leader.tenure}</span>
        </div>
      </div>

      {/* Body Info */}
      <div className="leader-card__body">
        <h3 className="leader-card__name">
          <Link href={`/about/leaders/${leader.slug}/`}>{leader.name}</Link>
        </h3>
        <span className="leader-card__role">{leader.role}</span>

        {leader.educationShort && (
          <div className="leader-card__edu">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span>{leader.educationShort}</span>
          </div>
        )}

        <p className="leader-card__desc">{leader.summary}</p>

        {leader.keyFocus && leader.keyFocus.length > 0 && (
          <div className="leader-card__tags">
            {leader.keyFocus.map((tag) => (
              <span key={tag} className="leader-card__tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="leader-card__foot">
          <Link
            href={`/about/leaders/${leader.slug}/`}
            className="leader-card__btn"
            aria-label={`View full dossier of ${leader.name}`}
          >
            <span>View Executive Dossier</span>
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

