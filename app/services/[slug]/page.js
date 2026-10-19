import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/services';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import ServiceFaq from '@/components/ServiceFaq';

const find = slug => SERVICES.find(s => s.slug === slug);

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = find((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }) {
  const s = find((await params).slug);
  if (!s) notFound();

  const otherServices = SERVICES.filter(item => item.slug !== s.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', href: '/services/' }, { label: s.title }]}
        label="SERVICES"
        title={s.title}
        desc={s.short}
        image={s.image}
      >
        <a className="btn btn--primary" href="/contact/">
          Request This Service
        </a>
      </PageHero>

      {/* Main Service Overview & Included Scope Section */}
      <section className="sec" aria-label="Service details">
        <div className="wrap detail">
          <DetailGallery
            mainImage={s.image}
            gallery={s.gallery}
            alt={s.title}
            badgeLabel={s.badge || 'Service Operations'}
          />

          <div className="detail__content">
            {/* Service Category Pill */}
            {s.badge && (
              <div className="service-badge-pill fade-in-up">
                <span className="service-dot" aria-hidden="true" />
                <span>{s.badge}</span>
              </div>
            )}

            <div className="fade-in-up">
              <h2>Overview</h2>
              <p className="lead">{s.intro}</p>
            </div>

            {/* Quick Metrics / Key Capability Chips */}
            {s.highlights && (
              <div className="service-metric-chips fade-in-up">
                {s.highlights.map((h, idx) => (
                  <div key={idx} className="service-chip">
                    <span className="service-chip__label">{h.label}</span>
                    <span className="service-chip__val">{h.val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced What's Included Card */}
            <div className="service-included-box fade-in-up">
              <h3>What&apos;s Included</h3>
              <div className="service-included-list">
                {(s.includesDetailed || s.includes.map(title => ({ title, desc: '' }))).map((inc, i) => (
                  <div key={i} className="service-inc-item">
                    <span className="service-inc-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div className="service-inc-text">
                      <h4>{inc.title}</h4>
                      {inc.desc && <p>{inc.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Actions & Trust Reassurance */}
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href="/contact/">
                Talk to an Engineer <ArrowRight />
              </a>
              <a className="btn btn--ghost" href="/engineering/">
                How We Work
              </a>
            </div>

            <p className="service-assurance fade-in-up">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <span>Direct access to practicing high-voltage engineers &bull; ISO 9001 certified execution</span>
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Deep-Dive & Core Capabilities */}
      {s.deepDive && (
        <section className="sec sec--alt" aria-label="Engineering methodology">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">ENGINEERING DISCIPLINE</p>
              <h2>{s.deepDive.heading}</h2>
              <p className="lead">{s.deepDive.overview}</p>
            </header>

            <div className="service-methodology-grid">
              {/* Secondary narrative highlight */}
              {s.deepDive.overviewSecondary && (
                <div className="service-narrative-card fade-in-up">
                  <div className="service-narrative-head">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <h4>Quality & Traceability Commitment</h4>
                  </div>
                  <p>{s.deepDive.overviewSecondary}</p>
                  <div className="service-narrative-tags">
                    <span>100% FAT Witness Access</span>
                    <span>Direct Utility Calibration</span>
                    <span>Zero Deviation Tolerance</span>
                  </div>
                </div>
              )}

              {/* 4 Capability Cards */}
              <div className="service-caps-grid">
                {s.deepDive.capabilities.map((cap, idx) => (
                  <div key={idx} className="service-cap-card fade-in-up" data-delay={idx * 70}>
                    <div className="service-cap-num">0{idx + 1}</div>
                    <h4>{cap.title}</h4>
                    <p>{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications & Operating Parameters */}
      {s.specs && (
        <section className="sec" aria-label="Technical specifications and deliverables">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">TECHNICAL PARAMETERS</p>
              <h2>Operating Specifications & Deliverables</h2>
              <p className="lead">
                Verified technical limits, manufacturing standards, and certified project documentation packages.
              </p>
            </header>

            <div className="service-specs-wrap">
              {/* Specifications Matrix Table */}
              <div className="service-specs-card fade-in-up">
                <div className="service-specs-card__head">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Key Technical Parameters</h3>
                </div>
                <div className="service-specs-table">
                  {s.specs.map((item, idx) => (
                    <div key={idx} className="service-spec-row">
                      <span className="service-spec-label">{item.label}</span>
                      <span className="service-spec-val">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentation Deliverables Package */}
              {s.deliverables && (
                <div className="service-deliverables-card fade-in-up" data-delay="100">
                  <div className="service-deliv__head">
                    <div className="service-deliv__badge">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      <span>OFFICIAL DOSSIER</span>
                    </div>
                    <h3>Certified Project Deliverables</h3>
                    <p>Every service contract includes a formal, signed engineering handover dossier:</p>
                  </div>

                  <ul className="service-deliv-list">
                    {s.deliverables.map((doc, idx) => (
                      <li key={idx}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="service-deliv-footer">
                    <a className="btn btn--primary btn--sm" href="/contact/">
                      Request Scope Document
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Execution Lifecycle Steps */}
      <section className="sec sec--dark" aria-label="How it works">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EXECUTION PHASES</p>
            <h2>From First Inquiry to Energisation</h2>
          </header>
          <ol className="steps steps--inline">
            {s.steps.map((t, i) => (
              <li className="fade-in-up" data-delay={i * 80} key={t}>
                <span className="step-num">0{i + 1}</span>
                <h3>{t}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Service-Specific Frequently Asked Questions */}
      {s.faqs && (
        <section className="sec sec--alt" aria-label="Service technical inquiries">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">TECHNICAL INQUIRIES</p>
              <h2>Frequently Asked Questions</h2>
              <p className="lead">
                Direct answers to common questions about testing protocols, witness inspection, and lead times.
              </p>
            </header>

            <ServiceFaq faqs={s.faqs} />
          </div>
        </section>
      )}

      {/* Other Services Navigation */}
      <section className="sec" aria-label="Other services">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MORE SERVICES</p>
            <h2>Combine Services into One Turnkey Solution</h2>
          </header>
          <div className="lgrid">
            {otherServices.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/services/${o.slug}/`}
                image={o.image}
                title={o.title}
                text={o.short}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
