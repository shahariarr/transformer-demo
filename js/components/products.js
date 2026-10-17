function Products() {
  const arrow = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  const cards = DATA.products.map((p, i) => {
    const rating = (p.name.match(/([\d,]+)\s*kva/i) || [])[1];
    const specs = p.specs || [];
    // "Key: Value" specs become a spec table; plain ones become feature tags
    const rows = specs.filter(s => s.includes(':')).map(s => {
      const [k, ...v] = s.split(':');
      return `<div><dt>${k.trim()}</dt><dd>${v.join(':').trim()}</dd></div>`;
    }).join('');
    const tags = specs.filter(s => !s.includes(':')).map(s => `<li>${s}</li>`).join('');

    return `
    <article class="pcard fade-in-up" data-delay="${(i % 3) * 90}">
      <div class="pcard__img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
        ${rating ? `<span class="pcard__badge">${rating} kVA</span>` : ''}
      </div>
      <div class="pcard__body">
        <span class="pcard__cat">${p.cat || 'Transformers'}</span>
        <h3 class="pcard__title">${p.name}</h3>
        ${rows ? `<dl class="pcard__specs">${rows}</dl>` : `<p class="pcard__desc">${p.desc}</p>`}
        ${tags ? `<ul class="pcard__tags">${tags}</ul>` : ''}
        <div class="pcard__actions">
          <button type="button" class="pcard__btn pcard__btn--main" data-product="${i}">View Details ${arrow}</button>
          <a href="#contact" class="pcard__btn pcard__btn--ghost">Inquiry</a>
        </div>
      </div>
    </article>`;
  }).join('');

  const moreCard = `
    <article class="pcard pcard--more fade-in-up" data-delay="${(DATA.products.length % 3) * 90}">
      <span class="pcard--more__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </span>
      <h3>Need a custom rating?</h3>
      <p>We design and build transformers to your voltage, capacity and site specification.</p>
      <a href="#contact" class="pcard__btn pcard__btn--light">Request a Quote ${arrow}</a>
      <a href="#contact" class="pcard--more__link">Browse all products</a>
    </article>`;

  return `<div class="wrap">
    <div class="prod-head">
      ${SectionHead({ label: 'OUR PRODUCTS', title: 'Engineered Products for Critical Power Infrastructure',
        desc: 'Oil-immersed power and distribution transformers built for reliable, low-loss performance in utility and industrial networks.' })}
      <a href="#contact" class="prod-head__link fade-in-up">View all products ${arrow}</a>
    </div>
    <div class="pgrid">${cards}${moreCard}</div>
  </div>`;
}
