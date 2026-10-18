'use client';

import { useEffect, useRef, useState } from 'react';
import { waLink, mailLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';
import { useUI } from './UIProvider';

/* Back-to-top, email, WhatsApp and chatbot buttons; hidden while the contact form is on screen */
export default function FloatingActions() {
  const { chatOpen, setChatOpen } = useUI();
  const [showTop, setShowTop] = useState(false);
  const [overForm, setOverForm] = useState(false);
  const [unread, setUnread] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const form = document.getElementById('contact-form');
    const io = form && new IntersectionObserver(([e]) => setOverForm(e.isIntersecting), { threshold: 0 });
    if (io) io.observe(form);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (io) io.disconnect();
    };
  }, []);

  useEffect(() => { if (chatOpen) setUnread(false); }, [chatOpen]);

  return (
    <div className={`floating-actions${overForm ? ' is-hidden' : ''}`} id="floating-actions" aria-label="Quick Actions" ref={ref}>
      <button type="button" className={`floating-btn floating-btn--top${showTop ? ' is-visible' : ''}`} id="back-to-top" aria-label="Back to top" title="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <a className="floating-btn floating-btn--mail" href={mailLink()} aria-label="Send Email" title="Send Email">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      </a>
      <a className="floating-btn floating-btn--wa wa" href={waLink()} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d={WA_PATH} />
        </svg>
      </a>
      <button type="button" className={`floating-btn floating-btn--bot${chatOpen ? ' is-active' : ''}`} id="chatbot-toggle" aria-label="Open BPEL AI Chatbot" title="Chat with BPEL Assistant"
              onClick={() => setChatOpen(!chatOpen)}>
        <span className="bot-badge-glow" aria-hidden="true"></span>
        {unread ? <span className="bot-unread-badge" aria-hidden="true">1</span> : null}
        <svg viewBox="0 0 28 28" width="28" height="28" fill="none" aria-hidden="true">
          <path d="M5 14 A9 9 0 0 1 23 14" stroke="#0B5CAB" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <rect x="3" y="11" width="3.5" height="7.5" rx="1.7" fill="#0B5CAB" />
          <rect x="21.5" y="11" width="3.5" height="7.5" rx="1.7" fill="#0B5CAB" />
          <path d="M22 17 C22 21.5, 17 23.5, 14 23.5" stroke="#0B5CAB" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="13" cy="23.5" r="1.8" fill="#0B5CAB" />
          <line x1="14" y1="10.5" x2="14" y2="8" stroke="#0B5CAB" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="14" cy="7.2" r="1.2" fill="#0B5CAB" />
          <rect x="7.5" y="10.5" width="13" height="9.5" rx="3.5" fill="#0B5CAB" />
          <rect x="10" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#ffffff" />
          <rect x="15.8" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#ffffff" />
        </svg>
      </button>
    </div>
  );
}
