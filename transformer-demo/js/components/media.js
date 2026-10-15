/* Image slot. With no `image`, shows a labelled placeholder naming the file to add. */
function Media(item, { cls = '', parallax = false, reveal = true } = {}) {
  const hintPath = `assets/images/${item.dir}/${item.hint}`;
  const label = item.name || item.title;
  const inner = item.image
    ? `<img src="${item.image}" alt="${label}" loading="lazy" decoding="async"
           onerror="this.parentNode.parentNode.setAttribute('role','img');this.parentNode.parentNode.setAttribute('aria-label','Placeholder image: ${label.replace(/'/g, '')}');this.remove()">`
    : '';
  const ph = `<div class="ph" aria-hidden="true"><span>Photo placeholder</span><small>${hintPath}</small></div>`;
  return `<div class="media ${parallax ? 'media--par' : ''} ${cls}" ${item.image ? '' : `role="img" aria-label="Placeholder image: ${label}"`}
      ${reveal ? 'data-reveal="mask"' : ''}><div class="media__shift" ${parallax ? 'data-parallax' : ''}>${ph}${inner}</div></div>`;
}
function SectionHead({ label, title, desc }) {
  return `<header class="sec-head fade-in-up" data-reveal>
    <p class="label">${label}</p><h2>${title}</h2>${desc ? `<p class="sec-head__desc">${desc}</p>` : ''}</header>`;
}
