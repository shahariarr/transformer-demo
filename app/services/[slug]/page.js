import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/services';
import { PageHero, LinkCard, ArrowRight } from '@/components/PageParts';
import DetailGallery from '@/components/DetailGallery';
import ServiceFaq from '@/components/ServiceFaq';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

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

  const allServices = SERVICES;

  return (
    <>
      {/* Hero with Standard Navigation & WhatsApp CTA */}
      <PageHero
        crumbs={[{ label: 'Services', href: '/services/' }, { label: s.title }]}
        label="OUR SERVICES"
        title={s.title}
        desc={s.short}
        image={s.image}
      >
        <a className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
          Request This Service <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* Main Service Overview & Scope Section */}
      <section className="sec" aria-label="Service overview and scope">
        <div className="wrap detail">
          {/* Left Column: Interactive Media Gallery */}
          <div className="detail__media-col">
            <DetailGallery
              mainImage={s.image}
              gallery={s.gallery}
              alt={s.title}
              badgeLabel={s.badge || 'Field & Factory View'}
            />
          </div>

          {/* Right Column: Overview, Highlights, and Scope */}
          <div className="detail__content">
            <div className="fade-in-up">
              {s.badge && <p className="label">{s.badge}</p>}
              <h2>Overview &amp; Engineering Scope</h2>
              <p className="lead">{s.intro}</p>
            </div>

            {/* Quick Metrics Strip */}
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

            {/* Structured What's Included Box */}
            <div className="service-included-box fade-in-up">
              <h3>What&apos;s Included in This Service</h3>
              <div className="service-included-list">
                {(s.includesDetailed || s.includes.map(title => ({ title, desc: '' }))).map((inc, i) => (
                  <div key={i} className="service-inc-item">
                    <span className="service-inc-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

            {/* Action Buttons */}
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
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
              <span>Direct access to practicing high-voltage engineers &bull; ISO 9001:2015 certified execution</span>
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Discipline & Capabilities */}
      {s.deepDive && (
        <section className="sec sec--alt" aria-label="Engineering discipline and methodology">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">ENGINEERING DISCIPLINE &amp; STANDARDS</p>
              <h2>{s.deepDive.heading}</h2>
            </header>

            {/* Relocated Executive Engineering Commitments Strip */}
            <div className="service-commitments-grid fade-in-up" role="region" aria-label="Engineering Commitments">
              <div className="service-commitment-item">
                <div className="service-commitment-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="service-commitment-body">
                  <h4>100% FAT Witness Access</h4>
                  <p>Direct client and third-party inspection in accredited high-voltage testing bay.</p>
                </div>
              </div>

              <div className="service-commitment-item">
                <div className="service-commitment-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="service-commitment-body">
                  <h4>24/7 Field Rapid Response</h4>
                  <p>Certified substation engineers ready for nationwide emergency deployment.</p>
                </div>
              </div>

              <div className="service-commitment-item">
                <div className="service-commitment-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="service-commitment-body">
                  <h4>Turnkey Single Accountability</h4>
                  <p>One unified engineering team from design review to final energisation.</p>
                </div>
              </div>
            </div>

            {/* 4 Capabilities Cards */}
            <div className="service-caps-grid">
              {s.deepDive.capabilities.map((cap, idx) => (
                <div key={idx} className="service-cap-card fade-in-up" data-delay={idx * 70}>
                  <div className="service-cap-num">0{idx + 1}</div>
                  <h4>{cap.title}</h4>
                  <p>{cap.desc}</p>
                  <div className="service-cap-verified">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified by BPEL Standards</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical Specifications & Official Deliverables */}
      {s.specs && (
        <section className="sec" aria-label="Technical specifications and deliverables">
          <div className="wrap">
            <header className="sec-head fade-in-up">
              <p className="label">TECHNICAL PARAMETERS &amp; DELIVERABLES</p>
              <h2>Operating Specifications &amp; Handover Package</h2>
              <p className="sec-head__desc">
                Verified engineering parameters, compliance benchmarks, and official documentation dossiers.
              </p>
            </header>

            <div className="service-specs-wrap">
              {/* Seamless Spec-Table inside Clean Unified Card */}
              <div className="service-specs-card fade-in-up">
                <div className="service-specs-card__head">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <h3>Key Technical Parameters</h3>
                </div>
                <table className="service-spec-table">
                  <tbody>
                    {s.specs.map(item => (
                      <tr key={item.label}>
                        <th scope="row">{item.label}</th>
                        <td>{item.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Documentation Deliverables Dossier */}
              {s.deliverables && (
                <div className="service-deliverables-card fade-in-up" data-delay="100">
                  <div className="service-deliv__head">
                    <div className="service-deliv__badge">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
                    <a className="btn btn--primary btn--sm" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                      Request Technical Proposal <ArrowRight />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Execution Lifecycle Steps */}
      <section className="sec sec--dark" aria-label="Execution phases">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EXECUTION PHASES</p>
            <h2>From First Inquiry to Energisation</h2>
            <p className="sec-head__desc">
              Four disciplined execution milestones ensuring zero defects upon live substation energisation.
            </p>
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
              <p className="label">FREQUENTLY ASKED QUESTIONS</p>
              <h2>Common Technical Inquiries About {s.title}</h2>
              <p className="sec-head__desc">
                Direct answers to questions regarding test witnessing, turnaround lead times, and site procedures.
              </p>
            </header>

            <ServiceFaq faqs={s.faqs} />

            {/* Signature Website Consultation Strip */}
            <div className="standards-consult-box fade-in-up">
              <div className="standards-consult-copy">
                <span className="standards-consult-tag">TECHNICAL CONSULTATION &amp; SIZING</span>
                <h3>Have complex substation or custom transformer requirements?</h3>
                <p>
                  Our practicing electrical engineers can review your single-line diagram (SLD), calculate short-circuit tolerances, and issue an engineering proposal within 48 hours.
                </p>
              </div>
              <div className="standards-consult-actions">
                <a className="btn btn--primary" href={`/contact/?service=${encodeURIComponent(s.title)}`}>
                  Talk to an Engineer <ArrowRight />
                </a>
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
      )}

      {/* More Services Navigation - 4 Full Cards */}
      <section className="sec" aria-label="Other services">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MORE SERVICES</p>
            <h2>Combine Services into One Turnkey Solution</h2>
            <p className="sec-head__desc">
              Explore complementary electrical engineering services to streamline project execution.
            </p>
          </header>
          <div className="services-more-grid">
            {allServices.map((o, i) => (
              <LinkCard
                key={o.slug}
                href={`/services/${o.slug}/`}
                image={o.image}
                title={o.title}
                text={o.short}
                delay={i * 70}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
