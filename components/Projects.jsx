'use client';

/* Project portfolio: spotlight carousel & grid with category filter tabs,
   instant search, active filter feedback, and pagination controls. */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import SectionHead from './SectionHead';
import ViewAll from './ViewAll';

const PROJECTS_PER_PAGE = 6;
const AUTOPLAY_MS = 5000;
const pad = n => String(n).padStart(2, '0');
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const deployments = n => `${n} ${n === 1 ? 'Flagship Deployment' : 'Flagship Deployments'}`;

const Chevron = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'substations', label: 'Substations' },
  { id: 'transformers', label: 'Transformers' },
  { id: 'switchgear', label: 'Switchgear' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'transit', label: 'Transit' },
  { id: 'renewable', label: 'Renewable' }
];

function matchCategory(cat, filterId) {
  if (filterId === 'all') return true;
  const c = (cat || '').toLowerCase();
  if (filterId === 'substations') return c.includes('substation');
  if (filterId === 'transformers') return c.includes('transformer');
  if (filterId === 'switchgear') return c.includes('switchgear');
  if (filterId === 'commercial') return c.includes('commercial');
  if (filterId === 'transit') return c.includes('transit');
  if (filterId === 'renewable') return c.includes('renewable') || c.includes('public') || c.includes('solar');
  return c.includes(filterId);
}

function getCategorySlug(cat) {
  const c = (cat || '').toLowerCase();
  if (c.includes('substation')) return 'substations';
  if (c.includes('transformer')) return 'transformers';
  if (c.includes('switchgear')) return 'switchgear';
  if (c.includes('commercial') || c.includes('public')) return 'commercial';
  if (c.includes('transit')) return 'transit';
  if (c.includes('renewable') || c.includes('solar')) return 'renewable';
  return c;
}

export default function Projects({ viewAll = true, isGrid = false }) {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const gridSectionRef = useRef(null);
  const fromScroll = useRef(false);
  const scrollTimer = useRef(null);
  const drag = useRef(null);
  const dragged = useRef(false);

  // Filtered projects by category and search term
  const filteredProjects = useMemo(() => {
    return DATA.projects
      .map((p, i) => ({ ...p, index: i }))
      .filter(p => {
        if (!matchCategory(p.cat, filter)) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title?.toLowerCase().includes(q);
        const matchCat = p.cat?.toLowerCase().includes(q);
        const matchLocation = p.location?.toLowerCase().includes(q);
        const matchScope = p.scope?.toLowerCase().includes(q);
        const matchSpecs = p.specs?.toLowerCase().includes(q);
        const matchDesc = p.desc?.toLowerCase().includes(q);
        return matchTitle || matchCat || matchLocation || matchScope || matchSpecs || matchDesc;
      });
  }, [filter, searchQuery]);

  const count = filteredProjects.length;
  const isDefaultView = filter === 'all' && !searchQuery.trim();

  // Total pages
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  // Paginated projects for grid view
  const paginatedProjects = useMemo(() => {
    if (!isGrid) return filteredProjects;
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage, isGrid]);

  const go = useCallback(i => {
    if (count <= 0) {
      setActive(0);
      return;
    }
    setActive(((i % count) + count) % count);
  }, [count]);

  // Centre the active card in carousel view
  useEffect(() => {
    if (isGrid) return;
    if (fromScroll.current) { fromScroll.current = false; return; }
    const track = trackRef.current;
    const card = cardRefs.current[active];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
  }, [active, filter, isGrid]);

  // Clean up pending scroll timer on unmount
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimer.current);
    };
  }, []);

  // Nearest card calculation for carousel
  const nearest = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0, dist = Infinity;
    cardRefs.current.slice(0, count).forEach((c, i) => {
      if (!c) return;
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  };

  const onScroll = () => {
    if (drag.current) return;
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (!trackRef.current) return;
      const best = nearest();
      if (best !== active) { fromScroll.current = true; setActive(best); }
    }, 140);
  };

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
    if (target === active && Math.abs(dx) > 60) target = Math.min(count - 1, Math.max(0, active + (dx < 0 ? 1 : -1)));
    const card = cardRefs.current[target];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' });
    }
    setTimeout(() => { if (track) delete track.dataset.dragging; }, 450);
    if (target !== active) { fromScroll.current = true; setActive(target); }
  };

  const onClickCapture = e => {
    if (!dragged.current) return;
    dragged.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Autoplay for carousel
  useEffect(() => {
    if (isGrid) return;
    const sec = trackRef.current?.closest('section');
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(sec);
    return () => io.disconnect();
  }, [isGrid]);

  const playing = !isGrid && visible && !paused && count > 1;
  useEffect(() => {
    if (!playing || reduced()) return;
    const t = setTimeout(() => { if (!document.hidden) go(active + 1); }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, active, go]);

  const handleCatChange = (catId) => {
    setFilter(catId);
    setCurrentPage(1);
    setActive(0);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    setActive(0);
  };

  const handleResetFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setCurrentPage(1);
    setActive(0);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const onCardClick = i => (i === active ? router.push(`/projects/${filteredProjects[i].slug}/`) : go(i));
  const hold = { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false), onFocus: () => setPaused(true), onBlur: () => setPaused(false) };

  const currentCategoryObj = FILTERS.find(f => f.id === filter);

  return (
    <>
      <div className="wrap" ref={gridSectionRef}>
        <div className="proj-head">
          <SectionHead
            label="OUR PROJECT PORTFOLIO"
            title="Turnkey Engineering & Infrastructure Deployments"
            desc="Explore real-world execution examples showcasing substation planning, heavy transformer delivery, medium-voltage distribution automation, and utility energisation."
          />
          <div className="proj-nav" data-animate="slideInRight">
            <span className="proj-counter">{deployments(count)}</span>
            {viewAll ? <ViewAll href="/projects/">View all</ViewAll> : null}
          </div>
        </div>

        {/* Category Filter Pills & Search Bar Toolbar */}
        <div className="proj-toolbar" role="region" aria-label="Project filters and search">
          {/* Category Tabs */}
          <div className="proj-cat-tabs" role="tablist" aria-label="Filter project portfolio by category">
            {FILTERS.map(f => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleCatChange(f.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`proj-cat-pill${isActive ? ' is-active' : ''}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="proj-search-wrap">
            <span className="proj-search-icon" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              className="proj-search-input"
              aria-label="Search projects by title, equipment or location"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="proj-search-clear"
                aria-label="Clear search input"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Notification Bar if searching or filtered */}
        {!isDefaultView && (
          <div className="proj-filter-status">
            <p>
              Showing <strong>{count}</strong> {count === 1 ? 'project' : 'projects'}
              {filter !== 'all' && (
                <span> in <strong>{currentCategoryObj?.label || filter}</strong></span>
              )}
              {searchQuery.trim() && (
                <span> matching <strong>&ldquo;{searchQuery.trim()}&rdquo;</strong></span>
              )}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="proj-reset-btn"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {isGrid ? (
        <div className="wrap proj-grid-wrap" data-animate="slideInUp">
          {filteredProjects.length === 0 ? (
            <div className="proj-empty-state">
              <div className="proj-empty-icon" aria-hidden="true">
                <SearchIcon />
              </div>
              <h3>No matching projects found</h3>
              <p>Try searching for a different keyword or selecting &quot;All&quot;.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn--primary btn--sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="proj-grid">
                {paginatedProjects.map((p, i) => {
                  const itemNumber = (currentPage - 1) * PROJECTS_PER_PAGE + i + 1;
                  return (
                    <article
                      key={`${filter}-${searchQuery}-${p.slug}`}
                      className="pcar__card is-active proj-grid__card"
                      data-project={p.index}
                      data-category={getCategorySlug(p.cat)}
                      role="article"
                      aria-label={`${itemNumber} of ${count}: ${p.title}`}
                      style={{ '--i': i }}
                      onClick={() => router.push(`/projects/${p.slug}/`)}
                    >
                      <img className="pcar__img" src={p.image} alt={p.title} loading="lazy" decoding="async" draggable="false" />
                      <span className="pcar__shade" aria-hidden="true"></span>

                      <div className="pcar__top">
                        <span className="pcar__num" aria-hidden="true">{pad(itemNumber)}</span>
                        <span className="pcar__cat">{p.cat}</span>
                      </div>

                      <div className="pcar__panel">
                        <p className="pcar__loc">
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
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
                            <a className="pcar__cta" href={`/projects/${p.slug}/`} onClick={e => e.stopPropagation()}>
                              <span>Explore Case Study</span>
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

              {/* Pagination Controls matching Image 1 */}
              {totalPages > 1 && (
                <nav className="proj-pagination" aria-label="Project portfolio pagination">
                  <div className="proj-pagination-info">
                    Showing <strong>{(currentPage - 1) * PROJECTS_PER_PAGE + 1}</strong>–
                    <strong>{Math.min(currentPage * PROJECTS_PER_PAGE, count)}</strong> of{' '}
                    <strong>{count}</strong> {count === 1 ? 'project' : 'projects'}
                  </div>

                  <div className="proj-pagination-controls">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="proj-page-btn"
                      aria-label="Previous page"
                    >
                      <ChevronLeftIcon />
                      <span>Previous</span>
                    </button>

                    <div className="proj-page-numbers" role="navigation" aria-label="Page numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`proj-page-num${currentPage === page ? ' is-active' : ''}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                          aria-label={`Page ${page}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="proj-page-btn"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRightIcon />
                    </button>
                  </div>
                </nav>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="pcar" data-animate="slideInRight" data-playing={playing ? 'true' : 'false'} {...hold}>
          <button type="button" className="pcar__arrow pcar__arrow--prev" aria-label="Previous project" onClick={() => go(active - 1)} disabled={count < 2}>
            <Chevron d="m15 18-6-6 6-6" />
          </button>
          <button type="button" className="pcar__arrow pcar__arrow--next" aria-label="Next project" onClick={() => go(active + 1)} disabled={count < 2}>
            <Chevron d="m9 18 6-6-6-6" />
          </button>

          <div
            className="pcar__track"
            ref={trackRef}
            tabIndex="0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Project portfolio"
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={e => e.preventDefault()}
            onKeyDown={e => {
              if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
              if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
            }}
          >
            {filteredProjects.map((p, i) => (
              <article
                key={`${filter}-${searchQuery}-${p.slug}`}
                ref={el => { cardRefs.current[i] = el; }}
                className={`pcar__card${i === active ? ' is-active' : ''}`}
                data-project={p.index}
                data-category={getCategorySlug(p.cat)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.title}`}
                style={{ '--i': i }}
                onClick={() => onCardClick(i)}
              >
                <img className="pcar__img" src={p.image} alt={p.title} loading="lazy" decoding="async" draggable="false" />
                <span className="pcar__shade" aria-hidden="true"></span>

                <div className="pcar__top">
                  <span className="pcar__num" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="pcar__cat">{p.cat}</span>
                </div>

                <div className="pcar__panel">
                  <p className="pcar__loc">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
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
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17 17 7M8 7h9v9" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

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
