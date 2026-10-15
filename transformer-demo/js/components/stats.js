/* ── Minimalist Numeric Stats Bar (Exact Reference Design with Repeatable Motion) ── */
function Stats() {
  const stats = [
    { target: 38, suffix: '+', label: 'YEARS', format: false },
    { target: 1000, suffix: '+', label: 'EMPLOYEES', format: true },
    { target: 10000, suffix: '+', label: 'MVA CAPACITY', format: true },
    { target: 500, suffix: '+', label: 'PROJECTS', format: false }
  ];

  const items = stats.map((s, i) => `
    <div class="stat-item" data-stat="${i}">
      <div class="stat-num" data-target="${s.target}" data-suffix="${s.suffix}" data-format="${s.format}">
        <span class="stat-num__digits">0</span><span class="stat-num__plus">${s.suffix}</span>
      </div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  return `
  <div class="wrap">
    <div class="stats-grid">${items}</div>
  </div>`;
}

function initStats() {
  const el = document.getElementById('stats');
  if (!el) return;

  const statItems = el.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  function runStatsAnimation() {
    statItems.forEach((item, index) => {
      const numWrap = item.querySelector('.stat-num');
      const digitsEl = item.querySelector('.stat-num__digits');
      const plusEl = item.querySelector('.stat-num__plus');
      const labelEl = item.querySelector('.stat-label');
      if (!numWrap || !digitsEl) return;

      const target = parseFloat(numWrap.dataset.target) || 0;
      const isFormat = numWrap.dataset.format === 'true';
      const delay = index * 120;

      if (typeof window.anime === 'function') {
        window.anime.remove(item);
        window.anime.remove(plusEl);
        if (labelEl) window.anime.remove(labelEl);

        // Float item text up
        window.anime({
          targets: item,
          opacity: [0, 1],
          translateY: [36, 0],
          duration: 1100,
          delay: delay,
          easing: 'easeOutElastic(1, 0.78)'
        });

        // Cinematic exponential count-up
        const counterObj = { value: 0 };
        window.anime({
          targets: counterObj,
          value: target,
          duration: 1900,
          delay: delay + 100,
          easing: 'easeOutExpo',
          round: 1,
          update: function () {
            const cur = Math.round(counterObj.value);
            digitsEl.textContent = isFormat && cur >= 1000 ? cur.toLocaleString() : cur;
          },
          complete: function () {
            digitsEl.textContent = isFormat ? target.toLocaleString() : target;
            if (plusEl) {
              window.anime({
                targets: plusEl,
                scale: [1, 1.28, 1],
                duration: 400,
                easing: 'easeOutBack'
              });
            }
          }
        });

        // Letter-spacing reveal
        if (labelEl) {
          window.anime({
            targets: labelEl,
            opacity: [0, 1],
            letterSpacing: ['0.06em', '0.18em'],
            duration: 1200,
            delay: delay + 200,
            easing: 'easeOutCubic'
          });
        }
      } else {
        item.style.opacity = '1';
        item.style.transform = 'none';
        digitsEl.textContent = isFormat ? target.toLocaleString() : target;
      }
    });
  }

  function resetStats() {
    statItems.forEach(item => {
      if (typeof window.anime === 'function') {
        window.anime.remove(item);
        const plusEl = item.querySelector('.stat-num__plus');
        if (plusEl) window.anime.remove(plusEl);
      }
      item.style.opacity = '0';
      item.style.transform = 'translate3d(0, 36px, 0)';
      const digitsEl = item.querySelector('.stat-num__digits');
      if (digitsEl) digitsEl.textContent = '0';
    });
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      runStatsAnimation();
    } else {
      resetStats();
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -4% 0px' });

  observer.observe(el);
}

if (typeof window !== 'undefined') {
  window.Stats = Stats;
  window.initStats = initStats;
}
