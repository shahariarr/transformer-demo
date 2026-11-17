'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SITE } from '@/lib/site';
import { DATA } from '@/lib/data';
import { NAV_ICONS } from '@/lib/nav';
import { useUI } from './UIProvider';
import RawSvg from './RawSvg';
import LanguageSelector from './LanguageSelector';

const normStr = (str) =>
  (str || '')
    .toString()
    .toLowerCase()
    .replace(/[\u2013\u2014–—]/g, '-')
    .replace(/[≤]/g, '<=')
    .replace(/\s+/g, ' ')
    .trim();

const checkChildActive = (chHref, pathname, currentCat) => {
  if (chHref.includes('cat=')) {
    const targetCat = decodeURIComponent(chHref.split('cat=')[1].split('&')[0]);
    return currentCat ? normStr(currentCat) === normStr(targetCat) : false;
  }
  const cleanHref = chHref.endsWith('/') ? chHref : chHref + '/';
  return pathname === cleanHref || (chHref !== '/' && chHref !== '/contact/' && pathname === cleanHref);
};

const Chevron = ({ className, size = 10 }) => (
  <svg className={className} viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 6 8 10 12 6"></polyline>
  </svg>
);

const ChevronRight = ({ className, size = 10 }) => (
  <svg className={className} viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 3 11 8 6 13"></polyline>
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

function HeaderContent() {
  const { openSearch } = useUI();
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(null);
  const [nestedSubOpen, setNestedSubOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeOverride, setActiveOverride] = useState(null);
  const [closedDropdownKey, setClosedDropdownKey] = useState(null);
  const [dropdownsSuppressed, setDropdownsSuppressed] = useState(false);
  const rawPath = usePathname() || '/';
  const pathname = rawPath.endsWith('/') ? rawPath : rawPath + '/';
  const searchParams = useSearchParams();
  const searchStr = searchParams ? searchParams.toString() : '';
  const currentCat = searchParams ? (searchParams.get('cat') || searchParams.get('category')) : null;
  const navList = SITE.nav || [];

  // Active top-level item index calculation:
  // 1. Direct top-level path match takes highest precedence
  let calculatedIndex = navList.findIndex(n => {
    if (n.href === '/') return pathname === '/';
    return pathname === n.href || (n.href !== '/' && pathname.startsWith(n.href));
  });

  // 2. If no direct top-level match, check sections or children
  if (calculatedIndex === -1) {
    calculatedIndex = navList.findIndex(n => {
      if (Array.isArray(n.sections)) {
        const matchesSection = n.sections.some(s => {
          if (s.href !== '/' && (pathname === s.href || pathname.startsWith(s.href))) return true;
          return s.items?.some(c => c.href !== '/' && c.href !== '/contact/' && (pathname === c.href || pathname.startsWith(c.href)));
        });
        if (matchesSection) return true;
      }
      if (!n.children || n.children.length === 0) return false;
      return n.children.some(c => c.href !== '/' && c.href !== '/contact/' && (pathname === c.href || pathname.startsWith(c.href)));
    });
  }

  if (calculatedIndex === -1 && pathname === '/') {
    calculatedIndex = 0;
  }

  // Active top-level item: uses clicked override immediately, then falls back to calculatedIndex
  const current = activeOverride !== null ? activeOverride : calculatedIndex;
  const c = DATA.contact;

  const setDrawer = value => {
    setOpen(value);
    if (!value) {
      setSubOpen(null); // close all mobile accordion submenus with the drawer
      setNestedSubOpen(null);
      document.documentElement.classList.remove('menu-open');
    }
  };
  const drawerRef = useRef(setDrawer);
  drawerRef.current = setDrawer;

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  // Auto-hide the drawer and unsuppress dropdown locks after navigating or changing query params
  useEffect(() => {
    drawerRef.current(false);
    setActiveOverride(null);
    setDropdownsSuppressed(false);
    setClosedDropdownKey(null);
    setNestedSubOpen(null);
    document.documentElement.classList.remove('menu-open');
  }, [pathname, searchStr]);

  // Reset dropdown suppression as soon as user moves cursor outside the header
  useEffect(() => {
    const onMove = e => {
      const header = document.getElementById('site-header');
      if (header && !header.contains(e.target)) {
        setDropdownsSuppressed(false);
        setClosedDropdownKey(null);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') drawerRef.current(false); };
    // Header scroll appearance
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener('keydown', onKey);
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('keydown', onKey);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggleSub = key => {
    setSubOpen(prev => {
      if (prev === key) {
        setNestedSubOpen(null);
        return null;
      }
      return key;
    });
  };

  const toggleNestedSub = subKey => {
    setNestedSubOpen(prev => (prev === subKey ? null : subKey));
  };

  const close = () => {
    setDrawer(false);
    setClosedDropdownKey(null);
    setNestedSubOpen(null);
  };

  const handleNavClick = (idx, key) => {
    setActiveOverride(idx);
    if (key) {
      setClosedDropdownKey(key);
      // Auto-unlock after brief transition
      setTimeout(() => {
        setClosedDropdownKey(null);
        setDropdownsSuppressed(false);
      }, 350);
    }
    if (typeof document !== 'undefined' && document.activeElement) {
      document.activeElement.blur();
    }
    close();
  };

  const onParentClick = (e, key, idx) => {
    if (window.innerWidth <= 1024) {
      // In mobile view, clicking the parent heading toggles the accordion
      e.preventDefault();
      toggleSub(key);
    } else {
      // Desktop: clicking navigates, sets active, and closes any focused dropdown
      handleNavClick(idx, key);
    }
  };

  const links = navList.map((n, idx) => {
    const key = n.label.toLowerCase();
    const isCurrentActive = idx === current;
    const isCurrent = isCurrentActive ? { 'aria-current': 'true' } : {};
    const hasDropdown = (Array.isArray(n.children) && n.children.length > 0) || (Array.isArray(n.sections) && n.sections.length > 0);

    if (!hasDropdown) {
      return (
        <li className={`nav-item${isCurrentActive ? ' is-active' : ''}`} key={key}>
          <Link
            href={n.href}
            className={`nav-link nav-link--top${isCurrentActive ? ' is-active' : ''}`}
            data-nav-link={key}
            {...isCurrent}
            onClick={() => handleNavClick(idx)}
          >
            <span className="nav-link__dot" aria-hidden="true"></span>
            <span className="nav-link__text">{n.label}</span>
          </Link>
        </li>
      );
    }

    const isOpen = subOpen === key;
    const isDropdownClosed = closedDropdownKey === key;

    return (
      <li
        className={`nav-item nav-item--has-dropdown${isCurrentActive ? ' is-active' : ''}${isOpen ? ' is-open' : ''}${isDropdownClosed ? ' is-dropdown-closed' : ''}`}
        data-dropdown={key}
        key={key}
        onMouseLeave={() => {
          setClosedDropdownKey(null);
          setDropdownsSuppressed(false);
        }}
        onMouseEnter={() => {
          setClosedDropdownKey(null);
        }}
      >
        <div className="nav-item__head">
          <Link
            href={n.href}
            className={`nav-link nav-link--top nav-link--has-sub${isCurrentActive ? ' is-active' : ''}`}
            data-nav-link={key}
            aria-expanded={isOpen}
            aria-haspopup="true"
            {...isCurrent}
            onClick={e => onParentClick(e, key, idx)}
          >
            <span className="nav-link__dot" aria-hidden="true"></span>
            <span className="nav-link__text">{n.label}</span>
            <Chevron className="nav-chevron" size="10" />
          </Link>
          <button
            type="button"
            className="nav-dropdown-toggle"
            aria-label={`Toggle ${n.label} submenu`}
            aria-expanded={isOpen}
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleSub(key); }}
          >
            <Chevron size="12" />
          </button>
        </div>

        <ul
          className="dropdown-menu dropdown-menu--list"
          role="menu"
          aria-label={`${n.label} submenu`}
        >
          {n.sections ? (
            n.sections.map((sec, secIdx) => {
              const secKey = `${key}-${secIdx}`;
              const isSecOpen = nestedSubOpen === secKey;
              const hasSubmenu = Array.isArray(sec.items) && sec.items.length > 0;
              const isSecActive =
                pathname === sec.href ||
                (sec.href !== '/' && pathname.startsWith(sec.href)) ||
                sec.items?.some(it => checkChildActive(it.href, pathname, currentCat));

              return (
                <li
                  key={sec.title}
                  className={`dropdown-list-item${hasSubmenu ? ' dropdown-list-item--has-sub' : ''}${isSecActive ? ' is-active' : ''}${isSecOpen ? ' is-sub-open' : ''}`}
                >
                  <div className="dropdown-list-item__head">
                    <Link
                      href={sec.href}
                      className={`dropdown-list-link${isSecActive ? ' is-active' : ''}`}
                      role="menuitem"
                      aria-haspopup={hasSubmenu ? 'true' : undefined}
                      aria-expanded={hasSubmenu ? (isSecOpen ? 'true' : 'false') : undefined}
                      onClick={() => handleNavClick(idx, key)}
                    >
                      <span className="dropdown-list-link__text">{sec.title}</span>
                      {hasSubmenu && <ChevronRight className="dropdown-list-arrow" size="10" />}
                    </Link>
                    {hasSubmenu && (
                      <button
                        type="button"
                        className="nav-subdropdown-toggle"
                        aria-label={`Toggle ${sec.title} submenu`}
                        aria-expanded={isSecOpen}
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleNestedSub(secKey);
                        }}
                      >
                        <Chevron size="10" />
                      </button>
                    )}
                  </div>

                  {hasSubmenu && (
                    <ul className={`dropdown-submenu${isSecOpen ? ' is-open' : ''}`} role="menu" aria-label={`${sec.title} submenu`}>
                      {sec.items.map(ch => {
                        const isChildActive = checkChildActive(ch.href, pathname, currentCat);
                        return (
                          <li key={ch.title} className="dropdown-submenu-item">
                            <Link
                              href={ch.href}
                              className={`dropdown-subitem${isChildActive ? ' is-active' : ''}`}
                              role="menuitem"
                              aria-current={isChildActive ? 'page' : undefined}
                              onClick={() => handleNavClick(idx, key)}
                            >
                              {ch.icon && (
                                <span className="dropdown-subitem__icon" aria-hidden="true">
                                  <RawSvg markup={NAV_ICONS[ch.icon] || NAV_ICONS.zap} />
                                </span>
                              )}
                              <span className="dropdown-subitem__text">{ch.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })
          ) : (
            n.children?.map(ch => {
              const isChildActive = checkChildActive(ch.href, pathname, currentCat);
              return (
                <li key={ch.title} className="dropdown-list-item">
                  <Link
                    href={ch.href}
                    className={`dropdown-list-link${isChildActive ? ' is-active' : ''}`}
                    role="menuitem"
                    aria-current={isChildActive ? 'page' : undefined}
                    onClick={() => handleNavClick(idx, key)}
                  >
                    {ch.icon && (
                      <span className="dropdown-subitem__icon" aria-hidden="true">
                        <RawSvg markup={NAV_ICONS[ch.icon] || NAV_ICONS.zap} />
                      </span>
                    )}
                    <span className="dropdown-list-link__text">{ch.title}</span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </li>
    );
  });

  return (
    <header id="site-header" className={`header${open ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}${dropdownsSuppressed ? ' dropdown-hidden' : ''}`}>
      <div className="topbar">
        <div className="wrap topbar__in">
          <ul className="topbar__info">
            <li><TopIcon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></TopIcon><a href={`tel:${c.whatsapp || ''}`}>{c.phoneDisplay || ''}</a></li>
            <li><TopIcon><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></TopIcon><a href={`mailto:${c.email || ''}`}>{c.email || ''}</a></li>
          </ul>
        </div>
      </div>
      <div className="header-shell">
        <div className="wrap header__inner">
          <Link
            className="brand"
            href="/"
            aria-label={`${SITE.name || 'BPEL'} home`}
            onClick={() => handleNavClick(0)}
          >
            <img src={SITE.logo || '/assets/images/logo.png'} alt={`${SITE.name || 'BPEL'} Logo`} className="brand__logo" fetchPriority="high" decoding="async" />
          </Link>

          <nav id="nav" className="nav" aria-label="Primary navigation">
            <ul className="nav__list">{links}</ul>
            <Link
              className={`header-quote-btn nav__cta nav__cta--mobile${pathname.startsWith('/contact/') ? ' is-active' : ''}`}
              href="/contact/"
              onClick={() => handleNavClick(navList.findIndex(n => n.href === '/contact/'))}
            >
              <span className="header-quote-btn__text">GET A QUOTE</span>
              <QuoteArrow />
            </Link>
          </nav>

          <div className="header__actions">
            <button type="button" className="search-btn" id="search-trigger" aria-label="Search specifications" title="Search (Ctrl + K)" onClick={openSearch}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="search-btn__text">Search</span>
            </button>

            <Link
              className={`header-quote-btn nav__cta--desktop${pathname.startsWith('/contact/') ? ' is-active' : ''}`}
              href="/contact/"
              aria-label="Get a custom power transformer quote"
              onClick={() => handleNavClick(navList.findIndex(n => n.href === '/contact/'))}
            >
              <span className="header-quote-btn__text">GET A QUOTE</span>
              <QuoteArrow />
            </Link>

            <LanguageSelector />

            <button className="nav-toggle" aria-expanded={open} aria-controls="nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setDrawer(!open)}>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header id="site-header" className="header" />}>
      <HeaderContent />
    </Suspense>
  );
}
