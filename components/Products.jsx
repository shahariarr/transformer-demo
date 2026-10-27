'use client';

<<<<<<< HEAD
=======
/* Products Showcase: spotlight carousel following the exact design, style, and structure
   of the flagship Project Portfolio. Centred card is active (full details, open specs, and CTA),
   neighbours shrink and dim. Prev/next arrows, touch swipe, mouse drag, and category filters. */
>>>>>>> origin/dev_shifat
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

<<<<<<< HEAD
const PRODUCTS = [
  {
    title: 'Single Phase Overhead Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/single-phase-overhead-transformer-product/',
    img: '/assets/images/best-selling/single-phase-overhead-transformer.png',
    width: 644,
    height: 500,
    aspectRatio: '644 / 500'
  },
  {
    title: '6-10kv Series Oil Immersed Distribution Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/6-10kv-scb-series-dry-type-transformer-product/',
    img: '/assets/images/best-selling/aa-removebg-preview.png',
    width: 500,
    height: 500,
    aspectRatio: '1 / 1'
  },
  {
    title: '6-10kv Series Oil Immersed Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/6-10kv-series-oil-immersed-distribution-transformer-product/',
    img: '/assets/images/best-selling/scb-series-dry-type-transformer.png',
    width: 724,
    height: 562,
    aspectRatio: '724 / 562'
  },
  {
    title: 'AYB-12/0.4KV-1250',
    desc: 'Transformer Substation',
    more: 'LEARN MORE',
    href: '/ayb-box-type-substation-10kv-euro-variable-product/',
    img: '/assets/images/best-selling/1-transformer-substation.png',
    width: 600,
    height: 467,
    aspectRatio: '600 / 467'
  },
  {
    title: 'AGCK Type',
    desc: 'Low Voltage Switchgear',
    more: 'LEARN MORE',
    href: '/agck-type-low-voltage-withdrawable-switchgear-product/',
    img: '/assets/images/best-selling/4-low-voltage-switchgear.png',
    width: 600,
    height: 466,
    aspectRatio: '600 / 466'
  },
  {
    title: 'ZN63(VS1)-12 Vacuum Circuit Breaker',
    desc: 'Vacuum Circuit Break',
    more: 'LEARN MORE',
    href: '/zn63-vs1-12-vacuum-circuit-breaker-product/',
    img: '/assets/images/best-selling/aaa-removebg-preview.png',
    width: 500,
    height: 500,
    aspectRatio: '1 / 1'
  },
  {
    title: 'FKN12-12(R)',
    desc: 'Load Switch',
    more: 'LEARN MORE',
    href: '/fkn12-12-r-air-high-voltage-load-break-switch-with-fuse-product/',
    img: '/assets/images/best-selling/6-load-switch.png',
    width: 600,
    height: 466,
    aspectRatio: '600 / 466'
  }
];

const SETS = 5;
const SLIDES = Array.from({ length: SETS }).flatMap(() => PRODUCTS);
const CENTER_INDEX = PRODUCTS.length * 2; // Index 14 (middle set)
const AUTOPLAY_DELAY = 3000;
const TRANSITION_SPEED = 500;
const productCountLabel = n => `${n} ${n === 1 ? 'Engineered Product' : 'Engineered Products'}`;

export default function Products({ viewAll = true, isGrid = false }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(CENTER_INDEX);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const currentPixelOffsetRef = useRef(0);
  const didDragRef = useRef(false);
  const rafIdRef = useRef(null);

  const currentIndexRef = useRef(CENTER_INDEX);
  const slidesPerViewRef = useRef(4);
  const prevSlidesPerViewRef = useRef(4);

  // Responsive slidesPerView calculation
  const updateSlidesPerView = useCallback(() => {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    if (w >= 1280) {
      setSlidesPerView(4);
    } else if (w >= 992) {
      setSlidesPerView(3);
    } else if (w >= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  }, []);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView, { passive: true });
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [updateSlidesPerView]);

  currentIndexRef.current = currentIndex;
  slidesPerViewRef.current = slidesPerView;

  // On resize (slidesPerView change ONLY), reposition instantly without breaking active animations
  useEffect(() => {
    if (prevSlidesPerViewRef.current !== slidesPerView) {
      prevSlidesPerViewRef.current = slidesPerView;
      if (wrapperRef.current && !isDraggingRef.current) {
        wrapperRef.current.style.transition = 'none';
        const basePercent = currentIndexRef.current * (100 / slidesPerView);
        wrapperRef.current.style.transform = `translate3d(-${basePercent}%, 0, 0)`;
      }
    }
  }, [slidesPerView]);

  const handlePrev = useCallback(() => {
    const prev = currentIndexRef.current - 1;
    currentIndexRef.current = prev;
    setCurrentIndex(prev);
    if (trackRef.current) {
      trackRef.current.dataset.animating = 'true';
    }
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = `transform ${TRANSITION_SPEED}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      wrapperRef.current.style.transform = `translate3d(-${prev * (100 / slidesPerViewRef.current)}%, 0, 0)`;
    }
  }, []);

  const handleNext = useCallback(() => {
    const next = currentIndexRef.current + 1;
    currentIndexRef.current = next;
    setCurrentIndex(next);
    if (trackRef.current) {
      trackRef.current.dataset.animating = 'true';
    }
    if (wrapperRef.current) {
      wrapperRef.current.style.transition = `transform ${TRANSITION_SPEED}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      wrapperRef.current.style.transform = `translate3d(-${next * (100 / slidesPerViewRef.current)}%, 0, 0)`;
    }
  }, []);

  // Seamless Infinite Loop Normalization
  const onTransitionEnd = useCallback((e) => {
    if (e.target !== wrapperRef.current) return;
    if (trackRef.current) {
      delete trackRef.current.dataset.animating;
      delete trackRef.current.dataset.dragging;
    }
    const cur = currentIndexRef.current;
    const N = PRODUCTS.length;
    // Normalize if drifted outside the center set (keep index inside sets 1-3)
    if (cur < N || cur >= N * 3) {
      const productIdx = ((cur % N) + N) % N;
      const normalized = N * 2 + productIdx;
      if (wrapperRef.current) {
        wrapperRef.current.style.transition = 'none';
        const basePercent = normalized * (100 / slidesPerViewRef.current);
        wrapperRef.current.style.transform = `translate3d(-${basePercent}%, 0, 0)`;
        void wrapperRef.current.offsetHeight; // Force reflow
      }
      currentIndexRef.current = normalized;
      setCurrentIndex(normalized);
    }
  }, []);

  // Autoplay loop
  useEffect(() => {
    if (isPaused || isGrid) return;
    const timer = setInterval(() => {
      if (!isDraggingRef.current) {
        handleNext();
      }
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isPaused, isGrid, handleNext]);

  // Silky-smooth Touch & Mouse drag handlers (Continuous Multi-Card Momentum)
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartTimeRef.current = performance.now();
    dragDeltaRef.current = 0;
    didDragRef.current = false;
    setIsPaused(true);

    if (trackRef.current) {
      trackRef.current.dataset.dragging = 'true';
    }

    if (wrapperRef.current) {
      // Capture live computed position so swiping mid-motion never jumps
      const style = window.getComputedStyle(wrapperRef.current);
      const matrix = new DOMMatrixReadOnly(style.transform);
      currentPixelOffsetRef.current = matrix.m41;
      wrapperRef.current.style.transition = 'none';
      wrapperRef.current.style.transform = `translate3d(${matrix.m41}px, 0, 0)`;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    dragDeltaRef.current = delta;

    if (Math.abs(delta) > 4) {
      didDragRef.current = true;
    }

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      if (!wrapperRef.current || !isDraggingRef.current) return;
      const currentPx = currentPixelOffsetRef.current + delta;
      wrapperRef.current.style.transform = `translate3d(${currentPx}px, 0, 0)`;
    });
  };

  const endDrag = useCallback((e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    if (trackRef.current) {
      delete trackRef.current.dataset.dragging;
      trackRef.current.dataset.animating = 'true';
    }

    try {
      if (e?.pointerId && e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}

    setIsPaused(false);

    const delta = dragDeltaRef.current;
    const elapsed = Math.max(1, performance.now() - dragStartTimeRef.current);
    const velocity = delta / elapsed; // px per millisecond (signed)

    const trackWidth = trackRef.current ? trackRef.current.clientWidth : 1400;
    const slideWidthPx = trackWidth / slidesPerViewRef.current;
    const currentPx = currentPixelOffsetRef.current + delta;

    // Projected landing with velocity momentum
    const momentumPx = velocity * 180;
    const projectedPx = currentPx + momentumPx;

    // Calculate target slide index based on drag distance & momentum
    let targetIndex = Math.round(-projectedPx / slideWidthPx);

    // If small but intentional swipe, shift at least 1 card in drag direction
    const minDragThreshold = 30;
    if (targetIndex === currentIndexRef.current) {
      if (delta < -minDragThreshold || velocity < -0.2) {
        targetIndex = currentIndexRef.current + 1;
      } else if (delta > minDragThreshold || velocity > 0.2) {
        targetIndex = currentIndexRef.current - 1;
      }
    }

    // Limit single swipe distance to max 3 slides so it remains controllable
    const maxShift = 3;
    if (targetIndex > currentIndexRef.current + maxShift) {
      targetIndex = currentIndexRef.current + maxShift;
    } else if (targetIndex < currentIndexRef.current - maxShift) {
      targetIndex = currentIndexRef.current - maxShift;
    }

    // Luxury smooth drag animation curve with natural duration
    const cardsMoved = Math.abs(targetIndex - currentIndexRef.current);
    const duration = Math.min(650, Math.max(420, 380 + cardsMoved * 80));

    if (wrapperRef.current) {
      wrapperRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      const basePercent = targetIndex * (100 / slidesPerViewRef.current);
      wrapperRef.current.style.transform = `translate3d(-${basePercent}%, 0, 0)`;
    }

    currentIndexRef.current = targetIndex;
    setCurrentIndex(targetIndex);
    dragDeltaRef.current = 0;

    // Safety clear animating flag if transitionend doesn't fire
    setTimeout(() => {
      if (trackRef.current) {
        delete trackRef.current.dataset.animating;
      }
    }, duration + 50);
  }, []);

  const onClickCapture = (e) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  const slideWidthPercent = 100 / slidesPerView;
=======
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
  ['distribution', 'Distribution'],
  ['substations', 'Substations & BESS'],
  ['switchgear', 'Switchgear'],
  ['padmounted', 'Pad-Mounted'],
  ['drytype', 'Dry-Type']
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
>>>>>>> origin/dev_shifat

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
<<<<<<< HEAD
            <span className="proj-counter">{productCountLabel(PRODUCTS.length)}</span>
            {viewAll ? <ViewAll href="/products/">View all products</ViewAll> : null}
          </div>
        </div>
=======
            <span className="proj-counter">{productCountLabel(count)}</span>
            {viewAll ? <ViewAll href="/products/">View all products</ViewAll> : null}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div
          className="proj-filter-bar"
          data-animate="slideInLeft"
          role="tablist"
          aria-label="Filter products by category"
          onWheel={e => {
            if (e.deltaY !== 0 && e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
        >
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
>>>>>>> origin/dev_shifat
      </div>

      {isGrid ? (
        <div className="wrap proj-grid-wrap" data-animate="slideInUp">
          <div className="proj-grid">
<<<<<<< HEAD
            {DATA.products.map((p, i) => (
              <article
                key={p.slug || i}
                className="pcar__card is-active proj-grid__card"
                role="article"
                aria-label={`${i + 1} of ${DATA.products.length}: ${p.name}`}
                style={{ '--i': i }}
                onClick={() => router.push(`/products/${p.slug}/`)}
              >
                <img className="pcar__img" src={p.image} alt={p.name} loading="lazy" decoding="async" draggable="false" />
                <span className="pcar__shade" aria-hidden="true"></span>
                <div className="pcar__top">
                  <span className="pcar__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pcar__cat">{p.cat || 'Transformer'}</span>
                </div>
                <div className="pcar__panel">
                  <h3 className="pcar__title">{p.name}</h3>
                  <div className="pcar__more">
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
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="layout outer-swiper-wrap aos-init"
          data-unable="demo268-product1"
          data-aos="fadeInUp"
          data-aos-duration="1000"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="execute-swiper-slide swiper-backface-hidden"
            direction="horizontal"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            style={{
              userSelect: 'none',
              touchAction: 'pan-y'
            }}
          >
            <div
              ref={wrapperRef}
              className="swiper-wrapper product-items"
              blockitems="true"
              param_loops="1"
              onTransitionEnd={onTransitionEnd}
              style={{
                transform: `translate3d(-${currentIndex * (100 / slidesPerView)}%, 0, 0)`
              }}
            >
              {SLIDES.map((item, idx) => (
                <div
                  key={idx}
                  className="swiper-slide product-item"
                  blockitem="true"
                  param_loop="1"
                  style={{ width: `${slideWidthPercent}%` }}
                >
                  <a
                    href={item.href}
                    className="item-inner"
                    aria-label={item.title}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div className="item-img" itemScope itemType="http://schema.org/ImageObject">
                      <img
                        src={item.img}
                        alt={item.title}
                        blockimagetype="true"
                        loading="lazy"
                        width={item.width}
                        height={item.height}
                        style={{ aspectRatio: item.aspectRatio }}
                        itemProp="image"
                        draggable="false"
                      />
                    </div>
                    <div className="item-info">
                      <h3 className="item-title" blocktitle="true" param_title="1">
                        {item.title}
                      </h3>
                      <div className="item-box d-flex">
                        <div className="item-desc" blockdesc="1" param_desc="1">
                          {item.desc}
                        </div>
                        <div className="item-more" param_btn="1">
                          {item.more}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="swiper-control">
            <button
              type="button"
              className="swiper-button swiper-button-prev"
              aria-label="Previous slide"
              onClick={handlePrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <a href="/products/" aria-label="View all products" className="produ-more">
              view all products
            </a>

            <button
              type="button"
              className="swiper-button swiper-button-next"
              aria-label="Next slide"
              onClick={handleNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
=======
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

>>>>>>> origin/dev_shifat
    </>
  );
}
