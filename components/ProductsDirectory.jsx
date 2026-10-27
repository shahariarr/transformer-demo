'use client';

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ALL_PRODUCTS, CATEGORY_TREE, FEATURED_PRODUCTS, norm } from '@/lib/products-catalog';
import styles from '@/app/products/page.module.css';

const ChevronIcon = ({ isOpen }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${styles.chevronIcon} ${isOpen ? styles.isOpen : ''}`}
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ITEMS_PER_PAGE = 15;

function ProductsDirectoryContent() {
  const searchParams = useSearchParams();
  const [selectedCatId, setSelectedCatId] = useState('all');
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Accordion state for side-nav categories: only first item is open at first
  const [openAccordion, setOpenAccordion] = useState({
    transformer: true,
    'medium-and-high-voltage': false,
    'switchgear-assemblies': false
  });

  const gridTopRef = useRef(null);

  // Sync category & subcategory reactively whenever URL search params change
  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get('category') || searchParams.get('cat');
    const sub = searchParams.get('sub') || searchParams.get('subcategory');

    if (cat) {
      const found = CATEGORY_TREE.find(c =>
        c.id.toLowerCase() === cat.toLowerCase() ||
        norm(c.title) === norm(cat) ||
        norm(c.id) === norm(cat)
      );
      if (found) {
        setSelectedCatId(found.id);
        setOpenAccordion(prev => ({ ...prev, [found.id]: true }));
      }
    } else {
      setSelectedCatId('all');
    }

    if (sub) {
      setSelectedSubCat(sub);
    } else {
      setSelectedSubCat('all');
    }

    setCurrentPage(1);

    // Scroll smoothly to products grid when selected from nav
    if (cat && gridTopRef.current) {
      setTimeout(() => {
        const offset = -110;
        const top = gridTopRef.current.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }, 60);
    }
  }, [searchParams]);

  const toggleAccordion = (catId) => {
    setOpenAccordion(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleSelectCategory = (catId) => {
    if (selectedCatId === catId && selectedSubCat === 'all') {
      setSelectedCatId('all');
      setSelectedSubCat('all');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/products/');
      }
    } else {
      setSelectedCatId(catId);
      setSelectedSubCat('all');
      if (typeof window !== 'undefined') {
        const catConfig = CATEGORY_TREE.find(c => c.id === catId);
        const catName = catConfig ? catConfig.title : catId;
        window.history.pushState({}, '', `/products/?cat=${encodeURIComponent(catName)}`);
      }
    }
    setCurrentPage(1);
  };

  const handleSelectSubCategory = (catId, subCat) => {
    setSelectedCatId(catId);
    const nextSub = subCat === selectedSubCat ? 'all' : subCat;
    setSelectedSubCat(nextSub);
    if (typeof window !== 'undefined') {
      const catConfig = CATEGORY_TREE.find(c => c.id === catId);
      const catName = catConfig ? catConfig.title : catId;
      if (nextSub === 'all') {
        window.history.pushState({}, '', `/products/?cat=${encodeURIComponent(catName)}`);
      } else {
        window.history.pushState({}, '', `/products/?cat=${encodeURIComponent(catName)}&sub=${encodeURIComponent(nextSub)}`);
      }
    }
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputVal.trim());
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setInputVal('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedCatId('all');
    setSelectedSubCat('all');
    setInputVal('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter calculation
  const filteredProducts = useMemo(() => {
    const q = norm(searchQuery);

    return ALL_PRODUCTS.filter(p => {
      // 1. Category Filter
      if (selectedCatId !== 'all') {
        const catConfig = CATEGORY_TREE.find(c => c.id === selectedCatId);
        if (catConfig && norm(p.category) !== norm(catConfig.title)) {
          return false;
        }
      }

      // 2. Subcategory Filter
      if (selectedSubCat !== 'all') {
        if (norm(p.subCategory) !== norm(selectedSubCat)) {
          return false;
        }
      }

      // 3. Search query
      if (q) {
        const inName = norm(p.name).includes(q);
        const inDesc = norm(p.desc).includes(q);
        const inCat = norm(p.category).includes(q);
        const inSub = norm(p.subCategory).includes(q);
        const inTags = (p.tags || []).some(t => norm(t).includes(q));
        if (!inName && !inDesc && !inCat && !inSub && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCatId, selectedSubCat, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Title calculation
  const currentTitle = useMemo(() => {
    if (selectedSubCat !== 'all') return selectedSubCat;
    if (selectedCatId !== 'all') {
      const match = CATEGORY_TREE.find(c => c.id === selectedCatId);
      return match ? match.title : 'Products';
    }
    if (searchQuery) return `Search: "${searchQuery}"`;
    return 'Products';
  }, [selectedCatId, selectedSubCat, searchQuery]);

  return (
    <div className={styles.catalogWrapper} ref={gridTopRef}>
      <div className={styles.layout}>

        {/* LEFT SIDEBAR */}
        <aside className={styles.pageAside}>
          
          {/* 1. Products Categories Block */}
          <div className={styles.sidebarBlock}>
            <div className={styles.titleBar}>
              <div className={styles.titleWithIcon}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <h3>Products Categories</h3>
              </div>
            </div>

            <ul className={styles.categoryNav}>
              {CATEGORY_TREE.map(cat => {
                const isCatActive = selectedCatId === cat.id;
                const isOpen = openAccordion[cat.id];
                const catProductCount = ALL_PRODUCTS.filter(p => norm(p.category) === norm(cat.title)).length;

                return (
                  <li key={cat.id} className={styles.categoryItem}>
                    <div
                      className={`${styles.categoryHeader} ${isCatActive ? styles.isActive : ''}`}
                      onClick={() => handleSelectCategory(cat.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <span>{cat.title}</span>
                      <span className={styles.categoryCount}>({catProductCount})</span>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion(cat.id);
                          }}
                        >
                          <ChevronIcon isOpen={isOpen} />
                        </span>
                      )}
                    </div>

                    {cat.subcategories && cat.subcategories.length > 0 && isOpen && (
                      <ul className={styles.subCategoryList}>
                        {cat.subcategories.map(sub => {
                          const isSubActive = selectedCatId === cat.id && selectedSubCat === sub;
                          const subCount = ALL_PRODUCTS.filter(p => norm(p.subCategory) === norm(sub)).length;

                          return (
                            <li key={sub} className={styles.subCategoryItem}>
                              <button
                                type="button"
                                className={isSubActive ? styles.isActiveSub : ''}
                                onClick={() => handleSelectSubCategory(cat.id, sub)}
                              >
                                <span>{sub}</span>
                                {subCount > 0 && <span className={styles.categoryCount}>({subCount})</span>}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2. Featured Products Block */}
          <div className={styles.sidebarBlock}>
            <div className={styles.titleBar}>
              <div className={styles.titleWithIcon}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <h3>Featured Products</h3>
              </div>
            </div>
            <div className={styles.featuredList}>
              {FEATURED_PRODUCTS.slice(0, 6).map(fp => (
                <Link
                  key={fp.slug}
                  href={`/products/${fp.slug}/`}
                  className={styles.featuredItem}
                >
                  <div className={styles.featuredThumb}>
                    <img src={fp.image} alt={fp.name} loading="lazy" />
                  </div>
                  <div className={styles.featuredInfo}>
                    <h4 className={styles.featuredName}>{fp.name}</h4>
                    <span className={styles.featuredCat}>{fp.subCategory || fp.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT */}
        <main className={styles.pageMain}>

          {/* Top Title Bar & Search Form */}
          <div className={styles.topBarBox}>
            <div className={styles.titleArea}>
              <h1 className={styles.pageTitle}>{currentTitle}</h1>
              <span className={styles.totalBadge}>
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
              </span>
            </div>

            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="INPUT PRODUCT TITLE"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn} aria-label="Search products">
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Active Filters Row */}
          {(selectedCatId !== 'all' || selectedSubCat !== 'all' || searchQuery) && (
            <div className={styles.activeChipsRow}>
              {selectedCatId !== 'all' && (
                <span className={styles.filterChip}>
                  <span>Category: {CATEGORY_TREE.find(c => c.id === selectedCatId)?.title}</span>
                  <button
                    type="button"
                    className={styles.chipRemoveBtn}
                    onClick={() => { setSelectedCatId('all'); setSelectedSubCat('all'); }}
                    aria-label="Remove category filter"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
              {selectedSubCat !== 'all' && (
                <span className={styles.filterChip}>
                  <span>Subcategory: {selectedSubCat}</span>
                  <button
                    type="button"
                    className={styles.chipRemoveBtn}
                    onClick={() => setSelectedSubCat('all')}
                    aria-label="Remove subcategory filter"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className={styles.filterChip}>
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    className={styles.chipRemoveBtn}
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <CloseIcon />
                  </button>
                </span>
              )}
              <button
                type="button"
                className={styles.clearAllBtn}
                onClick={resetAllFilters}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* 3-Column Product Grid */}
          {paginatedProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {paginatedProducts.map((p, idx) => {
                const orderNum = String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, '0');

                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}/`}
                    className={styles.productCard}
                    aria-label={`View ${p.name}`}
                  >
                    <div className={styles.cardImgWrap}>
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={styles.cardArrowBtn} aria-hidden="true">
                        <ArrowRightIcon />
                      </div>
                    </div>

                    <div className={styles.cardInfo}>
                      <span className={styles.orderBadge}>{orderNum}</span>
                      <h3 className={styles.cardTitle}>{p.name}</h3>
                      <span className={styles.cardCatBadge}>
                        {p.subCategory || p.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h4>No matching products found</h4>
              <p>Try clearing your search query or selecting a different category.</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={resetAllFilters}
              >
                View All Products
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="Product catalogue pagination">
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  className={`${styles.pageBtn} ${currentPage === page ? styles.pageActive : ''}`}
                  onClick={() => goToPage(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>

              <span className={styles.totalLabel}>
                Total {totalPages}
              </span>
            </nav>
          )}

        </main>

      </div>
    </div>
  );
}

export default function ProductsDirectory() {
  return (
    <Suspense fallback={<div className="wrap" style={{ padding: '3rem 0', textAlign: 'center' }}>Loading products catalogue...</div>}>
      <ProductsDirectoryContent />
    </Suspense>
  );
}
