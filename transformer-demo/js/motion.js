/* Shared motion: one reveal observer, light parallax. Everything is visible
   if JS or IntersectionObserver is unavailable (hidden states are scoped to html.js). */
function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(list => list.forEach(x => {
    if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));

  const pars = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;
  const run = () => {
    ticking = false;
    pars.forEach(p => {
      const r = p.parentNode.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const off = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;   // -1..1
      p.style.setProperty('--py', (off * -28).toFixed(1) + 'px');
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  run();
}
