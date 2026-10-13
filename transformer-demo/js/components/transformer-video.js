/* One video file, any number of placements. No controls, no frame: the page
   background matches the clip's own background (the file has no alpha channel,
   so this is colour matching, not transparency). Each placement is its own
   <video> element on the same URL, so the browser fetches and caches it once. */
function TransformerVideo({ id, preload = 'auto' }) {
  return `
  <div class="tv" data-tv id="${id}" style="--poster:url('${SITE.poster}')">
    <video class="tv__video" muted loop autoplay playsinline disablepictureinpicture disableremoteplayback
           preload="${preload}" poster="${SITE.poster}" tabindex="-1"
           aria-label="Line animation of an oil-immersed power transformer being drawn, component by component">
      <source src="${SITE.videoSrc}" type="video/mp4">
    </video>
    <p class="tv__fallback" role="status" hidden>The animation could not be loaded.</p>
  </div>`;
}

function initTransformerVideos() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-tv]').forEach(tv => {
    const v = tv.querySelector('video');
    const play = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const fail = () => { tv.querySelector('.tv__fallback').hidden = false; v.hidden = true; };
    v.controls = false;
    v.addEventListener('error', fail);
    v.querySelector('source').addEventListener('error', fail);
    // Reduced motion: keep the still poster frame, never autoplay
    if (reduce.matches) { v.removeAttribute('autoplay'); v.pause(); return; }
    // Play only while visible (saves CPU/battery)
    new IntersectionObserver(([e]) => { e.isIntersecting ? play() : v.pause(); }, { threshold: 0.2 }).observe(tv);
  });
}
