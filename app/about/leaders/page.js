import Link from 'next/link';
import { LEADERS } from '@/lib/leaders';
import { PageHero, ArrowRight } from '@/components/PageParts';
import Stats from '@/components/Stats';
import LeadersDirectory from '@/components/LeadersDirectory';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Company Leadership & Executive Governance | BPEL',
  description: 'Meet the executive leadership team, engineering directors, and plant managers guiding BPEL transformer manufacturing and turnkey power projects.'
};

const LEADER_STATS = [
  { target: 35, suffix: '+ Yrs', label: 'POWER ENGINEERING LEGACY', format: false },
  { target: 100, suffix: '%', label: 'IN-HOUSE TECHNICAL DIRECTORATE', format: false },
  { target: 140, suffix: '+', label: 'TURNKEY SUBSTATIONS COMMISSIONED', format: false },
  { target: 18, suffix: '+', label: 'IEEE RESEARCH PUBLICATIONS', format: false }
];

export default function LeadersPage() {
  return (
    <>
      {/* =========================================================
          1. HERO SECTION (Follows BPEL PageHero Standard)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }, { label: 'Leadership' }]}
        label="EXECUTIVE GOVERNANCE"
        title="The Engineering Minds & Vision Behind BPEL"
        desc="Decades of high-voltage electromagnetic design, precision factory management, accredited laboratory testing, and turnkey utility grid execution."
        image="/assets/images/about-campus.jpg"
      >
        <a className="btn btn--primary" href="/contact/">
          Connect With Leadership <ArrowRight />
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
      <section id="stats" className="stats-bar" aria-label="Leadership Key Metrics">
        <Stats items={LEADER_STATS} />
      </section>

      {/* =========================================================
          3. EXECUTIVE BOARD & LEADERSHIP DIRECTORY
          ========================================================= */}
      <section className="sec sec--tight" aria-label="Executive Board & Leadership Team">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EXECUTIVE GOVERNANCE &amp; ENGINEERING BOARD</p>
            <h2>Board of Directors &amp; Engineering Leaders</h2>
            <p className="sec-head__desc">
              Every unit engineered and manufactured at BPEL is guided by certified electrical engineers, BUET research fellows, and operational directors with decades of hands-on utility grid execution and industrial continuous-power substation management.
            </p>
          </header>

          {/* Leaders Grid */}
          <LeadersDirectory leaders={LEADERS} />
        </div>
      </section>

      {/* =========================================================
          4. SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="sec sec--tight sec--alt" aria-label="Technical Discussion with Leadership">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">EXECUTIVE CONSULTATION &amp; TENDERS</span>
              <h3>Consult Directly With Our Chief Engineers &amp; Directorate</h3>
              <p>
                For high-capacity utility tenders, custom BIL insulation levels, specialized substation topologies, or factory audit requests, our directors and engineering heads are directly accessible to client teams.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href="/contact/">
                <span>Schedule Technical Discussion</span>
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

