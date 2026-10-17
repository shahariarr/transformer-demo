/* Shared motion: Antigravity Entrance Animation (Fade In Left / Right / Up) powered by Anime.js.
   Works seamlessly across all sections, repeatable on every scroll, preserving exact original design and alignment. */

/**
 * Universal Antigravity Entrance Animation using Anime.js (v4 / v3 compatible)
 * @param {HTMLElement|string} target 
 * @param {'left'|'right'|'up'|'bottom'} direction 
 * @param {number} delay 
 */
function runAntigravityAnimation(target, direction = 'up', delay = 0) {
  const isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    const els = typeof target === 'string' ? document.querySelectorAll(target) : [target];
    els.forEach(el => {
      if (el && el.style) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    return;
  }

  let xFrom = 0, yFrom = 0;
  if (direction === 'left') {
    xFrom = -24;
  } else if (direction === 'right') {
    xFrom = 24;
  } else {
    // 'up' or 'bottom'
    yFrom = 20;
  }

  // 1. Anime.js v4 syntax check
  if (typeof window.animate === 'function') {
    window.animate(target, {
      x: [xFrom, 0],
      y: [yFrom, 0],
      opacity: [0, 1],
      duration: 700,
      delay: delay,
      ease: 'outCubic',
      onComplete: () => {
        const els = typeof target === 'string' ? document.querySelectorAll(target) : [target];
        els.forEach(el => {
          if (el && el.style) {
            el.classList.add('in');
            el.style.transform = 'none';
            el.style.opacity = '1';
          }
        });
      }
    });
    return;
  }

  // 2. Anime.js v3 syntax fallback (using bundled anime.min.js)
  if (typeof window.anime === 'function') {
    window.anime.remove(target);
    window.anime({
      targets: target,
      translateX: [xFrom, 0],
      translateY: [yFrom, 0],
      opacity: [0, 1],
      duration: 700,
      delay: delay,
      easing: 'easeOutCubic',
      complete: () => {
        const els = typeof target === 'string' ? document.querySelectorAll(target) : [target];
        els.forEach(el => {
          if (el && el.style) {
            el.classList.add('in');
            el.style.transform = 'none';
            el.style.opacity = '1';
          }
        });
      }
    });
    return;
  }

  // 3. Native CSS Fallback if Anime.js is not loaded
  const els = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  els.forEach(el => {
    if (el) {
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('in');
    }
  });
}

/**
 * Resets an element to its initial hidden state when scrolled out of view.
 */
function resetAntigravityElement(el, direction = 'up') {
  if (!el) return;
  if (typeof window.anime === 'function') {
    window.anime.remove(el);
  }
  let xFrom = 0, yFrom = 0;
  if (direction === 'left') {
    xFrom = -24;
  } else if (direction === 'right') {
    xFrom = 24;
  } else {
    yFrom = 20;
  }

  el.classList.remove('in');
  el.style.opacity = '0';
  el.style.transform = `translate3d(${xFrom}px, ${yFrom}px, 0)`;
}

/**
 * Determines element entrance direction.
 * • বাম থেকে আসলে: Fade In Left
 * • ডান থেকে আসলে: Fade In Right
 * • নিচ থেকে আসলে: Fade In Up
 */
function getTargetDirection(el) {
  if (el.dataset.direction) {
    const d = el.dataset.direction.toLowerCase();
    if (d === 'left') return 'left';
    if (d === 'right') return 'right';
    return 'up';
  }
  if (el.matches('.fade-in-left, .anime-left, .antigravity-left')) return 'left';
  if (el.matches('.fade-in-right, .anime-right, .antigravity-right')) return 'right';
  if (el.matches('.fade-in-up, .anime-bottom, .antigravity-bottom')) return 'up';
  return 'up';
}

/**
 * Calculates entrance delay based on data-delay or CSS custom property --d.
 */
function getTargetDelay(el) {
  if (el.dataset.delay) return parseInt(el.dataset.delay, 10) || 0;
  const dVal = el.style.getPropertyValue('--d');
  if (dVal !== '') return (parseFloat(dVal) || 0) * 90;
  return 0;
}

function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selector = [
    '.fade-in-left', '.fade-in-right', '.fade-in-up',
    '.anime-left', '.anime-right', '.anime-bottom',
    '.antigravity-left', '.antigravity-right', '.antigravity-bottom',
    '[data-reveal]', '[data-direction]'
  ].join(', ');

  const els = document.querySelectorAll(selector);

  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(e => {
      e.style.opacity = '1';
      e.style.transform = 'none';
      e.classList.add('in');
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const dir = getTargetDirection(el);
        const delay = getTargetDelay(el);

        // Reveal once, then stop watching: content stays put while reading
        if (entry.isIntersecting) {
          runAntigravityAnimation(el, dir, Math.min(delay, 240));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 40px 0px' });

    els.forEach(e => io.observe(e));
  }

  // Parallax handling
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

// Expose helpers globally
window.runAntigravityAnimation = runAntigravityAnimation;
window.initMotion = initMotion;
