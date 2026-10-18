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
          <div className="team-intro fade-in-up">
            <header className="sec-head">
              <p className="label">EXECUTIVE GOVERNANCE</p>
              <h2>Board of Directors & Engineering Leaders</h2>
              <p className="lead">
                Every unit manufactured in our facility is guided by certified electrical engineers, quality auditors, and operational specialists with direct field experience across utility grids and industrial continuous-power substations.
              </p>
            </header>
          </div>


          {/* Interactive Leaders Directory with Department Tabs */}
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
