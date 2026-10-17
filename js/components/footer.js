function Footer() {
  const c = DATA.contact;
  const ico = (d) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const wa = `<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
  const quickLinks = [
    ['#home', 'Home'], ['#about', 'About Us'], ['#products', 'Products'],
    ['#projects', 'Projects'], ['#quality', 'Quality & Testing'], ['#faq', 'FAQ'], ['#contact', 'Contact Us']
  ];
  const products = [
    'Oil-Immersed Transformer', 'Dry Type Transformer', 'Pad Mounted Transformer',
    'Pole Mounted Transformer', 'Compact Substation', 'Hermetically Sealed Transformer'
  ];
  const list = (items) => items.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('');

  return `
  <!-- Call to action band -->
  <div class="fcta-band">
    <div class="wrap fcta-band__in">
      <h2>Ready to power your project with reliable transformers?</h2>
      <div class="fcta-band__btns">
        <a href="#contact" class="fbtn fbtn--light">Get A Quote Now</a>
        <a href="${waLink()}" target="_blank" rel="noopener" class="fbtn fbtn--line">${wa}<span>WhatsApp Us</span></a>
      </div>
    </div>
  </div>

  <div class="wrap">
    <div class="fgrid">
      <!-- Brand -->
      <div class="fgrid__brand" data-reveal style="--d: 1">
        <a href="#home" class="flogo"><img src="assets/images/logo-footer.png" alt="Basic Power Engineering Ltd. (BPEL)" width="602" height="72"></a>
        <p>${SITE.name} is an ISO 9001:2015 certified manufacturer of power and distribution transformers, compact substations and turnkey power solutions, serving utilities and industry since 1985.</p>
        <div class="fsocial" aria-label="Follow us">
          <a href="#home" aria-label="Facebook"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1z"/></svg></a>
          <a href="#home" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a href="#home" aria-label="YouTube"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z"/></svg></a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${wa}</a>
        </div>
      </div>

      <!-- Quick links -->
      <nav class="fgrid__col" aria-label="Quick links" data-reveal style="--d: 2">
        <h3>Quick Links</h3>
        <ul class="flinks">${list(quickLinks)}</ul>
      </nav>

      <!-- Products -->
      <nav class="fgrid__col" aria-label="Products" data-reveal style="--d: 3">
        <h3>Products</h3>
        <ul class="flinks">${list(products.map(p => ['#products', p]))}</ul>
      </nav>

      <!-- Contact -->
      <div class="fgrid__col" data-reveal style="--d: 4">
        <h3>Contact Us</h3>
        <ul class="finfo">
          <li>${ico('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>')}<a href="tel:${c.whatsapp}">${c.phoneDisplay}</a></li>
          <li>${ico('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>')}<a href="${mailLink()}">${c.email}</a></li>
          <li>${ico('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>')}<span>${c.address}</span></li>
          <li>${ico('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>')}<span>Mon – Fri: 08:00 – 18:00</span></li>
        </ul>
        <a href="#contact" class="finquiry"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg><span>Send Inquiry</span></a>
      </div>
    </div>
  </div>

  <!-- Copyright bar -->
  <div class="fbar">
    <div class="wrap fbar__in">
      <span>Copyright &copy; <span id="yr"></span> ${SITE.name}. All Rights Reserved.</span>
      <ul>
        <li><a href="#about">Privacy Policy</a></li>
        <li><a href="#home">Sitemap</a></li>
      </ul>
    </div>
  </div>`;
}

function initFooter() {}

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
        <path d="M5 14 A9 9 0 0 1 23 14" stroke="#0B5CAB" stroke-width="2.4" stroke-linecap="round" fill="none"/>
        <rect x="3" y="11" width="3.5" height="7.5" rx="1.7" fill="#0B5CAB"/>
        <rect x="21.5" y="11" width="3.5" height="7.5" rx="1.7" fill="#0B5CAB"/>
        <path d="M22 17 C22 21.5, 17 23.5, 14 23.5" stroke="#0B5CAB" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="13" cy="23.5" r="1.8" fill="#0B5CAB"/>
        <line x1="14" y1="10.5" x2="14" y2="8" stroke="#0B5CAB" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="14" cy="7.2" r="1.2" fill="#0B5CAB"/>
        <rect x="7.5" y="10.5" width="13" height="9.5" rx="3.5" fill="#0B5CAB"/>
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
