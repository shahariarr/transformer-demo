'use client';

import { useEffect, useRef, useState } from 'react';
import { useUI } from './UIProvider';
import Media from './Media';

/* Details dialog for products, projects and certificates */
export default function Dialog() {
  const { dialog, closeDialog, prefillContact } = useUI();
  const ref = useRef(null);
  // Keep the last content while the dialog closes
  const [content, setContent] = useState(null);

  useEffect(() => {
    const d = ref.current;
    if (dialog) {
      setContent(dialog);
      if (!d.open) d.showModal();
    } else if (d.open) {
      d.close();
    }
  }, [dialog]);

  const c = content || {};

  return (
    <dialog id="dlg" className={`dlg${c.isCert ? ' dlg--cert' : ''}`} aria-labelledby="dlg-title" ref={ref}
            onClose={closeDialog} onClick={e => { if (e.target === ref.current) closeDialog(); }}>
      <div className="dlg__inner">
        <button type="button" className="dlg__close" aria-label="Close details" onClick={closeDialog}>&times;</button>
        <div id="dlg-media">
          {content ? (c.isCert
            ? <div className="dlg-cert-view"><img src={c.item.image} alt={c.title} /></div>
            : <Media item={c.item} reveal={false} key={c.title} />) : null}
        </div>
        <div className="dlg__body">
          <p className="cat" id="dlg-kicker">{c.kicker}</p>
          <h3 id="dlg-title">{c.title}</h3>
          <p id="dlg-desc">{c.desc}</p>
          <p className="dlg__note" id="dlg-note">{c.note}</p>
          <a className="btn btn--primary" id="dlg-cta" href="/contact/" onClick={() => { if (c.service) prefillContact(c.service); closeDialog(); }}>{c.cta}</a>
        </div>
      </div>
    </dialog>
  );
}
