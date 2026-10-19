import { LEADERS } from '@/lib/leaders';
import { PageHero, ArrowRight } from '@/components/PageParts';
import LeadersDirectory from '@/components/LeadersDirectory';

export const metadata = {
  title: 'Company Leadership & Executive Governance | BPEL',
  description: 'Meet the executive leadership team, engineering directors, and plant managers guiding BPEL transformer manufacturing and turnkey power projects.'
};

export default function LeadersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us', href: '/about/' }, { label: 'Leadership' }]}
        label="EXECUTIVE GOVERNANCE"
        title="The Engineering Minds & Vision Behind BPEL"
        desc="Decades of high-voltage electromagnetic design, precision factory management, accredited laboratory testing, and turnkey utility grid execution."
        image="/assets/images/about-campus.jpg"
      >
        <a className="btn btn--primary" href="/contact/">Connect With Leadership</a>
        <a className="btn btn--ghost" href="/about/">About BPEL</a>
      </PageHero>

      <section className="sec" aria-label="Executive Board & Leadership Team">
        <div className="wrap">
          {/* Executive Section Header */}
          <div className="creative-title--wrap fade-in-up">
            <div className="creative-eyebrow">
              <span className="creative-eyebrow__pulse" aria-hidden="true" />
              <span className="creative-eyebrow__text">EXECUTIVE GOVERNANCE & ENGINEERING BOARD</span>
            </div>

            <h2 className="creative-title">
              Board of Directors <span className="creative-title__amp">&amp;</span> <span className="creative-title__gradient">Engineering Leaders</span>
            </h2>

            <div className="creative-title-divider" aria-hidden="true">
              <span className="creative-title-divider__line" />
              <span className="creative-title-divider__node">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </span>
              <span className="creative-title-divider__line" />
            </div>

            <p className="creative-lead">
              Every unit engineered and manufactured at BPEL is guided by certified electrical engineers, BUET research fellows, and operational directors with decades of hands-on utility grid execution and industrial continuous-power substation management.
            </p>

            <div className="creative-title-badges">
              <span className="creative-badge">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span><strong>100% In-House</strong> Senior Technical Directorate</span>
              </span>
              <span className="creative-badge">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
                <span><strong>35+ Yrs</strong> Grid Manufacturing Legacy</span>
              </span>
              <span className="creative-badge">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <span><strong>140+</strong> Turnkey Substation Cut-Overs</span>
              </span>
            </div>
          </div>


          {/* Executive Leaders Directory */}
          <LeadersDirectory leaders={LEADERS} />
        </div>
      </section>

      {/* Direct Executive Consultation Callout */}
      <section className="sec sec--alt" aria-label="Work With Our Engineers">
        <div className="wrap split">
          <div>
            <p className="label fade-in-up">EXECUTIVE CONSULTATION</p>
            <h2 className="fade-in-up" data-delay="80">Consult Directly With Our Chief Engineers</h2>
            <p className="lead fade-in-up" data-delay="160">
              For high-capacity utility tenders, custom BIL insulation levels, specialized substation topologies, or factory audit requests, our directors and engineering heads are directly accessible to client teams.
            </p>
            <div className="detail__actions fade-in-up" data-delay="240" style={{ marginTop: '1.5rem' }}>
              <a className="btn btn--primary" href="/contact/">Schedule Technical Discussion <ArrowRight /></a>
              <a className="btn btn--ghost" href="/engineering/">Explore Factory & Plant</a>
            </div>
          </div>

          <aside className="panel fade-in-right">
            <h3>Factory Acceptance Testing (FAT)</h3>
            <p>
              Witness your transformer’s routine, type, and special tests directly in our accredited testing bay under the direct supervision of our Quality Director and Chief Test Engineers.
            </p>
            <div style={{ marginTop: '1.25rem' }}>
              <a className="btn btn--primary" href="/certifications/">View Test Reports & Accreditations</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
