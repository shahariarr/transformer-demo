/* "View all" pill link used in section headers (matches the 44px arrow buttons beside it) */
export default function ViewAll({ href, children = 'View all', className = '' }) {
  return (
    <a href={href} className={`view-all ${className}`}>
      <span>{children}</span>
      <span className="view-all__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </span>
    </a>
  );
}
