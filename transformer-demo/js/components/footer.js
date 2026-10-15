function Footer() {
  const c = DATA.contact;
  return `
  <canvas class="kinetic-grid-canvas" id="footer-kinetic-grid" aria-hidden="true"></canvas>

  <div class="wrap">
    <!-- Top Consultation Callout Banner -->
    <div class="footer__banner" data-reveal>
      <div class="footer__banner-copy">
        <span class="footer__banner-tag">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Technical Engineering & Tenders
        </span>
        <h3>Need a Custom Transformer Specification?</h3>
        <p>Connect directly with our senior power engineering team for design calculation sheets, thermal ratings, compliance reviews, and turnkey delivery schedules.</p>
      </div>
      <div class="footer__banner-action">
        <a href="#contact" class="footer__banner-btn">
          <span>Request Technical Consultation</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
        <a href="${waLink()}" target="_blank" rel="noopener" class="footer__banner-btn footer__banner-btn--secondary">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span>24/7 WhatsApp Hotline</span>
        </a>
      </div>
    </div>

    <!-- Trust & Capability Metrics Ribbon -->
    <div class="footer__stats" data-reveal>
      <div class="f-stat-card">
        <div class="f-stat-num">35+</div>
        <div class="f-stat-label">Years of Innovation</div>
        <div class="f-stat-sub">Heavy power engineering since 1985</div>
      </div>
      <div class="f-stat-card">
        <div class="f-stat-num">40+</div>
        <div class="f-stat-label">Export Nations</div>
        <div class="f-stat-sub">Deployments across 4 continents</div>
      </div>
      <div class="f-stat-card">
        <div class="f-stat-num">500 MVA</div>
        <div class="f-stat-label">Testing Lab Rating</div>
        <div class="f-stat-sub">Full impulse & FAT certification</div>
      </div>
      <div class="f-stat-card">
        <div class="f-stat-num">0%</div>
        <div class="f-stat-label">Catastrophic Failures</div>
        <div class="f-stat-sub">Flawless field reliability index</div>
      </div>
    </div>

    <!-- Main 4-Column Structured Content -->
    <div class="footer__grid">
      <!-- Col 1: Corporate Profile & Credentials -->
      <div class="footer__col footer__col--brand">
        <div class="footer__name">
          <img src="${SITE.logo || 'assets/images/logo.png'}" alt="${SITE.name} Logo" class="footer__logo">
          <span>${SITE.name}</span>
        </div>
        <p class="footer__desc">Pioneering heavy power transformer manufacturing, medium-voltage distribution infrastructure, and turnkey substation engineering worldwide with certified reliability since 1985.</p>
        
        <div class="footer__status-badge">
          <span class="footer__status-dot"></span>
          <span>Emergency Dispatch: 24/7 Available</span>
        </div>

        <div class="footer__badges" aria-label="Certifications & Standards">
          <span class="f-badge">ISO 9001:2015</span>
          <span class="f-badge">IEC 60076</span>
          <span class="f-badge">IEEE C57</span>
          <span class="f-badge">CE Certified</span>
          <span class="f-badge">TÜV Tested</span>
        </div>

        <div class="footer__socials" aria-label="Social & Professional Profiles">
          <a href="#home" class="footer__social-btn" aria-label="LinkedIn Profile" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#home" class="footer__social-btn footer__social-btn--yt" aria-label="YouTube Channel" title="YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
              <polygon fill="#FFFFFF" points="9.6 15.5 15.8 12 9.6 8.5"/>
            </svg>
          </a>
          <a href="#home" class="footer__social-btn" aria-label="Engineering Directory" title="Engineering Directory">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </a>
          <a href="${waLink()}" target="_blank" rel="noopener" class="footer__social-btn" aria-label="WhatsApp Hotline" title="WhatsApp">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </div>
      </div>

      <!-- Col 2: Engineered Equipment -->
      <div class="footer__col">
        <span class="footer__col-hint">Engineered Systems</span>
        <h3>Power Equipment</h3>
        <ul class="footer__nav-list">
          <li><a href="#products">Oil-Immersed Transformers</a></li>
          <li><a href="#products">High-Voltage Substations</a></li>
          <li><a href="#products">Hermetically Sealed Units</a></li>
          <li><a href="#products">Cast Resin Dry-Type</a></li>
          <li><a href="#products">Pad-Mounted Transformers</a></li>
          <li><a href="#products">Custom Power Coils</a></li>
          <li><a href="#products">Mobile Substation Packages</a></li>
        </ul>
      </div>

      <!-- Col 3: Engineering Services -->
      <div class="footer__col">
        <span class="footer__col-hint">Lifecycle Support</span>
        <h3>Services & Solutions</h3>
        <ul class="footer__nav-list">
          <li><a href="#lifecycle">Substation Turnkey EPC</a></li>
          <li><a href="#quality">Factory Acceptance Tests (FAT)</a></li>
          <li><a href="#lifecycle">On-Site Energisation & Testing</a></li>
          <li><a href="#industries">Renewable Grid Interconnection</a></li>
          <li><a href="#quality">Thermal & DGA Oil Diagnostics</a></li>
          <li><a href="#lifecycle">Retrofit & Tap Changer Service</a></li>
          <li><a href="#contact">24/7 Field Service Support</a></li>
        </ul>
      </div>

      <!-- Col 4: Operations & Contact -->
      <div class="footer__col">
        <span class="footer__col-hint">Direct Channels</span>
        <h3>Global Operations</h3>
        <ul class="footer__contact-list">
          <li class="footer__contact-item">
            <div class="footer__contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            </div>
            <div class="footer__contact-info">
              <span class="footer__contact-title">Engineering Inquiries</span>
              <a href="${mailLink()}">${c.email}</a>
            </div>
          </li>
          <li class="footer__contact-item">
            <div class="footer__contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="footer__contact-info">
              <span class="footer__contact-title">Direct Hotline (24/7)</span>
              <a href="tel:${c.whatsapp}">${c.phoneDisplay}</a>
            </div>
          </li>
          <li class="footer__contact-item">
            <div class="footer__contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div class="footer__contact-info">
              <span class="footer__contact-title">Works & Campus</span>
              <span>${c.address}</span>
            </div>
          </li>
          <li class="footer__contact-item">
            <div class="footer__contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="footer__contact-info">
              <span class="footer__contact-title">Operations Schedule</span>
              <span>Mon – Fri: 08:00 – 18:00 | 24/7 Field Support</span>
            </div>
          </li>
        </ul>
        <div class="footer__regions">
          <strong>Global Hubs:</strong> North America • Europe • Middle East • Asia Pacific
        </div>
      </div>
    </div>

    <!-- Bottom Sub-Footer Bar -->
    <div class="footer__bottom">
      <div>&copy; <span id="yr"></span> ${SITE.name} Inc. All rights reserved. Heavy Power Systems & Electrical Transmission Infrastructure.</div>
      <ul class="footer__bottom-links">
        <li><a href="#about">Privacy Policy</a></li>
        <li><a href="#quality">ISO & Safety Standards</a></li>
        <li><a href="#contact">Compliance & Ethics</a></li>
        <li><a href="#home">Back to Top ↑</a></li>
      </ul>
    </div>
  </div>`;
}

function initFooter() {
  if (typeof initKineticGrid === 'function') {
    initKineticGrid('footer-kinetic-grid', 'footer', {
      bg: '#121316',
      lineActive: { r: 56, g: 189, b: 248, a: 0.85 },
      nodeActive: { r: 125, g: 211, b: 252, a: 1.0 },
      glow: '56,189,248',
      ripple: '125,211,252'
    });
  }
}
function FloatingActions() {
  return `
  <div class="floating-actions" id="floating-actions" aria-label="Quick Actions">
    <button type="button" class="floating-btn floating-btn--top" id="back-to-top" aria-label="Back to top" title="Back to top">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
    <a class="floating-btn floating-btn--mail" href="${mailLink()}" aria-label="Send Email" title="Send Email">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
      </svg>
    </a>
    <a class="floating-btn floating-btn--wa wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
    <button type="button" class="floating-btn floating-btn--bot" id="chatbot-toggle" aria-label="Open BPEL AI Chatbot" title="Chat with BPEL Assistant">
      <span class="bot-badge-glow" aria-hidden="true"></span>
      <span class="bot-unread-badge" aria-hidden="true">1</span>
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M5 14 A9 9 0 0 1 23 14" stroke="#E11D48" stroke-width="2.4" stroke-linecap="round" fill="none"/>
        <rect x="3" y="11" width="3.5" height="7.5" rx="1.7" fill="#E11D48"/>
        <rect x="21.5" y="11" width="3.5" height="7.5" rx="1.7" fill="#E11D48"/>
        <path d="M22 17 C22 21.5, 17 23.5, 14 23.5" stroke="#E11D48" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="13" cy="23.5" r="1.8" fill="#E11D48"/>
        <line x1="14" y1="10.5" x2="14" y2="8" stroke="#E11D48" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="14" cy="7.2" r="1.2" fill="#E11D48"/>
        <rect x="7.5" y="10.5" width="13" height="9.5" rx="3.5" fill="#E11D48"/>
        <rect x="10" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#ffffff"/>
        <rect x="15.8" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#ffffff"/>
      </svg>
    </button>
  </div>`;
}

function WhatsAppButton() {
  return FloatingActions();
}

function initWhatsApp() {
  const container = document.getElementById('floating-actions');
  const topBtn = document.getElementById('back-to-top');
  const form = document.getElementById('contact-form');

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const onScroll = () => {
    const showTop = window.scrollY > 320;
    if (topBtn) {
      topBtn.classList.toggle('is-visible', showTop);
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (form && container) {
    new IntersectionObserver(([e]) => {
      container.classList.toggle('is-hidden', e.isIntersecting);
    }, { threshold: 0 }).observe(form);
  }
}
