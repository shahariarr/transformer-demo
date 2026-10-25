'use client';

/* Products Showcase: spotlight carousel following the exact design, style, and structure
   of the flagship Project Portfolio. Centred card is active (full details, open specs, and CTA),
   neighbours shrink and dim. Prev/next arrows, touch swipe, mouse drag, and category filters. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

function getProductCategorySlug(p) {
  const c = `${p.productType || ''} ${p.cat || ''} ${p.division || ''} ${p.typeTag || ''} ${p.name || ''}`.toLowerCase();
  if (c.includes('pad mounted') || c.includes('padmount') || c.includes('dead-front')) return 'padmounted';
  if (c.includes('gsu') || c.includes('ehv') || c.includes('power transformer') || c.includes('medium power') || c.includes('16000') || c.includes('10000')) return 'power';
  if (c.includes('dry') || c.includes('cast resin')) return 'drytype';
  if (c.includes('switchgear')) return 'switchgear';
  if (c.includes('package') || c.includes('substation') || c.includes('containerized') || c.includes('bess')) return 'substations';
  if (c.includes('distribution') || c.includes('6000') || c.includes('5000') || c.includes('4000') || c.includes('hermetically') || c.includes('corrugated') || c.includes('oil-filled') || c.includes('oil-immersed')) return 'distribution';
  return 'distribution';
}

function getProductBadges(p) {
  const list = [];
  if (p.badges && Array.isArray(p.badges)) list.push(...p.badges);
  if (p.cooling && p.cooling[0] && !list.includes(p.cooling[0])) list.push(p.cooling[0]);
  if (p.standards && p.standards[0] && !list.includes(p.standards[0])) list.push(p.standards[0]);
  if (list.length === 0 && p.specs) {
    p.specs.slice(0, 3).forEach(s => {
      const clean = s.split(':')[1]?.trim() || s;
      list.push(clean);
    });
  }
  return list.slice(0, 3);
}

const FILTERS = [
  ['all', `All Products (${DATA.products.length})`],
  ['power', 'Power Transformers'],
  ['distribution', 'Distribution Transformers'],
  ['substations', 'High-Voltage Substations & BESS'],
  ['switchgear', 'Medium-Voltage Switchgear'],
  ['padmounted', 'Pad-Mounted Substations'],
  ['drytype', 'Dry-Type & Cast Resin']
];

const AUTOPLAY_MS = 5000;
const pad = n => String(n).padStart(2, '0');
const reduced = () => (typeof window !== 'undefined' ? matchMedia('(prefers-reduced-motion: reduce)').matches : false);
const productCountLabel = n => `${n} ${n === 1 ? 'Engineered Product' : 'Engineered Products'}`;

const Chevron = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

export default function Products({ viewAll = true, isGrid = false }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const fromScroll = useRef(false);
  const scrollTimer = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);
  const mountedRef = useRef(false);

  // Filtered products list
  const items = DATA.products
    .map((p, i) => ({ ...p, originalIndex: i }))
    .filter(p => {
      if (filter === 'all') return true;
      const cat = getProductCategorySlug(p);
      if (filter === 'power') return cat === 'power';
      if (filter === 'distribution') return cat === 'distribution';
      if (filter === 'padmounted') return cat === 'padmounted';
      if (filter === 'drytype') return cat === 'drytype';
      if (filter === 'substations') return cat === 'substations';
      if (filter === 'switchgear') return cat === 'switchgear';
      return cat === filter;
    });

  const count = items.length;

  const go = useCallback(i => {
    if (count === 0) return;
    setActive(((i % count) + count) % count);
  }, [count]);

  // Center active card: instant alignment on initial load, smooth on user action
  useEffect(() => {
    if (fromScroll.current) {
      fromScroll.current = false;
      return;
    }
    const track = trackRef.current;
    const card = cardRefs.current[active];
    if (!track || !card) return;

    const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    const isFirst = !mountedRef.current;
    mountedRef.current = true;

    track.scrollTo({
      left: targetLeft,
      behavior: isFirst || reduced() ? 'auto' : 'smooth'
    });

    if (isFirst) {
      const t1 = setTimeout(() => {
        if (track && card) track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      }, 50);
      const t2 = setTimeout(() => {
        if (track && card) track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      }, 200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [active, filter]);

  // Clean up pending scroll timer on unmount
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimer.current);
    };
  }, []);

  // Index of the card whose centre is nearest the track's centre
  const nearest = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    cardRefs.current.slice(0, count).forEach((c, i) => {
      if (!c) return;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    return best;
  };

  // Touch swipe picks card closest to center
  const onScroll = () => {
    if (drag.current) return;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!trackRef.current) return;
      const best = nearest();
      if (best !== active) {
        fromScroll.current = true;
        setActive(best);
      }
    }, 140);
  };

  // Mouse drag support
  const onPointerDown = e => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || count < 2 || !trackRef.current) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, id: e.pointerId, moved: false };
    dragged.current = false;
  };

  const onPointerMove = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id || !trackRef.current) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      trackRef.current?.setPointerCapture?.(d.id);
      if (trackRef.current) trackRef.current.dataset.dragging = '';
    }
    e.preventDefault();
    if (trackRef.current) trackRef.current.scrollLeft = d.left - dx;
  };

  const endDrag = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (!d.moved) return;
    dragged.current = true;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - d.x;
    let target = nearest();
    if (target === active && Math.abs(dx) > 60) {
      target = Math.min(count - 1, Math.max(0, active + (dx < 0 ? 1 : -1)));
    }
    const card = cardRefs.current[target];
    if (card) {
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
        behavior: reduced() ? 'auto' : 'smooth'
      });
    }
    setTimeout(() => {
      if (track) delete track.dataset.dragging;
    }, 450);
    if (target !== active) {
      fromScroll.current = true;
      setActive(target);
    }
  };

  // Swallow the click that ends a drag
  const onClickCapture = e => {
    if (!dragged.current) return;
    dragged.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Autoplay only while visible on screen, not hovered, tab active and motion allowed
  useEffect(() => {
    const sec = trackRef.current?.closest('section');
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const playing = !isGrid && visible && !paused && count > 1;
  useEffect(() => {
    if (!playing || reduced()) return;
    const t = setTimeout(() => {
      if (!document.hidden) go(active + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active, go]);

  const pickFilter = key => {
    if (key === filter) return;
    setFilter(key);
    setActive(0);
  };

  const onCardClick = i => (i === active ? router.push(`/products/${items[i].slug}/`) : go(i));

  const hold = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false)
  };

  return (
    <>
      <div className="wrap">
        <div className="proj-head">
          <SectionHead
            label="OUR PRODUCTS"
            title="Engineered Products for Critical Power Infrastructure"
            desc="Oil-immersed power and distribution transformers, pad-mounted substations, and medium-voltage switchgear engineered to IEC, IEEE, and UL international standards."
          />
          <div className="proj-nav" data-animate="slideInRight">
            <span className="proj-counter">{productCountLabel(count)}</span>
            {viewAll ? <ViewAll href="/products/">View all products</ViewAll> : null}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="proj-filter-bar" data-animate="slideInLeft" role="tablist" aria-label="Filter products by category">
          {FILTERS.map(([key, label]) => (
            <button
              type="button"
              className={`proj-filter-pill${filter === key ? ' is-active' : ''}`}
              data-filter={key}
              role="tab"
              key={key}
              aria-selected={filter === key ? 'true' : 'false'}
              onClick={() => pickFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isGrid ? (
        <div className="wrap proj-grid-wrap" data-animate="slideInUp">
          <div className="proj-grid">
            {items.map((p, i) => {
              const voltage = p.voltageClasses?.[0] || (p.specs?.find(s => s.toLowerCase().includes('voltage'))?.replace(/^voltage:\s*/i, '')) || '≤36 kV';
              const topBadge = p.typeTag || p.productType || p.cat || 'Oil-Immersed';
              const badges = getProductBadges(p);
              const scopeText = p.productType || p.typeTag || p.cat || 'Power Infrastructure';

              return (
                <article
                  key={`${filter}-${p.slug}`}
                  className="pcar__card is-active proj-grid__card"
                  data-product={p.originalIndex}
                  data-category={getProductCategorySlug(p)}
                  role="article"
                  aria-label={`${i + 1} of ${count}: ${p.name}`}
                  style={{ '--i': i }}
                  onClick={() => router.push(`/products/${p.slug}/`)}
                >
                  <img className="pcar__img" src={p.image} alt={p.name} loading="lazy" decoding="async" draggable="false" />
                  <span className="pcar__shade" aria-hidden="true"></span>

                  <div className="pcar__top">
                    <span className="pcar__num" aria-hidden="true">{pad(i + 1)}</span>
                    <span className="pcar__cat">{topBadge}</span>
                  </div>

                  <div className="pcar__panel">
                    <p className="pcar__loc">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      <span>{voltage}</span>
                    </p>
                    <h3 className="pcar__title">{p.name}</h3>
                    {scopeText ? <p className="pcar__scope">{scopeText}</p> : null}
                    <div className="pcar__more">
                      <div>
                        {badges.length ? (
                          <ul className="pcar__specs">
                            {badges.map(b => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="pcar__desc">{p.desc}</p>
                        <a className="pcar__cta" href={`/products/${p.slug}/`} onClick={e => e.stopPropagation()}>
                          <span>Explore Product Details</span>
                          <span className="pcar__cta-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="pcar" data-animate="slideInRight" data-playing={playing ? 'true' : 'false'} {...hold}>
          <button
            type="button"
            className="pcar__arrow pcar__arrow--prev"
            aria-label="Previous product"
            onClick={() => go(active - 1)}
            disabled={count < 2}
          >
            <Chevron d="m15 18-6-6 6-6" />
          </button>
          <button
            type="button"
            className="pcar__arrow pcar__arrow--next"
            aria-label="Next product"
            onClick={() => go(active + 1)}
            disabled={count < 2}
          >
            <Chevron d="m9 18 6-6-6-6" />
          </button>

          <div
            className="pcar__track"
            ref={trackRef}
            tabIndex="0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Products spotlight carousel"
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={e => e.preventDefault()}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                go(active + 1);
              }
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                go(active - 1);
              }
            }}
          >
            {items.map((p, i) => {
              const voltage = p.voltageClasses?.[0] || (p.specs?.find(s => s.toLowerCase().includes('voltage'))?.replace(/^voltage:\s*/i, '')) || '≤36 kV';
              const topBadge = p.typeTag || p.productType || p.cat || 'Oil-Immersed';
              const badges = getProductBadges(p);
              const scopeText = p.productType || p.typeTag || p.cat || 'Power Infrastructure';

              return (
                <article
                  key={`${filter}-${p.slug}`}
                  ref={el => {
                    cardRefs.current[i] = el;
                  }}
                  className={`pcar__card${i === active ? ' is-active' : ''}`}
                  data-product={p.originalIndex}
                  data-category={getProductCategorySlug(p)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}: ${p.name}`}
                  style={{ '--i': i }}
                  onClick={() => onCardClick(i)}
                >
                  <img className="pcar__img" src={p.image} alt={p.name} loading="lazy" decoding="async" draggable="false" />
                  <span className="pcar__shade" aria-hidden="true"></span>

                  <div className="pcar__top">
                    <span className="pcar__num" aria-hidden="true">{pad(i + 1)}</span>
                    <span className="pcar__cat">{topBadge}</span>
                  </div>

                  <div className="pcar__panel">
                    <p className="pcar__loc">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      <span>{voltage}</span>
                    </p>
                    <h3 className="pcar__title">{p.name}</h3>
                    {scopeText ? <p className="pcar__scope">{scopeText}</p> : null}
                    <div className="pcar__more">
                      <div>
                        {badges.length ? (
                          <ul className="pcar__specs">
                            {badges.map(b => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="pcar__desc">{p.desc}</p>
                        <a
                          className="pcar__cta"
                          href={`/products/${p.slug}/`}
                          tabIndex={i === active ? 0 : -1}
                          onClick={e => e.stopPropagation()}
                        >
                          <span>Explore Product Details</span>
                          <span className="pcar__cta-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17 17 7M8 7h9v9" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <div className="wrap">
        {/* Bottom Consultation Callout Banner */}
        <div className="proj-bottom-banner fade-in-up" data-delay="150">
          <div className="proj-bottom-copy">
            <span className="proj-bottom-tag">Custom Engineering &amp; Tenders</span>
            <h4>Need Custom Tap Changers, Higher BIL, or Special Voltage Ratios?</h4>
            <p>Our senior engineering team configures bespoke impedance values, on-load tap changers (OLTC), K-factor harmonic ratings, and full factory acceptance testing (FAT) for utility and industrial projects.</p>
          </div>
          <a href="/contact/?ref=products-banner" className="btn btn--primary proj-bottom-btn">
            <span>Request Custom Technical Quote</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
