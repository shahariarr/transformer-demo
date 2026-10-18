/* Building blocks for inner pages: page hero with breadcrumbs, link cards */

export const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

/* crumbs: [{ label, href }]; the last crumb is the current page (no href) */
export function PageHero({ crumbs = [], label, title, desc, image, children }) {
  return (
    <section className="page-hero" aria-label={title}>
      {/* lazy: avoids React preloading every linked page's hero image when links are prefetched */}
      {image ? <img className="page-hero__img" src={image} alt="" loading="lazy" decoding="async" /> : null}
      <div className="wrap">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li><a href="/">Home</a></li>
            {crumbs.map(c => (
              <li key={c.label}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        {label ? <p className="label fade-in-up">{label}</p> : null}
        <h1 className="fade-in-up" data-delay="80">{title}</h1>
        {desc ? <p className="page-hero__desc fade-in-up" data-delay="160">{desc}</p> : null}
        {children ? <div className="page-hero__actions fade-in-up" data-delay="240">{children}</div> : null}
      </div>
    </section>
  );
}

export function LinkCard({ href, image, contain, icon, kicker, title, text, more = 'Learn more', delay = 0 }) {
  return (
    <a className="lcard fade-in-up" href={href} data-delay={delay}>
      {image ? <div className={`lcard__img${contain ? ' lcard__img--contain' : ''}`}><img src={image} alt="" loading="lazy" decoding="async" /></div> : null}
      {icon ? <span className="lcard__icon" aria-hidden="true">{icon}</span> : null}
      <div className="lcard__body">
        {kicker ? <span className="lcard__kicker">{kicker}</span> : null}
        <h3>{title}</h3>
        {text ? <p>{text}</p> : null}
        <span className="lcard__more">{more} <ArrowRight /></span>
      </div>
    </a>
  );
}

export const Icon = ({ d, size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: d }} />
);
