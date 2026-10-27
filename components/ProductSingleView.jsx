'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORY_TREE, FEATURED_PRODUCTS, ALL_PRODUCTS, norm } from '@/lib/products-catalog';
import styles from '@/app/products/[slug]/page.module.css';

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
                <h3>Products Categories</h3>
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
                <h3>Featured Products</h3>
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
                      onClick={() => setIsModalOpen(true)}
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
                  product details
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'technical' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('technical')}
                >
                  Technical Data
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

            {/* SECTION 3: INQUIRY MESSAGE FORM */}
            <section className={styles.formSection} id="sectionIdForm">
              <div className={styles.formOuterWrap}>
                <h2 className={styles.inquiryTitle}>Leave Your Message</h2>
                <form className={styles.inquiryForm} onSubmit={handleInquirySubmit}>
                  {formSubmitted ? (
                    <div className={styles.formSuccessAlert}>
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <h4>Thank You!</h4>
                      <p>Your message has been sent successfully. Our engineering desk will respond within 24 hours.</p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.formItem}>
                        <input type="text" name="name" placeholder="* Name" required />
                      </div>
                      <div className={styles.formItem}>
                        <input type="email" name="email" placeholder="* Email (We will reply you via email in 24 hours)" required />
                      </div>
                      <div className={styles.formItem}>
                        <input type="tel" name="phone" placeholder="Phone/WhatsApp/WeChat (Very important)" />
                      </div>
                      <div className={styles.formItem}>
                        <textarea
                          name="message"
                          placeholder="* Enter product details such as size, color, materials etc. and other specific requirements to receive an accurate quote."
                          required
                          defaultValue={`Inquiry regarding ${productName}: Please provide detailed engineering specifications, GA drawings, and current price quotation.`}
                        />
                      </div>
                      <div>
                        <button type="submit" className={styles.btnSubmit}>
                          <span>Send</span>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </section>

            {/* SECTION 4: RELATED PRODUCTS CAROUSEL */}
            <section className={styles.relatedSection} id="sectionIdRelated">
              <div className={styles.relatedTitleBar}>
                <h2>
                  <strong>
                    <em>Related products</em>
                  </strong>
                </h2>
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
              <h4>Leave Your Message</h4>
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
                    <h4>Message Received</h4>
                    <p>Our engineering team will contact you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.formItem}>
                      <input type="text" name="name" placeholder="* Name" required />
                    </div>
                    <div className={styles.formItem}>
                      <input type="email" name="email" placeholder="* Email (We will reply you via email in 24 hours)" required />
                    </div>
                    <div className={styles.formItem}>
                      <input type="tel" name="phone" placeholder="Phone/WhatsApp/WeChat (Very important)" />
                    </div>
                    <div className={styles.formItem}>
                      <input type="text" name="company" placeholder="Company Name" />
                    </div>
                    <div className={styles.formItem}>
                      <textarea
                        name="message"
                        placeholder="* Enter product details such as size, color, materials etc. and other specific requirements to receive an accurate quote."
                        required
                        defaultValue={`Inquiry regarding ${productName}: Requesting price quotation, lead time, and technical data sheet.`}
                      />
                    </div>
                    <div>
                      <button type="submit" className={styles.btnSubmit}>
                        Send
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
