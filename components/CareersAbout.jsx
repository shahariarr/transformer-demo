import RawSvg from './RawSvg';

const CAREERS_HIGHLIGHTS = [
  {
    title: 'Pioneering High-Voltage R&D',
    desc: 'Conduct 2D/3D electromagnetic core simulations, stray loss mitigation, and insulation coordination adhering to IEC 60076 & IEEE C57 standards.',
    icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />'
  },
  {
    title: 'Uncompromising Safety First',
    desc: 'Zero-compromise occupational safety culture with automated high-voltage interlocks, full PPE protocols, and daily plant briefings.',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />'
  },
  {
    title: 'Clear Technical Career Ladders',
    desc: 'Transparent progression pathways from Graduate Trainee Engineer through Senior Specialist to Principal Engineer and Technical Director.',
    icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>'
  }
];

export default function CareersAbout() {
  return (
    <div className="wrap about__grid">
      <div className="about__copy">
        <p className="label fade-in-left">LIFE AT BASIC POWER</p>
        <h2 className="fade-in-left" data-delay="100">
          Where Engineering Fundamentals Shape the National Grid
        </h2>
        <p className="lead fade-in-left" data-delay="200">
          We don&apos;t just assemble parts — our multidisciplinary teams design high-voltage cores from raw electrical steel, pour precision winding coils, and engineer substations that energise heavy industrial zones and national power utilities.
        </p>

        <ul className="highlights">
          {CAREERS_HIGHLIGHTS.map((h, i) => (
            <li className="fade-in-up" data-delay={280 + i * 90} key={h.title}>
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: h.icon }}
              />
              <div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__media">
        <div className="about-collage">
          <div className="about-card about-card--main fade-in-right" data-delay="150">
            <img
              src="/assets/images/lifecycle/04-manufacturing-fat.jpg"
              alt="BPEL Gazipur Heavy Manufacturing Plant"
              className="about-card__img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-card about-card--sub fade-in-up" data-delay="280">
            <img
              src="/assets/images/lifecycle/02-engineering-design.jpg"
              alt="BPEL Engineering & Design Team"
              className="about-card__img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-badge fade-in-right" data-delay="380" tabIndex="0" role="region" aria-label="1000+ Strong Engineering Team">
            <div className="about-badge__icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="about-badge__label">Engineering Talent</div>
            <div className="about-badge__stat">
              <span className="about-badge__num">1,000+</span>
              <span className="about-badge__unit">Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
