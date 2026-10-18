'use client';

import { DATA } from '@/lib/data';
import { useUI } from './UIProvider';
import SectionHead from './SectionHead';

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

export default function Products() {
  const { openProduct } = useUI();

  return (
    <div className="wrap">
      <div className="prod-head">
        <SectionHead label="OUR PRODUCTS" title="Engineered Products for Critical Power Infrastructure"
          desc="Oil-immersed power and distribution transformers built for reliable, low-loss performance in utility and industrial networks." />
        <a href="#contact" className="prod-head__link fade-in-up">View all products <Arrow /></a>
      </div>
      <div className="pgrid">
        {DATA.products.map((p, i) => {
          const rating = (p.name.match(/([\d,]+)\s*kva/i) || [])[1];
          const specs = p.specs || [];
          // "Key: Value" specs become a spec table; plain ones become feature tags
          const rows = specs.filter(s => s.includes(':')).map(s => {
            const [k, ...v] = s.split(':');
            return <div key={s}><dt>{k.trim()}</dt><dd>{v.join(':').trim()}</dd></div>;
          });
          const tags = specs.filter(s => !s.includes(':')).map(s => <li key={s}>{s}</li>);

          return (
            <article className="pcard fade-in-up" data-delay={(i % 3) * 90} key={p.name}>
              <div className="pcard__img">
                <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
                {rating ? <span className="pcard__badge">{rating} kVA</span> : null}
              </div>
              <div className="pcard__body">
                <span className="pcard__cat">{p.cat || 'Transformers'}</span>
                <h3 className="pcard__title">{p.name}</h3>
                {rows.length ? <dl className="pcard__specs">{rows}</dl> : <p className="pcard__desc">{p.desc}</p>}
                {tags.length ? <ul className="pcard__tags">{tags}</ul> : null}
                <div className="pcard__actions">
                  <button type="button" className="pcard__btn pcard__btn--main" data-product={i} onClick={() => openProduct(i)}>View Details <Arrow /></button>
                  <a href="#contact" className="pcard__btn pcard__btn--ghost">Inquiry</a>
                </div>
              </div>
            </article>
          );
        })}

        <article className="pcard pcard--more fade-in-up" data-delay={(DATA.products.length % 3) * 90}>
          <span className="pcard--more__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
          </span>
          <h3>Need a custom rating?</h3>
          <p>We design and build transformers to your voltage, capacity and site specification.</p>
          <a href="#contact" className="pcard__btn pcard__btn--light">Request a Quote <Arrow /></a>
          <a href="#contact" className="pcard--more__link">Browse all products</a>
        </article>
      </div>
    </div>
  );
}
