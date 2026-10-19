import { PageHero } from '@/components/PageParts';
import CareersVacancyDirectory from '@/components/CareersVacancyDirectory';
import Link from 'next/link';

export const metadata = {
  title: 'Careers & Open Vacancies | Engineering Opportunities at BPEL',
  description: 'Explore open engineering vacancies in transformer design, high-voltage testing, plant manufacturing, and substation commissioning at Basic Power Engineering Ltd.'
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Careers' }]}
        label="CAREERS & ENGINEERING TALENT"
        title="Build What Powers the Nation"
        desc="Join the engineers, technicians, and specialists who design, manufacture, and commission high-voltage power transformers and turnkey substations across Bangladesh."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg"
      >
        <a className="btn btn--primary" href="#vacancies">
          <span>Explore Open Positions</span>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
        <Link className="btn btn--ghost" href="/careers/apply?job=open-application">
          <span>Submit Open CV</span>
        </Link>
      </PageHero>

      {/* Currently Open Vacancies Section */}
      <section id="vacancies" className="sec" aria-label="Currently Open Vacancies">
        <div className="wrap">
          <CareersVacancyDirectory />
        </div>
      </section>

      {/* Transparent Recruitment Roadmap */}
      <section className="sec sec--alt" aria-label="Our Hiring Process">
        <div className="wrap">
          <div className="recruitment-roadmap fade-in-up">
            <div className="roadmap-head">
              <span className="roadmap-tag">TRANSPARENT RECRUITMENT</span>
              <h3 className="roadmap-title">What to Expect During Your Application</h3>
              <p className="roadmap-desc">Our selection process assesses engineering fundamentals, safety mindset, and project execution rigor.</p>
            </div>

            <div className="roadmap-steps-grid">
              <div className="roadmap-step">
                <span className="step-num">01</span>
                <h4>Online Application</h4>
                <p>Submit your credentials through our online portal. Our technical HR team reviews submissions within 3 business days.</p>
              </div>
              <div className="roadmap-step">
                <span className="step-num">02</span>
                <h4>Technical Discussion</h4>
                <p>Engage in a structured interview with senior discipline heads evaluating electromagnetic or plant operational experience.</p>
              </div>
              <div className="roadmap-step">
                <span className="step-num">03</span>
                <h4>Facility / Lab Visit</h4>
                <p>Tour our Gazipur plant or Dhaka design office, meet your team, and discuss live transformer engineering challenges.</p>
              </div>
              <div className="roadmap-step">
                <span className="step-num">04</span>
                <h4>Formal Offer &amp; Onboarding</h4>
                <p>Receive a comprehensive offer package with full benefits, followed by structured mentorship and safety induction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
