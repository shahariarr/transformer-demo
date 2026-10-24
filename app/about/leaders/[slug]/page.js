import { notFound } from 'next/navigation';
import { LEADERS } from '@/lib/leaders';
import { PageHero, ArrowRight } from '@/components/PageParts';
import Link from 'next/link';
import LeaderCard from '@/components/LeaderCard';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

const findLeader = (slug) => LEADERS.find((l) => l.slug === slug);

export function generateStaticParams() {
  return LEADERS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const leader = findLeader(slug);
  if (!leader) return {};
  return {
    title: `${leader.name} | Executive Profile`,
    description: `${leader.role} at BPEL. ${leader.summary}`
  };
}

export default async function LeaderProfilePage({ params }) {
  const { slug } = await params;
  const leader = findLeader(slug);

  if (!leader) {
    notFound();
  }

  const otherLeaders = LEADERS.filter((l) => l.slug !== leader.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'About Us', href: '/about/' },
          { label: 'Leadership', href: '/about/leaders/' },
          { label: leader.name }
        ]}
        label={leader.dept.toUpperCase()}
        title={leader.name}
        desc={leader.role}
        image="/assets/images/about-campus.jpg"
      >
        <a className="btn btn--primary" href="/contact/">
          Consult With Office <ArrowRight />
        </a>
        <a className="btn btn--ghost" href="/about/leaders/">
          All Directors
        </a>
      </PageHero>

      {/* Member Full Dossier Section */}
      <section className="sec leader-profile-sec" aria-label={`Profile of ${leader.name}`}>
        <div className="wrap">
          <div className="leader-profile-grid">
            {/* Left Column: Visual Portrait & Key Metrics */}
            <div className="leader-profile-aside fade-in-left">
              <div className="leader-profile-photo-card">
                <div className="leader-profile-photo-wrap">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="leader-profile-photo"
                  />
                  <div className="leader-profile-scrim" aria-hidden="true" />
                </div>
                <div className="leader-profile-badges">
                  <span className="leader-profile-badge">
                    <span
                      className="leader-profile-dot"
                      style={{ backgroundColor: leader.dotColor || '#0B5CAB' }}
                    />
                    {leader.dept}
                  </span>
                  <span className="leader-profile-badge leader-profile-badge--tenure">
                    {leader.tenure}
                  </span>
                </div>
              </div>

              {/* Quick Profile Facts */}
              <div className="leader-profile-facts">
                <div className="profile-fact-item">
                  <span className="fact-label">Department</span>
                  <strong className="fact-val">{leader.dept}</strong>
                </div>
                <div className="profile-fact-item">
                  <span className="fact-label">Experience</span>
                  <strong className="fact-val">{leader.experience}</strong>
                </div>
                <div className="profile-fact-item">
                  <span className="fact-label">Credentials</span>
                  <strong className="fact-val">{leader.educationShort}</strong>
                </div>
              </div>

              {/* Direct Connect Buttons */}
              <div className="leader-profile-connect">
                <a
                  href={`mailto:info@bpel-power.com?subject=Consultation%20with%20${encodeURIComponent(leader.name)}`}
                  className="btn btn--primary profile-contact-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Email Executive Office</span>
                </a>
                <a
                  href="/contact/"
                  className="btn btn--ghost profile-contact-btn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Book Consultation</span>
                </a>
              </div>
            </div>

            {/* Right Column: Detailed Career Dossier */}
            <div className="leader-profile-main fade-in-right">
              <div className="profile-header-strip">
                <span className="profile-kicker">EXECUTIVE LEADERSHIP DOSSIER</span>
                <h1 className="profile-title">{leader.name}</h1>
                <p className="profile-role">{leader.role}</p>
              </div>

              {/* Executive Summary Blockquote */}
              <blockquote className="profile-quote">
                "{leader.summary}"
              </blockquote>

              {/* Biography Details */}
              <div className="profile-content-block">
                <h2>Executive Background & Leadership Career</h2>
                <p className="profile-bio-text">{leader.bio}</p>
              </div>

              {/* Academic Qualifications & Fellowships */}
              <div className="profile-content-block">
                <h2>Academic Credentials & Accreditations</h2>
                <div className="profile-education-card">
                  <div className="education-icon-wrap" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <strong className="education-title">Verified Engineering Qualifications</strong>
                    <p className="education-detail">{leader.education}</p>
                  </div>
                </div>
              </div>


              {/* Consultation Callout */}
              <div className="standards-consult-box profile-consult-box fade-in-up">
                <div className="standards-consult-copy">
                  <span className="standards-consult-tag">DIRECT EXECUTIVE CONSULTATION</span>
                  <h3>Direct Technical Consultation</h3>
                  <p>
                    For utility grid tenders, high-voltage specifications, or specialized manufacturing inspections, connect directly with the office of {leader.name}.
                  </p>
                </div>
                <div className="standards-consult-actions">
                  <Link href="/contact/" className="btn btn--primary">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Schedule Technical Discussion</span>
                  </Link>
                  <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                      <path d={WA_PATH} />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Directorate Members */}
      <section className="sec sec--tight sec--alt" aria-label="Other Directorate Members">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">EXECUTIVE GOVERNANCE</p>
            <h2>Explore Other Engineering Directors</h2>
            <p className="sec-head__desc">Meet the peer engineering directors guiding power transformer innovation and turnkey EPC execution.</p>
          </header>

          <div className="leaders-grid">
            {otherLeaders.slice(0, 3).map((peer, i) => (
              <LeaderCard key={peer.slug} leader={peer} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

