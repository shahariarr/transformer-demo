'use client';

import { useEffect, useRef, useState } from 'react';
import { CHATBOT_KNOWLEDGE } from '@/lib/chatbot';
import { useUI } from './UIProvider';

const CHIPS = [
  ['transformer-specs', '⚡ Transformer Specs'],
  ['get-quote', '📋 Request a Quote'],
  ['substations', '🏭 Compact Substations'],
  ['certifications', '🛡️ Standards & Quality'],
  ['contact-human', '📞 Talk to an Engineer']
];

const WELCOME = `
      <strong>Welcome to BPEL!</strong> 👋<br>
      I am your 24/7 Power Infrastructure Assistant. How can I help you today with transformers, compact substations, or tenders?
    `;

const escapeHtml = s => s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const timeString = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const bot = html => ({ sender: 'bot', html, time: timeString() });

function replyFor(text) {
  const lower = text.toLowerCase();
  const matched = CHATBOT_KNOWLEDGE.find(item => item.triggers.some(t => lower.includes(t)));
  if (matched) return matched.reply;
  return `
          Thank you for reaching out! For detailed custom technical queries or immediate engineering advice regarding <strong>"${escapeHtml(text)}"</strong>, please contact our engineering desk or request a quote:<br><br>
          <a href="#contact" class="chat-action-btn" data-close-chat>Request Specification &amp; Quote 📋</a>
        `;
}

const BotFace = () => (
  <svg viewBox="0 0 28 28" width="24" height="24" fill="none" aria-hidden="true">
    <path d="M5 14 A9 9 0 0 1 23 14" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <rect x="3" y="11.5" width="3.5" height="7" rx="1.7" fill="#ffffff" />
    <rect x="21.5" y="11.5" width="3.5" height="7" rx="1.7" fill="#ffffff" />
    <path d="M22 17 C22 21.5, 17 23.5, 14 23.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="13" cy="23.5" r="1.8" fill="#ffffff" />
    <line x1="14" y1="10.5" x2="14" y2="8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="14" cy="7.2" r="1.2" fill="#ffffff" />
    <rect x="7.5" y="10.5" width="13" height="9.5" rx="3.5" fill="#ffffff" />
    <rect x="10" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#0B5CAB" />
    <rect x="15.8" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#0B5CAB" />
  </svg>
);

export default function Chatbot() {
  const { chatOpen, setChatOpen } = useUI();
  const [hidden, setHidden] = useState(true);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Welcome message is created on the client (it carries the local time)
  useEffect(() => setMessages([bot(WELCOME)]), []);

  // Keep `hidden` until open; on close, wait for the exit transition before hiding again
  useEffect(() => {
    if (chatOpen) {
      setHidden(false);
      requestAnimationFrame(() => inputRef.current && inputRef.current.focus());
      return;
    }
    const t = setTimeout(() => setHidden(true), 280);
    return () => clearTimeout(t);
  }, [chatOpen]);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setChatOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setChatOpen]);

  useEffect(() => {
    const box = bodyRef.current;
    box.scrollTop = box.scrollHeight;
  }, [messages, typing]);

  const send = raw => {
    if (!raw || !raw.trim()) return;
    const clean = raw.trim();
    setMessages(m => [...m, { sender: 'user', text: clean, time: timeString() }]);
    setText('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, bot(replyFor(clean))]);
    }, 450);
  };

  return (
    <div className={`chatbot-widget${chatOpen ? ' is-open' : ''}`} id="chatbot-widget" aria-label="BPEL AI Assistant Chat" role="dialog" aria-modal="false" hidden={hidden && !chatOpen}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header__profile">
          <div className="chatbot-avatar">
            <BotFace />
            <span className="chatbot-avatar__status" aria-label="Online"></span>
          </div>
          <div className="chatbot-header__info">
            <h3 className="chatbot-header__title">BPEL Assistant</h3>
            <span className="chatbot-header__sub">● Online | Power Infrastructure AI</span>
          </div>
        </div>
        <div className="chatbot-header__actions">
          <button type="button" className="chatbot-ctrl-btn" id="chatbot-reset" title="Restart conversation" aria-label="Restart chat" onClick={() => setMessages([bot(WELCOME)])}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          </button>
          <button type="button" className="chatbot-ctrl-btn" id="chatbot-close" title="Close chat" aria-label="Close chat" onClick={() => setChatOpen(false)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chatbot-body" id="chatbot-messages" role="log" aria-live="polite" ref={bodyRef}
           onClick={e => { if (e.target.closest('[data-close-chat]')) setChatOpen(false); }}>
        {messages.map((m, i) => (
          <div className={`chat-bubble chat-bubble--${m.sender}`} key={i}>
            {m.sender === 'user'
              ? <div className="chat-bubble__content">{m.text}</div>
              : <div className="chat-bubble__content" dangerouslySetInnerHTML={{ __html: m.html }} />}
            <span className="chat-bubble__time">{m.time}</span>
          </div>
        ))}
        {typing ? <div className="chat-typing" id="chat-typing"><span></span><span></span><span></span></div> : null}
      </div>

      {/* Quick Prompts */}
      <div className="chatbot-chips-bar" id="chatbot-chips">
        {CHIPS.map(([q, label]) => (
          <button type="button" className="chatbot-chip" data-query={q} key={q} onClick={() => send(label.replace(/^[^\w\s]+/, '').trim())}>{label}</button>
        ))}
      </div>

      {/* Input */}
      <form className="chatbot-footer" id="chatbot-form" autoComplete="off" onSubmit={e => { e.preventDefault(); send(text); }}>
        <input type="text" id="chatbot-input" className="chatbot-input" placeholder="Ask about transformers, specs, prices..." aria-label="Type your message" maxLength="300"
               ref={inputRef} value={text} onChange={e => setText(e.target.value)} />
        <button type="submit" className="chatbot-send-btn" id="chatbot-send" aria-label="Send message" title="Send message">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
}
