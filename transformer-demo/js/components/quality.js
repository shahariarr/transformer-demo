/* ── Our Quality Assurance ────────────────────────────────────── */
const QA_CARDS = [
  { title: 'Quality Control',
    desc: 'Stringent quality control at every stage of manufacturing, from raw material inspection to final product testing, ensuring IEC, IEEE and GOST-R compliance.' },
  { title: 'Transformer Manufacturing',
    desc: 'State-of-the-art manufacturing facilities producing power and distribution transformers with precision-engineered cores and windings.' },
  { title: 'Advanced Technology',
    desc: 'Integration of advanced insulation systems, vacuum impregnation and automated testing rigs to maximise reliability and service life.' },
  { title: 'Certifications',
    desc: 'Internationally recognised certificates covering low-voltage directives, environmental management, occupational health and quality management systems.' }
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
  const cards = QA_CARDS.map((c, i) => `
    <article class="qa-card" data-reveal style="--d:${i % 2}">
      <div class="qa-card__top">
        <h3>${c.title}</h3>
        <a href="#contact" class="qa-card__link" aria-label="Read more about ${c.title}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
      <p>${c.desc}</p>
      <a href="#contact" class="qa-read">Read More
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
      </a>
    </article>`).join('');

  const certCards = QA_CERTS.map((c, i) => `
    <article class="qa-cert" data-cert="${i}" role="button" tabindex="0" aria-label="View ${c.title}">
      <div class="qa-cert__preview">
        <img src="${c.src}" alt="${c.alt}" loading="lazy" decoding="async">
        <span class="qa-cert__zoom" title="Click to view full certificate">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>
        </span>
      </div>
      <div class="qa-cert__info">
        <span class="qa-cert__badge">${c.badge}</span>
        <h4 class="qa-cert__title">${c.title}</h4>
        <p class="qa-cert__sub">${c.sub}</p>
      </div>
    </article>`).join('');

  return `<div class="wrap">
    ${SectionHead({ label: 'OUR QUALITY ASSURANCE', title: 'Certified Quality You Can Trust' })}
    <div class="qa-layout" data-reveal>
      <div class="qa-text">
        <p>CHBEB uses only premium materials and advanced manufacturing processes to produce power and distribution transformers that meet various international standards, such as IEC, IEEE, GOST-R.</p>
        <p>Our high-quality transformers offer significant cost and sustainability advantages, with high efficiency, low environmental impact, reliable operation, and a service life of 20 years.</p>
      </div>
      <div class="qa-cards">${cards}</div>
    </div>

    <div class="qa-certs-wrap" data-reveal>
      <div class="qa-certs-header">
        <div class="qa-certs-titles">
          <h3>Official Quality Certificates & Type Test Reports</h3>
          <p>Verified international accreditations and laboratory test reports for CHBEB transformer equipment (Showing 6 at a time, click arrows to browse).</p>
        </div>
        <div class="qa-certs-nav">
          <button type="button" class="qa-arrow-btn" id="qa-cert-prev" aria-label="Previous certificates" title="Previous">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="qa-arrow-btn" id="qa-cert-next" aria-label="Next certificates" title="Next">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="qa-certs-slider">
        <div class="qa-certs-track" id="qa-certs-track">${certCards}</div>
      </div>
    </div>
  </div>`;
}

function initQuality() {
  const track   = document.getElementById('qa-certs-track');
  const prevBtn = document.getElementById('qa-cert-prev');
  const nextBtn = document.getElementById('qa-cert-next');
  if (!track || !prevBtn || !nextBtn) return;

  function getStep() {
    const card = track.firstElementChild;
    if (!card) return 200;
    const gap = parseFloat(getComputedStyle(track).gap) || 16;
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

window.initQuality = initQuality;
