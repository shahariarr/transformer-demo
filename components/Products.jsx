'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
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

function ProductCard({ item, onCardClick }) {
  return (
    <div className="product-item">
      <Link
        href={item.href}
        className="item-inner"
        aria-label={item.title}
        draggable={false}
        onClick={onCardClick}
      >
        <div className="item-img" itemScope itemType="http://schema.org/ImageObject">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            width={item.width}
            height={item.height}
            style={{ aspectRatio: item.aspectRatio }}
            itemProp="image"
            draggable="false"
          />
        </div>
        <div className="item-info">
          <h3 className="item-title">
            {item.title}
          </h3>
          <div className="item-box d-flex">
            <div className="item-desc">
              {item.desc}
            </div>
            <div className="item-more">
              {item.more}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ProductsRow({ rowRef, hidden, onCardClick }) {
  return (
    <div
      className="products-marquee-row"
      ref={rowRef}
      {...(hidden ? { 'aria-hidden': 'true' } : {})}
    >
      {PRODUCTS.map((item, i) => (
        <ProductCard
          key={hidden ? `hidden-${item.href}-${i}` : `${item.href}-${i}`}
          item={item}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}

export default function Products({ viewAll = true, isGrid = false }) {
  const innerRef = useRef(null);
  const rowRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    targetX: 0,
    paused: false,
    rowWidth: 0,
    step: 350,
    touchStartX: 0,
    startX: 0,
    isDragging: false,
    didDrag: false,
  });

  // Calculate row width & step dynamically on mount/resize
  useEffect(() => {
    if (isGrid) return;
    const updateDimensions = () => {
      const row = rowRef.current;
      if (!row) return;
      stateRef.current.rowWidth = row.offsetWidth;
      const firstCard = row.querySelector('.product-item');
      if (firstCard) {
        const gap = parseFloat(getComputedStyle(row).gap) || 24;
        stateRef.current.step = firstCard.offsetWidth + gap;
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isGrid]);

  // Infinite auto-sliding marquee loop (identical to Certificate section)
  useEffect(() => {
    if (isGrid) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inner = innerRef.current;
    if (!inner) return;

    let raf;
    const speed = 0.65; // Smooth 60fps marquee velocity

    const tick = () => {
      const s = stateRef.current;
      const rowW = s.rowWidth || (rowRef.current ? rowRef.current.offsetWidth : 0);

      if (rowW > 0) {
        if (Math.abs(s.targetX - s.x) > 0.4) {
          s.x += (s.targetX - s.x) * 0.14;
        } else {
          s.x = s.targetX;
          if (!s.paused && !s.isDragging) {
            s.x -= speed;
            s.targetX -= speed;
          }
        }

        while (s.x <= -rowW) {
          s.x += rowW;
          s.targetX += rowW;
        }
        while (s.x > 0) {
          s.x -= rowW;
          s.targetX -= rowW;
        }

        inner.style.transform = `translate3d(${s.x}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onEnter = () => { stateRef.current.paused = true; };
    const onLeave = () => { stateRef.current.paused = false; };

    inner.addEventListener('mouseenter', onEnter);
    inner.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      inner.removeEventListener('mouseenter', onEnter);
      inner.removeEventListener('mouseleave', onLeave);
    };
  }, [isGrid]);

  const next = () => {
    const s = stateRef.current;
    const step = s.step || 350;
    s.targetX -= step;
  };

  const prev = () => {
    const s = stateRef.current;
    const step = s.step || 350;
    s.targetX += step;
  };

  const handlePointerDown = e => {
    if (e.button !== undefined && e.button !== 0) return;
    const s = stateRef.current;
    s.isDragging = true;
    s.paused = true;
    s.didDrag = false;
    s.touchStartX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    s.startX = s.x;
  };

  const handlePointerMove = e => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const diff = clientX - s.touchStartX;
    if (Math.abs(diff) > 8) {
      s.didDrag = true;
    }
    const rowW = s.rowWidth || (rowRef.current ? rowRef.current.offsetWidth : 0);
    s.targetX = s.startX + diff;
    s.x = s.targetX;
    if (rowW > 0) {
      while (s.x <= -rowW) { s.x += rowW; s.startX += rowW; s.targetX += rowW; }
      while (s.x > 0) { s.x -= rowW; s.startX -= rowW; s.targetX -= rowW; }
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate3d(${s.x}px, 0, 0)`;
    }
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    s.isDragging = false;
    s.paused = false;
    setTimeout(() => {
      s.didDrag = false;
    }, 100);
  };

  const handleCardClick = e => {
    if (stateRef.current.didDrag) {
      e.preventDefault();
      e.stopPropagation();
    }
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
            {viewAll ? <ViewAll href="/products/">View all products</ViewAll> : null}
            <button
              type="button"
              className="proj-arrow-btn"
              id="proj-product-prev"
              aria-label="Previous products"
              title="Previous"
              onClick={prev}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="proj-arrow-btn"
              id="proj-product-next"
              aria-label="Next products"
              title="Next"
              onClick={next}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isGrid ? (
        <div className="wrap proj-grid-wrap" data-animate="slideInUp">
          <div className="pgrid">
            {PRODUCTS.map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="products-marquee-slider"
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onTouchCancel={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
        >
          <div className="products-marquee-inner" ref={innerRef}>
            <ProductsRow rowRef={rowRef} onCardClick={handleCardClick} />
            <ProductsRow hidden onCardClick={handleCardClick} />
          </div>
        </div>
      )}
    </>
  );
}
