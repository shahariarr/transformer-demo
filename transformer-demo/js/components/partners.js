/* ── Our Partners – exact inline SVG logos, JS infinite marquee ── */
const PARTNERS = [
  /* ─── Certification & Accreditation marks ─────────────────────── */
  {
    name: 'UL', color: '#CC0000',
    svg: `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="53" stroke="currentColor" stroke-width="7"/>
      <text x="60" y="83" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="currentColor">UL</text>
      <circle cx="107" cy="16" r="11" fill="currentColor"/>
      <text x="107" y="20.5" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="900" fill="white">R</text>
    </svg>`
  },
  {
    name: 'IAF', color: '#00308F',
    svg: `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="56" r="52" stroke="currentColor" stroke-width="5"/>
      <circle cx="56" cy="56" r="41" stroke="currentColor" stroke-width="2" opacity="0.35"/>
      <text x="56" y="36" text-anchor="middle" font-family="Arial,sans-serif" font-size="8.5" font-weight="700" letter-spacing="0.8" fill="currentColor">INTERNATIONAL</text>
      <text x="56" y="64" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="26" font-weight="900" fill="currentColor">IAF</text>
      <text x="56" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" fill="currentColor">ACCREDITATION</text>
      <text x="56" y="91" text-anchor="middle" font-family="Arial,sans-serif" font-size="7.5" font-weight="700" fill="currentColor">FORUM</text>
    </svg>`
  },
  {
    name: 'ILAC MRA', color: '#00308F',
    svg: `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="56" cy="56" r="52" stroke="currentColor" stroke-width="4"/>
      <!-- concentric arcs from top-left emanating rightward -->
      <path d="M24 88 A45 45 0 0 1 88 24" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
      <path d="M30 88 A35 35 0 0 1 88 30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 88 A24 24 0 0 1 88 38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M48 88 A14 14 0 0 1 88 48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
      <text x="56" y="104" text-anchor="middle" font-family="Arial,sans-serif" font-size="0" fill="currentColor"/>
      <text x="20" y="60" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor" transform="rotate(-45 20 60)">ilac</text>
      <text x="66" y="100" font-family="Arial,sans-serif" font-size="11" font-weight="800" fill="currentColor">MRA</text>
    </svg>`
  },
  {
    name: 'CCC', color: '#1a1a1a',
    svg: `<svg viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="55" rx="60" ry="50" stroke="currentColor" stroke-width="6"/>
      <text x="65" y="77" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="54" font-weight="900" fill="currentColor">CCC</text>
    </svg>`
  },
  {
    name: 'MA', color: '#CC0000',
    svg: `<svg viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="65" cy="45" rx="58" ry="37" stroke="currentColor" stroke-width="7"/>
      <text x="65" y="64" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="currentColor">MA</text>
    </svg>`
  },
  {
    name: 'CNAS', color: '#003087',
    svg: `<svg viewBox="0 0 130 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- circular arrow -->
      <path d="M18 58 A48 48 0 1 1 96 96" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>
      <polygon points="88,108 98,90 112,104" fill="currentColor"/>
      <text x="65" y="66" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="30" font-weight="900" fill="currentColor">CNAS</text>
    </svg>`
  },
  {
    name: 'CHINT', color: '#003087',
    svg: `<svg viewBox="0 0 185 65" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">CH</text>
      <text x="108" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="#CC0000">I</text>
      <text x="124" y="55" font-family="Arial Black,Impact,sans-serif" font-size="55" font-weight="900" fill="currentColor">NT</text>
    </svg>`
  },
  /* ─── Partner Companies ────────────────────────────────────────── */
  {
    name: 'ABB', color: '#FF0000',
    svg: `<svg viewBox="0 0 115 65" xmlns="http://www.w3.org/2000/svg">
      <text x="58" y="54" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="56" font-weight="900" fill="currentColor">ABB</text>
    </svg>`
  },
  {
    name: 'Schneider Electric', color: '#3DCD58',
    svg: `<svg viewBox="0 0 230 68" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="12" width="11" height="34" rx="2" fill="currentColor"/>
      <text x="22" y="38" font-family="Arial,Helvetica,sans-serif" font-size="23" font-weight="700" fill="currentColor">Schneider</text>
      <text x="22" y="60" font-family="Arial,Helvetica,sans-serif" font-size="16" font-weight="500" font-style="italic" fill="currentColor">Electric</text>
    </svg>`
  },
  {
    name: 'Siemens', color: '#009999',
    svg: `<svg viewBox="0 0 195 55" xmlns="http://www.w3.org/2000/svg">
      <text x="97" y="43" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="31" font-weight="800" letter-spacing="3" fill="currentColor">SIEMENS</text>
    </svg>`
  },
  {
    name: 'ISO', color: '#CC0000',
    svg: `<svg viewBox="0 0 126 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="124" height="78" rx="6" fill="currentColor"/>
      <text x="63" y="57" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-size="52" font-weight="900" fill="white">ISO</text>
    </svg>`
  },
  {
    name: 'State Grid China', color: '#006633',
    svg: `<svg viewBox="0 0 200 85" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="42" r="33" stroke="currentColor" stroke-width="4" fill="none"/>
      <ellipse cx="38" cy="42" rx="17" ry="33" stroke="currentColor" stroke-width="2.5" fill="none"/>
      <line x1="5" y1="42" x2="71" y2="42" stroke="currentColor" stroke-width="2.5"/>
      <line x1="8" y1="24" x2="68" y2="24" stroke="currentColor" stroke-width="1.5"/>
      <line x1="8" y1="60" x2="68" y2="60" stroke="currentColor" stroke-width="1.5"/>
      <text x="82" y="32" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">STATE GRID</text>
      <text x="82" y="48" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CORPORATION</text>
      <text x="82" y="64" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">OF CHINA</text>
    </svg>`
  },
  {
    name: 'China Southern Power Grid', color: '#003087',
    svg: `<svg viewBox="0 0 210 82" xmlns="http://www.w3.org/2000/svg">
      <!-- Three power lines (≡ style mark) -->
      <line x1="4" y1="20" x2="48" y2="20" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="38" x2="58" y2="38" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <line x1="4" y1="56" x2="36" y2="56" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
      <text x="68" y="34" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">CHINA SOUTHERN</text>
      <text x="68" y="52" font-family="Arial,sans-serif" font-size="12" font-weight="800" fill="currentColor">POWER GRID</text>
    </svg>`
  },
];

function _partnerCard(p) {
  return `<div class="partner-logo" style="--brand:${p.color}" title="${p.name}">${p.svg}</div>`;
}

function Partners() {
  const logos = PARTNERS.map(_partnerCard).join('');
  return `<div class="wrap">
    ${SectionHead({ label: 'OUR PARTNERS', title: 'Trusted by Industry Leaders',
      desc: 'We collaborate with world-class manufacturers and certification bodies to deliver reliable power solutions.' })}
  </div>
  <div class="partners-wrap fade-in-up" aria-label="Partner logos" data-delay="100">
    <div class="partners-inner" id="partners-inner">
      <div class="partners-row" id="partners-row">${logos}</div>
    </div>
  </div>`;
}

function initPartners() {
  const inner = document.getElementById('partners-inner');
  const row   = document.getElementById('partners-row');
  if (!inner || !row) return;

  const clone = row.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  inner.appendChild(clone);

  let x = 0;
  let paused = false;
  const speed = 0.5;

  inner.addEventListener('mouseenter', () => { paused = true; });
  inner.addEventListener('mouseleave', () => { paused = false; });

  function tick() {
    if (!paused) {
      x -= speed;
      if (Math.abs(x) >= row.offsetWidth) x = 0;
      inner.style.transform = `translateX(${x}px)`;
    }
    requestAnimationFrame(tick);
  }

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(tick);
  }
}
