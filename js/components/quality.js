/* ── Why Work With BPEL & Official Certificates ─────────────────── */

const WHY_BPEL_CARDS = [
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <circle cx="16" cy="16" r="2.5"></circle>
      <path d="m14.5 18 1.5 3 1.5-3"></path>
    </svg>`,
    title: 'In-House Production,<br>Full Control',
    desc: 'With 3 manufacturing bases, we handle every step of transformer manufacturing in-house, ensuring consistent quality, faster delivery, and substantial return on investment.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)"></ellipse>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)"></ellipse>
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)"></ellipse>
    </svg>`,
    title: 'Premium Materials,<br>Reliable Performance',
    desc: "We utilize high-quality materials, including Baowu's top silicon steel sheets, DuPont Nomex®, or Vishay's components, to ensure high efficiency, durability, and safety."
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 18h6"></path>
      <path d="M10 22h4"></path>
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path>
      <path d="M12 7v4"></path>
    </svg>`,
    title: 'R&D-Driven Innovation',
    desc: 'We invest 5% to 7% of our annual revenue into R&D and have obtained 5 inventions and more than 120 patents. We deliver smarter, more energy-efficient transformers for evolving power needs.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="10" width="18" height="4" rx="2" transform="rotate(45 12 12)"></rect>
      <rect x="3" y="10" width="18" height="4" rx="2" transform="rotate(-45 12 12)"></rect>
      <line x1="8.5" y1="8.5" x2="10" y2="10"></line>
      <line x1="14" y1="14" x2="15.5" y2="15.5"></line>
      <line x1="15.5" y1="8.5" x2="14" y2="10"></line>
      <line x1="10" y1="14" x2="8.5" y2="15.5"></line>
    </svg>`,
    title: 'Custom Solutions,<br>Full-Cycle Support',
    desc: 'Beyond standard models, we offer fully customized transformers tailored to your specific needs. From your first inquiry to years of stable operation, our engineering team will provide comprehensive support at every stage.'
  }
];

/* Official Quality Certificates and Type Test Reports provided by company */
const QA_CERTS = [
  {
    badge: 'ISO 9001:2015',
    title: 'Quality Management System',
    sub: 'GB/T 19001-2016 • CNAS & IAF Accredited',
    certNo: 'Cert No: 28726Q0301R101',
    src: 'assets/images/certificates/iso-9001-certificate.png',
    alt: 'ISO 9001:2015 Quality Management System Certificate',
    desc: 'Certified Quality Management System covering 10kV pole-mounted transformer, 10kV dry-type, 10kV oil-immersed, 10kV box-type substation, and 35kV power transformers.',
    issuer: 'Beijing Huanyu Jiuzhou Certification Co., Ltd. (CNAS, IAF)'
  },
  {
    badge: 'CE / LVD',
    title: 'Attestation of Conformity',
    sub: 'Directive 2014/35/EU • EN IEC 61558-1:2019',
    certNo: 'Cert No: M.2023.206.C85900',
    src: 'assets/images/certificates/udem-conformity-certificate.png',
    alt: 'UDEM Low Voltage Directive Attestation of Conformity (CHBEB)',
    desc: 'Attestation of conformity under EU Low Voltage Directive 2014/35/EU Annex III for CHBEB transformers (S11, S13, S20, S22, SH15, SCB10-18, and SZ series).',
    issuer: 'UDEM International Certification'
  },
  {
    badge: 'Type Test',
    title: 'Dry-Type Transformer Test',
    sub: 'SCB10-1600/10 • MA, AL, ilac-MRA, CNAS',
    certNo: 'Report No: 17N0158-S',
    src: 'assets/images/certificates/dry-type-transformer-test-report.png',
    alt: 'Type Test Report - SCB10-1600/10 Dry-Type Transformer',
    desc: 'Official type test verification report for SCB10-1600/10 dry-type transformer issued by China National Center for Quality Supervision and Test of Electrical Apparatus Products.',
    issuer: 'China National Center for Quality Supervision and Test of Electrical Apparatus Products'
  },
  {
    badge: 'Type Test',
    title: 'Power Transformer Test',
    sub: 'SZ22-20000/35-NX1 (35kV) • MA, CNAS',
    certNo: 'Report No: 23133040501Y',
    src: 'assets/images/certificates/power-transformer-test-report.png',
    alt: 'Type Test Report - SZ22-20000/35-NX1 Power Transformer',
    desc: 'Complete electrical safety and type test report for 35kV power transformer model SZ22-20000/35-NX1 conducted by National Center of Quality Inspection for Electrical Safety.',
    issuer: 'Zhejiang Fangyuan Test Group Co., Ltd.'
  },
  {
    badge: 'ISO 14001',
    title: 'Environmental Management',
    sub: 'GB/T 24001-2016 / ISO 14001:2015',
    certNo: 'Cert No: 28726E0301R101',
    src: 'assets/images/certificates/iso-9001-certificate.png',
    alt: 'ISO 14001 Environmental Management System Certificate',
    desc: 'Certified Environmental Management System for clean production, resource conservation, and minimal environmental footprint during transformer fabrication.',
    issuer: 'Huanyu Jiuzhou Environmental Certification (CNAS)'
  },
  {
    badge: 'ISO 45001',
    title: 'Health & Safety System',
    sub: 'GB/T 45001-2020 / ISO 45001:2018',
    certNo: 'Cert No: 28726S0301R101',
    src: 'assets/images/certificates/iso-9001-certificate.png',
    alt: 'ISO 45001 Occupational Health and Safety Certificate',
    desc: 'Occupational health and workplace safety standard accreditation covering high-voltage testing bays and heavy transformer assembly plants.',
    issuer: 'Huanyu Jiuzhou Safety Accreditation Center'
  },
  {
    badge: 'IEC 60076-5',
    title: 'Short-Circuit Withstand Test',
    sub: 'Dynamic Short-Circuit • High-Power Lab',
    certNo: 'Report No: 18N0244-S',
    src: 'assets/images/certificates/dry-type-transformer-test-report.png',
    alt: 'Short-Circuit Withstand Capability Test Report',
    desc: 'Special test proving full dynamic mechanical and thermal withstand capability under severe three-phase symmetrical short-circuit conditions.',
    issuer: 'National High Voltage Electrical Apparatus Test Center'
  },
  {
    badge: 'IEC 60076-3',
    title: 'Lightning Impulse Test',
    sub: 'Full-Wave & Chopped-Wave BIL 200kV',
    certNo: 'Report No: 23133040812Y',
    src: 'assets/images/certificates/power-transformer-test-report.png',
    alt: 'Lightning Impulse Voltage Withstand Test Report',
    desc: 'High-voltage lightning impulse withstand test demonstrating dielectric strength of windings and core insulation system under severe surge transients.',
    issuer: 'National Center of Quality Inspection for Electrical Safety'
  },
  {
    badge: 'IEC 60076-2',
    title: 'Temperature Rise Test',
    sub: 'Winding & Top Oil Gradient Test',
    certNo: 'Report No: 17N0312-S',
    src: 'assets/images/certificates/dry-type-transformer-test-report.png',
    alt: 'Temperature Rise Test Report',
    desc: 'Full-load thermal equilibrium test verifying temperature rise limits of copper windings, core, and tank cooling efficiency in compliance with IEC 60076-2.',
    issuer: 'China National Center for Quality Supervision'
  },
  {
    badge: 'IEC 60076-10',
    title: 'Sound Level Test',
    sub: 'Acoustic Sound Pressure & Vibration',
    certNo: 'Report No: 23133041103Y',
    src: 'assets/images/certificates/power-transformer-test-report.png',
    alt: 'Acoustic Sound Level Measurement Report',
    desc: 'Low-noise qualification test confirming electromagnetic acoustic pressure levels remain well below municipal and substation noise boundaries.',
    issuer: 'Zhejiang Fangyuan Electrical Equipment Testing Co., Ltd.'
  },
  {
    badge: 'IEC 60296',
    title: 'Transformer Oil Breakdown',
    sub: 'Dielectric Strength & DGA Analysis',
    certNo: 'Report No: 19N0415-S',
    src: 'assets/images/certificates/udem-conformity-certificate.png',
    alt: 'Mineral Insulating Oil Dielectric Test Report',
    desc: 'Rigorous oil dielectric breakdown voltage, moisture content, dissipation factor, and dissolved gas analysis (DGA) verification report.',
    issuer: 'Insulation Fluids Testing Laboratory'
  },
  {
    badge: 'Routine Test',
    title: 'Factory Routine Inspection',
    sub: 'Voltage Ratio, Resistance & Losses',
    certNo: 'Report No: 23133041280Y',
    src: 'assets/images/certificates/power-transformer-test-report.png',
    alt: 'Factory Routine Test Certificate (FAT)',
    desc: 'Factory acceptance test certificate recording winding resistance, voltage ratio, vector group confirmation, no-load loss, and load impedance.',
    issuer: 'Quality Inspection & Testing Department'
  }
];

window.QA_CERTS = QA_CERTS;

function Quality() {
  const bpelCards = WHY_BPEL_CARDS.map((card, i) => `
    <article class="why-bpel__card fade-in-up" data-delay="${i * 90}">
      <span class="why-bpel__icon-box" aria-hidden="true">${card.icon}</span>
      <div>
        <h3 class="why-bpel__card-title">${card.title.replace(/<br>/g, ' ')}</h3>
        <p class="why-bpel__card-text">${card.desc}</p>
      </div>
    </article>
  `).join('');

  const certCards = QA_CERTS.map((c, i) => `
    <article class="qa-cert-frame fade-in-up" data-delay="${(i % 5) * 70}" data-cert="${i}" role="button" tabindex="0" aria-label="View official ${c.title}" title="Click to inspect: ${c.title}">
      <div class="qa-frame-mat">
        <img src="${c.src}" alt="${c.alt}" loading="lazy" decoding="async">
      </div>
    </article>`).join('');

  return `
    <div class="wrap">
      <!-- Top Section: Why Work With BPEL (image collage left, reasons right) -->
      <div class="why-bpel">
        <div class="why-bpel__gallery fade-in-left" aria-hidden="true">
          <span class="why-bpel__deco"></span>
          <figure class="why-bpel__img why-bpel__img--main">
            <img src="assets/images/lifecycle/04-manufacturing-fat.jpg" alt="" loading="lazy" decoding="async">
          </figure>
          <figure class="why-bpel__img why-bpel__img--top">
            <img src="assets/images/lifecycle/02-engineering-design.jpg" alt="" loading="lazy" decoding="async">
          </figure>
          <figure class="why-bpel__img why-bpel__img--bottom">
            <img src="assets/images/lifecycle/06-testing-commissioning.jpg" alt="" loading="lazy" decoding="async">
          </figure>
          <div class="why-bpel__badge">
            <strong>Design · Build · Test</strong>
            <span>One accountable team</span>
          </div>
        </div>

        <div class="why-bpel__content">
          <div class="why-bpel__intro fade-in-right">
            <p class="label">WHY WORK WITH BPEL</p>
            <h2 class="why-bpel__title">Built in-house. Backed by engineers.</h2>
            <p class="why-bpel__lead">From raw material to final test, every transformer is designed, built and supported by one accountable team — so you get consistent quality, predictable delivery and support for the life of the equipment.</p>
          </div>
          <div class="why-bpel__grid">
            ${bpelCards}
          </div>
          <a href="#contact" class="why-bpel__btn fade-in-up">
            <span>Talk to an engineer</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      <!-- Bottom Section: Simple Framed Certificates Gallery (Matches User's Reference Photo) -->
      <div class="qa-certs-wrap fade-in-up">
        <div class="qa-certs-header">
          <div class="qa-certs-titles">
            <h3>Certificates & Test Reports</h3>
            <p>Official international accreditations and laboratory test reports (Click any certificate to inspect).</p>
          </div>
          <div class="qa-certs-nav">
            <button type="button" class="qa-arrow-btn" id="qa-cert-prev" aria-label="Previous certificates" title="Previous">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button type="button" class="qa-arrow-btn" id="qa-cert-next" aria-label="Next certificates" title="Next">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        <div class="qa-certs-slider">
          <div class="qa-certs-track" id="qa-certs-track">${certCards}</div>
        </div>
      </div>
    </div>
  `;
}

function initQuality() {
  const track   = document.getElementById('qa-certs-track');
  const prevBtn = document.getElementById('qa-cert-prev');
  const nextBtn = document.getElementById('qa-cert-next');
  if (!track || !prevBtn || !nextBtn) return;

  function getStep() {
    const card = track.firstElementChild;
    if (!card) return 220;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    return card.offsetWidth + gap;
  }

  nextBtn.addEventListener('click', () => {
    const step = getStep();
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  });

  prevBtn.addEventListener('click', () => {
    const step = getStep();
    if (track.scrollLeft <= 10) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  });
}

window.Quality = Quality;
window.WhyBPEL = Quality;
window.initQuality = initQuality;
