'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';
import { DATA, waLink, mailLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

const Ico = ({ children }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const Wa = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>;

const QUICK_LINKS = [
  ['#home', 'Home'], ['#about', 'About Us'], ['#products', 'Products'],
  ['#projects', 'Projects'], ['#quality', 'Quality & Testing'], ['#faq', 'FAQ'], ['#contact', 'Contact Us']
];
const PRODUCTS = [
  'Oil-Immersed Transformer', 'Dry Type Transformer', 'Pad Mounted Transformer',
  'Pole Mounted Transformer', 'Compact Substation', 'Hermetically Sealed Transformer'
];

const List = ({ items }) => items.map(([href, label]) => <li key={label}><a href={href}>{label}</a></li>);

export default function Footer() {
  const c = DATA.contact;
  const [year, setYear] = useState('');
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer id="footer" className="footer">
      {/* Call to action band */}
      <div className="fcta-band">
        <div className="wrap fcta-band__in">
          <h2>Ready to power your project with reliable transformers?</h2>
          <div className="fcta-band__btns">
            <a href="#contact" className="fbtn fbtn--light">Get A Quote Now</a>
            <a href={waLink()} target="_blank" rel="noopener" className="fbtn fbtn--line"><Wa /><span>WhatsApp Us</span></a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="fgrid">
          {/* Brand */}
          <div className="fgrid__brand" data-reveal="" style={{ '--d': 1 }}>
            <a href="#home" className="flogo"><img src="/assets/images/logo-footer.png" alt="Basic Power Engineering Ltd. (BPEL)" width="602" height="72" /></a>
            <p>{SITE.name} is an ISO 9001:2015 certified manufacturer of power and distribution transformers, compact substations and turnkey power solutions, serving utilities and industry since 1985.</p>
            <div className="fsocial" aria-label="Follow us">
              <a href="#home" aria-label="Facebook"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1z" /></svg></a>
              <a href="#home" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
              <a href="#home" aria-label="YouTube"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5V8.5l6.2 3.5-6.2 3.5z" /></svg></a>
              <a href={waLink()} target="_blank" rel="noopener" aria-label="WhatsApp"><Wa /></a>
            </div>
          </div>

          {/* Quick links */}
          <nav className="fgrid__col" aria-label="Quick links" data-reveal="" style={{ '--d': 2 }}>
            <h3>Quick Links</h3>
            <ul className="flinks"><List items={QUICK_LINKS} /></ul>
          </nav>

          {/* Products */}
          <nav className="fgrid__col" aria-label="Products" data-reveal="" style={{ '--d': 3 }}>
            <h3>Products</h3>
            <ul className="flinks"><List items={PRODUCTS.map(p => ['#products', p])} /></ul>
          </nav>

          {/* Contact */}
          <div className="fgrid__col" data-reveal="" style={{ '--d': 4 }}>
            <h3>Contact Us</h3>
            <ul className="finfo">
              <li><Ico><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Ico><a href={`tel:${c.whatsapp}`}>{c.phoneDisplay}</a></li>
              <li><Ico><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Ico><a href={mailLink()}>{c.email}</a></li>
              <li><Ico><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Ico><span>{c.address}</span></li>
              <li><Ico><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Ico><span>Mon – Fri: 08:00 – 18:00</span></li>
            </ul>
            <a href="#contact" className="finquiry"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></svg><span>Send Inquiry</span></a>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="fbar">
        <div className="wrap fbar__in">
          <span>Copyright &copy; <span id="yr">{year}</span> {SITE.name}. All Rights Reserved.</span>
          <ul>
            <li><a href="#about">Privacy Policy</a></li>
            <li><a href="#home">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
