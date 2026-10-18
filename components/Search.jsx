'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DATA } from '@/lib/data';
import { useUI } from './UIProvider';

function Highlight({ text, q }) {
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
}

export default function Search() {
  const { searchOpen: open, searchRequest, openSearch, closeSearch, openFaq } = useUI();
  const router = useRouter();
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Searchable index across products, industries, projects and FAQ; each result opens its page
  const allItems = useMemo(() => {
    const go = href => () => router.push(href);
    return [
      ...DATA.products.map(p => ({
        type: 'products', badge: 'Product', title: p.name, subtitle: p.cat || 'Transformer',
        desc: p.desc || '', specs: (p.specs || []).join(' • '), action: go(`/products/${p.slug}/`)
      })),
      ...DATA.industries.map(ind => ({
        type: 'industries', badge: 'Industry', title: ind.name, subtitle: 'Application Sector',
        desc: ind.desc || '', specs: '', action: go(`/industries/${ind.slug}/`)
      })),
      ...DATA.projects.map(proj => ({
        type: 'projects', badge: 'Project', title: proj.title, subtitle: `${proj.cat} • ${proj.location}`,
        desc: proj.desc || '', specs: proj.location || '', action: go(`/projects/${proj.slug}/`)
      })),
      ...DATA.faq.map((f, idx) => ({
        type: 'faq', badge: 'FAQ', title: f.q, subtitle: 'Frequently Asked Question', desc: f.a || '', specs: '',
        action: () => { openFaq(idx); router.push(`/resources/faq/#faq-q${idx}`); }
      }))
    ];
  }, [router, openFaq]);

  const q = value.trim().toLowerCase();
  const matches = useMemo(() => (q
    ? allItems.filter(item => `${item.title} ${item.subtitle} ${item.desc} ${item.specs}`.toLowerCase().includes(q))
    : []), [q, allItems]);

  useEffect(() => { setSelected(matches.length ? 0 : -1); }, [matches]);

  const close = () => { closeSearch(); setValue(''); setSelected(-1); };
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    document.documentElement.classList.toggle('search-open', open);
  }, [open]);

  // Every open request (button, Ctrl+K, "/") focuses and selects the input
  useEffect(() => {
    if (searchRequest) { inputRef.current.focus(); inputRef.current.select(); }
  }, [searchRequest]);

  // Global hotkeys: Ctrl/Cmd + K toggles, "/" opens, Escape closes
  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open ? closeRef.current() : openSearch();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape' && open) {
        closeRef.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, openSearch]);

  // Keep the keyboard-selected result in view
  useEffect(() => {
    const el = listRef.current && listRef.current.children[selected];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const execute = idx => {
    const item = matches[idx];
    if (item) { close(); item.action(); }
  };

  const onInputKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (matches.length) setSelected((selected + 1) % matches.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (matches.length) setSelected((selected - 1 + matches.length) % matches.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selected >= 0 && selected < matches.length) execute(selected);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  let body;
  if (!q) {
    body = (
      <div className="search-idle">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p className="search-idle__text">Search across products, voltage ratings, projects, and FAQs</p>
      </div>
    );
  } else if (!matches.length) {
    body = (
      <div className="search-empty">
        <p className="search-empty__title">No results found for &quot;<strong>{value.trim()}</strong>&quot;</p>
        <p className="search-empty__desc">Try checking for typos or searching for terms like <em>&quot;transformer&quot;</em>, <em>&quot;substation&quot;</em>, or <em>&quot;35kv&quot;</em>.</p>
      </div>
    );
  } else {
    body = (
      <ul className="search-list" role="listbox" ref={listRef}>
        {matches.map((item, idx) => (
          <li className={`search-item ${idx === selected ? 'is-selected' : ''}`} role="option" aria-selected={idx === selected} data-idx={idx} key={`${item.type}-${item.title}`}
              onClick={() => execute(idx)} onMouseEnter={() => setSelected(idx)}>
            <div className="search-item__badge-wrap">
              <span className={`search-badge search-badge--${item.type}`}>{item.badge}</span>
            </div>
            <div className="search-item__content">
              <div className="search-item__title-row">
                <span className="search-item__title"><Highlight text={item.title} q={q} /></span>
                <span className="search-item__subtitle">{item.subtitle}</span>
              </div>
              <p className="search-item__desc"><Highlight text={item.desc} q={q} /></p>
              {item.specs ? <p className="search-item__specs"><Highlight text={item.specs} q={q} /></p> : null}
            </div>
            <span className="search-item__arrow">&rarr;</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div id="search-modal" className={`search-modal${open ? ' is-open' : ''}`} aria-hidden={open ? 'false' : 'true'} role="dialog" aria-modal="true" aria-label="Site Search">
      <div className="search-modal__backdrop" onClick={close}></div>
      <div className="search-modal__container">
        <div className="search-modal__box">
          <div className="search-modal__header">
            <svg className="search-modal__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="search" id="search-input" className="search-modal__input" placeholder="Type to search products, capacity, projects, FAQ..." autoComplete="off" spellCheck="false"
                   ref={inputRef} value={value} onChange={e => setValue(e.target.value)} onKeyDown={onInputKey} />
            <button type="button" id="search-clear" className="search-modal__clear" aria-label="Clear search text" style={{ display: q ? 'block' : 'none' }}
                    onClick={() => { setValue(''); inputRef.current.focus(); }}>&times;</button>
            <button type="button" id="search-close" className="search-modal__close-btn" aria-label="Close search" onClick={close}>
              <kbd className="search-modal__esc">ESC</kbd>
            </button>
          </div>

          <div className="search-modal__body" id="search-results">{body}</div>

          <div className="search-modal__footer">
            <div className="search-modal__hints">
              <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> navigate</span>
              <span><kbd>&crarr;</kbd> select</span>
              <span><kbd>ESC</kbd> close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
