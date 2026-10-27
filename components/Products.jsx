'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

const PRODUCTS = [
  {
    title: 'Single Phase Overhead Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/products/single-phase-overhead-transformer-product/',
    img: '/assets/images/best-selling/single-phase-overhead-transformer.png',
    width: 644,
    height: 500,
    aspectRatio: '644 / 500'
  },
  {
    title: '6-10kv Series Oil Immersed Distribution Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/products/6-10kv-series-oil-immersed-distribution-transformer-product/',
    img: '/assets/images/best-selling/scb-series-dry-type-transformer.png',
    width: 724,
    height: 562,
    aspectRatio: '724 / 562'
  },
  {
    title: '6~10kV SCB Series Dry-Type Transformer',
    desc: 'Transformer',
    more: 'LEARN MORE',
    href: '/products/6-10kv-scb-series-dry-type-transformer-product/',
    img: '/assets/images/best-selling/aa-removebg-preview.png',
    width: 500,
    height: 500,
    aspectRatio: '1 / 1'
  },
  {
    title: 'AYB Box-Type Substation (10kV Euro-Variable)',
    desc: 'Transformer Substation',
    more: 'LEARN MORE',
    href: '/products/ayb-box-type-substation-10kv-euro-variable-product/',
    img: '/assets/images/best-selling/1-transformer-substation.png',
    width: 600,
    height: 467,
    aspectRatio: '600 / 467'
  },
  {
    title: 'AGCK Type Low Voltage Switchgear',
    desc: 'Low Voltage Switchgear',
    more: 'LEARN MORE',
    href: '/products/agck-type-low-voltage-withdrawable-switchgear-product/',
    img: '/assets/images/best-selling/4-low-voltage-switchgear.png',
    width: 600,
    height: 466,
    aspectRatio: '600 / 466'
  },
  {
    title: 'ZN63(VS1)-12 Vacuum Circuit Breaker',
    desc: 'Vacuum Circuit Breaker',
    more: 'LEARN MORE',
    href: '/products/zn63-vs1-12-vacuum-circuit-breaker-product/',
    img: '/assets/images/best-selling/aaa-removebg-preview.png',
    width: 500,
    height: 500,
    aspectRatio: '1 / 1'
  },
  {
    title: 'FKN12-12(R) Air High Voltage Load Break Switch',
    desc: 'Load Switch',
    more: 'LEARN MORE',
    href: '/products/fkn12-12-r-air-high-voltage-load-break-switch-with-fuse-product/',
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
  const hasCapturedRef = useRef(false);
  const dragStartYRef = useRef(0);

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
    dragStartYRef.current = e.clientY;
    dragStartTimeRef.current = performance.now();
    dragDeltaRef.current = 0;
    didDragRef.current = false;
    hasCapturedRef.current = false;
    setIsPaused(true);

    if (wrapperRef.current) {
      // Capture live computed position so swiping mid-motion never jumps
      const style = window.getComputedStyle(wrapperRef.current);
      const matrix = new DOMMatrixReadOnly(style.transform);
      currentPixelOffsetRef.current = matrix.m41;
      wrapperRef.current.style.transition = 'none';
      wrapperRef.current.style.transform = `translate3d(${matrix.m41}px, 0, 0)`;
    }
  };

  const onPointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const deltaY = e.clientY - dragStartYRef.current;
    dragDeltaRef.current = deltaX;

    // Only engage drag if horizontal movement exceeds 10px (prevents locking normal clicks)
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didDragRef.current = true;
      if (!hasCapturedRef.current) {
        hasCapturedRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) {}
        if (trackRef.current) {
          trackRef.current.dataset.dragging = 'true';
        }
      }
    }

    if (!didDragRef.current) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      if (!wrapperRef.current || !isDraggingRef.current) return;
      const currentPx = currentPixelOffsetRef.current + deltaX;
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
      if (didDragRef.current) {
        trackRef.current.dataset.animating = 'true';
      }
    }

    try {
      if (hasCapturedRef.current && e?.pointerId && e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    hasCapturedRef.current = false;

    setIsPaused(false);

    // If it was just a click without dragging, do nothing and let standard click navigate
    if (!didDragRef.current) {
      dragDeltaRef.current = 0;
      return;
    }

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
      setTimeout(() => {
        didDragRef.current = false;
      }, 50);
    }
  };

  const slideWidthPercent = 100 / slidesPerView;

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
            <span className="proj-counter">{productCountLabel(PRODUCTS.length)}</span>
            {viewAll ? <ViewAll href="/products/">View all products</ViewAll> : null}
          </div>
        </div>
      </div>

      {isGrid ? (
        <div className="wrap proj-grid-wrap" data-animate="slideInUp">
          <div className="proj-grid">
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
                  <Link
                    href={item.href}
                    className="item-inner"
                    aria-label={item.title}
                    draggable={false}
                    onClick={(e) => {
                      if (didDragRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
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
                  </Link>
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
    </>
  );
}
