'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES } from '@/lib/blog';

const POSTS_PER_PAGE = 6;

// SVG Icons matching ETS Lucide icon set
const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const RssIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </svg>
);

const CodeXmlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function BlogDirectory({ posts = [] }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const gridSectionRef = useRef(null);

  // Default unmodified state (shows 2-column featured card + grid)
  const isDefaultView = selectedCat === 'All' && !searchQuery.trim();

  // Featured Post detection
  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured) || posts[0] || null;
  }, [posts]);

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return posts.filter(post => {
      // Category match
      if (selectedCat !== 'All' && post.category !== selectedCat) {
        return false;
      }
      // Search match
      if (!q) return true;
      const matchTitle = (post.title || '').toLowerCase().includes(q);
      const matchExcerpt = (post.excerpt || '').toLowerCase().includes(q);
      const matchCat = (post.category || '').toLowerCase().includes(q);
      const matchTags = (post.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchCat || matchTags;
    });
  }, [posts, selectedCat, searchQuery]);

  // Posts for the 3-column grid (exclude featured post if in default view)
  const gridPosts = useMemo(() => {
    if (isDefaultView && featuredPost) {
      return filteredPosts.filter(p => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, isDefaultView, featuredPost]);

  // Total pages
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);

  // Paginated articles for the current page
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return gridPosts.slice(start, start + POSTS_PER_PAGE);
  }, [gridPosts, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (gridSectionRef.current) {
      gridSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCatChange = (cat) => {
    setSelectedCat(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCat('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="blog-ets-page-wrapper">
      {/* =========================================================
          1. HERO SECTION (Cloned from /about/ PageHero)
          ========================================================= */}
      <section className="page-hero blog-ets-hero" aria-label="Blog Header">
        {/* Background Image matching PageHero opacity and position */}
        <img
          src="/assets/images/about-campus.jpg"
          alt=""
          className="page-hero__img blog-ets-hero__bg"
          loading="lazy"
          decoding="async"
        />

        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li><Link href="/">Home</Link></li>
              <li><span aria-current="page">Blog &amp; Insights</span></li>
            </ol>
          </nav>

          <p className="label fade-in-up">NEWS &amp; INSIGHTS</p>

          <h1 className="fade-in-up" data-delay="80">
            Engineering Knowledge, Shared
          </h1>

          <p className="page-hero__desc blog-ets-hero__desc fade-in-up" data-delay="160">
            Technical deep-dives, industry analysis, and the latest from our engineering and project teams.
          </p>
        </div>
      </section>

      {/* =========================================================
          2. FEATURED ARTICLE SECTION (When in default view)
          ========================================================= */}
      {isDefaultView && featuredPost && (
        <section className="blog-ets-featured-sec" aria-label="Featured Article">
          <div className="wrap">
            <Link
              href={`/blog/${featuredPost.slug}/`}
              className="blog-ets-featured-card group"
            >
              <div className="blog-ets-featured-grid">
                {/* 16:10 / responsive cover image */}
                <div className="blog-ets-featured-media">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    loading="eager"
                    className="blog-ets-featured-img"
                  />
                </div>

                {/* Right content box */}
                <div className="blog-ets-featured-content">
                  <span className="blog-ets-featured-tag">
                    Featured Article
                  </span>

                  <h2 className="blog-ets-featured-title">
                    {featuredPost.title}
                  </h2>

                  <p className="blog-ets-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>

                  <div className="blog-ets-featured-link">
                    <span>Read Article</span>
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* =========================================================
          3. CATEGORY FILTERS & ARTICLE GRID SECTION
          ========================================================= */}
      <section className="blog-ets-grid-sec" ref={gridSectionRef} id="blog-grid" aria-label="Articles Grid">
        <div className="wrap">
          {/* Category Filter Pills & Search Input */}
          <div className="blog-ets-toolbar">
            <div className="blog-ets-cat-tabs" role="tablist" aria-label="Filter by category">
              {BLOG_CATEGORIES.map(cat => {
                const isActive = selectedCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCatChange(cat)}
                    role="tab"
                    aria-selected={isActive}
                    className={`blog-ets-cat-pill${isActive ? ' is-active' : ''}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="blog-ets-search-wrap">
              <span className="blog-ets-search-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                className="blog-ets-search-input"
                aria-label="Search articles by title or keyword"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="blog-ets-search-clear"
                  aria-label="Clear search input"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Notification Bar if searching/filtering */}
          {!isDefaultView && (
            <div className="blog-ets-filter-status">
              <p>
                Showing <strong>{gridPosts.length}</strong> {gridPosts.length === 1 ? 'article' : 'articles'}
                {selectedCat !== 'All' && <span> in <strong>{selectedCat}</strong></span>}
                {searchQuery && <span> matching <strong>&ldquo;{searchQuery}&rdquo;</strong></span>}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="blog-ets-reset-btn"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* 3-Column Article Grid */}
          {gridPosts.length > 0 ? (
            <>
              <div className="blog-ets-grid">
                {paginatedPosts.map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="blog-ets-card group"
                  >
                    {/* 16:10 Cover image */}
                    <div className="blog-ets-card-media">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="blog-ets-card-img"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="blog-ets-card-body">
                      <div className="blog-ets-card-tag-row">
                        <span className="blog-ets-card-tag">
                          {post.category}
                        </span>
                      </div>

                      <h3 className="blog-ets-card-title">
                        {post.title}
                      </h3>

                      <p className="blog-ets-card-excerpt">
                        {post.excerpt}
                      </p>

                      {/* Card Footer with hover-revealing arrow */}
                      <div className="blog-ets-card-footer">
                        <span className="blog-ets-card-meta">
                          {post.readTime || `${post.readMinutes || 7} min read`}
                        </span>
                        <span className="blog-ets-card-arrow">
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <nav className="blog-ets-pagination" aria-label="Blog pagination">
                  <div className="blog-ets-pagination-info">
                    Showing <span>{(currentPage - 1) * POSTS_PER_PAGE + 1}</span>–
                    <span>{Math.min(currentPage * POSTS_PER_PAGE, gridPosts.length)}</span> of{' '}
                    <span>{gridPosts.length}</span> articles
                  </div>

                  <div className="blog-ets-pagination-controls">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="blog-ets-page-btn blog-ets-page-prev"
                      aria-label="Previous page"
                    >
                      <ChevronLeftIcon />
                      <span>Previous</span>
                    </button>

                    <div className="blog-ets-page-numbers" role="navigation" aria-label="Page numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`blog-ets-page-num${currentPage === page ? ' is-active' : ''}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                          aria-label={`Page ${page}`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="blog-ets-page-btn blog-ets-page-next"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRightIcon />
                    </button>
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="blog-ets-empty">
              <h3>No articles found</h3>
              <p>We could not find any insights matching your filter or search keywords.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="blog-ets-empty__btn"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          4. HAVE A PROJECT IN MIND? CTA BANNER
          ========================================================= */}
      <section className="blog-ets-cta-sec" aria-label="Project Inquiry">
        <div className="wrap">
          <div className="blog-ets-cta-card">
            <div className="blog-ets-cta-inner">
              <div>
                <span className="blog-ets-cta-tag">Engineering Collaboration &amp; Tenders</span>
                <h2 className="blog-ets-cta-heading">
                  Have a Project in Mind?
                </h2>
                <p className="blog-ets-cta-sub">
                  Our engineering team is ready to discuss your transformer and turnkey substation requirements.
                </p>
              </div>

              <div className="blog-ets-cta-btn-wrap">
                <Link
                  href="/contact/"
                  className="blog-ets-cta-action group"
                >
                  <span>Get in Touch</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
