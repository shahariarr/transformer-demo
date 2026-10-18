'use client';

/* Project portfolio: spotlight carousel. The centred card is the active one (full details),
   neighbours shrink and dim. Prev/next arrows sit on either side; touch swipes and mouse drags. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

function getCategorySlug(cat) {
  const c = (cat || '').toLowerCase();
  if (c.includes('substation')) return 'substations';
  if (c.includes('transformer')) return 'transformers';
  if (c.includes('switchgear')) return 'switchgear';
  if (c.includes('commercial') || c.includes('public')) return 'commercial';
  if (c.includes('transit')) return 'transit';
  return c;
}

const FILTERS = [
  ['all', `All Projects (${DATA.projects.length})`],
  ['substations', 'High-Voltage Substations'],
  ['transformers', 'Power Transformers'],
  ['switchgear', 'Medium-Voltage Switchgear'],
  ['commercial', 'Industrial & Commercial'],
  ['transit', 'Transit Electrification']
];

const AUTOPLAY_MS = 5000;
const pad = n => String(n).padStart(2, '0');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const deployments = n => `${n} ${n === 1 ? 'Flagship Deployment' : 'Flagship Deployments'}`;

const Chevron = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export default function Projects({ viewAll = true }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const fromScroll = useRef(false);
  const scrollTimer = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);

  // Projects in the current filter, keeping their index in DATA for links/search
  const items = DATA.projects
    .map((p, i) => ({ ...p, index: i }))
    .filter(p => filter === 'all' || getCategorySlug(p.cat).includes(filter));
  const count = items.length;

  const go = useCallback(i => setActive(((i % count) + count) % count), [count]);

  // Centre the active card (unless the user's own swipe already put it there)
  useEffect(() => {
    if (fromScroll.current) { fromScroll.current = false; return; }
    const track = trackRef.current;
    const card = cardRefs.current[active];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
  }, [active, filter]);

  // Index of the card whose centre is nearest the track's centre
  const nearest = () => {
    const track = trackRef.current;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, dist = Infinity;
    cardRefs.current.slice(0, count).forEach((c, i) => {
      if (!c) return;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  };

  // A touch swipe picks whichever card ends up closest to the centre
  const onScroll = () => {
    if (drag.current) return;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const best = nearest();
      if (best !== active) { fromScroll.current = true; setActive(best); }
    }, 140);
  };

  // Mouse drag: move the track with the pointer, then settle on the nearest card.
  // A quick short flick still moves one card in the drag direction.
  const onPointerDown = e => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || count < 2) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, id: e.pointerId, moved: false };
    dragged.current = false;
  };

  const onPointerMove = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      trackRef.current.setPointerCapture(d.id);
      trackRef.current.dataset.dragging = '';
    }
    e.preventDefault();
    trackRef.current.scrollLeft = d.left - dx;
  };

  const endDrag = e => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    drag.current = null;
    if (!d.moved) return;
    dragged.current = true;
    const track = trackRef.current;
    const dx = e.clientX - d.x;
    let target = nearest();
    if (target === active && Math.abs(dx) > 60) target = Math.min(count - 1, Math.max(0, active + (dx < 0 ? 1 : -1)));
    const card = cardRefs.current[target];
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
    setTimeout(() => { delete track.dataset.dragging; }, 450);
    if (target !== active) { fromScroll.current = true; setActive(target); }
  };

  // Swallow the click that ends a drag so it doesn't open/select a card
  const onClickCapture = e => {
    if (!dragged.current) return;
    dragged.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Autoplay only while on screen, not hovered, tab visible and motion allowed
  useEffect(() => {
    const sec = trackRef.current.closest('section');
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const playing = visible && !paused && count > 1;
  useEffect(() => {
    if (!playing || reduced()) return;
    const t = setTimeout(() => { if (!document.hidden) go(active + 1); }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active, go]);

  const pickFilter = key => {
    if (key === filter) return;
    setFilter(key);
    setActive(0);
  };

  const onCardClick = i => (i === active ? router.push(`/projects/${items[i].slug}/`) : go(i));

  const hold = { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onFocus: () => setPaused(true), onBlur: () => setPaused(false) };

  return (
    <>
      <div className="wrap">
        <div className="proj-head">
          <SectionHead label="OUR PROJECT PORTFOLIO" title="Turnkey Engineering & Infrastructure Deployments"
            desc="Explore real-world execution examples showcasing substation planning, heavy transformer delivery, medium-voltage distribution automation, and utility energisation." />
          <div className="proj-nav fade-in-right" data-delay="150">
            <span className="proj-counter">{deployments(count)}</span>
            {viewAll ? <ViewAll href="/projects/">View all</ViewAll> : null}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="proj-filter-bar fade-in-up" data-delay="180" role="tablist" aria-label="Filter project portfolio by category">
          {FILTERS.map(([key, label]) => (
            <button type="button" className={`proj-filter-pill${filter === key ? ' is-active' : ''}`} data-filter={key} role="tab" key={key}
                    aria-selected={filter === key ? 'true' : 'false'} onClick={() => pickFilter(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="pcar fade-in-up" data-playing={playing ? 'true' : 'false'} data-delay="120" {...hold}>
        <button type="button" className="pcar__arrow pcar__arrow--prev" aria-label="Previous project" onClick={() => go(active - 1)} disabled={count < 2}><Chevron d="m15 18-6-6 6-6" /></button>
        <button type="button" className="pcar__arrow pcar__arrow--next" aria-label="Next project" onClick={() => go(active + 1)} disabled={count < 2}><Chevron d="m9 18 6-6-6-6" /></button>

        <div className="pcar__track" ref={trackRef} tabIndex="0" role="region" aria-roledescription="carousel" aria-label="Project portfolio"
             onScroll={onScroll} onPointerDown={onPointerDown} onPointerMove={onPointerMove}
             onPointerUp={endDrag} onPointerCancel={endDrag} onClickCapture={onClickCapture} onDragStart={e => e.preventDefault()}
             onKeyDown={e => {
               if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
               if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
             }}>
          {items.map((p, i) => (
            <article key={`${filter}-${p.slug}`} ref={el => { cardRefs.current[i] = el; }}
                     className={`pcar__card${i === active ? ' is-active' : ''}`} data-project={p.index} data-category={getCategorySlug(p.cat)}
                     role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}: ${p.title}`}
                     style={{ '--i': i }} onClick={() => onCardClick(i)}>
              <img className="pcar__img" src={p.image} alt="" loading="lazy" decoding="async" draggable="false" />
              <span className="pcar__shade" aria-hidden="true"></span>

              <div className="pcar__top">
                <span className="pcar__num" aria-hidden="true">{pad(i + 1)}</span>
                <span className="pcar__cat">{p.cat}</span>
              </div>

              <div className="pcar__panel">
                <p className="pcar__loc">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {p.location}
                </p>
                <h3 className="pcar__title">{p.title}</h3>
                {p.scope ? <p className="pcar__scope">{p.scope}</p> : null}
                <div className="pcar__more">
                  <div>
                    {p.specs ? (
                      <ul className="pcar__specs">
                        {p.specs.split('•').map(s => s.trim()).filter(Boolean).map(s => <li key={s}>{s}</li>)}
                      </ul>
                    ) : null}
                    <p className="pcar__desc">{p.desc}</p>
                    <a className="pcar__cta" href={`/projects/${p.slug}/`} tabIndex={i === active ? 0 : -1} onClick={e => e.stopPropagation()}>
                      <span>Explore Case Study</span>
                      <span className="pcar__cta-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        {/* Bottom Consultation Callout Banner */}
        <div className="proj-bottom-banner fade-in-up" data-delay="150">
          <div className="proj-bottom-copy">
            <span className="proj-bottom-tag">Engineering Collaboration & Tenders</span>
            <h4>Planning a New Power Grid or Substation Project?</h4>
            <p>Our senior project engineering team provides load flow calculations, layout drawings, equipment delivery coordination, and full on-site commissioning support.</p>
          </div>
          <a href="/contact/" className="btn btn--primary proj-bottom-btn">
            <span>Discuss Your Project With Us</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </>
  );
}
