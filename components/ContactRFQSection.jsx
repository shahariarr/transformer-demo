'use client';

import { useEffect, useRef, useState } from 'react';
import { DATA, waLink, mailLink } from '@/lib/data';
import { OFFICES } from '@/lib/offices';
import { useUI } from './UIProvider';
import SectionHead from './SectionHead';

const Req = () => <span className="req" aria-hidden="true">*</span>;

const RULES = {
  name: v => (v.trim() ? '' : 'Enter your full name.'),
  email: v => (!v.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'),
  service: v => (v ? '' : 'Choose a product or service.'),
  message: v => (v.trim() ? '' : 'Describe your project requirements.')
};

export default function ContactRFQSection({ preselectedOfficeId }) {
  const c = DATA.contact;
  const { service, setService, prefillContact } = useUI();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  // Pre-select service from URL query params ?service=...
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search).get('service');
      if (q) prefillContact(q);
    }
  }, [prefillContact]);

  // If preselectedOfficeId changes, prefill location input
  useEffect(() => {
    if (preselectedOfficeId && formRef.current) {
      const office = OFFICES.find(o => o.id === preselectedOfficeId);
      if (office && formRef.current.elements['location']) {
        formRef.current.elements['location'].value = `${office.city} Facility, Bangladesh`;
      }
    }
  }, [preselectedOfficeId]);

  const check = k => {
    if (!formRef.current || !formRef.current.elements[k]) return true;
    const msg = RULES[k] ? RULES[k](formRef.current.elements[k].value) : '';
    setErrors(e => ({ ...e, [k]: msg }));
    return !msg;
  };

  const invalid = k => (k in errors ? { 'aria-invalid': errors[k] ? 'true' : 'false' } : {});

  const copyText = (type, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const bad = Object.keys(RULES).filter(k => !check(k));
    if (bad.length) {
      setStatus({ ok: false });
      if (formRef.current.elements[bad[0]]) {
        formRef.current.elements[bad[0]].focus();
      }
      return;
    }

    const f = formRef.current.elements;
    let body = `Name: ${f.name?.value || ''}\n`;
    body += `Company: ${f.company?.value || 'N/A'}\n`;
    body += `Email: ${f.email?.value || ''}\n`;
    body += `Phone: ${f.phone?.value || 'N/A'}\n`;
    body += `Product / Service: ${f.service?.value || ''}\n`;
    body += `Location: ${f.location?.value || 'Bangladesh'}\n\n`;

    if (showTechSpecs) {
      body += `--- TECHNICAL SPECIFICATIONS ---\n`;
      body += `Capacity: ${f.kva?.value || 'Not specified'}\n`;
      body += `Primary HV: ${f.primary_v?.value || 'Not specified'}\n`;
      body += `Secondary LV: ${f.secondary_v?.value || 'Not specified'}\n`;
      body += `Cooling: ${f.cooling?.value || 'Not specified'}\n`;
      body += `Tap Changer: ${f.tap_changer?.value || 'Not specified'}\n`;
      body += `Target Timeline: ${f.timeline?.value || 'Not specified'}\n\n`;
    }

    body += `Project Requirements / Message:\n${f.message?.value || ''}`;

    setStatus({ ok: true, href: mailLink(body) });
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  return (
    <div className="wrap">
      <SectionHead
        label="REQUEST FOR QUOTE"
        title="Tell Us About Your Project."
        desc="Complete the form below and our power engineering team will evaluate your specifications and respond with preliminary technical data sheets within 24 hours."
      />

      <div className="contact-rfq-layout">
        {/* Left Side (2/3): RFQ Technical Inquiry Form */}
        <div className="contact-rfq-form-card fade-in-up">
          <form
            id="contact-form"
            className="contact-rfq-form"
            noValidate
            ref={formRef}
            onSubmit={onSubmit}
          >
            {/* Honeypot spam guard */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="rfq-website">Website (leave blank)</label>
              <input id="rfq-website" type="text" name="website" tabIndex="-1" autoComplete="off" defaultValue="" />
            </div>

            <div className="rfq-form-row">
              <div className="field">
                <label htmlFor="name">
                  Full Name <Req />
                </label>
                <div className="rfq-input-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    autoComplete="name"
                    placeholder="Engr. M. Rahman"
                    aria-describedby="name-err"
                    {...invalid('name')}
                    onBlur={() => check('name')}
                  />
                </div>
                <p className="err" id="name-err">{errors.name || ''}</p>
              </div>

              <div className="field">
                <label htmlFor="company">Company / Organization</label>
                <div className="rfq-input-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                    <path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
                  </svg>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="e.g. Apex Spinning / Power EPC Ltd."
                  />
                </div>
              </div>
            </div>

            <div className="rfq-form-row">
              <div className="field">
                <label htmlFor="email">
                  Business Email <Req />
                </label>
                <div className="rfq-input-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    autoComplete="email"
                    placeholder="name@company.com"
                    aria-describedby="email-err"
                    {...invalid('email')}
                    onBlur={() => check('email')}
                  />
                </div>
                <p className="err" id="email-err">{errors.email || ''}</p>
              </div>

              <div className="field">
                <label htmlFor="phone">Phone / Mobile Number</label>
                <div className="rfq-input-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+880 1700 000000"
                  />
                </div>
              </div>
            </div>

            <div className="rfq-form-row">
              <div className="field">
                <label htmlFor="service">
                  Product or Service Line <Req />
                </label>
                <div className="rfq-input-wrap">
                  <select
                    id="service"
                    name="service"
                    required
                    aria-required="true"
                    aria-describedby="service-err"
                    value={service}
                    onChange={e => setService(e.target.value)}
                    onBlur={() => check('service')}
                    {...invalid('service')}
                  >
                    <option value="">Select Equipment or Service</option>
                    {DATA.products.map(p => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Package & Containerized Substations">Package &amp; Containerized Substations</option>
                    <option value="Medium & Low Voltage Switchgear">Medium &amp; Low Voltage Switchgear</option>
                    <option value="Turnkey Substation EPC & Installation">Turnkey Substation EPC &amp; Installation</option>
                    <option value="Laboratory FAT Witness & Testing">Laboratory FAT Witness &amp; Testing</option>
                    <option value="Custom Engineering & Sizing Consultation">Custom Engineering &amp; Sizing Consultation</option>
                    <option value="Emergency Maintenance & Field Service">Emergency Maintenance &amp; Field Service</option>
                  </select>
                </div>
                <p className="err" id="service-err">{errors.service || ''}</p>
              </div>

              <div className="field">
                <label htmlFor="location">Project Location</label>
                <div className="rfq-input-wrap">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rfq-input-icon" aria-hidden="true">
                    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g. Gazipur Industrial Zone, Chattogram EPZ"
                  />
                </div>
              </div>
            </div>

            <div className="field">
              <label htmlFor="message">
                Project Scope &amp; Requirements <Req />
              </label>
              <div className="rfq-input-wrap rfq-textarea-wrap">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  aria-required="true"
                  placeholder="Outline your transformer capacity, primary/secondary voltages, ambient temperature constraints, tender timeline, or special standards (IEC / ANSI / IEEE / REB)..."
                  aria-describedby="message-err"
                  {...invalid('message')}
                  onBlur={() => check('message')}
                />
              </div>
              <p className="err" id="message-err">{errors.message || ''}</p>
            </div>

            {/* Expandable Technical Specifications Drawer */}
            <div className="rfq-tech-accordion">
              <button
                type="button"
                className="rfq-tech-toggle"
                onClick={() => setShowTechSpecs(!showTechSpecs)}
                aria-expanded={showTechSpecs}
              >
                <span className="rfq-tech-toggle__left">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  <span>Add Technical Specifications (Optional)</span>
                </span>
                <span className={`rfq-tech-chevron ${showTechSpecs ? 'is-open' : ''}`} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {showTechSpecs && (
                <div className="rfq-tech-drawer">
                  <p className="rfq-tech-drawer__hint">
                    Adding engineering parameters helps our technical team calculate magnetic loss, impedance, and preliminary sizing right away.
                  </p>
                  <div className="rfq-tech-grid">
                    <div className="field">
                      <label htmlFor="kva">Power Rating (kVA / MVA)</label>
                      <select id="kva" name="kva">
                        <option value="">Select kVA Rating</option>
                        <option value="500 kVA">500 kVA</option>
                        <option value="1000 kVA">1,000 kVA</option>
                        <option value="2500 kVA">2,500 kVA</option>
                        <option value="4000 kVA">4,000 kVA</option>
                        <option value="5000 kVA">5,000 kVA</option>
                        <option value="10000 kVA">10,000 kVA</option>
                        <option value="16000 kVA">16,000 kVA</option>
                        <option value="Custom / Non-standard">Custom / Non-standard</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="primary_v">Primary Voltage (HV)</label>
                      <select id="primary_v" name="primary_v">
                        <option value="">Select Primary Voltage</option>
                        <option value="11 kV">11 kV</option>
                        <option value="33 kV">33 kV</option>
                        <option value="35 kV">35 kV</option>
                        <option value="Dual HV 11/33 kV">Dual HV 11 / 33 kV</option>
                        <option value="Custom HV">Custom HV</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="secondary_v">Secondary Voltage (LV)</label>
                      <select id="secondary_v" name="secondary_v">
                        <option value="">Select Secondary Voltage</option>
                        <option value="0.415 kV (415 V)">0.415 kV (415 V)</option>
                        <option value="0.400 kV (400 V)">0.400 kV (400 V)</option>
                        <option value="6.6 kV">6.6 kV</option>
                        <option value="11 kV">11 kV</option>
                        <option value="Custom LV">Custom LV</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="cooling">Cooling Method</label>
                      <select id="cooling" name="cooling">
                        <option value="">Select Cooling</option>
                        <option value="ONAN (Oil Natural Air Natural)">ONAN (Standard Natural)</option>
                        <option value="ONAF (Oil Natural Air Forced)">ONAF (Forced Air)</option>
                        <option value="OFAF (Oil Forced Air Forced)">OFAF (High Density)</option>
                        <option value="AN (Dry Type)">AN (Dry-Type)</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="tap_changer">Tap Changer Regulation</label>
                      <select id="tap_changer" name="tap_changer">
                        <option value="">Select Tap Changer</option>
                        <option value="Off-Circuit Tap Changer (OCTC ±2.5%, ±5%)">Off-Circuit (OCTC ±2.5%, ±5%)</option>
                        <option value="On-Load Tap Changer (OLTC) with AVR">On-Load Tap Changer (OLTC) with AVR</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="timeline">Target Delivery Schedule</label>
                      <select id="timeline" name="timeline">
                        <option value="">Select Timeline</option>
                        <option value="Immediate / Factory Stock">Immediate / Factory Stock</option>
                        <option value="4 – 8 Weeks">4 – 8 Weeks</option>
                        <option value="8 – 16 Weeks">8 – 16 Weeks</option>
                        <option value="Tender Schedule / Future Turnkey">Tender Schedule / Future Turnkey</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rfq-submit-row">
              <button className="btn btn--primary rfq-submit-btn" type="submit">
                <span>Submit Inquiry</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </button>
            </div>

            <div
              className={`form__status${status ? (status.ok ? ' is-ok' : ' is-error') : ''}`}
              id="form-status"
              role="status"
              tabIndex="-1"
              ref={statusRef}
            >
              {status && !status.ok && (
                <span>Please complete the required fields highlighted in red and submit again.</span>
              )}
              {status && status.ok && (
                <>
                  Your technical specification is ready. In this demonstration mode without an active email gateway,{' '}
                  <a href={status.href} className="rfq-mail-action">click here to launch your email client</a>{' '}
                  with pre-populated technical parameters, or send your single-line diagram directly to{' '}
                  <strong>tenders@bpel-power.com</strong>.
                </>
              )}
            </div>
          </form>
        </div>

        {/* Right Side (1/3): Direct Contact & Fast Channels Card */}
        <aside className="contact-rfq-sidebar fade-in-up" data-delay="120">
          <div className="rfq-direct-card">
            <div className="rfq-direct-card__header">
              <span className="rfq-direct-kicker">DIRECT CONTACT</span>
              <h3 className="rfq-direct-title">Reach Us Directly.</h3>
              <p className="rfq-direct-lead">
                Connect directly with our engineering desk, tender estimation department, or branch coordinators.
              </p>
            </div>

            <div className="rfq-direct-list">
              {/* Phone Line */}
              <div className="rfq-direct-item">
                <div className="rfq-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="rfq-direct-content">
                  <span className="rfq-direct-label">Corporate Telephone</span>
                  <a href={`tel:${c.phoneDisplay.replace(/\s+/g, '')}`} className="rfq-direct-val rfq-direct-link">
                    {c.phoneDisplay}
                  </a>
                  <span className="rfq-direct-sub">Switchboard: Sun – Thu 08:30 – 18:00 BST</span>
                </div>
              </div>

              {/* WhatsApp Live Desk */}
              <div className="rfq-direct-item">
                <div className="rfq-direct-icon rfq-direct-icon--wa" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
                  </svg>
                </div>
                <div className="rfq-direct-content">
                  <div className="rfq-direct-row">
                    <span className="rfq-direct-label">WhatsApp Engineering Desk</span>
                    <span className="rfq-online-chip">
                      <span className="rfq-online-pulse" aria-hidden="true" />
                      <span>Online</span>
                    </span>
                  </div>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="rfq-direct-val rfq-direct-link">
                    +880 1713 000 001
                  </a>
                  <span className="rfq-direct-sub">Instant technical chat &amp; file sharing</span>
                </div>
              </div>

              {/* Dedicated Emails */}
              <div className="rfq-direct-item">
                <div className="rfq-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="rfq-direct-content">
                  <span className="rfq-direct-label">Tender &amp; Quotation Inquiries</span>
                  <a href="mailto:tenders@bpel-power.com" className="rfq-direct-val rfq-direct-link">
                    tenders@bpel-power.com
                  </a>
                  <span className="rfq-direct-sub">General Desk: info@bpel-power.com</span>
                </div>
              </div>

              {/* Corporate Address */}
              <div className="rfq-direct-item">
                <div className="rfq-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <div className="rfq-direct-content">
                  <span className="rfq-direct-label">Corporate Headquarters</span>
                  <p className="rfq-direct-address">{c.address}</p>
                  <button
                    type="button"
                    className="rfq-copy-btn"
                    onClick={() => copyText('address', c.address)}
                  >
                    {copiedType === 'address' ? (
                      <>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ color: '#059669' }}>Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rfq-direct-item">
                <div className="rfq-direct-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="rfq-direct-content">
                  <span className="rfq-direct-label">Working Hours</span>
                  <span className="rfq-direct-val">Sunday – Thursday, 08:30 – 18:00 (BST)</span>
                  <span className="rfq-direct-sub">Response Time: Within 24 hours on business days</span>
                </div>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
