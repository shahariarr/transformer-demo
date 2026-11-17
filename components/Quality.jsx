'use client';

import { useRef, useEffect } from 'react';
import { WHY_BPEL_CARDS, QA_CERTS } from '@/lib/quality';
import { useUI } from './UIProvider';
import RawSvg from './RawSvg';
import ViewAll from './ViewAll';

/* Certificate Card Frame */
function CertCard({ cert, index, onOpen }) {
  return (
    <article
      className="qa-cert-frame"
      data-cert={index}
      role="button"
      tabIndex={0}
      aria-label={`View official ${cert.title}`}
      title={`Click to inspect: ${cert.title}`}
      onClick={() => onOpen(index)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(index);
        }
      }}
    >
      <div className="qa-frame-mat">
        <img src={cert.src} alt={cert.alt} loading="lazy" decoding="async" />
      </div>
      <div className="qa-frame-info">
        <span className="qa-frame-badge">{cert.badge}</span>
        <h4 className="qa-frame-title">{cert.title}</h4>
      </div>
    </article>
  );
}

/* Infinite Marquee Row (rendered twice for seamless looping, identical to Partners) */
function CertsRow({ rowRef, hidden, onOpen }) {
  return (
    <div
      className="qa-certs-row"
      ref={rowRef}
      {...(hidden ? { 'aria-hidden': 'true' } : {})}
    >
      {QA_CERTS.map((c, i) => (
        <CertCard
          key={hidden ? `hidden-${c.certNo}-${i}` : `${c.certNo}-${i}`}
          cert={c}
          index={i}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

export default function Quality({ showWhy = true, showCerts = true, viewAll = true }) {
  const { openCert, dialog } = useUI();
  const innerRef = useRef(null);
  const rowRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    targetX: 0,
    paused: false,
    rowWidth: 0,
    step: 244,
    touchStartX: 0,
    startX: 0,
    isDragging: false,
    isCertOpen: false,
  });

  // Pause carousel auto-rotation when certificate modal dialog is open
  useEffect(() => {
    const isModalOpen = Boolean(dialog && dialog.isCert);
    stateRef.current.isCertOpen = isModalOpen;
    if (isModalOpen) {
      stateRef.current.paused = true;
    } else {
      stateRef.current.paused = false;
    }
  }, [dialog]);

  const handleOpenCert = (index) => {
    stateRef.current.isCertOpen = true;
    stateRef.current.paused = true;
    openCert(index);
  };

  // Calculate row width & step dynamically on mount/resize
  useEffect(() => {
    if (!showCerts) return;
    const updateDimensions = () => {
      const row = rowRef.current;
      if (!row) return;
      stateRef.current.rowWidth = row.offsetWidth;
      const firstCard = row.querySelector('.qa-cert-frame');
      if (firstCard) {
        const gap = parseFloat(getComputedStyle(row).gap) || 20;
        stateRef.current.step = firstCard.offsetWidth + gap;
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [showCerts]);

  // Infinite auto-sliding marquee loop (identical to Our Partners section)
  useEffect(() => {
    if (!showCerts) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const inner = innerRef.current;
    if (!inner) return;

    let raf;
    const speed = 0.6; // Smooth 60fps marquee velocity

    const tick = () => {
      const s = stateRef.current;
      const rowW = s.rowWidth || (rowRef.current ? rowRef.current.offsetWidth : 0);

      if (rowW > 0) {
        if (Math.abs(s.targetX - s.x) > 0.4) {
          s.x += (s.targetX - s.x) * 0.14;
        } else {
          s.x = s.targetX;
          if (!s.paused && !s.isDragging && !s.isCertOpen) {
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
    const onLeave = () => {
      if (!stateRef.current.isCertOpen) {
        stateRef.current.paused = false;
      }
    };

    inner.addEventListener('mouseenter', onEnter);
    inner.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      inner.removeEventListener('mouseenter', onEnter);
      inner.removeEventListener('mouseleave', onLeave);
    };
  }, [showCerts]);

  const next = () => {
    const s = stateRef.current;
    const step = s.step || 244;
    s.targetX -= step;
  };

  const prev = () => {
    const s = stateRef.current;
    const step = s.step || 244;
    s.targetX += step;
  };

  const onTouchStart = e => {
    const s = stateRef.current;
    s.isDragging = true;
    s.paused = true;
    s.touchStartX = e.touches[0].clientX;
    s.startX = s.x;
  };

  const onTouchMove = e => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    const diff = e.touches[0].clientX - s.touchStartX;
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

  const onTouchEnd = () => {
    const s = stateRef.current;
    s.isDragging = false;
    s.paused = false;
  };

  return (
    <div className="wrap">
      {/* Top Section: Why Work With BPEL (image collage left, reasons right) */}
      {showWhy ? <div className="why-bpel">
        <div className="why-bpel__gallery" data-animate="slideInLeft" aria-hidden="true">
          <span className="why-bpel__deco"></span>
          <span className="why-bpel__dots"></span>
          <figure className="why-bpel__img why-bpel__img--main">
            <img src="/assets/images/lifecycle/04-manufacturing-fat.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="why-bpel__img why-bpel__img--top">
            <img src="/assets/images/lifecycle/02-engineering-design.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="why-bpel__img why-bpel__img--bottom">
            <img src="/assets/images/lifecycle/06-testing-commissioning.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <div className="why-bpel__seal">
            <svg viewBox="0 0 120 120" className="why-bpel__seal-ring">
              <defs><path id="seal-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
              <text><textPath href="#seal-path" textLength="286" lengthAdjust="spacing">DESIGN · BUILD · TEST · ONE TEAM · </textPath></text>
            </svg>
            <span className="why-bpel__seal-core"><small>Since</small><strong>1985</strong></span>
          </div>
        </div>

        <div className="why-bpel__content">
          <div className="why-bpel__intro" data-animate="slideInRight">
            <p className="label">WHY WORK WITH BPEL</p>
            <h2 className="why-bpel__title">Built in-house. Backed by engineers.</h2>
            <p className="why-bpel__lead">From raw material to final test, every transformer is designed, built and supported by one accountable team — so you get consistent quality, predictable delivery and support for the life of the equipment.</p>
          </div>

          <div className="why-bpel__grid">
            {WHY_BPEL_CARDS.map((card, i) => (
              <article className="why-bpel__card" data-animate="slideInUp" data-delay={i * 90} key={card.title}>
                <span className="why-bpel__num" aria-hidden="true">{`0${i + 1}`}</span>
                <span className="why-bpel__icon-box" aria-hidden="true"><RawSvg markup={card.icon} /></span>
                <div>
                  <h3 className="why-bpel__card-title">{card.title.replace(/<br>/g, ' ')}</h3>
                  <p className="why-bpel__card-text">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <a href="/contact/" className="why-bpel__btn" data-animate="slideInUp">
            <span>Talk to an engineer</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div> : null}

      {/* Bottom Section: Framed Certificates Gallery with Auto-Sliding Marquee */}
      {showCerts ? <div className="qa-certs-wrap" data-animate="slideInUp">
        <div className="qa-certs-header">
          <div className="qa-certs-titles">
            <h3>Certificates & Test Reports</h3>
            <p>Official international accreditations and laboratory test reports (Click any certificate to inspect).</p>
          </div>
          <div className="qa-certs-nav">
            {viewAll ? <ViewAll href="/certifications/">View all</ViewAll> : null}
            <button type="button" className="qa-arrow-btn" id="qa-cert-prev" aria-label="Previous certificates" title="Previous" onClick={prev}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="qa-arrow-btn" id="qa-cert-next" aria-label="Next certificates" title="Next" onClick={next}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="qa-certs-slider"
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             onTouchCancel={onTouchEnd}>
          <div className="qa-certs-inner" ref={innerRef}>
            <CertsRow rowRef={rowRef} onOpen={handleOpenCert} />
            <CertsRow hidden onOpen={handleOpenCert} />
          </div>
        </div>
      </div> : null}
    </div>
  );
}
