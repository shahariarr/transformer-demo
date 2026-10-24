import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import Stats from '@/components/Stats';
import { PROJECTS_DETAILS } from '@/lib/projects';
import styles from './page.module.css';

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const find = slug => DATA.projects.find(p => p.slug === slug);

export function generateStaticParams() {
  return DATA.projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = find((await params).slug);
  return p
    ? {
        title: `${p.title} | Turnkey Case Study | BPEL`,
        description: p.desc
      }
    : {};
}

const DEFAULT_PROJECT_STATS = [
  { target: 100, suffix: '%', label: 'ACCUMULATED FAT PASS RATE', format: false },
  { target: 35, suffix: '+ Yrs', label: 'DESIGN OPERATIONAL LIFESPAN', format: false },
  { target: 100, suffix: '%', label: 'UTILITY COMPLIANCE RATING', format: false },
  { target: 0, suffix: ' Incidents', label: 'SAFETY & ZERO-DEFECT RECORD', format: false }
];

export default async function ProjectPage({ params }) {
  const p = find((await params).slug);
  if (!p) notFound();

  const d = PROJECTS_DETAILS[p.slug] || {
    authority: 'Utility / Industrial Client',
    voltage: 'Medium & High Voltage',
    capacity: p.scope,
    duration: 'Turnkey Delivery',
    commissioned: 'Verified Operational',
    stats: DEFAULT_PROJECT_STATS,
    gallery: [p.image],
    overview: p.desc,
    challenges: ['Utility grid code compliance and short-circuit fault level withstand', 'Site logistics and precision transformer placement'],
    scope: (p.specs || '').split('•').map(s => s.trim()).filter(Boolean),
    standards: ['IEC 60076', 'IEC 62271-200', 'ISO 9001:2015']
  };

  const others = DATA.projects.filter(x => x.slug !== p.slug).slice(0, 4);
  const deployedProducts = DATA.products.slice(0, 3);

  return (
    <>
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'Projects', href: '/projects/' }, { label: p.title }]}
        label={`CASE STUDY • ${p.cat.toUpperCase()}`}
        title={p.title}
        desc={`${p.scope} — ${p.desc}`}
        image={p.image}
      >
        <a className="btn btn--primary" href="#details">
          Project Specifications <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* =========================================================
          2. METRICS / STATS BAND (Follows BPEL Stats Bar Standard)
          ========================================================= */}
      <section id="stats" className="stats-bar" aria-label="Project Performance Metrics">
        <Stats items={d.stats || DEFAULT_PROJECT_STATS} />
      </section>

      {/* =========================================================
          3. CORE PROJECT DOSSIER & SPECIFICATIONS
          ========================================================= */}
      <section id="details" className="sec sec--tight" aria-label="Project details and technical specifications">
        <div className="wrap detail">
          {/* Interactive Photo Gallery */}
          <DetailGallery
            mainImage={p.image}
            gallery={d.gallery}
            alt={p.title}
            badgeLabel="Turnkey Case Study"
          />

          <div className={`detail__content ${styles.detailContent}`}>
            {/* Project Quick Facts Bar */}
            <dl className="facts fade-in-up">
              <div>
                <dt>Location</dt>
                <dd>{p.location}</dd>
              </div>
              <div>
                <dt>Client / Sector</dt>
                <dd>{d.authority}</dd>
              </div>
              <div>
                <dt>Capacity</dt>
                <dd>{d.capacity}</dd>
              </div>
              <div>
                <dt>Voltage</dt>
                <dd>{d.voltage}</dd>
              </div>
            </dl>

            {/* 1. Project Overview Intro */}
            <div className={`detail__header-block ${styles.detailHeaderBlock} fade-in-up`}>
              <span className="label" style={{ marginBottom: '0.35rem' }}>PROJECT SUMMARY</span>
              <h2>Engineering Scope &amp; Deployment</h2>
              <div className={`detail__intro-box ${styles.detailIntroBox}`}>
                <p>{d.overview || p.desc}</p>
              </div>
            </div>

            {/* 2. Site & Engineering Challenges Card */}
            {d.challenges && d.challenges.length > 0 && (
              <div className={`detail__spec-card ${styles.specCard} fade-in-up`} data-delay="100">
                <div className={`detail__spec-card-head ${styles.specCardHead}`}>
                  <div className={`detail__spec-card-icon detail__spec-card-icon--criteria ${styles.specCardIcon} ${styles.specCardIconCriteria}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <div>
                    <span className={`detail__spec-card-label ${styles.specCardLabel}`}>ENGINEERING CHALLENGES</span>
                    <h3 className={`detail__spec-card-title ${styles.specCardTitle}`}>Site Conditions &amp; Solutions</h3>
                  </div>
                </div>
                <ul className={`detail__spec-list ${styles.specList}`}>
                  {d.challenges.map((c) => (
                    <li key={c} className={`detail__spec-item ${styles.specItem}`}>
                      <span className={`detail__spec-icon ${styles.specIcon}`} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Turnkey Scope & Technical Deliverables Card */}
            {d.scope && d.scope.length > 0 && (
              <div className={`detail__spec-card ${styles.specCard} fade-in-up`} data-delay="180">
                <div className={`detail__spec-card-head ${styles.specCardHead}`}>
                  <div className={`detail__spec-card-icon detail__spec-card-icon--scope ${styles.specCardIcon} ${styles.specCardIconScope}`} aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <span className={`detail__spec-card-label ${styles.specCardLabel}`}>TURNKEY SCOPE &amp; SPECS</span>
                    <h3 className={`detail__spec-card-title ${styles.specCardTitle}`}>Equipment &amp; Systems Commissioned</h3>
                  </div>
                </div>
                <ul className={`detail__spec-list ${styles.specList}`}>
                  {d.scope.map((s) => (
                    <li key={s} className={`detail__spec-item ${styles.specItem}`}>
                      <span className={`detail__spec-icon detail__spec-icon--gold ${styles.specIcon} ${styles.specIconGold}`} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Standards Verified */}
            {d.standards && d.standards.length > 0 && (
              <div className={`detail__standards-card ${styles.standardsCard} fade-in-up`} data-delay="240">
                <div className={`detail__standards-header ${styles.standardsHeader}`}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>VERIFIED COMPLIANCE &amp; STANDARDS</span>
                </div>
                <div className={`detail__standards-chips ${styles.standardsChips}`}>
                  {d.standards.map((std) => (
                    <span key={std} className={`detail__std-chip ${styles.stdChip}`}>
                      <span className={`detail__std-dot ${styles.stdDot}`} aria-hidden="true" />
                      <span>{std}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CTAs */}
            <div className={`detail__actions ${styles.detailActions} fade-in-up`}>
              <Link className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(p.title)}`}>
                Discuss a Similar Project <ArrowRight />
              </Link>
              <Link className="btn btn--ghost" href="/projects/">
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. EQUIPMENT & SYSTEMS DEPLOYED
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Equipment & Systems Deployed">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EQUIPMENT &amp; SYSTEMS DEPLOYED</p>
            <h2>Transformers &amp; Assemblies in this Installation</h2>
            <p className="sec-head__desc">
              High-voltage liquid-immersed transformers and switchgear units manufactured to the exact specifications of this project.
            </p>
          </header>

          <div className="pgrid">
            {deployedProducts.map((prod, i) => {
              const rawRating = (prod.name.match(/([\d,]+)\s*kva/i) || [])[1];
              const numRating = rawRating ? parseInt(rawRating.replace(/,/g, ''), 10) : null;
              const rating = numRating ? numRating.toLocaleString('en-US') : rawRating;

              return (
                <article className="pcard fade-in-up" data-delay={i * 80} key={prod.name}>
                  <div className="pcard__img">
                    <img src={prod.image} alt={prod.name} loading="lazy" decoding="async" />
                    {rating ? (
                      <span className="pcard__badge">
                        <BoltIcon />
                        <span>{rating} kVA</span>
                      </span>
                    ) : null}
                    <span className="pcard__type-tag">{prod.cat || 'Transformers'}</span>
                  </div>
                  <div className="pcard__body">
                    <div className="pcard__cat">
                      <span className="pcard__dot" aria-hidden="true" />
                      <span>{prod.cat || 'Transformers'}</span>
                    </div>
                    <h3 className="pcard__title">
                      <Link href={`/products/${prod.slug}/`}>{prod.name}</Link>
                    </h3>
                    <p className="pcard__desc">{prod.desc}</p>
                    <div className="pcard__actions">
                      <Link href={`/products/${prod.slug}/`} className="pcard__btn pcard__btn--main">
                        <span>Product Details</span>
                        <ArrowRight />
                      </Link>
                      <Link href={`/contact/?service=${encodeURIComponent(prod.name)}`} className="pcard__btn pcard__btn--ghost">
                        Inquiry
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          5. RELATED DEPLOYMENTS PORTFOLIO
          ========================================================= */}
      <section className="sec sec--tight" aria-label="More projects">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">DEPLOYMENT PORTFOLIO</p>
            <h2>Related Turnkey Deployments</h2>
            <p className="sec-head__desc">
              Explore other high-capacity substation energisations, industrial transformer installations, and distribution networks.
            </p>
          </header>
          <div className="lgrid">
            {others.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/projects/${o.slug}/`}
                image={o.image}
                kicker={`${o.cat} • ${o.location}`}
                title={o.title}
                text={o.scope}
                more="View project"
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          6. SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Technical Consultation & EPC Discussion">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TURNKEY EPC CONSULTATION</span>
              <h3>Planning a Substation Installation or Transformer Modernization?</h3>
              <p>
                Our senior electrical engineering team reviews project single-line diagrams (SLD), calculates transformer load flows, evaluates grid clearances, and provides type-tested technical submittals.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(p.title)}`}>
                <span>Request Project Discussion</span>
                <ArrowRight />
              </Link>
              <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
