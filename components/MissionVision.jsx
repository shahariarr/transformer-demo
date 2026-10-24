export default function MissionVision() {
  return (
    <div className="wrap">
      {/* 1. Standard BPEL Section Header */}
      <header className="sec-head fade-in-up">
        <p className="label">PURPOSE &amp; DIRECTION</p>
        <h2>Our Mission &amp; Long-Term Vision</h2>
        <p className="sec-head__desc">
          Guiding every calculation, coil winding, and substation commissioning with uncompromised engineering ethics and long-term grid reliability.
        </p>
      </header>

      {/* 2. Side-by-Side Mission & Vision Cards: Picture on one side, Text on the other */}
      <div className="mv-split-list">
        {/* Mission Card: Picture on Left, Text Information on Right */}
        <article className="mv-split-card mv-split-card--mission fade-in-up" data-delay="100">
          <div className="mv-split-card__media">
            <img
              src="/assets/images/lifecycle/04-manufacturing-fat.jpg"
              alt="BPEL High-Voltage Transformer Manufacturing & Factory Acceptance Testing"
              loading="lazy"
              decoding="async"
            />
            <div className="mv-split-card__media-overlay" aria-hidden="true" />
            <div className="mv-split-card__badge-wrap">
              <span className="mv-split-card__badge mv-split-card__badge--mission">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
                <span>Our Mission</span>
              </span>
              <span className="mv-split-card__watermark" aria-hidden="true">01</span>
            </div>
          </div>

          <div className="mv-split-card__body">
            <span className="mv-split-card__kicker">FOUNDATION &amp; CORE COMMITMENT</span>
            <h3 className="mv-split-card__title">
              Powering Critical Infrastructure with Zero-Defect Transformers
            </h3>

            <p className="mv-split-card__desc">
              To engineer and manufacture high-efficiency oil-immersed and specialized distribution transformers that guarantee non-stop electrical continuity, withstand extreme network fault conditions, and minimize lifetime operational losses for utilities, industries, and public infrastructure.
            </p>

            <div className="mv-split-card__points">
              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </span>
                <div>
                  <strong>Reliability First:</strong>
                  <span> Guaranteed low no-load and load losses to save continuous lifecycle power costs.</span>
                </div>
              </div>

              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                </span>
                <div>
                  <strong>Certified Quality:</strong>
                  <span> 100% routine testing under IEC 60076 standards in our accredited test laboratory.</span>
                </div>
              </div>

              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                </span>
                <div>
                  <strong>Direct Accountability:</strong>
                  <span> In-house engineering from electromagnetic core calculation to live site energisation.</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Vision Card: Picture on Right, Text Information on Left (Diagonal / Alternating) */}
        <article className="mv-split-card mv-split-card--vision mv-split-card--reverse fade-in-up" data-delay="180">
          <div className="mv-split-card__media">
            <img
              src="/assets/images/projects/substation-installation.jpg"
              alt="BPEL High-Voltage Grid Substation & Sustainable Energy Transmission"
              loading="lazy"
              decoding="async"
            />
            <div className="mv-split-card__media-overlay" aria-hidden="true" />
            <div className="mv-split-card__badge-wrap">
              <span className="mv-split-card__badge mv-split-card__badge--vision">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>Our Vision</span>
              </span>
              <span className="mv-split-card__watermark" aria-hidden="true">02</span>
            </div>
          </div>

          <div className="mv-split-card__body">
            <span className="mv-split-card__kicker">HORIZON 2030 &amp; REGIONAL BENCHMARK</span>
            <h3 className="mv-split-card__title">
              The Regional Gold Standard in Advanced Electrical Engineering
            </h3>

            <p className="mv-split-card__desc">
              To be recognized as South Asia’s foremost indigenous manufacturer and turnkey engineering partner for high-voltage transformation, setting the benchmark for sustainable grid modernization, renewable energy integration, and smart diagnostics by 2030.
            </p>

            <div className="mv-split-card__points">
              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" /></svg>
                </span>
                <div>
                  <strong>Sustainable Technologies:</strong>
                  <span> Advancing biodegradable ester fluids and ultra-low loss core topologies.</span>
                </div>
              </div>

              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg>
                </span>
                <div>
                  <strong>Smart Grid Ready:</strong>
                  <span> Integrating real-time IoT thermal, DGA, and partial discharge monitoring.</span>
                </div>
              </div>

              <div className="mv-point">
                <span className="mv-point__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </span>
                <div>
                  <strong>Industrial Self-Reliance:</strong>
                  <span> Eliminating national reliance on imported transformers through domestic capability.</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* 3. Core Values Section */}
      <div className="mv-values-section fade-in-up" data-delay="240">
        <header className="sec-head" style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>
          <p className="label">OUR CORE VALUES</p>
          <h2>The Principles Behind Every Transformer We Build</h2>
          <p className="sec-head__desc">
            Four non-negotiable engineering commitments that guide every coil we wind, oil test we conduct, and substation we commission.
          </p>
        </header>

        <div className="mv-values-grid">
          <article className="mv-value-item">
            <div className="mv-value-item__top">
              <div className="mv-value-item__icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="mv-value-item__num" aria-hidden="true">01</span>
            </div>
            <h4>Engineering Integrity</h4>
            <p>Full transparency on copper weight, magnetic steel grade, and certified test losses with zero compromise.</p>
          </article>

          <article className="mv-value-item">
            <div className="mv-value-item__top">
              <div className="mv-value-item__icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <span className="mv-value-item__num" aria-hidden="true">02</span>
            </div>
            <h4>Zero-Defect Quality</h4>
            <p>Every transformer undergoes rigorous routine and type testing before crossing our factory gates.</p>
          </article>

          <article className="mv-value-item">
            <div className="mv-value-item__top">
              <div className="mv-value-item__icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="mv-value-item__num" aria-hidden="true">03</span>
            </div>
            <h4>Client Stewardship</h4>
            <p>Long-term lifecycle partnership with round-the-clock emergency support, spares, and field maintenance.</p>
          </article>

          <article className="mv-value-item">
            <div className="mv-value-item__top">
              <div className="mv-value-item__icon-box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
                </svg>
              </div>
              <span className="mv-value-item__num" aria-hidden="true">04</span>
            </div>
            <h4>Continuous Innovation</h4>
            <p>Ongoing investment in advanced electromagnetic simulation, tank finite element analysis, and energy efficiency.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
