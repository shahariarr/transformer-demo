'use client';

import { useEffect, useRef, useState } from 'react';
import { useUI } from './UIProvider';
import { getAgentReply, extractKva, generateQuotationCard, generateWorkOrderCard } from '@/lib/agent-engine';

const CHIPS = [
  ['instant-quote', '⚡ Instant Quotation'],
  ['create-wo', '📝 Create Work Order'],
  ['all-products', '📦 Products & Photos'],
  ['kva-calculator', '📐 kVA Sizing Calculator'],
  ['projects-epc', '🏭 Flagship Projects'],
  ['16000-kva', '⚡ 16000 kVA Specs'],
  ['2500-kva', '⚡ 2500 kVA Specs'],
  ['dry-type', '⚡ Cast Resin Dry-Type'],
  ['company-factory', '🏢 Gazipur Factory'],
  ['standards', '🛡️ BPDB & DESCO'],
  ['contact-human', '📞 24/7 Human Hotline']
];

const WELCOME = `
  <div class="agent-welcome-card">
    <div class="agent-welcome-card__header">
      <span class="agent-welcome-tag">BPEL AGENT</span>
      <span class="agent-welcome-ver">Online 24/7</span>
    </div>
    <div class="agent-welcome-card__title">
      Engr. Tanvir Ahmed
    </div>
    <p class="agent-welcome-card__text">
      Welcome to <strong>BPEL</strong>! Ask for instant transformer quotes, technical specs, or work order issuance.
    </p>
    <div class="agent-welcome-actions">
      <button type="button" class="agent-action-tile" data-action="instant-quote">
        <span class="agent-action-tile__icon">⚡</span>
        <span class="agent-action-tile__title">Instant Quote</span>
      </button>
      <button type="button" class="agent-action-tile" data-action="create-wo">
        <span class="agent-action-tile__icon">📝</span>
        <span class="agent-action-tile__title">Work Order</span>
      </button>
      <button type="button" class="agent-action-tile" data-action="all-products">
        <span class="agent-action-tile__icon">📦</span>
        <span class="agent-action-tile__title">Products</span>
      </button>
      <button type="button" class="agent-action-tile" data-action="kva-calculator">
        <span class="agent-action-tile__icon">📐</span>
        <span class="agent-action-tile__title">kVA Sizing</span>
      </button>
    </div>
    <div class="agent-welcome-footer">
      <span>📎 <em>Upload BOQ or spec doc for instant AI review.</em></span>
    </div>
  </div>
`;

const timeString = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const botMsg = (html, meta = {}) => ({ sender: 'bot', html, time: timeString(), ...meta });

const AgentCoreIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
    <path d="M12 2L20 6.5V17.5L12 22L4 17.5V6.5L12 2Z" stroke="#38BDF8" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(14, 165, 233, 0.15)" />
    <circle cx="12" cy="12" r="4.2" fill="#0B5CAB" stroke="#67E8F9" strokeWidth="1.6" />
    <path d="M12.5 9.5L10.5 12.5H13.5L11.5 15.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Chatbot() {
  const { chatOpen, setChatOpen } = useUI();
  const [hidden, setHidden] = useState(true);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyStatus, setKeyStatus] = useState('');
  const [copyNotice, setCopyNotice] = useState(false);

  // Full Screen / Maximize state
  const [isFullScreen, setIsFullScreen] = useState(false);

  // File / Document / Image Upload state
  const [attachedFile, setAttachedFile] = useState(null);

  // Work Order Modal state
  const [showWoModal, setShowWoModal] = useState(false);
  const [woFormData, setWoFormData] = useState({
    kva: '1000 kVA',
    qty: 1,
    companyName: '',
    clientName: '',
    phone: '',
    siteLocation: ''
  });

  // Lightbox Image Zoom state
  const [zoomedImage, setZoomedImage] = useState(null);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const chipsRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize welcome message & saved key
  useEffect(() => {
    setMessages([botMsg(WELCOME, { source: 'welcome' })]);
    try {
      const savedKey = localStorage.getItem('bpel_gemini_key') || '';
      if (savedKey) {
        setGeminiKey(savedKey);
        setKeyInput(savedKey);
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle open/close animations
  useEffect(() => {
    if (chatOpen) {
      setHidden(false);
      requestAnimationFrame(() => inputRef.current && inputRef.current.focus());
      return;
    }
    const t = setTimeout(() => {
      setHidden(true);
      setShowSettings(false);
      setIsFullScreen(false);
    }, 280);
    return () => clearTimeout(t);
  }, [chatOpen]);

  // Escape key closes modal or chat
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        if (zoomedImage) {
          setZoomedImage(null);
          return;
        }
        if (showWoModal) {
          setShowWoModal(false);
          return;
        }
        if (isFullScreen) {
          setIsFullScreen(false);
          return;
        }
        setChatOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setChatOpen, isFullScreen, showWoModal, zoomedImage]);

  // Auto-scroll
  useEffect(() => {
    const box = bodyRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages, typing]);

  // Horizontal scroll helper for chips
  const scrollChips = offset => {
    if (chipsRef.current) {
      chipsRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // File / Document / Image select handler (PDF, DOC, TXT, CSV, Images)
  const handleFileSelect = e => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr =
      file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : Math.max(1, Math.round(file.size / 1024)) + ' KB';

    const isImg = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    const isDoc = /\.(doc|docx|txt|csv|xls|xlsx)$/i.test(file.name);

    const fileObj = {
      name: file.name,
      size: sizeStr,
      type: file.type || 'application/octet-stream',
      isImage: isImg,
      isPdf,
      isDoc,
      previewUrl: null,
      textContent: ''
    };

    if (isImg) {
      const reader = new FileReader();
      reader.onload = ev => {
        fileObj.previewUrl = ev.target?.result;
        setAttachedFile({ ...fileObj });
      };
      reader.readAsDataURL(file);
    } else if (file.type.includes('text') || /\.(txt|csv)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onload = ev => {
        fileObj.textContent = String(ev.target?.result || '').slice(0, 4000);
        setAttachedFile({ ...fileObj });
      };
      reader.readAsText(file);
    } else {
      // PDF or other documents
      const reader = new FileReader();
      reader.onload = ev => {
        fileObj.previewUrl = ev.target?.result;
        setAttachedFile({ ...fileObj });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Send message
  const send = async (raw, attachedOverride = null) => {
    const currentFile = attachedOverride || attachedFile;
    if ((!raw || !raw.trim()) && !currentFile) return;
    const clean = (raw || '').trim();

    // Append user message with attached document/image if present
    setMessages(m => [
      ...m,
      {
        sender: 'user',
        text: clean || (currentFile?.isImage ? 'Uploaded Equipment Photo for Inspection' : `Uploaded Technical Document: ${currentFile?.name}`),
        file: currentFile,
        time: timeString()
      }
    ]);

    setText('');
    removeAttachedFile();
    setTyping(true);

    try {
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: clean || (currentFile ? `User uploaded technical document: ${currentFile.name}` : ''),
          history: messages.slice(-6),
          apiKey: geminiKey,
          hasImage: Boolean(currentFile?.isImage),
          fileData: currentFile
            ? {
                name: currentFile.name,
                size: currentFile.size,
                type: currentFile.type,
                isPdf: currentFile.isPdf,
                isDoc: currentFile.isDoc,
                isImage: currentFile.isImage,
                textContent: currentFile.textContent
              }
            : null
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTyping(false);
        setMessages(m => [
          ...m,
          botMsg(data.reply, {
            source: data.source || 'gemini',
            model: data.model
          })
        ]);
        return;
      }
    } catch (err) {
      console.warn('API call failed, falling back to autonomous client agent:', err);
    }

    // Client-side autonomous agent fallback
    setTimeout(() => {
      setTyping(false);
      const reply = getAgentReply(clean || 'document uploaded', {
        hasImage: Boolean(currentFile?.isImage),
        fileData: currentFile
      });
      setMessages(m => [...m, botMsg(reply, { source: 'agent-engine' })]);
    }, 350);
  };

  // Handle clicks inside chat body (Delegation)
  const handleBodyClick = e => {
    // 1. Direct quote button
    const quoteBtn = e.target.closest('[data-quote-target]');
    if (quoteBtn) {
      const target = quoteBtn.getAttribute('data-quote-target');
      if (target) {
        send(`I need a budgetary quotation for ${target} transformer`);
        return;
      }
    }

    // 2. Action tile in welcome card
    const actionTile = e.target.closest('[data-action]');
    if (actionTile) {
      const action = actionTile.getAttribute('data-action');
      if (action === 'create-wo') {
        setShowWoModal(true);
      } else if (action === 'instant-quote') {
        send('I need a budgetary quotation for a transformer');
      } else if (action === 'all-products') {
        send('Show all products with photos');
      } else if (action === 'kva-calculator') {
        send('How to calculate transformer kVA load?');
      }
      return;
    }

    // 3. Initialize Work Order button
    const woBtn = e.target.closest('[data-init-wo]');
    if (woBtn) {
      const kva = woBtn.getAttribute('data-init-wo') || '1000 kVA';
      setWoFormData(prev => ({ ...prev, kva }));
      setShowWoModal(true);
      return;
    }

    // 4. Copy quote button
    const copyBtn = e.target.closest('[data-copy-quote]');
    if (copyBtn) {
      const card = copyBtn.closest('.bpel-quote-card, .bpel-workorder-card');
      if (card) {
        navigator.clipboard?.writeText(card.innerText);
        setCopyNotice(true);
        setTimeout(() => setCopyNotice(false), 2000);
      }
      return;
    }

    // 5. Click image to zoom / lightbox
    const imgEl = e.target.closest('.bpel-quote-card__img, .chat-product-img, .chat-bubble__user-img');
    if (imgEl) {
      setZoomedImage(imgEl.src);
      return;
    }

    // 6. Close chat link
    if (e.target.closest('[data-close-chat]')) {
      setChatOpen(false);
    }
  };

  // Submit Work Order Form
  const handleSubmitWorkOrder = e => {
    e.preventDefault();
    setShowWoModal(false);

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('bpel_work_orders') || '[]');
      existing.push({ ...woFormData, date: new Date().toISOString() });
      localStorage.setItem('bpel_work_orders', JSON.stringify(existing));
    } catch {
      // ignore
    }

    // Generate Work Order Card
    const woCard = generateWorkOrderCard(woFormData);
    setMessages(m => [
      ...m,
      {
        sender: 'user',
        text: `Execute Official Work Order for ${woFormData.qty}x ${woFormData.kva} (${woFormData.companyName || 'Client Order'})`,
        time: timeString()
      },
      botMsg(
        `<strong>Congratulations! Work Order Successfully Registered!</strong> 📝<br>Our autonomous procurement engine has locked in your equipment allocation at our Gazipur works:<br><br>${woCard}`
      )
    ]);
  };

  // Save Gemini Key
  const handleSaveKey = () => {
    const trimmed = keyInput.trim();
    setGeminiKey(trimmed);
    try {
      if (trimmed) {
        localStorage.setItem('bpel_gemini_key', trimmed);
        setKeyStatus('Key saved successfully! Gemini AI is now active.');
      } else {
        localStorage.removeItem('bpel_gemini_key');
        setKeyStatus('Key removed. Using BPEL Autonomous Agent.');
      }
      setTimeout(() => {
        setKeyStatus('');
        setShowSettings(false);
      }, 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`chatbot-widget${chatOpen ? ' is-open' : ''}${isFullScreen ? ' is-fullscreen' : ''}`}
      id="chatbot-widget"
      aria-label="BPEL 24/7 Autonomous AI Technical Sales & Procurement Agent"
      role="dialog"
      aria-modal="false"
      hidden={hidden && !chatOpen}
    >
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header__profile">
          <div className="agent-avatar">
            <img src="/assets/images/logo.png" alt="BPEL Logo" className="agent-avatar__logo" />
            <span className="agent-avatar__pulse" aria-label="Online 24/7"></span>
          </div>
          <div className="chatbot-header__info">
            <div className="chatbot-header__title-row">
              <h3 className="chatbot-header__title">Engr. Tanvir Ahmed</h3>
              <span className="agent-badge">
                <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                BPEL AGENT
              </span>
            </div>
            <div className="chatbot-header__sub">
              <span className="agent-status-dot"></span>
              <span className="agent-status-text">
                Active now • Typically replies instantly
              </span>
            </div>
          </div>
        </div>

        <div className="chatbot-header__actions">
          {/* Full Screen / Restore Toggle */}
          <button
            type="button"
            className={`chatbot-ctrl-btn${isFullScreen ? ' is-active' : ''}`}
            title={isFullScreen ? 'Restore Normal Window' : 'Expand to Full Screen'}
            aria-label={isFullScreen ? 'Restore Normal Window' : 'Expand to Full Screen'}
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? (
              // Collapse SVG
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              // Expand Full Screen SVG
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>

          {/* Gemini AI Settings Button */}
          <button
            type="button"
            className={`chatbot-ctrl-btn${showSettings ? ' is-active' : ''}`}
            title="Configure Gemini AI Key"
            aria-label="Configure Gemini AI Key"
            onClick={() => setShowSettings(!showSettings)}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

          {/* Reset Conversation */}
          <button
            type="button"
            className="chatbot-ctrl-btn"
            id="chatbot-reset"
            title="Restart conversation"
            aria-label="Restart chat"
            onClick={() => setMessages([botMsg(WELCOME, { source: 'welcome' })])}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>

          {/* Close Chat */}
          <button
            type="button"
            className="chatbot-ctrl-btn chatbot-ctrl-btn--close"
            id="chatbot-close"
            title="Close chat"
            aria-label="Close chat"
            onClick={() => setChatOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Optional Gemini AI API Configuration Drawer */}
      {showSettings && (
        <div className="chatbot-settings-drawer">
          <div className="chatbot-settings-drawer__header">
            <h4>Google Gemini AI API Setup</h4>
            <button type="button" className="chatbot-settings-close" onClick={() => setShowSettings(false)}>
              ✕
            </button>
          </div>
          <p className="chatbot-settings-drawer__desc">
            Connect your <strong>Google Gemini API Key</strong> for live conversational reasoning. If left empty, the system uses our fully autonomous BPEL Power Engineering Agent.
          </p>
          <div className="chatbot-settings-field">
            <label htmlFor="gemini-key-input">Gemini API Key (Optional):</label>
            <input
              id="gemini-key-input"
              type="password"
              className="chatbot-settings-input"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
            />
          </div>
          {keyStatus && <div className="chatbot-settings-status">{keyStatus}</div>}
          <div className="chatbot-settings-actions">
            <button type="button" className="chatbot-settings-btn chatbot-settings-btn--save" onClick={handleSaveKey}>
              Save Key
            </button>
            {geminiKey && (
              <button
                type="button"
                className="chatbot-settings-btn chatbot-settings-btn--clear"
                onClick={() => {
                  setKeyInput('');
                  setGeminiKey('');
                  localStorage.removeItem('bpel_gemini_key');
                  setKeyStatus('Key cleared.');
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Copy Notification Toast */}
      {copyNotice && <div className="chatbot-toast">Document Summary copied to clipboard! 📋</div>}

      {/* Work Order Intake Modal */}
      {showWoModal && (
        <div className="chatbot-modal-overlay">
          <div className="chatbot-modal-card">
            <div className="chatbot-modal-card__header">
              <h4>📝 Issue Official Work Order / Purchase Order</h4>
              <button type="button" className="chatbot-settings-close" onClick={() => setShowWoModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitWorkOrder} className="chatbot-wo-form">
              <div className="wo-form-row">
                <label>Transformer Model / Rating:</label>
                <select
                  value={woFormData.kva}
                  onChange={e => setWoFormData({ ...woFormData, kva: e.target.value })}
                  className="wo-form-select"
                >
                  <option value="250 kVA">250 kVA Distribution Transformer (11/0.415 kV)</option>
                  <option value="500 kVA">500 kVA Distribution Transformer (11/0.415 kV)</option>
                  <option value="1000 kVA">1,000 kVA Distribution Transformer (11/0.415 kV)</option>
                  <option value="1600 kVA">1,600 kVA Distribution Transformer (11/0.415 kV)</option>
                  <option value="2000 kVA">2,000 kVA Industrial Transformer (33/0.415 kV)</option>
                  <option value="2500 kVA">2,500 kVA Industrial Transformer (11/33 kV)</option>
                  <option value="5000 kVA">5,000 kVA Hermetically Sealed Transformer</option>
                  <option value="10000 kVA">10,000 kVA (10 MVA) Power Transformer</option>
                  <option value="16000 kVA">16,000 kVA (16 MVA) Heavy Substation Transformer</option>
                  <option value="1000 kVA cast resin">1,000 kVA Cast Resin Dry-Type</option>
                </select>
              </div>

              <div className="wo-form-grid-2">
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={woFormData.qty}
                    onChange={e => setWoFormData({ ...woFormData, qty: e.target.value })}
                    className="wo-form-input"
                    required
                  />
                </div>
                <div>
                  <label>Client Company Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Textile Mills Ltd"
                    value={woFormData.companyName}
                    onChange={e => setWoFormData({ ...woFormData, companyName: e.target.value })}
                    className="wo-form-input"
                    required
                  />
                </div>
              </div>

              <div className="wo-form-grid-2">
                <div>
                  <label>Representative / Contact Person:</label>
                  <input
                    type="text"
                    placeholder="Engr. / Managing Director"
                    value={woFormData.clientName}
                    onChange={e => setWoFormData({ ...woFormData, clientName: e.target.value })}
                    className="wo-form-input"
                    required
                  />
                </div>
                <div>
                  <label>Mobile / WhatsApp Number:</label>
                  <input
                    type="tel"
                    placeholder="+880 17XXXXXXXX"
                    value={woFormData.phone}
                    onChange={e => setWoFormData({ ...woFormData, phone: e.target.value })}
                    className="wo-form-input"
                    required
                  />
                </div>
              </div>

              <div className="wo-form-row">
                <label>Project Delivery Site Location:</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 45, Gazipur Industrial Area, Bangladesh"
                  value={woFormData.siteLocation}
                  onChange={e => setWoFormData({ ...woFormData, siteLocation: e.target.value })}
                  className="wo-form-input"
                  required
                />
              </div>

              <div className="chatbot-wo-actions">
                <button type="submit" className="chatbot-settings-btn chatbot-settings-btn--save" style={{ flex: 1, padding: '9px 14px' }}>
                  ⚡ Confirm &amp; Issue Official Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Zoom Lightbox Overlay */}
      {zoomedImage && (
        <div className="chat-lightbox-overlay" onClick={() => setZoomedImage(null)}>
          <div className="chat-lightbox-content">
            <img src={zoomedImage} alt="Transformer Zoomed View" className="chat-lightbox-img" />
            <button type="button" className="chat-lightbox-close" onClick={() => setZoomedImage(null)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Messages Log */}
      <div className="chatbot-body" id="chatbot-messages" role="log" aria-live="polite" ref={bodyRef} onClick={handleBodyClick}>
        {messages.map((m, i) => (
          <div className={`chat-bubble chat-bubble--${m.sender}`} key={i}>
            {m.sender === 'bot' && (
              <div className="chat-bubble__avatar" title="Engr. Tanvir Ahmed (BPEL)">
                <img src="/assets/images/logo.png" alt="BPEL" />
              </div>
            )}
            <div className="chat-bubble__main">
              {m.sender === 'user' ? (
                <div className="chat-bubble__content">
                  {m.file && (
                    <div className="chat-bubble__user-file-card">
                      {m.file.isImage && m.file.previewUrl ? (
                        <div className="chat-bubble__user-img-wrap">
                          <img src={m.file.previewUrl} alt={m.file.name} className="chat-bubble__user-img" />
                        </div>
                      ) : (
                        <div className="chat-bubble__doc-pill">
                          <span className={`doc-pill__badge ${m.file.isPdf ? 'is-pdf' : 'is-doc'}`}>
                            {m.file.isPdf ? 'PDF' : 'DOC'}
                          </span>
                          <div className="doc-pill__details">
                            <span className="doc-pill__name">{m.file.name}</span>
                            <span className="doc-pill__meta">{m.file.size} • Technical Document Attached</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {m.image && !m.file && (
                    <div className="chat-bubble__user-img-wrap">
                      <img src={m.image} alt="User Uploaded Spec Sheet / Transformer" className="chat-bubble__user-img" />
                    </div>
                  )}
                  {m.text}
                </div>
              ) : (
                <div className="chat-bubble__content" dangerouslySetInnerHTML={{ __html: m.html }} />
              )}
              <div className="chat-bubble__meta">
                <span className="chat-bubble__time">{m.time}</span>
                {m.sender === 'user' && (
                  <span className="chat-bubble__status" title="Delivered">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="#0084FF" aria-hidden="true">
                      <circle cx="8" cy="8" r="7.5" fill="#0084FF" />
                      <polyline points="4.5 8.2 6.8 10.5 11.5 5.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="chat-bubble chat-bubble--bot chat-bubble--typing">
            <div className="chat-bubble__avatar">
              <img src="/assets/images/logo.png" alt="BPEL Agent" />
            </div>
            <div className="chat-typing" id="chat-typing" aria-label="AI Agent is researching specifications">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Sliding Quick Questions / Prompts Ribbon */}
      <div className="chatbot-chips-container">
        <button
          type="button"
          className="chips-nav-btn chips-nav-btn--left"
          onClick={() => scrollChips(-220)}
          aria-label="Scroll options left"
          title="Scroll left"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="chatbot-chips-bar" id="chatbot-chips" ref={chipsRef}>
          {CHIPS.map(([q, label]) => (
            <button
              type="button"
              className="chatbot-chip"
              data-query={q}
              key={q}
              onClick={() => {
                if (q === 'create-wo') {
                  setShowWoModal(true);
                } else {
                  send(label.replace(/^[^\w\s]+/, '').trim());
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="chips-nav-btn chips-nav-btn--right"
          onClick={() => scrollChips(220)}
          aria-label="Scroll options right"
          title="Scroll right"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* File & Document Preview Bar (Before Sending) */}
      {attachedFile && (
        <div className="chatbot-file-preview-bar">
          {attachedFile.isImage && attachedFile.previewUrl ? (
            <div className="file-preview-thumb img-thumb">
              <img src={attachedFile.previewUrl} alt={attachedFile.name} />
            </div>
          ) : (
            <div className={`file-preview-thumb doc-thumb ${attachedFile.isPdf ? 'is-pdf' : 'is-doc'}`}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          )}
          <div className="file-preview-info">
            <span className="file-preview-name">{attachedFile.name}</span>
            <span className="file-preview-size">{attachedFile.size} • Ready for AI technical audit</span>
          </div>
          <button type="button" className="file-preview-remove" onClick={removeAttachedFile} title="Remove attached file">
            ✕
          </button>
        </div>
      )}

      {/* Hidden File Input for all documents, PDFs and images */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {/* Footer Unified Input Shell */}
      <form
        className="chatbot-footer"
        id="chatbot-form"
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          send(text, attachedFile);
        }}
      >
        <div className="chatbot-input-shell">
          {/* Upload File Button (Paperclip Icon as requested by user) */}
          <button
            type="button"
            className={`chatbot-attach-btn${attachedFile ? ' is-active' : ''}`}
            id="chatbot-attach"
            title="Attach technical document (PDF, BOQ, spec sheet, or photo)"
            aria-label="Attach document or photo"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>

          <input
            type="text"
            id="chatbot-input"
            className="chatbot-input"
            placeholder="Type a message or attach technical doc..."
            aria-label="Type your message"
            maxLength="300"
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <button
            type="submit"
            className={`chatbot-send-btn${text.trim() || attachedFile ? ' has-content' : ''}`}
            id="chatbot-send"
            aria-label="Send message"
            title="Send message"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
