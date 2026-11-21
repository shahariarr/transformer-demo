'use client';

import { useEffect, useRef, useState } from 'react';
import { HIGHLIGHTS, ABOUT_BADGE_SVG } from '@/lib/about';
import RawSvg from './RawSvg';

export default function About() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => {
      try {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => { });
      } catch { }
    };
    play();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div className="wrap about__grid">
      <div className="about__copy" data-animate="slideInLeft">
        <p className="label">ABOUT OUR COMPANY</p>
        <h2>Engineering Expertise. Built Around <span className="text-accent">Reliability</span>.</h2>
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
            {/* Live facility tag */}
            <div className="about-video-status" aria-hidden="true">
              <span className="about-video-status__dot" />
              <span>Plant & Engineering Operations</span>
            </div>

            {/* Subtle control button */}
            <button
              type="button"
              className="about-video-ctrl"
              aria-label={isPlaying ? 'Pause corporate video' : 'Play corporate video'}
              title={isPlaying ? 'Pause video' : 'Play video'}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1.5" />
                  <rect x="14" y="4" width="4" height="16" rx="1.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              )}
            </button>

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
            {/* Shield allows clicks on play button while preventing accidental browser overlays */}
            <div className="about-card__shield" aria-hidden="true" onClick={togglePlay} />
          </div>

          <div className="about-badge" data-animate="slideInRight" data-delay="300" tabIndex="0" role="region" aria-label="Founded In 1985 Years">
            <div className="about-badge__icon">
              <RawSvg markup={ABOUT_BADGE_SVG} />
            </div>
            <div className="about-badge__info">
              <div className="about-badge__label">FOUNDED IN</div>
              <div className="about-badge__stat">
                <span className="about-badge__num">1985</span>
                <span className="about-badge__unit">Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
