export default function MissionVision() {
  return (
    <div className="wrap">
      <div className="sec-head sec-head--center fade-in-up">
        <p className="label">PURPOSE & DIRECTION</p>
        <h2>Our Mission & Long-Term Vision</h2>
        <p className="lead">
          Guiding every calculation, coil winding, and substation commissioning with uncompromised engineering ethics and long-term grid reliability.
        </p>
      </div>

      <div className="mv-grid">
        {/* Mission Card */}
        <article className="mv-card mv-card--mission fade-in-left" data-delay="100">
          <div className="mv-card__header">
            <span className="mv-card__badge mv-card__badge--mission">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              <span>Our Mission</span>
            </span>
            <span className="mv-card__num" aria-hidden="true">01</span>
          </div>

          <h3 className="mv-card__title">
            Powering Critical Infrastructure with Zero-Defect Transformers
          </h3>

          <p className="mv-card__desc">
            To engineer and manufacture high-efficiency oil-immersed and specialized distribution transformers that guarantee non-stop electrical continuity, withstand extreme network fault conditions, and minimize lifetime operational losses for utilities, industries, and public infrastructure.
          </p>

          <div className="mv-card__points">
            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </span>
              <div>
                <strong>Reliability First:</strong>
                <span> Guaranteed low no-load and load losses to save continuous lifecycle power costs.</span>
              </div>
            </div>

            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </span>
              <div>
                <strong>Certified Quality:</strong>
                <span> 100% routine testing under IEC 60076 standards in our accredited test laboratory.</span>
              </div>
            </div>

            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </span>
              <div>
                <strong>Direct Accountability:</strong>
                <span> In-house engineering from electromagnetic core calculation to live site energisation.</span>
              </div>
            </div>
          </div>
        </article>

        {/* Vision Card */}
        <article className="mv-card mv-card--vision fade-in-right" data-delay="180">
          <div className="mv-card__header">
            <span className="mv-card__badge mv-card__badge--vision">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>Our Vision</span>
            </span>
            <span className="mv-card__num" aria-hidden="true">02</span>
          </div>

          <h3 className="mv-card__title">
            The Regional Gold Standard in Advanced Electrical Engineering
          </h3>

          <p className="mv-card__desc">
            To be recognized as South Asia’s foremost indigenous manufacturer and turnkey engineering partner for high-voltage transformation, setting the benchmark for sustainable grid modernization, renewable energy integration, and smart diagnostics by 2030.
          </p>

          <div className="mv-card__points">
            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>
              </span>
              <div>
                <strong>Sustainable Technologies:</strong>
                <span> Advancing biodegradable ester fluids and ultra-low loss core topologies.</span>
              </div>
            </div>

            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>
              </span>
              <div>
                <strong>Smart Grid Ready:</strong>
                <span> Integrating real-time IoT thermal, DGA, and partial discharge monitoring.</span>
              </div>
            </div>

            <div className="mv-point">
              <span className="mv-point__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </span>
              <div>
                <strong>Industrial Self-Reliance:</strong>
                <span> Eliminating national reliance on imported transformers through domestic capability.</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Core Values Strip */}
      <div className="mv-values fade-in-up" data-delay="240">
        <div className="mv-values__head">
          <span className="label">OUR CORE VALUES</span>
          <h4>The Principles Behind Every Transformer We Build</h4>
        </div>

        <div className="mv-values__grid">
          <div className="mv-value-item">
            <span className="mv-value-item__num">01</span>
            <h5>Engineering Integrity</h5>
            <p>Full transparency on copper weight, magnetic steel grade, and certified test losses with zero compromise.</p>
          </div>
          <div className="mv-value-item">
            <span className="mv-value-item__num">02</span>
            <h5>Zero-Defect Quality</h5>
            <p>Every transformer undergoes rigorous routine and type testing before crossing our factory gates.</p>
          </div>
          <div className="mv-value-item">
            <span className="mv-value-item__num">03</span>
            <h5>Client Stewardship</h5>
            <p>Long-term lifecycle partnership with round-the-clock emergency support, spares, and field maintenance.</p>
          </div>
          <div className="mv-value-item">
            <span className="mv-value-item__num">04</span>
            <h5>Continuous Innovation</h5>
            <p>Ongoing investment in advanced electromagnetic simulation, tank finite element analysis, and energy efficiency.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
