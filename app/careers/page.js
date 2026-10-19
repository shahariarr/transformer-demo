import { PageHero, ArrowRight } from '@/components/PageParts';
import CareersAbout from '@/components/CareersAbout';
import CareersVacancyDirectory from '@/components/CareersVacancyDirectory';
import CareersCulture from '@/components/CareersCulture';
import CareersHiringProcess from '@/components/CareersHiringProcess';
import CareersWorkplaces from '@/components/CareersWorkplaces';
import CareersFaq from '@/components/CareersFaq';
import SectionHead from '@/components/SectionHead';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Careers & Open Engineering Vacancies | BPEL',
  description: 'Join the engineers, technicians, and specialists building high-voltage power transformers and turnkey substations across Bangladesh at Basic Power Engineering Ltd.'
};

const CAREER_FACTS = [
  {
    metric: '35+ Years',
    label: 'Engineering Legacy',
    desc: 'Powering Bangladesh’s critical industrial and utility grids since 1985.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    metric: '500+ Team',
    label: 'Technical Specialists',
    desc: 'Multidisciplinary design engineers, factory craftsmen, and field technicians.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    metric: '200 kV FAT',
    label: 'In-House Testing Bay',
    desc: 'Fully accredited high-voltage laboratory with lightning impulse test capability.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
  },
  {
    metric: 'Zero LTI',
    label: 'Stringent Safety Culture',
    desc: 'ISO 45001 & OHSAS compliant occupational health, lockout-tagout (LOTO) and PPE.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
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

      {/* 2. Strategic Metrics / Key Facts Strip (like /services) */}
      <section className="sec sec--tight" style={{ background: '#fff', paddingTop: '2.5rem', paddingBottom: '0' }} aria-label="Key Facts">
        <div className="wrap">
          <div className="services-facts-strip fade-in-up" role="region" aria-label="Engineering Career Highlights">
            {CAREER_FACTS.map((item, idx) => (
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

      {/* 3. Life at Basic Power / Engineering Leadership (matching About) */}
      <section id="life-at-bpel" className="sec about" aria-label="Life at Basic Power">
        <CareersAbout />
      </section>

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

      {/* 5. Engineering Culture & Benefits (matching Quality / Why BPEL) */}
      <section id="culture" className="sec" style={{ background: '#fff' }} aria-label="Engineering Culture & Rewards">
        <CareersCulture />
      </section>

      {/* 6. OUR HIRING METHODOLOGY Section (matching Lifecycle Dark Section) */}
      <section id="hiring-process" className="sec sec--dark" aria-label="Our Hiring Methodology">
        <CareersHiringProcess />
      </section>

      {/* 7. OUR STRATEGIC WORKPLACES Section (matching Industries Section) */}
      <section id="workplaces" className="sec sec--alt" aria-label="Our Strategic Workplaces">
        <CareersWorkplaces />
      </section>

      {/* 8. Recruitment FAQ & Signature 2-Column Support Banner (matching Home & Services FAQ) */}
      <section id="faq" className="sec" aria-label="Frequently Asked Questions & Support">
        <CareersFaq />
      </section>
    </>
  );
}
