(function () {
  const mount = (id, html) => { document.getElementById(id).innerHTML = html; };
  mount('site-header', Header());
  mount('home', Hero());
  mount('about', About());
  mount('products', Products());
  mount('industries', Industries());
  mount('projects', Projects());
  mount('quality', Quality());
  mount('lifecycle', Lifecycle());
  mount('faq', Faq());
  mount('partners', Partners());
  mount('contact', Contact());
  mount('footer', Footer());
  document.getElementById('yr').textContent = new Date().getFullYear();
  document.body.insertAdjacentHTML('beforeend', WhatsAppButton() + DialogShell());
  initHeader(); initTransformerVideos(); initHeroSlider(); initProjects(); initLifecycle();
  initFaq(); initContact(); initWhatsApp(); initDialog(); initMotion(); initPartners(); initQuality();
})();
