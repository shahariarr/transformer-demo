function Faq() {
  const items = DATA.faq.map((f, i) => `
    <div class="faq__item fade-in-up" data-delay="${(i % 3) * 110}">
      <h3>
        <button type="button" class="faq__q" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}">
          <span class="faq__q-wrap">
            <span class="faq__num">0${i + 1}</span>
            <span class="faq__q-text">${f.q}</span>
          </span>
          <span class="faq__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
        </button>
      </h3>
      <div class="faq__a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}">
        <div class="faq__a-content">
          <p>${f.a}</p>
        </div>
      </div>
    </div>`).join('');

  return `<div class="wrap wrap--narrow">
    ${SectionHead({
      label: 'COMMON INQUIRIES & TECHNICAL SPECIFICATIONS',
      title: 'Frequently Asked Questions',
      desc: 'Clear guidance on transformer engineering configurations, manufacturing lead times, testing protocols, and substation EPC integration.'
    })}
    <div class="faq">${items}</div>

    <div class="faq__footer-help fade-in-up" data-delay="160">
      <div class="faq__help-content">
        <div class="faq__help-icon">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div>
          <h4>Still have questions about your project requirements?</h4>
          <p>Our power engineering team can provide custom calculation sheets, thermal ratings, and turnkey feasibility studies.</p>
        </div>
      </div>
      <div class="faq__help-actions">
        <a href="#contact" class="btn btn--primary btn--sm">Ask an Engineer</a>
        <a href="${waLink()}" target="_blank" rel="noopener" class="faq__help-wa">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </div>
  </div>`;
}

function initFaq() {
  document.querySelectorAll('.faq__q').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') === 'true';
    b.setAttribute('aria-expanded', !open);
    b.closest('.faq__item').classList.toggle('is-open', !open);
  }));
}
