'use client';

import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function Products({ viewAll = true }) {
  return (
    <div className="wrap">
      <div className="prod-head">
        <SectionHead
          label="OUR PRODUCTS"
          title="Engineered Products for Critical Power Infrastructure"
          desc="Oil-immersed power and distribution transformers built for reliable, low-loss performance in utility and industrial networks."
        />
        {viewAll ? <ViewAll href="/products/" className="fade-in-up">View all products</ViewAll> : null}
      </div>

      <div className="pgrid">
        {DATA.products.map((p, i) => {
          const rawRating = (p.name.match(/([\d,]+)\s*kva/i) || [])[1];
          const numRating = rawRating ? parseInt(rawRating.replace(/,/g, ''), 10) : null;
          const rating = numRating ? numRating.toLocaleString('en-US') : rawRating;

          const specs = p.specs || [];
          const rows = specs.filter(s => s.includes(':')).map(s => {
            const [k, ...v] = s.split(':');
            return [k.trim(), v.join(':').trim()];
          });
          const tags = specs.filter(s => !s.includes(':')).map(s => <li key={s}>{s}</li>);

          return (
            <article className="pcard fade-in-up" data-delay={(i % 3) * 90} key={p.name}>
              <div className="pcard__img">
                <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
                {rating ? (
                  <span className="pcard__badge">
                    <BoltIcon />
                    <span>{rating} kVA</span>
                  </span>
                ) : null}
                <span className="pcard__type-tag">Oil-Immersed</span>
              </div>

              <div className="pcard__body">
                <div className="pcard__cat">
                  <span className="pcard__dot" aria-hidden="true" />
                  <span>{p.cat || 'Transformers'}</span>
                </div>

                <h3 className="pcard__title">
                  <a href={`/products/${p.slug}/`}>{p.name}</a>
                </h3>

                {rows.length ? (
                  <dl className="pcard__specs-box">
                    {rows.map(([k, v]) => (
                      <div className="pcard__spec-row" key={k}>
                        <dt className="pcard__spec-key">{k}</dt>
                        <dd className="pcard__spec-val">{v}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="pcard__desc">{p.desc}</p>
                )}

                {tags.length ? <ul className="pcard__tags">{tags}</ul> : null}

                <div className="pcard__actions">
                  <a href={`/products/${p.slug}/`} className="pcard__btn pcard__btn--main" data-product={i}>
                    <span>View Details</span>
                    <Arrow />
                  </a>
                  <a href={`/contact/?service=${encodeURIComponent(p.name)}`} className="pcard__btn pcard__btn--ghost">
                    Inquiry
                  </a>
                </div>
              </div>
            </article>
          );
        })}

        <article className="pcard pcard--more fade-in-up" data-delay={(DATA.products.length % 3) * 90}>
          <div className="pcard__custom-visual" aria-hidden="true">
            <div className="pcard__custom-pattern" />
            <div className="pcard__custom-rings" />
            <span className="pcard__more-badge">
              <BoltIcon />
              <span>Bespoke Engineering</span>
            </span>
            <span className="pcard__custom-tag">Custom Build</span>
            <div className="pcard--more__icon">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </div>

          <div className="pcard__body pcard__body--more">
            <div className="pcard__cat pcard__cat--custom">
              <span className="pcard__dot pcard__dot--gold" aria-hidden="true" />
              <span>Specialist Engineering</span>
            </div>

            <h3 className="pcard__title pcard__title--more">Need a Custom Rating or Special Voltage?</h3>

            <div className="pcard__specs-box pcard__specs-box--custom">
              <div className="pcard__custom-feature">
                <span className="pcard__custom-check"><CheckIcon /></span>
                <span><strong>Capacity:</strong> 50 kVA up to 25,000 kVA</span>
              </div>
              <div className="pcard__custom-feature">
                <span className="pcard__custom-check"><CheckIcon /></span>
                <span><strong>Primary Voltage:</strong> Tailored up to 35 kV</span>
              </div>
              <div className="pcard__custom-feature">
                <span className="pcard__custom-check"><CheckIcon /></span>
                <span><strong>Vector Group:</strong> Dyn11, YNd11 or custom</span>
              </div>
              <div className="pcard__custom-feature">
                <span className="pcard__custom-check"><CheckIcon /></span>
                <span><strong>Tap Changer:</strong> Off-circuit or on-load (OLTC)</span>
              </div>
            </div>

            <div className="pcard__actions">
              <a href="/contact/" className="pcard__btn pcard__btn--quote">
                <span>Request Custom Quote</span>
                <Arrow />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
