'use client';

import { useState, useRef, useEffect } from 'react';
import { DATA, mailLink } from '@/lib/data';
import { OFFICES } from '@/lib/offices';
import { useUI } from './UIProvider';

const INTENTS = [
  { id: 'rfq', label: 'Transformer Quotation (RFQ)', icon: '⚡' },
  { id: 'substation', label: 'Substation & Turnkey EPC', icon: '🏗️' },
  { id: 'fat-visit', label: 'Factory Visit / FAT Witness', icon: '🧪' },
  { id: 'support', label: 'Maintenance & Field Service', icon: '🔧' }
];

export default function ModernContactSection({ selectedOfficeId }) {
  const { service, setService, prefillContact } = useUI();
  const [intent, setIntent] = useState('rfq');
  const [targetOffice, setTargetOffice] = useState(selectedOfficeId || 'dhaka-hq');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    if (selectedOfficeId) {
      setTargetOffice(selectedOfficeId);
    }
  }, [selectedOfficeId]);

  // Support query param ?service=...
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('service');
    if (q) prefillContact(q);
  }, [prefillContact]);

  const validateField = (name, val) => {
    const v = (val || '').trim();
    if (name === 'name') return v ? '' : 'Please enter your full name.';
    if (name === 'email') {
      if (!v) return 'Please enter your corporate or personal email.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please provide a valid email format (e.g. name@company.com).';
      return '';
    }
    if (name === 'message') return v.length >= 10 ? '' : 'Please provide at least 10 characters describing your requirements.';
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = formRef.current.elements;

    const newErrors = {
      name: validateField('name', f.name.value),
      email: validateField('email', f.email.value),
      message: validateField('message', f.message.value)
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      setStatus({ ok: false, msg: 'Please review and correct the highlighted fields before submitting.' });
      const firstBad = Object.keys(newErrors).find(k => newErrors[k]);
      if (firstBad && f[firstBad]) f[firstBad].focus();
      return;
    }

    const officeObj = OFFICES.find(o => o.id === targetOffice) || OFFICES[0];
    const intentObj = INTENTS.find(i => i.id === intent) || INTENTS[0];

    const emailBody = [
      `--- BPEL ENGINEERING INQUIRY ---`,
      `Intent: ${intentObj.label}`,
      `Routing Office: ${officeObj.name} (${officeObj.city})`,
      `Full Name: ${f.name.value}`,
      `Company: ${f.company?.value || 'N/A'}`,
      `Email: ${f.email.value}`,
      `Phone: ${f.phone?.value || 'N/A'}`,
      `Equipment / Scope: ${f.service?.value || service || 'General'}`,
      `Project Site Location: ${f.location?.value || 'N/A'}`,
      `Target Timeline: ${f.timeline?.value || 'Standard'}`,
      ``,
      `Project Specifications & Technical Requirements:`,
      `${f.message.value}`
    ].join('\n');

    setStatus({
      ok: true,
      href: mailLink(emailBody, `Inquiry: ${intentObj.label} - ${f.company?.value || f.name.value}`),
      msg: 'Your inquiry specifications are prepared! Click the link below to transmit directly via your mail client, or copy the details.'
    });

    if (statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: 'smooth' });
      statusRef.current.focus();
    }
  };

  return (
    <div className="modern-contact-section">
      <div className="modern-contact-grid">
        {/* Left Column: Interactive Form */}
        <div className="modern-contact-form-pane">
          <div className="modern-form-masthead">
            <span className="modern-form-tag">DIRECT ENGINEERING RFQ</span>
            <h3 className="modern-form-title">Send Your Specifications or Request a Quotation</h3>
            <p className="modern-form-lead">
              Fill in your project parameters below. Our licensed electrical engineers review load calculations, vector groupings, and deliver itemized quotations within 2 hours.
            </p>
          </div>

          {/* Inquiry Type Intent Buttons */}
          <div className="modern-intent-selector" role="group" aria-label="Select Inquiry Type">
            <span className="modern-intent-label">Inquiry Focus:</span>
            <div className="modern-intent-pills">
              {INTENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`modern-intent-btn ${intent === item.id ? 'is-active' : ''}`}
                  onClick={() => setIntent(item.id)}
                >
                  <span className="modern-intent-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form
            id="contact-form"
            className="modern-form"
            noValidate
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {/* Preferred Facility Routing */}
            <div className="modern-form-field modern-form-field--full">
              <label htmlFor="targetOffice" className="modern-label">
                Preferred Facility / Routing Office
              </label>
              <div className="modern-select-wrap">
                <select
                  id="targetOffice"
                  name="targetOffice"
                  className="modern-input modern-select"
                  value={targetOffice}
                  onChange={(e) => setTargetOffice(e.target.value)}
                >
                  {OFFICES.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name} — {o.city} ({o.badge})
                    </option>
                  ))}
                  <option value="any">First Available Senior Engineering Group (Fastest)</option>
                </select>
                <span className="modern-select-arrow" aria-hidden="true">▼</span>
              </div>
            </div>

            {/* 2-Column Row: Name & Company */}
            <div className="modern-form-row">
              <div className="modern-form-field">
                <label htmlFor="name" className="modern-label">
                  Full Name <span className="modern-req">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Engr. Tanvir Ahmed"
                  className={`modern-input ${errors.name ? 'has-error' : ''}`}
                  onBlur={handleBlur}
                />
                {errors.name ? <span className="modern-error-msg">{errors.name}</span> : null}
              </div>

              <div className="modern-form-field">
                <label htmlFor="company" className="modern-label">
                  Company / Organization
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Apex Industrial Parks Ltd."
                  className="modern-input"
                />
              </div>
            </div>

            {/* 2-Column Row: Email & Phone */}
            <div className="modern-form-row">
              <div className="modern-form-field">
                <label htmlFor="email" className="modern-label">
                  Corporate / Contact Email <span className="modern-req">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  className={`modern-input ${errors.email ? 'has-error' : ''}`}
                  onBlur={handleBlur}
                />
                {errors.email ? <span className="modern-error-msg">{errors.email}</span> : null}
              </div>

              <div className="modern-form-field">
                <label htmlFor="phone" className="modern-label">
                  Phone / Mobile Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880 1700 000000"
                  className="modern-input"
                />
              </div>
            </div>

            {/* 2-Column Row: Equipment Selection & Project Site */}
            <div className="modern-form-row">
              <div className="modern-form-field">
                <label htmlFor="service" className="modern-label">
                  Equipment or Solution Needed
                </label>
                <div className="modern-select-wrap">
                  <select
                    id="service"
                    name="service"
                    className="modern-input modern-select"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select Equipment / Service</option>
                    {DATA.products.map(p => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                    <option value="Dry-Type Cast Resin Transformer">Dry-Type Cast Resin Transformer (Class F/H)</option>
                    <option value="Prefabricated Compact Substation">Prefabricated Compact Substation (Kiosk)</option>
                    <option value="MV Vacuum Switchgear Panels">MV Vacuum Switchgear Panels (11kV / 33kV)</option>
                    <option value="Turnkey EPC Substation Installation">Turnkey EPC Substation Installation</option>
                    <option value="Factory Acceptance Testing (FAT Witness)">Factory Acceptance Testing (FAT Witness)</option>
                    <option value="Other Custom Engineering Solution">Other Custom Engineering Solution</option>
                  </select>
                  <span className="modern-select-arrow" aria-hidden="true">▼</span>
                </div>
              </div>

              <div className="modern-form-field">
                <label htmlFor="location" className="modern-label">
                  Project Installation Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Gazipur, Chittagong, Dhaka EPZ"
                  className="modern-input"
                />
              </div>
            </div>

            {/* Project Specifications / Message */}
            <div className="modern-form-field modern-form-field--full">
              <div className="modern-label-row">
                <label htmlFor="message" className="modern-label">
                  Technical Specifications &amp; Project Requirements <span className="modern-req">*</span>
                </label>
                <span className="modern-label-hint">Capacity (kVA/MVA), Voltage (kV), Cooling, Site Specs</span>
              </div>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                placeholder="Please specify capacity (e.g. 5000 kVA), primary/secondary voltage (33/11 kV or 11/0.415 kV), vector group (Dyn11), tap changer requirements (OCTC or OLTC), or any specific drawing standards."
                className={`modern-input modern-textarea ${errors.message ? 'has-error' : ''}`}
                onBlur={handleBlur}
              />
              {errors.message ? <span className="modern-error-msg">{errors.message}</span> : null}
            </div>

            {/* Submit Bar */}
            <div className="modern-form-submit-row">
              <button type="submit" className="btn btn--primary modern-submit-btn">
                <span>Submit Technical Inquiry</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <span className="modern-submit-note">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>NDA &amp; confidentiality guaranteed for all tender specs</span>
              </span>
            </div>

            {/* Status Message Announcement Box */}
            {status ? (
              <div
                ref={statusRef}
                tabIndex="-1"
                role="status"
                className={`modern-status-alert ${status.ok ? 'is-success' : 'is-error'}`}
              >
                {status.ok ? (
                  <div className="modern-status-body">
                    <div className="modern-status-title">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <strong>Inquiry Package Ready to Transmit</strong>
                    </div>
                    <p>{status.msg}</p>
                    <div className="modern-status-actions">
                      <a href={status.href} className="btn btn--primary btn--sm">
                        <span>Open in Email App &amp; Send Now →</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="modern-status-body">
                    <div className="modern-status-title">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <strong>Please Check Your Inputs</strong>
                    </div>
                    <p>{status.msg}</p>
                  </div>
                )}
              </div>
            ) : null}
          </form>
        </div>

        {/* Right Column: Engineering FAQ & Support Guide */}
        <aside className="modern-contact-aside">
          {/* Engineering Value Proposition Card */}
          <div className="aside-card aside-card--highlight">
            <div className="aside-card__header">
              <span className="aside-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h4 className="aside-card__title">Direct Factory Consultation</h4>
            </div>
            <p className="aside-card__desc">
              You speak directly with licensed electrical power engineers—not sales agents. We provide instant thermal calculations, vector verification, and budget guidance.
            </p>
            <ul className="aside-card__list">
              <li>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Full compliance with IEC 60076 &amp; IEEE C57</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Accredited Factory Acceptance Testing (FAT)</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                <span>On-site commissioning across all 64 districts</span>
              </li>
            </ul>
          </div>

          {/* Quick Technical RFQ Checklist */}
          <div className="aside-card">
            <h4 className="aside-card__title">Tender &amp; RFQ Checklist</h4>
            <p className="aside-card__sub">Helpful parameters to include with your request:</p>
            <div className="aside-checklist">
              <div className="aside-check-item">
                <span className="aside-check-num">1</span>
                <div>
                  <strong>Rated Capacity</strong>
                  <p>e.g., 250 kVA up to 20,000 kVA</p>
                </div>
              </div>
              <div className="aside-check-item">
                <span className="aside-check-num">2</span>
                <div>
                  <strong>Primary / Secondary Voltage</strong>
                  <p>e.g., 33/11 kV, 11/0.415 kV</p>
                </div>
              </div>
              <div className="aside-check-item">
                <span className="aside-check-num">3</span>
                <div>
                  <strong>Cooling &amp; Fluid</strong>
                  <p>ONAN, ONAF, or Cast Resin Dry-Type</p>
                </div>
              </div>
              <div className="aside-check-item">
                <span className="aside-check-num">4</span>
                <div>
                  <strong>Tap Changer Type</strong>
                  <p>Off-Circuit (OCTC) or On-Load (OLTC)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Support Card */}
          <div className="aside-card aside-card--support">
            <h4 className="aside-card__title">Prefer to Discuss by Phone?</h4>
            <p className="aside-card__desc">
              Our central switchboard routes you to the relevant design or plant engineer immediately:
            </p>
            <a href="tel:+88029885601" className="aside-phone-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+880 2 988 5601 (Dhaka HQ)</span>
            </a>
            <a href="tel:+88029204110" className="aside-phone-btn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+880 2 920 4110 (Gazipur Plant)</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
