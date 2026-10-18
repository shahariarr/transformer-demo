export default function LeaderCard({
  leader,
  delay = 0,
  isFullPage = false,
  isAnchor = false,
  index = null
}) {
  return (
    <article
      className={`exec-card ${isAnchor ? 'exec-card--anchor' : ''} fade-in-up`}
      data-delay={delay}
      key={leader.slug}
      id={leader.slug}
    >
      {/* Visual Frame */}
      <div className="exec-card__visual">
        <img
          src={leader.image}
          alt={leader.name}
          className="exec-card__img"
          loading="lazy"
          decoding="async"
        />
        <div className="exec-card__scrim" aria-hidden="true" />

        {/* Floating Minimal Badges */}
        <div className="exec-card__floating-badges">
          <span className="exec-card__dept-pill">
            <span
              className="exec-card__dept-dot"
              style={{ backgroundColor: leader.dotColor || 'var(--primary)' }}
              aria-hidden="true"
            />
            {leader.dept}
          </span>
          <span className="exec-card__tenure-pill">{leader.tenure}</span>
        </div>

        {/* Cadre Index Badge */}
        {index && (
          <span className="exec-card__cadre-index" aria-hidden="true">
            {index}
          </span>
        )}
      </div>

      {/* Card Content Dossier */}
      <div className="exec-card__body">
        {/* Academic / Fellowship Credentials */}
        <div className="exec-card__cred-line" title={leader.education}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span>{isFullPage ? leader.education : leader.educationShort}</span>
        </div>

        <h3 className="exec-card__name">{leader.name}</h3>
        <p className="exec-card__role">{leader.role}</p>

        {isAnchor ? (
          <blockquote className="exec-card__anchor-quote">
            "{leader.summary}"
          </blockquote>
        ) : (
          <p className="exec-card__summary">{leader.summary}</p>
        )}

        {/* Technical Mandate Pills */}
        <div className="exec-card__mandate">
          <span className="exec-card__mandate-label">MANDATE FOCUS</span>
          <div className="exec-card__chips">
            {(isFullPage ? leader.keyFocus : leader.keyFocus.slice(0, 3)).map((tag) => (
              <span className="exec-card__chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Full Bio Expander on Dedicated Leaders Page */}
        {isFullPage && leader.bio && (
          <details className="exec-card__dossier" open={isAnchor}>
            <summary className="exec-card__dossier-toggle">
              <span>Executive Dossier & Career</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="exec-card__chevron"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="exec-card__dossier-body">
              <p>{leader.bio}</p>
            </div>
          </details>
        )}

        {/* Card Footer Action */}
        <div className="exec-card__footer">
          {isFullPage ? (
            <a
              href="/contact/"
              className="exec-card__action-btn"
              aria-label={`Consult with the office of ${leader.name}`}
            >
              <span>Consult With Office</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ) : (
            <a
              href={`/about/leaders/#${leader.slug}`}
              className="exec-card__action-btn"
              aria-label={`View full leadership profile of ${leader.name}`}
            >
              <span>Executive Profile</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
