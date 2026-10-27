'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { DATA, mailLink } from '@/lib/data';
import { CATEGORY_TREE, FEATURED_PRODUCTS, ALL_PRODUCTS, norm } from '@/lib/products-catalog';
import styles from '@/app/products/[slug]/page.module.css';
import IntlPhoneInput from './IntlPhoneInput';
import LocationAutocomplete from './LocationAutocomplete';

const Req = () => <span className="req" style={{ color: '#ef4444', marginLeft: '3px' }} aria-hidden="true">*</span>;

const RULES = {
  name: v => (v?.trim() ? '' : 'Enter your full name.'),
  email: v => (!v?.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'),
  service: v => (v ? '' : 'Choose a product or service.'),
  message: v => (v?.trim() ? '' : 'Describe your project requirements.')
};

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

export default function ProductSingleView({
  product,
  details,
  quoteUrl = '/contact/',
  waUrl = 'https://wa.me/8801713000001',
  phoneTel = 'tel:+88029885601',
  others = []
}) {
  // Gallery state
  const defaultImages = [
    '/assets/images/products/showcase/single-phase-overhead-transformer-1.jpg',
    '/assets/images/products/showcase/single-phase-overhead-transformer-2.jpg',
    '/assets/images/products/showcase/single-phase-overhead-transformer-3.jpg'
  ];

  const galleryImages = (product?.gallery && product.gallery.length > 0)
    ? product.gallery
    : product?.image
      ? [product.image, ...defaultImages.slice(1)]
      : defaultImages;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'technical'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Categories accordion: only first item is open at first
  const [openCategories, setOpenCategories] = useState({
    transformer: true,
    'medium-and-high-voltage': false,
    'switchgear-assemblies': false
  });

  const toggleCategory = (catId) => {
    setOpenCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Related products carousel state
  const [relatedIndex, setRelatedIndex] = useState(0);

  const relatedProducts = [
    {
      title: 'Triangular Three-Dimensional Coilediron Core Transformer',
      slug: 'triangular-three-dimensional-coilediron-core-transformer',
      image: '/assets/images/products/showcase/overhead-transformer-3.jpg',
      order: '01'
    },
    {
      title: '6~10kV SCB Series Dry-Type Transformer',
      slug: '6-10kv-scb-series-dry-type-transformer',
      image: '/assets/images/products/ets/dry-type-transformers.webp',
      order: '02'
    },
    {
      title: 'S9-35kv Series Transformer',
      slug: 's9-35kv-series-transformers',
      image: '/assets/images/products/ets/oil-immersed-transformers.webp',
      order: '03'
    },
    {
      title: '6-10kv Series Oil Immersed Distribution Transformer',
      slug: '6-10kv-series-oil-immersed-distribution-transformer',
      image: '/assets/images/products/ets/distribution-transformers.webp',
      order: '04'
    },
    {
      title: 'Pad Mounted Transformers',
      slug: 'pad-mounted-transformers',
      image: '/assets/images/products/ets/pad-mounted-transformers.webp',
      order: '05'
    },
    {
      title: 'Cast Resin Dry-Type Transformer',
      slug: 'cast-resin-dry-type-transformer',
      image: '/assets/images/products/ets/cast-resin-dry-type-transformers.webp',
      order: '06'
    }
  ];

  const visibleRelatedCount = 4;
  const maxRelatedIndex = Math.max(0, relatedProducts.length - visibleRelatedCount);

  const nextRelated = () => {
    setRelatedIndex(prev => (prev >= maxRelatedIndex ? 0 : prev + 1));
  };

  const prevRelated = () => {
    setRelatedIndex(prev => (prev <= 0 ? maxRelatedIndex : prev - 1));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
    }, 2500);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const productName = product?.name || 'Single Phase Overhead Transformer';
  const productDesc = product?.desc || 'BPEL power transformers adopt an efficient and energy-saving coil core structure design. Characteristics include compact footprint, reduced low-voltage power supply radius, and reduced distribution line loss. Built with a fully sealed structure, high overload endurance, continuous operation reliability, and low maintenance requirements.';

  // RFQ Technical Inquiry Form State (Cloned from Contact Page)
  const [rfqErrors, setRfqErrors] = useState({});
  const [rfqStatus, setRfqStatus] = useState(null);
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [selectedService, setSelectedService] = useState(productName);
  const rfqFormRef = useRef(null);
  const rfqStatusRef = useRef(null);

  useEffect(() => {
    if (productName) {
      setSelectedService(productName);
    }
  }, [productName]);

  const checkRfq = k => {
    if (!rfqFormRef.current || !rfqFormRef.current.elements[k]) return true;
    const msg = RULES[k] ? RULES[k](rfqFormRef.current.elements[k].value) : '';
    setRfqErrors(e => ({ ...e, [k]: msg }));
    return !msg;
  };

  const invalidRfq = k => (k in rfqErrors ? { 'aria-invalid': rfqErrors[k] ? 'true' : 'false' } : {});

  const onRfqSubmit = e => {
    e.preventDefault();
    const bad = Object.keys(RULES).filter(k => !checkRfq(k));
    if (bad.length) {
      setRfqStatus({ ok: false });
      if (rfqFormRef.current.elements[bad[0]]) {
        rfqFormRef.current.elements[bad[0]].focus();
      }
      return;
    }

    const f = rfqFormRef.current.elements;
    let body = `Name: ${f.name?.value || ''}\n`;
    body += `Company: ${f.company?.value || 'N/A'}\n`;
    body += `Email: ${f.email?.value || ''}\n`;
    body += `Phone: ${f.phone?.value || 'N/A'}\n`;
    body += `Product / Service: ${f.service?.value || ''}\n`;
    body += `Location: ${f.location?.value || 'Bangladesh'}\n\n`;

    if (showTechSpecs) {
      body += `--- TECHNICAL SPECIFICATIONS ---\n`;
      body += `Capacity: ${f.kva?.value || 'Not specified'}\n`;
      body += `Primary HV: ${f.primary_v?.value || 'Not specified'}\n`;
      body += `Secondary LV: ${f.secondary_v?.value || 'Not specified'}\n`;
      body += `Cooling: ${f.cooling?.value || 'Not specified'}\n`;
      body += `Tap Changer: ${f.tap_changer?.value || 'Not specified'}\n`;
      body += `Target Timeline: ${f.timeline?.value || 'Not specified'}\n\n`;
    }

    body += `Project Requirements / Message:\n${f.message?.value || ''}`;

    setRfqStatus({ ok: true, href: mailLink(body) });
    requestAnimationFrame(() => rfqStatusRef.current?.focus());
  };

  return (
    <div className={styles.productSinglePage}>
      {/* TWO-COLUMN PAGE CONTAINER */}
      <div className={`${styles.pageContainer} ${styles.container}`}>
        <div className={styles.pageLayout}>

          {/* LEFT SIDEBAR (pageAside) */}
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
                  const isCatCurrent = norm(product?.category) === norm(cat.title) || norm(product?.cat) === norm(cat.title);
                  const isOpen = openCategories[cat.id];
                  const catProductCount = ALL_PRODUCTS.filter(p => norm(p.category) === norm(cat.title)).length;

                  return (
                    <li key={cat.id} className={styles.categoryItem}>
                      <div
                        className={`${styles.categoryHeader} ${isCatCurrent ? styles.isActive : ''}`}
                        onClick={() => toggleCategory(cat.id)}
                        role="button"
                        tabIndex={0}
                      >
                        <Link
                          href={`/products/?cat=${encodeURIComponent(cat.title)}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {cat.title}
                        </Link>
                        <span className={styles.categoryCount}>({catProductCount})</span>
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCategory(cat.id);
                            }}
                          >
                            <ChevronIcon isOpen={isOpen} />
                          </span>
                        )}
                      </div>

                      {cat.subcategories && cat.subcategories.length > 0 && isOpen && (
                        <ul className={styles.subCategoryList}>
                          {cat.subcategories.map(sub => {
                            const isSubCurrent = norm(product?.subCategory) === norm(sub);
                            const subCount = ALL_PRODUCTS.filter(p => norm(p.subCategory) === norm(sub)).length;

                            return (
                              <li key={sub} className={styles.subCategoryItem}>
                                <Link
                                  href={`/products/?cat=${encodeURIComponent(cat.title)}&sub=${encodeURIComponent(sub)}`}
                                  className={isSubCurrent ? styles.isActiveSub : ''}
                                >
                                  <span>{sub}</span>
                                  {subCount > 0 && <span className={styles.categoryCount}>({subCount})</span>}
                                </Link>
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

          {/* RIGHT MAIN CONTENT (pageMain) */}
          <main className={styles.pageMain}>

            {/* SECTION 1: PRODUCT VIEW (Gallery & Summary) */}
            <section className={styles.productViewSection} id="sectionIdProduct">
              <div className={styles.productContent}>
                {/* Product Image Gallery Slider */}
                <div className={styles.productGallery}>
                  <div className={styles.mainSlider}>
                    <div className={styles.mainImgBox}>
                      <img
                        src={galleryImages[activeImgIndex]}
                        alt={`${productName} View ${activeImgIndex + 1}`}
                        className={styles.activeDisplayImg}
                      />
                      <button
                        type="button"
                        className={styles.imgZoomBadge}
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Enlarge image"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Row Slider */}
                  <div className={styles.thumbsSlider}>
                    <button
                      type="button"
                      className={styles.thumbNavBtn}
                      onClick={() => setActiveImgIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                      aria-label="Previous image"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                      </svg>
                    </button>
                    <div className={styles.thumbsTrack}>
                      {galleryImages.map((src, i) => (
                        <div
                          key={i}
                          className={`${styles.thumbSlide} ${activeImgIndex === i ? styles.thumbActive : ''}`}
                          onClick={() => setActiveImgIndex(i)}
                        >
                          <img src={src} alt={`Thumbnail ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={styles.thumbNavBtn}
                      onClick={() => setActiveImgIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                      aria-label="Next image"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Summary */}
                <div className={styles.productSummary}>
                  <div className={styles.eyebrowBadge}>
                    <span className={styles.statusDot} />
                    <span>{product?.subCategory || product?.category || 'INDUSTRIAL POWER EQUIPMENT'}</span>
                  </div>
                  <h1 className={styles.productTitle}>{productName}</h1>
                  <div className={styles.productMeta}>
                    <div className={styles.editorText}>
                      <p>{productDesc}</p>
                    </div>
                  </div>

                  {/* Key Highlights Tag list */}
                  <div className={styles.keyTags}>
                    <span className={styles.keyTag}>ANSI C57.12.00 / C57.12.20</span>
                    <span className={styles.keyTag}>Capacity: 3 – 333 kVA</span>
                    <span className={styles.keyTag}>Overload & Low-Loss</span>
                  </div>

                  {/* Product Buttons */}
                  <div className={styles.productBtnWrap}>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('sectionIdForm');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          const nameInput = el.querySelector('input[name="name"]');
                          if (nameInput) setTimeout(() => nameInput.focus(), 600);
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                      className={`${styles.productBtn} ${styles.btnPrimary}`}
                    >
                      <span>Contact us</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </button>
                    <a
                      href="/contact/?service=Single+Phase+Overhead+Transformer"
                      className={`${styles.productBtn} ${styles.btnOutline}`}
                    >
                      <span>Download</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  </div>

                  {/* Trust Badges Strip */}
                  <div className={styles.trustBadges}>
                    <div className={styles.trustItem}>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>100% Routine Factory Tested & Guaranteed</span>
                    </div>
                    <div className={styles.trustItem}>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Built to ANSI, IEEE & IEC Utility Standards</span>
                    </div>
                    <div className={styles.trustItem}>
                      <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Custom Design Drawings & GA Layouts Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: TABS (Product details & Technical Data) */}
            <section className={styles.tabSection} id="sectionIdTabs">
              <div className={styles.tabNav}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'details' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Product Details</span>
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'technical' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('technical')}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  <span>Technical Data</span>
                </button>
              </div>

              <div className={styles.tabPanelWrap}>
                {/* TAB 1: PRODUCT DETAILS */}
                <div
                  style={{ display: activeTab === 'details' ? 'block' : 'none' }}
                >
                  {/* Features Box */}
                  <div className={styles.productsBox}>
                    <h2 className={styles.boxHeading}>
                      <strong>
                        <em>Features</em>
                      </strong>
                    </h2>
                    <div className={styles.featuresList}>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>1.</span>
                        <span>All units are built in accordance with both ANSI C57 12.00 and ANSI C57 12.20, except as modified to comply with customer specifications</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>2.</span>
                        <span>Mild steel tank with welded lifting lugs and hanger brackets for direct to pole mounting.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>3.</span>
                        <span>Single piece clamped cover band meets cover retention requirements of ANSI standards.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>4.</span>
                        <span>Electrostatically applied polyester powder paint.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>5.</span>
                        <span>System for superior corrosion protection.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>6.</span>
                        <span>HV porcelain cover mounted bushings.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>7.</span>
                        <span>Tank wall mounted porcelain or polymer low voltage bushings.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>8.</span>
                        <span>Tin-plated bronze terminals for connection to copper or aluminum.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>9.</span>
                        <span>Insulated cover for wildlife protection.</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>10.</span>
                        <span>Laser engraved aluminum nameplate</span>
                      </div>
                      <div className={styles.featureItem}>
                        <span className={styles.featureNum}>11.</span>
                        <span>NON-PCB insulating oil.</span>
                      </div>
                    </div>
                  </div>

                  {/* Model Description Box */}
                  <div className={styles.productsBox}>
                    <h2 className={styles.boxHeading}>
                      <strong>
                        <em>Model description</em>
                      </strong>
                    </h2>
                    <div className={styles.diagramBox}>
                      <img
                        src="/assets/images/products/showcase/model-description.jpg"
                        alt="Model Description Diagram"
                      />
                    </div>
                  </div>
                </div>

                {/* TAB 2: TECHNICAL DATA */}
                <div
                  style={{ display: activeTab === 'technical' ? 'block' : 'none' }}
                >
                  {/* Technical Parameter Box */}
                  <div className={styles.productsBox}>
                    <h2 className={styles.boxHeading}>
                      <strong>
                        <em>Technical Parameter</em>
                      </strong>
                    </h2>
                    <div className={styles.tableResponsive}>
                      <table className={styles.specTable}>
                        <thead>
                          <tr>
                            <th rowSpan="2">Rated Capacity(kVA)</th>
                            <th rowSpan="2">Primary rating(V)</th>
                            <th rowSpan="2">Tapping Range(%)</th>
                            <th rowSpan="2">Secondary Rating(V)</th>
                            <th colSpan="2">Loss(W)</th>
                          </tr>
                          <tr>
                            <th>No load</th>
                            <th>Loss Load Loss</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>3</td>
                            <td rowSpan="12" className={styles.multilineCell}>
                              34500/19920<br />
                              33000/17321<br />
                              30000/17320<br />
                              20000/11547<br />
                              13800/7967<br />
                              13200/7620<br />
                              11000/6350<br />
                              or others
                            </td>
                            <td rowSpan="12" className={styles.multilineCell}>
                              ±2×2.5%<br />
                              ±1×5%<br />
                              or others
                            </td>
                            <td rowSpan="12" className={styles.multilineCell}>
                              120-240<br />
                              110-220<br />
                              240-480<br />
                              250-500<br />
                              or others
                            </td>
                            <td>12</td>
                            <td>45</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>25</td>
                            <td>75</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>50</td>
                            <td>120</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>65</td>
                            <td>195</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>105</td>
                            <td>290</td>
                          </tr>
                          <tr>
                            <td>37.5</td>
                            <td>140</td>
                            <td>360</td>
                          </tr>
                          <tr>
                            <td>50</td>
                            <td>180</td>
                            <td>500</td>
                          </tr>
                          <tr>
                            <td>75</td>
                            <td>250</td>
                            <td>650</td>
                          </tr>
                          <tr>
                            <td>100</td>
                            <td>275</td>
                            <td>850</td>
                          </tr>
                          <tr>
                            <td>167</td>
                            <td>455</td>
                            <td>1410</td>
                          </tr>
                          <tr>
                            <td>250</td>
                            <td>650</td>
                            <td>2000</td>
                          </tr>
                          <tr>
                            <td>333</td>
                            <td>845</td>
                            <td>2500</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.tableNote}>
                      Note: *The above parameter is only subject to our standard design, special requirement can be customized
                    </div>
                    <div className={styles.diagramBox}>
                      <img
                        src="/assets/images/products/showcase/overhead-transformer-3.jpg"
                        alt="Overhead Transformer Parameter Diagram"
                      />
                    </div>
                  </div>

                  {/* Overall and Mounting Dimensions Box */}
                  <div className={styles.productsBox}>
                    <h2 className={styles.boxHeading}>
                      <strong>
                        <em>Overall and mounting dimensions(mm)</em>
                      </strong>
                    </h2>
                    <div className={styles.diagramBox}>
                      <img
                        src="/assets/images/products/showcase/overhead-transformer-dimensions.jpg"
                        alt="Overall and Mounting Dimensions Drawing"
                      />
                    </div>
                    <div className={styles.tableResponsive}>
                      <table className={styles.specTable}>
                        <thead>
                          <tr>
                            <th rowSpan="2">Rated Capacity(kVA)</th>
                            <th colSpan="5">Overall size(mm)</th>
                            <th colSpan="2">Weight(kgs)</th>
                          </tr>
                          <tr>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D</th>
                            <th>E</th>
                            <th>Oil weight</th>
                            <th>Total weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>3</td>
                            <td>760</td>
                            <td>430</td>
                            <td>530</td>
                            <td>330</td>
                            <td rowSpan="7">286</td>
                            <td>20</td>
                            <td>105</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>780</td>
                            <td>430</td>
                            <td>530</td>
                            <td>330</td>
                            <td>30</td>
                            <td>110</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>830</td>
                            <td>430</td>
                            <td>530</td>
                            <td>330</td>
                            <td>30</td>
                            <td>130</td>
                          </tr>
                          <tr>
                            <td>15</td>
                            <td>850</td>
                            <td>480</td>
                            <td>580</td>
                            <td>380</td>
                            <td>40</td>
                            <td>185</td>
                          </tr>
                          <tr>
                            <td>25</td>
                            <td>880</td>
                            <td>500</td>
                            <td>580</td>
                            <td>410</td>
                            <td>45</td>
                            <td>210</td>
                          </tr>
                          <tr>
                            <td>37.5</td>
                            <td>930</td>
                            <td>560</td>
                            <td>640</td>
                            <td>460</td>
                            <td>60</td>
                            <td>300</td>
                          </tr>
                          <tr>
                            <td>50</td>
                            <td>980</td>
                            <td>560</td>
                            <td>640</td>
                            <td>460</td>
                            <td>70</td>
                            <td>335</td>
                          </tr>
                          <tr>
                            <td>75</td>
                            <td>980</td>
                            <td>680</td>
                            <td>720</td>
                            <td>554</td>
                            <td rowSpan="5">591</td>
                            <td>103</td>
                            <td>460</td>
                          </tr>
                          <tr>
                            <td>100</td>
                            <td>1020</td>
                            <td>780</td>
                            <td>800</td>
                            <td>610</td>
                            <td>123</td>
                            <td>530</td>
                          </tr>
                          <tr>
                            <td>167</td>
                            <td>1050</td>
                            <td>830</td>
                            <td>890</td>
                            <td>660</td>
                            <td>155</td>
                            <td>670</td>
                          </tr>
                          <tr>
                            <td>250</td>
                            <td>1100</td>
                            <td>960</td>
                            <td>950</td>
                            <td>660</td>
                            <td>247</td>
                            <td>950</td>
                          </tr>
                          <tr>
                            <td>333</td>
                            <td>1050</td>
                            <td>960</td>
                            <td>950</td>
                            <td>660</td>
                            <td>250</td>
                            <td>1000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: INQUIRY MESSAGE FORM (Cloned from Contact Page RFQ) */}
            <section className={styles.formSection} id="sectionIdForm" aria-label="Request for Quote">
              <div className={styles.formOuterWrap}>
                <div className={styles.inquiryHeader}>
                  <div className={styles.inquiryBadge}>
                    <span className={styles.pulseDot} />
                    REQUEST FOR QUOTE
                  </div>
                  <h2 className={styles.inquiryTitle}>Tell Us About Your Project.</h2>
                  <p className={styles.inquirySubtitle}>
                    Complete the form below and our power engineering team will evaluate your specifications and respond with preliminary technical data sheets within 24 hours.
                  </p>
                </div>

                <div className="contact-rfq-form-card" style={{ border: 'none', boxShadow: 'none', borderRadius: 0, padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                  <form
                    id="product-rfq-form"
                    className="contact-rfq-form"
                    noValidate
                    ref={rfqFormRef}
                    onSubmit={onRfqSubmit}
                  >
                    {/* Honeypot spam guard */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                      <label htmlFor="product-rfq-website">Website (leave blank)</label>
                      <input id="product-rfq-website" type="text" name="website" tabIndex="-1" autoComplete="off" defaultValue="" />
                    </div>

                    <div className="rfq-form-row">
                      <div className="field">
                        <label htmlFor="rfq-name">
                          Full Name <Req />
                        </label>
                        <div className="rfq-input-wrap">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <input
                            id="rfq-name"
                            name="name"
                            type="text"
                            required
                            aria-required="true"
                            autoComplete="name"
                            aria-describedby="rfq-name-err"
                            {...invalidRfq('name')}
                            onBlur={() => checkRfq('name')}
                            onChange={() => { if (rfqErrors.name) checkRfq('name'); }}
                          />
                        </div>
                        <p className="err" id="rfq-name-err">{rfqErrors.name || ''}</p>
                      </div>

                      <div className="field">
                        <label htmlFor="rfq-company">Company / Organization</label>
                        <div className="rfq-input-wrap">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                            <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
                          </svg>
                          <input
                            id="rfq-company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rfq-form-row">
                      <div className="field">
                        <label htmlFor="rfq-email">
                          Business Email <Req />
                        </label>
                        <div className="rfq-input-wrap">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          <input
                            id="rfq-email"
                            name="email"
                            type="email"
                            required
                            aria-required="true"
                            autoComplete="email"
                            aria-describedby="rfq-email-err"
                            {...invalidRfq('email')}
                            onBlur={() => checkRfq('email')}
                            onChange={() => { if (rfqErrors.email) checkRfq('email'); }}
                          />
                        </div>
                        <p className="err" id="rfq-email-err">{rfqErrors.email || ''}</p>
                      </div>

                      <div className="field">
                        <label htmlFor="rfq-phone">Phone / Mobile Number</label>
                        <IntlPhoneInput
                          id="rfq-phone"
                          name="phone"
                          defaultCountry="BD"
                        />
                      </div>
                    </div>

                    <div className="rfq-form-row">
                      <div className="field">
                        <label htmlFor="rfq-service">
                          Product or Service Line <Req />
                        </label>
                        <div className="rfq-input-wrap">
                          <select
                            id="rfq-service"
                            name="service"
                            required
                            aria-required="true"
                            aria-describedby="rfq-service-err"
                            value={selectedService}
                            onChange={e => {
                              setSelectedService(e.target.value);
                              if (rfqErrors.service) checkRfq('service');
                            }}
                            onBlur={() => checkRfq('service')}
                            {...invalidRfq('service')}
                          >
                            <option value="">Select Equipment or Service</option>
                            {productName && (
                              <option value={productName}>
                                {productName} (Current Equipment)
                              </option>
                            )}
                            {DATA.products
                              .filter(p => p.name !== productName)
                              .map(p => (
                                <option key={p.name} value={p.name}>
                                  {p.name}
                                </option>
                              ))}
                            <option value="Package & Containerized Substations">Package &amp; Containerized Substations</option>
                            <option value="Medium & Low Voltage Switchgear">Medium &amp; Low Voltage Switchgear</option>
                            <option value="Turnkey Substation EPC & Installation">Turnkey Substation EPC &amp; Installation</option>
                            <option value="Laboratory FAT Witness & Testing">Laboratory FAT Witness &amp; Testing</option>
                            <option value="Custom Engineering & Sizing Consultation">Custom Engineering &amp; Sizing Consultation</option>
                            <option value="Emergency Maintenance & Field Service">Emergency Maintenance &amp; Field Service</option>
                          </select>
                        </div>
                        <p className="err" id="rfq-service-err">{rfqErrors.service || ''}</p>
                      </div>

                      <div className="field">
                        <label htmlFor="rfq-location">Project Location</label>
                        <LocationAutocomplete
                          id="rfq-location"
                          name="location"
                          defaultValue="Bangladesh"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="rfq-message">
                        Project Scope &amp; Requirements <Req />
                      </label>
                      <div className="rfq-input-wrap rfq-textarea-wrap">
                        <textarea
                          id="rfq-message"
                          name="message"
                          rows="4"
                          required
                          aria-required="true"  
                          aria-describedby="rfq-message-err"
                          {...invalidRfq('message')}
                          onBlur={() => checkRfq('message')}
                          onChange={() => { if (rfqErrors.message) checkRfq('message'); }}
                        />
                      </div>
                      <p className="err" id="rfq-message-err">{rfqErrors.message || ''}</p>
                    </div>

                    {/* Expandable Technical Specifications Drawer (Cloned from Contact Page) */}
                    <div className="rfq-tech-accordion">
                      <button
                        type="button"
                        className="rfq-tech-toggle"
                        onClick={() => setShowTechSpecs(!showTechSpecs)}
                        aria-expanded={showTechSpecs}
                      >
                        <span className="rfq-tech-toggle__left">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                          <span>Add Technical Specifications (Optional)</span>
                        </span>
                        <span className={`rfq-tech-chevron ${showTechSpecs ? 'is-open' : ''}`} aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>

                      {showTechSpecs && (
                        <div className="rfq-tech-drawer">
                          <p className="rfq-tech-drawer__hint">
                            Adding engineering parameters helps our technical team calculate magnetic loss, impedance, and preliminary sizing right away.
                          </p>
                          <div className="rfq-tech-grid">
                            <div className="field">
                              <label htmlFor="rfq-kva">Power Rating (kVA / MVA)</label>
                              <select id="rfq-kva" name="kva">
                                <option value="">Select kVA Rating</option>
                                <option value="25 kVA">25 kVA</option>
                                <option value="50 kVA">50 kVA</option>
                                <option value="100 kVA">100 kVA</option>
                                <option value="250 kVA">250 kVA</option>
                                <option value="500 kVA">500 kVA</option>
                                <option value="1000 kVA">1,000 kVA</option>
                                <option value="2500 kVA">2,500 kVA</option>
                                <option value="5000 kVA">5,000 kVA</option>
                                <option value="Custom / Non-standard">Custom / Non-standard</option>
                              </select>
                            </div>

                            <div className="field">
                              <label htmlFor="rfq-primary-v">Primary Voltage (HV)</label>
                              <select id="rfq-primary-v" name="primary_v">
                                <option value="">Select Primary Voltage</option>
                                <option value="11 kV">11 kV</option>
                                <option value="33 kV">33 kV</option>
                                <option value="35 kV">35 kV</option>
                                <option value="Dual HV 11/33 kV">Dual HV 11 / 33 kV</option>
                                <option value="Custom HV">Custom HV</option>
                              </select>
                            </div>

                            <div className="field">
                              <label htmlFor="rfq-secondary-v">Secondary Voltage (LV)</label>
                              <select id="rfq-secondary-v" name="secondary_v">
                                <option value="">Select Secondary Voltage</option>
                                <option value="0.415 kV (415 V)">0.415 kV (415 V)</option>
                                <option value="0.400 kV (400 V)">0.400 kV (400 V)</option>
                                <option value="120/240 V">120/240 V (Single Phase)</option>
                                <option value="6.6 kV">6.6 kV</option>
                                <option value="11 kV">11 kV</option>
                                <option value="Custom LV">Custom LV</option>
                              </select>
                            </div>

                            <div className="field">
                              <label htmlFor="rfq-cooling">Cooling Method</label>
                              <select id="rfq-cooling" name="cooling">
                                <option value="">Select Cooling</option>
                                <option value="ONAN (Oil Natural Air Natural)">ONAN (Standard Natural)</option>
                                <option value="ONAF (Oil Natural Air Forced)">ONAF (Forced Air)</option>
                                <option value="AN (Dry Type)">AN (Dry-Type)</option>
                                <option value="AF (Dry Type Forced)">AF (Dry Type Forced)</option>
                              </select>
                            </div>

                            <div className="field">
                              <label htmlFor="rfq-tap-changer">Tap Changer Regulation</label>
                              <select id="rfq-tap-changer" name="tap_changer">
                                <option value="">Select Tap Changer</option>
                                <option value="Off-Circuit Tap Changer (OCTC ±2.5%, ±5%)">Off-Circuit (OCTC ±2.5%, ±5%)</option>
                                <option value="On-Load Tap Changer (OLTC) with AVR">On-Load Tap Changer (OLTC) with AVR</option>
                              </select>
                            </div>

                            <div className="field">
                              <label htmlFor="rfq-timeline">Target Delivery Schedule</label>
                              <select id="rfq-timeline" name="timeline">
                                <option value="">Select Timeline</option>
                                <option value="Immediate / Factory Stock">Immediate / Factory Stock</option>
                                <option value="4 – 8 Weeks">4 – 8 Weeks</option>
                                <option value="8 – 16 Weeks">8 – 16 Weeks</option>
                                <option value="Tender Schedule / Future Turnkey">Tender Schedule / Future Turnkey</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="rfq-submit-row">
                      <button className="btn btn--primary rfq-submit-btn" type="submit">
                        <span>Submit RFQ &amp; Request Technical Dossier</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                          <path d="m21.854 2.147-10.94 10.939" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`form__status${rfqStatus ? (rfqStatus.ok ? ' is-ok' : ' is-error') : ''}`}
                      id="product-rfq-status"
                      role="status"
                      tabIndex="-1"
                      ref={rfqStatusRef}
                    >
                      {rfqStatus && !rfqStatus.ok && (
                        <span>Please complete the required fields highlighted in red and submit again.</span>
                      )}
                      {rfqStatus && rfqStatus.ok && (
                        <>
                          Your technical inquiry is prepared. In demonstration mode without an active SMTP gateway,{' '}
                          <a href={rfqStatus.href} className="rfq-mail-action">click here to launch your email client</a>{' '}
                          with pre-populated technical parameters, or send your single-line diagram directly to{' '}
                          <strong>tenders@bpel-power.com</strong>.
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </section>

            {/* SECTION 4: RELATED PRODUCTS CAROUSEL */}
            <section className={styles.relatedSection} id="sectionIdRelated">
              <div className={styles.relatedTitleBar}>
                <div className={styles.relatedTitleGroup}>
                  <span className={styles.sectionEyebrow}>RECOMMENDED EQUIPMENT</span>
                  <h2>
                    <strong>
                      <em>Related Products</em>
                    </strong>
                  </h2>
                </div>
                <div className={styles.carouselNavArrows}>
                  <button type="button" onClick={prevRelated} className={styles.carouselArrow} aria-label="Previous related products">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                    </svg>
                  </button>
                  <button type="button" onClick={nextRelated} className={styles.carouselArrow} aria-label="Next related products">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <div className={styles.relatedCardsGrid}>
                  {relatedProducts.slice(relatedIndex, relatedIndex + visibleRelatedCount).map((rp, i) => (
                    <div className={styles.relatedItem} key={i}>
                      <Link href={`/products/${rp.slug}/`} className={styles.relatedInner}>
                        <div className={styles.relatedImgBox}>
                          <img src={rp.image} alt={rp.title} loading="lazy" />
                          <div className={styles.itemArrowBtn}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        <div className={styles.relatedInfo}>
                          <span className={styles.relatedOrder}>{rp.order}</span>
                          <h3 className={styles.relatedItemTitle} title={rp.title}>{rp.title}</h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* 5. POPUP INQUIRY MODAL */}
      {isModalOpen && (
        <div className={styles.dialogWrapper} role="dialog" aria-modal="true">
          <div className={styles.modalBackdrop} onClick={() => setIsModalOpen(false)} />
          <div className={styles.boxContainer}>
            <div className={styles.boxHeader}>
              <h4>Request a Quote &amp; Technical Dossier</h4>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className={styles.boxBody}>
              <form className={styles.modalForm} onSubmit={handleInquirySubmit}>
                {formSubmitted ? (
                  <div className={styles.formSuccessAlert}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <h4>Inquiry Received</h4>
                    <p>Our engineering team will contact you shortly with the preliminary dossier.</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.formItem}>
                      <input type="text" name="name" placeholder="* Full Name" required />
                    </div>
                    <div className={styles.formItem}>
                      <input type="email" name="email" placeholder="* Business Email" required />
                    </div>
                    <div className={styles.formItem}>
                      <input type="tel" name="phone" placeholder="Phone / Mobile Number" />
                    </div>
                    <div className={styles.formItem}>
                      <input type="text" name="company" placeholder="Company / Organization" />
                    </div>
                    <div className={styles.formItem}>
                      <select
                        name="service"
                        value={selectedService}
                        onChange={e => setSelectedService(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '10px',
                          background: '#f8fafc',
                          padding: '13px 16px',
                          fontSize: '0.95rem',
                          color: '#0f172a',
                          outline: 'none'
                        }}
                      >
                        {productName && <option value={productName}>{productName} (Current Equipment)</option>}
                        {DATA.products.filter(p => p.name !== productName).map(p => (
                          <option key={p.name} value={p.name}>{p.name}</option>
                        ))}
                        <option value="Package & Containerized Substations">Package &amp; Containerized Substations</option>
                        <option value="Medium & Low Voltage Switchgear">Medium &amp; Low Voltage Switchgear</option>
                        <option value="Turnkey Substation EPC & Installation">Turnkey Substation EPC &amp; Installation</option>
                      </select>
                    </div>
                    <div className={styles.formItem}>
                      <textarea
                        name="message"
                        placeholder="* Enter product details such as size, voltage, delivery timeline, etc."
                        required
                        defaultValue={`Inquiry regarding ${productName}: Requesting price quotation, lead time, and technical data sheet.`}
                      />
                    </div>
                    <div>
                      <button type="submit" className={styles.btnSubmit}>
                        <span>Submit Inquiry</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
