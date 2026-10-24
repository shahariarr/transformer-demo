'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PARTNERS } from '@/lib/partners';
import RawSvg from './RawSvg';
import SectionHead from './SectionHead';

/* Infinite marquee: the row is rendered twice and the track loops after one row width */
function Row({ hidden, rowRef }) {
  return (
    <div className="partners-row" id={hidden ? undefined : 'partners-row'} ref={rowRef} {...(hidden ? { 'aria-hidden': 'true' } : {})}>
      {PARTNERS.map(p => (
        <div className="partner-logo" style={{ '--brand': p.color }} title={p.name} key={p.name}><RawSvg markup={p.svg} /></div>
      ))}
    </div>
  );
}

export default function Partners() {
  const innerRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const inner = innerRef.current;
    const row = rowRef.current;
    let x = 0;
    let paused = false;
    let raf;
    const speed = 0.5;
    const enter = () => { paused = true; };
    const leave = () => { paused = false; };
    inner.addEventListener('mouseenter', enter);
    inner.addEventListener('mouseleave', leave);

    const tick = () => {
      if (!paused) {
        x -= speed;
        if (Math.abs(x) >= row.offsetWidth) x = 0;
        inner.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      inner.removeEventListener('mouseenter', enter);
      inner.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div className="wrap">
        <SectionHead label="OUR PARTNERS" title="Trusted by Industry Leaders"
          desc="We collaborate with world-class manufacturers and certification bodies to deliver reliable power solutions." />
      </div>
      <div className="partners-wrap fade-in-up" aria-label="Partner logos" data-delay="100">
        <div className="partners-inner" id="partners-inner" ref={innerRef}>
          <Row rowRef={rowRef} />
          <Row hidden />
        </div>
      </div>
      <div className="fade-in-up" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/about/partners/" className="btn btn--ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span>Explore All Strategic Partners &amp; Alliances</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </>
  );
}
