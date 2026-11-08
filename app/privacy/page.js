'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DATA } from '@/lib/data';
import styles from './page.module.css';

const SECTIONS = [
  { id: 'introduction', num: '01', title: 'Introduction & Scope' },
  { id: 'information-collected', num: '02', title: 'Information We Collect' },
  { id: 'engineering-data', num: '03', title: 'How We Use Technical & RFQ Data' },
  { id: 'security-measures', num: '04', title: 'Drawings & Intellectual Property Security' },
  { id: 'third-parties', num: '05', title: 'Third-Party Disclosures & Testing Labs' },
  { id: 'cookies-tools', num: '06', title: 'Cookies, Local Storage & Calculators' },
  { id: 'retention-periods', num: '07', title: 'Data Retention Schedule' },
  { id: 'your-rights', num: '08', title: 'Your Legal Rights & Data Access' },
  { id: 'contact-dpo', num: '09', title: 'Contact Our Compliance Officer' }
];

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const c = DATA.contact;

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className={styles.privacyPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs" style={{ marginBottom: '1.25rem' }}>
              <li><Link href="/">Home</Link></li>
              <li><span style={{ color: '#94a3b8' }}>Legal</span></li>
              <li><span aria-current="page" style={{ color: '#ffffff' }}>Privacy Policy</span></li>
            </ol>
          </nav>

          <span className={styles.heroBadge}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Legal Compliance &amp; Engineering Governance
          </span>

          <h1 className={styles.heroTitle}>Privacy Policy &amp; Data Protection</h1>
          <p className={styles.heroLead}>
            How Basic Power Engineering Ltd. (BPEL) protects and governs your project inquiries, technical engineering drawings, corporate communications, and electrical equipment specifications.
          </p>

          <div className={styles.heroMetaBar}>
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>Effective Date: <strong>November 01, 2026</strong></span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span>Est. Reading Time: <strong>4 Minutes</strong></span>
            </div>

            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span>Jurisdiction: <strong>Dhaka, Bangladesh</strong></span>
            </div>

            <button type="button" className={styles.printBtn} onClick={handlePrint} aria-label="Print policy document">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Policy
            </button>
          </div>
        </div>
      </section>

      {/* Key Highlights Banner */}
      <div className="wrap">
        <div className={styles.highlightsWrap}>
          <div className={styles.highlightsGrid}>
            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <div className={styles.highlightInfo}>
                <h4>Zero Data Selling</h4>
                <p>We never sell, rent, or trade client contact details or tender specifications to third parties.</p>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className={styles.highlightInfo}>
                <h4>Engineering Use Only</h4>
                <p>RFQ details are exclusively processed to design, engineer, and price custom electrical solutions.</p>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className={styles.highlightInfo}>
                <h4>Encrypted Submissions</h4>
                <p>256-bit TLS/SSL encryption for all web form inquiries, calculator sessions, and drawing uploads.</p>
              </div>
            </div>

            <div className={styles.highlightCard}>
              <div className={styles.highlightIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className={styles.highlightInfo}>
                <h4>NDA-Backed Security</h4>
                <p>Proprietary industrial electrical designs and tender bills of materials protected under mutual NDA.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Sticky Sidebar TOC + Content Area */}
        <div className={styles.mainLayout}>
          {/* Table of Contents */}
          <aside className={styles.sidebar}>
            <div className={styles.tocTitle}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Table of Contents
            </div>
            <ul className={styles.tocList}>
              {SECTIONS.map(s => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`${styles.tocLink} ${activeSection === s.id ? styles.tocLinkActive : ''}`}
                  >
                    <span className={styles.tocIndex}>{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.sidebarHelp}>
              <p>Have specific privacy concerns regarding a governmental or utility tender?</p>
              <Link href="/contact/" className={styles.sidebarHelpBtn}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Contact Legal Desk
              </Link>
            </div>
          </aside>

          {/* Policy Document Body */}
          <main className={styles.contentArea}>
            {/* Section 01 */}
            <article id="introduction" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>01</span>
                <h2 className={styles.sectionTitle}>Introduction &amp; Scope</h2>
              </div>
              <p>
                Basic Power Engineering Ltd. (&ldquo;BPEL&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is a leading manufacturer of high-voltage transmission transformers, power distribution units, compact substations, and intelligent switchgear assemblies headquartered in Dhaka, Bangladesh.
              </p>
              <p>
                This Privacy Policy establishes our transparent commitments regarding the collection, handling, storage, and safeguarding of personal data, engineering inquiries, and proprietary technical information obtained when you visit <strong>bpel-power.com</strong>, utilize our online engineering calculators, submit a Request for Quotation (RFQ), or engage with our engineering team via email or official channels.
              </p>
              <div className={styles.callout}>
                <div className={styles.calloutHeader}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Scope of Application
                </div>
                <p>
                  This policy applies to all prospective industrial purchasers, EPC contractors, utility engineers, facility managers, job applicants, and general visitors who interact with our digital infrastructure.
                </p>
              </div>
            </article>

            {/* Section 02 */}
            <article id="information-collected" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>02</span>
                <h2 className={styles.sectionTitle}>Information We Collect</h2>
              </div>
              <p>
                In the course of providing specialized electrical manufacturing and substation engineering services, we collect information categorized into the following streams:
              </p>
              <ul>
                <li>
                  <strong>Contact &amp; Corporate Identity:</strong> Full name, professional designation, enterprise/organization name, corporate email address, business telephone number, and delivery site address.
                </li>
                <li>
                  <strong>Technical Project Specifications:</strong> Voltage ratings (kV), kVA/MVA capacity requirements, ambient temperature tolerances, impedance values, vector group specifications, single-line diagrams (SLD), and tender BOQ schedules.
                </li>
                <li>
                  <strong>Digital Communications:</strong> Inquiries transmitted through our online RFQ portal, direct email correspondence with sales engineers, and official WhatsApp business interactions.
                </li>
                <li>
                  <strong>Automated Technical Data:</strong> Anonymized server logs, Internet Protocol (IP) addresses, browser user-agent strings, referring URLs, and localized language preferences.
                </li>
              </ul>
            </article>

            {/* Section 03 */}
            <article id="engineering-data" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>03</span>
                <h2 className={styles.sectionTitle}>How We Use Technical &amp; RFQ Data</h2>
              </div>
              <p>
                All data collected is deployed strictly to support high-reliability engineering, manufacturing, and commercial procurement operations:
              </p>
              <ul>
                <li>
                  <strong>Quotations &amp; Feasibility Analysis:</strong> Sizing appropriate core dimensions, winding configurations, and radiator profiles to produce certified technical proposals.
                </li>
                <li>
                  <strong>Testing &amp; Quality Certification:</strong> Coordinating Factory Acceptance Testing (FAT) schedules, issuing calibration and test certificates, and client witness protocols.
                </li>
                <li>
                  <strong>Logistics &amp; Site Commissioning:</strong> Facilitating heavy-haul transit permits, specialized crane offloading, and on-site energization procedures.
                </li>
                <li>
                  <strong>Customer Support &amp; Warranty:</strong> Tracking transformer serial numbers, tap-changer maintenance logs, and oil dielectric breakdown test histories over product lifecycles.
                </li>
              </ul>
            </article>

            {/* Section 04 */}
            <article id="security-measures" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>04</span>
                <h2 className={styles.sectionTitle}>Drawings &amp; Intellectual Property Security</h2>
              </div>
              <p>
                We understand that tender drawings, substation schematics, and single-line diagrams represent sensitive corporate intellectual property. BPEL enforces strict enterprise security protocols:
              </p>
              <div className={styles.callout}>
                <div className={styles.calloutHeader}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Confidentiality &amp; NDA Execution
                </div>
                <p>
                  For utility-scale projects and private tenders, BPEL regularly executes Bilateral Non-Disclosure Agreements (NDAs). All CAD/BIM assets are stored in compartmentalized, role-based cloud environments accessible only by assigned design engineers.
                </p>
              </div>
              <ul>
                <li><strong>Transport Layer Security:</strong> All web submissions are encrypted with 256-bit SSL/TLS protocols.</li>
                <li><strong>Restricted Physical Access:</strong> Our design workstation servers and drawing vaults require multi-factor biometric authentication at our factory facility.</li>
                <li><strong>Regular Vulnerability Audits:</strong> Continuous infrastructure scanning to safeguard against data leakage and unauthorized intrusion.</li>
              </ul>
            </article>

            {/* Section 05 */}
            <article id="third-parties" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>05</span>
                <h2 className={styles.sectionTitle}>Third-Party Disclosures &amp; Testing Labs</h2>
              </div>
              <p>
                BPEL will never commercialize your information. Disclosures are made only under the following lawful, project-essential conditions:
              </p>
              <ul>
                <li>
                  <strong>Accredited Certification Laboratories:</strong> When a client requests independent type-testing or third-party verification (e.g., CPRI, BUET, BSTI, or SGS), relevant test records and nameplate data are provided to the examining body.
                </li>
                <li>
                  <strong>Heavy Rigging &amp; Transport Carriers:</strong> Site location, receiver contact details, and dimensional cargo notes are shared with licensed heavy-rigging haulers to ensure safe delivery.
                </li>
                <li>
                  <strong>Statutory &amp; Regulatory Authorities:</strong> We disclose information when strictly mandated by Bangladeshi law, National Revenue Board (NBR) compliance, or court subpoena.
                </li>
              </ul>
            </article>

            {/* Section 06 */}
            <article id="cookies-tools" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>06</span>
                <h2 className={styles.sectionTitle}>Cookies, Local Storage &amp; Calculators</h2>
              </div>
              <p>
                Our web platform utilizes standard browser storage technologies to improve responsiveness:
              </p>
              <ul>
                <li>
                  <strong>Session Cookies:</strong> Maintain your browsing session, search modal history, and active language choice (e.g. English or Bengali).
                </li>
                <li>
                  <strong>LocalStorage for Engineering Calculators:</strong> When using our Transformer kVA Sizing, Voltage Drop, or Loss Calculator tools, your entered parameters are cached locally in your browser so you do not lose progress during active sessions. This data is never harvested by our servers.
                </li>
                <li>
                  <strong>Analytics:</strong> Aggregated, privacy-friendly telemetry to observe traffic trends without individual device fingerprinting.
                </li>
              </ul>
            </article>

            {/* Section 07 */}
            <article id="retention-periods" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>07</span>
                <h2 className={styles.sectionTitle}>Data Retention Schedule</h2>
              </div>
              <p>
                Due to the extended operating lifecycle of industrial electrical machinery (often exceeding 25 to 30 years), our retention periods are tailored to equipment warranties and engineering liability:
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Data Category</th>
                      <th>Retention Duration</th>
                      <th>Primary Operational Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Uncompleted Quotation Requests</strong></td>
                      <td>24 Months</td>
                      <td>Re-engagement and reference pricing analysis</td>
                    </tr>
                    <tr>
                      <td><strong>Executed Supply Contracts</strong></td>
                      <td>12 Years</td>
                      <td>Statutory tax and industrial audit compliance</td>
                    </tr>
                    <tr>
                      <td><strong>Serialised FAT &amp; Test Records</strong></td>
                      <td>30 Years</td>
                      <td>Lifetime warranty, tap-changer &amp; spare parts support</td>
                    </tr>
                    <tr>
                      <td><strong>Web Server Access Logs</strong></td>
                      <td>90 Days</td>
                      <td>Cybersecurity monitoring and DDoS prevention</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Section 08 */}
            <article id="your-rights" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>08</span>
                <h2 className={styles.sectionTitle}>Your Legal Rights &amp; Data Access</h2>
              </div>
              <p>
                In accordance with applicable data privacy statutes, you maintain complete rights over your personal and commercial contact data:
              </p>
              <ul>
                <li><strong>Right of Access:</strong> Request a comprehensive export of all personal data held under your name or company profile.</li>
                <li><strong>Right to Rectification:</strong> Update obsolete telephone numbers, engineering addresses, or designation details.</li>
                <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Request immediate deletion of your contact profile, provided the data is not mandated for ongoing warranty fulfillment or legal audit.</li>
                <li><strong>Revocation of Consent:</strong> Opt out of technical newsletters or engineering whitepaper dispatches at any time.</li>
              </ul>
            </article>

            {/* Section 09 */}
            <article id="contact-dpo" className={styles.policySection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>09</span>
                <h2 className={styles.sectionTitle}>Contact Our Compliance Officer</h2>
              </div>
              <p>
                If you have questions regarding this Privacy Policy, wish to execute an NDA prior to sharing tender documents, or wish to exercise your data subject rights, please reach out to our designated compliance desk:
              </p>

              <div className={styles.contactCard}>
                <h4>Basic Power Engineering Ltd. — Corporate Compliance Division</h4>
                <p>Legal &amp; Information Governance Department</p>

                <div className={styles.contactDetails}>
                  <div className={styles.contactDetailItem}>
                    <span>Email Address</span>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </div>

                  <div className={styles.contactDetailItem}>
                    <span>Headquarters Phone</span>
                    <a href={`tel:${c.whatsapp}`}>{c.phoneDisplay}</a>
                  </div>

                  <div className={styles.contactDetailItem}>
                    <span>Physical Address</span>
                    <strong>{c.address}</strong>
                  </div>

                  <div className={styles.contactDetailItem}>
                    <span>Response Time</span>
                    <strong>Within 2 Business Days</strong>
                  </div>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
