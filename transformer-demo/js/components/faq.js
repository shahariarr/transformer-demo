function Faq() {
  const items = DATA.faq.map((f, i) => `
    <div class="faq__item" data-reveal style="--d:${i % 3}">
      <h3><button type="button" class="faq__q" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}">
        <span>${f.q}</span><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></h3>
      <div class="faq__a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p>${f.a}</p></div></div>
    </div>`).join('');
  return `<div class="wrap wrap--narrow">
    <header class="sec-head" data-reveal><h2>Frequently Asked Questions</h2></header>
    <div class="faq">${items}</div></div>`;
}
function initFaq() {
  document.querySelectorAll('.faq__q').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open);
    b.closest('.faq__item').classList.toggle('is-open', !open);
  }));
}
