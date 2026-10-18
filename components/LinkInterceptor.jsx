'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* Turns clicks on plain internal <a href="/..."> links (section markup, chatbot replies)
   into client-side navigation, so pages switch without a full reload. */
export default function LinkInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page with only a hash change: let the browser scroll
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      e.preventDefault();
      router.push(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);

  return null;
}
