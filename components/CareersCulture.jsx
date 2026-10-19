import SectionHead from './SectionHead';

const CULTURE_CARDS = [
  {
    num: '01',
    title: 'Accredited 200kV High-Voltage Laboratory',
    desc: 'Work directly with lightning impulse generators, dielectric oil breakdown analyzers, and automated test consoles for full routine and type FAT testing.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'Advanced 3D Electromagnetic Simulation',
    desc: 'Utilise ANSYS Maxwell, SolidWorks, and AutoCAD Electrical on modern workstations to design low-loss cores, high-voltage windings, and tank structures.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'Senior IEB Fellowship & Technical Mentorship',
    desc: 'Receive direct one-on-one mentorship from senior Fellows of the Institution of Engineers Bangladesh (IEB) across live grid and industrial EPC projects.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    )
  },
  {
    num: '04',
    title: 'Comprehensive Health & Hospitalization Cover',
    desc: 'Comprehensive medical insurance covering employee and immediate family members, annual executive health screenings, and on-site emergency medical care.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  },
  {
    num: '05',
    title: 'Dual Festival Bonuses & Retirement Security',
    desc: 'Guaranteed bi-annual festival bonuses, employer-matched contributory provident fund, formal gratuity scheme, and performance-driven profit sharing.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </svg>
    )
  },
  {
    num: '06',
    title: 'Executive Transports & Modern Campus Amenities',
    desc: 'Dedicated daily air-conditioned transport shuttles across Dhaka, Gazipur, and Chattogram, subsidised cafeteria, recreation lounge, and prayer rooms.',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  }
];

export default function CareersCulture() {
  return (
    <div className="wrap">
      <SectionHead
        label="ENGINEERING CULTURE & REWARDS"
        title="Comprehensive Support for Your Career & Family"
        desc="We invest in our engineers with accredited laboratory tooling, advanced engineering software, continuous IEB mentorship, and robust family benefits."
      />

      <div className="why-bpel__grid careers-culture-grid">
        {CULTURE_CARDS.map((card, i) => (
          <article className="why-bpel__card fade-in-up" data-delay={i * 80} key={card.title}>
            <span className="why-bpel__num" aria-hidden="true">{card.num}</span>
            <span className="why-bpel__icon-box" aria-hidden="true">
              {card.icon}
            </span>
            <div>
              <h3 className="why-bpel__card-title">{card.title}</h3>
              <p className="why-bpel__card-text">{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
