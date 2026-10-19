import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { DATA, waLink } from '@/lib/data';

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

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
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
    <article className="blog-detail-root">
      {/* Top Breadcrumb & Article Header */}
      <header className="blog-detail-header">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="blog-detail-crumbs">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/resources/">Resources</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li aria-current="page"><span>{post.category}</span></li>
            </ol>
          </nav>

          <div className="blog-detail-meta-top">
            <span className="blog-badge blog-badge--cat">{post.category}</span>
            <span className="blog-meta-item"><CalendarIcon /> {post.date}</span>
            <span className="blog-meta-sep">•</span>
            <span className="blog-meta-item"><ClockIcon /> {post.readTime}</span>
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>

          <p className="blog-detail-lead">{post.excerpt}</p>

          <div className="blog-detail-author-row">
            <div className="blog-detail-author">
              {post.author?.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="blog-detail-author__avatar"
                />
              )}
              <div>
                <strong className="blog-detail-author__name">{post.author?.name}</strong>
                <span className="blog-detail-author__role">{post.author?.role}</span>
              </div>
            </div>

            <div className="blog-detail-share">
              <span className="blog-detail-share__label">Share:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-share-btn"
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/`}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-share-btn"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Media Image */}
      <div className="blog-detail-media-wrap">
        <div className="wrap">
          <div className="blog-detail-media">
            <img
              src={post.image}
              alt={post.title}
              className="blog-detail-media__img"
            />
          </div>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="wrap blog-detail-layout">
        <div className="blog-detail-main">
          {/* Key Takeaways Box */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="blog-takeaways-card">
              <div className="blog-takeaways-card__head">
                <span className="blog-takeaways-card__icon"><CheckIcon /></span>
                <h3>Executive Engineering Takeaways</h3>
              </div>
              <ul className="blog-takeaways-card__list">
                {post.takeaways.map((item, idx) => (
                  <li key={idx}>
                    <span className="blog-takeaways-card__bullet"><CheckIcon /></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Render structured article blocks */}
          <div className="blog-content-body">
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
                  <div key={idx} className="blog-callout-box">
                    {block.title && <h4>{block.title}</h4>}
                    <p>{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'specTable') {
                return (
                  <div key={idx} className="blog-table-container">
                    {block.caption && <div className="blog-table-caption">{block.caption}</div>}
                    <div className="blog-table-scroll">
                      <table className="blog-spec-table">
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
              return null;
            })}
          </div>

          {/* Author Box */}
          <div className="blog-author-card">
            {post.author?.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="blog-author-card__avatar"
              />
            )}
            <div className="blog-author-card__info">
              <span className="blog-author-card__kicker">Written By</span>
              <h4>{post.author?.name}</h4>
              <p className="blog-author-card__role">{post.author?.role}</p>
              <p className="blog-author-card__desc">
                Specialized in high-voltage transformer design, dielectric condition monitoring, and custom substation integration for heavy industrial and utility projects.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="blog-detail-sidebar">
          <div className="blog-sidebar-card">
            <h4>Need Technical Guidance?</h4>
            <p>
              Speak directly with our power engineering directors regarding transformer ratings, vector groups, BIL withstand, and on-site testing.
            </p>
            <Link href="/contact/" className="blog-sidebar-btn">
              Consult Our Engineers
            </Link>
          </div>

          <div className="blog-sidebar-card">
            <h4>Explore Products</h4>
            <ul className="blog-sidebar-links">
              <li><Link href="/products/">Oil-Immersed Transformers</Link></li>
              <li><Link href="/products/16000-kva-oil-filled-transformer/">16,000 kVA Power Units</Link></li>
              <li><Link href="/products/5000-kva-oil-filled-transformer/">Hermetically Sealed Units</Link></li>
              <li><Link href="/certifications/">Type Test Reports & Accreditations</Link></li>
              <li><Link href="/resources/sizing-guide/">Transformer Sizing Calculator</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Related Articles Section */}
      {related.length > 0 && (
        <section className="blog-related-section">
          <div className="wrap">
            <div className="blog-related-head">
              <div>
                <span className="label">Recommended Reading</span>
                <h2>Related Engineering Insights</h2>
              </div>
              <Link href="/blog/" className="blog-view-all-link">
                <span>View All Articles</span>
                <ArrowRight />
              </Link>
            </div>

            <div className="blog-grid">
              {related.map(item => (
                <article key={item.slug} className="blog-card-item">
                  <Link href={`/blog/${item.slug}/`} className="blog-card group">
                    <div className="blog-card__media">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="blog-card__img"
                      />
                      <div className="blog-card__cat-pill">
                        {item.category}
                      </div>
                    </div>

                    <div className="blog-card__body">
                      <div className="blog-card__time-row">
                        <span className="blog-meta-item">
                          <CalendarIcon /> {item.date}
                        </span>
                        <span className="blog-meta-sep">•</span>
                        <span className="blog-meta-item">
                          <ClockIcon /> {item.readTime}
                        </span>
                      </div>

                      <h3 className="blog-card__title">
                        {item.title}
                      </h3>

                      <p className="blog-card__excerpt">
                        {item.excerpt}
                      </p>

                      <div className="blog-card__footer">
                        <div className="blog-card__author">
                          {item.author?.avatar && (
                            <img
                              src={item.author.avatar}
                              alt=""
                              className="blog-card__author-avatar"
                            />
                          )}
                          <span className="blog-card__author-name">{item.author?.name}</span>
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
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="blog-bottom-cta">
        <div className="wrap">
          <div className="blog-bottom-cta__inner">
            <div className="blog-bottom-cta__content">
              <span className="blog-bottom-cta__kicker">Consult Our High-Voltage Team</span>
              <h2>Ready to Power Your Next Substation or Plant Expansion?</h2>
              <p>
                From custom transformer manufacturing to turnkey on-site installation and IEC acceptance testing, BPEL delivers proven reliability.
              </p>
            </div>
            <div className="blog-bottom-cta__actions">
              <Link href="/contact/" className="blog-bottom-cta__btn">
                <span>Request a Quotation</span>
                <ArrowRight />
              </Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="blog-bottom-cta__phone">
                <span>WhatsApp Engineering</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
