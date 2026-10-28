'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

// Comprehensive Country dataset with flags, dial codes, and formatting guidelines
const COUNTRIES = [
  { name: 'Bangladesh', iso: 'BD', flag: '🇧🇩', code: '+880', placeholder: '1712-345678', min: 10, max: 10 },
  { name: 'United States', iso: 'US', flag: '🇺🇸', code: '+1', placeholder: '(555) 000-0000', min: 10, max: 10 },
  { name: 'United Kingdom', iso: 'GB', flag: '🇬🇧', code: '+44', placeholder: '7911 123456', min: 10, max: 10 },
  { name: 'United Arab Emirates', iso: 'AE', flag: '🇦🇪', code: '+971', placeholder: '50 123 4567', min: 9, max: 9 },
  { name: 'Saudi Arabia', iso: 'SA', flag: '🇸🇦', code: '+966', placeholder: '50 123 4567', min: 9, max: 9 },
  { name: 'Qatar', iso: 'QA', flag: '🇶🇦', code: '+974', placeholder: '3312 3456', min: 8, max: 8 },
  { name: 'Oman', iso: 'OM', flag: '🇴🇲', code: '+968', placeholder: '9123 4567', min: 8, max: 8 },
  { name: 'Kuwait', iso: 'KW', flag: '🇰🇼', code: '+965', placeholder: '5123 4567', min: 8, max: 8 },
  { name: 'India', iso: 'IN', flag: '🇮🇳', code: '+91', placeholder: '98123 45678', min: 10, max: 10 },
  { name: 'China', iso: 'CN', flag: '🇨🇳', code: '+86', placeholder: '138 0000 0000', min: 11, max: 11 },
  { name: 'Singapore', iso: 'SG', flag: '🇸🇬', code: '+65', placeholder: '8123 4567', min: 8, max: 8 },
  { name: 'Malaysia', iso: 'MY', flag: '🇲🇾', code: '+60', placeholder: '12-345 6789', min: 9, max: 10 },
  { name: 'Germany', iso: 'DE', flag: '🇩🇪', code: '+49', placeholder: '151 12345678', min: 10, max: 11 },
  { name: 'Japan', iso: 'JP', flag: '🇯🇵', code: '+81', placeholder: '90 1234 5678', min: 10, max: 10 },
  { name: 'Canada', iso: 'CA', flag: '🇨🇦', code: '+1', placeholder: '(555) 000-0000', min: 10, max: 10 },
  { name: 'Australia', iso: 'AU', flag: '🇦🇺', code: '+61', placeholder: '412 345 678', min: 9, max: 9 },
  { name: 'France', iso: 'FR', flag: '🇫🇷', code: '+33', placeholder: '6 12 34 56 78', min: 9, max: 9 },
  { name: 'Italy', iso: 'IT', flag: '🇮🇹', code: '+39', placeholder: '312 345 6789', min: 10, max: 10 },
  { name: 'Netherlands', iso: 'NL', flag: '🇳🇱', code: '+31', placeholder: '6 12345678', min: 9, max: 9 },
  { name: 'Turkey', iso: 'TR', flag: '🇹🇷', code: '+90', placeholder: '532 123 45 67', min: 10, max: 10 },
  { name: 'South Korea', iso: 'KR', flag: '🇰🇷', code: '+82', placeholder: '10-1234-5678', min: 9, max: 10 },
  { name: 'Indonesia', iso: 'ID', flag: '🇮🇩', code: '+62', placeholder: '812-3456-789', min: 9, max: 12 },
  { name: 'Vietnam', iso: 'VN', flag: '🇻🇳', code: '+84', placeholder: '91 234 56 78', min: 9, max: 10 },
  { name: 'Thailand', iso: 'TH', flag: '🇹🇭', code: '+66', placeholder: '81 234 5678', min: 9, max: 9 },
  { name: 'Pakistan', iso: 'PK', flag: '🇵🇰', code: '+92', placeholder: '300 1234567', min: 10, max: 10 },
  { name: 'Sri Lanka', iso: 'LK', flag: '🇱🇰', code: '+94', placeholder: '71 234 5678', min: 9, max: 9 },
  { name: 'Nepal', iso: 'NP', flag: '🇳🇵', code: '+977', placeholder: '984-1234567', min: 10, max: 10 },
  { name: 'Egypt', iso: 'EG', flag: '🇪🇬', code: '+20', placeholder: '100 123 4567', min: 10, max: 10 },
  { name: 'South Africa', iso: 'ZA', flag: '🇿🇦', code: '+27', placeholder: '82 123 4567', min: 9, max: 9 },
  { name: 'Brazil', iso: 'BR', flag: '🇧🇷', code: '+55', placeholder: '(11) 91234-5678', min: 10, max: 11 },
  { name: 'Spain', iso: 'ES', flag: '🇪🇸', code: '+34', placeholder: '612 34 56 78', min: 9, max: 9 },
  { name: 'Switzerland', iso: 'CH', flag: '🇨🇭', code: '+41', placeholder: '78 123 45 67', min: 9, max: 9 },
  { name: 'Sweden', iso: 'SE', flag: '🇸🇪', code: '+46', placeholder: '70 123 45 67', min: 9, max: 9 },
  { name: 'Norway', iso: 'NO', flag: '🇳🇴', code: '+47', placeholder: '412 34 567', min: 8, max: 8 },
  { name: 'Bahrain', iso: 'BH', flag: '🇧🇭', code: '+973', placeholder: '3600 1234', min: 8, max: 8 }
];

function CountryFlag({ iso, name, width = 24, height = 16 }) {
  const code = (iso || 'bd').toLowerCase();
  const localSrc = `/assets/images/flags/${code}.png`;
  const cdnFallback = `https://flagcdn.com/w40/${code}.png`;

  return (
    <img
      src={localSrc}
      onError={(e) => {
        if (e.currentTarget.src !== cdnFallback) {
          e.currentTarget.src = cdnFallback;
        }
      }}
      alt={`${name} flag`}
      width={width}
      height={height}
      loading="eager"
      style={{
        display: 'inline-block',
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'cover',
        borderRadius: '2.5px',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.4)',
        verticalAlign: 'middle',
        flexShrink: 0
      }}
    />
  );
}

export default function IntlPhoneInput({
  id = 'rfq-phone',
  name = 'phone',
  defaultCountry = 'BD',
  defaultValue = '',
  onChange,
  onBlur,
  isInvalid = false
}) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    return COUNTRIES.find(c => c.iso === defaultCountry) || COUNTRIES[0];
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Parse initial value if provided
  useEffect(() => {
    if (defaultValue) {
      const matched = COUNTRIES.find(c => defaultValue.startsWith(c.code));
      if (matched) {
        setSelectedCountry(matched);
        setPhoneNumber(defaultValue.slice(matched.code.length).trim());
      } else {
        setPhoneNumber(defaultValue);
      }
    }
  }, [defaultValue]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter countries by search term
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase().trim();
    return COUNTRIES.filter(
      c => c.name.toLowerCase().includes(q) || c.code.includes(q) || c.iso.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCountrySelect = (c) => {
    setSelectedCountry(c);
    setIsOpen(false);
    setSearchQuery('');
    const fullValue = phoneNumber.trim() ? `${c.code} ${phoneNumber.trim()}` : '';
    if (onChange) onChange(fullValue);
  };

  const handlePhoneChange = (e) => {
    // Only allow digits, spaces, and hyphens
    const val = e.target.value.replace(/[^\d\s-]/g, '');
    setPhoneNumber(val);
    const fullValue = val.trim() ? `${selectedCountry.code} ${val.trim()}` : '';
    if (onChange) onChange(fullValue);
  };

  const fullPhoneString = phoneNumber.trim() ? `${selectedCountry.code} ${phoneNumber.trim()}` : '';

  return (
    <div
      ref={containerRef}
      className={`intl-phone-container ${isInvalid ? 'is-invalid' : ''}`}
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Hidden input holding full international number for native form submission */}
      <input type="hidden" name={name} value={fullPhoneString} />

      <div
        className="intl-phone-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          background: isInvalid ? '#fef2f2' : '#ffffff',
          border: isInvalid ? '1.5px solid #ef4444' : '1.5px solid #CBD5E1',
          borderRadius: '10px',
          transition: 'all 0.2s ease',
          boxShadow: isInvalid ? '0 0 0 1px #ef4444' : 'none',
          overflow: 'hidden'
        }}
      >
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="intl-phone-flag-btn"
          aria-expanded={isOpen}
          aria-label={`Select Country. Currently selected: ${selectedCountry.name}`}
          title={`${selectedCountry.name} (${selectedCountry.code})`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.82rem 0.85rem 0.82rem 0.95rem',
            background: '#F8FAFC',
            border: 'none',
            borderRight: '1.5px solid #E2E8F0',
            cursor: 'pointer',
            flexShrink: 0,
            userSelect: 'none',
            transition: 'background-color 0.2s ease'
          }}
        >
          <CountryFlag iso={selectedCountry.iso} name={selectedCountry.name} width={24} height={16} />
          <svg
            viewBox="0 0 24 24"
            width="13"
            height="13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: '#64748B',
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease'
            }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Local Number Input */}
        <input
          id={id}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          placeholder={selectedCountry.placeholder}
          aria-invalid={isInvalid ? 'true' : 'false'}
          autoComplete="tel-national"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '0.82rem 1rem',
            fontSize: '0.93rem',
            color: isInvalid ? '#7f1d1d' : '#0B192C',
            background: 'transparent',
            width: '100%',
            fontWeight: '500'
          }}
        />
      </div>

      {/* Country Selection Dropdown Popover */}
      {isOpen && (
        <div
          className="intl-phone-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            width: 'min(340px, 95vw)',
            maxHeight: '320px',
            background: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 12px 30px -4px rgba(11, 25, 44, 0.18), 0 4px 10px rgba(0,0,0,0.06)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'rfqDrawerFade 0.18s ease-out forwards'
          }}
        >
          {/* Search Box */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '10px', color: '#94A3B8' }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 32px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  color: '#0F172A',
                  background: '#ffffff'
                }}
              />
            </div>
          </div>

          {/* List of Countries */}
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: '4px 0',
              overflowY: 'auto',
              flex: 1
            }}
          >
            {filteredCountries.length === 0 ? (
              <li style={{ padding: '16px', textAlign: 'center', fontSize: '0.85rem', color: '#64748B' }}>
                No country found
              </li>
            ) : (
              filteredCountries.map(c => {
                const isCurrent = c.iso === selectedCountry.iso;
                return (
                  <li key={c.iso}>
                    <button
                      type="button"
                      onClick={() => handleCountrySelect(c)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '9px 14px',
                        background: isCurrent ? '#EFF6FF' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.88rem',
                        color: isCurrent ? '#0066CC' : '#1E293B',
                        fontWeight: isCurrent ? '700' : '500',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={e => {
                        if (!isCurrent) e.currentTarget.style.backgroundColor = '#F1F5F9';
                      }}
                      onMouseLeave={e => {
                        if (!isCurrent) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <CountryFlag iso={c.iso} name={c.name} width={20} height={14} />
                        <span>{c.name}</span>
                      </span>
                      <span style={{ color: '#64748B', fontSize: '0.84rem', fontWeight: '600' }}>
                        {c.code}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
