import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DATA, waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import Stats from '@/components/Stats';
import { PROJECTS_DETAILS } from '@/lib/projects';
import styles from './page.module.css';

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
            {/* 1. Project Overview Intro */}
            <div className={`detail__header-block ${styles.detailHeaderBlock} fade-in-up`}>
              <span className="label" style={{ marginBottom: '0.35rem' }}>PROJECT SUMMARY</span>
              <h2>Engineering Scope &amp; Deployment</h2>
              <div className={`detail__intro-box ${styles.detailIntroBox}`}>
                <p>{d.overview || p.desc}</p>
              </div>
            </div>

            {/* 2. Quick Project Specifications / Meta Grid */}
            <div className={`fade-in-up ${styles.projectMetaGrid}`} data-delay="80">
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>CLIENT / SECTOR</span>
                <span className={styles.metaValue}>{d.authority || 'Industrial / Utility'}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>CAPACITY / SCOPE</span>
                <span className={styles.metaValue}>{d.capacity || p.scope}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>VOLTAGE CLASS</span>
                <span className={styles.metaValue}>{d.voltage || 'Medium / High Voltage'}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>DELIVERY &amp; STATUS</span>
                <span className={styles.metaValue}>{d.commissioned || 'Fully Energized'}</span>
              </div>
            </div>

            {/* 3. Standards & Compliance Chips */}
            {d.standards && d.standards.length > 0 && (
              <div className={`fade-in-up ${styles.standardsCard}`} data-delay="120">
                <div className={styles.standardsHeader}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>TESTING STANDARDS &amp; CODE COMPLIANCE</span>
                </div>
                <div className={styles.standardsChips}>
                  {d.standards.map((std) => (
                    <span key={std} className={styles.stdChip}>
                      <span className={styles.stdDot} aria-hidden="true" />
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CTAs */}
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
          4. SITE CONDITIONS & COMMISSIONED SYSTEMS (NEW SECTION)
          ========================================================= */}
      {(d.challenges?.length > 0 || d.scope?.length > 0) && (
        <section className={`sec sec--alt ${styles.specsSection}`} aria-label="Site Conditions and Commissioned Systems">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">ENGINEERING SPECIFICATIONS</p>
              <h2>Site Conditions &amp; Technical Scope</h2>
              <p className="sec-head__desc">
                In-depth breakdown of site installation constraints, customized engineering solutions, and turnkey systems commissioned for this project.
              </p>
            </header>

            <div className={styles.specsTwoColGrid}>
              {/* 1. Site & Engineering Challenges Card */}
              {d.challenges && d.challenges.length > 0 && (
                <div className={`detail__spec-card ${styles.specCard} ${styles.specCardInGrid} fade-in-up`} data-delay="100">
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

              {/* 2. Turnkey Scope & Technical Deliverables Card */}
              {d.scope && d.scope.length > 0 && (
                <div className={`detail__spec-card ${styles.specCard} ${styles.specCardInGrid} fade-in-up`} data-delay="180">
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
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          5. EQUIPMENT & SYSTEMS DEPLOYED
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Equipment & Systems Deployed">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EQUIPMENT &amp; SYSTEMS DEPLOYED</p>
            <h2>Transformers &amp; Assemblies in this Installation</h2>
            <p className="sec-head__desc">
              High-voltage liquid-immersed transformers and switchgear units manufactured to the exact specifications of this project.
            </p>
          </header>

          <div className="pgrid">
            {deployedProducts.map((prod, i) => (
              <LinkCard
                key={prod.name}
                href={`/products/${prod.slug}/`}
                image={prod.image}
                contain={true}
                title={prod.name}
                text={prod.desc}
                more="Learn more"
                delay={i * 80}
              />
            ))}
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

    </>
  );
}
