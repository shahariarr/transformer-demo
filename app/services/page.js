import { PageHero, ArrowRight } from '@/components/PageParts';
import { SERVICES } from '@/lib/services';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import Stats from '@/components/Stats';
import styles from './page.module.css';

export const metadata = {
  title: 'Services',
  description: 'Equipment supply, installation and commissioning, testing and diagnostics, and maintenance for transformers and substations.'
};

const ServiceIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const SERVICE_STATS = [
  { target: 35, suffix: ' kV', label: 'GRID TIE-IN STEP-UP VOLTAGE', format: false },
  { target: 100, suffix: '%', label: 'INVERTER HARMONIC TOLERANCE', format: false },
  { target: 5000, suffix: ' kVA', label: 'SOLAR INVERTER TRANSFORMERS', format: true },
  { target: 99, suffix: '.4%', label: 'PEAK INVERTER DUTY EFFICIENCY', format: false }
];

const SERVICE_FACTS = [
  {
    metric: '100 MVA',
    label: 'BPEL Power Scope',
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

      {/* Metrics / Stats Band (Follows BPEL Stats Bar Standard) */}
      <section id="stats" className="stats-bar" aria-label="Sector Engineering Benchmarks">
        <Stats items={SERVICE_STATS} />
      </section>

      {/* Core Services Showcase */}
      <section className={`sec ${styles.servicesShowcaseSection}`} aria-label="Core services directory">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">FOUR CORE DISCIPLINES</p>
            <h2>Engineered Services for Grid &amp; Industrial Power</h2>
            <p className="sec-head__desc">
              Choose an individual specialized discipline or contract an integrated BPEL package.
            </p>
          </header>

          <div className={styles.servicesIndexGrid}>
            {SERVICES.map((s, i) => (
              <article key={s.slug} className={`${styles.servicesShowcaseCard} fade-in-up`} data-delay={i * 90}>
                <div className={styles.servicesShowcaseMedia}>
                  <img src={s.image} alt={s.title} loading="lazy" decoding="async" />
                  <span className={styles.servicesShowcaseKicker}>SERVICE</span>
                  <span className={styles.servicesShowcaseNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.servicesShowcaseBody}>
                  <span className={styles.servicesShowcaseBadge}>{s.badge || 'ENGINEERING DISCIPLINE'}</span>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>

                  <ul className={styles.servicesShowcaseTicks}>
                    {s.includes.slice(0, 3).map((item, idx) => (
                      <li key={idx}>
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.servicesShowcaseAction}>
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

      {/* Engineering Support & Turnkey Consultation Banner */}
      <section className="sec sec--alt" aria-label="Engineering support">
        <div className="wrap">
          <div className="faq__footer-help fade-in-up" data-delay="160">
            <div className="faq-help__main">
              <span className="faq-help__eyebrow">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Engineering Support
              </span>
              <h4>Still have questions about your project requirements?</h4>
              <p>Our power engineering team can provide single-line diagram (SLD) reviews, BPEL EPC pricing, and on-site commissioning support.</p>
              <ul className="faq-help__services">
                <li>
                  <ServiceIcon>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </ServiceIcon>
                  <span>BPEL EPC Execution</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </ServiceIcon>
                  <span>Single-Line Diagram (SLD)</span>
                </li>
                <li>
                  <ServiceIcon>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </ServiceIcon>
                  <span>Testing & Commissioning</span>
                </li>
              </ul>
            </div>
            <div className="faq-help__aside">
              <p className="faq-help__aside-title">Talk to our engineers</p>
              <p className="faq-help__aside-text">Share your requirement and get a clear technical answer.</p>
              <div className="faq-help__actions">
                <a
                  href="/contact/"
                  className="btn btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>Ask an Engineer</span>
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--wa facility-wa-btn"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d={WA_PATH} />
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
