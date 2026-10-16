/* ── Transformer Animation Video Component ──
   Direct hardware-accelerated HTML5 video with CSS multiply blend
   for seamless background integration. */

function TransformerVideo({ id, preload = 'auto' }) {
  return `
  <div class="tv" data-tv id="${id}" style="--poster:url('${SITE.poster}')">
    <video class="tv__video" muted loop autoplay playsinline disablepictureinpicture disableremoteplayback
           preload="${preload}" poster="${SITE.poster}" tabindex="-1"
           aria-label="Line animation of an oil-immersed power transformer being drawn">
      <source src="${SITE.videoSrc}" type="video/mp4">
    </video>
    <p class="tv__fallback" role="status" hidden>The animation could not be loaded.</p>
  </div>`;
}

function initTransformerVideos() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const getSpeed = () => (window.SITE && window.SITE.videoPlaybackRate) || 2.0;

  document.querySelectorAll('[data-tv]').forEach(tv => {
    const v = tv.querySelector('video');
    if (!v) return;

    const applySpeed = () => {
      const spd = getSpeed();
      v.defaultPlaybackRate = spd;
      v.playbackRate = spd;
    };
    applySpeed();
    v.addEventListener('loadedmetadata', applySpeed);
    v.addEventListener('play', applySpeed);
    v.addEventListener('ratechange', () => {
      const spd = getSpeed();
      if (Math.abs(v.playbackRate - spd) > 0.05) {
        v.playbackRate = spd;
      }
    });

    const play = () => {
      applySpeed();
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    const fail = () => {
      const fb = tv.querySelector('.tv__fallback');
      if (fb) fb.hidden = false;
    };
    v.controls = false;
    v.addEventListener('error', fail);
    const srcEl = v.querySelector('source');
    if (srcEl) srcEl.addEventListener('error', fail);

    if (reduce.matches) { v.removeAttribute('autoplay'); v.pause(); return; }

    new IntersectionObserver(([e]) => {
      const heroSlide = tv.closest('.hero-slide');
      if (heroSlide && !heroSlide.classList.contains('is-active')) {
        v.pause();
        return;
      }
      e.isIntersecting ? play() : v.pause();
    }, { threshold: 0.15 }).observe(tv);
  });
}

// Runtime helper to dynamically update video animation playback speed
window.setTransformerVideoSpeed = function(speed) {
  if (window.SITE) window.SITE.videoPlaybackRate = speed;
  document.querySelectorAll('.tv__video').forEach(v => {
    v.defaultPlaybackRate = speed;
    v.playbackRate = speed;
  });
};
