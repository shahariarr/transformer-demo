/* ── From Concept to Commissioning: tabbed 7-stage project lifecycle ── */

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
  const check = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  const steps = L.map((s, i) => `
      <li>
        <button type="button" class="lcx-step${i === 0 ? ' is-active' : ''}" role="tab" id="lcx-tab-${i}" aria-selected="${i === 0}" aria-controls="lcx-panel" data-lcx="${i}">
          <span class="lcx-step__dot">${STAGE_ICONS[i] || STAGE_ICONS[0]}<b>${pad(i)}</b></span>
          <span class="lcx-step__name">${s.chipText}</span>
        </button>
      </li>`).join('');

  return `
  <div class="wrap">
    ${SectionHead({
      label: 'FROM CONCEPT TO COMMISSIONING',
      title: 'The Complete Project Lifecycle',
      desc: 'A coordinated 7-stage turnkey methodology — from first requirement to grid energisation and lifecycle care.'
    })}

    <div class="lcx fade-in-up" data-delay="80">
      <div class="lcx-track" id="lcx-track">
        <div class="lcx-steps-wrap" style="--n:${L.length}">
          <span class="lcx-steps__line" aria-hidden="true"><span class="lcx-steps__fill" id="lcx-fill"></span></span>
          <ol class="lcx-steps" role="tablist" aria-label="Project lifecycle stages">${steps}
          </ol>
        </div>
      </div>

      <div class="lcx-panel" id="lcx-panel" role="tabpanel" aria-live="polite">
        <figure class="lcx-panel__media">
          <img id="lcx-img" src="${L[0].image}" alt="" decoding="async">
          <figcaption class="lcx-panel__badge" aria-hidden="true"><span>Stage</span><strong id="lcx-num">01</strong></figcaption>
        </figure>
        <div class="lcx-panel__body">
          <div class="lcx-panel__meta">
            <span class="lcx-panel__stage" id="lcx-stage"></span>
            <span class="lcx-panel__time" id="lcx-time"></span>
          </div>
          <h3 id="lcx-title"></h3>
          <div class="lcx-progress" aria-hidden="true"><span id="lcx-progress"></span></div>
          <p class="lcx-panel__summary" id="lcx-summary"></p>
          <ul class="lcx-panel__points" id="lcx-points"></ul>
          <div class="lcx-panel__foot">
            <div class="lcx-panel__milestone">
              <small>Milestone</small>
              <strong id="lcx-milestone"></strong>
            </div>
            <div class="lcx-panel__nav">
              <button type="button" class="lcx-nav" data-lcx-step="-1" aria-label="Previous stage"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
              <button type="button" class="lcx-nav" data-lcx-step="1" aria-label="Next stage"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button>
            </div>
          </div>
        </div>
      </div>
      <template id="lcx-check">${check}</template>
    </div>

    <div class="lcx-cta fade-in-up" data-delay="100">
      <span class="lcx-cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
      <p><strong>Single-point EPC accountability</strong> — one team from factory to field, under ISO 9001 quality supervision.</p>
      <a href="#contact" class="lcx-cta__btn">Request Technical Proposal</a>
    </div>
  </div>`;
}

function initLifecycle() {
  const L = DATA.lifecycle;
  if (!L || !L.length) return;

  const tabs = Array.from(document.querySelectorAll('[data-lcx]'));
  const panel = document.getElementById('lcx-panel');
  const track = document.getElementById('lcx-track');
  const fill = document.getElementById('lcx-fill');
  const img = document.getElementById('lcx-img');
  const check = document.getElementById('lcx-check').innerHTML;
  const $ = id => document.getElementById(id);
  let current = 0;

  // Warm the image cache so switching stages doesn't flash
  L.forEach(s => { const i = new Image(); i.src = s.image; });

  function show(idx, focus) {
    idx = (idx + L.length) % L.length;
    current = idx;
    const s = L[idx];

    tabs.forEach((t, k) => {
      t.classList.toggle('is-active', k === idx);
      t.classList.toggle('is-done', k < idx);
      t.setAttribute('aria-selected', k === idx);
      t.tabIndex = k === idx ? 0 : -1;
    });
    if (focus) tabs[idx].focus();
    // Keep the active step visible when the stepper scrolls sideways on phones
    const t = tabs[idx];
    track.scrollTo({ left: t.offsetLeft - (track.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
    fill.style.width = (idx / (L.length - 1) * 100) + '%';

    panel.classList.remove('is-in');
    void panel.offsetWidth;
    panel.classList.add('is-in');
    panel.setAttribute('aria-labelledby', 'lcx-tab-' + idx);

    img.src = s.image;
    img.alt = s.title;
    $('lcx-stage').textContent = `${s.phase} of ${String(L.length).padStart(2, '0')}`;
    $('lcx-time').textContent = s.duration;
    $('lcx-title').textContent = s.title;
    $('lcx-summary').textContent = s.summary;
    $('lcx-milestone').textContent = s.milestone;
    $('lcx-num').textContent = String(idx + 1).padStart(2, '0');
    $('lcx-progress').style.width = ((idx + 1) / L.length * 100) + '%';
    $('lcx-points').innerHTML = s.points.map(p => `<li>${check}<span>${p}</span></li>`).join('');
  }

  tabs.forEach((t, k) => {
    t.addEventListener('click', () => show(k));
    t.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1, true); }
    });
  });
  document.querySelectorAll('[data-lcx-step]').forEach(b =>
    b.addEventListener('click', () => show(current + Number(b.dataset.lcxStep))));

  show(0);
}

window.Lifecycle = Lifecycle;
window.initLifecycle = initLifecycle;
