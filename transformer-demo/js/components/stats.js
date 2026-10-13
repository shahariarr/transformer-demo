/* ── Minimalist Numeric Stats Bar ── */
function Stats() {
  const stats = [
    { target: 38, suffix: '+', label: 'YEARS' },
    { target: 1000, suffix: '+', label: 'EMPLOYEES', format: true },
    { target: 10000, suffix: '+', label: 'MVA CAPACITY', format: true },
    { target: 500, suffix: '+', label: 'PROJECTS' }
  ];

  const items = stats.map((s, i) => `
    <div class="stat-item" data-reveal style="--d:${i}">
      <div class="stat-num" data-target="${s.target}" data-suffix="${s.suffix}" data-format="${s.format ? 'true' : 'false'}">
        0${s.suffix}
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

  const numEls = el.querySelectorAll('[data-target]');
  if (!numEls.length) return;

  let animated = false;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      numEls.forEach(item => {
        const target = parseFloat(item.dataset.target);
        const suffix = item.dataset.suffix || '';
        const isFormat = item.dataset.format === 'true';
        const duration = 1800; // 1.8 seconds smooth count
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic curve: fast start, soft settle
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * ease);

          let displayVal = isFormat && current >= 1000 ? Number(current).toLocaleString() : current;
          item.textContent = displayVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            let finalVal = isFormat ? Number(target).toLocaleString() : target;
            item.textContent = finalVal + suffix;
          }
        }

        requestAnimationFrame(update);
      });
      observer.disconnect();
    }
  }, { threshold: 0.15 });

  observer.observe(el);
}

window.Stats = Stats;
window.initStats = initStats;
