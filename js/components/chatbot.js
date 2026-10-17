/* ── BPEL AI Assistant / Chatbot Widget ── */

function ChatbotWidget() {
  return `
  <div class="chatbot-widget" id="chatbot-widget" aria-label="BPEL AI Assistant Chat" role="dialog" aria-modal="false" hidden>
    <!-- Header -->
    <div class="chatbot-header">
      <div class="chatbot-header__profile">
        <div class="chatbot-avatar">
          <svg viewBox="0 0 28 28" width="24" height="24" fill="none" aria-hidden="true">
            <path d="M5 14 A9 9 0 0 1 23 14" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            <rect x="3" y="11.5" width="3.5" height="7" rx="1.7" fill="#ffffff"/>
            <rect x="21.5" y="11.5" width="3.5" height="7" rx="1.7" fill="#ffffff"/>
            <path d="M22 17 C22 21.5, 17 23.5, 14 23.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>
            <circle cx="13" cy="23.5" r="1.8" fill="#ffffff"/>
            <line x1="14" y1="10.5" x2="14" y2="8" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="14" cy="7.2" r="1.2" fill="#ffffff"/>
            <rect x="7.5" y="10.5" width="13" height="9.5" rx="3.5" fill="#ffffff"/>
            <rect x="10" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#1F3A93"/>
            <rect x="15.8" y="13.2" width="2.2" height="3.2" rx="0.8" fill="#1F3A93"/>
          </svg>
          <span class="chatbot-avatar__status" aria-label="Online"></span>
        </div>
        <div class="chatbot-header__info">
          <h3 class="chatbot-header__title">BPEL Assistant</h3>
          <span class="chatbot-header__sub">● Online | Power Infrastructure AI</span>
        </div>
      </div>
      <div class="chatbot-header__actions">
        <button type="button" class="chatbot-ctrl-btn" id="chatbot-reset" title="Restart conversation" aria-label="Restart chat">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <button type="button" class="chatbot-ctrl-btn" id="chatbot-close" title="Close chat" aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="chatbot-body" id="chatbot-messages" role="log" aria-live="polite">
      <!-- Welcome Message will be initialized here by JS -->
    </div>

    <!-- Quick Prompts Chips Row -->
    <div class="chatbot-chips-bar" id="chatbot-chips">
      <button type="button" class="chatbot-chip" data-query="transformer-specs">⚡ Transformer Specs</button>
      <button type="button" class="chatbot-chip" data-query="get-quote">📋 Request a Quote</button>
      <button type="button" class="chatbot-chip" data-query="substations">🏭 Compact Substations</button>
      <button type="button" class="chatbot-chip" data-query="certifications">🛡️ Standards & Quality</button>
      <button type="button" class="chatbot-chip" data-query="contact-human">📞 Talk to an Engineer</button>
    </div>

    <!-- Input Box -->
    <form class="chatbot-footer" id="chatbot-form" autocomplete="off">
      <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Ask about transformers, specs, prices..." aria-label="Type your message" maxlength="300">
      <button type="submit" class="chatbot-send-btn" id="chatbot-send" aria-label="Send message" title="Send message">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </form>
  </div>`;
}

/* Chatbot Brain: Knowledge Base & Responses */
const CHATBOT_KNOWLEDGE = [
  {
    triggers: ['transformer', 'oil', 'dry', 'capacity', 'voltage', 'kva', 'mva', 'core', 'step up', 'step down'],
    reply: `<strong>BPEL manufactures high-grade power & distribution transformers:</strong><br>
    • <strong>Oil-Immersed Transformers:</strong> 10kV to 220kV / 500kV grid rating, high thermal efficiency, automated on-load tap changer (OLTC).<br>
    • <strong>Cast Resin Dry-Type:</strong> Class F/H insulation, self-extinguishing, ideal for commercial buildings, data centers & indoor substations.<br>
    • All units conform to <strong>IEC 60076</strong> & <strong>IEEE C57</strong> standards.<br><br>
    <a href="#products" class="chat-action-link" onclick="window.closeChatbotModal()">View Products Catalog →</a>`
  },
  {
    triggers: ['quote', 'price', 'cost', 'quotation', 'pricing', 'order', 'tender', 'rfq', 'inquiry'],
    reply: `<strong>Looking for a customized project quotation?</strong><br>
    Our senior engineering team prepares detailed load flow calculations, layout drawings, and transparent pricing.<br><br>
    <a href="#contact" class="chat-action-btn" onclick="window.closeChatbotModal()">Open Quotation Form 📋</a>`
  },
  {
    triggers: ['substation', 'kiosk', 'package', 'switchgear', 'mv', 'vacuum', 'scada', 'breaker', 'panel'],
    reply: `<strong>BPEL Prefabricated Substations & Switchgear:</strong><br>
    • <strong>Compact Kiosk Substations:</strong> Outdoor weatherproof IP54 housing integrating MV switchgear, transformer & LV distribution.<br>
    • <strong>Vacuum Switchgear:</strong> Arc-resistant medium-voltage circuit breakers with microprocessor SCADA protection.<br><br>
    <a href="#products" class="chat-action-link" onclick="window.closeChatbotModal()">Explore Substation Systems →</a>`
  },
  {
    triggers: ['certificate', 'iso', 'standard', 'testing', 'quality', 'warranty', 'guarantee', 'tuv', 'iec'],
    reply: `<strong>Certified Quality Assurance:</strong><br>
    • <strong>ISO 9001:2015</strong> Quality Management Certified.<br>
    • 100% factory pre-tested: lightning impulse, dielectric loss, partial discharge & temperature rise tests.<br>
    • Full 2 to 5 years manufacturer warranty with 24/7 technical emergency dispatch.`
  },
  {
    triggers: ['contact', 'human', 'call', 'phone', 'engineer', 'whatsapp', 'email', 'address', 'location'],
    reply: `<strong>Contact BPEL Engineering Team:</strong><br>
    • <strong>Hotline:</strong> Available 24/7 for grid emergencies<br>
    • <strong>WhatsApp:</strong> Direct engineer chat<br>
    • <strong>Email:</strong> projects@bpel-power.com<br><br>
    <a href="https://wa.me/8801700000000" target="_blank" rel="noopener" class="chat-action-btn chat-action-btn--wa">Open WhatsApp Chat 💬</a>`
  },
  {
    triggers: ['hello', 'hi', 'hey', 'salam', 'assalam', 'morning', 'afternoon', 'help'],
    reply: `Hello! 👋 I am the <strong>BPEL Virtual Power Assistant</strong>. I can assist you with transformer specifications, substation solutions, custom quotation requests, or direct contact with our engineering team. How can I help you?`
  }
];

function initChatbot() {
  const widget = document.getElementById('chatbot-widget');
  const toggleBtn = document.getElementById('chatbot-toggle');
  const closeBtn = document.getElementById('chatbot-close');
  const resetBtn = document.getElementById('chatbot-reset');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesBox = document.getElementById('chatbot-messages');
  const chipsBar = document.getElementById('chatbot-chips');

  if (!widget || !toggleBtn) return;

  let isOpen = false;

  const openChat = () => {
    isOpen = true;
    widget.hidden = false;
    widget.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    // Remove notification badge when opened
    const badge = toggleBtn.querySelector('.bot-unread-badge');
    if (badge) badge.remove();
    input.focus();
  };

  const closeChat = () => {
    isOpen = false;
    widget.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    setTimeout(() => {
      if (!isOpen) widget.hidden = true;
    }, 280);
  };

  window.closeChatbotModal = closeChat;

  toggleBtn.addEventListener('click', () => {
    isOpen ? closeChat() : openChat();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeChat);

  const getTimeString = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const appendMessage = (sender, html) => {
    const msgEl = document.createElement('div');
    msgEl.className = `chat-bubble chat-bubble--${sender}`;
    msgEl.innerHTML = `
      <div class="chat-bubble__content">${html}</div>
      <span class="chat-bubble__time">${getTimeString()}</span>
    `;
    messagesBox.appendChild(msgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  const showTypingIndicator = () => {
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-typing';
    typingEl.id = 'chat-typing';
    typingEl.innerHTML = `<span></span><span></span><span></span>`;
    messagesBox.appendChild(typingEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  const removeTypingIndicator = () => {
    const typingEl = document.getElementById('chat-typing');
    if (typingEl) typingEl.remove();
  };

  const renderWelcome = () => {
    messagesBox.innerHTML = '';
    appendMessage('bot', `
      <strong>Welcome to BPEL!</strong> 👋<br>
      I am your 24/7 Power Infrastructure Assistant. How can I help you today with transformers, compact substations, or tenders?
    `);
  };

  renderWelcome();

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      renderWelcome();
    });
  }

  const handleUserMessage = (text) => {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // User message
    appendMessage('user', cleanText);
    input.value = '';

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      const lower = cleanText.toLowerCase();
      let matched = null;

      for (const item of CHATBOT_KNOWLEDGE) {
        if (item.triggers.some(t => lower.includes(t))) {
          matched = item.reply;
          break;
        }
      }

      if (matched) {
        appendMessage('bot', matched);
      } else {
        appendMessage('bot', `
          Thank you for reaching out! For detailed custom technical queries or immediate engineering advice regarding <strong>"${cleanText}"</strong>, please contact our engineering desk or request a quote:<br><br>
          <a href="#contact" class="chat-action-btn" onclick="window.closeChatbotModal()">Request Specification & Quote 📋</a>
        `);
      }
    }, 450);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
  });

  // Handle Quick Chips
  if (chipsBar) {
    chipsBar.addEventListener('click', (e) => {
      const chip = e.target.closest('.chatbot-chip');
      if (chip) {
        const text = chip.textContent.replace(/^[^\w\s]+/, '').trim();
        handleUserMessage(text);
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeChat();
    }
  });
}

window.ChatbotWidget = ChatbotWidget;
window.initChatbot = initChatbot;
