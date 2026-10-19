import SectionHead from './SectionHead';

const HIRING_STEPS = [
  {
    step: '01',
    title: 'Online Application & Screening',
    timeline: '3 Business Days',
    desc: 'Submit your resume and engineering credentials via our online portal. Our technical HR team conducts preliminary review against discipline criteria.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  {
    step: '02',
    title: 'Technical Panel Discussion',
    timeline: 'Within 1 Week',
    desc: 'Engage in a structured interview with senior discipline heads evaluating electromagnetic fundamentals, plant operations, or field commissioning experience.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    step: '03',
    title: 'Facility & High-Voltage Lab Tour',
    timeline: 'Within 2 Weeks',
    desc: 'Visit our Gazipur manufacturing plant or Dhaka design headquarters. Meet your future team members, tour our testing bays, and discuss live engineering projects.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    step: '04',
    title: 'Formal Offer & Structured Induction',
    timeline: 'Prompt Execution',
    desc: 'Receive a competitive offer package including full health and retirement benefits. Begin with structured safety induction and mentorship under senior engineers.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  }
];

export default function CareersHiringProcess() {
  return (
    <div className="wrap">
      <SectionHead
        label="OUR HIRING METHODOLOGY"
        title="A Transparent, Engineering-Led Process"
        desc="From initial application to offer letter, our 4-stage recruitment cycle ensures mutual technical alignment, clear expectations, and fast feedback."
      />

      <div className="careers-process-grid">
        {HIRING_STEPS.map((s, i) => (
          <div className="careers-process-card fade-in-up" data-delay={i * 100} key={s.step}>
            <div className="careers-process-header">
              <span className="careers-process-num">{s.step}</span>
              <span className="careers-process-timeline">{s.timeline}</span>
            </div>
            <div className="careers-process-icon" aria-hidden="true">
              {s.icon}
            </div>
            <h3 className="careers-process-title">{s.title}</h3>
            <p className="careers-process-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
