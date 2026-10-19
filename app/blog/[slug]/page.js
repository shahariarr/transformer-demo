import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { ArrowRight } from '@/components/PageParts';

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
    <article className="blog-single-page">
      {/* =========================================================
          1. HERO HEADER FOR SINGLE ARTICLE (Cloned from /about/ PageHero)
          ========================================================= */}
      <section className="page-hero blog-single-hero" aria-label="Article Banner">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="page-hero__img blog-single-hero__bg"
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
          <div className="blog-single-hero__meta fade-in-up" data-delay="160">
            <span className="blog-single-hero__meta-item">
              <ClockIcon />
              <span>{post.readTime || `${post.readMinutes || 7} min read`}</span>
            </span>
            <span className="blog-single-hero__meta-sep">•</span>
            <span className="blog-single-hero__meta-item">
              <CalendarIcon />
              <span>{post.date}</span>
            </span>
            {post.author?.name && (
              <>
                <span className="blog-single-hero__meta-sep">•</span>
                <span className="blog-single-hero__meta-item">By {post.author.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          2. MAIN ARTICLE READER SECTION
          ========================================================= */}
      <section className="blog-single-sec" aria-label="Article Content">
        <div className="wrap">
          {/* Back to Blog Directory Link */}
          <Link href="/blog/" className="blog-single-back-link">
            <ArrowLeftIcon />
            <span>Back to News &amp; Insights</span>
          </Link>

          <div className="blog-single-layout">
            {/* Main Reader Column */}
            <div className="blog-single-reader">
              {/* Prominent Featured Image */}
              {post.image && (
                <div className="blog-single-featured-image-box">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="blog-single-featured-image"
                    loading="eager"
                  />
                  <div className="blog-single-featured-image-caption">
                    <span className="blog-single-featured-image-caption__title">{post.title}</span>
                    <span className="blog-single-featured-image-caption__tag">{post.category}</span>
                  </div>
                </div>
              )}

              {/* Lead Paragraph */}
              <p className="blog-single-lead">
                {post.excerpt}
              </p>

              {/* Author & Share Bar */}
              <div className="blog-single-author-bar">
                <div className="blog-single-author-info">
                  {post.author?.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="blog-single-author-avatar"
                    />
                  )}
                  <div>
                    <strong className="blog-single-author-name">{post.author?.name}</strong>
                    <span className="blog-single-author-role">{post.author?.role}</span>
                  </div>
                </div>

                <div className="blog-single-share">
                  <span className="blog-single-share-label">Share:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-single-share-btn"
                    title="Share on WhatsApp"
                    aria-label="Share on WhatsApp"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-single-share-btn"
                    title="Share on LinkedIn"
                    aria-label="Share on LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Executive Takeaways Box */}
              {post.takeaways && post.takeaways.length > 0 && (
                <div className="blog-single-takeaways">
                  <h3>
                    <CheckIcon />
                    <span>Executive Engineering Takeaways</span>
                  </h3>
                  <ul>
                    {post.takeaways.map((item, idx) => (
                      <li key={idx}>
                        <span className="blog-single-takeaways-check"><CheckIcon /></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Structured Body Content */}
              <div className="blog-single-body">
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
                      <div key={idx} className="blog-single-callout">
                        {block.title && <h4>{block.title}</h4>}
                        <p>{block.text}</p>
                      </div>
                    );
                  }
                  if (block.type === 'specTable') {
                    return (
                      <div key={idx} className="blog-single-table-wrap">
                        {block.caption && (
                          <div className="blog-single-table-caption">{block.caption}</div>
                        )}
                        <div className="blog-single-table-scroll">
                          <table className="blog-single-table">
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
                      <figure key={idx} className="blog-single-figure">
                        <div className="blog-single-figure-media">
                          <img
                            src={block.src}
                            alt={block.alt || block.caption || post.title}
                            className="blog-single-figure-img"
                            loading="lazy"
                          />
                        </div>
                        {(block.caption || block.credit) && (
                          <figcaption className="blog-single-figure-caption">
                            {block.caption && <span className="blog-single-figure-caption__text">{block.caption}</span>}
                            {block.credit && <span className="blog-single-figure-caption__credit">{block.credit}</span>}
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
                <div className="blog-single-author-card">
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="blog-single-author-card__avatar"
                    />
                  )}
                  <div>
                    <span className="blog-single-author-card__kicker">Written By</span>
                    <h4 className="blog-single-author-card__name">{post.author.name}</h4>
                    <p className="blog-single-author-card__role">{post.author.role}</p>
                    <p className="blog-single-author-card__bio">
                      Specialized in high-voltage transformer design, dielectric condition monitoring, and custom substation integration for heavy industrial and utility projects.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className="blog-single-sidebar" aria-label="Technical Consultation">
              <div className="blog-single-side-card">
                <h4>Need Technical Guidance?</h4>
                <p>
                  Speak directly with our power engineering directors regarding transformer ratings, vector groups, BIL withstand, and on-site testing.
                </p>
                <Link href="/contact/" className="blog-single-side-btn">
                  Consult Our Engineers
                </Link>
              </div>

              <div className="blog-single-side-card">
                <h4>Explore Products</h4>
                <ul className="blog-single-side-links">
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
        <section className="blog-single-related-sec" aria-label="Related Insights">
          <div className="wrap">
            <div className="blog-single-related-head">
              <div>
                <span className="blog-single-related-kicker">Recommended Reading</span>
                <h2 className="blog-single-related-title">Related Engineering Insights</h2>
              </div>
              <Link href="/blog/" className="blog-single-view-all">
                <span>View All Articles</span>
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Exact ETS 3-column Grid Cards */}
            <div className="blog-ets-grid">
              {related.map(item => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}/`}
                  className="blog-ets-card group"
                >
                  <div className="blog-ets-card-media">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="blog-ets-card-img"
                    />
                  </div>

                  <div className="blog-ets-card-body">
                    <div className="blog-ets-card-tag-row">
                      <span className="blog-ets-card-tag">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="blog-ets-card-title">
                      {item.title}
                    </h3>

                    <p className="blog-ets-card-excerpt">
                      {item.excerpt}
                    </p>

                    <div className="blog-ets-card-footer">
                      <span className="blog-ets-card-meta">
                        {item.readTime || `${item.readMinutes || 7} min read`}
                      </span>
                      <span className="blog-ets-card-arrow">
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
      <section className="blog-ets-cta-sec" aria-label="Technical Consultation and Sizing">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TECHNICAL CONSULTATION &amp; SIZING</span>
              <h3>Have complex substation or custom transformer requirements?</h3>
              <p>
                Our practicing electrical engineers can review your single-line diagram (SLD), calculate short-circuit tolerances, and issue an engineering proposal within 48 hours.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href="/contact/">
                Talk to an Engineer <ArrowRight />
              </Link>
              <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
