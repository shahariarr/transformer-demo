'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';

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

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const deployments = n => `${n} ${n === 1 ? 'Flagship Deployment' : 'Flagship Deployments'}`;

export default function Projects() {
  const router = useRouter();
  const openProject = i => router.push(`/projects/${DATA.projects[i].slug}/`);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(DATA.projects.length);
  const [canScroll, setCanScroll] = useState(true);
  const trackRef = useRef(null);
  const cards = useRef([]);
  const auto = useRef({ timer: null, hovered: false, visible: false });
  const appliedFilter = useRef('all');

  const visibleCards = () => cards.current.filter(c => c && !c.classList.contains('is-hidden'));

  const updateNavState = useCallback(() => {
    const track = trackRef.current;
    setCanScroll(track.scrollWidth > track.clientWidth + 10 && visibleCards().length > 1);
  }, []);

  const scroll = useCallback(dir => {
    const track = trackRef.current;
    if (visibleCards().length <= 1) return;
    const card = visibleCards()[0];
    const step = card ? card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).gap) || 28) : 320;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 10) return;

    if (dir > 0 && track.scrollLeft >= maxScroll - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir < 0 && track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step * dir, behavior: reduced() ? 'auto' : 'smooth' });
    }
  }, []);

  // Auto sliding (only when visible in viewport and more than 1 visible card)
  const startAuto = useCallback(() => {
    const a = auto.current;
    clearInterval(a.timer);
    if (a.visible && !a.hovered && visibleCards().length > 1 && !reduced()) {
      a.timer = setInterval(() => scroll(1), 3500);
    }
  }, [scroll]);

  const pause = () => { auto.current.hovered = true; clearInterval(auto.current.timer); };
  const resume = () => { auto.current.hovered = false; startAuto(); };

  // Filter project cards by category (classes toggled directly so the reveal state is kept)
  useEffect(() => {
    if (appliedFilter.current === filter) return;
    appliedFilter.current = filter;
    let count = 0;
    cards.current.forEach(card => {
      const matches = filter === 'all' || (card.dataset.category || '').includes(filter);
      card.classList.toggle('is-hidden', !matches);
      card.classList.remove('proj--anim-in');
      if (matches) {
        void card.offsetWidth; // reflow so the entrance animation replays
        card.classList.add('proj--anim-in');
        count++;
      }
    });
    trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    setVisibleCount(count);
    updateNavState();
    startAuto();
  }, [filter, updateNavState, startAuto]);

  useEffect(() => {
    const sec = trackRef.current.closest('section');
    const io = new IntersectionObserver(([entry]) => {
      auto.current.visible = entry.isIntersecting;
      entry.isIntersecting ? startAuto() : clearInterval(auto.current.timer);
    }, { threshold: 0.15 });
    io.observe(sec);
    const onVis = () => (document.hidden ? clearInterval(auto.current.timer) : startAuto());
    document.addEventListener('visibilitychange', onVis);
    updateNavState();
    window.addEventListener('resize', updateNavState);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', updateNavState);
      clearInterval(auto.current.timer);
    };
  }, [startAuto, updateNavState]);

  return (
    <>
      <div className="wrap">
        <div className="proj-head">
          <SectionHead label="OUR PROJECT PORTFOLIO" title="Turnkey Engineering & Infrastructure Deployments"
            desc="Explore real-world execution examples showcasing substation planning, heavy transformer delivery, medium-voltage distribution automation, and utility energisation." />
          <div className="proj-nav fade-in-right" data-delay="150" aria-label="Scroll projects" onMouseEnter={pause} onMouseLeave={resume}>
            <span className="proj-counter">{deployments(visibleCount)}</span>
            <button type="button" data-proj-dir="-1" aria-label="Previous project" title="Previous" disabled={!canScroll}
                    onClick={() => { scroll(-1); startAuto(); }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" data-proj-dir="1" aria-label="Next project" title="Next" disabled={!canScroll}
                    onClick={() => { scroll(1); startAuto(); }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="proj-filter-bar fade-in-up" data-delay="180" role="tablist" aria-label="Filter project portfolio by category">
          {FILTERS.map(([key, label]) => (
            <button type="button" className={`proj-filter-pill${filter === key ? ' is-active' : ''}`} data-filter={key} role="tab" key={key}
                    aria-selected={filter === key ? 'true' : 'false'} onClick={() => { if (filter !== key) setFilter(key); }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="proj-track" tabIndex="0" role="region" aria-label="Project portfolio, scrollable horizontally" ref={trackRef}
           onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onTouchEnd={resume}>
        {DATA.projects.map((p, i) => (
          <article className="proj fade-in-up" data-delay={(i % 3) * 110} data-project={i} data-category={getCategorySlug(p.cat)} role="button" tabIndex="0"
                   aria-label={`View case study for ${p.title}`} key={p.title} ref={el => { cards.current[i] = el; }}
                   onClick={() => openProject(i)}
                   onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(i); } }}>
            <div className="proj__img">
              <img src={p.image} alt={p.title} loading="lazy" decoding="async" />
              <div className="proj__overlay"></div>
              <div className="proj__tags">
                <span className="proj__cat-tag">{p.cat}</span>
                {p.scope ? <span className="proj__scope-tag">{p.scope}</span> : null}
              </div>
            </div>

            <div className="proj__body">
              <div className="proj__location">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{p.location}</span>
              </div>

              <h3 className="proj__title">{p.title}</h3>

              {p.specs ? (
                <div className="proj__specs-box">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  <span>{p.specs}</span>
                </div>
              ) : null}

              <p className="proj__desc">{p.desc}</p>

              <div className="proj__foot">
                <span className="proj__link-btn">
                  <span>Explore Case Study</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </article>
        ))}
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
