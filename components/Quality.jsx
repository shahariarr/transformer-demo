'use client';

import { useRef } from 'react';
import { WHY_BPEL_CARDS, QA_CERTS } from '@/lib/quality';
import { useUI } from './UIProvider';
import RawSvg from './RawSvg';
import ViewAll from './ViewAll';

export default function Quality({ showWhy = true, showCerts = true, viewAll = true }) {
  const { openCert } = useUI();
  const trackRef = useRef(null);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 220;
    const card = track.firstElementChild;
    if (!card) return 220;
    return card.offsetWidth + (parseFloat(getComputedStyle(track).gap) || 24);
  };

  const next = () => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: step(), behavior: 'smooth' });
  };

  const prev = () => {
    const track = trackRef.current;
    if (!track) return;
    if (track.scrollLeft <= 10) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    else track.scrollBy({ left: -step(), behavior: 'smooth' });
  };

  return (
    <div className="wrap">
      {/* Top Section: Why Work With BPEL (image collage left, reasons right) */}
      {showWhy ? <div className="why-bpel">
        <div className="why-bpel__gallery" data-animate="slideInLeft" aria-hidden="true">
          <span className="why-bpel__deco"></span>
          <span className="why-bpel__dots"></span>
          <figure className="why-bpel__img why-bpel__img--main">
            <img src="/assets/images/lifecycle/04-manufacturing-fat.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="why-bpel__img why-bpel__img--top">
            <img src="/assets/images/lifecycle/02-engineering-design.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <figure className="why-bpel__img why-bpel__img--bottom">
            <img src="/assets/images/lifecycle/06-testing-commissioning.jpg" alt="" loading="lazy" decoding="async" />
          </figure>
          <div className="why-bpel__seal">
            <svg viewBox="0 0 120 120" className="why-bpel__seal-ring">
              <defs><path id="seal-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" /></defs>
              <text><textPath href="#seal-path" textLength="286" lengthAdjust="spacing">DESIGN · BUILD · TEST · ONE TEAM · </textPath></text>
            </svg>
            <span className="why-bpel__seal-core"><small>Since</small><strong>1985</strong></span>
          </div>
        </div>

        <div className="why-bpel__content">
          <div className="why-bpel__intro" data-animate="slideInRight">
            <p className="label">WHY WORK WITH BPEL</p>
            <h2 className="why-bpel__title">Built in-house. Backed by engineers.</h2>
            <p className="why-bpel__lead">From raw material to final test, every transformer is designed, built and supported by one accountable team — so you get consistent quality, predictable delivery and support for the life of the equipment.</p>
          </div>

          <div className="why-bpel__grid">
            {WHY_BPEL_CARDS.map((card, i) => (
              <article className="why-bpel__card" data-animate="slideInUp" data-delay={i * 90} key={card.title}>
                <span className="why-bpel__num" aria-hidden="true">{`0${i + 1}`}</span>
                <span className="why-bpel__icon-box" aria-hidden="true"><RawSvg markup={card.icon} /></span>
                <div>
                  <h3 className="why-bpel__card-title">{card.title.replace(/<br>/g, ' ')}</h3>
                  <p className="why-bpel__card-text">{card.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <a href="/contact/" className="why-bpel__btn" data-animate="slideInUp">
            <span>Talk to an engineer</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </div> : null}

      {/* Bottom Section: Framed Certificates Gallery */}
      {showCerts ? <div className="qa-certs-wrap" data-animate="slideInUp">
        <div className="qa-certs-header">
          <div className="qa-certs-titles">
            <h3>Certificates & Test Reports</h3>
            <p>Official international accreditations and laboratory test reports (Click any certificate to inspect).</p>
          </div>
          <div className="qa-certs-nav">
            {viewAll ? <ViewAll href="/certifications/">View all</ViewAll> : null}
            <button type="button" className="qa-arrow-btn" id="qa-cert-prev" aria-label="Previous certificates" title="Previous" onClick={prev}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="qa-arrow-btn" id="qa-cert-next" aria-label="Next certificates" title="Next" onClick={next}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div className="qa-certs-slider">
          <div className="qa-certs-track" id="qa-certs-track" ref={trackRef}>
            {QA_CERTS.map((c, i) => (
              <article className="qa-cert-frame fade-in-up" data-delay={(i % 5) * 70} data-cert={i} role="button" tabIndex="0" key={c.certNo}
                       aria-label={`View official ${c.title}`} title={`Click to inspect: ${c.title}`}
                       onClick={() => openCert(i)}
                       onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCert(i); } }}>
                <div className="qa-frame-mat">
                  <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
                </div>
                <div className="qa-frame-info">
                  <span className="qa-frame-badge">{c.badge}</span>
                  <h4 className="qa-frame-title">{c.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div> : null}
    </div>
  );
}
