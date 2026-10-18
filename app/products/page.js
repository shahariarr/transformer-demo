import Products from '@/components/Products';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Products',
  description: 'Oil-immersed power and distribution transformers from 4,000 to 16,000 kVA, built for utility and industrial networks.'
};

const CONFIG_SPECS = [
  {
    tag: 'Winding Conductor',
    title: 'Copper or Aluminium',
    desc: 'Electrolytic copper or EC-grade aluminium windings with high-grade thermal insulation.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="3" /><circle cx="12" cy="12" r="3" /><circle cx="17" cy="12" r="3" />
      </svg>
    )
  },
  {
    tag: 'Primary Voltage',
    title: '10 kV to 35 kV Range',
    desc: 'Customizable HV primary insulation classes up to 35 kV with tailored impulse BIL ratings.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )
  },
  {
    tag: 'Grid Frequency',
    title: '50 Hz / 60 Hz Dual',
    desc: 'Optimized magnetic flux density designed for worldwide 50 Hz or 60 Hz utility compliance.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h3l3-8 4 16 3-8h7" />
      </svg>
    )
  },
  {
    tag: 'Voltage Regulation',
    title: 'Off-Circuit & OLTC',
    desc: 'Manual de-energized tap changers or automatic On-Load Tap Changers with AVR controls.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  },
  {
    tag: 'Enclosure & Tank',
    title: 'Conservator / Sealed',
    desc: 'Corrugated hermetically sealed or conventional conservator tanks with silica breathers.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    tag: 'Thermal Cooling',
    title: 'ONAN / ONAF Cooling',
    desc: 'Natural oil convection with high-surface radiators, or forced-air cooling fans.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    )
  },
  {
    tag: 'Network Integration',
    title: 'Custom Vector Group',
    desc: 'Dyn11, YNd11 or custom phase displacement with % impedance matched to fault levels.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12l-4-4-4 4M12 8v8" />
      </svg>
    )
  },
  {
    tag: 'Efficiency Standard',
    title: 'Low-Loss CRGO Core',
    desc: 'Laser-scribed cold-rolled grain-oriented core laminations for minimal running costs.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-4 3.5-7.5 8-9.5 4.5 2 8 5.5 8 9.5a7 7 0 0 1-7 7z" />
        <path d="M12 4v16" />
      </svg>
    )
  }
];

export default function ProductsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Products' }]} label="OUR PRODUCTS" title="Transformers Engineered for Critical Power"
        desc="Oil-immersed power and distribution transformers designed, built and tested in-house, from 4,000 to 16,000 kVA."
        image="/assets/images/factory-bg.png">
        <a className="btn btn--primary" href="/contact/">Request a Quote</a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      <section className="sec sec--alt" aria-label="Product range"><Products viewAll={false} /></section>

      <section className="sec" aria-label="Custom engineering">
        <div className="wrap">
          <div className="custom-spec-head">
            <span className="spec-badge fade-in-up">
              <span className="spec-badge__dot" />
              TAILORED ENGINEERING SPECIFICATIONS
            </span>
            <h2 className="fade-in-up" data-delay="80">Every unit configured for its site</h2>
          </div>

          <div className="spec-cards-grid">
            {CONFIG_SPECS.map((spec, idx) => (
              <div className="spec-card fade-in-up" data-delay={80 * ((idx % 4) + 1)} key={spec.title}>
                <div className="spec-card__top">
                  <div className="spec-card__icon" aria-hidden="true">
                    {spec.icon}
                  </div>
                  <span className="spec-card__tag">{spec.tag}</span>
                </div>
                <h3 className="spec-card__title">{spec.title}</h3>
                <p className="spec-card__desc">{spec.desc}</p>
                <div className="spec-card__footer">
                  <span className="spec-card__status">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    Configurable
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rating-callout fade-in-up" data-delay="320">
            <div className="rating-callout__content">
              <div className="rating-callout__badge">
                <span className="rating-callout__dot" />
                Engineering Sizing & Consultation
              </div>
              <h3 className="rating-callout__title">Not sure what rating you need?</h3>
              <p className="rating-callout__desc">
                Use our interactive sizing guide to calculate the estimated kVA from your load parameters, or send us your single-line diagram (SLD) and our engineering team will size it for you.
              </p>
              <div className="rating-callout__perks">
                <span className="rating-callout__perk">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Instant kVA Estimation
                </span>
                <span className="rating-callout__perk">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  kW to kVA Power Factor Sizing
                </span>
                <span className="rating-callout__perk">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Free SLD Review by Engineers
                </span>
              </div>
            </div>

            <div className="rating-callout__actions">
              <a className="btn rating-callout__btn-primary" href="/resources/sizing-guide/">
                <span>Sizing Guide</span>
                <ArrowRight />
              </a>
              <a className="btn rating-callout__btn-ghost" href="/contact/">
                Ask an Engineer
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
