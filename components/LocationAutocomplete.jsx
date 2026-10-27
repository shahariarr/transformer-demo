'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function LocationAutocomplete({
  id = 'rfq-location',
  name = 'location',
  defaultValue = 'Bangladesh',
  placeholder = 'Type city, site, or project address...',
  onChange,
  onBlur,
  isInvalid = false
}) {
  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const autocompleteInstanceRef = useRef(null);

  // Sync default value if it changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  // Attempt Google Places Autocomplete if Google Maps API is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
      if (inputRef.current && !autocompleteInstanceRef.current) {
        try {
          const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ['geocode', 'establishment']
          });
          ac.addListener('place_changed', () => {
            const place = ac.getPlace();
            const formatted = place.formatted_address || place.name || '';
            setValue(formatted);
            setIsOpen(false);
            if (onChange) onChange(formatted);
          });
          autocompleteInstanceRef.current = ac;
        } catch (err) {
          console.warn('Google Places Autocomplete initialization bypassed:', err);
        }
      }
    }
  }, [onChange]);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch location suggestions (Photon / OpenStreetMap Geocoder)
  const fetchSuggestions = useCallback(async (query) => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    // If Google Maps is active, let Google handle the autocomplete native menu
    if (autocompleteInstanceRef.current) return;

    setIsLoading(true);
    try {
      // Photon is a fast, free global places search engine with rich address coverage
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(query.trim())}&limit=5`
      );
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      const items = (data.features || []).map((feat) => {
        const p = feat.properties || {};
        const parts = [
          p.name,
          p.street,
          p.district || p.suburb,
          p.city,
          p.state,
          p.country
        ].filter(Boolean);
        // Deduplicate adjacent identical names
        const cleanParts = parts.filter((part, idx) => parts.indexOf(part) === idx);
        return {
          title: p.name || cleanParts[0] || query,
          full: cleanParts.join(', ') || query,
          country: p.country || ''
        };
      });
      setSuggestions(items);
      setIsOpen(items.length > 0);
    } catch {
      // Fallback: quiet fallback without breaking UI
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setValue(val);
    if (onChange) onChange(val);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 280);
  };

  const handleSelectSuggestion = (item) => {
    setValue(item.full);
    setIsOpen(false);
    setActiveIndex(-1);
    if (onChange) onChange(item.full);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`location-autocomplete-container ${isInvalid ? 'is-invalid' : ''}`}
      style={{ position: 'relative', width: '100%' }}
    >
      <div className="rfq-input-wrap">
        {/* Map Pin Icon */}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rfq-input-icon"
          aria-hidden="true"
        >
          <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>

        {/* Text Input */}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-invalid={isInvalid ? 'true' : 'false'}
          autoComplete="off"
          style={{ paddingRight: value ? '2.5rem' : '1rem' }}
        />

        {/* Clear or Spinner Indicator */}
        {isLoading ? (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              color: '#0066CC'
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ animation: 'spin 0.8s linear infinite' }}
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
          </span>
        ) : value ? (
          <button
            type="button"
            onClick={() => {
              setValue('');
              if (onChange) onChange('');
              inputRef.current?.focus();
            }}
            aria-label="Clear location input"
            style={{
              position: 'absolute',
              right: '12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        ) : null}
      </div>

      {/* Autocomplete Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            boxShadow: '0 12px 30px -4px rgba(11, 25, 44, 0.16), 0 4px 10px rgba(0,0,0,0.06)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'rfqDrawerFade 0.18s ease-out forwards'
          }}
        >
          <div
            style={{
              padding: '6px 12px',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#64748B',
              fontWeight: '600'
            }}
          >
            <span>LOCATION SUGGESTIONS</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m12 8 4 4-4 4M8 12h8" />
              </svg>
              Select
            </span>
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: '4px 0', maxHeight: '240px', overflowY: 'auto' }}>
            {suggestions.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '9px 14px',
                      background: isSelected ? '#EFF6FF' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = '#F1F5F9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="15"
                      height="15"
                      fill="none"
                      stroke="#0066CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: '2px', flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.full}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
