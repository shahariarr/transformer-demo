const IND_SPANS = [7, 5, 4, 4, 4, 3, 4, 5];
function Industries() {
  const cards = DATA.industries.map((p, i) => `
    <article class="ind fade-in-up" style="--span:${IND_SPANS[i]}" data-delay="${(i % 3) * 110}">
      ${Media(p, { parallax: true, reveal: false })}
      <div class="ind__body"><h3>${p.name}</h3><p>${p.desc}</p></div>
    </article>`).join('');

  return `
  <div class="stars-container" aria-hidden="true">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
  <div class="wrap">
    ${SectionHead({ label: 'INDUSTRIES WE SERVE', title: 'Powering Diverse Industries',
      desc: 'Engineered power solutions for the facilities and infrastructure that keep industries moving.' })}
    <p class="demo-note fade-in-up" data-delay="200">Illustrative industries until the company's actual customer sectors are confirmed.</p>
    <div class="ind-grid">${cards}</div>
  </div>`;
}
