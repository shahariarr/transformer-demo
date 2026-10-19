'use client';

import { useState, useEffect } from 'react';

export default function DetailGallery({ mainImage, gallery = [], alt = '', badgeLabel = 'Project Showcase' }) {
  // All 3 images available in the gallery set
  const allImages = [mainImage, ...gallery.filter(Boolean)].slice(0, 3);
  const [activeImg, setActiveImg] = useState(mainImage);

  useEffect(() => {
    setActiveImg(mainImage);
  }, [mainImage]);

  // The 2 secondary images to show underneath
  const thumbs = allImages.filter(img => img !== activeImg).slice(0, 2);
  // In case there aren't 2 distinct images, fallback to the other items in allImages
  const displayThumbs = thumbs.length === 2 ? thumbs : allImages.slice(1, 3);

  return (
    <div className="detail__gallery fade-in-left">
      {/* Main Large Image */}
      <figure className="detail__media">
        <img
          key={activeImg}
          src={activeImg}
          alt={alt}
          loading="eager"
          decoding="async"
          className="detail__main-img"
        />
        <div className="detail__media-badge">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{badgeLabel}</span>
        </div>
      </figure>

      {/* 2 Smaller Images Underneath */}
      {displayThumbs.length > 0 && (
        <div className="detail__thumbs" aria-label="Additional gallery views">
          {displayThumbs.map((thumbUrl, idx) => {
            const isSelected = activeImg === thumbUrl;
            return (
              <button
                type="button"
                key={thumbUrl + idx}
                className={`detail__thumb ${isSelected ? 'is-active' : ''}`}
                onClick={() => setActiveImg(thumbUrl)}
                aria-label={`View photo ${idx + 2} of ${alt}`}
                title="Click to view main image"
              >
                <img
                  src={thumbUrl}
                  alt={`${alt} installation view ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="detail__thumb-overlay" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
