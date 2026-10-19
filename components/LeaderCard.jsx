'use client';

import Link from 'next/link';

export default function LeaderCard({
  leader,
  delay = 0
}) {
  return (
    <div
      className="creative-team--block fade-in-up"
      data-delay={delay}
      id={leader.slug}
    >
      <div className="inner-box">
        {/* Top Image Frame */}
        <div className="image-box">
          <figure className="image">
            <Link href={`/about/leaders/${leader.slug}/`} aria-label={`View ${leader.name} profile`}>
              <img
                src={leader.image}
                alt={leader.name}
                loading="lazy"
                decoding="async"
              />
            </Link>
          </figure>

          {/* Floating Badges */}
          <div className="creative-team__floating-badge">
            <span
              className="creative-team__dot"
              style={{ backgroundColor: leader.dotColor || 'var(--primary, #0B5CAB)' }}
              aria-hidden="true"
            />
            <span>{leader.dept}</span>
          </div>
          <div className="creative-team__tenure-badge">{leader.tenure}</div>
        </div>

        {/* Clean, Focused Info Box */}
        <div className="info-box">
          <h4 className="name">
            <Link href={`/about/leaders/${leader.slug}/`}>{leader.name}</Link>
          </h4>
          <span className="designation">{leader.role}</span>
          <p className="info-box__desc">{leader.summary}</p>

          <Link
            href={`/about/leaders/${leader.slug}/`}
            className="info-box__view-btn"
            aria-label={`View full details of ${leader.name}`}
          >
            <span>View Profile</span>
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
    </div>
  );
}
