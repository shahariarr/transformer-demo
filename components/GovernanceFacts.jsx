export default function GovernanceFacts({ delay = 100 }) {
  const facts = [
    {
      metric: '100%',
      label: 'Engineer-Led Board',
      desc: 'BUET, KUET, CUET & Imperial College London alumni direct every technical unit.',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      )
    },
    {
      metric: '135+ Yrs',
      label: 'Combined Grid Tenure',
      desc: 'Decades of electromagnetic design, core slitting & live utility commissioning.',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      metric: 'FAT Bay',
      label: 'Direct Test Access',
      desc: 'Witness impulse breakdown and loss measurement directly in our accredited lab.',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    },
    {
      metric: 'IEC & IEEE',
      label: 'Global Compliance',
      desc: 'Manufactured and certified under IEC 60076, IEEE standards and ISO 9001/14001.',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    }
  ];

  return (
    <div className="exec-facts-strip fade-in-up" data-delay={delay} role="region" aria-label="Governance Highlights">
      {facts.map((item, idx) => (
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
  );
}
