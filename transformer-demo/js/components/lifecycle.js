/* ── From Concept to Commissioning: The Smooth Scroll-Based Animated Project Lifecycle ─────────────── */

const STAGE_ICONS = [
  // 1: Requirement (Document & checklist)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  // 2: Engineering (Blueprint schematic / architect)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/><path d="M12 2v2"/><path d="M9 3l1 2"/><path d="M15 3l-1 2"/></svg>`,
  // 3: Planning (Gantt timeline bars)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="15" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="12" y2="18"/><circle cx="3" cy="6" r="1.5" fill="currentColor"/><circle cx="21" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/></svg>`,
  // 4: Manufacturing (Industrial factory crane & assembly)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="12" cy="12" r="2"/></svg>`,
  // 5: Site Delivery (Heavy logistics transport truck)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  // 6: On-Site Testing (Inspection checklist & meter)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>`,
  // 7: Handover, Training (Handover collaboration & presentation)
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
];

function Lifecycle() {
  const L = DATA.lifecycle;
  const pad = n => String(n + 1).padStart(2, '0');

  // Sticky navigation chip pills
  const navPills = L.map((s, i) => `
    <button type="button" class="lc-pill ${i === 0 ? 'is-active' : ''}" data-stage-btn="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-controls="lc-stage-${i}" style="--stage-color:${s.accentColor}; --stage-glow:${s.glowColor};">
      <span class="lc-pill__num">${pad(i)}</span>
      <span class="lc-pill__text">
        <span class="lc-pill__stage">${s.phase}</span>
        <span class="lc-pill__name">${s.chipText}</span>
      </span>
    </button>`).join('');

  // 7 alternating animated stage rows
  const stageRows = L.map((s, i) => {
    const isEven = i % 2 === 1; // Stages 1, 3, 5, 7 (Odd index 0,2,4,6) vs Stages 2, 4, 6 (Even index 1,3,5)
    const iconSvg = STAGE_ICONS[i] || STAGE_ICONS[0];

    // Media Showcase Card (Clean image with stage badge)
    const mediaCardHtml = `
      <div class="lc-card lc-card--media ${isEven ? 'fade-in-right' : 'fade-in-left'}" ${isEven ? 'data-delay="120"' : ''}>
        <div class="lc-media__frame">
          <img src="${s.image}" alt="${s.title}" loading="${i <= 1 ? 'eager' : 'lazy'}" decoding="async">
          <div class="lc-media__top-chips">
            <span class="lc-chip lc-chip--stage">
              <span class="lc-chip__dot"></span>
              ${s.phase}
            </span>
          </div>
        </div>
      </div>
    `;

    // Clean Minimal Stage Header Card (Only STAGE XX OF 07 and Title)
    const scopeCardHtml = `
      <div class="lc-card lc-card--scope ${isEven ? 'fade-in-left' : 'fade-in-right'}" ${isEven ? '' : 'data-delay="120"'}>
        <div class="lc-scope__content">
          <div class="lc-scope__eyebrow">
            <span class="lc-scope__eyebrow-badge">${s.phase.toUpperCase()} OF 07</span>
          </div>
          <h3 class="lc-scope__title">${s.title}</h3>
        </div>
      </div>
    `;

    // Center Stage Node
    const centerNodeHtml = `
      <div class="lc-timeline__node fade-in-up" data-delay="60" aria-hidden="true">
        <div class="lc-node__circle">
          <span class="lc-node__num">${i + 1}</span>
          <span class="lc-node__icon">${iconSvg}</span>
        </div>
        <div class="lc-node__chip-tag">
          <span class="lc-node__tag-phase">${s.phase}</span>
          <span class="lc-node__tag-title">${s.chipText}</span>
        </div>
        <div class="lc-node__connector lc-node__connector--left"></div>
        <div class="lc-node__connector lc-node__connector--right"></div>
      </div>
    `;

    return `
      <div class="lc-stage-row ${isEven ? 'lc-stage-row--even' : 'lc-stage-row--odd'}" id="lc-stage-${i}" data-stage-index="${i}" style="--stage-color:${s.accentColor}; --stage-glow:${s.glowColor}; --stage-bg:${s.bgTint};">
        ${isEven ? scopeCardHtml : mediaCardHtml}
        ${centerNodeHtml}
        ${isEven ? mediaCardHtml : scopeCardHtml}
      </div>
    `;
  }).join('');

  return `
  <div class="stars-container" aria-hidden="true">
    <div id="lifecycle-stars" class="stars-layer-1"></div>
    <div id="lifecycle-stars2" class="stars-layer-2"></div>
    <div id="lifecycle-stars3" class="stars-layer-3"></div>
  </div>
  <div class="wrap">
    ${SectionHead({
      label: 'FROM CONCEPT TO COMMISSIONING',
      title: 'The Complete Project Lifecycle',
      desc: 'A coordinated 7-stage turnkey engineering and commissioning methodology ensuring zero-defect transformer fabrication, full IEC compliance, and on-time grid energisation.'
    })}

    <!-- Interactive Sticky Stage Pills Navigation -->
    <div class="lc-nav-wrapper" id="lc-nav-wrapper">
      <div class="lc-pills-bar" role="tablist" aria-label="Project lifecycle stages" id="lc-pills-bar">
        ${navPills}
      </div>
    </div>

    <!-- Scroll-Based Vertical Stages Timeline -->
    <div class="lc-timeline" id="lc-timeline">
      <!-- Animated Central Progress Spine -->
      <div class="lc-timeline__spine">
        <div class="lc-timeline__spine-track"></div>
        <div class="lc-timeline__spine-fill" id="lc-spine-fill"></div>
      </div>

      <!-- 7 Sequential Animated Stages -->
      <div class="lc-stages-container" id="lc-stages-container">
        ${stageRows}
      </div>
    </div>

    <!-- Turnkey EPC Assurance Banner -->
    <div class="lc-assurance fade-in-up" data-delay="100">
      <div class="lc-assurance__icon">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div class="lc-assurance__body">
        <h4>Single-Point EPC Accountability from Factory to Field</h4>
        <p>Our multidisciplinary team of power electrical engineers, civil technicians, and commissioning specialists handle the entire lifecycle under ISO 9001 quality supervision, eliminating contractor handoff risks.</p>
      </div>
      <a href="#contact" class="lc-assurance__btn">
        <span>Request Technical Proposal</span>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>`;
}

function initLifecycle() {
  const L = DATA.lifecycle;
  if (!L || !L.length) return;

  const timeline = document.getElementById('lc-timeline');
  const spineFill = document.getElementById('lc-spine-fill');
  const pillsBar = document.getElementById('lc-pills-bar');
  const stageRows = Array.from(document.querySelectorAll('.lc-stage-row'));
  const pillBtns = Array.from(document.querySelectorAll('[data-stage-btn]'));

  let activeIndex = -1;

  // Set active stage in navigation and rows (without layout thrashing)
  function activateStage(idx) {
    if (idx === activeIndex || idx < 0 || idx >= L.length) return;
    activeIndex = idx;

    for (let k = 0; k < pillBtns.length; k++) {
      const btn = pillBtns[k];
      const isActive = k === idx;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    }

    for (let k = 0; k < stageRows.length; k++) {
      const row = stageRows[k];
      row.classList.toggle('is-active', k === idx);
    }
  }

  // Smooth IntersectionObserver for hardware-accelerated stage reveal
  if ('IntersectionObserver' in window && stageRows.length) {
    const stageObserver = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const row = entry.target;
        if (entry.isIntersecting) {
          row.classList.add('is-visible');
          if (entry.intersectionRatio >= 0.25) {
            const idx = parseInt(row.dataset.stageIndex, 10);
            activateStage(idx);
          }
        } else {
          row.classList.remove('is-visible');
        }
      }
    }, {
      rootMargin: '-5% 0px -20% 0px',
      threshold: [0.1, 0.25, 0.5]
    });

    stageRows.forEach(row => stageObserver.observe(row));
  } else {
    stageRows.forEach(row => row.classList.add('is-visible'));
  }

  // Ultra-lightweight throttled progress spine update (zero lag)
  let ticking = false;
  function updateSpineFill() {
    if (!timeline || !spineFill) return;
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = rect.height;
    if (totalH <= 0) return;

    const startOffset = windowH * 0.45;
    const progress = Math.min(Math.max((startOffset - rect.top) / totalH, 0), 1);
    spineFill.style.height = (progress * 100).toFixed(1) + '%';
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateSpineFill();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateSpineFill();

  // Navigation Pill Clicks (Smooth scroll straight to target stage)
  pillBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const targetRow = document.getElementById(`lc-stage-${idx}`);
      if (targetRow) {
        const headerOffset = 140;
        const targetPos = targetRow.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        activateStage(idx);
      }
    });
  });

  // Jump buttons on each stage card
  document.querySelectorAll('[data-jump-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextIdx = parseInt(btn.dataset.jumpTo, 10);
      const targetRow = document.getElementById(`lc-stage-${nextIdx}`);
      if (targetRow) {
        const headerOffset = 140;
        const targetPos = targetRow.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
        activateStage(nextIdx);
      }
    });
  });

  // Initialize initial stage
  activateStage(0);
  if (stageRows[0]) {
    stageRows[0].classList.add('is-visible');
  }
}

window.Lifecycle = Lifecycle;
window.initLifecycle = initLifecycle;
