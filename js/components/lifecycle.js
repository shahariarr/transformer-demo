/* ── From Concept to Commissioning: stages as nodes on an energised power line + detail card ── */

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

/* Circuit geometry (SVG user units). Nodes alternate low/high along a wave. */
const LCV_W = 1200, LCV_H = 300;
function lcvPoints(n) {
  return Array.from({ length: n }, (_, i) => [90 + i * ((LCV_W - 180) / (n - 1)), i % 2 ? 92 : 208]);
}
function lcvSegments(pts) {
  const d = (pts[1][0] - pts[0][0]) / 2;
  return pts.slice(1).map((p, i) => {
    const [x0, y0] = pts[i];
    return `C ${x0 + d} ${y0}, ${p[0] - d} ${p[1]}, ${p[0]} ${p[1]}`;
  });
}

function Lifecycle() {
  const L = DATA.lifecycle;
  const pad = n => String(n).padStart(2, '0');
  const pts = lcvPoints(L.length);
  const path = `M ${pts[0][0]} ${pts[0][1]} ` + lcvSegments(pts).join(' ');
  const arrow = d => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

  const nodes = L.map((s, i) => `
        <button type="button" class="lcv-node ${i % 2 ? 'is-up' : 'is-down'}${i === 0 ? ' is-active' : ''}" data-lcv="${i}"
                style="left:${(pts[i][0] / LCV_W * 100).toFixed(3)}%;top:${(pts[i][1] / LCV_H * 100).toFixed(3)}%"
                aria-pressed="${i === 0}" aria-label="${s.phase}: ${s.title}">
          <span class="lcv-node__dot">${STAGE_ICONS[i] || STAGE_ICONS[0]}</span>
          <span class="lcv-node__label"><b>${pad(i + 1)}</b>${s.chipText}</span>
        </button>`).join('');

  return `
  <div class="wrap">
    <div class="lc-head">
      ${SectionHead({
        label: 'FROM CONCEPT TO COMMISSIONING',
        title: 'The Complete Project Lifecycle',
        desc: 'A coordinated 7-stage turnkey methodology — from first requirement to grid energisation and lifecycle care.'
      })}
      <ul class="lc-pills fade-in-right" data-delay="120">
        <li><strong>${pad(L.length)}</strong><span>Delivery stages</span></li>
        <li><strong>01</strong><span>Accountable team</span></li>
        <li><strong>ISO</strong><span>9001 supervised</span></li>
      </ul>
    </div>

    <div class="lcv-circuit fade-in-up">
      <p class="lcv-circuit__tag"><span class="lcv-live-dot" aria-hidden="true"></span>Energisation path</p>
      <p class="lcv-circuit__status" aria-live="polite"><span id="lcv-status">${pad(1)}</span> / ${pad(L.length)} energised</p>
      <div class="lcv-scroll" id="lcv-scroll">
        <div class="lcv-canvas">
          <svg viewBox="0 0 ${LCV_W} ${LCV_H}" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="lcv-grad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stop-color="#5FB0FF"/><stop offset=".6" stop-color="#9AD0FF"/><stop offset="1" stop-color="#F28C28"/>
              </linearGradient>
            </defs>
            <path class="lcv-base" d="${path}"/>
            <path class="lcv-live" id="lcv-live" d="${path}"/>
          </svg>
          <span class="lcv-spark" id="lcv-spark" aria-hidden="true"></span>
          ${nodes}
        </div>
      </div>
    </div>

    <article class="lcv-detail" id="lcv-detail" aria-live="polite">
      <figure class="lcv-detail__media">
        <img id="lcv-img" src="${L[0].image}" alt="${L[0].title}" decoding="async">
        <span class="lcv-detail__no" id="lcv-no" aria-hidden="true">01</span>
      </figure>
      <div class="lcv-detail__body">
        <div class="lcv-detail__chips">
          <span class="lcv-chip lcv-chip--phase" id="lcv-phase">${L[0].phase}</span>
          <span class="lcv-chip" id="lcv-time">${L[0].duration}</span>
        </div>
        <h3 id="lcv-title">${L[0].title}</h3>
        <p class="lcv-detail__tag" id="lcv-tag">${L[0].tagline || ''}</p>
        <p class="lcv-detail__summary" id="lcv-summary">${L[0].summary}</p>
        <ul class="lcv-detail__points" id="lcv-points"></ul>
      </div>
      <aside class="lcv-detail__side">
        <div class="lcv-ring" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs><linearGradient id="lcv-ring-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5FB0FF"/><stop offset="1" stop-color="#F28C28"/></linearGradient></defs>
            <circle cx="60" cy="60" r="52" class="lcv-ring__track"/>
            <circle cx="60" cy="60" r="52" class="lcv-ring__bar" id="lcv-ring"/>
          </svg>
          <span><b id="lcv-ring-num">01</b><small>of ${pad(L.length)}</small></span>
        </div>
        <div class="lcv-milestone">
          <small>Milestone</small>
          <strong id="lcv-milestone">${L[0].milestone}</strong>
        </div>
        <div class="lcv-nav">
          <button type="button" data-lcv-step="-1" aria-label="Previous stage">${arrow('M15 18l-6-6 6-6')}</button>
          <button type="button" data-lcv-step="1" aria-label="Next stage">${arrow('M9 18l6-6-6-6')}</button>
        </div>
      </aside>
    </article>

    <div class="lcx-cta fade-in-up" data-delay="100">
      <span class="lcx-cta__icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
      <p><strong>Single-point EPC accountability</strong> — one team from factory to field, under ISO 9001 quality supervision.</p>
      <a href="#contact" class="lcx-cta__btn">Request Technical Proposal</a>
    </div>
  </div>`;
}

function initLifecycle() {
  const L = DATA.lifecycle;
  const live = document.getElementById('lcv-live');
  if (!L || !L.length || !live) return;

  const $ = id => document.getElementById(id);
  const pad = n => String(n).padStart(2, '0');
  const nodes = [...document.querySelectorAll('.lcv-node')];
  const detail = $('lcv-detail'), spark = $('lcv-spark'), ring = $('lcv-ring'), scroller = $('lcv-scroll');
  const circuit = document.querySelector('.lcv-circuit');
  const check = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RC = 2 * Math.PI * 52;
  let current = 0, timer = null, userPicked = false, visible = false, hovered = false;

  // Path length up to each node, so the energised stroke stops exactly on it
  const pts = lcvPoints(L.length), segs = lcvSegments(pts);
  const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  live.parentNode.appendChild(probe);
  const upTo = pts.map((p, i) => {
    if (!i) return 0;
    probe.setAttribute('d', `M ${pts[0][0]} ${pts[0][1]} ` + segs.slice(0, i).join(' '));
    return probe.getTotalLength();
  });
  probe.remove();
  const total = live.getTotalLength();
  live.style.strokeDasharray = `${total} ${total}`;
  live.style.strokeDashoffset = total;
  ring.style.strokeDasharray = RC;
  L.forEach(s => { const i = new Image(); i.src = s.image; });

  // A spark of current runs along the energised part of the line
  let t0 = performance.now();
  function runSpark(now) {
    const len = upTo[current];
    if (!reduce && len > 0 && visible) {
      const t = ((now - t0) % 2200) / 2200;
      const e = 1 - Math.pow(1 - t, 3);
      const p = live.getPointAtLength(len * e);
      spark.style.left = (p.x / LCV_W * 100) + '%';
      spark.style.top = (p.y / LCV_H * 100) + '%';
      spark.style.opacity = t > .85 ? (1 - t) / .15 : 1;
    } else {
      spark.style.opacity = 0;
    }
    requestAnimationFrame(runSpark);
  }
  requestAnimationFrame(runSpark);

  function show(idx) {
    current = (idx + L.length) % L.length;
    const s = L[current];
    nodes.forEach((n, k) => {
      n.classList.toggle('is-active', k === current);
      n.classList.toggle('is-done', k < current);
      n.setAttribute('aria-pressed', k === current);
    });
    live.style.strokeDashoffset = total - upTo[current];
    ring.style.strokeDashoffset = RC * (1 - (current + 1) / L.length);
    t0 = performance.now();

    $('lcv-status').textContent = pad(current + 1);
    $('lcv-ring-num').textContent = pad(current + 1);
    $('lcv-no').textContent = pad(current + 1);
    $('lcv-phase').textContent = s.phase;
    $('lcv-time').textContent = s.duration;
    $('lcv-title').textContent = s.title;
    $('lcv-tag').textContent = s.tagline || '';
    $('lcv-summary').textContent = s.summary;
    $('lcv-milestone').textContent = s.milestone;
    $('lcv-points').innerHTML = s.points.map(p => `<li>${check}<span>${p}</span></li>`).join('');
    const img = $('lcv-img'); img.src = s.image; img.alt = s.title;
    detail.classList.remove('is-in'); void detail.offsetWidth; detail.classList.add('is-in');

    // On phones the circuit scrolls sideways: keep the active node centred
    if (scroller.scrollWidth > scroller.clientWidth) {
      const n = nodes[current];
      scroller.scrollTo({ left: n.offsetLeft - scroller.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
  }

  function schedule() {
    clearInterval(timer);
    if (!userPicked && visible && !hovered && !reduce) timer = setInterval(() => show(current + 1), 6000);
  }
  const pick = k => { userPicked = true; clearInterval(timer); show(k); };

  nodes.forEach((n, k) => {
    n.addEventListener('click', () => pick(k));
    n.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); pick(current + 1); nodes[current].focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); pick(current - 1); nodes[current].focus(); }
    });
  });
  document.querySelectorAll('[data-lcv-step]').forEach(b =>
    b.addEventListener('click', () => pick(current + Number(b.dataset.lcvStep))));
  [circuit, detail].forEach(el => {
    el.addEventListener('mouseenter', () => { hovered = true; clearInterval(timer); });
    el.addEventListener('mouseleave', () => { hovered = false; schedule(); });
  });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }, { threshold: .25 }).observe(circuit);

  show(0);
}

window.Lifecycle = Lifecycle;
window.initLifecycle = initLifecycle;
