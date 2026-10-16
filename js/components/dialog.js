function DialogShell() {
  return `<dialog id="dlg" class="dlg" aria-labelledby="dlg-title"><div class="dlg__inner">
    <button type="button" class="dlg__close" aria-label="Close details">&times;</button>
    <div id="dlg-media"></div><div class="dlg__body"><p class="cat" id="dlg-kicker"></p><h3 id="dlg-title"></h3>
    <p id="dlg-desc"></p><p class="dlg__note" id="dlg-note"></p>
    <a class="btn btn--primary" id="dlg-cta" href="#contact"></a></div></div></dialog>`;
}
function openDialog({ item, kicker, title, desc, note, cta, service, isCert = false }) {
  const d = document.getElementById('dlg');
  d.classList.toggle('dlg--cert', !!isCert);
  if (isCert) {
    document.getElementById('dlg-media').innerHTML = `<div class="dlg-cert-view"><img src="${item.image}" alt="${title}"></div>`;
  } else {
    document.getElementById('dlg-media').innerHTML = Media(item, { reveal: false });
  }
  document.getElementById('dlg-kicker').textContent = kicker;
  document.getElementById('dlg-title').textContent = title;
  document.getElementById('dlg-desc').textContent = desc;
  document.getElementById('dlg-note').textContent = note;
  const a = document.getElementById('dlg-cta'); a.textContent = cta;
  a.onclick = () => { if (service) prefillContact(service); d.close(); };
  d.showModal();
}
function initDialog() {
  const d = document.getElementById('dlg');
  d.querySelector('.dlg__close').addEventListener('click', () => d.close());
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
  document.addEventListener('click', e => {
    const p = e.target.closest('[data-product]'), j = e.target.closest('[data-project]'), c = e.target.closest('[data-cert]');
    if (p) {
      const x = DATA.products[p.dataset.product];
      openDialog({ item: x, kicker: x.cat, title: x.name, desc: x.desc,
        note: 'Technical specifications and product details will be added once the company supplies them.',
        cta: 'Request a quote', service: x.name });
    }
    if (j) {
      const x = DATA.projects[j.dataset.project];
      openDialog({ item: x, kicker: x.cat, title: x.title, desc: x.desc,
        note: 'Illustrative example only. This is not a project completed by the company.',
        cta: 'Discuss a similar project', service: '' });
    }
    if (c && window.QA_CERTS) {
      const x = window.QA_CERTS[c.dataset.cert];
      if (x) {
        openDialog({
          item: { image: x.src, dir: 'certificates', hint: '' },
          kicker: `${x.badge} • ${x.certNo}`,
          title: x.title,
          desc: `${x.desc} (${x.issuer})`,
          note: 'Official certification and test report document.',
          cta: 'Inquire About Certifications',
          service: x.title,
          isCert: true
        });
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const certEl = e.target.closest('[data-cert]');
      if (certEl && document.activeElement === certEl) {
        e.preventDefault();
        certEl.click();
      }
    }
  });
}
