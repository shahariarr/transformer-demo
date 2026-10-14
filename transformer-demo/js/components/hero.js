/* ── Hero Section with Modern 4-Slide Animation Carousel ── */
const HERO_SLIDES = [
  {
    id: 'slide-1',
    label: 'POWER & DISTRIBUTION TRANSFORMERS',
    title: 'Engineering Power. Enabling Progress.',
    lead: 'Delivering engineered oil-immersed, dry-type, and special transformers for industrial, commercial, and utility applications.',
    ctaPrimary: { text: 'Explore Products', href: '#products' },
    ctaSecondary: { text: 'GET A QUOTE', href: '#contact' },
    caps: ['10kV – 35kV Capacity', 'High Thermal Efficiency', 'Low-Loss Core Design'],
    video: 'assets/videos/transformer-animation.mp4',
    poster: 'assets/videos/transformer-poster.png',
    tabNum: '01',
    tabTitle: 'Distribution'
  },
  {
    id: 'slide-2',
    label: 'HIGH-VOLTAGE TRANSMISSION INFRASTRUCTURE',
    title: 'Heavy-Duty Power Transformers for High-Voltage Grids.',
    lead: 'Robust transmission power transformers engineered to step up generated power and feed regional grid networks with maximum efficiency.',
    ctaPrimary: { text: 'View Power Units', href: '#products' },
    ctaSecondary: { text: 'Request Specifications', href: '#contact' },
    caps: ['Up to 220kV / 500kV', 'Automated Tap-Changer', 'Advanced Oil Radiators'],
    video: 'assets/videos/gemini_generated_video_7e999965.mp4',
    poster: 'assets/videos/gemini_generated_video_7e999965_thumb.png',
    tabNum: '02',
    tabTitle: 'Transmission'
  },
  {
    id: 'slide-3',
    label: 'INTEGRATED SUBSTATION SOLUTIONS',
    title: 'Prefabricated Compact Substations for Rapid Deployment.',
    lead: 'Outdoor weatherproof kiosk substations integrating medium-voltage switchgear, transformer, and low-voltage distribution in one secure enclosure.',
    ctaPrimary: { text: 'Substation Solutions', href: '#products' },
    ctaSecondary: { text: 'Inquire for Site', href: '#contact' },
    caps: ['IP54 Weatherproof', 'Factory Pre-Tested', 'Rapid Site Installation'],
    video: 'assets/videos/gemini_generated_video_0f8ddda3.mp4',
    poster: 'assets/videos/gemini_generated_video_0f8ddda3_thumb.png',
    tabNum: '03',
    tabTitle: 'Substations'
  },
  {
    id: 'slide-4',
    label: 'INTELLIGENT DISTRIBUTION & CONTROL',
    title: 'Intelligent Switchgear & Motor Control Centers.',
    lead: 'Complete medium-voltage vacuum switchgear and intelligent power distribution boards equipped with microprocessor protection and SCADA automation.',
    ctaPrimary: { text: 'Browse Switchgear', href: '#products' },
    ctaSecondary: { text: 'Consult an Engineer', href: '#contact' },
    caps: ['Vacuum Circuit Breakers', 'Arc-Resistant Enclosure', 'Smart SCADA Monitoring'],
    video: 'assets/videos/gemini_generated_video_0cd5d600.mp4',
    poster: 'assets/videos/gemini_generated_video_0cd5d600_thumb.png',
    tabNum: '04',
    tabTitle: 'Switchgear'
  }
];

function Hero() {
  const slidesHtml = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide ${i === 0 ? 'is-active' : ''}" data-hero-slide="${i}">
      <div class="wrap hero__grid">
        <div class="hero__copy">
          <p class="label hero__in" style="--d:0">${s.label}</p>
          <h1 class="hero__in" style="--d:1">${s.title}</h1>
          <p class="lead hero__in" style="--d:2">${s.lead}</p>
          <div class="cta hero__in" style="--d:3">
            <a class="btn btn--primary" href="${s.ctaPrimary.href}">${s.ctaPrimary.text}</a>
            <a class="btn btn--ghost" href="${s.ctaSecondary.href}">${s.ctaSecondary.text}</a>
          </div>
          <ul class="caps hero__in" style="--d:4">
            ${s.caps.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
        <div class="hero__media">
          <div class="tv" data-tv id="tv-hero-${i}" style="--poster:url('${s.poster}')">
            <video class="tv__video" muted loop ${i === 0 ? 'autoplay' : ''} playsinline
                   disablepictureinpicture disableremoteplayback preload="${i === 0 ? 'auto' : 'metadata'}"
                   poster="${s.poster}" aria-label="${s.title}">
              <source src="${s.video}" type="video/mp4">
            </video>
            <p class="tv__fallback" role="status" hidden>The animation could not be loaded.</p>
          </div>
        </div>
      </div>
    </div>`).join('');

  const indicatorsHtml = HERO_SLIDES.map((s, i) => `
    <button type="button" class="hero-indicator ${i === 0 ? 'is-active' : ''}" data-hero-tab="${i}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" aria-label="Slide ${i + 1}: ${s.tabTitle}">
      <span class="hero-indicator__header">
        <span class="hero-indicator__num">${s.tabNum}</span>
        <span class="hero-indicator__title">${s.tabTitle}</span>
      </span>
      <span class="hero-indicator__track"><span class="hero-indicator__fill"></span></span>
    </button>`).join('');

  return `
  <div class="hero-slider" id="hero-slider">
    <div class="hero-slides-wrap">${slidesHtml}</div>
    <div class="wrap hero-bottom">
      <div class="hero-indicators" role="tablist" aria-label="Hero slider pagination">${indicatorsHtml}</div>
      <div class="hero-nav-actions">
        <div class="hero-counter" aria-live="polite">
          <span class="hero-counter__curr" id="hero-curr-num">01</span>
          <span class="hero-counter__sep">/</span>
          <span class="hero-counter__total">04</span>
        </div>
        <div class="hero-nav-btns">
          <button type="button" class="hero-arrow-btn" id="hero-prev" aria-label="Previous slide" title="Previous slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="hero-arrow-btn" id="hero-next" aria-label="Next slide" title="Next slide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides   = slider.querySelectorAll('[data-hero-slide]');
  const tabs     = slider.querySelectorAll('[data-hero-tab]');
  const currNum  = document.getElementById('hero-curr-num');
  const prevBtn  = document.getElementById('hero-prev');
  const nextBtn  = document.getElementById('hero-next');
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  let isHovered = false;
  const duration = 7500; // 7.5 seconds per slide

  function goTo(index) {
    if (index === current && slides[current].classList.contains('is-active')) return;
    const prevSlide = slides[current];
    const prevTab   = tabs[current];

    if (prevSlide) {
      const prevVideo = prevSlide.querySelector('video');
      if (prevVideo) prevVideo.pause();
      prevSlide.classList.remove('is-active');
    }
    if (prevTab) {
      prevTab.classList.remove('is-active');
      prevTab.setAttribute('aria-selected', 'false');
    }

    current = (index + slides.length) % slides.length;
    const nextSlide = slides[current];
    const nextTab   = tabs[current];

    if (nextSlide) {
      nextSlide.classList.add('is-active');
      const nextVideo = nextSlide.querySelector('video');
      if (nextVideo) {
        nextVideo.currentTime = 0;
        const p = nextVideo.play();
        if (p && p.catch) p.catch(() => {});
      }
    }
    if (nextTab) {
      nextTab.classList.add('is-active');
      nextTab.setAttribute('aria-selected', 'true');
    }
    if (currNum) {
      currNum.textContent = '0' + (current + 1);
    }

    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    if (!isHovered) {
      timer = setInterval(next, duration);
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.heroTab, 10);
      goTo(idx);
    });
  });

  slider.addEventListener('mouseenter', () => {
    isHovered = true;
    clearInterval(timer);
  });
  slider.addEventListener('mouseleave', () => {
    isHovered = false;
    resetTimer();
  });

  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) next();
      else prev();
    }
  }, { passive: true });

  resetTimer();
}

window.initHeroSlider = initHeroSlider;
