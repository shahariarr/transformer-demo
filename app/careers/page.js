import { PageHero } from '@/components/PageParts';
import CareersVacancyDirectory from '@/components/CareersVacancyDirectory';
import CareersHiringProcess from '@/components/CareersHiringProcess';
import CareersWorkplaces from '@/components/CareersWorkplaces';
import SectionHead from '@/components/SectionHead';
import Link from 'next/link';

export const metadata = {
  title: 'Careers & Open Engineering Vacancies',
  description: 'Explore open engineering vacancies in transformer design, high-voltage testing, plant manufacturing, and substation commissioning at Basic Power Engineering Ltd.'
};

export default function CareersPage() {
  return (
    <>
      {/* 1. Page Hero Banner */}
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

      {/* 2. CURRENT OPENINGS Section */}
      <section id="vacancies" className="sec" aria-label="Currently Open Vacancies">
        <div className="wrap">
          <SectionHead
            label="CURRENT OPENINGS"
            title="Explore Vacancies Across All Disciplines"
          />
          <CareersVacancyDirectory />
        </div>
      </section>

      {/* 3. OUR HIRING METHODOLOGY Section */}
      <section id="hiring-process" className="sec sec--dark" aria-label="Our Hiring Methodology">
        <CareersHiringProcess />
      </section>

      {/* 4. OUR STRATEGIC WORKPLACES Section */}
      <section id="workplaces" className="sec sec--alt" aria-label="Our Strategic Workplaces">
        <CareersWorkplaces />
      </section>
    </>
  );
}
