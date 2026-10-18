'use client';

import { useRef, useState } from 'react';
import { DATA, waLink, mailLink } from '@/lib/data';
import { useUI } from './UIProvider';
import SectionHead from './SectionHead';

const ICONS = {
  mail: <path d="M3 6h18v12H3zM3 7l9 7 9-7" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: <><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  wa: <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z" />
};
const Ico = ({ name }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
);

const RULES = {
  name: v => (v.trim() ? '' : 'Enter your full name.'),
  email: v => (!v.trim() ? 'Enter your email address.' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address, like name@company.com.'),
  service: v => (v ? '' : 'Choose a product or service.'),
  message: v => (v.trim() ? '' : 'Describe your project requirements.')
};

const Req = () => <> <span className="req" aria-hidden="true">*</span></>;

export default function Contact() {
  const c = DATA.contact;
  const { service, setService } = useUI();
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const check = k => {
    const msg = RULES[k](formRef.current.elements[k].value);
    setErrors(e => ({ ...e, [k]: msg }));
    return !msg;
  };

  const invalid = k => (k in errors ? { 'aria-invalid': errors[k] ? 'true' : 'false' } : {});

  const Field = ({ id, label, type, req, ...extra }) => (
    <div className="field">
      <label htmlFor={id}>{label}{req ? <Req /> : null}</label>
      <input id={id} name={id} type={type} {...(req ? { required: true, 'aria-required': 'true' } : {})} {...extra} aria-describedby={`${id}-err`}
             {...invalid(id)} onBlur={RULES[id] ? () => check(id) : undefined} />
      <p className="err" id={`${id}-err`}>{errors[id] || ''}</p>
    </div>
  );

  const onSubmit = e => {
    e.preventDefault();
    const bad = Object.keys(RULES).filter(k => !check(k));
    if (bad.length) {
      setStatus({ ok: false });
      formRef.current.elements[bad[0]].focus();
      return;
    }
    const f = formRef.current.elements;
    const body = `Name: ${f.name.value}\nCompany: ${f.company.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value}\nRequired: ${f.service.value}\nLocation: ${f.location.value}\n\n${f.message.value}`;
    setStatus({ ok: true, href: mailLink(body) });
    requestAnimationFrame(() => statusRef.current.focus());
  };

  return (
    <div className="wrap">
      <SectionHead label="LET'S DISCUSS YOUR PROJECT" title="Have a Power Engineering Requirement?"
        desc="Share your project requirements and connect with our team to discuss the next steps." />
      <div className="contact__grid">
        <div className="contact__cards fade-in-left">
          <a className="ccard" href={mailLink()}><Ico name="mail" /><span><b>Email</b>{c.email}<small>Placeholder address</small></span></a>
          <a className="ccard" href={waLink()} target="_blank" rel="noopener"><Ico name="wa" /><span><b>WhatsApp</b>{c.phoneDisplay}<small>Placeholder number, opens WhatsApp</small></span></a>
          <div className="ccard"><Ico name="phone" /><span><b>Business phone</b>{c.phoneDisplay}<small>Placeholder number</small></span></div>
          <div className="ccard"><Ico name="pin" /><span><b>Office address</b>{c.address}<small>Placeholder address</small></span></div>
        </div>
        <form id="contact-form" className="form fade-in-right" data-delay="150" noValidate ref={formRef} onSubmit={onSubmit}>
          <div className="form__row">
            {Field({ id: 'name', label: 'Full Name', type: 'text', req: true, autoComplete: 'name' })}
            {Field({ id: 'company', label: 'Company Name', type: 'text', req: false, autoComplete: 'organization' })}
          </div>
          <div className="form__row">
            {Field({ id: 'email', label: 'Email Address', type: 'email', req: true, autoComplete: 'email' })}
            {Field({ id: 'phone', label: 'Phone Number', type: 'tel', req: false, autoComplete: 'tel' })}
          </div>
          <div className="form__row">
            <div className="field">
              <label htmlFor="service">Product or Service Required<Req /></label>
              <select id="service" name="service" required aria-required="true" aria-describedby="service-err" {...invalid('service')}
                      value={service} onChange={e => setService(e.target.value)} onBlur={() => check('service')}>
                <option value="">Select one</option>
                {DATA.products.map(p => <option key={p.name}>{p.name}</option>)}
                <option>Engineering &amp; design</option><option>Installation &amp; commissioning</option><option>Other</option>
              </select>
              <p className="err" id="service-err">{errors.service || ''}</p>
            </div>
            {Field({ id: 'location', label: 'Project Location', type: 'text', req: false })}
          </div>
          <div className="field">
            <label htmlFor="message">Project Requirements<Req /></label>
            <textarea id="message" name="message" rows="5" required aria-required="true" aria-describedby="message-err" {...invalid('message')}
                      onBlur={() => check('message')}></textarea>
            <p className="err" id="message-err">{errors.message || ''}</p>
          </div>
          <button className="btn btn--primary" type="submit">Submit Inquiry</button>
          <div className={`form__status${status ? (status.ok ? ' is-ok' : ' is-error') : ''}`} id="form-status" role="status" tabIndex="-1" ref={statusRef}>
            {status && !status.ok ? 'Please fix the highlighted fields and submit again.' : null}
            {status && status.ok ? (
              <>Your details are complete, but this demo has no backend, so <strong>nothing has been sent</strong>. To send them now, <a href={status.href}>open them in your email app</a>.</>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
