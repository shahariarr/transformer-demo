function Lifecycle() {
  const L = DATA.lifecycle, pad = n => String(n + 1).padStart(2, '0');
  const steps = L.map((s, i) => `
    <li class="lc__step">
      <button type="button" class="lc__node" data-stage="${i}" aria-label="Stage ${i + 1}: ${s.title}"><span>${pad(i)}</span></button>
      <h3 class="lc__title">${s.title}</h3>
      <ul class="lc__body">${s.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </li>`).join('');
  return `<div class="wrap">
    ${SectionHead({ label: 'FROM CONCEPT TO COMMISSIONING', title: 'The Project Lifecycle',
      desc: 'Every successful infrastructure project follows a coordinated sequence of engineering, procurement, implementation, and verification.' })}
    <div class="lc" id="lc">
      <ol class="lc__track">${steps}</ol>
      <div class="lc__panel" aria-live="polite"></div>
    </div>
    <p class="demo-note demo-note--dark">A demonstration workflow, not an approved company procedure. Edit stages in js/data.js.</p>
  </div>`;
}
function initLifecycle() {
  const root = document.getElementById('lc'), L = DATA.lifecycle;
  const steps = [...root.querySelectorAll('.lc__step')], panel = root.querySelector('.lc__panel');
  steps.forEach((s, i) => s.style.setProperty('--i', i));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  const set = i => {
    steps.forEach((s, k) => {
      s.classList.toggle('is-done', k < i);
      s.classList.toggle('is-active', k === i);
      s.querySelector('.lc__node').setAttribute('aria-current', k === i ? 'step' : 'false');
    });
    panel.innerHTML = `<p class="lc__kicker">Stage ${String(i + 1).padStart(2, '0')} of ${String(L.length).padStart(2, '0')}</p>
      <h3>${L[i].title}</h3><p>${L[i].summary}</p><ul>${L[i].points.map(p => `<li>${p}</li>`).join('')}</ul>`;
  };
  set(0);
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-stage]'); if (!b) return;
    clearInterval(timer); set(Number(b.dataset.stage));
  });
  // Runs once when first visible: stages light up in order, then rest on the last stage.
  new IntersectionObserver((en, ob) => {
    if (!en[0].isIntersecting) return; ob.disconnect();
    root.classList.add('in');
    if (reduce) return;
    let i = 0; timer = setInterval(() => { set(++i); if (i >= L.length - 1) clearInterval(timer); }, 650);
  }, { threshold: 0.15 }).observe(root);
}
