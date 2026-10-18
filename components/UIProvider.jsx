'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { DATA } from '@/lib/data';
import { QA_CERTS } from '@/lib/quality';

/* App-wide UI state shared between sections: details dialog, contact form prefill,
   open FAQ items, search modal and chatbot. */
const UIContext = createContext(null);

export function useUI() {
  return useContext(UIContext);
}

export default function UIProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const [service, setService] = useState('');
  const [openFaqs, setOpenFaqs] = useState(() => new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  // Bumped on every open request so the search input re-focuses even if already open
  const [searchRequest, setSearchRequest] = useState(0);
  const openSearch = useCallback(() => { setSearchOpen(true); setSearchRequest(n => n + 1); }, []);
  const [chatOpen, setChatOpen] = useState(false);

  const openProduct = useCallback(i => {
    const x = DATA.products[i];
    setDialog({
      item: x, kicker: x.cat, title: x.name, desc: x.desc,
      note: 'Technical specifications and product details will be added once the company supplies them.',
      cta: 'Request a quote', service: x.name
    });
  }, []);

  const openProject = useCallback(i => {
    const x = DATA.projects[i];
    setDialog({
      item: x, kicker: x.cat, title: x.title, desc: x.desc,
      note: 'Illustrative example only. This is not a project completed by the company.',
      cta: 'Discuss a similar project', service: ''
    });
  }, []);

  const openCert = useCallback(i => {
    const x = QA_CERTS[i];
    if (!x) return;
    setDialog({
      item: { image: x.src, dir: 'certificates', hint: '' },
      kicker: `${x.badge} • ${x.certNo}`,
      title: x.title,
      desc: `${x.desc} (${x.issuer})`,
      note: 'Official certification and test report document.',
      cta: 'Inquire About Certifications',
      service: x.title,
      isCert: true
    });
  }, []);

  const toggleFaq = useCallback(i => setOpenFaqs(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  }), []);

  const openFaq = useCallback(i => setOpenFaqs(prev => new Set(prev).add(i)), []);

  /* Selects a product/service in the contact form, if it is one of the options */
  const prefillContact = useCallback(value => {
    const options = [...DATA.products.map(p => p.name), 'Engineering & design', 'Installation & commissioning', 'Other'];
    if (options.includes(value)) setService(value);
  }, []);

  const value = useMemo(() => ({
    dialog, closeDialog: () => setDialog(null), openProduct, openProject, openCert,
    service, setService, prefillContact,
    openFaqs, toggleFaq, openFaq,
    searchOpen, searchRequest, openSearch, closeSearch: () => setSearchOpen(false),
    chatOpen, setChatOpen
  }), [dialog, openProduct, openProject, openCert, service, prefillContact, openFaqs, toggleFaq, openFaq, searchOpen, searchRequest, openSearch, chatOpen]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
