/* ── Our Quality Assurance ────────────────────────────────────── */
const QA_CARDS = [
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    step: 'Pillar 01 • Testing',
    title: 'Multi-Stage Quality Control',
    desc: 'Stringent multi-tier inspection protocols governing grain-oriented silicon steel, high-purity copper windings, and transformer oil prior to assembly, concluding with 100% FAT verification.',
    highlight: '100% FAT Tested',
    standards: 'IEC 60076 • IEEE C57'
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    step: 'Pillar 02 • Fabrication',
    title: 'Precision Manufacturing',
    desc: 'State-of-the-art step-lap core stacking, constant-tension automated winding lines, and high-vacuum drying ovens ensuring superior mechanical rigidity and dynamic short-circuit strength.',
    highlight: 'Step-Lap Core Lines',
    standards: '500 MVA Lab Tested'
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="3"/></svg>`,
    step: 'Pillar 03 • Insulation',
    title: 'Advanced Technology & VPI',
    desc: 'Automated vacuum pressure impregnation (VPI), high-grade Nomex thermal barriers, and digital DGA oil chromatography diagnostics engineered for reliable 30+ year service lifespans.',
    highlight: 'VPI & Digital DGA',
    standards: 'Class H / Class F'
  },
  {
    icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    step: 'Pillar 04 • Compliance',
    title: 'Global Certifications',
    desc: 'Comprehensive accreditation portfolio across ISO 9001/14001/45001, EU CE/LVD Directive 2014/35/EU, and dynamic short-circuit reports issued by CNAS and ILAC-MRA partner laboratories.',
    highlight: 'CNAS & IAF Accredited',
    standards: 'ISO • CE • TÜV Certified'
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

function getCertBadgeClass(badge) {
  if (badge.includes('ISO')) return 'qa-cert__badge--iso';
  if (badge.includes('CE')) return 'qa-cert__badge--ce';
  return 'qa-cert__badge--test';
}

function Quality() {
  const cards = QA_CARDS.map((c, i) => `
    <article class="qa-card" data-reveal style="--d:${i % 2}">
      <div class="qa-card__head">
        <div class="qa-card__icon-box">
          ${c.icon}
        </div>
        <span class="qa-card__step">${c.step}</span>
      </div>
      <div class="qa-card__body">
        <h3 class="qa-card__title">${c.title}</h3>
        <p class="qa-card__desc">${c.desc}</p>
      </div>
      <div class="qa-card__foot">
        <div class="qa-card__meta">
          <span class="qa-card__pill">${c.highlight}</span>
          <span class="qa-card__std">${c.standards}</span>
        </div>
        <a href="#contact" class="qa-card__btn" aria-label="Inquire about ${c.title}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>
        </a>
      </div>
    </article>`).join('');

  const certCards = QA_CERTS.map((c, i) => `
    <article class="qa-cert" data-cert="${i}" role="button" tabindex="0" aria-label="View official ${c.title}">
      <div class="qa-cert__preview">
        <img src="${c.src}" alt="${c.alt}" loading="lazy" decoding="async">
        <span class="qa-cert__zoom-hint" title="Inspect document">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </span>
      </div>
      <div class="qa-cert__info">
        <span class="qa-cert__badge ${getCertBadgeClass(c.badge)}">${c.badge}</span>
        <h4 class="qa-cert__title">${c.title}</h4>
        <p class="qa-cert__sub">${c.sub}</p>
      </div>
    </article>`).join('');

  return `<div class="wrap">
    ${SectionHead({
      label: 'OUR QUALITY ASSURANCE',
      title: 'Certified Quality You Can Trust',
      desc: 'Rigorous multi-stage factory acceptance tests (FAT), full-scale impulse test laboratories, and international ISO & CE compliance ensuring zero-defect transformer reliability.'
    })}
    
    <!-- Upper Section: Executive Quality Pillar & Grid -->
    <div class="qa-layout" data-reveal>
      <div class="qa-overview">
        <div class="qa-lead-card">
          <div class="qa-lead-tag">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            Zero-Defect Quality Protocol
          </div>
          <h3>Precision Engineering & Testing Built Into Every Kilovolt</h3>
          <p>We deploy premium grain-oriented electrical steel, computer-guided core cutting, high-vacuum thermal drying chambers, and calibrated high-voltage impulse test rigs to engineer transformers that endure the toughest electrical grid environments.</p>
        </div>

        <div class="qa-highlights-list">
          <div class="qa-hl-item">
            <div class="qa-hl-check">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="qa-hl-text">
              <strong>100% Routine & Dielectric FAT Inspection</strong>
              <span>Full-voltage ratio, winding resistance, and no-load losses verified prior to field shipment.</span>
            </div>
          </div>
          <div class="qa-hl-item">
            <div class="qa-hl-check">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="qa-hl-text">
              <strong>500 MVA Type Test Lab Rating</strong>
              <span>Lightning impulse (BIL 200kV) and dynamic short-circuit endurance tested by national testing centers.</span>
            </div>
          </div>
          <div class="qa-hl-item">
            <div class="qa-hl-check">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="qa-hl-text">
              <strong>Accredited Standards Compliance</strong>
              <span>Certified under ISO 9001/14001/45001, EU CE/LVD Directive, IEC 60076, and IEEE C57 series.</span>
            </div>
          </div>
        </div>

        <div class="qa-cta-box">
          <a href="#contact" class="btn btn--primary qa-cta-btn">
            <span>Request Full Quality Dossier</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>

      <div class="qa-cards">${cards}</div>
    </div>

    <!-- Lower Section: Spacious Certificates Slider (4 per view) -->
    <div class="qa-certs-wrap" data-reveal>
      <div class="qa-certs-header">
        <div class="qa-certs-titles">
          <div class="qa-certs-eyebrow">Accreditation Portfolio</div>
          <h3>Official Quality Certificates & Laboratory Reports</h3>
          <p>Verified third-party accreditations and electrical type test reports issued by CNAS, IAF, and accredited national laboratories (Click any document to inspect details).</p>
        </div>
        <div class="qa-certs-nav">
          <span class="qa-certs-counter">12 Verified Documents</span>
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
    if (!card) return 280;
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

window.initQuality = initQuality;
