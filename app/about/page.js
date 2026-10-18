import About from '@/components/About';
import MissionVision from '@/components/MissionVision';
import LeadersPreview from '@/components/LeadersPreview';
import Stats from '@/components/Stats';
import Quality from '@/components/Quality';
import Partners from '@/components/Partners';
import { PageHero, LinkCard, Icon } from '@/components/PageParts';

export const metadata = {
  title: 'About Us',
  description: 'BPEL designs, manufactures and supports power and distribution transformers and turnkey power solutions, serving utilities and industry since 1985.'
};

const MORE = [
  {
    href: '/about/leaders/',
    title: 'Leadership & Board',
    text: 'Meet the executive directors and chief engineers behind BPEL.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  {
    href: '/engineering/',
    title: 'Engineering & Manufacturing',
    text: 'How a transformer goes from design to factory test.',
    icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>'
  },
  {
    href: '/certifications/',
    title: 'Certifications & Test Reports',
    text: 'Accreditations and laboratory type test reports.',
    icon: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>'
  },
  {
    href: '/careers/',
    title: 'Careers',
    text: 'Join the engineering team that builds what powers industry.',
    icon: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
  }
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About Us' }]}
        label="ABOUT BPEL"
        title="Engineering Expertise Since 1985"
        desc="One team designs, builds, tests and supports every transformer, from raw material to energisation."
        image="/assets/images/about-campus.jpg"
      />

      <section id="about" className="sec about" aria-label="About Company">
        <About />
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="sec sec--alt" aria-label="Mission & Vision">
        <MissionVision />
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="sec" aria-label="Company Leadership">
        <LeadersPreview />
      </section>

      <section id="stats" className="stats-bar" aria-label="Key Performance Indicators">
        <Stats />
      </section>

      <section className="sec sec--alt" aria-label="Why work with BPEL">
        <Quality showCerts={false} />
      </section>

      <section id="partners" className="sec sec--tight" aria-label="Our Partners">
        <Partners />
      </section>

      <section className="sec sec--alt" aria-label="More about BPEL">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">LEARN MORE</p>
            <h2>Inside the company</h2>
          </header>
          <div className="lgrid">
            {MORE.map((m, i) => (
              <LinkCard
                key={m.href}
                href={m.href}
                icon={<Icon d={m.icon} />}
                title={m.title}
                text={m.text}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
