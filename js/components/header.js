const NAV_ICONS = {
  transformer: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M9 4v16"></path><path d="M15 4v16"></path><circle cx="9" cy="12" r="1.5" fill="currentColor"></circle><circle cx="15" cy="12" r="1.5" fill="currentColor"></circle></svg>`,
  substation: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M5 7h14"></path><path d="M7 12h10"></path><path d="M9 17h6"></path><path d="M6 21l6-19 6 19"></path></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
  settings: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  zap: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  factory: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4H2z"></path></svg>`,
  building: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="6" x2="9.01" y2="6"></line><line x1="15" y1="6" x2="15.01" y2="6"></line><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line><line x1="9" y1="14" x2="9.01" y2="14"></line><line x1="15" y1="14" x2="15.01" y2="14"></line><line x1="9" y1="18" x2="15" y2="18"></line></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  sun: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  train: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-3 3"></path><path d="M16 19l3 3"></path></svg>`,
  info: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  activity: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  'check-circle': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  cpu: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  award: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  'help-circle': `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  workflow: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"></rect><rect x="15" y="3" width="6" height="6" rx="1"></rect><rect x="9" y="15" width="6" height="6" rx="1"></rect><path d="M6 9v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9"></path><line x1="12" y1="13" x2="12" y2="15"></line></svg>`
};

const NAV_FOOTERS = {
  products: {
    text: 'Need a custom rated power transformer or tender drawing?',
    href: '#contact',
    cta: 'Request Spec / RFQ →'
  },
  industries: {
    text: 'Review completed utility & high-load industrial deployments',
    href: '#projects',
    cta: 'View Project Portfolio →'
  },
  about: {
    text: 'Learn why global utilities and industrial networks choose BPEL',
    href: '#quality',
    cta: 'Why Work With BPEL →'
  },
  resources: {
    text: 'Explore our turnkey 7-stage engineering to energisation lifecycle',
    href: '#lifecycle',
    cta: 'Turnkey EPC Stages →'
  }
};

function Header() {
  const site = (typeof window !== 'undefined' && window.SITE) ? window.SITE : (typeof SITE !== 'undefined' ? SITE : {});
  const navList = site.nav || [];
  const links = navList.map(n => {
    const hasDropdown = Array.isArray(n.children) && n.children.length > 0;
    const key = n.label.toLowerCase();

    if (!hasDropdown) {
      return `
        <li class="nav-item">
          <a href="${n.href}" class="nav-link nav-link--top" data-nav-link="${key}">
            <span class="nav-link__dot" aria-hidden="true"></span>
            <span class="nav-link__text">${n.label}</span>
          </a>
        </li>
      `;
    }

    const itemsHtml = n.children.map(c => `
      <a href="${c.href}" class="dropdown-item" role="menuitem">
        <span class="dropdown-item__icon" aria-hidden="true">${NAV_ICONS[c.icon] || NAV_ICONS.zap}</span>
        <span class="dropdown-item__content">
          <span class="dropdown-item__title">${c.title}</span>
          <span class="dropdown-item__desc">${c.desc}</span>
        </span>
      </a>
    `).join('');

    const footer = NAV_FOOTERS[key];
    const footerHtml = footer ? `
      <div class="dropdown-menu__footer">
        <span class="dropdown-menu__footer-text">${footer.text}</span>
        <a href="${footer.href}" class="dropdown-menu__footer-link">${footer.cta}</a>
      </div>
    ` : '';

    const isTwoCol = n.children.length > 4;

    return `
      <li class="nav-item nav-item--has-dropdown" data-dropdown="${key}">
        <div class="nav-item__head">
          <a href="${n.href}" class="nav-link nav-link--top nav-link--has-sub" data-nav-link="${key}" aria-expanded="false" aria-haspopup="true">
            <span class="nav-link__dot" aria-hidden="true"></span>
            <span class="nav-link__text">${n.label}</span>
            <svg class="nav-chevron" viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="4 6 8 10 12 6"></polyline>
            </svg>
          </a>
          <button type="button" class="nav-dropdown-toggle" aria-label="Toggle ${n.label} submenu" aria-expanded="false">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="4 6 8 10 12 6"></polyline>
            </svg>
          </button>
        </div>

        <div class="dropdown-menu dropdown-menu--${key} ${isTwoCol ? 'dropdown-menu--wide' : ''}" role="menu" aria-label="${n.label} submenu">
          <div class="dropdown-menu__header">
            <span class="dropdown-menu__tag">${n.label}</span>
            <a href="${n.href}" class="dropdown-menu__all-link">
              <span>Overview</span>
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="3" y1="8" x2="13" y2="8"></line>
                <polyline points="9 4 13 8 9 12"></polyline>
              </svg>
            </a>
          </div>
          <div class="dropdown-menu__grid ${isTwoCol ? 'dropdown-menu__grid--2col' : ''}">
            ${itemsHtml}
          </div>
          ${footerHtml}
        </div>
      </li>
    `;
  }).join('');

  return `
  <div class="header-shell">
    <div class="header__inner">
      <a class="brand" href="#home" aria-label="${site.name || 'BPEL'} home">
        <img src="${site.logo || 'assets/images/logo.png'}" alt="${site.name || 'BPEL'} Logo" class="brand__logo">
      </a>

      <nav id="nav" class="nav" aria-label="Primary navigation">
        <ul class="nav__list">${links}</ul>
        <a class="header-quote-btn nav__cta nav__cta--mobile" href="#contact">
          <span class="header-quote-btn__text">GET A QUOTE</span>
          <span class="header-quote-btn__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
      </nav>

      <div class="header__actions">
        <button type="button" class="search-btn" id="search-trigger" aria-label="Search specifications" title="Search (Ctrl + K)">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span class="search-btn__text">Search</span>
          <kbd class="search-btn__kbd">Ctrl K</kbd>
        </button>

        <a class="header-quote-btn nav__cta--desktop" href="#contact" aria-label="Get a custom power transformer quote">
          <span class="header-quote-btn__text">GET A QUOTE</span>
          <span class="header-quote-btn__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>

        <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu">
          <span></span>
        </button>
      </div>
    </div>
  </div>`;
}

function initHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  const btn = h.querySelector('.nav-toggle');

  const setOpen = open => {
    h.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    if (btn) {
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    if (!open) {
      // Close all mobile accordion submenus when closing drawer
      h.querySelectorAll('.nav-item--has-dropdown.is-open').forEach(item => {
        item.classList.remove('is-open');
        const trigger = item.querySelector('.nav-dropdown-toggle');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  };

  if (btn) {
    btn.addEventListener('click', () => setOpen(!h.classList.contains('is-open')));
  }

  // Mobile accordion toggle buttons
  h.querySelectorAll('.nav-dropdown-toggle').forEach(toggleBtn => {
    toggleBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = toggleBtn.closest('.nav-item--has-dropdown');
      if (!parentItem) return;
      const isOpen = parentItem.classList.contains('is-open');
      // Close other open accordions
      h.querySelectorAll('.nav-item--has-dropdown.is-open').forEach(other => {
        if (other !== parentItem) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.nav-dropdown-toggle');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
      parentItem.classList.toggle('is-open', !isOpen);
      toggleBtn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // Clicking on any leaf link inside the menu closes the mobile drawer
  h.querySelectorAll('.dropdown-item, .dropdown-menu__all-link, .dropdown-menu__footer-link, .nav-link:not(.nav-link--has-sub)').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  // On touch/mobile: tapping parent link can toggle submenu if drawer is open
  h.querySelectorAll('.nav-link--has-sub').forEach(a => {
    a.addEventListener('click', e => {
      if (window.innerWidth <= 1024) {
        // In mobile view, clicking the parent heading toggles the accordion
        e.preventDefault();
        const parentItem = a.closest('.nav-item--has-dropdown');
        if (parentItem) {
          const toggleBtn = parentItem.querySelector('.nav-dropdown-toggle');
          if (toggleBtn) toggleBtn.click();
        }
      } else {
        // Desktop: clicking navigates and closes any focused dropdown
        setOpen(false);
      }
    });
  });

  // Close menus on Escape key
  addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Header scroll appearance
  const onScroll = () => h.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // Active top-level item spy (~40% down viewport)
  const topLinks = [...h.querySelectorAll('.nav__list > .nav-item > .nav-item__head > .nav-link--top, .nav__list > .nav-item > .nav-link--top')];
  const secs = topLinks.map(a => document.querySelector(a.getAttribute('href')));
  const spy = () => {
    const y = innerHeight * 0.4;
    let cur = 0;
    secs.forEach((s, i) => {
      if (s && s.getBoundingClientRect().top <= y) cur = i;
    });
    topLinks.forEach((a, i) => {
      if (i === cur) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };
  spy();
  addEventListener('scroll', spy, { passive: true });
  addEventListener('resize', spy);
}
