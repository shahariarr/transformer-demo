'use client';

import { useState } from 'react';

/* Image slot. With no `image` (or if it fails to load), shows a labelled placeholder naming the file to add. */
export default function Media({ item, cls = '', parallax = false, reveal = true }) {
  const [failed, setFailed] = useState(false);
  const hintPath = `assets/images/${item.dir}/${item.hint}`;
  const label = item.name || item.title;
  const showImg = item.image && !failed;
  const a11y = item.image
    ? (failed ? { role: 'img', 'aria-label': `Placeholder image: ${label.replace(/'/g, '')}` } : {})
    : { role: 'img', 'aria-label': `Placeholder image: ${label}` };

  return (
    <div className={`media ${parallax ? 'media--par' : ''} ${cls}`} {...a11y} {...(reveal ? { 'data-reveal': 'mask' } : {})}>
      <div className="media__shift" {...(parallax ? { 'data-parallax': '' } : {})}>
        <div className="ph" aria-hidden="true"><span>Photo placeholder</span><small>{hintPath}</small></div>
        {showImg ? (
          <img src={item.image} alt={label} loading="lazy" decoding="async" onError={() => setFailed(true)} />
        ) : null}
      </div>
    </div>
  );
}
