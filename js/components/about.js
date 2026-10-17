const HIGHLIGHTS = [
  { t: 'Engineering Excellence', d: 'Design, calculation and specification handled with care for each site.',
    i: '<path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" />' },
  { t: 'Quality-Focused Manufacturing', d: 'Inspection and testing built into how equipment is made and checked.',
    i: '<path d="m5 12 4.5 4.5L19 7" />' },
  { t: 'Project Delivery & Commissioning', d: 'Installation, testing and handover coordinated through to energisation.',
    i: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2" />' }
];
function About() {
  const items = HIGHLIGHTS.map((h, i) => `
    <li class="fade-in-up" data-delay="${280 + i * 90}"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${h.i}</svg>
    <div><h3>${h.t}</h3><p>${h.d}</p></div></li>`).join('');
  return `
  <div class="wrap about__grid">
    <div class="about__copy">
      <p class="label fade-in-left">ABOUT OUR COMPANY</p>
      <h2 class="fade-in-left" data-delay="100">Engineering Expertise. Built Around Reliability.</h2>
      <p class="lead fade-in-left" data-delay="200">Our engineers and manufacturing team work from specification through to quality assurance, installation and commissioning, so each project stays accountable to its drawings and to the network it joins.</p>
      <ul class="highlights">${items}</ul>
    </div>

    <div class="about__media">
      <div class="about-collage">
        <div class="about-card about-card--main fade-in-right" data-delay="150">
          <img src="assets/images/about-campus.jpg" alt="Voltline Power Manufacturing Campus" class="about-card__img" loading="lazy" decoding="async">
        </div>

        <div class="about-card about-card--sub fade-in-up" data-delay="280">
          <img src="assets/images/about-tower.jpg" alt="Voltline Power Corporate Headquarters" class="about-card__img" loading="lazy" decoding="async">
        </div>

        <div class="about-badge fade-in-right" data-delay="380" tabindex="0" role="region" aria-label="Founded In 1985 Years">
          <div class="about-badge__icon">
            <svg viewBox="0 0 54 48" width="50" height="44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <!-- Left Building (Medium Height) -->
              <path d="M4 17L18 10V46H4V17Z" fill="currentColor"/>
              <!-- Center Building (Tallest Skyscraper) -->
              <path d="M18 6L35 0V46H18V6Z" fill="currentColor" fill-opacity=".85"/>
              <!-- Center Building Right Perspective Facet -->
              <path d="M35 0L38 1.8V46H35V0Z" fill="currentColor" fill-opacity=".6"/>
              <!-- Right Building (Lower Wing) -->
              <path d="M38 23L50 18V46H38V23Z" fill="currentColor"/>
              <path d="M50 18L52 19V46H50V18Z" fill="currentColor" fill-opacity=".6"/>

              <!-- Tall Building Windows (2 columns) -->
              <rect x="21.5" y="7" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="28.5" y="4.5" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="21.5" y="14" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="28.5" y="11.5" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="21.5" y="21" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="28.5" y="18.5" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="21.5" y="28" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="28.5" y="25.5" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="21.5" y="35" width="3" height="3" rx="0.5" fill="#FFFFFF"/>
              <rect x="28.5" y="32.5" width="3" height="3" rx="0.5" fill="#FFFFFF"/>

              <!-- Left Building Windows -->
              <rect x="7" y="19" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="12.5" y="16.5" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="7" y="25" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="12.5" y="22.5" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="7" y="31" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="12.5" y="28.5" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="7" y="37" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="12.5" y="34.5" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>

              <!-- Right Building Windows -->
              <rect x="41" y="25" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="46" y="23" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="41" y="31" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="46" y="29" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="41" y="37" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
              <rect x="46" y="35" width="2.8" height="2.8" rx="0.5" fill="#FFFFFF"/>
            </svg>
          </div>
          <div class="about-badge__label">Founded In</div>
          <div class="about-badge__stat">
            <span class="about-badge__num">1985</span>
            <span class="about-badge__unit">Years</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
