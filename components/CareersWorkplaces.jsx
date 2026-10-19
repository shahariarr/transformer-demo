import SectionHead from './SectionHead';

const WORKPLACES = [
  {
    city: 'DHAKA',
    tag: 'Corporate & R&D Hub',
    name: 'Nikunja-2 Corporate Headquarters',
    address: 'Plot 35, Road 2, Block A, Nikunja-2, Khilkhet, Dhaka-1229',
    image: '/assets/images/about-tower.jpg',
    roles: ['Electromagnetic Simulation & 3D FEA', 'Commercial Tendering & e-GP', 'Executive Leadership & Finance', 'Utility Client Technical Liaison']
  },
  {
    city: 'GAZIPUR',
    tag: 'Heavy Manufacturing Campus',
    name: 'Gazipur Heavy Transformer Plant',
    address: 'Baghrepar, Masterbari, Gazipur-1740, Bangladesh',
    image: '/assets/images/about-campus.jpg',
    roles: ['Automated Core Slitting & Stacking', 'HV & LV Coil Winding Bays', 'Accredited 200kV FAT Testing Lab', 'Vacuum Pressure Drying Autoclaves']
  },
  {
    city: 'CHATTOGRAM',
    tag: 'Regional Operations Hub',
    name: 'Agrabad Regional Operations Center',
    address: 'Agrabad Commercial Area, Chattogram-4100, Bangladesh',
    image: '/assets/images/services/supply-warehouse.jpg',
    roles: ['Port Logistics & Customs Clearance', 'Regional Substation Erection & EPC', 'Field Oil Purification & BDV Testing', '24/7 Emergency Technical Support']
  }
];

export default function CareersWorkplaces() {
  return (
    <div className="wrap">
      <SectionHead
        label="OUR STRATEGIC WORKPLACES"
        title="Where Our Teams Design, Build & Innovate"
        desc="Explore the purpose-built facilities across Bangladesh where BPEL engineers solve complex electrical power challenges every day."
      />

      <div className="careers-workplaces-grid">
        {WORKPLACES.map((w, i) => (
          <article className="careers-workplace-card fade-in-up" data-delay={i * 90} key={w.city}>
            <div className="workplace-card__image-wrap">
              <img
                src={w.image}
                alt={w.name}
                className="workplace-card__img"
                loading="lazy"
                decoding="async"
              />
              <span className="workplace-card__badge">{w.tag}</span>
            </div>

            <div className="workplace-card__body">
              <span className="workplace-card__city">{w.city}</span>
              <h3 className="workplace-card__title">{w.name}</h3>
              <p className="workplace-card__address">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{w.address}</span>
              </p>

              <div className="workplace-card__specs">
                <span className="workplace-card__specs-title">Primary Disciplines & Operations:</span>
                <ul className="workplace-card__roles-list">
                  {w.roles.map((r) => (
                    <li key={r}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
