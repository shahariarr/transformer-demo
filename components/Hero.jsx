'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';
import { HERO_SLIDES } from '@/lib/hero';

const speed = () => SITE.videoPlaybackRate || 2.0;
const applySpeed = v => { v.defaultPlaybackRate = speed(); v.playbackRate = speed(); };
const safePlay = v => { applySpeed(v); const p = v.play(); if (p && p.catch) p.catch(() => {}); };

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState(() => HERO_SLIDES.map(() => false));
  const sliderRef = useRef(null);
  const videos = useRef([]);
  const prevRef = useRef(0);
  const timer = useRef(null);
  const state = useRef({ hovered: false, visible: true });
  const duration = SITE.slideDuration || 6500;
  const total = HERO_SLIDES.length;

  const resetTimer = useCallback(() => {
    clearInterval(timer.current);
    if (state.current.visible && !state.current.hovered) {
      timer.current = setInterval(() => setCurrent(c => (c + 1) % total), duration);
    }
  }, [duration, total]);

  const goTo = useCallback(index => {
    const next = (index + total) % total;
    setCurrent(c => (c === next ? c : next));
    resetTimer();
  }, [resetTimer, total]);

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Video setup: playback speed, error fallback, reduced motion, play only while on screen
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];
    videos.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      v.controls = false;
      applySpeed(v);
      const onSpeed = () => applySpeed(v);
      const onRate = () => { if (Math.abs(v.playbackRate - speed()) > 0.05) v.playbackRate = speed(); };
      const fail = () => setFailed(f => f.map((x, k) => (k === i ? true : x)));
      const src = v.querySelector('source');
      v.addEventListener('loadedmetadata', onSpeed);
      v.addEventListener('play', onSpeed);
      v.addEventListener('ratechange', onRate);
      v.addEventListener('error', fail);
      if (src) src.addEventListener('error', fail);
      cleanups.push(() => {
        v.removeEventListener('loadedmetadata', onSpeed);
        v.removeEventListener('play', onSpeed);
        v.removeEventListener('ratechange', onRate);
        v.removeEventListener('error', fail);
        if (src) src.removeEventListener('error', fail);
      });

      if (reduce) { v.removeAttribute('autoplay'); v.pause(); return; }

      const tv = v.closest('[data-tv]');
      const io = new IntersectionObserver(([e]) => {
        const slide = tv.closest('.hero-slide');
        if (slide && !slide.classList.contains('is-active')) { v.pause(); return; }
        e.isIntersecting ? safePlay(v) : v.pause();
      }, { threshold: 0.15 });
      io.observe(tv);
      cleanups.push(() => io.disconnect());
    });
    return () => cleanups.forEach(f => f());
  }, []);

  // Slide change: pause the old video, restart the new one
  useEffect(() => {
    const prevIdx = prevRef.current;
    if (prevIdx === current) return;
    const pv = videos.current[prevIdx];
    if (pv) pv.pause();
    const nv = videos.current[current];
    if (nv) { nv.currentTime = 0; safePlay(nv); }
    prevRef.current = current;
  }, [current]);

  // Autoplay timer: only while visible, not hovered, and the tab is shown
  useEffect(() => {
    const slider = sliderRef.current;
    const io = new IntersectionObserver(([entry]) => {
      state.current.visible = entry.isIntersecting;
      entry.isIntersecting ? resetTimer() : clearInterval(timer.current);
    }, { threshold: 0.15 });
    io.observe(slider);
    const onVis = () => (document.hidden ? clearInterval(timer.current) : resetTimer());
    document.addEventListener('visibilitychange', onVis);
    resetTimer();
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      clearInterval(timer.current);
    };
  }, [resetTimer]);

  const touchX = useRef(0);

  return (
    <div className="hero-slider" id="hero-slider" ref={sliderRef} style={{ '--hero-slide-duration': `${duration}ms` }}
         onKeyDown={e => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); }}
         onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
         onTouchEnd={e => {
           const diff = e.changedTouches[0].clientX - touchX.current;
           if (Math.abs(diff) > 40) (diff < 0 ? next() : prev());
         }}>
      <div className="hero-slides-wrap">
        {HERO_SLIDES.map((s, i) => (
          <div className={`hero-slide ${i === current ? 'is-active' : ''}`} data-hero-slide={i} key={s.id}>
            <div className="wrap hero__grid">
              <div className="hero__copy">
                <p className="label hero__in" style={{ '--d': 0 }}>{s.label}</p>
                <h1 className="hero__in" style={{ '--d': 1 }}>{s.title}</h1>
                <p className="lead hero__in" style={{ '--d': 2 }}>{s.lead}</p>
                <div className="cta hero__in" style={{ '--d': 3 }}>
                  <a className="btn btn--primary" href={s.ctaPrimary.href}>{s.ctaPrimary.text}</a>
                  <a className="btn btn--ghost" href={s.ctaSecondary.href}>{s.ctaSecondary.text}</a>
                </div>
                <ul className="caps hero__in" style={{ '--d': 4 }}>
                  {s.caps.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="hero__media">
                <div className="tv" data-tv="" id={`tv-hero-${i}`} style={{ '--poster': `url('${s.poster}')` }}>
                  <video className="tv__video" ref={el => { videos.current[i] = el; }} muted loop autoPlay={i === 0} playsInline
                         disablePictureInPicture disableRemotePlayback preload={i === 0 ? 'auto' : 'metadata'}
                         poster={s.poster} aria-label={s.title} suppressHydrationWarning>
                    <source src={s.video} type="video/mp4" />
                  </video>
                  <p className="tv__fallback" role="status" hidden={!failed[i]}>The animation could not be loaded.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="wrap hero-bottom"
           onMouseEnter={() => { state.current.hovered = true; clearInterval(timer.current); }}
           onMouseLeave={() => { state.current.hovered = false; resetTimer(); }}>
        <div className="hero-indicators" role="tablist" aria-label="Hero slider pagination">
          {HERO_SLIDES.map((s, i) => (
            <button type="button" className={`hero-indicator ${i === current ? 'is-active' : ''}`} data-hero-tab={i} role="tab" key={s.id}
                    aria-selected={i === current ? 'true' : 'false'} aria-label={`Slide ${i + 1}: ${s.tabTitle}`}
                    onClick={() => { if (i !== current) goTo(i); }}>
              <span className="hero-indicator__header">
                <span className="hero-indicator__num">{s.tabNum}</span>
                <span className="hero-indicator__title">{s.tabTitle}</span>
              </span>
              <span className="hero-indicator__track"><span className="hero-indicator__fill"></span></span>
            </button>
          ))}
        </div>
        <div className="hero-nav-actions">
          <div className="hero-counter" aria-live="polite">
            <span className="hero-counter__curr" id="hero-curr-num">{'0' + (current + 1)}</span>
            <span className="hero-counter__sep">/</span>
            <span className="hero-counter__total">04</span>
          </div>
          <div className="hero-nav-btns">
            <button type="button" className="hero-arrow-btn" id="hero-prev" aria-label="Previous slide" title="Previous slide" onClick={prev}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="hero-arrow-btn" id="hero-next" aria-label="Next slide" title="Next slide" onClick={next}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
