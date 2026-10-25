import { PageHero, ArrowRight } from '@/components/PageParts';
import CareersVacancyDirectory from '@/components/CareersVacancyDirectory';
import SectionHead from '@/components/SectionHead';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import styles from './page.module.css';

export const metadata = {
  title: 'Careers & Open Engineering Vacancies | BPEL',
  description: 'Join the engineers, technicians, and specialists building high-voltage power transformers and turnkey substations across Bangladesh at Basic Power Engineering Ltd.'
};

const CAREER_FACTS = [
  {
    metric: '1,000+',
    label: 'Company Employees',
    desc: 'Multidisciplinary design engineers, factory craftsmen, R&D specialists, and commissioning teams.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    metric: '92%',
    label: 'Retention & Career Growth',
    desc: 'Structured technical ladders from Graduate Trainee Engineer to Senior Specialist and Technical Director.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  },
  {
    metric: '100+ Hrs',
    label: 'Annual Training & CPD',
    desc: 'Company-sponsored certifications, IEB continuing professional development credits, and technical workshops.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  {
    metric: '100%',
    label: 'Welfare, Health & Safety',
    desc: 'Comprehensive medical cover, dual festival bonuses, provident fund, staff transport, and zero-accident culture.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];

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
          <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp HR</span>
        </a>
      </PageHero>


      {/* 4. CURRENT OPENINGS Section (matching Products & Services Directory) */}
      <section id="vacancies" className="sec sec--alt" aria-label="Currently Open Vacancies">
        <div className="wrap">
          <SectionHead
            label="CURRENT VACANCIES"
            title="Explore Open Engineering & Technical Roles"
          />
          <CareersVacancyDirectory />
        </div>
      </section>
  

    </>
  );
}
