function Projects() {
  function getCategorySlug(cat) {
    const c = (cat || '').toLowerCase();
    if (c.includes('substation')) return 'substations';
    if (c.includes('transformer')) return 'transformers';
    if (c.includes('switchgear')) return 'switchgear';
    if (c.includes('commercial') || c.includes('public')) return 'commercial';
    if (c.includes('transit')) return 'transit';
    return c;
  }

  const cards = DATA.projects.map((p, i) => `
    <article class="proj fade-in-up" data-delay="${(i % 3) * 110}" data-project="${i}" data-category="${getCategorySlug(p.cat)}" role="button" tabindex="0" aria-label="View case study for ${p.title}">
      <div class="proj__img">
        <img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async">
        <div class="proj__overlay"></div>
        <div class="proj__tags">
          <span class="proj__cat-tag">${p.cat}</span>
          ${p.scope ? `<span class="proj__scope-tag">${p.scope}</span>` : ''}
        </div>
      </div>

      <div class="proj__body">
        <div class="proj__location">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${p.location}</span>
        </div>

        <h3 class="proj__title">${p.title}</h3>

        ${p.specs ? `
        <div class="proj__specs-box">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>${p.specs}</span>
        </div>` : ''}

        <p class="proj__desc">${p.desc}</p>

        <div class="proj__foot">
          <span class="proj__link-btn">
            <span>Explore Case Study</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    </article>`).join('');

  return `
  <div class="wrap">
    <div class="proj-head">
      ${SectionHead({
        label: 'OUR PROJECT PORTFOLIO',
        title: 'Turnkey Engineering & Infrastructure Deployments',
        desc: 'Explore real-world execution examples showcasing substation planning, heavy transformer delivery, medium-voltage distribution automation, and utility energisation.'
      })}
      <div class="proj-nav fade-in-right" data-delay="150" aria-label="Scroll projects">
        <span class="proj-counter">${DATA.projects.length} Flagship Deployments</span>
        <button type="button" data-proj-dir="-1" aria-label="Previous project" title="Previous">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" data-proj-dir="1" aria-label="Next project" title="Next">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div class="proj-filter-bar fade-in-up" data-delay="180" role="tablist" aria-label="Filter project portfolio by category">
      <button type="button" class="proj-filter-pill is-active" data-filter="all" role="tab" aria-selected="true">All Projects (${DATA.projects.length})</button>
      <button type="button" class="proj-filter-pill" data-filter="substations" role="tab" aria-selected="false">High-Voltage Substations</button>
      <button type="button" class="proj-filter-pill" data-filter="transformers" role="tab" aria-selected="false">Power Transformers</button>
      <button type="button" class="proj-filter-pill" data-filter="switchgear" role="tab" aria-selected="false">Medium-Voltage Switchgear</button>
      <button type="button" class="proj-filter-pill" data-filter="commercial" role="tab" aria-selected="false">Industrial & Commercial</button>
      <button type="button" class="proj-filter-pill" data-filter="transit" role="tab" aria-selected="false">Transit Electrification</button>
    </div>
  </div>

  <div class="proj-track" tabindex="0" role="region" aria-label="Project portfolio, scrollable horizontally">
    ${cards}
  </div>

  <div class="wrap">
    <!-- Bottom Consultation Callout Banner -->
    <div class="proj-bottom-banner fade-in-up" data-delay="150">
      <div class="proj-bottom-copy">
        <span class="proj-bottom-tag">Engineering Collaboration & Tenders</span>
        <h4>Planning a New Power Grid or Substation Project?</h4>
        <p>Our senior project engineering team provides load flow calculations, layout drawings, equipment delivery coordination, and full on-site commissioning support.</p>
      </div>
      <a href="#contact" class="btn btn--primary proj-bottom-btn">
        <span>Discuss Your Project With Us</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>
  </div>`;
}

function initProjects() {
  const track = document.querySelector('.proj-track');
  const btns = document.querySelectorAll('[data-proj-dir]');
  const filterPills = document.querySelectorAll('.proj-filter-pill');
  const counter = document.querySelector('.proj-counter');
  if (!track) return;

  function getVisibleCards() {
    return Array.from(track.querySelectorAll('.proj:not(.is-hidden)'));
  }

  function getStep() {
    const card = track.querySelector('.proj:not(.is-hidden)');
    if (!card) return 320;
    const gap = parseFloat(getComputedStyle(track).gap) || 28;
    return card.getBoundingClientRect().width + gap;
  }

  function updateNavState() {
    const visibleCards = getVisibleCards();
    const canScroll = track.scrollWidth > track.clientWidth + 10 && visibleCards.length > 1;
    btns.forEach(b => {
      b.disabled = !canScroll;
    });
  }

  function scroll(dir) {
    const visibleCards = getVisibleCards();
    if (visibleCards.length <= 1) return;

    const step = getStep();
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 10) return;

    if (dir > 0 && track.scrollLeft >= maxScroll - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir < 0 && track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({
        left: step * dir,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }

  btns.forEach(b => b.addEventListener('click', () => {
    scroll(Number(b.dataset.projDir));
    resetAuto();
  }));

  // Filter project cards by category
  function applyFilter(filterVal) {
    const allCards = track.querySelectorAll('.proj');
    let visibleCount = 0;

    allCards.forEach(card => {
      const cardCat = card.dataset.category || '';
      const matches = filterVal === 'all' || cardCat.includes(filterVal);

      if (matches) {
        card.classList.remove('is-hidden');
        card.classList.remove('proj--anim-in');
        // trigger reflow for smooth re-animation
        void card.offsetWidth;
        card.classList.add('proj--anim-in');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.classList.remove('proj--anim-in');
      }
    });

    // Reset scroll to start
    track.scrollTo({ left: 0, behavior: 'smooth' });

    // Update counter text
    if (counter) {
      counter.textContent = `${visibleCount} ${visibleCount === 1 ? 'Flagship Deployment' : 'Flagship Deployments'}`;
    }

    updateNavState();
    resetAuto();
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (pill.classList.contains('is-active')) return;
      filterPills.forEach(p => {
        p.classList.remove('is-active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-selected', 'true');
      applyFilter(pill.dataset.filter);
    });
  });

  // Auto sliding (only when visible in viewport and more than 1 visible card)
  let autoTimer = null;
  let isHovered = false;
  let isVisible = false;

  function startAuto() {
    clearInterval(autoTimer);
    const visibleCards = getVisibleCards();
    if (isVisible && !isHovered && visibleCards.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoTimer = setInterval(() => {
        scroll(1);
      }, 3500);
    }
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  track.addEventListener('mouseenter', () => { isHovered = true; clearInterval(autoTimer); });
  track.addEventListener('mouseleave', () => { isHovered = false; startAuto(); });
  track.addEventListener('touchstart', () => { isHovered = true; clearInterval(autoTimer); }, { passive: true });
  track.addEventListener('touchend', () => { isHovered = false; startAuto(); }, { passive: true });

  const nav = document.querySelector('.proj-nav');
  if (nav) {
    nav.addEventListener('mouseenter', () => { isHovered = true; clearInterval(autoTimer); });
    nav.addEventListener('mouseleave', () => { isHovered = false; startAuto(); });
  }

  const projSec = document.getElementById('projects');
  if (projSec) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startAuto();
      } else {
        clearInterval(autoTimer);
      }
    }, { threshold: 0.15 });
    observer.observe(projSec);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(autoTimer);
    else startAuto();
  });

  // Keyboard accessibility for cards
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const projEl = e.target.closest('[data-project]');
      if (projEl && document.activeElement === projEl) {
        e.preventDefault();
        projEl.click();
      }
    }
  });

  // Initialize navigation arrow button states
  updateNavState();
  window.addEventListener('resize', updateNavState);
}
