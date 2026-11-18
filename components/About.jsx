'use client';

import { useEffect, useRef } from 'react';
import { HIGHLIGHTS, ABOUT_BADGE_SVG } from '@/lib/about';
import RawSvg from './RawSvg';

export default function About() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => {
      try {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    };
    play();
    const onPause = () => play();
    v.addEventListener('pause', onPause);
    return () => v.removeEventListener('pause', onPause);
  }, []);

  return (
    <div className="wrap about__grid">
      <div className="about__copy" data-animate="slideInLeft">
        <p className="label">ABOUT OUR COMPANY</p>
        <h2>Engineering Expertise. Built Around Reliability.</h2>
        <p className="lead">Our engineers and manufacturing team work from specification through to quality assurance, installation and commissioning, so each project stays accountable to its drawings and to the network it joins.</p>
        <ul className="highlights">
          {HIGHLIGHTS.map((h, i) => (
            <li data-animate="slideInLeft" data-delay={100 + i * 80} key={h.t}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: h.i }} />
              <div><h3>{h.t}</h3><p>{h.d}</p></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__media" data-animate="slideInRight">
        <div className="about-collage">
          <div className="about-card about-card--main" data-animate="slideInRight" data-delay="100">
            <video
              ref={videoRef}
              className="about-card__video"
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              tabIndex={-1}
              preload="auto"
              poster="/assets/images/about-campus.jpg"
              aria-label="BPEL Corporate Video"
            >
              <source src="/assets/videos/about-corporate-video.mp4" type="video/mp4" />
            </video>
            {/* Transparent shield so user touches/clicks never interact with video and never show browser play/pause overlays */}
            <div className="about-card__shield" aria-hidden="true" />
          </div>

          <div className="about-badge" data-animate="slideInRight" data-delay="300" tabIndex="0" role="region" aria-label="Founded In 1985 Years">
            <div className="about-badge__icon">
              <RawSvg markup={ABOUT_BADGE_SVG} />
            </div>
            <div className="about-badge__label">Founded In</div>
            <div className="about-badge__stat">
              <span className="about-badge__num">1985</span>
              <span className="about-badge__unit">Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
