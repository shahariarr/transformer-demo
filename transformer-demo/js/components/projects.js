function Projects() {
  const cards = DATA.projects.map((p, i) => `
    <article class="proj ${i === 0 ? 'proj--feature' : ''}">
      <div class="proj__img">${Media(p, { reveal: false })}<span class="badge">Illustrative example</span></div>
      <div class="proj__body">
        <p class="cat">${p.cat}</p>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="loc"><span>Location:</span> ${p.location}</p>
        <button type="button" class="link" data-project="${i}">View Project<span class="sr-only">: ${p.title}</span></button>
      </div>
    </article>`).join('');
  return `<div class="wrap">
    <div class="proj-head">
      ${SectionHead({ label: 'OUR PROJECT PORTFOLIO', title: 'Engineering in Action',
        desc: 'Explore project examples demonstrating the planning, equipment, installation, and commissioning involved in power infrastructure delivery.' })}
      <div class="proj-nav" aria-label="Scroll projects">
        <button type="button" data-proj-dir="-1" aria-label="Previous projects"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button>
        <button type="button" data-proj-dir="1" aria-label="Next projects"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>
      </div>
    </div>
    <p class="demo-note" data-reveal>These are demonstration entries, not projects completed by the company.</p>
  </div>
  <div class="proj-track" tabindex="0" role="region" aria-label="Project examples, scrollable">${cards}</div>`;
}
function initProjects() {
  const track = document.querySelector('.proj-track');
  document.querySelectorAll('[data-proj-dir]').forEach(b => b.addEventListener('click', () => {
    const card = track.querySelector('.proj:nth-child(2)') || track.firstElementChild;
    const step = card.getBoundingClientRect().width + 24;
    track.scrollBy({ left: step * Number(b.dataset.projDir), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
}
