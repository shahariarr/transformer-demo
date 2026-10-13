function Hero() {
  return `
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="label hero__in" style="--d:0">POWER ENGINEERING &amp; INFRASTRUCTURE</p>
      <h1 class="hero__in" style="--d:1">Engineering Power. Enabling Progress.</h1>
      <p class="lead hero__in" style="--d:2">Delivering engineered transformer, electrical substation, and power infrastructure solutions for industrial, commercial, and utility applications.</p>
      <div class="cta hero__in" style="--d:3">
        <a class="btn btn--primary" href="#products">Explore Our Products</a>
        <a class="btn btn--ghost" href="#contact">Discuss Your Project</a>
      </div>
      <ul class="caps hero__in" style="--d:4">
        <li>Transformer Solutions</li><li>Substation Engineering</li><li>Testing &amp; Commissioning</li>
      </ul>
    </div>
    <div class="hero__media">${TransformerVideo({ id: 'tv-hero', preload: 'auto' })}</div>
  </div>`;
}
