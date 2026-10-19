import Lifecycle from '@/components/Lifecycle';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { SERVICES } from '@/lib/services';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Services',
  description: 'Equipment supply, installation and commissioning, testing and diagnostics, and maintenance for transformers and substations.'
};

const SERVICE_FACTS = [
  {
    metric: '100 MVA',
    label: 'Turnkey Power Scope',
    desc: 'From compact 100kVA distribution units to 100MVA primary grid transformers.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    metric: 'Up to 230kV',
    label: 'Substation Voltage Class',
    desc: 'Serving primary utilities, heavy industries, metro rails, and renewable plants.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    metric: '100% FAT',
    label: 'Direct Test Access',
    desc: 'Full client and third-party witness inspection inside our accredited laboratory bay.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  },
  {
    metric: '24/7 Field',
    label: 'Rapid Response Team',
    desc: 'Licensed high-voltage field engineers on call nationwide for emergency deployment.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }
];

const TURNKEY_PACKAGES = [
  {
    badge: 'PACKAGE 01',
    title: 'Turnkey Substation EPC',
    target: 'Utilities, Industrial Parks & Commercial Towers',
    desc: 'End-to-end delivery combining custom transformer manufacturing, civil foundation layout, crane rigging, MV switchgear coupling, and energized commissioning.',
    highlights: ['Single-source engineering accountability', 'Zero interface conflict between supplier & installer', 'Complete SAT test dossier & warranty'],
    href: '/services/equipment-supply/'
  },
  {
    badge: 'PACKAGE 02',
    title: 'Asset Health & Diagnostic AMC',
    target: 'Continuous Process Plants & Data Centers',
    desc: 'Comprehensive annual maintenance and testing contracts including periodic DGA oil chromatography, SFRA frequency response scans, and thermal imaging.',
    highlights: ['Scheduled online oil sampling without shutdown', 'Early detection of thermal hotspots & partial discharge', 'Detailed asset residual life reporting'],
    href: '/services/testing/'
  },
  {
    badge: 'PACKAGE 03',
    title: 'Substation Modernization & Overhaul',
    target: 'Aging Substations & Grid Expansion',
    desc: 'Rehabilitate aging power infrastructure with high-vacuum mobile oil dehydration, OLTC contact replacement, leak mitigation, and coil rewinding.',
    highlights: ['Adds 10–15 years to operational transformer life', 'Mobile oil processing plant mobilized directly to site', 'Significant capital expenditure savings'],
    href: '/services/maintenance/'
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        crumbs={[{ label: 'Services' }]}
        label="OUR SERVICES"
        title="Support Through the Whole Equipment Life"
        desc="From initial specification and FAT bay testing to on-site rigging, diagnostics, and long-term asset rehabilitation — one engineering team stands accountable."
        image="/assets/images/lifecycle/05-site-installation.jpg"
      >
        <a className="btn btn--primary" href="/contact/">
          Discuss Your Project <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* Services Facts Strip */}
      <section className="sec sec--tight" aria-label="Services capabilities overview">
        <div className="wrap">
          <div className="exec-facts-strip fade-in-up" role="region" aria-label="Service Capabilities Highlights">
            {SERVICE_FACTS.map((item, idx) => (
              <div className="exec-fact-item" key={idx}>
                <div className="exec-fact-item__head">
                  <span className="exec-fact-item__icon">{item.icon}</span>
                  <span className="exec-fact-item__metric">{item.metric}</span>
                </div>
                <h4 className="exec-fact-item__label">{item.label}</h4>
                <p className="exec-fact-item__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Showcase */}
      <section className="sec" aria-label="Core services directory">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">FOUR CORE DISCIPLINES</p>
            <h2>Engineered Services for Grid &amp; Industrial Power</h2>
            <p className="sec-head__desc">
              Choose an individual specialized discipline or contract an integrated turnkey package.
            </p>
          </header>

          <div className="services-index-grid">
            {SERVICES.map((s, i) => (
              <article key={s.slug} className="services-showcase-card fade-in-up" data-delay={i * 90}>
                <div className="services-showcase-media">
                  <img src={s.image} alt={s.title} loading="lazy" decoding="async" />
                  <span className="services-showcase-kicker">SERVICE 0{i + 1}</span>
                </div>
                <div className="services-showcase-body">
                  <span className="services-showcase-badge">{s.badge || 'ENGINEERING DISCIPLINE'}</span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>

                  <ul className="services-showcase-ticks">
                    {s.includes.slice(0, 3).map((item, idx) => (
                      <li key={idx}>
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="services-showcase-action">
                    <a className="btn btn--primary" href={`/services/${s.slug}/`}>
                      Explore Service Scope <ArrowRight />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey EPC & Integrated Solutions Section */}
      <section className="sec sec--alt" aria-label="Integrated turnkey packages">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">INTEGRATED TURNKEY SOLUTIONS</p>
            <h2>Combine Services for Single-Source Reliability</h2>
            <p className="sec-head__desc">
              Bundling manufacturing, site installation, and routine diagnostics reduces project handoff risks by 35% and guarantees end-to-end performance.
            </p>
          </header>

          <div className="turnkey-packages-grid">
            {TURNKEY_PACKAGES.map((pkg, idx) => (
              <div key={idx} className="turnkey-pkg-card fade-in-up" data-delay={idx * 100}>
                <span className="turnkey-pkg-badge">{pkg.badge}</span>
                <h3>{pkg.title}</h3>
                <p className="turnkey-pkg-target">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{pkg.target}</span>
                </p>
                <p className="turnkey-pkg-desc">{pkg.desc}</p>
                <ul className="turnkey-pkg-list">
                  {pkg.highlights.map((h, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="turnkey-pkg-action">
                  <a className="btn btn--ghost btn--sm" href={pkg.href}>
                    View Core Service <ArrowRight />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Signature Consultation Box */}
          <div className="standards-consult-box fade-in-up" style={{ marginTop: '3.5rem' }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TURNKEY ENGINEERING CONSULTATION</span>
              <h3>Need a tailored turnkey scope for your electrical project?</h3>
              <p>
                From initial single-line diagram (SLD) reviews to turn-key EPC pricing and delivery scheduling, our technical directors are ready to assist.
              </p>
            </div>
            <div className="standards-consult-actions">
              <a className="btn btn--primary" href="/contact/">
                Request Engineering Proposal <ArrowRight />
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

      {/* Energised Project Lifecycle */}
      <section id="lifecycle" className="sec sec--dark" aria-label="Project lifecycle">
        <Lifecycle />
      </section>
    </>
  );
}
