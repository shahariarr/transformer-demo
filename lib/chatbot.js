/* Chatbot knowledge base: keyword triggers -> canned HTML replies.
   Links marked data-close-chat close the chat when clicked. */
export const CHATBOT_KNOWLEDGE = [
  {
    triggers: ['transformer', 'oil', 'dry', 'capacity', 'voltage', 'kva', 'mva', 'core', 'step up', 'step down'],
    reply: `<strong>BPEL manufactures high-grade power & distribution transformers:</strong><br>
    • <strong>Oil-Immersed Transformers:</strong> 10kV to 220kV / 500kV grid rating, high thermal efficiency, automated on-load tap changer (OLTC).<br>
    • <strong>Cast Resin Dry-Type:</strong> Class F/H insulation, self-extinguishing, ideal for commercial buildings, data centers & indoor substations.<br>
    • All units conform to <strong>IEC 60076</strong> & <strong>IEEE C57</strong> standards.<br><br>
    <a href="#products" class="chat-action-link" data-close-chat>View Products Catalog →</a>`
  },
  {
    triggers: ['quote', 'price', 'cost', 'quotation', 'pricing', 'order', 'tender', 'rfq', 'inquiry'],
    reply: `<strong>Looking for a customized project quotation?</strong><br>
    Our senior engineering team prepares detailed load flow calculations, layout drawings, and transparent pricing.<br><br>
    <a href="#contact" class="chat-action-btn" data-close-chat>Open Quotation Form 📋</a>`
  },
  {
    triggers: ['substation', 'kiosk', 'package', 'switchgear', 'mv', 'vacuum', 'scada', 'breaker', 'panel'],
    reply: `<strong>BPEL Prefabricated Substations & Switchgear:</strong><br>
    • <strong>Compact Kiosk Substations:</strong> Outdoor weatherproof IP54 housing integrating MV switchgear, transformer & LV distribution.<br>
    • <strong>Vacuum Switchgear:</strong> Arc-resistant medium-voltage circuit breakers with microprocessor SCADA protection.<br><br>
    <a href="#products" class="chat-action-link" data-close-chat>Explore Substation Systems →</a>`
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
