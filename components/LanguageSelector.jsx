'use client';

import { useState, useEffect, useRef } from 'react';

// 19 Languages exactly as displayed in the design reference
const LANGUAGES = [
  // Column 1 (in 3-col row flow: index 0, 3, 6, 9, 12, 15, 18)
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'pt', name: 'Portugues' },
  { code: 'es', name: 'Spanish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'tr', name: 'Turkish' },
  { code: 'it', name: 'Italian' },
  { code: 'id', name: 'Indonesian' },
  { code: 'pl', name: 'Polish' },
  { code: 'hi', name: 'Hindi' },
  { code: 'nl', name: 'Dutch' },
  { code: 'ms', name: 'Malay' },
  { code: 'fa', name: 'Persian' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' }
];

// High-fidelity, self-contained SVG flags for the 19 languages
function FlagIcon({ code, className = 'lang-flag' }) {
  const commonProps = {
    className,
    width: 22,
    height: 15,
    viewBox: '0 0 600 400',
    'aria-hidden': 'true',
    style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }
  };

  switch (code) {
    case 'en': // United Kingdom
      return (
        <svg {...commonProps} viewBox="0 0 60 30">
          <clipPath id="en-clip">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <clipPath id="en-diag">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clipPath="url(#en-clip)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#en-diag)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'fr': // France
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#002654" />
          <rect width="1" height="2" x="1" fill="#ffffff" />
          <rect width="1" height="2" x="2" fill="#ED2939" />
        </svg>
      );

    case 'de': // Germany
      return (
        <svg {...commonProps} viewBox="0 0 5 3">
          <rect width="5" height="1" fill="#000000" />
          <rect width="5" height="1" y="1" fill="#DD0000" />
          <rect width="5" height="1" y="2" fill="#FFCE00" />
        </svg>
      );

    case 'pt': // Portugal
      return (
        <svg {...commonProps} viewBox="0 0 600 400">
          <rect width="240" height="400" fill="#046A38" />
          <rect x="240" width="360" height="400" fill="#DA291C" />
          <circle cx="240" cy="200" r="82" fill="#FFC72C" />
          <circle cx="240" cy="200" r="62" fill="#046A38" stroke="#111" strokeWidth="4" />
          <path d="M210,165 h60 v45 c0,28 -30,48 -30,48 c0,0 -30,-20 -30,-48 z" fill="#ffffff" stroke="#DA291C" strokeWidth="6" />
          <path d="M222,175 h36 v30 c0,15 -18,24 -18,24 c0,0 -18,-9 -18,-24 z" fill="#002B7F" />
        </svg>
      );

    case 'es': // Spain
      return (
        <svg {...commonProps} viewBox="0 0 750 500">
          <rect width="750" height="125" fill="#AA151B" />
          <rect y="125" width="750" height="250" fill="#F1BF00" />
          <rect y="375" width="750" height="125" fill="#AA151B" />
          <circle cx="200" cy="250" r="42" fill="#AA151B" opacity="0.9" />
          <circle cx="200" cy="250" r="28" fill="#F1BF00" />
        </svg>
      );

    case 'ru': // Russia
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="0.667" fill="#ffffff" />
          <rect y="0.667" width="3" height="0.667" fill="#0039A6" />
          <rect y="1.333" width="3" height="0.667" fill="#D52B1E" />
        </svg>
      );

    case 'ja': // Japan
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#ffffff" />
          <circle cx="1.5" cy="1" r="0.6" fill="#BC002D" />
        </svg>
      );

    case 'ko': // South Korea
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#ffffff" />
          <circle cx="1.5" cy="1" r="0.45" fill="#CD2E3A" />
          <path d="M1.05,1 A0.45,0.45 0 0,0 1.95,1 A0.225,0.225 0 0,0 1.5,1 A0.225,0.225 0 0,1 1.05,1" fill="#0047A0" />
          <rect x="0.38" y="0.3" width="0.25" height="0.05" fill="#000000" transform="rotate(33 0.5 0.32)" />
          <rect x="2.35" y="1.6" width="0.25" height="0.05" fill="#000000" transform="rotate(33 2.47 1.62)" />
        </svg>
      );

    case 'ar': // Algeria / Arab (matches reference design)
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="1.5" height="2" fill="#006633" />
          <rect x="1.5" width="1.5" height="2" fill="#ffffff" />
          <circle cx="1.5" cy="1" r="0.5" fill="#D21034" />
          <circle cx="1.63" cy="1" r="0.4" fill="#ffffff" />
          <polygon points="1.65,0.85 1.7,0.97 1.83,0.97 1.72,1.05 1.76,1.17 1.65,1.09 1.54,1.17 1.58,1.05 1.47,0.97 1.6,0.97" fill="#D21034" />
        </svg>
      );

    case 'tr': // Turkey
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#E30A17" />
          <circle cx="1.1" cy="1" r="0.5" fill="#ffffff" />
          <circle cx="1.23" cy="1" r="0.4" fill="#E30A17" />
          <polygon points="1.72,0.85 1.76,0.96 1.87,0.96 1.78,1.03 1.81,1.14 1.72,1.07 1.63,1.14 1.66,1.03 1.57,0.96 1.68,0.96" fill="#ffffff" />
        </svg>
      );

    case 'it': // Italy
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#009246" />
          <rect width="1" height="2" x="1" fill="#ffffff" />
          <rect width="1" height="2" x="2" fill="#CE2B37" />
        </svg>
      );

    case 'id': // Indonesia
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="1" fill="#FF0000" />
          <rect y="1" width="3" height="1" fill="#ffffff" />
        </svg>
      );

    case 'pl': // Poland
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="1" fill="#ffffff" />
          <rect y="1" width="3" height="1" fill="#DC143C" />
        </svg>
      );

    case 'hi': // India
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="0.667" fill="#FF9933" />
          <rect y="0.667" width="3" height="0.667" fill="#ffffff" />
          <rect y="1.333" width="3" height="0.667" fill="#128807" />
          <circle cx="1.5" cy="1" r="0.22" fill="none" stroke="#000080" strokeWidth="0.04" />
          <circle cx="1.5" cy="1" r="0.06" fill="#000080" />
        </svg>
      );

    case 'nl': // Netherlands
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="0.667" fill="#AE1C28" />
          <rect y="0.667" width="3" height="0.667" fill="#ffffff" />
          <rect y="1.333" width="3" height="0.667" fill="#21468B" />
        </svg>
      );

    case 'ms': // Malaysia
      return (
        <svg {...commonProps} viewBox="0 0 28 14">
          <rect width="28" height="14" fill="#CC0000" />
          <path d="M0,1 h28 M0,3 h28 M0,5 h28 M0,7 h28 M0,9 h28 M0,11 h28 M0,13 h28" stroke="#ffffff" strokeWidth="1" />
          <rect width="14" height="8" fill="#000066" />
          <circle cx="6" cy="4" r="2.8" fill="#FFCC00" />
          <circle cx="6.8" cy="4" r="2.4" fill="#000066" />
          <circle cx="10" cy="4" r="1.6" fill="#FFCC00" />
        </svg>
      );

    case 'fa': // Persian / Iran
      return (
        <svg {...commonProps} viewBox="0 0 7 4">
          <rect width="7" height="1.333" fill="#239F40" />
          <rect y="1.333" width="7" height="1.334" fill="#ffffff" />
          <rect y="2.667" width="7" height="1.333" fill="#DA0000" />
          <circle cx="3.5" cy="2" r="0.45" fill="#DA0000" />
          <circle cx="3.5" cy="2" r="0.3" fill="#ffffff" />
          <circle cx="3.5" cy="2" r="0.16" fill="#DA0000" />
        </svg>
      );

    case 'th': // Thailand
      return (
        <svg {...commonProps} viewBox="0 0 6 4">
          <rect width="6" height="4" fill="#A51931" />
          <rect y="0.667" width="6" height="2.666" fill="#F4F5F8" />
          <rect y="1.333" width="6" height="1.334" fill="#2D2A4A" />
        </svg>
      );

    case 'vi': // Vietnam
      return (
        <svg {...commonProps} viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#DA251D" />
          <polygon points="1.5,0.4 1.62,0.78 2.02,0.78 1.7,1.01 1.82,1.39 1.5,1.15 1.18,1.39 1.3,1.01 0.98,0.78 1.38,0.78" fill="#FFFF00" />
        </svg>
      );

    default:
      return null;
  }
}

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const containerRef = useRef(null);

  // Initialize and read language from cookie / localStorage
  useEffect(() => {
    try {
      const savedCode = localStorage.getItem('bpel_lang');
      if (savedCode) {
        const found = LANGUAGES.find(l => l.code === savedCode);
        if (found) setSelectedLang(found);
      } else {
        // Check googtrans cookie if present
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
        if (match && match[1]) {
          const found = LANGUAGES.find(l => l.code === match[1]);
          if (found) setSelectedLang(found);
        }
      }
    } catch {
      // ignore security restrictions
    }
  }, []);

  // Initialize Google Translate Element silently in the background
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Define global callback if not yet present
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        try {
          if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: LANGUAGES.map(l => l.code).join(','),
                autoDisplay: false
              },
              'google_translate_element'
            );
          }
        } catch (e) {
          console.warn('Google Translate init suppressed', e);
        }
      };
    }

    // Load google translate script if not already added
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Handle outside click and Escape key to close the dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Select a language and invoke translation
  const handleSelectLanguage = lang => {
    setSelectedLang(lang);
    setIsOpen(false);

    try {
      localStorage.setItem('bpel_lang', lang.code);

      const cookieVal = lang.code === 'en' ? '/en/en' : `/en/${lang.code}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      if (window.location.hostname && window.location.hostname.includes('.')) {
        document.cookie = `googtrans=${cookieVal}; domain=.${window.location.hostname}; path=/;`;
      }

      if (lang.code === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (window.location.hostname && window.location.hostname.includes('.')) {
          document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
        }
      }

      // Trigger change in hidden Google combo
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang.code;
        combo.dispatchEvent(new Event('change'));
      } else {
        // Fallback reload if combo hasn't initialized yet
        window.location.reload();
      }
    } catch (e) {
      console.warn('Could not set translation cookie', e);
    }
  };

  return (
    <div className="lang-switcher" ref={containerRef}>
      {/* Hidden container for Google Translate widget */}
      <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />

      {/* Main trigger button matching design reference */}
      <button
        type="button"
        className={`lang-switcher__btn${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`Current language: ${selectedLang.name}. Click to change language`}
      >
        <span className="lang-switcher__flag">
          <FlagIcon code={selectedLang.code} />
        </span>
        <span className="lang-switcher__name">{selectedLang.name}</span>
        <span className="lang-switcher__arrow" aria-hidden="true">
          ▼
        </span>
      </button>

      {/* Dropdown 3-column panel */}
      {isOpen && (
        <div className="lang-dropdown" role="dialog" aria-label="Select a language">
          <div className="lang-dropdown__grid">
            {LANGUAGES.map(lang => {
              const isSelected = lang.code === selectedLang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-dropdown__item${isSelected ? ' is-active' : ''}`}
                  onClick={() => handleSelectLanguage(lang)}
                >
                  <span className="lang-dropdown__item-flag">
                    <FlagIcon code={lang.code} />
                  </span>
                  <span className="lang-dropdown__item-text">{lang.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
