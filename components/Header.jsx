'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';
import { DATA } from '@/lib/data';
import { NAV_ICONS, NAV_FOOTERS } from '@/lib/nav';
import { useUI } from './UIProvider';
import RawSvg from './RawSvg';

const Chevron = ({ className, size }) => (
  <svg className={className} viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 6 8 10 12 6"></polyline>
  </svg>
);

const TopIcon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const QuoteArrow = () => (
  <span className="header-quote-btn__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  </span>
);

export default function Header() {
  const { openSearch } = useUI();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(0);
  const navList = SITE.nav || [];
  const c = DATA.contact;

  const setDrawer = value => {
    setOpen(value);
    if (!value) setSubOpen(null); // close all mobile accordion submenus with the drawer
  };
  const drawerRef = useRef(setDrawer);
  drawerRef.current = setDrawer;

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') drawerRef.current(false); };

    // Header scroll appearance
    const onScroll = () => setScrolled(window.scrollY > 24);

    // Active top-level item spy (~40% down viewport)
    const secs = navList.map(n => document.querySelector(n.href));
    const spy = () => {
      const y = innerHeight * 0.4;
      let cur = 0;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= y) cur = i; });
      setCurrent(cur);
    };

    onScroll();
    spy();
    addEventListener('keydown', onKey);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('scroll', spy, { passive: true });
    addEventListener('resize', spy);
    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('scroll', onScroll);
      removeEventListener('scroll', spy);
      removeEventListener('resize', spy);
    };
  }, [navList]);

  const toggleSub = key => setSubOpen(prev => (prev === key ? null : key));
  const close = () => setDrawer(false);

  const onParentClick = (e, key) => {
    if (window.innerWidth <= 1024) {
      // In mobile view, clicking the parent heading toggles the accordion
      e.preventDefault();
      toggleSub(key);
    } else {
      // Desktop: clicking navigates and closes any focused dropdown
      close();
    }
  };

  const links = navList.map((n, idx) => {
    const key = n.label.toLowerCase();
    const isCurrent = idx === current ? { 'aria-current': 'true' } : {};
    const hasDropdown = Array.isArray(n.children) && n.children.length > 0;

    if (!hasDropdown) {
      return (
        <li className="nav-item" key={key}>
          <a href={n.href} className="nav-link nav-link--top" data-nav-link={key} {...isCurrent} onClick={close}>
            <span className="nav-link__dot" aria-hidden="true"></span>
            <span className="nav-link__text">{n.label}</span>
          </a>
        </li>
      );
    }

    const footer = NAV_FOOTERS[key];
    const isTwoCol = n.children.length > 4;
    const isOpen = subOpen === key;

    return (
      <li className={`nav-item nav-item--has-dropdown${isOpen ? ' is-open' : ''}`} data-dropdown={key} key={key}>
        <div className="nav-item__head">
          <a href={n.href} className="nav-link nav-link--top nav-link--has-sub" data-nav-link={key} aria-expanded="false" aria-haspopup="true" {...isCurrent}
             onClick={e => onParentClick(e, key)}>
            <span className="nav-link__dot" aria-hidden="true"></span>
            <span className="nav-link__text">{n.label}</span>
            <Chevron className="nav-chevron" size="10" />
          </a>
          <button type="button" className="nav-dropdown-toggle" aria-label={`Toggle ${n.label} submenu`} aria-expanded={isOpen}
                  onClick={e => { e.preventDefault(); e.stopPropagation(); toggleSub(key); }}>
            <Chevron size="12" />
          </button>
        </div>

        <div className={`dropdown-menu dropdown-menu--${key} ${isTwoCol ? 'dropdown-menu--wide' : ''}`} role="menu" aria-label={`${n.label} submenu`}>
          <div className="dropdown-menu__header">
            <span className="dropdown-menu__tag">{n.label}</span>
            <a href={n.href} className="dropdown-menu__all-link" onClick={close}>
              <span>Overview</span>
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="8" x2="13" y2="8"></line>
                <polyline points="9 4 13 8 9 12"></polyline>
              </svg>
            </a>
          </div>
          <div className={`dropdown-menu__grid ${isTwoCol ? 'dropdown-menu__grid--2col' : ''}`}>
            {n.children.map(ch => (
              <a href={ch.href} className="dropdown-item" role="menuitem" key={ch.title} onClick={close}>
                <span className="dropdown-item__icon" aria-hidden="true"><RawSvg markup={NAV_ICONS[ch.icon] || NAV_ICONS.zap} /></span>
                <span className="dropdown-item__content">
                  <span className="dropdown-item__title">{ch.title}</span>
                  <span className="dropdown-item__desc">{ch.desc}</span>
                </span>
              </a>
            ))}
          </div>
          {footer ? (
            <div className="dropdown-menu__footer">
              <span className="dropdown-menu__footer-text">{footer.text}</span>
              <a href={footer.href} className="dropdown-menu__footer-link" onClick={close}>{footer.cta}</a>
            </div>
          ) : null}
        </div>
      </li>
    );
  });

  return (
    <header id="site-header" className={`header${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="topbar">
        <div className="wrap topbar__in">
          <ul className="topbar__info">
            <li><TopIcon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></TopIcon><a href={`tel:${c.whatsapp || ''}`}>{c.phoneDisplay || ''}</a></li>
            <li><TopIcon><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></TopIcon><a href={`mailto:${c.email || ''}`}>{c.email || ''}</a></li>
            <li className="topbar__hours"><TopIcon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></TopIcon><span>Mon – Fri: 08:00 – 18:00</span></li>
          </ul>
          <p className="topbar__meta">ISO 9001:2015 Certified Manufacturer</p>
        </div>
      </div>
      <div className="header-shell">
        <div className="wrap header__inner">
          <a className="brand" href="#home" aria-label={`${SITE.name || 'BPEL'} home`}>
            <img src={SITE.logo || '/assets/images/logo.png'} alt={`${SITE.name || 'BPEL'} Logo`} className="brand__logo" />
          </a>

          <nav id="nav" className="nav" aria-label="Primary navigation">
            <ul className="nav__list">{links}</ul>
            <a className="header-quote-btn nav__cta nav__cta--mobile" href="#contact">
              <span className="header-quote-btn__text">GET A QUOTE</span>
              <QuoteArrow />
            </a>
          </nav>

          <div className="header__actions">
            <button type="button" className="search-btn" id="search-trigger" aria-label="Search specifications" title="Search (Ctrl + K)" onClick={openSearch}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="search-btn__text">Search</span>
              <kbd className="search-btn__kbd">Ctrl K</kbd>
            </button>

            <a className="header-quote-btn nav__cta--desktop" href="#contact" aria-label="Get a custom power transformer quote">
              <span className="header-quote-btn__text">GET A QUOTE</span>
              <QuoteArrow />
            </a>

            <button className="nav-toggle" aria-expanded={open} aria-controls="nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setDrawer(!open)}>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
