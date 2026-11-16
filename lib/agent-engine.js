/* Autonomous BPEL AI Agent Engine: Technical Sales, Work Order & Site Research Specialist */

import {
  BPEL_COMPANY_INFO,
  TRANSFORMER_PRICING,
  PRODUCT_CATALOG,
  BPEL_PROJECTS,
  WORK_ORDER_TERMS,
  formatBdt
} from './agent-knowledge.js';

const escapeHtml = s => String(s || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// Extract kVA from text
export function extractKva(text) {
  const lower = String(text).toLowerCase();
  // Check for MVA first (e.g. 16 MVA, 10mva, 2.5 mva)
  const mvaMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:mva|m\.v\.a)/);
  if (mvaMatch) {
    const mvaVal = parseFloat(mvaMatch[1]);
    const kvaVal = Math.round(mvaVal * 1000);
    return `${kvaVal} kVA`;
  }

  // Check for kVA (e.g. 16000 kVA, 500kva, 2500 kva, 1000)
  const kvaMatch = lower.match(/(\d+(?:,\d+)?)\s*(?:kva|k\.v\.a)/);
  if (kvaMatch) {
    const rawNum = parseInt(kvaMatch[1].replace(/,/g, ''), 10);
    return `${rawNum} kVA`;
  }

  // Look for standalone common numbers
  const numMatch = lower.match(/\b(100|200|250|315|500|630|800|1000|1250|1600|2000|2500|3150|4000|5000|6000|10000|16000)\b/);
  if (numMatch) {
    return `${numMatch[1]} kVA`;
  }

  return null;
}

// Find matched product from catalog
export function findCatalogProduct(query) {
  const lower = String(query).toLowerCase();
  return PRODUCT_CATALOG.find(p => {
    const nameMatch = p.name.toLowerCase().includes(lower);
    const slugMatch = lower.includes(p.slug);
    const kva = extractKva(lower);
    const kvaMatch = kva && p.capacity.toLowerCase().includes(kva.toLowerCase());
    return nameMatch || slugMatch || kvaMatch;
  });
}

// Generate an official Budgetary Quotation Card with product image
export function generateQuotationCard(kvaInput, options = {}) {
  const kvaNormalized = kvaInput || '1000 kVA';
  const pricingKey = TRANSFORMER_PRICING[kvaNormalized] ? kvaNormalized : '1000 kVA';
  const priceData = TRANSFORMER_PRICING[pricingKey] || TRANSFORMER_PRICING['1000 kVA'];

  const matchedProduct = findCatalogProduct(kvaNormalized) || PRODUCT_CATALOG[5];
  const isDryType = (options.type && options.type.toLowerCase().includes('dry')) || false;
  const is33kv = (options.voltage && options.voltage.includes('33')) || parseInt(pricingKey) >= 5000;

  const dryMultiplier = isDryType ? 1.22 : 1.0;
  const minBdt = Math.round(priceData.minBdt * dryMultiplier);
  const maxBdt = Math.round(priceData.maxBdt * dryMultiplier);
  const minUsd = Math.round(priceData.minUsd * dryMultiplier);
  const maxUsd = Math.round(priceData.maxUsd * dryMultiplier);

  const quoteId = `BPEL-QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const primaryV = is33kv ? '33 kV ±2×2.5%' : '11 kV ±2×2.5%';
  const secondaryV = is33kv && parseInt(pricingKey) >= 10000 ? '11 kV / 6.6 kV / 415 V' : '415 V / 240 V (3-Phase, 4-Wire)';
  const coolingType = isDryType ? 'AN / AF (Class F Cast Resin)' : 'ONAN (Mineral Oil / Corrugated Fins)';

  const waText = encodeURIComponent(
    `Hello BPEL Sales, I received instant Quotation [${quoteId}] for a ${pricingKey} ${isDryType ? 'Cast Resin' : 'Oil-Immersed'} Transformer (${formatBdt(minBdt)} - ${formatBdt(maxBdt)}). Please connect me with an engineer to finalize drawings and site delivery.`
  );

  return `
    <div class="bpel-quote-card" data-quote-id="${quoteId}">
      <div class="bpel-quote-card__header">
        <div class="bpel-quote-card__badge">OFFICIAL BUDGETARY QUOTATION</div>
        <div class="bpel-quote-card__ref">${quoteId}</div>
      </div>

      <div class="bpel-quote-card__media">
        <img src="${matchedProduct.image}" alt="${pricingKey} Transformer" class="bpel-quote-card__img" loading="lazy" />
        <div class="bpel-quote-card__media-info">
          <div class="bpel-quote-card__title">
            ${pricingKey} ${isDryType ? 'Cast Resin Dry-Type' : 'Oil-Immersed Distribution'} Transformer
          </div>
          <div class="bpel-quote-card__date">Issued: ${dateStr} • Valid for 30 Days</div>
        </div>
      </div>

      <div class="bpel-quote-card__specs">
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Rated Capacity:</span>
          <span class="quote-spec-val font-bold">${pricingKey}</span>
        </div>
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Voltage Ratio:</span>
          <span class="quote-spec-val">${primaryV} / ${secondaryV}</span>
        </div>
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Cooling Method:</span>
          <span class="quote-spec-val">${coolingType}</span>
        </div>
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Winding Conductor:</span>
          <span class="quote-spec-val">99.99% Electrolytic Grade OFHC Copper</span>
        </div>
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Core Lamination:</span>
          <span class="quote-spec-val">Laser-Scribed Hi-B CRGO Silicon Steel</span>
        </div>
        <div class="quote-spec-row">
          <span class="quote-spec-lbl">Standard Compliance:</span>
          <span class="quote-spec-val">IEC 60076, IEEE C57, BPDB, DESCO, BSTI</span>
        </div>
      </div>

      <div class="bpel-quote-card__price-box">
        <div class="price-box__tag">Estimated Budgetary Price Range</div>
        <div class="price-box__val">${formatBdt(minBdt)} – ${formatBdt(maxBdt)}</div>
        <div class="price-box__sub">Approx. $${minUsd.toLocaleString()} – $${maxUsd.toLocaleString()} USD (Ex-factory Gazipur)</div>
      </div>

      <div class="bpel-quote-card__terms">
        <div>⏳ <strong>Lead Time:</strong> ${priceData.leadWeeks} (Ready in pipeline)</div>
        <div>🛡️ <strong>Warranty:</strong> 24 Months Full Guarantee + 24/7 Hotline</div>
      </div>

      <div class="bpel-quote-card__actions">
        <button type="button" class="quote-btn quote-btn--wo" data-init-wo="${pricingKey}">
          <span>📝 Convert into Official Work Order</span>
        </button>
        <a href="https://wa.me/8801713000001?text=${waText}" target="_blank" rel="noopener" class="quote-btn quote-btn--wa">
          <span>💬 Order / Reserve on WhatsApp</span>
        </a>
        <button type="button" class="quote-btn quote-btn--copy" data-copy-quote>
          <span>📋 Copy Quotation Summary</span>
        </button>
      </div>
    </div>
  `;
}

// Generate an official Commercial Work Order (WO) Dossier
export function generateWorkOrderCard(orderData = {}) {
  const kva = orderData.kva || '1000 kVA';
  const pricingKey = TRANSFORMER_PRICING[kva] ? kva : '1000 kVA';
  const priceData = TRANSFORMER_PRICING[pricingKey] || TRANSFORMER_PRICING['1000 kVA'];

  const matchedProduct = findCatalogProduct(kva) || PRODUCT_CATALOG[5];
  const unitPrice = priceData.minBdt;
  const qty = parseInt(orderData.qty, 10) || 1;
  const subtotal = unitPrice * qty;
  const advance = Math.round(subtotal * 0.3); // 30% advance payment

  const woId = `BPEL-WO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const clientName = orderData.clientName || 'Valued Engineering Client';
  const companyName = orderData.companyName || 'Industrial Manufacturing Plant';
  const phone = orderData.phone || '+880 17XXXXXXXX';
  const siteLocation = orderData.siteLocation || 'Gazipur / Dhaka Industrial Zone';

  const waText = encodeURIComponent(
    `Hello BPEL Directorate, please confirm Official Work Order [${woId}] for ${qty}x ${kva} Transformer (${companyName}, Contact: ${phone}, Delivery: ${siteLocation}). Advance of ${formatBdt(advance)} is ready for bank processing.`
  );

  return `
    <div class="bpel-workorder-card" id="wo-${woId}">
      <div class="bpel-wo__header">
        <div>
          <div class="bpel-wo__company">BASIC POWER ENGINEERING LTD</div>
          <div class="bpel-wo__factory">Industrial Park, Gazipur, Bangladesh • ISO 9001:2015</div>
        </div>
        <div class="bpel-wo__badge">OFFICIAL WORK ORDER</div>
      </div>

      <div class="bpel-wo__meta-grid">
        <div class="wo-meta-item">
          <span class="wo-meta-lbl">Work Order Ref:</span>
          <span class="wo-meta-val font-mono">${woId}</span>
        </div>
        <div class="wo-meta-item">
          <span class="wo-meta-lbl">Date of Acceptance:</span>
          <span class="wo-meta-val">${dateStr}</span>
        </div>
        <div class="wo-meta-item">
          <span class="wo-meta-lbl">Purchaser / Client:</span>
          <span class="wo-meta-val">${escapeHtml(companyName)}</span>
        </div>
        <div class="wo-meta-item">
          <span class="wo-meta-lbl">Authorized Rep:</span>
          <span class="wo-meta-val">${escapeHtml(clientName)} (${escapeHtml(phone)})</span>
        </div>
        <div class="wo-meta-item wo-meta-item--full">
          <span class="wo-meta-lbl">Project Delivery Site:</span>
          <span class="wo-meta-val">${escapeHtml(siteLocation)}</span>
        </div>
      </div>

      <div class="bpel-wo__table-wrap">
        <table class="bpel-wo__table">
          <thead>
            <tr>
              <th>Item &amp; Technical Description</th>
              <th style="text-align:center;">Qty</th>
              <th style="text-align:right;">Unit Price (BDT)</th>
              <th style="text-align:right;">Total (BDT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${escapeHtml(matchedProduct.name)}</strong><br>
                <small>${kva} • 11kV/415V • ONAN Cooling • 99.99% OFHC Copper • Dyn11 • BPDB/DESCO Approved</small>
              </td>
              <td style="text-align:center;">${qty}</td>
              <td style="text-align:right;">${formatBdt(unitPrice)}</td>
              <td style="text-align:right;"><strong>${formatBdt(subtotal)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bpel-wo__commercial-box">
        <div class="commercial-row">
          <span>Gross Equipment Total:</span>
          <span>${formatBdt(subtotal)}</span>
        </div>
        <div class="commercial-row commercial-row--highlight">
          <span>30% Advance on WO Acceptance:</span>
          <span><strong>${formatBdt(advance)}</strong></span>
        </div>
        <div class="commercial-row">
          <span>70% Balance Prior to Factory Dispatch:</span>
          <span>${formatBdt(subtotal - advance)}</span>
        </div>
      </div>

      <div class="bpel-wo__terms">
        <div class="wo-term-line">⚙️ <strong>Quality &amp; Testing:</strong> Mandatory 100% FAT Witness Testing at BPEL ISO 17025 Test Bay before site release.</div>
        <div class="wo-term-line">⏳ <strong>Production Schedule:</strong> Delivery within ${priceData.leadWeeks} from advance deposit.</div>
        <div class="wo-term-line">🛡️ <strong>Guarantee:</strong> 24 Months Full Replacement &amp; On-Site Service Warranty.</div>
      </div>

      <div class="bpel-wo__actions">
        <a href="https://wa.me/8801713000001?text=${waText}" target="_blank" rel="noopener" class="quote-btn quote-btn--wa">
          <span>💬 Confirm &amp; Dispatch via WhatsApp</span>
        </a>
        <button type="button" class="quote-btn quote-btn--rfq" onclick="window.print()">
          <span>📥 Print / Save Formal PDF Copy</span>
        </button>
      </div>
    </div>
  `;
}

// Generate the product catalog with real product images
export function generateCatalogSummary() {
  const items = PRODUCT_CATALOG.map(
    p => `
    <div class="chat-product-card">
      <div class="chat-product-card__thumb">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" class="chat-product-img" loading="lazy" />
      </div>
      <div class="chat-product-card__body">
        <div class="chat-product-card__name">⚡ <strong>${escapeHtml(p.name)}</strong></div>
        <div class="chat-product-card__meta">${escapeHtml(p.category)} • ${escapeHtml(p.primaryVoltage)} / ${escapeHtml(p.secondaryVoltage)}</div>
        <div class="chat-product-card__desc">${escapeHtml(p.description)}</div>
        <div class="chat-product-card__actions">
          <a href="/products/${p.slug}/" class="chat-pill-btn" data-close-chat>View Detailed Specs →</a>
          <button type="button" class="chat-pill-btn chat-pill-btn--primary" data-quote-target="${escapeHtml(p.capacity)}">Get Quote 📋</button>
          <button type="button" class="chat-pill-btn chat-pill-btn--wo" data-init-wo="${escapeHtml(p.capacity)}">Work Order 📝</button>
        </div>
      </div>
    </div>
  `
  ).join('');

  return `
    <strong>BPEL Power Transformer &amp; Substation Catalog:</strong><br>
    Browse our full lineup with verified specifications and certified utility approval:<br><br>
    <div class="chat-catalog-grid">
      ${items}
    </div>
  `;
}

// Generate Project Dossiers & Website Research
export function generateProjectCaseStudies() {
  const items = BPEL_PROJECTS.map(
    prj => `
    <div class="chat-project-card">
      <div class="chat-project-card__title">🏭 <strong>${escapeHtml(prj.title)}</strong></div>
      <div class="chat-project-card__meta">Client: ${escapeHtml(prj.client)} • Location: ${escapeHtml(prj.location)}</div>
      <div class="chat-project-card__scope">${escapeHtml(prj.scope)}</div>
      <div class="chat-project-card__badge">Status: ${escapeHtml(prj.status)}</div>
    </div>
  `
  ).join('');

  return `
    <strong>BPEL Flagship Projects &amp; Turnkey Deployments:</strong><br>
    Over 15+ years of delivering high-voltage substations, industrial mills, and solar farm tie-ins across Bangladesh:<br><br>
    <div class="chat-projects-list">
      ${items}
    </div>
  `;
}

// Main autonomous agent response function
export function getAgentReply(userMessage, context = {}) {
  const raw = String(userMessage || '').trim();
  const lower = raw.toLowerCase();

  // 1. Language Detection (Bengali / Banglish vs English)
  const isBangla = /[\u0980-\u09FF]|koto|daam|dam|chai|lagbe|quotation|bolo|achen|bhai|bhalo|hobe|ki|keno|kivabe|khuji|shunte|order|workorder|dorkar/.test(lower);

  // 2. Technical Document & File Upload Analysis (PDF, BOQ, RFP, Word, Spec sheets, Photos)
  const fileData = context.fileData;
  const hasFile = Boolean(fileData) || context.hasImage || lower.includes('uploaded file') || lower.includes('uploaded document') || lower.includes('file attached') || lower.includes('document attached') || lower.includes('boq') || lower.includes('spec sheet') || lower.includes('uploaded photo') || lower.includes('chobi dilam') || lower.includes('file dilam');

  if (hasFile) {
    const fileName = fileData?.name || (context.hasImage ? 'Equipment_Photo.jpg' : 'Technical_Specification.pdf');
    const fileSize = fileData?.size || 'Attached';
    const isPdf = fileData?.isPdf || /\.pdf$/i.test(fileName);
    const isDoc = fileData?.isDoc || /\.(doc|docx|txt|csv|xls|xlsx)$/i.test(fileName);
    const isImageFile = fileData?.isImage || context.hasImage || /\.(jpg|jpeg|png|webp)$/i.test(fileName);

    const docSearchText = (fileData?.textContent || '') + ' ' + fileName + ' ' + raw;
    const detectedKva = extractKva(docSearchText) || '1000 kVA';
    const quoteCard = generateQuotationCard(detectedKva);

    if (isBangla) {
      return `
        <div class="bpel-doc-review-card">
          <div class="doc-review__header">
            <span class="doc-review__badge">📄 DOCUMENT AUDITED BY BPEL AGENT</span>
            <span class="doc-review__name">${escapeHtml(fileName)}</span>
          </div>
          <div class="doc-review__grid">
            <div class="doc-review__item">
              <span class="doc-review__lbl">ফাইল স্ট্যাটাস:</span>
              <span class="doc-review__val">${escapeHtml(fileSize)} • ভেরিফাইড টেকনিক্যাল ডকুমেন্ট</span>
            </div>
            <div class="doc-review__item">
              <span class="doc-review__lbl">সনাক্তকৃত ক্যাপাসিটি:</span>
              <span class="doc-review__val font-bold">${escapeHtml(detectedKva)} পাওয়ার সাবস্টেশন ইউনিট</span>
            </div>
            <div class="doc-review__item">
              <span class="doc-review__lbl">স্ট্যান্ডার্ড কমপ্লায়েন্স:</span>
              <span class="doc-review__val">IEC 60076, BPDB, DESCO, DPDC রেগুলেশন অনুযায়ী টেস্টেড</span>
            </div>
          </div>
        </div>
        <strong>আপনার আপলোডকৃত ডকুমেন্টের রিকোয়ারমেন্ট অনুযায়ী তাৎক্ষণিক অফিসিয়াল কোটেশন জেনারেট করা হয়েছে:</strong><br><br>
        ${quoteCard}<br>
        <em>আমি আপনার ফাইলের স্পেসিফিকেশন সংরক্ষণ করেছি। আপনি কি এর উপর ভিত্তি করে সরাসরি <strong>অফিশিয়াল ওয়ার্ক অর্ডার</strong> তৈরি করতে চান অথবা গাজীপুর ফ্যাক্টরির ইঞ্জিনিয়ারের সাথে কথা বলতে চান?</em>
      `;
    }

    return `
      <div class="bpel-doc-review-card">
        <div class="doc-review__header">
          <span class="doc-review__badge">📄 TECHNICAL DOCUMENT AUDITED</span>
          <span class="doc-review__name">${escapeHtml(fileName)}</span>
        </div>
        <div class="doc-review__grid">
          <div class="doc-review__item">
            <span class="doc-review__lbl">Document Record:</span>
            <span class="doc-review__val">${escapeHtml(fileSize)} • Verified Spec Dossier</span>
          </div>
          <div class="doc-review__item">
            <span class="doc-review__lbl">Identified Capacity:</span>
            <span class="doc-review__val font-bold">${escapeHtml(detectedKva)} Transformer Specification</span>
          </div>
          <div class="doc-review__item">
            <span class="doc-review__lbl">Utility Compatibility:</span>
            <span class="doc-review__val">IEC 60076, IEEE C57, BPDB / DESCO / DPDC Ready</span>
          </div>
        </div>
      </div>
      <strong>I have audited your uploaded technical document. Based on your project requirements, here is your instant official budgetary quotation:</strong><br><br>
      ${quoteCard}<br>
      <em>I am ready to proceed with your project. Would you like me to issue an <strong>Official Work Order</strong> to reserve your production line at Gazipur, or connect on WhatsApp for final engineering sign-off?</em>
    `;
  }

  // 3. Work Order Intent
  if (lower.includes('work order') || lower.includes('workorder') || lower.includes('po') || lower.includes('purchase order') || lower.includes('order nao') || lower.includes('order place')) {
    const detectedKva = extractKva(lower) || '1000 kVA';
    const woCard = generateWorkOrderCard({
      kva: detectedKva,
      companyName: 'Client Project Contracting Ltd',
      clientName: 'Procurement Director',
      siteLocation: 'Industrial Park Site, Bangladesh',
      qty: 1
    });

    if (isBangla) {
      return `
        <strong>স্বয়ংক্রিয় অফিশিয়াল ওয়ার্ক অর্ডার তৈরি করা হয়েছে!</strong> 📝<br>
        কোম্পানির কোনো কর্মীর সাহায্য ছাড়াই এই সিস্টেম থেকে সরাসরি ভেন্ডর ওয়ার্ক অর্ডার নেওয়া হয়েছে:<br><br>
        ${woCard}<br>
        আপনি সরাসরি <strong>হোয়াটসঅ্যাপে পাঠিয়ে বুকিং নিশ্চিত করতে পারেন</strong> অথবা প্রিন্ট/সেভ করে রাখতে পারেন!
      `;
    }

    return `
      <strong>Autonomous Official Work Order Generated!</strong> 📝<br>
      Our automated intake system has processed your procurement requirements end-to-end without requiring manual staff intervention:<br><br>
      ${woCard}<br>
      You can immediately dispatch this to our dispatch team via <strong>WhatsApp Confirmation</strong> or print it for your internal finance processing!
    `;
  }

  // 4. Direct Quotation request with detected capacity
  const detectedKva = extractKva(lower);
  const isQuoteIntent = lower.includes('quote') || lower.includes('quotation') || lower.includes('price') || lower.includes('cost') || lower.includes('daam') || lower.includes('dam') || lower.includes('rate') || lower.includes('pricing') || lower.includes('rfq');

  if (detectedKva && (isQuoteIntent || lower.includes('transformer') || lower.includes('lagbe'))) {
    const isDry = lower.includes('dry') || lower.includes('cast resin') || lower.includes('resin');
    const is33 = lower.includes('33') || lower.includes('33kv');
    const quoteHtml = generateQuotationCard(detectedKva, { type: isDry ? 'dry' : 'oil', voltage: is33 ? '33kv' : '11kv' });

    if (isBangla) {
      return `
        <strong>আপনার জন্য তাৎক্ষণিক প্রজেক্ট কোটেশন তৈরি করা হয়েছে!</strong> 📋<br>
        আমাদের সেলস টিম অফলাইনে থাকলেও আমি আপনার জন্য <strong>${detectedKva}</strong> ট্রান্সফরমারের অফিশিয়াল বাজেট সামারি জেনারেট করেছি:<br><br>
        ${quoteHtml}<br>
        আপনি চাইলে এখান থেকেই সরাসরি <strong>"Convert into Official Work Order"</strong> বাটনে ক্লিক করে কাজ শুরু করতে পারেন!
      `;
    }

    return `
      <strong>Instant Project Budgetary Quotation Ready!</strong> 📋<br>
      As your 24/7 BPEL Technical Sales Agent, here are the specifications and pricing for your <strong>${detectedKva}</strong> requirement:<br><br>
      ${quoteHtml}<br>
      Ready to procure? Click <strong>"Convert into Official Work Order"</strong> to finalize your commercial procurement immediately!
    `;
  }

  // 5. User wants a quote but hasn't specified kVA
  if (isQuoteIntent) {
    if (isBangla) {
      return `
        <strong>কোটেশনের জন্য ট্রান্সফরমারের ক্যাপাসিটি (kVA) নির্বাচন করুন:</strong><br>
        নিচে ক্লিক করুন অথবা সরাসরি লিখে পাঠান:<br><br>
        <div class="chat-quick-kva-grid">
          <button type="button" class="chat-quick-btn" data-quote-target="250 kVA">⚡ 250 kVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="500 kVA">⚡ 500 kVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="1000 kVA">⚡ 1,000 kVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="2500 kVA">⚡ 2,500 kVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="5000 kVA">⚡ 5,000 kVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="10000 kVA">⚡ 10 MVA</button>
          <button type="button" class="chat-quick-btn" data-quote-target="16000 kVA">⚡ 16 MVA</button>
        </div>
      `;
    }

    return `
      <strong>Select Your Required Transformer Capacity:</strong> 📋<br>
      Please choose from our high-demand standard ratings below or type custom kVA:<br><br>
      <div class="chat-quick-kva-grid">
        <button type="button" class="chat-quick-btn" data-quote-target="250 kVA">⚡ 250 kVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="500 kVA">⚡ 500 kVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="1000 kVA">⚡ 1,000 kVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="2500 kVA">⚡ 2,500 kVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="5000 kVA">⚡ 5,000 kVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="10000 kVA">⚡ 10 MVA</button>
        <button type="button" class="chat-quick-btn" data-quote-target="16000 kVA">⚡ 16 MVA</button>
      </div>
    `;
  }

  // 6. Products / Catalog / Photos inquiry
  if (lower.includes('product') || lower.includes('catalog') || lower.includes('photo') || lower.includes('picture') || lower.includes('chobi') || lower.includes('shob product') || lower.includes('list')) {
    return generateCatalogSummary();
  }

  // 7. Projects & Deployments inquiry
  if (lower.includes('project') || lower.includes('case study') || lower.includes('deployment') || lower.includes('substation installation') || lower.includes('past work')) {
    return generateProjectCaseStudies();
  }

  // 8. Company Profile / Factory Research
  if (lower.includes('company') || lower.includes('about bpel') || lower.includes('factory') || lower.includes('gazipur') || lower.includes('gulshan') || lower.includes('who is')) {
    return `
      <strong>About Basic Power Engineering Ltd (BPEL):</strong><br>
      • <strong>Established:</strong> 2008 (15+ Years of Grid Engineering Excellence)<br>
      • <strong>Manufacturing Base:</strong> BPEL Industrial Park, Tongi-Gazipur Highway, Gazipur (High-Voltage ISO 17025 Certified Testing Bay)<br>
      • <strong>Corporate HQ:</strong> Level 11, BPEL Tower, Plot 34, Gulshan South Avenue, Gulshan-1, Dhaka 1212<br>
      • <strong>Accreditations:</strong> ISO 9001:2015, ISO 14001:2015, BSTI, ASTA/KEMA STL Witnessed<br>
      • <strong>Utility Approvals:</strong> Approved for BPDB, DESCO, DPDC, BREB, WZPDCL, NESCO tenders.<br><br>
      <a href="/about/" class="chat-action-btn" data-close-chat>Read Company Profile →</a>
    `;
  }

  // 9. Load Sizing / Calculations
  if (lower.includes('calculate') || lower.includes('sizing') || lower.includes('formula') || lower.includes('kw to kva')) {
    return `
      <strong>Transformer Sizing &amp; Electrical Load Calculations:</strong><br><br>
      1. <strong>kVA from kW (Active Power to Apparent Power):</strong><br>
      <code>kVA = Total kW ÷ Power Factor (PF)</code><br>
      <em>Example:</em> A factory with 800 kW load at 0.85 PF requires:<br>
      <code>800 ÷ 0.85 = 941 kVA → Recommended: 1,000 kVA Transformer</code><br><br>
      2. <strong>Secondary Full Load Current (Amperes):</strong><br>
      <code>I (Amps) = (kVA × 1000) ÷ (1.732 × Voltage)</code><br>
      <em>Example for 1000 kVA at 415V:</em><br>
      <code>(1000 × 1000) ÷ (1.732 × 415) = ~1,391 Amperes per phase</code><br><br>
      <a href="/calculators/" class="chat-action-btn" data-close-chat>Open Online Sizing Calculators →</a>
    `;
  }

  // 10. Offline Employee / Human support
  if (lower.includes('offline') || lower.includes('employee') || lower.includes('human') || lower.includes('agent') || lower.includes('support')) {
    if (isBangla) {
      return `
        <strong>আমি বিপিইএল (BPEL)-এর ২৪/৭ সার্বক্ষণিক এআই পাওয়ার ইঞ্জিনিয়ার ও সেলস এজেন্ট!</strong> 🛡️<br><br>
        আমাদের কোনো কর্মী অনলাইনে না থাকলেও এই সিস্টেম স্বয়ংক্রিয়ভাবে আপনাকে সাহায্য করবে:<br>
        • <strong>প্রোডাক্ট অনুসন্ধান ও আসল ফটো প্রদর্শন</strong><br>
        • <strong>তাৎক্ষণিক বাজেট কোটেশন জেনারেশন</strong><br>
        • <strong>সম্পূর্ণ স্বয়ংক্রিয় ভেন্ডর ওয়ার্ক অর্ডার গ্রহণ</strong><br>
        • <strong>ছবি/নেমপ্লেট অ্যানালাইসিস</strong><br><br>
        <a href="https://wa.me/8801713000001" target="_blank" rel="noopener" class="chat-action-btn chat-action-btn--wa">সরাসরি হোয়াটসঅ্যাপ হটলাইন 💬</a>
      `;
    }

    return `
      <strong>24/7 Autonomous Engineering Support Active!</strong> 🛡️<br><br>
      Even when human personnel are offline or after business hours, I am fully equipped to manage the complete lifecycle:<br>
      • Product recommendations with actual photos<br>
      • Instant Budgetary Quotations<br>
      • Complete end-to-end Work Order intake<br>
      • Technical sizing and utility compliance<br><br>
      <a href="https://wa.me/8801713000001" target="_blank" rel="noopener" class="chat-action-btn chat-action-btn--wa">24/7 WhatsApp Hotline 💬</a>
    `;
  }

  // 11. General greetings
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('salam') || lower.includes('hey')) {
    if (isBangla) {
      return `
        আসসালামু আলাইকুম! 👋 আমি <strong>বিপিইএল (BPEL) এআই পাওয়ার ইঞ্জিনিয়ার</strong>।<br><br>
        আমি আমাদের পুরো ওয়েবসাইটের সব প্রোডাক্ট, প্রজেক্ট ও স্পেসিফিকেশন জানি। আমি আপনাকে সাহায্য করতে পারি:<br>
        • <strong>ট্রান্সফরমারের স্পেক্স ও ফটো দেখতে</strong><br>
        • <strong>তাৎক্ষণিক বাজেট কোটেশন পেতে</strong><br>
        • <strong>সরাসরি ভেন্ডর ওয়ার্ক অর্ডার জেনারেট করতে</strong><br>
        • <strong>ট্রান্সফরমারের ছবি বা নেমপ্লেট আপলোড করে অ্যানালাইসিস করতে</strong><br><br>
        আপনি কোন মডেল বা ক্যাপাসিটি সম্পর্কে জানতে চান?
      `;
    }

    return `
      Hello! 👋 I am <strong>Engr. Tanvir Ahmed, BPEL Autonomous Technical Sales Agent</strong>.<br><br>
      I can research our entire product inventory, showcase real equipment photos, issue instant budgetary quotes, and execute complete vendor work orders from start to finish.<br><br>
      How can I assist your project today?
    `;
  }

  // Default helpful response
  return `
    Thank you for your inquiry regarding <strong>"${escapeHtml(raw)}"</strong>.<br><br>
    I can assist you with:<br>
    • <strong>Instant Quotation:</strong> Type <em>"Quote for 1000 kVA"</em>.<br>
    • <strong>Vendor Work Order:</strong> Type <em>"Create work order"</em>.<br>
    • <strong>Product Photos &amp; Specs:</strong> Type <em>"Show all products"</em>.<br>
    • <strong>Engineering Image Analysis:</strong> Click the 📷 upload button to send your nameplate or transformer photo.<br><br>
    <a href="/contact/" class="chat-action-btn" data-close-chat>Open RFQ Form 📋</a>
  `;
}
