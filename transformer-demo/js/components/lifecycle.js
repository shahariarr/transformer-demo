/* ── From Concept to Commissioning: The Project Lifecycle ─────────────── */
function Lifecycle() {
  const L = DATA.lifecycle;
  const pad = n => String(n + 1).padStart(2, '0');

  // Stepper buttons for the horizontal timeline
  const stepperItems = L.map((s, i) => `
    <button type="button" class="lc-step ${i === 0 ? 'is-active' : ''}" data-stage="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-label="Stage ${i + 1}: ${s.title}">
      <span class="lc-step__num">${pad(i)}</span>
      <span class="lc-step__info">
        <span class="lc-step__phase">${s.phase}</span>
        <span class="lc-step__title">${s.title.split('&')[0].trim()}</span>
      </span>
    </button>`).join('');

  // Thumbnails for the quick-access overview track
  const thumbs = L.map((s, i) => `
    <div class="lc-thumb ${i === 0 ? 'is-active' : ''}" data-stage="${i}" role="button" tabindex="0" aria-label="View ${s.title}">
      <div class="lc-thumb__img-wrap">
        <img src="${s.image}" alt="${s.title}" loading="lazy" decoding="async">
        <span class="lc-thumb__badge">${pad(i)}</span>
      </div>
      <div class="lc-thumb__text">
        <span class="lc-thumb__phase">${s.phase}</span>
        <h4 class="lc-thumb__title">${s.title}</h4>
      </div>
    </div>`).join('');

  const first = L[0];

  return `
  <canvas class="kinetic-grid-canvas" id="kinetic-grid-canvas" aria-hidden="true"></canvas>
  <div class="wrap">
    ${SectionHead({
      label: 'FROM CONCEPT TO COMMISSIONING',
      title: 'The Complete Project Lifecycle',
      desc: 'A coordinated 7-stage turnkey engineering and commissioning methodology ensuring zero-defect transformer fabrication, full IEC compliance, and on-time grid energisation.'
    })}

    <!-- Interactive Stepper Track -->
    <div class="lc-stepper-wrap" data-reveal>
      <div class="lc-stepper" role="tablist" aria-label="Project lifecycle stages" id="lc-stepper">
        ${stepperItems}
      </div>
    </div>

    <!-- Active Stage Featured Showcase -->
    <div class="lc-showcase" id="lc-showcase" data-reveal>
      <!-- Left: Stage Visual Media -->
      <div class="lc-media">
        <div class="lc-media__frame">
          <img src="${first.image}" alt="${first.title}" id="lc-main-img" loading="eager" decoding="async">
          <div class="lc-media__top-chips">
            <span class="lc-chip lc-chip--phase" id="lc-chip-phase">${first.phase}</span>
            <span class="lc-chip lc-chip--duration" id="lc-chip-duration">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span id="lc-text-duration">${first.duration}</span>
            </span>
          </div>
          <div class="lc-media__milestone">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <div>
              <span class="lc-milestone-label">Key Stage Milestone</span>
              <strong id="lc-text-milestone">${first.milestone}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Engineering Scope & Deliverables -->
      <div class="lc-content" id="lc-content">
        <div class="lc-content__eyebrow" id="lc-eyebrow">STAGE 01 OF 07 • TURNKEY EPC WORKFLOW</div>
        <h3 class="lc-content__title" id="lc-title">${first.title}</h3>
        <p class="lc-content__tagline" id="lc-tagline">${first.tagline}</p>
        <p class="lc-content__desc" id="lc-desc">${first.summary}</p>

        <div class="lc-deliverables">
          <h4 class="lc-deliverables__head">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            <span>Key Deliverables & Verification Gates</span>
          </h4>
          <ul class="lc-deliverables__list" id="lc-points">
            ${first.points.map(p => `
              <li>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                <span>${p}</span>
              </li>`).join('')}
          </ul>
        </div>

        <div class="lc-actions">
          <div class="lc-nav-btns">
            <button type="button" class="lc-nav-btn" id="lc-prev-btn" aria-label="Previous lifecycle stage" title="Previous Stage">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" class="lc-nav-btn" id="lc-next-btn" aria-label="Next lifecycle stage" title="Next Stage">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <a href="#contact" class="lc-cta-btn">
            <span>Inquire About Turnkey EPC</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Quick Access All Stages Strip -->
    <div class="lc-thumbs-slider" data-reveal>
      <div class="lc-thumbs-track" id="lc-thumbs-track">
        ${thumbs}
      </div>
    </div>

    <!-- Turnkey EPC Assurance Banner -->
    <div class="lc-assurance" data-reveal>
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

  const stepper = document.getElementById('lc-stepper');
  const thumbsTrack = document.getElementById('lc-thumbs-track');
  const mainImg = document.getElementById('lc-main-img');
  const chipPhase = document.getElementById('lc-chip-phase');
  const textDuration = document.getElementById('lc-text-duration');
  const textMilestone = document.getElementById('lc-text-milestone');
  const eyebrow = document.getElementById('lc-eyebrow');
  const title = document.getElementById('lc-title');
  const tagline = document.getElementById('lc-tagline');
  const desc = document.getElementById('lc-desc');
  const pointsList = document.getElementById('lc-points');
  const prevBtn = document.getElementById('lc-prev-btn');
  const nextBtn = document.getElementById('lc-next-btn');
  const showcase = document.getElementById('lc-showcase');

  let currentStage = 0;
  const pad = n => String(n + 1).padStart(2, '0');

  function renderStage(idx) {
    if (idx < 0 || idx >= L.length) return;
    currentStage = idx;
    const s = L[idx];

    // Update stepper tabs
    if (stepper) {
      const stepBtns = stepper.querySelectorAll('.lc-step');
      stepBtns.forEach((btn, k) => {
        btn.classList.toggle('is-active', k === idx);
        btn.classList.toggle('is-done', k < idx);
        btn.setAttribute('aria-selected', k === idx ? 'true' : 'false');
      });
      // Scroll active step into view on mobile
      const activeStep = stepBtns[idx];
      if (activeStep) {
        activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Update thumbs track
    if (thumbsTrack) {
      const thumbEls = thumbsTrack.querySelectorAll('.lc-thumb');
      thumbEls.forEach((th, k) => {
        th.classList.toggle('is-active', k === idx);
      });
      const activeThumb = thumbEls[idx];
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Smooth transition for showcase card
    if (showcase) {
      showcase.classList.add('is-transitioning');
    }

    setTimeout(() => {
      if (mainImg) {
        mainImg.src = s.image;
        mainImg.alt = s.title;
      }
      if (chipPhase) chipPhase.textContent = s.phase;
      if (textDuration) textDuration.textContent = s.duration;
      if (textMilestone) textMilestone.textContent = s.milestone;
      if (eyebrow) eyebrow.textContent = `STAGE ${pad(idx)} OF ${pad(L.length - 1 + 1)} • TURNKEY EPC WORKFLOW`;
      if (title) title.textContent = s.title;
      if (tagline) tagline.textContent = s.tagline;
      if (desc) desc.textContent = s.summary;

      if (pointsList) {
        pointsList.innerHTML = s.points.map(p => `
          <li>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            <span>${p}</span>
          </li>`).join('');
      }

      if (showcase) {
        showcase.classList.remove('is-transitioning');
      }
    }, 150);
  }

  // Stepper clicks
  if (stepper) {
    stepper.addEventListener('click', e => {
      const btn = e.target.closest('.lc-step');
      if (btn && btn.dataset.stage !== undefined) {
        renderStage(Number(btn.dataset.stage));
      }
    });
  }

  // Thumbs clicks
  if (thumbsTrack) {
    thumbsTrack.addEventListener('click', e => {
      const thumb = e.target.closest('.lc-thumb');
      if (thumb && thumb.dataset.stage !== undefined) {
        renderStage(Number(thumb.dataset.stage));
      }
    });
  }

  // Prev / Next button clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const nextIdx = currentStage === 0 ? L.length - 1 : currentStage - 1;
      renderStage(nextIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = currentStage === L.length - 1 ? 0 : currentStage + 1;
      renderStage(nextIdx);
    });
  }

  // Kinetic Grid initialization
  if (typeof initKineticGrid === 'function') {
    initKineticGrid('kinetic-grid-canvas', 'lifecycle');
  }
}

window.Lifecycle = Lifecycle;
window.initLifecycle = initLifecycle;
