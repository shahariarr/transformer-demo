'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/PageParts';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

const STANDARDS_DETAILED = [
  {
    code: 'IEC 60076-1',
    cat: 'iec',
    categoryName: 'IEC Power Transformers',
    categoryTag: 'General Spec',
    title: 'Power Transformers — General Requirements',
    scope: 'Defines operational ratings, tapping ranges, connection vector groups, loss tolerance thresholds, and temperature limits across all liquid-immersed transformers.',
    verified: 'FAT Routine Verified',
    icon: 'gear'
  },
  {
    code: 'IEC 60076-2',
    cat: 'iec',
    categoryName: 'Thermal Dynamics',
    categoryTag: 'Temperature Rise',
    title: 'Temperature Rise for Liquid-Immersed Transformers',
    scope: 'Specifies thermal equilibrium limits for copper windings (65K), top oil (60K), and radiator cooling efficiency under continuous full-load excitation.',
    verified: 'Type-Tested in Laboratory',
    icon: 'flame'
  },
  {
    code: 'IEC 60076-3',
    cat: 'iec',
    categoryName: 'Dielectric Insulation',
    categoryTag: 'High-Voltage BIL',
    title: 'Insulation Levels, Dielectric Tests & External Clearances',
    scope: 'Mandates full-wave and chopped-wave lightning impulse voltage withstand (BIL up to 200kV) and power frequency separate-source AC withstand tests.',
    verified: 'Type-Tested to 200kV BIL',
    icon: 'lightning'
  },
  {
    code: 'IEC 60076-5',
    cat: 'iec',
    categoryName: 'Grid Resiliency',
    categoryTag: 'Short-Circuit',
    title: 'Ability to Withstand Dynamic & Thermal Short Circuit',
    scope: 'Rigorous calculation and laboratory verification proving zero winding deformation, clamping displacement, or thermal breakdown under full short-circuit fault conditions.',
    verified: 'High-Power Lab Certified',
    icon: 'shield'
  },
  {
    code: 'IEC 60076-10',
    cat: 'iec',
    categoryName: 'Acoustic Control',
    categoryTag: 'Sound & Noise',
    title: 'Determination of Transformer Sound Pressure Levels',
    scope: 'Standardized acoustic sound pressure and sound intensity measurement protocols guaranteeing ultra-low decibel noise profiles for municipal substations.',
    verified: 'Acoustic Lab Measured',
    icon: 'wave'
  },
  {
    code: 'IEC 60076-11',
    cat: 'iec',
    categoryName: 'Dry-Type Cast Resin',
    categoryTag: 'Fire & Safety',
    title: 'Dry-Type Power Transformers (F1, E2, C2 Classes)',
    scope: 'International requirements for fire behavior (F1 self-extinguishing), environmental tolerance (E2 condensation), and climatic durability (C2 sub-zero thermal cycling).',
    verified: 'F1 Fire-Retardant Certified',
    icon: 'box'
  },
  {
    code: 'IEC 60296',
    cat: 'switchgear',
    categoryName: 'Dielectric Fluids',
    categoryTag: 'Transformer Oil',
    title: 'Unused Mineral Insulating Oils for Transformers',
    scope: 'Rigorous chemical, physical, and dielectric breakdown voltage requirements (BDV > 60kV, moisture content < 15ppm) for virgin inhibited and uninhibited transformer oil.',
    verified: '100% Batch BDV Tested',
    icon: 'droplet'
  },
  {
    code: 'IEC 62271-200',
    cat: 'switchgear',
    categoryName: 'Medium Voltage',
    categoryTag: 'MV Switchgear',
    title: 'AC Metal-Enclosed Switchgear for 1 kV to 52 kV',
    scope: 'Internal arc classification (IAC AFLR), vacuum circuit breaker ratings, partition classes (PM/PI), and mechanical interlock operator safety standards.',
    verified: 'IAC AFLR Arc-Resistant',
    icon: 'cpu'
  },
  {
    code: 'IEC 61439',
    cat: 'switchgear',
    categoryName: 'Low Voltage',
    categoryTag: 'LV Assemblies',
    title: 'Low-Voltage Switchgear & Controlgear Assemblies',
    scope: 'Design verification of busbar temperature rise, short-circuit withstand strength, and IP ingress protection for factory and substation LV distribution boards.',
    verified: 'Form 4b Partitioned',
    icon: 'sliders'
  },
  {
    code: 'IEEE C57.12.00',
    cat: 'ieee-iso',
    categoryName: 'IEEE / ANSI',
    categoryTag: 'Global Export',
    title: 'General Requirements for Distribution & Power Transformers',
    scope: 'North American and international compliance covering basic impulse levels, 60Hz frequency topologies, and ANSI standard tapping ranges for utility clients.',
    verified: 'ANSI / IEEE Compliant',
    icon: 'globe'
  },
  {
    code: 'ISO 9001:2015',
    cat: 'ieee-iso',
    categoryName: 'Quality Governance',
    categoryTag: 'Quality Management',
    title: 'Quality Management Systems (QMS Certification)',
    scope: 'End-to-end manufacturing quality discipline: incoming raw material chemical assays (CRGO steel, electrolytic copper), in-process QA hold points, and full FAT inspection.',
    verified: 'CNAS & IAF Accredited',
    icon: 'award'
  },
  {
    code: 'ISO 14001:2015',
    cat: 'ieee-iso',
    categoryName: 'Sustainability',
    categoryTag: 'Environmental',
    title: 'Environmental Management Systems (EMS)',
    scope: 'Clean vacuum drying cycles, zero oil spillage protocols, energy-efficient manufacturing, and compliant industrial recycling and waste management.',
    verified: 'ISO 14001 Certified',
    icon: 'leaf'
  },
  {
    code: 'ISO 45001:2018',
    cat: 'ieee-iso',
    categoryName: 'Workplace Safety',
    categoryTag: 'Occupational H&S',
    title: 'Occupational Health & Safety Management Systems',
    scope: 'Comprehensive electrical safety interlocks in high-voltage testing bays, overhead crane rigging safety, and strict electrical lockout/tagout (LOTO) protocols.',
    verified: 'ISO 45001 Certified',
    icon: 'heart'
  }
];

const FILTER_TABS = [
  { id: 'all', label: 'All Standards (13)' },
  { id: 'iec', label: 'IEC Power Transformers (6)' },
  { id: 'switchgear', label: 'Switchgear & Insulating Oil (3)' },
  { id: 'ieee-iso', label: 'IEEE & ISO Systems (4)' }
];

export default function StandardsSection() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return STANDARDS_DETAILED;
    return STANDARDS_DETAILED.filter((s) => s.cat === activeTab);
  }, [activeTab]);

  return (
    <div className="wrap">
      {/* Standards Masthead */}
      <header className="sec-head fade-in-up">
        <p className="label">GLOBAL COMPLIANCE ARCHITECTURE</p>
        <h2>International Engineering Standards &amp; Codes</h2>
        <p className="sec-head__desc">
          Every power transformer, medium-voltage switchgear panel, and substation enclosure engineered by BPEL follows rigorous IEC, IEEE, and ISO technical standards — ensuring seamless utility grid synchronisation, dielectric safety, and continuous industrial reliability.
        </p>
      </header>

      {/* Filter Buttons */}
      <div className="standards-filter-bar fade-in-up" role="tablist" aria-label="Filter Standards by Category">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`standards-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Elevated Standards Cards */}
      <div className="standards-cards-grid">
        {filtered.map((item, i) => (
          <article
            key={item.code}
            className="standard-card fade-in-up"
            data-delay={(i % 3) * 70}
          >
            {/* Top Bar with Code & Category */}
            <div className="standard-card__top">
              <span className="standard-card__code">{item.code}</span>
              <span className="standard-card__cat-tag">{item.categoryTag}</span>
            </div>

            {/* Standard Title */}
            <h3 className="standard-card__title">{item.title}</h3>

            {/* Scope Explanation */}
            <p className="standard-card__scope">{item.scope}</p>

            {/* Verification Footer */}
            <div className="standard-card__footer">
              <span className="standard-card__status">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span>{item.verified}</span>
              </span>
              <span className="standard-card__cat-name">{item.categoryName}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Technical Tender Consultation Callout */}
      <div className="standards-consult-box fade-in-up">
        <div className="standards-consult-copy">
          <span className="standards-consult-tag">ENGINEERING COMPLIANCE ASSISTANCE</span>
          <h3>Need Project-Specific Tender Compliance Documentation?</h3>
          <p>
            Our senior electrical engineering team provides certified compliance matrices, type test certificate bundles, guaranteed loss sheets, and factory FAT protocols tailored for utility tenders and industrial consultants.
          </p>
        </div>
        <div className="standards-consult-actions">
          <Link href="/contact/" className="btn btn--primary">
            <span>Request Compliance Pack</span>
            <ArrowRight />
          </Link>
          <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d={WA_PATH} />
            </svg>
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}

