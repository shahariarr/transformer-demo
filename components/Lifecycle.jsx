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
  const liveRef = useRef(null);
  const ringRef = useRef(null);
  const sparkRef = useRef(null);
  const scrollRef = useRef(null);
  const detailRef = useRef(null);
  const circuitRef = useRef(null);
  const nodeRefs = useRef([]);
  const geo = useRef({ upTo: [], total: 0 });
  const st = useRef({ current: 0, timer: null, userPicked: false, visible: false, hovered: false, t0: 0, reduce: false });

  const schedule = useCallback(() => {
    const s = st.current;
    clearInterval(s.timer);
    if (!s.userPicked && s.visible && !s.hovered && !s.reduce) {
      s.timer = setInterval(() => setCurrent(c => (c + 1) % L.length), 6000);
    }
  }, []);

  const pick = k => {
    st.current.userPicked = true;
    clearInterval(st.current.timer);
    const idx = (k + L.length) % L.length;
    setCurrent(idx);
    return idx;
  };

  // Measure the path length up to each node, so the energised stroke stops exactly on it
  useEffect(() => {
    const s = st.current;
    s.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const live = liveRef.current;
    const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    live.parentNode.appendChild(probe);
    geo.current.upTo = PTS.map((p, i) => {
      if (!i) return 0;
      probe.setAttribute('d', `M ${PTS[0][0]} ${PTS[0][1]} ` + SEGS.slice(0, i).join(' '));
      return probe.getTotalLength();
    });
    probe.remove();
    const total = geo.current.total = live.getTotalLength();
    live.style.strokeDasharray = `${total} ${total}`;
    live.style.strokeDashoffset = total - geo.current.upTo[s.current];
    ringRef.current.style.strokeDasharray = RC;
    L.forEach(x => { const i = new Image(); i.src = x.image; });

    // A spark of current runs along the energised part of the line
    let raf;
    s.t0 = performance.now();
    const spark = sparkRef.current;
    const runSpark = now => {
      const len = geo.current.upTo[s.current];
      if (!s.reduce && len > 0 && s.visible) {
        const t = ((now - s.t0) % 2200) / 2200;
        const e = 1 - Math.pow(1 - t, 3);
        const p = live.getPointAtLength(len * e);
        spark.style.left = (p.x / LCV_W * 100) + '%';
        spark.style.top = (p.y / LCV_H * 100) + '%';
        spark.style.opacity = t > .85 ? (1 - t) / .15 : 1;
      } else {
        spark.style.opacity = 0;
      }
      raf = requestAnimationFrame(runSpark);
    };
    raf = requestAnimationFrame(runSpark);

    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; schedule(); }, { threshold: .25 });
    io.observe(circuitRef.current);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      clearInterval(s.timer);
    };
  }, [schedule]);

  // Stage change: advance the energised line + ring, replay the card entrance, keep the node in view
  useEffect(() => {
    const s = st.current;
    s.current = current;
    const { upTo, total } = geo.current;
    if (total) liveRef.current.style.strokeDashoffset = total - upTo[current];
    ringRef.current.style.strokeDashoffset = RC * (1 - (current + 1) / L.length);
    s.t0 = performance.now();

    const detail = detailRef.current;
    detail.classList.remove('is-in'); void detail.offsetWidth; detail.classList.add('is-in');

    // On phones the circuit scrolls sideways: keep the active node centred
    const scroller = scrollRef.current;
    if (scroller.scrollWidth > scroller.clientWidth) {
      const n = nodeRefs.current[current];
      scroller.scrollTo({ left: n.offsetLeft - scroller.clientWidth / 2, behavior: s.reduce ? 'auto' : 'smooth' });
    }
  }, [current]);

  const hoverProps = {
    onMouseEnter: () => { st.current.hovered = true; clearInterval(st.current.timer); },
    onMouseLeave: () => { st.current.hovered = false; schedule(); }
  };

  const s = L[current];

  return (
    <div className="wrap">
      <div className="lc-head">
        <SectionHead label="FROM CONCEPT TO COMMISSIONING" title="The Complete Project Lifecycle"
          desc="A coordinated 7-stage turnkey methodology — from first requirement to grid energisation and lifecycle care." />
      </div>

      <div className="lcv-circuit fade-in-up" ref={circuitRef} {...hoverProps}>
        <p className="lcv-circuit__tag"><span className="lcv-live-dot" aria-hidden="true"></span>Energisation path</p>
        <p className="lcv-circuit__status" aria-live="polite"><span id="lcv-status">{pad(current + 1)}</span> / {pad(L.length)} energised</p>
        <div className="lcv-scroll" id="lcv-scroll" ref={scrollRef}>
          <div className="lcv-canvas">
            <svg viewBox={`0 0 ${LCV_W} ${LCV_H}`} aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="lcv-grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#5FB0FF" /><stop offset=".6" stopColor="#9AD0FF" /><stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <path className="lcv-base" d={PATH} />
              <path className="lcv-live" id="lcv-live" d={PATH} ref={liveRef} />
            </svg>
            <span className="lcv-spark" id="lcv-spark" aria-hidden="true" ref={sparkRef}></span>
            {L.map((stage, i) => (
              <button type="button" key={stage.id} ref={el => { nodeRefs.current[i] = el; }}
                      className={`lcv-node ${i % 2 ? 'is-up' : 'is-down'}${i === current ? ' is-active' : ''}${i < current ? ' is-done' : ''}`} data-lcv={i}
                      style={{ left: `${(PTS[i][0] / LCV_W * 100).toFixed(3)}%`, top: `${(PTS[i][1] / LCV_H * 100).toFixed(3)}%` }}
                      aria-pressed={i === current} aria-label={`${stage.phase}: ${stage.title}`}
                      onClick={() => pick(i)}
                      onKeyDown={e => {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                          e.preventDefault();
                          const idx = pick(current + (e.key === 'ArrowRight' ? 1 : -1));
                          nodeRefs.current[idx].focus();
                        }
                      }}>
                <span className="lcv-node__dot"><RawSvg markup={STAGE_ICONS[i] || STAGE_ICONS[0]} /></span>
                <span className="lcv-node__label"><b>{pad(i + 1)}</b>{stage.chipText}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <article className="lcv-detail" id="lcv-detail" aria-live="polite" ref={detailRef} {...hoverProps}>
        <figure className="lcv-detail__media">
          <img id="lcv-img" src={s.image} alt={s.title} decoding="async" />
          <span className="lcv-detail__no" id="lcv-no" aria-hidden="true">{pad(current + 1)}</span>
        </figure>
        <div className="lcv-detail__body">
          <div className="lcv-detail__chips">
            <span className="lcv-chip lcv-chip--phase" id="lcv-phase">{s.phase}</span>
            <span className="lcv-chip" id="lcv-time">{s.duration}</span>
          </div>
          <h3 id="lcv-title">{s.title}</h3>
          <p className="lcv-detail__tag" id="lcv-tag">{s.tagline || ''}</p>
          <p className="lcv-detail__summary" id="lcv-summary">{s.summary}</p>
          <ul className="lcv-detail__points" id="lcv-points">
            {s.points.map(p => <li key={p}><Check /><span>{p}</span></li>)}
          </ul>
        </div>
        <aside className="lcv-detail__side">
          <div className="lcv-ring" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs><linearGradient id="lcv-ring-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5FB0FF" /><stop offset="1" stopColor="#FFFFFF" /></linearGradient></defs>
              <circle cx="60" cy="60" r="52" className="lcv-ring__track" />
              <circle cx="60" cy="60" r="52" className="lcv-ring__bar" id="lcv-ring" ref={ringRef} />
            </svg>
            <span><b id="lcv-ring-num">{pad(current + 1)}</b><small>of {pad(L.length)}</small></span>
          </div>
          <div className="lcv-milestone">
            <small>Milestone</small>
            <strong id="lcv-milestone">{s.milestone}</strong>
          </div>
          <div className="lcv-nav">
            <button type="button" data-lcv-step="-1" aria-label="Previous stage" onClick={() => pick(current - 1)}><Arrow d="M15 18l-6-6 6-6" /></button>
            <button type="button" data-lcv-step="1" aria-label="Next stage" onClick={() => pick(current + 1)}><Arrow d="M9 18l6-6-6-6" /></button>
          </div>
        </aside>
      </article>

      <div className="lcx-cta fade-in-up" data-delay="100">
        <span className="lcx-cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg></span>
        <p><strong>Single-point EPC accountability</strong> — one team from factory to field, under ISO 9001 quality supervision.</p>
        <a href="/contact/" className="lcx-cta__btn">Request Technical Proposal</a>
      </div>
    </div>
  );
}
