const IND_SPANS = [7, 5, 4, 4, 4, 3, 4, 5];
function Industries() {
  const cards = DATA.industries.map((p, i) => `
    <article class="ind" style="--span:${IND_SPANS[i]};--d:${i % 3}" data-reveal>
      ${Media(p, { parallax: true, reveal: false })}
      <div class="ind__body"><h3>${p.name}</h3><p>${p.desc}</p></div>
    </article>`).join('');
  return `<div class="wrap">
    ${SectionHead({ label: 'INDUSTRIES WE SERVE', title: 'Powering Diverse Industries',
      desc: 'Engineered power solutions for the facilities and infrastructure that keep industries moving.' })}
    <p class="demo-note" data-reveal>Illustrative industries until the company's actual customer sectors are confirmed.</p>
    <div class="ind-grid">${cards}</div></div>`;
}
