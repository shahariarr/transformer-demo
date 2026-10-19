'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES, BLOG_POPULAR_TAGS } from '@/lib/blog';

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const FilterSlidersIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="21" x2="4" y2="14"></line>
    <line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line>
    <line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

export default function BlogDirectory({ posts = [] }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [readDuration, setReadDuration] = useState('all'); // 'all', 'quick' (<7m), 'deep' (>=7m)
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'shortest', 'longest'
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') setMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Category counts
  const catCounts = useMemo(() => {
    const map = { All: posts.length };
    BLOG_CATEGORIES.forEach(cat => {
      if (cat !== 'All') {
        map[cat] = posts.filter(p => p.category === cat).length;
      }
    });
    return map;
  }, [posts]);

  // Count active filters (for badge)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCat !== 'All') count++;
    if (query.trim()) count++;
    if (selectedTag) count++;
    if (readDuration !== 'all') count++;
    if (sortBy !== 'newest') count++;
    return count;
  }, [selectedCat, query, selectedTag, readDuration, sortBy]);

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedCat('All');
    setQuery('');
    setSelectedTag('');
    setReadDuration('all');
    setSortBy('newest');
  };

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = posts.filter(post => {
      // Category filter
      if (selectedCat !== 'All' && post.category !== selectedCat) return false;

      // Tag filter
      if (selectedTag && (!post.tags || !post.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()))) {
        return false;
      }

      // Read duration filter
      const minutes = post.readMinutes || 7;
      if (readDuration === 'quick' && minutes >= 7) return false;
      if (readDuration === 'deep' && minutes < 7) return false;

      // Query search
      if (!q) return true;
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchAuthor = post.author?.name?.toLowerCase().includes(q);
      const matchCatName = post.category.toLowerCase().includes(q);
      const matchTags = (post.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchAuthor || matchCatName || matchTags;
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.isoDate) - new Date(a.isoDate);
      }
      if (sortBy === 'oldest') {
        return new Date(a.isoDate) - new Date(b.isoDate);
      }
      if (sortBy === 'shortest') {
        return (a.readMinutes || 7) - (b.readMinutes || 7);
      }
      if (sortBy === 'longest') {
        return (b.readMinutes || 7) - (a.readMinutes || 7);
      }
      return 0;
    });
  }, [posts, selectedCat, query, selectedTag, readDuration, sortBy]);

  // Check if default unmodified view
  const isDefaultView = activeFiltersCount === 0;

  // Featured post detection
  const featuredPost = useMemo(() => {
    if (!isDefaultView) return null;
    return posts.find(p => p.featured) || posts[0] || null;
  }, [posts, isDefaultView]);

  // Main grid posts (excluding featured post when featured banner is shown)
  const gridPosts = useMemo(() => {
    if (featuredPost && isDefaultView) {
      return filteredPosts.filter(p => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, isDefaultView]);

  return (
    <div className="blog-directory-root">
      {/* Mobile Sticky Quick Bar (Below Main Header) */}
      <div className="blog-mobile-bar">
        <div className="wrap">
          <div className="blog-mobile-bar__inner">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="blog-mobile-filter-trigger"
              aria-label="Open filter sidebar"
            >
              <FilterSlidersIcon />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="blog-filter-count-badge">{activeFiltersCount}</span>
              )}
            </button>

            <div className="blog-mobile-search">
              <span className="blog-search-box__icon"><SearchIcon /></span>
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="blog-search-box__input blog-search-box__input--mobile"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="blog-search-box__clear"
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="wrap blog-layout-wrap">
        <div className="blog-split-container">
          {/* =========================================================
              SIDEBAR: FILTERS
              ========================================================= */}
          <aside
            className={`blog-filter-sidebar${mobileDrawerOpen ? ' is-mobile-open' : ''}`}
            aria-label="Article filter controls"
          >
            {/* Backdrop for Mobile */}
            {mobileDrawerOpen && (
              <div
                className="blog-sidebar-backdrop"
                onClick={() => setMobileDrawerOpen(false)}
                aria-hidden="true"
              />
            )}

            <div className="blog-sidebar-inner">
              {/* Sidebar Header */}
              <div className="blog-sidebar-header">
                <div className="blog-sidebar-header__title">
                  <FilterSlidersIcon />
                  <h3>Filter Insights</h3>
                  {activeFiltersCount > 0 && (
                    <span className="blog-filter-count-badge">{activeFiltersCount}</span>
                  )}
                </div>

                <div className="blog-sidebar-header__actions">
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="blog-sidebar-reset-btn"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="blog-sidebar-close-btn"
                    aria-label="Close filter drawer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Filter Section 1: Keyword Search */}
              <div className="blog-filter-group blog-filter-group--search">
                <label htmlFor="sidebar-blog-search" className="blog-filter-group__label">
                  Keyword Search
                </label>
                <div className="blog-search-box blog-search-box--sidebar">
                  <span className="blog-search-box__icon">
                    <SearchIcon />
                  </span>
                  <input
                    id="sidebar-blog-search"
                    type="text"
                    placeholder="Search titles, specs..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="blog-search-box__input"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="blog-search-box__clear"
                      aria-label="Clear query"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Section 2: Categories */}
              <div className="blog-filter-group">
                <div className="blog-filter-group__head">
                  <span className="blog-filter-group__label">Engineering Disciplines</span>
                  {selectedCat !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCat('All')}
                      className="blog-filter-group__clear"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="blog-category-list" role="radiogroup" aria-label="Filter by category">
                  {BLOG_CATEGORIES.map(cat => {
                    const isSelected = selectedCat === cat;
                    const count = catCounts[cat] || 0;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedCat(cat)}
                        className={`blog-category-item${isSelected ? ' is-active' : ''}`}
                      >
                        <span className="blog-category-item__bullet" aria-hidden="true" />
                        <span className="blog-category-item__name">{cat}</span>
                        <span className="blog-category-item__count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Section 3: Reading Duration */}
              <div className="blog-filter-group">
                <div className="blog-filter-group__head">
                  <span className="blog-filter-group__label">Reading Duration</span>
                  {readDuration !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setReadDuration('all')}
                      className="blog-filter-group__clear"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="blog-segmented-control">
                  <button
                    type="button"
                    onClick={() => setReadDuration('all')}
                    className={`blog-segment-btn${readDuration === 'all' ? ' is-active' : ''}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadDuration('quick')}
                    className={`blog-segment-btn${readDuration === 'quick' ? ' is-active' : ''}`}
                  >
                    &lt; 7 min
                  </button>
                  <button
                    type="button"
                    onClick={() => setReadDuration('deep')}
                    className={`blog-segment-btn${readDuration === 'deep' ? ' is-active' : ''}`}
                  >
                    ≥ 7 min
                  </button>
                </div>
              </div>

              {/* Filter Section 4: Sort Order */}
              <div className="blog-filter-group">
                <label htmlFor="blog-sort-select" className="blog-filter-group__label">
                  Sort Order
                </label>
                <div className="blog-select-wrapper">
                  <select
                    id="blog-sort-select"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="blog-select-input"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="shortest">Reading Time: Quickest</option>
                    <option value="longest">Reading Time: Most In-Depth</option>
                  </select>
                </div>
              </div>

              {/* Filter Section 5: Popular Engineering Tags */}
              <div className="blog-filter-group">
                <div className="blog-filter-group__head">
                  <span className="blog-filter-group__label">Popular Topics</span>
                  {selectedTag && (
                    <button
                      type="button"
                      onClick={() => setSelectedTag('')}
                      className="blog-filter-group__clear"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="blog-tags-cloud">
                  {BLOG_POPULAR_TAGS.map(tag => {
                    const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTag(prev => prev.toLowerCase() === tag.toLowerCase() ? '' : tag)}
                        className={`blog-tag-pill${isSelected ? ' is-active' : ''}`}
                      >
                        <TagIcon />
                        <span>#{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Engineering Assistance Banner */}
              <div className="blog-sidebar-cta">
                <h4>Technical Inquiry?</h4>
                <p>
                  Speak directly with our senior electrical designers about custom kVA, BIL insulation, or site testing.
                </p>
                <Link href="/contact/" className="blog-sidebar-cta__btn">
                  <span>Contact Engineering</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </aside>

          {/* =========================================================
              MAIN COLUMN: ARTICLES & RESULTS
              ========================================================= */}
          <main className="blog-main-content">
            {/* Active Filters Toolbar / Chips */}
            <div className="blog-results-header">
              <div className="blog-results-summary">
                <span className="blog-results-count">
                  Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'article' : 'articles'}
                </span>
                {activeFiltersCount > 0 && (
                  <span className="blog-results-filtered-label">
                    (filtered from {posts.length} total)
                  </span>
                )}
              </div>

              {/* Active Filter Chips */}
              {activeFiltersCount > 0 && (
                <div className="blog-active-chips-row">
                  {selectedCat !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCat('All')}
                      className="blog-active-chip"
                      title="Remove Category filter"
                    >
                      <span>Category: <strong>{selectedCat}</strong></span>
                      <span className="blog-active-chip__x">&times;</span>
                    </button>
                  )}

                  {selectedTag && (
                    <button
                      type="button"
                      onClick={() => setSelectedTag('')}
                      className="blog-active-chip"
                      title="Remove Tag filter"
                    >
                      <span>Tag: <strong>#{selectedTag}</strong></span>
                      <span className="blog-active-chip__x">&times;</span>
                    </button>
                  )}

                  {readDuration !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setReadDuration('all')}
                      className="blog-active-chip"
                      title="Remove Duration filter"
                    >
                      <span>Duration: <strong>{readDuration === 'quick' ? '< 7 min' : '≥ 7 min'}</strong></span>
                      <span className="blog-active-chip__x">&times;</span>
                    </button>
                  )}

                  {query.trim() && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="blog-active-chip"
                      title="Remove Query filter"
                    >
                      <span>Search: <strong>"{query}"</strong></span>
                      <span className="blog-active-chip__x">&times;</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="blog-clear-all-link"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>

            {/* Featured Article Banner (Only on clean default view) */}
            {featuredPost && (
              <section className="blog-featured-section" aria-label="Featured Article">
                <Link
                  href={`/blog/${featuredPost.slug}/`}
                  className="blog-featured-card group"
                >
                  <div className="blog-featured-card__media">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      loading="eager"
                      decoding="async"
                      className="blog-featured-card__img"
                    />
                    <div className="blog-featured-card__overlay"></div>
                  </div>
                  <div className="blog-featured-card__content">
                    <div className="blog-featured-card__badges">
                      <span className="blog-badge blog-badge--featured">Featured Article</span>
                      <span className="blog-badge blog-badge--cat">{featuredPost.category}</span>
                    </div>
                    <h2 className="blog-featured-card__title">
                      {featuredPost.title}
                    </h2>
                    <p className="blog-featured-card__excerpt">
                      {featuredPost.excerpt}
                    </p>
                    <div className="blog-featured-card__meta">
                      <div className="blog-author-mini">
                        {featuredPost.author?.avatar && (
                          <img
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            className="blog-author-mini__img"
                          />
                        )}
                        <div>
                          <span className="blog-author-mini__name">{featuredPost.author?.name}</span>
                          <span className="blog-author-mini__role">{featuredPost.author?.role}</span>
                        </div>
                      </div>
                      <div className="blog-featured-card__time">
                        <span className="blog-meta-item">
                          <CalendarIcon /> {featuredPost.date}
                        </span>
                        <span className="blog-meta-item">
                          <ClockIcon /> {featuredPost.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="blog-featured-card__cta">
                      <span>Read Full Article</span>
                      <ArrowRight />
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Article Cards Grid */}
            {gridPosts.length > 0 ? (
              <div className="blog-grid" role="feed">
                {gridPosts.map(post => (
                  <article key={post.slug} className="blog-card-item">
                    <Link href={`/blog/${post.slug}/`} className="blog-card group">
                      <div className="blog-card__media">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                          className="blog-card__img"
                        />
                        <div className="blog-card__cat-pill">
                          {post.category}
                        </div>
                      </div>

                      <div className="blog-card__body">
                        <div className="blog-card__time-row">
                          <span className="blog-meta-item">
                            <CalendarIcon /> {post.date}
                          </span>
                          <span className="blog-meta-sep">•</span>
                          <span className="blog-meta-item">
                            <ClockIcon /> {post.readTime}
                          </span>
                        </div>

                        <h3 className="blog-card__title">
                          {post.title}
                        </h3>

                        <p className="blog-card__excerpt">
                          {post.excerpt}
                        </p>

                        {/* Card Tag Pills */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="blog-card__tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="blog-card__tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="blog-card__footer">
                          <div className="blog-card__author">
                            {post.author?.avatar && (
                              <img
                                src={post.author.avatar}
                                alt=""
                                className="blog-card__author-avatar"
                              />
                            )}
                            <span className="blog-card__author-name">{post.author?.name}</span>
                          </div>
                          <span className="blog-card__arrow" aria-hidden="true">
                            <ArrowRight />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="blog-empty-state">
                <div className="blog-empty-state__icon">
                  <SearchIcon />
                </div>
                <h3>No Matching Technical Articles</h3>
                <p>
                  No articles matched your active filter selections. Try clearing your search keyword, category, or duration filters.
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="blog-empty-state__btn"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}
