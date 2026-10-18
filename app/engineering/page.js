import Lifecycle from '@/components/Lifecycle';
import Quality from '@/components/Quality';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { MANUFACTURING_STEPS, TEST_GROUPS } from '@/lib/resources';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Engineering & Manufacturing',
  description: 'How BPEL designs, manufactures and tests transformers: a twelve-step process from technical approval to invoice submission and a full routine, type and special test programme.'
};

export default function EngineeringPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About', href: '/about/' }, { label: 'Engineering' }]} label="ENGINEERING & MANUFACTURING" title="Where Precision Meets Power"
        desc="Every transformer is designed, built and tested under one roof, so quality is controlled at each step."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg">
        <a className="btn btn--primary" href="/contact/">
          Request Technical Proposal <ArrowRight />
        </a>
        <a className="btn btn--ghost" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
          WhatsApp
        </a>
      </PageHero>

      <section className="sec" aria-label="Manufacturing process">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MANUFACTURING PROCESS</p>
            <h2>Twelve steps from technical approval to invoice submission</h2>
            <p className="sec-head__desc">Each stage has its own checks, so problems are caught where they start rather than at final test.</p>
          </header>
          <ol className="steps">
            {MANUFACTURING_STEPS.map((s, i) => (
              <li className="fade-in-up" data-delay={(i % 5) * 70} key={s.t}><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="lifecycle" className="sec sec--dark" aria-label="Project lifecycle"><Lifecycle /></section>

      <section className="sec sec--alt qa-test-sec" aria-label="Testing & Quality Assurance">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">TESTING &amp; QUALITY ASSURANCE</p>
            <h2>Tested before it leaves the factory</h2>
            <p className="sec-head__desc">
              Every transformer undergoes multi-stage electrical and dielectric evaluation in our factory test bay in full compliance with the IEC 60076 series. Customers and third-party inspectors are welcome to witness Factory Acceptance Testing (FAT).
            </p>
          </header>

          <div className="qa-grid">
            {TEST_GROUPS.map((g, i) => (
              <article className="qa-card fade-in-up" data-delay={i * 90} key={g.t}>
                <div className="qa-card__head">
                  <div className="qa-card__meta">
                    <span className="qa-card__num" aria-hidden="true">{`0${i + 1}`}</span>
                    <span className="qa-card__std">{g.standard}</span>
                  </div>
                  <h3 className="qa-card__title">{g.t}</h3>
                  <span className="qa-card__badge">{g.badge}</span>
                  <p className="qa-card__desc">{g.d}</p>
                </div>

                <div className="qa-card__body">
                  <p className="qa-card__body-label">Standard Procedures &amp; Measurements</p>
                  <ul className="qa-card__list">
                    {g.items.map(item => (
                      <li className="qa-card__item" key={item.name}>
                        <span className="qa-card__bullet" aria-hidden="true">
                          <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M13.5 4.5 6.5 11.5 3 8" />
                          </svg>
                        </span>
                        <div className="qa-card__item-text">
                          <strong>{item.name}</strong>
                          {item.note && <span>{item.note}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="qa-card__foot">
                  <span className="qa-card__foot-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  <span>{g.footer}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Witness FAT Callout Banner */}
          <div className="qa-witness fade-in-up" data-delay="180">
            <div className="qa-witness__content">
              <span className="qa-witness__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div className="qa-witness__text">
                <h4>Witness Factory Acceptance Testing (FAT) Welcomed</h4>
                <p>
                  We invite consulting engineers, project directors, and third-party inspection authorities (SGS, Bureau Veritas, PDB, BREB, DESCO) to witness routine and dielectric tests directly in our factory test bay prior to shipment.
                </p>
              </div>
            </div>
            <div className="qa-witness__actions">
              <a className="btn btn--primary" href="/certifications/">
                View Official Test Reports <ArrowRight />
              </a>
              <a className="btn btn--ghost" href="/contact/">
                Schedule a Witness Visit
              </a>
            </div>
          </div>

          {/* Official Certificates & Test Reports Inspection Slider */}
          <Quality showWhy={false} viewAll={true} />
        </div>
      </section>
    </>
  );
}
