import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { ArrowRight } from '@/components/PageParts';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | BPEL Blog' };

  return {
    title: `${post.title} | BPEL Engineering Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | BPEL Engineering Insights`,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

// SVG Icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, 3);

  return (
    <article className={styles.blogSinglePage}>
      {/* =========================================================
          1. HERO HEADER FOR SINGLE ARTICLE (Cloned from /about/ PageHero)
          ========================================================= */}
      <section className={`page-hero ${styles.blogSingleHero}`} aria-label="Article Banner">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`page-hero__img ${styles.blogSingleHeroBg}`}
        />

        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li><span aria-current="page">{post.category}</span></li>
            </ol>
          </nav>

          <p className="label fade-in-up">{post.category}</p>

          <h1 className="fade-in-up" data-delay="80">
            {post.title}
          </h1>

          {/* Metadata (Reading Time, Date, Author) */}
          <div className={`${styles.blogSingleHeroMeta} fade-in-up`} data-delay="160">
            <span className={styles.blogSingleHeroMetaItem}>
              <ClockIcon />
              <span>{post.readTime || `${post.readMinutes || 7} min read`}</span>
            </span>
            <span className={styles.blogSingleHeroMetaSep}>•</span>
            <span className={styles.blogSingleHeroMetaItem}>
              <CalendarIcon />
              <span>{post.date}</span>
            </span>
            {post.author?.name && (
              <>
                <span className={styles.blogSingleHeroMetaSep}>•</span>
                <span className={styles.blogSingleHeroMetaItem}>By {post.author.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. MAIN ARTICLE READER SECTION
          ========================================================= */}
      <section className={styles.blogSingleSec} aria-label="Article Content">
        <div className="wrap">
          {/* Back to Blog Directory Link */}
          <Link href="/blog/" className={styles.blogSingleBackLink}>
            <ArrowLeftIcon />
            <span>Back to News &amp; Insights</span>
          </Link>

          <div className={styles.blogSingleLayout}>
            {/* Main Reader Column */}
            <div className={styles.blogSingleReader}>
              {/* Prominent Featured Image */}
              {post.image && (
                <div className={styles.blogSingleFeaturedImageBox}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.blogSingleFeaturedImage}
                    loading="eager"
                  />
                  <div className={styles.blogSingleFeaturedImageCaption}>
                    <span className={styles.blogSingleFeaturedImageCaptionTitle}>{post.title}</span>
                    <span className={styles.blogSingleFeaturedImageCaptionTag}>{post.category}</span>
                  </div>
                </div>
              )}

              {/* Lead Paragraph */}
              <p className={styles.blogSingleLead}>
                {post.excerpt}
              </p>

              {/* Author & Share Bar */}
              <div className={styles.blogSingleAuthorBar}>
                <div className={styles.blogSingleAuthorInfo}>
                  {post.author?.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className={styles.blogSingleAuthorAvatar}
                    />
                  )}
                  <div>
                    <strong className={styles.blogSingleAuthorName}>{post.author?.name}</strong>
                    <span className={styles.blogSingleAuthorRole}>{post.author?.role}</span>
                  </div>
                </div>

                <div className={styles.blogSingleShare}>
                  <span className={styles.blogSingleShareLabel}>Share:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.blogSingleShareBtn}
                    title="Share on WhatsApp"
                    aria-label="Share on WhatsApp"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.blogSingleShareBtn}
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Executive Takeaways Box */}
              {post.takeaways && post.takeaways.length > 0 && (
                <div className={styles.blogSingleTakeaways}>
                  <h3>
                    <CheckIcon />
                    <span>Executive Engineering Takeaways</span>
                  </h3>
                  <ul>
                    {post.takeaways.map((item, idx) => (
                      <li key={idx}>
                        <span className={styles.blogSingleTakeawaysCheck}><CheckIcon /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Structured Body Content */}
              <div className={styles.blogSingleBody}>
                {post.content.map((block, idx) => {
                  if (block.type === 'paragraph') {
                    return <p key={idx}>{block.text}</p>;
                  }
                  if (block.type === 'heading') {
                    if (block.level === 2) return <h2 key={idx}>{block.text}</h2>;
                    if (block.level === 3) return <h3 key={idx}>{block.text}</h3>;
                    return <h4 key={idx}>{block.text}</h4>;
                  }
                  if (block.type === 'callout') {
                    return (
                      <div key={idx} className={styles.blogSingleCallout}>
                        {block.title && <h4>{block.title}</h4>}
                        <p>{block.text}</p>
                      </div>
                    );
                  }
                  if (block.type === 'specTable') {
                    return (
                      <div key={idx} className={styles.blogSingleTableWrap}>
                        {block.caption && (
                          <div className={styles.blogSingleTableCaption}>{block.caption}</div>
                        )}
                        <div className={styles.blogSingleTableScroll}>
                          <table className={styles.blogSingleTable}>
                            <thead>
                              <tr>
                                {block.headers.map((h, i) => <th key={i}>{h}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {block.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {row.map((cell, cIdx) => <td key={cIdx}>{cell}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <figure key={idx} className={styles.blogSingleFigure}>
                        <div className={styles.blogSingleFigureMedia}>
                          <img
                            src={block.src}
                            alt={block.alt || block.caption || post.title}
                            className={styles.blogSingleFigureImg}
                            loading="lazy"
                          />
                        </div>
                        {(block.caption || block.credit) && (
                          <figcaption className={styles.blogSingleFigureCaption}>
                            {block.caption && <span className={styles.blogSingleFigureCaptionText}>{block.caption}</span>}
                            {block.credit && <span className={styles.blogSingleFigureCaptionCredit}>{block.credit}</span>}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Author Signature Box */}
              {post.author && (
                <div className={styles.blogSingleAuthorCard}>
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className={styles.blogSingleAuthorCardAvatar}
                    />
                  )}
                  <div>
                    <span className={styles.blogSingleAuthorCardKicker}>Written By</span>
                    <h4 className={styles.blogSingleAuthorCardName}>{post.author.name}</h4>
                    <p className={styles.blogSingleAuthorCardRole}>{post.author.role}</p>
                    <p className={styles.blogSingleAuthorCardBio}>
                      Specialized in high-voltage transformer design, dielectric condition monitoring, and custom substation integration for heavy industrial and utility projects.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className={styles.blogSingleSidebar} aria-label="Technical Consultation">
              <div className={styles.blogSingleSideCard}>
                <h4>Need Technical Guidance?</h4>
                <p>
                  Speak directly with our power engineering directors regarding transformer ratings, vector groups, BIL withstand, and on-site testing.
                </p>
                <Link href="/contact/" className={styles.blogSingleSideBtn}>
                  Consult Our Engineers
                </Link>
              </div>

              <div className={styles.blogSingleSideCard}>
                <h4>Explore Products</h4>
                <ul className={styles.blogSingleSideLinks}>
                  <li><Link href="/products/">Oil-Immersed Transformers</Link></li>
                  <li><Link href="/products/16000-kva-oil-filled-transformer/">16,000 kVA Power Units</Link></li>
                  <li><Link href="/products/5000-kva-oil-filled-transformer/">Hermetically Sealed Units</Link></li>
                  <li><Link href="/certifications/">Type Test Reports &amp; Accreditations</Link></li>
                  <li><Link href="/resources/sizing-guide/">Transformer Sizing Calculator</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. RELATED ARTICLES SECTION (Using ETS 3-Column Card Style)
          ========================================================= */}
      {related.length > 0 && (
        <section className={styles.blogSingleRelatedSec} aria-label="Related Insights">
          <div className="wrap">
            <div className={styles.blogSingleRelatedHead}>
              <div>
                <span className={styles.blogSingleRelatedKicker}>Recommended Reading</span>
                <h2 className={styles.blogSingleRelatedTitle}>Related Engineering Insights</h2>
              </div>
              <Link href="/blog/" className={styles.blogSingleViewAll}>
                <span>View All Articles</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Exact ETS 3-column Grid Cards */}
            <div className={styles.relatedGrid}>
              {related.map(item => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}/`}
                  className={`${styles.relatedCard} group`}
                >
                  <div className={styles.relatedCardMedia}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className={styles.relatedCardImg}
                    />
                  </div>

                  <div className={styles.relatedCardBody}>
                    <div className={styles.relatedCardTagRow}>
                      <span className={styles.relatedCardTag}>
                        {item.category}
                      </span>
                    </div>

                    <h3 className={styles.relatedCardTitle}>
                      {item.title}
                    </h3>

                    <p className={styles.relatedCardExcerpt}>
                      {item.excerpt}
                    </p>

                    <div className={styles.relatedCardFooter}>
                      <span className={styles.relatedCardMeta}>
                        {item.readTime || `${item.readMinutes || 7} min read`}
                      </span>
                      <span className={styles.relatedCardArrow}>
                        <ArrowRightIcon />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          4. TECHNICAL CONSULTATION & SIZING SECTION
          ========================================================= */}
      <section className={styles.ctaSec} aria-label="Technical Consultation and Sizing">
        <div className="wrap">
          <div className={styles.ctaCard}>
            <div className={styles.ctaInner}>
              <div>
                <span className={styles.ctaTag}>Engineering Collaboration &amp; Tenders</span>
                <h2 className={styles.ctaHeading}>
                  Have a Project in Mind?
                </h2>
                <p className={styles.ctaSub}>
                  Our engineering team is ready to discuss your transformer and turnkey substation requirements.
                </p>
              </div>

              <div className={styles.ctaBtnWrap}>
                <Link
                  href="/contact/"
                  className={`${styles.ctaAction} group`}
                >
                  <span>Get in Touch</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
