function Products() {
  const cards = DATA.products.map((p, i) => `
    <article class="prod prod--${i < 2 ? 'wide' : 'std'}" data-reveal style="--d:${i % 4}">
      ${Media(p, { reveal: false })}
      <div class="prod__body">
        <p class="cat">${p.cat}</p>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <button type="button" class="link" data-product="${i}">View Details<span class="sr-only">: ${p.name}</span></button>
      </div>
    </article>`).join('');
  return `<div class="wrap">
    ${SectionHead({ label: 'OUR PRODUCTS', title: 'Engineered Products for Critical Power Infrastructure',
      desc: 'Explore electrical equipment and engineered solutions designed for reliable power distribution and industrial infrastructure.' })}
    <p class="demo-note" data-reveal>Demo categories. The final product list will be confirmed by the company.</p>
    <div class="prod-grid">${cards}</div></div>`;
}
