'use client';

/* Shared motion: entrance animations (fade in left / right / up) powered by anime.js, plus image parallax.
   Rendered last so its effect runs after every section has mounted, and again after each page change. */
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import anime from 'animejs';

const SELECTOR = [
  '.fade-in-left', '.fade-in-right', '.fade-in-up',
  '.anime-left', '.anime-right', '.anime-bottom',
  '.antigravity-left', '.antigravity-right', '.antigravity-bottom',
  '[data-reveal]', '[data-direction]'
].join(', ');

const settle = el => {
  el.classList.add('in');
  el.style.transform = 'none';
  el.style.opacity = '1';
};

function reveal(el, direction, delay) {
  const xFrom = direction === 'left' ? -24 : direction === 'right' ? 24 : 0;
  const yFrom = direction === 'left' || direction === 'right' ? 0 : 20;
  anime.remove(el);
  anime({
    targets: el,
    translateX: [xFrom, 0],
    translateY: [yFrom, 0],
    opacity: [0, 1],
    duration: 700,
    delay,
    easing: 'easeOutCubic',
    complete: () => settle(el)
  });
}

function getDirection(el) {
  if (el.dataset.direction) {
    const d = el.dataset.direction.toLowerCase();
    return d === 'left' || d === 'right' ? d : 'up';
  }
  if (el.matches('.fade-in-left, .anime-left, .antigravity-left')) return 'left';
  if (el.matches('.fade-in-right, .anime-right, .antigravity-right')) return 'right';
  return 'up';
}

/* Delay from data-delay, or from the CSS custom property --d (90ms per step) */
function getDelay(el) {
  if (el.dataset.delay) return parseInt(el.dataset.delay, 10) || 0;
  const d = el.style.getPropertyValue('--d');
  return d !== '' ? (parseFloat(d) || 0) * 90 : 0;
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Skip elements already revealed (e.g. the footer, which stays mounted across pages)
    const els = [...document.querySelectorAll(SELECTOR)].filter(el => !el.classList.contains('in'));
    let io;

    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(settle);
    } else {
      // Reveal once, then stop watching: content stays put while reading
      io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          reveal(el, getDirection(el), Math.min(getDelay(el), 240));
          io.unobserve(el);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px 40px 0px' });
      els.forEach(e => io.observe(e));
    }

    // Parallax
    const pars = [...document.querySelectorAll('[data-parallax]')];
    let ticking = false;
    const run = () => {
      ticking = false;
      pars.forEach(p => {
        const r = p.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const off = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
        p.style.setProperty('--py', (off * -28).toFixed(1) + 'px');
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } };
    addEventListener('scroll', onScroll, { passive: true });
    run();

    return () => {
      if (io) io.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
