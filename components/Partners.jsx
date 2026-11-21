'use client';

import { useEffect, useRef, useMemo } from 'react';
import { PARTNERS } from '@/lib/partners';
import RawSvg from './RawSvg';
import SectionHead from './SectionHead';

/* Technical metadata and origin for each partner/certification body */
const PARTNER_METADATA = {
  'UL': { tag: 'Global Safety & Quality Certification', origin: 'USA' },
  'IAF': { tag: 'International Accreditation Forum', origin: 'Global' },
  'ILAC MRA': { tag: 'Mutual Recognition Arrangement', origin: 'Global' },
  'CCC': { tag: 'China Compulsory Product Certification', origin: 'China' },
  'MA': { tag: 'Mining Safety & Conformity Approval', origin: 'China' },
  'CNAS': { tag: 'National Conformity Assessment Body', origin: 'China' },
  'CHINT': { tag: 'Medium & Low Voltage Switchgear Systems', origin: 'China' },
  'ABB': { tag: 'Vacuum Circuit Breakers & SCADA Relays', origin: 'Switzerland' },
  'Schneider Electric': { tag: 'MV Modular Switchboards & Telemetry', origin: 'France' },
  'Siemens': { tag: 'Gas-Insulated Switchgear & Grid Automation', origin: 'Germany' },
  'ISO': { tag: 'ISO 9001 / ISO 14001 Quality Standards', origin: 'International' },
  'State Grid China': { tag: 'Bulk Power Transmission Alignment', origin: 'China' },
  'China Southern Power Grid': { tag: 'Regional Extra-High Voltage Grid', origin: 'China' },
  'ASTA (Intertek)': { tag: 'Short-Circuit & Type Test Witnessing', origin: 'United Kingdom' },
  'CESI / KEMA': { tag: 'STL Accredited High-Power Testing', origin: 'Italy / Netherlands' },
  'ETS Dubai': { tag: 'Middle East Distribution Partner (Est. 1987)', origin: 'UAE' },
};

const REPETITIONS = 3;

export default function Partners() {
  const stageRef = useRef(null);
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const cardElsRef = useRef([]);

  // Flattened 3 sets of partners for seamless infinite looping
  const ALL_ITEMS = useMemo(() => {
    const list = [];
    for (let r = 0; r < REPETITIONS; r++) {
      for (let i = 0; i < PARTNERS.length; i++) {
        list.push({ ...PARTNERS[i], setIndex: r, originalIndex: i });
      }
    }
    return list;
  }, []);

  const isHoveredRef = useRef(false);
  const currentXRef = useRef(0);
  const targetXRef = useRef(null);
  const activeIdxRef = useRef(-1);
  const cardCentersRef = useRef([]);
  const setWidthRef = useRef(0);
  const lastActiveNameRef = useRef('');

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const cardEls = cardElsRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Measure positions of each card inside inner
    const measureCards = () => {
      const centers = [];
      for (let i = 0; i < cardEls.length; i++) {
        const el = cardEls[i];
        if (el) {
          centers.push(el.offsetLeft + el.offsetWidth / 2);
        }
      }
      cardCentersRef.current = centers;

      // Pitch of 1 full set of 16 partners
      if (centers[PARTNERS.length] !== undefined && centers[0] !== undefined) {
        setWidthRef.current = centers[PARTNERS.length] - centers[0];
      }
    };

    measureCards();

    // Set initial position: center Siemens in middle set (set 1, index 16 + 9 = 25)
    const initialIndex = PARTNERS.length + 9;
    const initialCenter = cardCentersRef.current[initialIndex];
    if (initialCenter !== undefined && setWidthRef.current > 0) {
      currentXRef.current = (wrap.offsetWidth / 2) - initialCenter;
      inner.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    }

    const onResize = () => {
      measureCards();
    };
    window.addEventListener('resize', onResize);

    if (reducedMotion) return () => window.removeEventListener('resize', onResize);

    let raf;
    const speed = 0.55;

    const tick = () => {
      const setWidth = setWidthRef.current;
      const wrapWidth = wrap.offsetWidth;
      const centerX = wrapWidth / 2;
      const centers = cardCentersRef.current;

      // Handle smooth interpolation if navigating to target
      if (targetXRef.current !== null) {
        const diff = targetXRef.current - currentXRef.current;
        if (Math.abs(diff) < 0.6) {
          currentXRef.current = targetXRef.current;
          targetXRef.current = null;
        } else {
          currentXRef.current += diff * 0.12;
        }
      } else if (!isHoveredRef.current) {
        currentXRef.current -= speed;
      }

      // Infinite wrapping across sets
      if (setWidth > 0) {
        while (currentXRef.current <= -2 * setWidth) {
          currentXRef.current += setWidth;
          if (targetXRef.current !== null) targetXRef.current += setWidth;
        }
        while (currentXRef.current >= 0) {
          currentXRef.current -= setWidth;
          if (targetXRef.current !== null) targetXRef.current -= setWidth;
        }
      }

      inner.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;

      // Identify closest card to horizontal center of wrap
      if (centers.length > 0) {
        let minDist = Infinity;
        let closestIdx = -1;

        for (let i = 0; i < centers.length; i++) {
          const screenPos = centers[i] + currentXRef.current;
          const dist = Math.abs(screenPos - centerX);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        }

        if (closestIdx !== -1 && closestIdx !== activeIdxRef.current) {
          const prevIdx = activeIdxRef.current;
          if (prevIdx !== -1 && cardEls[prevIdx]) {
            cardEls[prevIdx].classList.remove('is-center');
          }
          if (cardEls[closestIdx]) {
            cardEls[closestIdx].classList.add('is-center');
          }
          activeIdxRef.current = closestIdx;

          const item = ALL_ITEMS[closestIdx];
          if (item && item.name !== lastActiveNameRef.current) {
            lastActiveNameRef.current = item.name;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [ALL_ITEMS]);

  // Center clicked partner card smoothly
  const handleCardClick = (idx) => {
    const centers = cardCentersRef.current;
    if (!centers[idx] || !wrapRef.current) return;
    const centerX = wrapRef.current.offsetWidth / 2;
    targetXRef.current = centerX - centers[idx];
  };

  const onMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const onMouseLeave = () => {
    isHoveredRef.current = false;
  };

  // Pointer drag support for touch or mouse drag
  const dragRef = useRef({ isDragging: false, startX: 0, dragStartX: 0 });

  const onPointerDown = (e) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      dragStartX: currentXRef.current,
    };
    targetXRef.current = null;
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    currentXRef.current = dragRef.current.dragStartX + dx;
  };

  const onPointerUp = () => {
    dragRef.current = false;
  };

  return (
    <div className="partners-section">
      <div className="wrap">
        <SectionHead
          label="OUR PARTNERS"
          title={<>Trusted by <span className="text-accent">Industry Leaders</span></>}
          desc="We collaborate with world-class manufacturers and certification bodies to deliver reliable power solutions."
        />
      </div>

      <div
        className="partners-stage"
        ref={stageRef}
        aria-label="Interactive Partner Showcase"
      >
        {/* Marquee Track */}
        <div
          className="partners-wrap"
          ref={wrapRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="partners-inner" ref={innerRef}>
            <div className="partners-row">
              {ALL_ITEMS.map((p, idx) => {
                const meta = PARTNER_METADATA[p.name] || { tag: 'Strategic Partner', origin: 'Global' };
                return (
                  <div
                    key={`${idx}-${p.name}`}
                    ref={(el) => { cardElsRef.current[idx] = el; }}
                    className="partner-logo"
                    style={{
                      '--brand': p.color,
                    }}
                    title={`${p.name} (${meta.origin}) - ${meta.tag}`}
                    onClick={() => handleCardClick(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(idx);
                      }
                    }}
                    aria-label={`Partner ${p.name}`}
                  >
                    <div className="partner-logo__svg-wrap">
                      <RawSvg markup={p.svg} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
