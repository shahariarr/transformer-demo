const I = {
  mail: '<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>', phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  wa: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/>'
};
const ico = p => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
function waLink() { const c = DATA.contact; return `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.waMessage)}`; }
function mailLink(body = '') { const c = DATA.contact; return `mailto:${c.email}?subject=${encodeURIComponent(c.emailSubject)}${body ? '&body=' + encodeURIComponent(body) : ''}`; }

function Contact() {
  const c = DATA.contact;
  const opts = DATA.products.map(p => `<option>${p.name}</option>`).join('');
  const field = (id, label, type, req, extra = '') => `<div class="field"><label for="${id}">${label}${req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>
      <input id="${id}" name="${id}" type="${type}" ${req ? 'required aria-required="true"' : ''} ${extra} aria-describedby="${id}-err"><p class="err" id="${id}-err"></p></div>`;
  return `<div class="wrap">
    ${SectionHead({ label: "LET'S DISCUSS YOUR PROJECT", title: 'Have a Power Engineering Requirement?',
      desc: 'Share your project requirements and connect with our team to discuss the next steps.' })}
    <div class="contact__grid">
      <div class="contact__cards fade-in-left">
        <a class="ccard" href="${mailLink()}">${ico(I.mail)}<span><b>Email</b>${c.email}<small>Placeholder address</small></span></a>
        <a class="ccard" href="${waLink()}" target="_blank" rel="noopener">${ico(I.wa)}<span><b>WhatsApp</b>${c.phoneDisplay}<small>Placeholder number, opens WhatsApp</small></span></a>
        <div class="ccard">${ico(I.phone)}<span><b>Business phone</b>${c.phoneDisplay}<small>Placeholder number</small></span></div>
        <div class="ccard">${ico(I.pin)}<span><b>Office address</b>${c.address}<small>Placeholder address</small></span></div>
      </div>
      <form id="contact-form" class="form fade-in-right" data-delay="150" novalidate>
        <div class="form__row">${field('name', 'Full Name', 'text', true, 'autocomplete="name"')}${field('company', 'Company Name', 'text', false, 'autocomplete="organization"')}</div>
        <div class="form__row">${field('email', 'Email Address', 'email', true, 'autocomplete="email"')}${field('phone', 'Phone Number', 'tel', false, 'autocomplete="tel"')}</div>
        <div class="form__row">
          <div class="field"><label for="service">Product or Service Required <span class="req" aria-hidden="true">*</span></label>
            <select id="service" name="service" required aria-required="true" aria-describedby="service-err"><option value="">Select one</option>${opts}
            <option>Engineering &amp; design</option><option>Installation &amp; commissioning</option><option>Other</option></select><p class="err" id="service-err"></p></div>
          ${field('location', 'Project Location', 'text', false)}
        </div>
        <div class="field"><label for="message">Project Requirements <span class="req" aria-hidden="true">*</span></label>
          <textarea id="message" name="message" rows="5" required aria-required="true" aria-describedby="message-err"></textarea><p class="err" id="message-err"></p></div>
        <button class="btn btn--primary" type="submit">Submit Inquiry</button>
        <div class="form__status" id="form-status" role="status" tabindex="-1"></div>
      </form>
    </div></div>`;
}
function prefillContact(service) {
  const sel = document.getElementById('service');
  if ([...sel.options].some(o => o.value === service || o.text === service)) sel.value = service;
}
function initContact() {
  const form = document.getElementById('contact-form'), status = document.getElementById('form-status');
  const rules = {
    name: v => v.trim() ? '' : 'Enter your full name.',
    email: v => !v.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address, like name@company.com.',
    service: v => v ? '' : 'Choose a product or service.',
    message: v => v.trim() ? '' : 'Describe your project requirements.'
  };
  const check = k => {
    const el = form.elements[k], msg = rules[k](el.value);
    document.getElementById(k + '-err').textContent = msg;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false'); return !msg;
  };
  Object.keys(rules).forEach(k => form.elements[k].addEventListener('blur', () => check(k)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const bad = Object.keys(rules).filter(k => !check(k));
    status.className = 'form__status';
    if (bad.length) {
      status.classList.add('is-error');
      status.textContent = 'Please fix the highlighted fields and submit again.';
      form.elements[bad[0]].focus(); return;
    }
    const f = form.elements;
    const body = `Name: ${f.name.value}\nCompany: ${f.company.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value}\nRequired: ${f.service.value}\nLocation: ${f.location.value}\n\n${f.message.value}`;
    status.classList.add('is-ok');
    status.innerHTML = `Your details are complete, but this demo has no backend, so <strong>nothing has been sent</strong>. To send them now, <a href="${mailLink(body).replace(/&/g, '&amp;')}">open them in your email app</a>.`;
    status.focus();
  });
}
