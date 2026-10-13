const HIGHLIGHTS = [
  { t: 'Engineering Excellence', d: 'Design, calculation and specification handled with care for each site.',
    i: '<path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" />' },
  { t: 'Quality-Focused Manufacturing', d: 'Inspection and testing built into how equipment is made and checked.',
    i: '<path d="m5 12 4.5 4.5L19 7" />' },
  { t: 'Project Delivery & Commissioning', d: 'Installation, testing and handover coordinated through to energisation.',
    i: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2" />' }
];
function About() {
  const items = HIGHLIGHTS.map((h, i) => `
    <li data-reveal style="--d:${i}"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${h.i}</svg>
    <div><h3>${h.t}</h3><p>${h.d}</p></div></li>`).join('');
  return `
  <div class="wrap about__grid">
    <div class="about__copy">
      <p class="label" data-reveal>ABOUT OUR COMPANY</p>
      <h2 data-reveal>Engineering Expertise. Built Around Reliability.</h2>
      <p class="lead" data-reveal>Placeholder copy: we are a power engineering company working with utilities, factories and infrastructure developers on transformers, substations and the electrical systems that connect them.</p>
      <p data-reveal>Our engineers and manufacturing team work from specification through to quality assurance, installation and commissioning, so each project stays accountable to its drawings and to the network it joins.</p>
      <ul class="highlights">${items}</ul>
      <blockquote class="mission" data-reveal>Our commitment: dependable power infrastructure, delivered with clear engineering and honest communication.</blockquote>
    </div>
    <div class="about__media">${TransformerVideo({ id: 'tv-about', preload: 'metadata' })}</div>
  </div>`;
}
