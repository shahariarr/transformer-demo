'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

/* Numeric stats bar; counts up each time it scrolls into view */
const STATS = [
  { target: 38, suffix: '+', label: 'YEARS', format: false },
  { target: 1000, suffix: '+', label: 'EMPLOYEES', format: true },
  { target: 10000, suffix: '+', label: 'MVA CAPACITY', format: true },
  { target: 500, suffix: '+', label: 'PROJECTS', format: false }
];

export default function Stats() {
  const gridRef = useRef(null);

  useEffect(() => {
    const el = gridRef.current.closest('#stats');
    const statItems = el.querySelectorAll('.stat-item');

    function runStatsAnimation() {
      statItems.forEach((item, index) => {
        const digitsEl = item.querySelector('.stat-num__digits');
        const plusEl = item.querySelector('.stat-num__plus');
        const labelEl = item.querySelector('.stat-label');
        const { target, format: isFormat } = STATS[index];
        const delay = index * 120;

        anime.remove(item);
        anime.remove(plusEl);
        anime.remove(labelEl);

        // Float item text up
        anime({ targets: item, opacity: [0, 1], translateY: [16, 0], duration: 700, delay, easing: 'easeOutCubic' });

        // Cinematic exponential count-up
        const counterObj = { value: 0 };
        anime({
          targets: counterObj,
          value: target,
          duration: 1900,
          delay: delay + 100,
          easing: 'easeOutExpo',
          round: 1,
          update() {
            const cur = Math.round(counterObj.value);
            digitsEl.textContent = isFormat && cur >= 1000 ? cur.toLocaleString() : cur;
          },
          complete() {
            digitsEl.textContent = isFormat ? target.toLocaleString() : target;
            anime({ targets: plusEl, scale: [1, 1.12, 1], duration: 400, easing: 'easeOutBack' });
          }
        });

        // Letter-spacing reveal
        anime({ targets: labelEl, opacity: [0, 1], letterSpacing: ['0.04em', '0.12em'], duration: 1200, delay: delay + 200, easing: 'easeOutCubic' });
      });
    }

    function resetStats() {
      statItems.forEach(item => {
        anime.remove(item);
        anime.remove(item.querySelector('.stat-num__plus'));
        item.style.opacity = '0';
        item.style.transform = 'translate3d(0, 16px, 0)';
        item.querySelector('.stat-num__digits').textContent = '0';
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? runStatsAnimation() : resetStats();
    }, { threshold: 0.15, rootMargin: '0px 0px -4% 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="wrap">
      <div className="stats-grid" ref={gridRef}>
        {STATS.map((s, i) => (
          <div className="stat-item" data-stat={i} key={s.label}>
            <div className="stat-num" data-target={s.target} data-suffix={s.suffix} data-format={String(s.format)}>
              <span className="stat-num__digits">0</span><span className="stat-num__plus">{s.suffix}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
