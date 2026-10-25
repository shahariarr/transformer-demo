'use client';

/* From Concept to Commissioning: stages as nodes on an energised power line + detail card */
import { useCallback, useEffect, useRef, useState } from 'react';
import { DATA } from '@/lib/data';
import { STAGE_ICONS, LCV_W, LCV_H, lcvPoints, lcvSegments } from '@/lib/lifecycle';
import RawSvg from './RawSvg';
import SectionHead from './SectionHead';

const L = DATA.lifecycle;
const pad = n => String(n).padStart(2, '0');
const PTS = lcvPoints(L.length);
const SEGS = lcvSegments(PTS);
const PATH = `M ${PTS[0][0]} ${PTS[0][1]} ` + SEGS.join(' ');
const RC = 2 * Math.PI * 52;

const Arrow = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);

export default function Lifecycle() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const liveRef = useRef(null);
  const ringRef = useRef(null);
  const spark1Ref = useRef(null);
  const spark2Ref = useRef(null);
  const progressRef = useRef(null);
  const scrollRef = useRef(null);
  const detailRef = useRef(null);
  const circuitRef = useRef(null);
  const nodeRefs = useRef([]);

  const currentRef = useRef(0);
  const isPlayingRef = useRef(true);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const reduceRef = useRef(false);
  const resumeAfterRef = useRef(0);
  const stageStartRef = useRef(0);

  const geo = useRef({ upTo: [], total: 0 });
  const STAGE_DURATION = 2600; // 2.6s per energisation stage for calm, readable pacing
  currentRef.current = current;
  isPlayingRef.current = isPlaying;

  const togglePlay = () => {
    setIsPlaying(p => {
      const next = !p;
      isPlayingRef.current = next;
      if (next) {
        stageStartRef.current = performance.now();
      }
      return next;
    });
  };

  const pick = k => {
    const idx = (k + L.length) % L.length;
    setCurrent(idx);
    stageStartRef.current = performance.now();
    // After 5s of user interaction, resume automatic movement
    resumeAfterRef.current = performance.now() + 5000;
    return idx;
  };

  // Measure path length up to each node
  useEffect(() => {
    reduceRef.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const live = liveRef.current;
    if (!live) return;

    const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    live.parentNode.appendChild(probe);
    geo.current.upTo = PTS.map((p, i) => {
      if (!i) return 14; // Small starting bead on node 0
      probe.setAttribute('d', `M ${PTS[0][0]} ${PTS[0][1]} ` + SEGS.slice(0, i).join(' '));
      return probe.getTotalLength();
    });
    probe.remove();

    const total = (geo.current.total = live.getTotalLength());
    live.style.strokeDasharray = `${total} ${total}`;
    live.style.strokeDashoffset = total - geo.current.upTo[currentRef.current];

    if (ringRef.current) {
      ringRef.current.style.strokeDasharray = RC;
      ringRef.current.style.strokeDashoffset = RC * (1 - (currentRef.current + 1) / L.length);
    }

    // Preload stage images
    L.forEach(x => {
      const img = new Image();
      img.src = x.image;
    });

    stageStartRef.current = performance.now();

    // Unified animation frame for sparks + automatic stage advancement
    let raf;
    const loop = now => {
      const cur = currentRef.current;
      const len = (geo.current.upTo && geo.current.upTo[cur]) || 0;
      const reduce = reduceRef.current;
      const isAuto = isPlayingRef.current && !hoveredRef.current && visibleRef.current && !reduce;

      // Check if user interaction pause expired
      const userDelayPassed = now >= resumeAfterRef.current;

      // Handle automatic stage advancing
      if (isAuto && userDelayPassed) {
        const elapsed = now - stageStartRef.current;
        const pct = Math.min(1, Math.max(0, elapsed / STAGE_DURATION));

        if (progressRef.current) {
          progressRef.current.style.width = `${(pct * 100).toFixed(1)}%`;
        }

        if (elapsed >= STAGE_DURATION) {
          stageStartRef.current = now;
          setCurrent(c => (c + 1) % L.length);
        }
      } else if (!userDelayPassed && progressRef.current) {
        // Paused on user click
        progressRef.current.style.width = '100%';
      }

      // Handle electric spark particles coursing down the energised line
      if (!reduce && visibleRef.current && live) {
        const spark1 = spark1Ref.current;
        const spark2 = spark2Ref.current;

        if (len > 14) {
          // Spark 1 (lead pulse)
          const t1 = ((now - stageStartRef.current) % 1800) / 1800;
          const e1 = 1 - Math.pow(1 - t1, 2.5);
          const p1 = live.getPointAtLength(len * e1);
          if (spark1) {
            spark1.style.left = `${(p1.x / LCV_W * 100).toFixed(3)}%`;
            spark1.style.top = `${(p1.y / LCV_H * 100).toFixed(3)}%`;
            spark1.style.opacity = t1 > 0.85 ? String((1 - t1) / 0.15) : '1';
          }

          // Spark 2 (secondary pulse offset by 900ms)
          const t2 = ((now - stageStartRef.current + 900) % 1800) / 1800;
          const e2 = 1 - Math.pow(1 - t2, 2.5);
          const p2 = live.getPointAtLength(len * e2);
          if (spark2) {
            spark2.style.left = `${(p2.x / LCV_W * 100).toFixed(3)}%`;
            spark2.style.top = `${(p2.y / LCV_H * 100).toFixed(3)}%`;
            spark2.style.opacity = t2 > 0.85 ? String((1 - t2) / 0.15) : '0.85';
          }
        } else {
          // Node 0 idle electric halo
          const p0 = PTS[0];
          const pulse = (Math.sin(now / 180) + 1) / 2;
          if (spark1) {
            spark1.style.left = `${(p0[0] / LCV_W * 100).toFixed(3)}%`;
            spark1.style.top = `${(p0[1] / LCV_H * 100).toFixed(3)}%`;
            spark1.style.opacity = String(0.4 + pulse * 0.6);
          }
          if (spark2) {
            spark2.style.opacity = '0';
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // Pause only when completely out of viewport
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        if (e.isIntersecting) {
          stageStartRef.current = performance.now();
        }
      },
      { threshold: 0.05 }
    );

    if (circuitRef.current) {
      io.observe(circuitRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // Update SVG stroke and ring on stage change
  useEffect(() => {
    const { upTo, total } = geo.current;
    if (total && liveRef.current) {
      liveRef.current.style.strokeDashoffset = total - upTo[current];
    }
    if (ringRef.current) {
      ringRef.current.style.strokeDashoffset = RC * (1 - (current + 1) / L.length);
    }
    stageStartRef.current = performance.now();

    const detail = detailRef.current;
    if (detail) {
      detail.classList.remove('is-in');
      void detail.offsetWidth;
      detail.classList.add('is-in');
    }

    // Centering on horizontal scroll on smaller viewports
    const scroller = scrollRef.current;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      const n = nodeRefs.current[current];
      if (n) {
        scroller.scrollTo({
          left: n.offsetLeft - scroller.clientWidth / 2,
          behavior: reduceRef.current ? 'auto' : 'smooth'
        });
      }
    }
  }, [current]);

  const hoverProps = {
    onMouseEnter: () => {
      hoveredRef.current = true;
    },
    onMouseLeave: () => {
      hoveredRef.current = false;
      stageStartRef.current = performance.now();
    }
  };

  const s = L[current];

  return (
    <div className="wrap">
      <div className="lc-head">
        <SectionHead
          label="FROM CONCEPT TO COMMISSIONING"
          title="The Complete Project Lifecycle"
          desc="A coordinated 7-stage turnkey methodology — from first requirement to grid energisation and lifecycle care."
        />
      </div>

      <div className="lcv-circuit fade-in-up" ref={circuitRef} {...hoverProps}>
        {/* Animated Energisation Progress Bar */}
        <div className="lcv-progress-track" aria-hidden="true">
          <div className="lcv-progress-fill" ref={progressRef}></div>
        </div>

        <p className="lcv-circuit__tag">
          <span className="lcv-live-dot" aria-hidden="true"></span>
          <span>Energisation path</span>
          <span className="lcv-auto-badge">{isPlaying ? 'Auto-Moving' : 'Manual'}</span>
        </p>

        <div className="lcv-circuit__status-wrap">
          <button
            type="button"
            className="lcv-btn-toggle"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause energisation path auto-movement' : 'Resume energisation path auto-movement'}
          >
            {isPlaying ? (
              <>
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Auto-Play</span>
              </>
            )}
          </button>
          <p className="lcv-circuit__status" aria-live="polite">
            <span id="lcv-status">{pad(current + 1)}</span> / {pad(L.length)} energised
          </p>
        </div>

        <div className="lcv-scroll" id="lcv-scroll" ref={scrollRef}>
          <div className="lcv-canvas">
            <svg viewBox={`0 0 ${LCV_W} ${LCV_H}`} aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="lcv-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#5FB0FF">
                    <animate attributeName="stop-color" values="#5FB0FF;#FFFFFF;#5FB0FF" dur="2.4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="0.5" stopColor="#9AD0FF">
                    <animate attributeName="stop-color" values="#9AD0FF;#38BDF8;#9AD0FF" dur="2.4s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="1" stopColor="#FFFFFF">
                    <animate attributeName="stop-color" values="#FFFFFF;#9AD0FF;#FFFFFF" dur="2.4s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
              </defs>
              <path className="lcv-base" d={PATH} />
              <path className="lcv-live" id="lcv-live" d={PATH} ref={liveRef} />
            </svg>

            {/* Continuous dual electrical sparks coursing through the circuit */}
            <span className="lcv-spark" id="lcv-spark-1" aria-hidden="true" ref={spark1Ref}></span>
            <span className="lcv-spark lcv-spark--2" id="lcv-spark-2" aria-hidden="true" ref={spark2Ref}></span>

            {L.map((stage, i) => (
              <button
                type="button"
                key={stage.id}
                ref={el => {
                  nodeRefs.current[i] = el;
                }}
                className={`lcv-node ${i % 2 ? 'is-up' : 'is-down'}${i === current ? ' is-active' : ''}${i < current ? ' is-done' : ''}`}
                data-lcv={i}
                style={{
                  left: `${(PTS[i][0] / LCV_W * 100).toFixed(3)}%`,
                  top: `${(PTS[i][1] / LCV_H * 100).toFixed(3)}%`
                }}
                aria-pressed={i === current}
                aria-label={`${stage.phase}: ${stage.title}`}
                onClick={() => pick(i)}
                onKeyDown={e => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const idx = pick(current + (e.key === 'ArrowRight' ? 1 : -1));
                    nodeRefs.current[idx].focus();
                  }
                }}
              >
                <span className="lcv-node__dot">
                  <RawSvg markup={STAGE_ICONS[i] || STAGE_ICONS[0]} />
                </span>
                <span className="lcv-node__label">
                  <b>{pad(i + 1)}</b>
                  {stage.chipText}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <article className="lcv-detail" id="lcv-detail" aria-live="polite" ref={detailRef} {...hoverProps}>
        <figure className="lcv-detail__media">
          <img id="lcv-img" src={s.image} alt={s.title} decoding="async" />
          <span className="lcv-detail__no" id="lcv-no" aria-hidden="true">
            {pad(current + 1)}
          </span>
        </figure>
        <div className="lcv-detail__body">
          <div className="lcv-detail__chips">
            <span className="lcv-chip lcv-chip--phase" id="lcv-phase">
              {s.phase}
            </span>
            <span className="lcv-chip" id="lcv-time">
              {s.duration}
            </span>
          </div>
          <h3 id="lcv-title">{s.title}</h3>
          <p className="lcv-detail__tag" id="lcv-tag">
            {s.tagline || ''}
          </p>
          <p className="lcv-detail__summary" id="lcv-summary">
            {s.summary}
          </p>
          <ul className="lcv-detail__points" id="lcv-points">
            {s.points.map(p => (
              <li key={p}>
                <Check />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="lcv-detail__side">
          <div className="lcv-ring" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="lcv-ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5FB0FF" />
                  <stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="52" className="lcv-ring__track" />
              <circle cx="60" cy="60" r="52" className="lcv-ring__bar" id="lcv-ring" ref={ringRef} />
            </svg>
            <span>
              <b id="lcv-ring-num">{pad(current + 1)}</b>
              <small>of {pad(L.length)}</small>
            </span>
          </div>
          <div className="lcv-milestone">
            <small>Milestone</small>
            <strong id="lcv-milestone">{s.milestone}</strong>
          </div>
          <div className="lcv-nav">
            <button type="button" data-lcv-step="-1" aria-label="Previous stage" onClick={() => pick(current - 1)}>
              <Arrow d="M15 18l-6-6 6-6" />
            </button>
            <button type="button" data-lcv-step="1" aria-label="Next stage" onClick={() => pick(current + 1)}>
              <Arrow d="M9 18l6-6-6-6" />
            </button>
          </div>
        </aside>
      </article>

      <div className="lcx-cta fade-in-up" data-delay="100">
        <span className="lcx-cta__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <p>
          <strong>Single-point EPC accountability</strong> — one team from factory to field, under ISO 9001 quality supervision.
        </p>
        <a href="/contact/" className="lcx-cta__btn">
          Request Technical Proposal
        </a>
      </div>
    </div>
  );
}
