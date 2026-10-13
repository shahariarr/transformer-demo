function Header() {
  const links = SITE.nav.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join('');
  return `
  <div class="header__inner">
    <a class="brand" href="#home" aria-label="${SITE.name} home">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M13.5 2 5 13.5h6L10 22l9-12h-6z" fill="currentColor"/></svg>
      <span>${SITE.name}</span>
    </a>
    <nav id="nav" class="nav" aria-label="Primary">
      <ul>${links}</ul>
      <a class="btn btn--primary btn--sm nav__cta" href="#contact">Discuss Your Project</a>
    </nav>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span></button>
  </div>`;
}
function initHeader() {
  const h = document.getElementById('site-header');
  const btn = h.querySelector('.nav-toggle');
  const setOpen = open => {
    h.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setOpen(!h.classList.contains('is-open')));
  h.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  const onScroll = () => h.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  // Active item = the section crossing a line ~40% down the viewport
  const links = [...h.querySelectorAll('.nav ul a')];
  const secs = links.map(a => document.querySelector(a.getAttribute('href')));
  const spy = () => {
    const y = innerHeight * 0.4; let cur = 0;
    secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= y) cur = i; });
    links.forEach((a, i) => i === cur ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
  };
  spy(); addEventListener('scroll', spy, { passive: true }); addEventListener('resize', spy);
}
