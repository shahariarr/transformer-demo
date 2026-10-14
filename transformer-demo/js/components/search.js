function SearchModal() {
  return `
  <div id="search-modal" class="search-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Site Search">
    <div class="search-modal__backdrop"></div>
    <div class="search-modal__container">
      <div class="search-modal__box">
        <div class="search-modal__header">
          <svg class="search-modal__icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="search" id="search-input" class="search-modal__input" placeholder="Type to search products, capacity, projects, FAQ..." autocomplete="off" spellcheck="false">
          <button type="button" id="search-clear" class="search-modal__clear" aria-label="Clear search text">&times;</button>
          <button type="button" id="search-close" class="search-modal__close-btn" aria-label="Close search">
            <kbd class="search-modal__esc">ESC</kbd>
          </button>
        </div>

        <div class="search-modal__body" id="search-results">
          <!-- Populated by initSearch -->
        </div>

        <div class="search-modal__footer">
          <div class="search-modal__hints">
            <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> navigate</span>
            <span><kbd>&crarr;</kbd> select</span>
            <span><kbd>ESC</kbd> close</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initSearch() {
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  const closeBtn = document.getElementById('search-close');
  const backdrop = modal.querySelector('.search-modal__backdrop');
  const resultsContainer = document.getElementById('search-results');

  let selectedIndex = -1;
  let currentItems = [];

  // Build searchable index from window.DATA
  function getSearchData() {
    const data = [];

    // Products
    if (window.DATA && DATA.products) {
      DATA.products.forEach((p, idx) => {
        data.push({
          type: 'products',
          badge: 'Product',
          title: p.name,
          subtitle: p.cat || 'Transformer',
          desc: p.desc || '',
          specs: (p.specs || []).join(' • '),
          target: '#products',
          action: () => {
            const el = document.querySelector(`[data-product="${idx}"]`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => el.click(), 300);
            } else {
              location.hash = '#products';
            }
          }
        });
      });
    }

    // Industries
    if (window.DATA && DATA.industries) {
      DATA.industries.forEach((ind) => {
        data.push({
          type: 'industries',
          badge: 'Industry',
          title: ind.name,
          subtitle: 'Application Sector',
          desc: ind.desc || '',
          specs: '',
          target: '#industries',
          action: () => {
            const sec = document.getElementById('industries');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else location.hash = '#industries';
          }
        });
      });
    }

    // Projects
    if (window.DATA && DATA.projects) {
      DATA.projects.forEach((proj, idx) => {
        data.push({
          type: 'projects',
          badge: 'Project',
          title: proj.title,
          subtitle: `${proj.cat} • ${proj.location}`,
          desc: proj.desc || '',
          specs: proj.location || '',
          target: '#projects',
          action: () => {
            const el = document.querySelector(`[data-project="${idx}"]`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => el.click(), 300);
            } else {
              location.hash = '#projects';
            }
          }
        });
      });
    }

    // FAQ
    if (window.DATA && DATA.faq) {
      DATA.faq.forEach((f, idx) => {
        data.push({
          type: 'faq',
          badge: 'FAQ',
          title: f.q,
          subtitle: 'Frequently Asked Question',
          desc: f.a || '',
          specs: '',
          target: '#faq',
          action: () => {
            const qBtn = document.getElementById(`faq-q${idx}`);
            if (qBtn) {
              qBtn.setAttribute('aria-expanded', 'true');
              const item = qBtn.closest('.faq__item');
              if (item) item.classList.add('is-open');
              qBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              location.hash = '#faq';
            }
          }
        });
      });
    }

    return data;
  }

  const allItems = getSearchData();

  function highlightMatches(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function openSearch(initialQuery = '') {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('search-open');
    if (initialQuery) {
      input.value = initialQuery;
    }
    input.focus();
    input.select();
    renderResults();
  }

  function closeSearch() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('search-open');
    input.value = '';
    selectedIndex = -1;
  }

  function renderIdleState() {
    resultsContainer.innerHTML = `
      <div class="search-idle">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <p class="search-idle__text">Search across products, voltage ratings, projects, and FAQs</p>
      </div>
    `;
  }

  function renderResults() {
    const q = input.value.trim().toLowerCase();
    clearBtn.style.display = q ? 'block' : 'none';

    if (!q) {
      currentItems = [];
      selectedIndex = -1;
      renderIdleState();
      return;
    }

    // Filter items across all categories
    const matches = allItems.filter(item => {
      const searchTarget = `${item.title} ${item.subtitle} ${item.desc} ${item.specs}`.toLowerCase();
      return searchTarget.includes(q);
    });

    currentItems = matches;
    selectedIndex = matches.length > 0 ? 0 : -1;

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-empty">
          <p class="search-empty__title">No results found for "<strong>${input.value.trim()}</strong>"</p>
          <p class="search-empty__desc">Try checking for typos or searching for terms like <em>"transformer"</em>, <em>"substation"</em>, or <em>"35kv"</em>.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <ul class="search-list" role="listbox">
        ${matches.map((item, idx) => `
          <li class="search-item ${idx === selectedIndex ? 'is-selected' : ''}" role="option" aria-selected="${idx === selectedIndex}" data-idx="${idx}">
            <div class="search-item__badge-wrap">
              <span class="search-badge search-badge--${item.type}">${item.badge}</span>
            </div>
            <div class="search-item__content">
              <div class="search-item__title-row">
                <span class="search-item__title">${highlightMatches(item.title, q)}</span>
                <span class="search-item__subtitle">${item.subtitle}</span>
              </div>
              <p class="search-item__desc">${highlightMatches(item.desc, q)}</p>
              ${item.specs ? `<p class="search-item__specs">${highlightMatches(item.specs, q)}</p>` : ''}
            </div>
            <span class="search-item__arrow">&rarr;</span>
          </li>
        `).join('')}
      </ul>
    `;

    // Add click listeners to items
    resultsContainer.querySelectorAll('.search-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const idx = parseInt(itemEl.dataset.idx, 10);
        executeItem(idx);
      });
      itemEl.addEventListener('mouseenter', () => {
        const idx = parseInt(itemEl.dataset.idx, 10);
        setSelectedIndex(idx);
      });
    });
  }

  function setSelectedIndex(idx) {
    selectedIndex = idx;
    resultsContainer.querySelectorAll('.search-item').forEach((el, i) => {
      const active = i === selectedIndex;
      el.classList.toggle('is-selected', active);
      el.setAttribute('aria-selected', active);
      if (active) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function executeItem(idx) {
    const item = currentItems[idx];
    if (item && item.action) {
      closeSearch();
      item.action();
    }
  }

  // Event Listeners
  input.addEventListener('input', renderResults);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    renderResults();
  });

  closeBtn.addEventListener('click', closeSearch);
  backdrop.addEventListener('click', closeSearch);

  // Keyboard navigation inside search
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentItems.length > 0) {
        setSelectedIndex((selectedIndex + 1) % currentItems.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentItems.length > 0) {
        setSelectedIndex((selectedIndex - 1 + currentItems.length) % currentItems.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < currentItems.length) {
        executeItem(selectedIndex);
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Global hotkey: Ctrl + K or Cmd + K or /
  window.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('is-open')) closeSearch();
      else openSearch();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeSearch();
    }
  });

  // Header trigger button
  const triggerBtn = document.getElementById('search-trigger');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => openSearch());
  }

  // Expose helper globally
  window.openSearch = openSearch;
  window.closeSearch = closeSearch;
}
