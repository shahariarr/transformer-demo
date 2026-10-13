function Products() {
  const cards = DATA.products.map((p, i) => {
    const specsList = (p.specs && p.specs.length)
      ? p.specs.map(s => `<li>• ${s}</li>`).join('')
      : `<li>• ${p.desc}</li>`;

    return `
    <article class="prod-card" data-reveal style="--d:${i % 2}">
      <div class="prod-card__img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
      </div>
      <div class="prod-card__body">
        <h3 class="prod-card__title">${p.name}</h3>
        <ul class="prod-card__specs">${specsList}</ul>
        <button type="button" class="prod-card__more" data-product="${i}">View More</button>
      </div>
    </article>`;
  }).join('');

  const browseCard = `
    <article class="prod-card prod-card--browse" data-reveal style="--d:1">
      <div class="prod-browse__bg"></div>
      <a href="#contact" class="prod-browse__overlay" aria-label="Browse All Products">
        <span class="prod-browse__title">Browse All Products</span>
        <span class="prod-browse__btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </span>
      </a>
    </article>`;

  return `<div class="wrap">
    ${SectionHead({ label: 'OUR PRODUCTS', title: 'Engineered Products for Critical Power Infrastructure',
      desc: 'Explore electrical equipment and engineered solutions designed for reliable power distribution and industrial infrastructure.' })}
    <p class="demo-note" data-reveal>Featured power & distribution transformers and substation equipment.</p>
    <div class="prod-grid">${cards}${browseCard}</div>
  </div>`;
}
