function Projects() {
  const cards = DATA.projects.map((p, i) => `
    <article class="proj ${i === 0 ? 'proj--feature' : ''}" data-project="${i}" role="button" tabindex="0" aria-label="View case study for ${p.title}">
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
    <div class="proj-head" data-reveal>
      ${SectionHead({
        label: 'OUR PROJECT PORTFOLIO',
        title: 'Turnkey Engineering & Infrastructure Deployments',
        desc: 'Explore real-world execution examples showcasing substation planning, heavy transformer delivery, medium-voltage distribution automation, and utility energisation.'
      })}
      <div class="proj-nav" aria-label="Scroll projects">
        <span class="proj-counter">6 Flagship Deployments</span>
        <button type="button" data-proj-dir="-1" aria-label="Previous project" title="Previous">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" data-proj-dir="1" aria-label="Next project" title="Next">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>

    <!-- Category Filter Pill Indicators -->
    <div class="proj-filter-bar" data-reveal>
      <span class="proj-filter-pill is-active">All Projects (6)</span>
      <span class="proj-filter-pill">High-Voltage Substations</span>
      <span class="proj-filter-pill">Power Transformers</span>
      <span class="proj-filter-pill">Medium-Voltage Switchgear</span>
      <span class="proj-filter-pill">Industrial & Commercial</span>
      <span class="proj-filter-pill">Transit Electrification</span>
    </div>
  </div>

  <div class="proj-track" tabindex="0" role="region" aria-label="Project portfolio, scrollable horizontally">
    ${cards}
  </div>

  <div class="wrap">
    <!-- Bottom Consultation Callout Banner -->
    <div class="proj-bottom-banner" data-reveal>
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
  if (!track || !btns.length) return;

  btns.forEach(b => b.addEventListener('click', () => {
    const card = track.querySelector('.proj');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).gap) || 28;
    const step = card.getBoundingClientRect().width + gap;
    track.scrollBy({
      left: step * Number(b.dataset.projDir),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }));

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
}
