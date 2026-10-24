'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/PageParts';
import SectionHead from '@/components/SectionHead';
import { STANDARD_KVA } from '@/lib/resources';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

// -------------------------------------------------------------
// CALCULATOR METADATA DEFINITIONS (15 TOOLS ACROSS 4 CATEGORIES)
// -------------------------------------------------------------
export const CALCULATOR_CATEGORIES = [
  'All',
  'Sizing & Selection',
  'Performance & Cost',
  'Quick Utilities',
  'Market Intelligence'
];

export const CATEGORY_SECTIONS = [
  {
    num: '01',
    id: 'sizing-selection',
    title: 'Sizing & Selection',
    tag: 'CAPACITY & SIZING',
    desc: 'Determine transformer apparent power (kVA), application architecture, and primary/secondary cable cross-sections.'
  },
  {
    num: '02',
    id: 'performance-cost',
    title: 'Performance & Cost',
    tag: 'EFFICIENCY & LIFECYCLE',
    desc: 'Analyze no-load core and copper losses, 30-year lifecycle total cost of ownership (TCO), and thermal overload capacity.'
  },
  {
    num: '03',
    id: 'quick-utilities',
    title: 'Quick Utilities',
    tag: 'ELECTRICAL CALCULATIONS',
    desc: 'Essential electrical utilities: short circuit currents, multi-unit conversions, tap regulation, and oil volume & weights.'
  },
  {
    num: '04',
    id: 'market-intelligence',
    title: 'Market Intelligence',
    tag: 'RAW MATERIALS & ESG',
    desc: 'Live London Metal Exchange (LME) commodity price tracker, active part material cost breakdown, and CO₂ emission reductions.'
  }
];

export const CALCULATORS_DATA = [
  // 01: Sizing & Selection
  {
    id: 'kva',
    num: '01',
    category: 'Sizing & Selection',
    title: 'kVA Sizing Calculator',
    badge: 'Core Tool',
    standard: 'IEC 60076-1',
    shortDesc: 'Determine transformer size from voltage, current, or active power load.',
    desc: 'Calculate precise apparent power (kVA) requirements from active load (kW) and power factor, or from 3-phase/single-phase voltage and full-load current with customizable future growth margin.'
  },
  {
    id: 'sizing-advisor',
    num: '02',
    category: 'Sizing & Selection',
    title: 'Sizing Advisor Wizard',
    badge: 'Interactive',
    standard: 'Application Matrix',
    shortDesc: 'Interactive wizard that recommends the right transformer for your application.',
    desc: 'Select your application environment, ambient conditions, and utility voltage to receive an instant engineering recommendation for Oil-Immersed, Cast Resin Dry-Type, or Pad-Mounted units.'
  },
  {
    id: 'cable-sizing',
    num: '03',
    category: 'Sizing & Selection',
    title: 'Cable Sizing Calculator',
    badge: 'BS 7671 / IEC 60364',
    standard: 'IEC 60287',
    shortDesc: 'Calculate cable cross-section based on current, length, and material.',
    desc: 'Determine minimum copper or aluminium cable cross-section (mm²) based on continuous load current, run length, system voltage, and allowable maximum voltage drop threshold.'
  },

  // 02: Performance & Cost
  {
    id: 'loss-efficiency',
    num: '04',
    category: 'Performance & Cost',
    title: 'Loss & Efficiency Calculator',
    badge: 'EcoDesign Tier 2',
    standard: 'IEC 60076-1',
    shortDesc: 'Copper losses, iron losses, and overall transformer efficiency.',
    desc: 'Compute guaranteed no-load (core/iron) losses and load (copper) losses across 25%, 50%, 75%, and 100% load factors to analyze peak operational efficiency curves.'
  },
  {
    id: 'tco',
    num: '05',
    category: 'Performance & Cost',
    title: 'Total Cost of Ownership (TCO)',
    badge: 'Financial Model',
    standard: 'IEEE C57.120',
    shortDesc: 'Compare purchase cost vs. energy losses over the transformer lifetime.',
    desc: 'Capitalize lifetime excitation and winding losses over a 20 to 30 year operational lifespan using A and B capitalization factors to evaluate the true financial cost beyond initial tender purchase price.'
  },
  {
    id: 'voltage-drop',
    num: '06',
    category: 'Performance & Cost',
    title: 'Voltage Drop Calculator',
    badge: 'Grid Analysis',
    standard: 'IEC 60076-1',
    shortDesc: 'Calculate voltage loss across cable runs and transformer windings under load.',
    desc: 'Calculate percentage voltage regulation and actual voltage drop at the load terminals under varying power factors (lagging, unity) and transformer impedance (%Z).'
  },
  {
    id: 'overload',
    num: '07',
    category: 'Performance & Cost',
    title: 'Overload Capacity Guide',
    badge: 'Thermal Dynamics',
    standard: 'IEC 60076-7',
    shortDesc: 'Thermal overload capability based on IEC 60076-7 loading guide.',
    desc: 'Determine permissible emergency loading percentages and maximum continuous run durations without accelerating paper insulation ageing or exceeding 120°C / 140°C hotspot thresholds.'
  },

  // 03: Quick Utilities
  {
    id: 'short-circuit',
    num: '08',
    category: 'Quick Utilities',
    title: 'Short Circuit Calculator',
    badge: 'Protection Study',
    standard: 'IEC 60909',
    shortDesc: 'Calculate short-circuit current (Ik) from transformer impedance.',
    desc: 'Determine secondary symmetrical short-circuit current (kA) and fault MVA from percentage impedance (%Z) to size switchgear breaking capacities and protective relay settings.'
  },
  {
    id: 'unit-converter',
    num: '09',
    category: 'Quick Utilities',
    title: 'Engineering Unit Converter',
    badge: 'Multi-Unit',
    standard: 'IEEE / SI',
    shortDesc: 'kVA↔kW, °C↔°F, mm²↔AWG, and electrical engineering conversions.',
    desc: 'Convert power ratings, temperature rises, conductor cross-sections, magnetic flux density (Tesla to Gauss), and pressure units used in substation engineering.'
  },
  {
    id: 'tap-changer',
    num: '10',
    category: 'Quick Utilities',
    title: 'Tap Changer Range Estimator',
    badge: 'Voltage Control',
    standard: 'IEC 60214',
    shortDesc: 'Calculate voltage regulation range from tap positions.',
    desc: 'Calculate exact primary and secondary winding voltages for off-circuit tap changers (OCTC) and on-load tap changers (OLTC) across nominal ±2.5%, ±5% steps.'
  },
  {
    id: 'oil-volume',
    num: '11',
    category: 'Quick Utilities',
    title: 'Oil Volume & Weight Estimator',
    badge: 'Maintenance',
    standard: 'IEC 60296',
    shortDesc: 'Estimate transformer oil requirement by kVA rating and tank geometry.',
    desc: 'Estimate the required dielectric mineral insulating oil volume (liters) and weight (kg) based on kVA rating and tank type (corrugated hermetically sealed vs. conservator).'
  },
  {
    id: 'currency-converter',
    num: '12',
    category: 'Quick Utilities',
    title: 'Currency Converter for Procurement',
    badge: 'Procurement',
    standard: 'Global Forex',
    shortDesc: 'Convert USD, BDT, AED, EUR, GBP, and SAR for international equipment procurement.',
    desc: 'Quickly evaluate transformer quotations across global procurement currencies including US Dollars, Bangladesh Taka, UAE Dirham, Euro, British Pound, and Saudi Riyal.'
  },

  // 04: Market Intelligence
  {
    id: 'commodities',
    num: '13',
    category: 'Market Intelligence',
    title: 'Commodity Benchmark Monitor',
    badge: 'Procurement Intel',
    standard: 'LME Spot',
    shortDesc: 'Live LME metal prices & specialty material tracking for transformer procurement.',
    desc: 'Track the latest pricing trends for London Metal Exchange (LME) electrolytic copper, high-grade aluminium, CRGO silicon steel, and transformer oil to assess price adjustments.'
  },
  {
    id: 'material-cost',
    num: '14',
    category: 'Market Intelligence',
    title: 'Material Cost Estimator',
    badge: 'Cost Breakdown',
    standard: 'BOM Model',
    shortDesc: 'Estimate raw material cost proportion per transformer.',
    desc: 'Analyze the estimated active part mass and cost breakdown between winding conductor (copper/aluminium), CRGO magnetic core, dielectric fluid, and structural tank steel.'
  },
  {
    id: 'co2-savings',
    num: '15',
    category: 'Market Intelligence',
    title: 'CO₂ Lifecycle Savings Calculator',
    badge: 'ESG / Sustainability',
    standard: 'EcoDesign 2019/1783',
    shortDesc: 'Calculate emission savings from switching to high-efficiency transformers.',
    desc: 'Calculate annual metric tons of CO₂ emissions prevented and equivalent trees planted over a 30-year operational life by upgrading to high-efficiency EcoDesign Tier 2 transformers.'
  }
];

// Helper functions for numeric formatting
const toNum = v => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};
const fmt = (n, d = 1) => n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });

// -------------------------------------------------------------
// TOOL SVG ICONS (15 LIGHTWEIGHT ICONS FOR STUDIO SIDEBAR)
// -------------------------------------------------------------
export const TOOL_ICONS = {
  kva: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  'sizing-advisor': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
  ),
  'cable-sizing': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v12a3 3 0 0 0 6 0V3"></path>
      <path d="M18 9v6a6 6 0 0 1-12 0"></path>
    </svg>
  ),
  'loss-efficiency': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  tco: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 6v12M8 10h8M8 14h8"></path>
    </svg>
  ),
  'voltage-drop': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
  ),
  overload: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </svg>
  ),
  'short-circuit': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  'unit-converter': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"></polyline>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
      <polyline points="7 23 3 19 7 15"></polyline>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
  ),
  'tap-changer': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"></line>
      <line x1="4" y1="10" x2="4" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12" y2="3"></line>
      <line x1="20" y1="21" x2="20" y2="16"></line>
      <line x1="20" y1="12" x2="20" y2="3"></line>
      <circle cx="4" cy="12" r="2"></circle>
      <circle cx="12" cy="10" r="2"></circle>
      <circle cx="20" cy="14" r="2"></circle>
    </svg>
  ),
  'oil-volume': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  ),
  'currency-converter': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  ),
  commodities: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  ),
  'material-cost': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  ),
  'co2-savings': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
    </svg>
  )
};

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function CalculatorsDirectory({ initialTool = 'kva', initialView = 'studio' }) {
  const [viewMode, setViewMode] = useState(initialView);
  const [activeToolId, setActiveToolId] = useState(initialTool || 'kva');
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. kVA Sizing state
  const [kvaMode, setKvaMode] = useState('load');
  const [kvaKw, setKvaKw] = useState('800');
  const [kvaPf, setKvaPf] = useState('0.85');
  const [kvaVolts, setKvaVolts] = useState('400');
  const [kvaAmps, setKvaAmps] = useState('1200');
  const [kvaPhase, setKvaPhase] = useState('3');
  const [kvaMargin, setKvaMargin] = useState('20');

  // 2. Sizing Advisor state
  const [advisorApp, setAdvisorApp] = useState('industrial');
  const [advisorEnv, setAdvisorEnv] = useState('outdoor');
  const [advisorVoltage, setAdvisorVoltage] = useState('11');
  const [advisorAmbient, setAdvisorAmbient] = useState('50');

  // 3. Cable Sizing state
  const [cableAmps, setCableAmps] = useState('250');
  const [cableLength, setCableLength] = useState('75');
  const [cableVoltage, setCableVoltage] = useState('400');
  const [cableMaterial, setCableMaterial] = useState('cu');
  const [cableMaxDrop, setCableMaxDrop] = useState('3.0');

  // 4. Loss & Efficiency state
  const [lossKva, setLossKva] = useState('1000');
  const [lossP0, setLossP0] = useState('1400'); // W
  const [lossPk, setLossPk] = useState('10500'); // W
  const [lossFactor, setLossFactor] = useState('75'); // %
  const [lossPf, setLossPf] = useState('0.85');

  // 5. TCO state
  const [tcoPrice, setTcoPrice] = useState('35000'); // USD
  const [tcoP0, setTcoP0] = useState('1.4'); // kW
  const [tcoPk, setTcoPk] = useState('10.5'); // kW
  const [tcoTariff, setTcoTariff] = useState('0.12'); // $/kWh
  const [tcoYears, setTcoYears] = useState('30');
  const [tcoLoad, setTcoLoad] = useState('65'); // %

  // 6. Voltage Drop state
  const [vdVoltage, setVdVoltage] = useState('400');
  const [vdCurrent, setVdCurrent] = useState('800');
  const [vdZ, setVdZ] = useState('5.0'); // %
  const [vdPf, setVdPf] = useState('0.85');

  // 7. Overload state
  const [ovKva, setOvKva] = useState('1250');
  const [ovPriorLoad, setOvPriorLoad] = useState('70'); // %
  const [ovTarget, setOvTarget] = useState('130'); // %
  const [ovAmbient, setOvAmbient] = useState('40'); // °C

  // 8. Short Circuit state
  const [scKva, setScKva] = useState('1600');
  const [scV2, setScV2] = useState('400'); // Volts
  const [scZ, setScZ] = useState('5.75'); // %

  // 9. Unit Converter state
  const [ucType, setUcType] = useState('power');
  const [ucVal, setUcVal] = useState('1000');

  // 10. Tap Changer state
  const [tcVprim, setTcVprim] = useState('33'); // kV
  const [tcStep, setTcStep] = useState('2.5'); // %
  const [tcRange, setTcRange] = useState('2'); // +/- 2 steps (5 taps total)

  // 11. Oil Volume state
  const [oilKva, setOilKva] = useState('1250');
  const [oilType, setOilType] = useState('sealed'); // sealed or conservator

  // 12. Currency state
  const [currAmount, setCurrAmount] = useState('10000');
  const [currBase, setCurrBase] = useState('USD');

  // 13. Commodity monitor state
  const COMMODITIES = [
    { name: 'LME Copper Grade A', price: '$9,820 / MT', change: '+1.4%', status: 'up' },
    { name: 'LME High-Grade Aluminium', price: '$2,640 / MT', change: '-0.6%', status: 'down' },
    { name: 'CRGO Steel (M4 / 0.27mm)', price: '$3,450 / MT', change: '+0.8%', status: 'up' },
    { name: 'Transformer Mineral Oil', price: '$1,380 / MT', change: '+0.2%', status: 'up' },
    { name: 'Brent Crude Oil Benchmark', price: '$82.40 / bbl', change: '-1.1%', status: 'down' }
  ];

  // 14. Material Cost state
  const [matKva, setMatKva] = useState('1000');
  const [matConductor, setMatConductor] = useState('cu');

  // 15. CO2 Savings state
  const [co2Kva, setCo2Kva] = useState('1250');
  const [co2DeltaKw, setCo2DeltaKw] = useState('2.4'); // kW saved
  const [co2EmissionFactor, setCo2EmissionFactor] = useState('0.62'); // kg CO2 / kWh

  // Current active tool object
  const activeTool = useMemo(() => {
    return CALCULATORS_DATA.find(c => c.id === activeToolId) || CALCULATORS_DATA[0];
  }, [activeToolId]);

  // Filtered calculators list for cards grid
  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CALCULATORS_DATA.filter(calc => {
      const matchCat = activeTab === 'All' || calc.category === activeTab;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        calc.title.toLowerCase().includes(q) ||
        calc.desc.toLowerCase().includes(q) ||
        calc.standard.toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  // -------------------------------------------------------------
  // CALCULATIONS
  // -------------------------------------------------------------

  // 1. kVA calculation
  const kvaBase = kvaMode === 'load'
    ? (toNum(kvaPf) <= 1 && toNum(kvaPf) > 0 ? toNum(kvaKw) / toNum(kvaPf) : 0)
    : ((kvaPhase === '3' ? Math.sqrt(3) : 1) * toNum(kvaVolts) * toNum(kvaAmps)) / 1000;
  const kvaRequired = kvaBase * (1 + toNum(kvaMargin) / 100);
  const kvaPick = STANDARD_KVA.find(r => r >= kvaRequired);

  // 2. Sizing Advisor recommendation
  const advisorResult = useMemo(() => {
    let type = 'Oil-Immersed Distribution Transformer';
    let cooling = 'ONAN (Natural Ester or Mineral Oil)';
    let tank = 'Hermetically Sealed Corrugated Tank';
    let features = ['High thermal withstand up to 50°C ambient', 'Double gasketed bushings', 'Zero internal moisture ingress'];

    if (advisorEnv === 'indoor' || advisorApp === 'commercial') {
      type = 'Cast Resin Dry-Type Transformer (F-Class)';
      cooling = 'AN (Air Natural) with IP31 Enclosure';
      tank = 'Epoxy Encapsulated Vacuum Impregnated';
      features = ['Zero fire hazard — non-flammable & self-extinguishing', 'No oil containment pit needed', 'Ideal for basements and high-rise risers'];
    } else if (advisorApp === 'solar') {
      type = 'Solar PV Inverter-Duty Multi-Winding Transformer';
      cooling = 'ONAN / KNAN Eco-Fluid';
      tank = 'Heavy Conservator Tank with Silica Breather';
      features = ['Dual/Quad LV windings for inverter inputs', 'Electrostatic copper shielding between HV/LV', 'Reinforced insulation for PWM inverter harmonics'];
    } else if (advisorApp === 'utility') {
      type = 'Substation Power Transformer with On-Load Tap Changer (OLTC)';
      cooling = 'ONAN / ONAF Forced Air Cooling';
      tank = 'Rigid Bell-Type Tank with Conservator and Radiator Bank';
      features = ['Motorized automatic OLTC with RTCC panel', 'Full 200kV lightning impulse test compliance', 'Fitted with Buchholz relay, PRD, and winding temperature indicator'];
    }

    return { type, cooling, tank, features };
  }, [advisorApp, advisorEnv, advisorVoltage, advisorAmbient]);

  // 3. Cable Sizing calculation
  const cableResistivity = cableMaterial === 'cu' ? 0.0175 : 0.028; // ohm*mm2/m
  const cableAllowedDropV = (toNum(cableVoltage) * toNum(cableMaxDrop)) / 100;
  const cableMinArea = cableAllowedDropV > 0
    ? (Math.sqrt(3) * toNum(cableAmps) * toNum(cableLength) * cableResistivity * 0.85) / cableAllowedDropV
    : 0;
  const STANDARD_CABLES = [16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400, 500, 630];
  const cableSelected = STANDARD_CABLES.find(c => c >= cableMinArea) || STANDARD_CABLES[STANDARD_CABLES.length - 1];
  const cableActualDropV = cableSelected
    ? (Math.sqrt(3) * toNum(cableAmps) * toNum(cableLength) * cableResistivity * 0.85) / cableSelected
    : 0;
  const cableActualDropPct = toNum(cableVoltage) > 0 ? (cableActualDropV / toNum(cableVoltage)) * 100 : 0;

  // 4. Loss & Efficiency calculation
  const lossLoadFraction = toNum(lossFactor) / 100;
  const lossP0Kw = toNum(lossP0) / 1000;
  const lossPkKw = toNum(lossPk) / 1000;
  const lossTotalKw = lossP0Kw + Math.pow(lossLoadFraction, 2) * lossPkKw;
  const lossOutKw = toNum(lossKva) * lossLoadFraction * toNum(lossPf);
  const lossEfficiency = lossOutKw + lossTotalKw > 0
    ? (lossOutKw / (lossOutKw + lossTotalKw)) * 100
    : 0;

  // 5. TCO calculation
  const tcoLoadFrac = toNum(tcoLoad) / 100;
  const tcoAnnualNoLoadKwh = toNum(tcoP0) * 8760;
  const tcoAnnualLoadKwh = toNum(tcoPk) * Math.pow(tcoLoadFrac, 2) * 8760;
  const tcoAnnualLossCost = (tcoAnnualNoLoadKwh + tcoAnnualLoadKwh) * toNum(tcoTariff);
  const tcoLifetimeLossCost = tcoAnnualLossCost * toNum(tcoYears);
  const tcoTotalLifecycle = toNum(tcoPrice) + tcoLifetimeLossCost;

  // 6. Voltage Drop calculation
  const vdDropPct = (toNum(vdZ) * (toNum(vdCurrent) / (toNum(vdCurrent) || 1)) * toNum(vdPf));
  const vdDropV = (toNum(vdVoltage) * vdDropPct) / 100;
  const vdTerminalV = Math.max(0, toNum(vdVoltage) - vdDropV);

  // 7. Overload capacity calculation
  const ovAllowedHours = useMemo(() => {
    const target = toNum(ovTarget);
    if (target <= 100) return 'Continuous (100% duty)';
    if (target <= 110) return '8.5 Hours permissible';
    if (target <= 120) return '4.0 Hours permissible';
    if (target <= 130) return '2.0 Hours permissible';
    if (target <= 140) return '1.0 Hour permissible';
    if (target <= 150) return '30 Minutes maximum emergency';
    return '15 Minutes emergency maximum';
  }, [ovTarget]);

  // 8. Short Circuit calculation
  const scInAmps = toNum(scV2) > 0 ? (toNum(scKva) * 1000) / (Math.sqrt(3) * toNum(scV2)) : 0;
  const scIscKa = toNum(scZ) > 0 ? (scInAmps / (toNum(scZ) / 100)) / 1000 : 0;
  const scFaultMva = toNum(scZ) > 0 ? (toNum(scKva) / 1000) / (toNum(scZ) / 100) : 0;

  // 9. Unit conversion
  const ucResult = useMemo(() => {
    const v = toNum(ucVal);
    switch (ucType) {
      case 'power':
        return {
          from: `${v} kVA (@ 0.85 PF)`,
          results: [
            { label: 'Real Power (kW)', val: fmt(v * 0.85, 2) + ' kW' },
            { label: 'Mechanical Horsepower', val: fmt((v * 0.85) * 1.341, 1) + ' HP' },
            { label: 'Reactive Power', val: fmt(v * Math.sin(Math.acos(0.85)), 2) + ' kVAr' }
          ]
        };
      case 'temp':
        return {
          from: `${v} °C`,
          results: [
            { label: 'Fahrenheit', val: fmt((v * 9) / 5 + 32, 1) + ' °F' },
            { label: 'Kelvin', val: fmt(v + 273.15, 2) + ' K' },
            { label: 'Temp Rise (from 40°C base)', val: fmt(Math.max(0, v - 40), 1) + ' K rise' }
          ]
        };
      case 'cable':
        return {
          from: `${v} mm²`,
          results: [
            { label: 'Approximate AWG / kcmil', val: v >= 50 ? `${Math.round(v * 1.9735)} kcmil` : `${Math.round(4 - Math.log(v / 21.15) / 0.23)} AWG` },
            { label: 'Circular Mils', val: Math.round(v * 1973.52).toLocaleString() + ' cmil' },
            { label: 'Conductor Diameter', val: fmt(2 * Math.sqrt(v / Math.PI), 2) + ' mm' }
          ]
        };
      case 'flux':
        return {
          from: `${v} Tesla (T)`,
          results: [
            { label: 'Gauss (G)', val: (v * 10000).toLocaleString() + ' Gauss' },
            { label: 'Lines / sq. inch', val: fmt(v * 64516, 0) + ' lines/in²' },
            { label: 'Core Saturation Margin (M4 @ 1.7T)', val: fmt(((1.7 - v) / 1.7) * 100, 1) + '%' }
          ]
        };
      case 'pressure':
        return {
          from: `${v} bar`,
          results: [
            { label: 'Pounds per Sq. Inch (PSI)', val: fmt(v * 14.5038, 2) + ' PSI' },
            { label: 'Kilopascals (kPa)', val: fmt(v * 100, 1) + ' kPa' },
            { label: 'Meters of Oil Head', val: fmt((v * 100000) / (880 * 9.81), 2) + ' m oil' }
          ]
        };
      default:
        return { from: '', results: [] };
    }
  }, [ucType, ucVal]);

  // 10. Tap Changer table
  const tcRows = useMemo(() => {
    const vNom = toNum(tcVprim);
    const step = toNum(tcStep);
    const range = parseInt(tcRange, 10) || 2;
    const rows = [];
    for (let i = range; i >= -range; i--) {
      const vTap = vNom * (1 + (i * step) / 100);
      const sign = i > 0 ? `+${i * step}%` : i < 0 ? `${i * step}%` : 'Nominal (0%)';
      rows.push({
        tapNum: range - i + 1,
        isNominal: i === 0,
        stepLabel: sign,
        primV: fmt(vTap, 3) + ' kV',
        secV: '400 V (Regulated)'
      });
    }
    return rows;
  }, [tcVprim, tcStep, tcRange]);

  // 11. Oil Volume calculation
  const oilLiters = useMemo(() => {
    const kva = toNum(oilKva);
    const factor = oilType === 'sealed' ? 0.38 : 0.48;
    return Math.round(kva * factor);
  }, [oilKva, oilType]);
  const oilWeightKg = Math.round(oilLiters * 0.885);

  // 12. Currency calculation
  const CURR_RATES = { USD: 1.0, BDT: 122.5, AED: 3.67, EUR: 0.92, GBP: 0.78, SAR: 3.75 };
  const currConverted = useMemo(() => {
    const amt = toNum(currAmount);
    const usd = amt / (CURR_RATES[currBase] || 1);
    return Object.entries(CURR_RATES).map(([code, rate]) => ({
      code,
      value: (usd * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })
    }));
  }, [currAmount, currBase]);

  // 14. Material Cost breakdown
  const matBreakdown = useMemo(() => {
    const kva = toNum(matKva);
    const isCu = matConductor === 'cu';
    const condWeightKg = Math.round(kva * (isCu ? 1.6 : 1.1));
    const coreWeightKg = Math.round(kva * 2.1);
    const oilWeightKg = Math.round(kva * 0.38 * 0.88);
    const steelTankKg = Math.round(kva * 1.4);
    const totalWeightKg = condWeightKg + coreWeightKg + oilWeightKg + steelTankKg;

    return {
      condWeightKg,
      coreWeightKg,
      oilWeightKg,
      steelTankKg,
      totalWeightKg
    };
  }, [matKva, matConductor]);

  // 15. CO2 Savings calculation
  const co2AnnualMwh = (toNum(co2DeltaKw) * 8760) / 1000;
  const co2AnnualTonnes = (co2AnnualMwh * 1000 * toNum(co2EmissionFactor)) / 1000;
  const co2ThirtyYearTonnes = co2AnnualTonnes * 30;
  const co2TreesEquivalent = Math.round((co2ThirtyYearTonnes * 1000) / 22);

  return (
    <div className="calc-hub-wrap">
      {/* =========================================================
          HERO BANNER (Matches Products Page Hero Design Exactly)
          ========================================================= */}
      <PageHero
        crumbs={[{ label: 'Calculators' }]}
        label="OUR CALCULATORS"
        title="Transformers & Engineering Calculators"
        desc="15 professional-grade electrical calculators for transformer sizing, cable selection, losses & efficiency analysis, total cost of ownership (TCO), and global commodity benchmarks."
        image="/assets/images/factory-bg.png"
      >
        <a className="btn btn--primary" href="#calculators-main">Explore Calculators</a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      {/* =========================================================
          MAIN INTERACTIVE CALCULATOR SECTION (BPEL UNIFIED STRUCTURE)
          ========================================================= */}
      <section className="sec sec--tight calc-main-section" id="calculators-main">
        <div className="wrap">
          {/* Unified Mode Switcher & Meta Row */}
          <div className="calc-mode-switch-bar">
            <div className="calc-view-switch-row">
              <button
                type="button"
                className={`calc-view-tab${viewMode === 'studio' ? ' is-active' : ''}`}
                onClick={() => setViewMode('studio')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2"></rect>
                  <line x1="8" y1="6" x2="16" y2="6"></line>
                  <line x1="16" y1="14" x2="16" y2="14.01"></line>
                  <line x1="12" y1="14" x2="12" y2="14.01"></line>
                  <line x1="8" y1="14" x2="8" y2="14.01"></line>
                  <line x1="16" y1="18" x2="16" y2="18.01"></line>
                  <line x1="12" y1="18" x2="12" y2="18.01"></line>
                  <line x1="8" y1="18" x2="8" y2="18.01"></line>
                </svg>
                <span>Calculator Studio (Card View)</span>
              </button>
              <button
                type="button"
                className={`calc-view-tab${viewMode === 'directory' ? ' is-active' : ''}`}
                onClick={() => setViewMode('directory')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>15-Tool Directory</span>
              </button>
            </div>

            <div className="calc-switch-meta">
              <span className="calc-switch-pill">15 Specialized Tools</span>
              <span className="calc-switch-pill calc-switch-pill--accent">IEC 60076 Compliant</span>
            </div>
          </div>

          {/* =========================================================
              VIEW 1: 15-TOOL DIRECTORY (CATEGORY FILTER & SEARCH)
              ========================================================= */}
          {viewMode === 'directory' && (
            <div className="calc-directory-wrap">
              <div className="calc-dir-intro">
                <span className="label">ENGINEERING SUITE</span>
                <h2>Professional Transformer Calculators</h2>
                <p className="lead">
                  15 specialized electrical calculators categorized by engineering discipline. Click any tool below to launch live computations.
                </p>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="calc-toolbar">
                <div className="calc-search-box">
                  <svg className="calc-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search calculators (e.g. kVA, losses, cable, short circuit, TCO)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="calc-search-input"
                    aria-label="Search engineering calculators"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="calc-search-clear"
                      aria-label="Clear search"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <div className="calc-cat-nav" role="tablist" aria-label="Filter calculators">
                  {CALCULATOR_CATEGORIES.map(cat => {
                    const isActive = activeTab === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveTab(cat)}
                        role="tab"
                        aria-selected={isActive}
                        className={`calc-cat-pill${isActive ? ' is-active' : ''}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category Groups */}
              <div className="calc-category-groups">
                {CATEGORY_SECTIONS.map(sec => {
                  if (activeTab !== 'All' && activeTab !== sec.title) return null;
                  const secTools = filteredCalculators.filter(t => t.category === sec.title);
                  if (secTools.length === 0) return null;

                  return (
                    <div key={sec.id} id={sec.id} className="calc-category-group">
                      <div className="calc-cat-group-head">
                        <div className="calc-cat-group-title-col">
                          <span className="calc-cat-group-num">{sec.num}</span>
                          <div>
                            <span className="label" style={{ marginBottom: '0.2rem' }}>{sec.tag}</span>
                            <h3 className="calc-cat-group-title">{sec.title}</h3>
                          </div>
                        </div>
                        <p className="calc-cat-group-desc">{sec.desc}</p>
                      </div>

                      <div className="calc-cards-grid">
                        {secTools.map(tool => (
                          <article
                            key={tool.id}
                            className="calc-card"
                            onClick={() => {
                              setActiveToolId(tool.id);
                              setViewMode('studio');
                              if (typeof window !== 'undefined' && window.history?.replaceState) {
                                window.history.replaceState(null, '', `/calculators/${tool.id}/`);
                              }
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                          >
                            <span className="calc-card-watermark">{tool.num}</span>

                            <div className="calc-card-top">
                              <div className="calc-card-accent-bar"></div>
                              <span className="calc-card-num">{tool.num}</span>
                              <span className="calc-card-badge">{tool.badge}</span>
                            </div>

                            <h4 className="calc-card-title">{tool.title}</h4>
                            <p className="calc-card-desc">{tool.shortDesc}</p>

                            <div className="calc-card-foot">
                              <span className="calc-card-launch-label">Launch Calculator</span>
                              <span className="calc-card-btn-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M7 17L17 7"></path>
                                  <path d="M7 7h10v10"></path>
                                </svg>
                              </span>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

      

            {/* =========================================================
              VIEW 2: CARD STUDIO LAYOUT (EMIRATES TRANSFORMER STYLE)
              ========================================================= */}
          {viewMode === 'studio' && (
            <div className="calc-studio-layout">
              {/* Left Sticky Sidebar */}
              <aside className="calc-studio-sidebar" aria-label="Calculators List">
                <button
                  type="button"
                  className="calc-sidebar-back-btn"
                  onClick={() => setViewMode('directory')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>All Calculators Directory</span>
                </button>

                <div className="calc-sidebar-list">
                  <div style={{ padding: '0.5rem 0.75rem 0.25rem', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748B' }}>
                    Calculator Suite (15 Tools)
                  </div>
                  {CALCULATORS_DATA.map(tool => {
                    const isActive = tool.id === activeToolId;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        className={`calc-sidebar-item${isActive ? ' is-active' : ''}`}
                        onClick={() => {
                          setActiveToolId(tool.id);
                          if (typeof window !== 'undefined' && window.history?.replaceState) {
                            window.history.replaceState(null, '', `/calculators/${tool.id}/`);
                          }
                        }}
                      >
                        <span className="calc-sidebar-icon">
                          {TOOL_ICONS[tool.id]}
                        </span>
                        <span className="calc-sidebar-title">{tool.title}</span>
                        <span className="calc-sidebar-num">{tool.num}</span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Main Column */}
              <main className="calc-studio-main">
                {/* Clean, Elevated White Card */}
                <div className="calc-main-card">
                  {/* Card Toolbar / Header */}
                  <div className="calc-card-toolbar">
                    <div>
                      <div className="calc-toolbar-meta">
                        <span className="calc-badge-std">{activeTool.category}</span>
                        <span className="calc-badge-std calc-badge-alt">{activeTool.standard}</span>
                      </div>
                      <h2 style={{ margin: '0.4rem 0 0.15rem', fontSize: '1.45rem', fontWeight: '800', color: '#0A1E3C' }}>
                        {activeTool.title}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748B' }}>
                        {activeTool.shortDesc || activeTool.desc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {activeTool.id === 'kva' && (
                        <span className="calc-formula-pill">S = P ÷ cos φ</span>
                      )}
                      {activeTool.id === 'cable-sizing' && (
                        <span className="calc-formula-pill">A = (√3 · I · L · ρ) ÷ ΔV</span>
                      )}
                      {activeTool.id === 'loss-efficiency' && (
                        <span className="calc-formula-pill">η = P_out ÷ (P_out + P_losses)</span>
                      )}
                      {activeTool.id === 'short-circuit' && (
                        <span className="calc-formula-pill">I_sc = I_nom ÷ %Z</span>
                      )}
                      {activeTool.id === 'tco' && (
                        <span className="calc-formula-pill">TCO = CapEx + A·P₀ + B·Pₖ</span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="calc-card-body">
              {/* ---------------- 01: kVA SIZING ---------------- */}
              {activeToolId === 'kva' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Input Parameters</h3>
                    <div className="calc-field-group">
                      <label className="calc-field-label">Calculation Mode</label>
                      <div className="calc-radio-group">
                        <button
                          type="button"
                          onClick={() => setKvaMode('load')}
                          className={`calc-radio-btn${kvaMode === 'load' ? ' is-active' : ''}`}
                        >
                          From Load (kW)
                        </button>
                        <button
                          type="button"
                          onClick={() => setKvaMode('current')}
                          className={`calc-radio-btn${kvaMode === 'current' ? ' is-active' : ''}`}
                        >
                          From Voltage &amp; Current
                        </button>
                      </div>
                    </div>

                    {kvaMode === 'load' ? (
                      <div className="calc-metrics-row">
                        <div className="calc-field-group">
                          <label htmlFor="kva-kw" className="calc-field-label">
                            Total Active Load
                            <span className="calc-label-tip">kW</span>
                          </label>
                          <div className="calc-input-wrapper">
                            <input
                              id="kva-kw"
                              type="number"
                              min="1"
                              value={kvaKw}
                              onChange={e => setKvaKw(e.target.value)}
                              className="calc-input"
                            />
                            <span className="calc-input-unit">kW</span>
                          </div>
                        </div>

                        <div className="calc-field-group">
                          <label htmlFor="kva-pf" className="calc-field-label">
                            Power Factor
                            <span className="calc-label-tip">cos &phi;</span>
                          </label>
                          <input
                            id="kva-pf"
                            type="number"
                            step="0.01"
                            min="0.1"
                            max="1.0"
                            value={kvaPf}
                            onChange={e => setKvaPf(e.target.value)}
                            className="calc-input"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="calc-field-group">
                          <label className="calc-field-label">System Phase</label>
                          <div className="calc-radio-group">
                            <button
                              type="button"
                              onClick={() => setKvaPhase('3')}
                              className={`calc-radio-btn${kvaPhase === '3' ? ' is-active' : ''}`}
                            >
                              Three-Phase (3&Phi;)
                            </button>
                            <button
                              type="button"
                              onClick={() => setKvaPhase('1')}
                              className={`calc-radio-btn${kvaPhase === '1' ? ' is-active' : ''}`}
                            >
                              Single-Phase (1&Phi;)
                            </button>
                          </div>
                        </div>

                        <div className="calc-metrics-row">
                          <div className="calc-field-group">
                            <label htmlFor="kva-volts" className="calc-field-label">Line Voltage (V)</label>
                            <input
                              id="kva-volts"
                              type="number"
                              value={kvaVolts}
                              onChange={e => setKvaVolts(e.target.value)}
                              className="calc-input"
                            />
                          </div>

                          <div className="calc-field-group">
                            <label htmlFor="kva-amps" className="calc-field-label">Current (A)</label>
                            <input
                              id="kva-amps"
                              type="number"
                              value={kvaAmps}
                              onChange={e => setKvaAmps(e.target.value)}
                              className="calc-input"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="calc-field-group">
                      <div className="calc-field-label">
                        <span>Future Growth / Expansion Margin</span>
                        <span className="calc-range-val">{kvaMargin}%</span>
                      </div>
                      <div className="calc-range-row">
                        <input
                          type="range"
                          min="0"
                          max="50"
                          step="5"
                          value={kvaMargin}
                          onChange={e => setKvaMargin(e.target.value)}
                          className="calc-range"
                        />
                      </div>
                      <p className="calc-field-note">
                        Typically 20% to 25% margin is standard to avoid premature transformer overload.
                      </p>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Sizing Results</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Recommended IEC Rating</div>
                        <div className="calc-result-main">
                          {kvaPick ? `${kvaPick.toLocaleString()} kVA` : 'Custom Spec'}
                        </div>
                        <p className="calc-result-sub">
                          Base load: <strong>{fmt(kvaBase, 1)} kVA</strong> + {kvaMargin}% expansion margin = <strong>{fmt(kvaRequired, 1)} kVA</strong> required.
                        </p>
                      </div>

                      <div className="calc-field-group">
                        <label className="calc-field-label">Standard IEC 60076 Ratings</label>
                        <div className="calc-rating-strip">
                          {STANDARD_KVA.map(r => (
                            <button
                              key={r}
                              type="button"
                              className={`calc-rating-chip${r === kvaPick ? ' is-selected' : ''}`}
                              onClick={() => {}}
                            >
                              {r.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Applied Formula</span>
                        <code className="calc-formula-math">
                          {kvaMode === 'load'
                            ? `kVA = (kW ÷ cos φ) × (1 + Margin%) = (${kvaKw} ÷ ${kvaPf}) × 1.${kvaMargin} = ${fmt(kvaRequired, 1)} kVA`
                            : `kVA = (√3 × V × I ÷ 1000) × (1 + Margin%) = (1.732 × ${kvaVolts} × ${kvaAmps} ÷ 1000) × 1.${kvaMargin}`}
                        </code>
                      </div>

                      <div className="calc-actions-row">
                        <Link href="/contact/" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <span>Request Datasheet for {kvaPick || 1000} kVA</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 02: SIZING ADVISOR WIZARD ---------------- */}
              {activeToolId === 'sizing-advisor' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Application Profile</h3>
                    <div className="calc-field-group">
                      <label htmlFor="adv-app" className="calc-field-label">Application Type</label>
                      <select id="adv-app" value={advisorApp} onChange={e => setAdvisorApp(e.target.value)} className="calc-select">
                        <option value="industrial">Heavy Manufacturing / Factory / Industrial Plant</option>
                        <option value="commercial">Commercial High-Rise / Hospital / Basement</option>
                        <option value="solar">Solar PV / Renewable Inverter Duty Step-Up</option>
                        <option value="utility">Grid Substation / Transmission Stepping</option>
                      </select>
                    </div>

                    <div className="calc-field-group">
                      <label htmlFor="adv-env" className="calc-field-label">Installation Environment</label>
                      <select id="adv-env" value={advisorEnv} onChange={e => setAdvisorEnv(e.target.value)} className="calc-select">
                        <option value="outdoor">Outdoor Substation Yard (IP55 / IP65)</option>
                        <option value="indoor">Indoor Electrical Room / Basement (Fire Hazard Safe)</option>
                      </select>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="adv-volt" className="calc-field-label">Primary Voltage</label>
                        <select id="adv-volt" value={advisorVoltage} onChange={e => setAdvisorVoltage(e.target.value)} className="calc-select">
                          <option value="11">11 kV</option>
                          <option value="22">22 kV</option>
                          <option value="33">33 kV</option>
                        </select>
                      </div>

                      <div className="calc-field-group">
                        <label htmlFor="adv-amb" className="calc-field-label">Design Ambient Temp</label>
                        <select id="adv-amb" value={advisorAmbient} onChange={e => setAdvisorAmbient(e.target.value)} className="calc-select">
                          <option value="40">40°C Standard (IEC 60076)</option>
                          <option value="50">50°C Tropical / Desert Heavy Duty</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Recommended Transformer Architecture</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Recommended Unit Type</div>
                        <div className="calc-result-main" style={{ fontSize: '1.45rem' }}>
                          {advisorResult.type}
                        </div>
                        <p className="calc-result-sub">
                          Cooling: <strong>{advisorResult.cooling}</strong> | Tank: <strong>{advisorResult.tank}</strong>
                        </p>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Key Engineering Features</span>
                        <ul className="ticks" style={{ margin: 0, paddingLeft: 0, fontSize: '0.85rem' }}>
                          {advisorResult.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="calc-actions-row">
                        <Link href="/products/" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <span>Explore This Transformer Series</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 03: CABLE SIZING ---------------- */}
              {activeToolId === 'cable-sizing' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Cable Run Parameters</h3>
                    <div className="calc-field-group">
                      <label className="calc-field-label">Conductor Material</label>
                      <div className="calc-radio-group">
                        <button
                          type="button"
                          onClick={() => setCableMaterial('cu')}
                          className={`calc-radio-btn${cableMaterial === 'cu' ? ' is-active' : ''}`}
                        >
                          Copper (Cu - 99.9% ETP)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCableMaterial('al')}
                          className={`calc-radio-btn${cableMaterial === 'al' ? ' is-active' : ''}`}
                        >
                          Aluminium (Al - EC Grade)
                        </button>
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="c-amps" className="calc-field-label">Design Current (A)</label>
                        <input id="c-amps" type="number" value={cableAmps} onChange={e => setCableAmps(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="c-len" className="calc-field-label">Cable Length (m)</label>
                        <input id="c-len" type="number" value={cableLength} onChange={e => setCableLength(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="c-volt" className="calc-field-label">System Voltage (V)</label>
                        <input id="c-volt" type="number" value={cableVoltage} onChange={e => setCableVoltage(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="c-drop" className="calc-field-label">Max Allowed Drop (%)</label>
                        <input id="c-drop" type="number" step="0.5" value={cableMaxDrop} onChange={e => setCableMaxDrop(e.target.value)} className="calc-input" />
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Conductor Cross-Section</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Recommended Conductor Size</div>
                        <div className="calc-result-main">{cableSelected} mm²</div>
                        <p className="calc-result-sub">
                          Minimum calculated: <strong>{fmt(cableMinArea, 1)} mm²</strong> | Actual Voltage Drop: <strong>{fmt(cableActualDropPct, 2)}% ({fmt(cableActualDropV, 1)} V)</strong>.
                        </p>
                      </div>

                      <div className="calc-metrics-row">
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Max Drop Limit</span>
                          <span className="calc-metric-val">{cableMaxDrop}%</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Actual Drop</span>
                          <span className="calc-metric-val">{fmt(cableActualDropPct, 2)}%</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Material</span>
                          <span className="calc-metric-val">{cableMaterial === 'cu' ? 'Copper' : 'Aluminium'}</span>
                        </div>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Applied Sizing Formula</span>
                        <code className="calc-formula-math">
                          S = (&radic;3 &times; I &times; L &times; &rho; &times; cos &phi;) &divide; &Delta;V
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 04: LOSS & EFFICIENCY ---------------- */}
              {activeToolId === 'loss-efficiency' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Guaranteed Losses Input</h3>
                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="l-kva" className="calc-field-label">Rating (kVA)</label>
                        <input id="l-kva" type="number" value={lossKva} onChange={e => setLossKva(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="l-p0" className="calc-field-label">No-Load Core Loss P₀ (W)</label>
                        <input id="l-p0" type="number" value={lossP0} onChange={e => setLossP0(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="l-pk" className="calc-field-label">Full Load Copper Loss Pₖ (W)</label>
                        <input id="l-pk" type="number" value={lossPk} onChange={e => setLossPk(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="l-pf" className="calc-field-label">Load Power Factor</label>
                        <input id="l-pf" type="number" step="0.05" value={lossPf} onChange={e => setLossPf(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-field-group">
                      <div className="calc-field-label">
                        <span>Operating Load Factor</span>
                        <span className="calc-range-val">{lossFactor}%</span>
                      </div>
                      <input type="range" min="10" max="120" step="5" value={lossFactor} onChange={e => setLossFactor(e.target.value)} className="calc-range" />
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Efficiency Performance</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Operating Efficiency</div>
                        <div className="calc-result-main">{fmt(lossEfficiency, 2)}%</div>
                        <p className="calc-result-sub">
                          Total Losses @ {lossFactor}% load: <strong>{fmt(lossTotalKw, 2)} kW</strong> (Core: {lossP0Kw} kW, Copper: {fmt(Math.pow(lossLoadFraction, 2) * lossPkKw, 2)} kW).
                        </p>
                      </div>

                      <div className="calc-metrics-row">
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Annual Energy Waste</span>
                          <span className="calc-metric-val">{fmt(lossTotalKw * 8760, 0)} kWh</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Eco Tier</span>
                          <span className="calc-metric-val">Tier 2 EcoDesign</span>
                        </div>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">IEC Efficiency Formula</span>
                        <code className="calc-formula-math">
                          &eta; = [P_out &divide; (P_out + P₀ + x² &times; P_k)] &times; 100
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 05: TCO ---------------- */}
              {activeToolId === 'tco' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Lifecycle &amp; Financial Parameters</h3>
                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="tco-p" className="calc-field-label">Purchase Price ($)</label>
                        <input id="tco-p" type="number" value={tcoPrice} onChange={e => setTcoPrice(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="tco-tar" className="calc-field-label">Electricity Cost ($/kWh)</label>
                        <input id="tco-tar" type="number" step="0.01" value={tcoTariff} onChange={e => setTcoTariff(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="tco-p0" className="calc-field-label">No-Load Loss P₀ (kW)</label>
                        <input id="tco-p0" type="number" step="0.1" value={tcoP0} onChange={e => setTcoP0(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="tco-pk" className="calc-field-label">Full Load Loss Pₖ (kW)</label>
                        <input id="tco-pk" type="number" step="0.5" value={tcoPk} onChange={e => setTcoPk(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="tco-yrs" className="calc-field-label">Operating Life (Years)</label>
                        <input id="tco-yrs" type="number" value={tcoYears} onChange={e => setTcoYears(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="tco-load" className="calc-field-label">Average Load Factor (%)</label>
                        <input id="tco-load" type="number" value={tcoLoad} onChange={e => setTcoLoad(e.target.value)} className="calc-input" />
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Total Cost of Ownership</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">{tcoYears}-Year Total Capitalized Cost</div>
                        <div className="calc-result-main">${fmt(tcoTotalLifecycle, 0)}</div>
                        <p className="calc-result-sub">
                          Purchase Price: <strong>${fmt(toNum(tcoPrice), 0)}</strong> ({(toNum(tcoPrice) / (tcoTotalLifecycle || 1) * 100).toFixed(0)}%) | Lifetime Energy Losses: <strong>${fmt(tcoLifetimeLossCost, 0)}</strong> ({(tcoLifetimeLossCost / (tcoTotalLifecycle || 1) * 100).toFixed(0)}%).
                        </p>
                      </div>

                      <div className="calc-metrics-row">
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Annual Loss Expense</span>
                          <span className="calc-metric-val">${fmt(tcoAnnualLossCost, 0)}/yr</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Lifetime</span>
                          <span className="calc-metric-val">{tcoYears} Years</span>
                        </div>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">IEEE C57.120 Evaluation</span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                          In heavy power systems, operational energy losses often represent 70–80% of total lifecycle cost, far exceeding initial tender equipment price.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 06: VOLTAGE DROP ---------------- */}
              {activeToolId === 'voltage-drop' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Transformer &amp; Load Inputs</h3>
                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="vd-v" className="calc-field-label">No-Load Voltage (V)</label>
                        <input id="vd-v" type="number" value={vdVoltage} onChange={e => setVdVoltage(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="vd-i" className="calc-field-label">Secondary Current (A)</label>
                        <input id="vd-i" type="number" value={vdCurrent} onChange={e => setVdCurrent(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="vd-z" className="calc-field-label">Transformer Impedance (%Z)</label>
                        <input id="vd-z" type="number" step="0.25" value={vdZ} onChange={e => setVdZ(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="vd-pf" className="calc-field-label">Power Factor (cos &phi;)</label>
                        <input id="vd-pf" type="number" step="0.05" value={vdPf} onChange={e => setVdPf(e.target.value)} className="calc-input" />
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Terminal Regulation</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Full Load Terminal Voltage</div>
                        <div className="calc-result-main">{fmt(vdTerminalV, 1)} V</div>
                        <p className="calc-result-sub">
                          Voltage Regulation: <strong>{fmt(vdDropPct, 2)}%</strong> (Total internal transformer voltage drop: <strong>{fmt(vdDropV, 1)} V</strong>).
                        </p>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Regulation Formula</span>
                        <code className="calc-formula-math">
                          &Delta;V% = %Z &times; (I_load &divide; I_rated) &times; cos &phi;
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 07: OVERLOAD ---------------- */}
              {activeToolId === 'overload' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Thermal Loading Conditions</h3>
                    <div className="calc-field-group">
                      <label htmlFor="ov-kva" className="calc-field-label">Base Rating (kVA)</label>
                      <input id="ov-kva" type="number" value={ovKva} onChange={e => setOvKva(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="ov-prior" className="calc-field-label">Pre-Load Before Peak (%)</label>
                        <input id="ov-prior" type="number" value={ovPriorLoad} onChange={e => setOvPriorLoad(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="ov-amb" className="calc-field-label">Ambient Temp (°C)</label>
                        <input id="ov-amb" type="number" value={ovAmbient} onChange={e => setOvAmbient(e.target.value)} className="calc-input" />
                      </div>
                    </div>

                    <div className="calc-field-group">
                      <div className="calc-field-label">
                        <span>Target Emergency Load</span>
                        <span className="calc-range-val">{ovTarget}%</span>
                      </div>
                      <input type="range" min="100" max="160" step="5" value={ovTarget} onChange={e => setOvTarget(e.target.value)} className="calc-range" />
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Permissible Overload Duration</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">IEC 60076-7 Guidance</div>
                        <div className="calc-result-main" style={{ fontSize: '1.6rem' }}>{ovAllowedHours}</div>
                        <p className="calc-result-sub">
                          Peak Load: <strong>{fmt((toNum(ovKva) * toNum(ovTarget)) / 100, 0)} kVA</strong> at {ovAmbient}°C ambient. Hotspot winding temperature remains within thermal class bounds.
                        </p>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Hotspot Temperature Alert</span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                          Continuous operation above 120°C hotspot accelerates Kraft paper insulation ageing. For emergency overloads above 130%, forced fan cooling (ONAF) or heat exchangers are mandated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 08: SHORT CIRCUIT ---------------- */}
              {activeToolId === 'short-circuit' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Transformer Rating &amp; %Z</h3>
                    <div className="calc-field-group">
                      <label htmlFor="sc-kva" className="calc-field-label">Rating (kVA)</label>
                      <input id="sc-kva" type="number" value={scKva} onChange={e => setScKva(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="sc-v2" className="calc-field-label">Secondary Voltage (V)</label>
                        <input id="sc-v2" type="number" value={scV2} onChange={e => setScV2(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="sc-z" className="calc-field-label">Short Circuit %Z</label>
                        <input id="sc-z" type="number" step="0.25" value={scZ} onChange={e => setScZ(e.target.value)} className="calc-input" />
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Fault Level Calculation</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Symmetrical Fault Current (Isc)</div>
                        <div className="calc-result-main">{fmt(scIscKa, 2)} kA</div>
                        <p className="calc-result-sub">
                          Secondary Rated Current (In): <strong>{fmt(scInAmps, 1)} A</strong> | Short Circuit Fault Power: <strong>{fmt(scFaultMva, 1)} MVA</strong>.
                        </p>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Applied Standard Formula</span>
                        <code className="calc-formula-math">
                          I_sc = I_rated &divide; (%Z &divide; 100) = {fmt(scInAmps, 1)} &divide; {toNum(scZ) / 100} = {fmt(scIscKa, 2)} kA
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 09: UNIT CONVERTER ---------------- */}
              {activeToolId === 'unit-converter' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Select Unit Category</h3>
                    <div className="calc-field-group">
                      <label htmlFor="uc-type" className="calc-field-label">Conversion Category</label>
                      <select id="uc-type" value={ucType} onChange={e => setUcType(e.target.value)} className="calc-select">
                        <option value="power">Apparent Power &amp; Mechanical (kVA / kW / HP)</option>
                        <option value="temp">Temperature &amp; Thermal Rise (°C / °F / K)</option>
                        <option value="cable">Cable Cross-Section (mm² / AWG / kcmil)</option>
                        <option value="flux">Magnetic Flux Density (Tesla / Gauss / lines/in²)</option>
                        <option value="pressure">Pressure &amp; Oil Head (bar / PSI / kPa)</option>
                      </select>
                    </div>

                    <div className="calc-field-group">
                      <label htmlFor="uc-val" className="calc-field-label">Input Value to Convert</label>
                      <input id="uc-val" type="number" value={ucVal} onChange={e => setUcVal(e.target.value)} className="calc-input" />
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Conversion Matrix</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Base Quantity</div>
                        <div className="calc-result-main" style={{ fontSize: '1.6rem' }}>{ucResult.from}</div>
                      </div>

                      <div className="calc-metrics-row">
                        {ucResult.results.map((r, i) => (
                          <div key={i} className="calc-metric-tile">
                            <span className="calc-metric-lbl">{r.label}</span>
                            <span className="calc-metric-val">{r.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 10: TAP CHANGER ---------------- */}
              {activeToolId === 'tap-changer' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Tap Configuration</h3>
                    <div className="calc-field-group">
                      <label htmlFor="tc-prim" className="calc-field-label">Nominal Primary Voltage (kV)</label>
                      <input id="tc-prim" type="number" value={tcVprim} onChange={e => setTcVprim(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="tc-step" className="calc-field-label">Tap Step (%)</label>
                        <select id="tc-step" value={tcStep} onChange={e => setTcStep(e.target.value)} className="calc-select">
                          <option value="2.5">2.5% Standard</option>
                          <option value="1.25">1.25% Fine Step</option>
                          <option value="5.0">5.0% Wide Step</option>
                        </select>
                      </div>

                      <div className="calc-field-group">
                        <label htmlFor="tc-range" className="calc-field-label">Number of Taps</label>
                        <select id="tc-range" value={tcRange} onChange={e => setTcRange(e.target.value)} className="calc-select">
                          <option value="2">&plusmn;2 Steps (5 Taps Total)</option>
                          <option value="3">&plusmn;3 Steps (7 Taps Total)</option>
                          <option value="4">&plusmn;4 Steps (9 Taps Total)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Tap Position Voltage Table</h3>
                    <div className="calc-result-card" style={{ padding: 0, overflow: 'hidden' }}>
                      <table className="calc-tap-table">
                        <thead>
                          <tr>
                            <th>Tap #</th>
                            <th>Variation</th>
                            <th>Primary Voltage</th>
                            <th>Regulated Secondary</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tcRows.map(r => (
                            <tr key={r.tapNum} className={r.isNominal ? 'is-nominal' : ''}>
                              <td>Tap {r.tapNum} {r.isNominal && '(Nominal)'}</td>
                              <td>{r.stepLabel}</td>
                              <td>{r.primV}</td>
                              <td>{r.secV}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 11: OIL VOLUME & WEIGHT ---------------- */}
              {activeToolId === 'oil-volume' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Transformer Sizing &amp; Tank</h3>
                    <div className="calc-field-group">
                      <label htmlFor="oil-kva" className="calc-field-label">Transformer Rating (kVA)</label>
                      <input id="oil-kva" type="number" value={oilKva} onChange={e => setOilKva(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-field-group">
                      <label htmlFor="oil-type" className="calc-field-label">Tank Construction</label>
                      <select id="oil-type" value={oilType} onChange={e => setOilType(e.target.value)} className="calc-select">
                        <option value="sealed">Hermetically Sealed Corrugated Fin Tank</option>
                        <option value="conservator">Free-Breathing Conservator Tank with Silica Breather</option>
                      </select>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Estimated Dielectric Fluid</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Required Insulating Oil</div>
                        <div className="calc-result-main">~{oilLiters.toLocaleString()} Liters</div>
                        <p className="calc-result-sub">
                          Equivalent Weight: <strong>~{oilWeightKg.toLocaleString()} kg</strong> (Density based on IEC 60296 uninhibited mineral transformer oil @ 0.885 kg/L).
                        </p>
                      </div>

                      <div className="calc-formula-explainer">
                        <span className="calc-explainer-title">Tank Geometry Note</span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                          Hermetically sealed units consume approximately 20% less oil volume than conservator systems due to the absence of external expansion vessel requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 12: CURRENCY CONVERTER ---------------- */}
              {activeToolId === 'currency-converter' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Procurement Quotation Input</h3>
                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="curr-amt" className="calc-field-label">Amount</label>
                        <input id="curr-amt" type="number" value={currAmount} onChange={e => setCurrAmount(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="curr-base" className="calc-field-label">Base Currency</label>
                        <select id="curr-base" value={currBase} onChange={e => setCurrBase(e.target.value)} className="calc-select">
                          <option value="USD">USD - US Dollar ($)</option>
                          <option value="BDT">BDT - Bangladesh Taka (৳)</option>
                          <option value="AED">AED - UAE Dirham (د.إ)</option>
                          <option value="EUR">EUR - Euro (€)</option>
                          <option value="GBP">GBP - British Pound (£)</option>
                          <option value="SAR">SAR - Saudi Riyal (﷼)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Multi-Currency Evaluation</h3>
                    <div className="calc-result-card">
                      <div className="calc-metrics-row">
                        {currConverted.map(c => (
                          <div key={c.code} className="calc-metric-tile">
                            <span className="calc-metric-lbl">{c.code} Equivalent</span>
                            <span className="calc-metric-val">{c.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 13: COMMODITY MONITOR ---------------- */}
              {activeToolId === 'commodities' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Benchmark Commodity Rates</h3>
                    <p className="calc-field-note" style={{ marginBottom: '1rem' }}>
                      Raw materials represent up to 65% of transformer manufacturing cost. Monitor active London Metal Exchange (LME) benchmarks:
                    </p>
                    <div className="calc-commodity-list">
                      {COMMODITIES.map((c, i) => (
                        <div key={i} className="calc-commodity-item">
                          <div>
                            <div className="calc-commodity-name">{c.name}</div>
                            <div className="calc-commodity-unit">International Benchmark</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div className="calc-commodity-price">{c.price}</div>
                            <span className={`calc-commodity-change ${c.status}`}>{c.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Procurement Advisory</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Price Protection Mechanism</div>
                        <div className="calc-result-main" style={{ fontSize: '1.45rem' }}>Fixed Contract Price Guarantee</div>
                        <p className="calc-result-sub">
                          BPEL offers raw material price hedging options for long-lead 132kV / 33kV substation contracts to protect project baselines from global copper volatility.
                        </p>
                      </div>

                      <div className="calc-actions-row">
                        <Link href="/contact/" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
                          <span>Request Firm Pricing Baseline</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 14: MATERIAL COST ESTIMATOR ---------------- */}
              {activeToolId === 'material-cost' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Unit Sizing &amp; Conductor</h3>
                    <div className="calc-field-group">
                      <label htmlFor="mat-kva" className="calc-field-label">Transformer Rating (kVA)</label>
                      <input id="mat-kva" type="number" value={matKva} onChange={e => setMatKva(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-field-group">
                      <label htmlFor="mat-cond" className="calc-field-label">Winding Conductor</label>
                      <select id="mat-cond" value={matConductor} onChange={e => setMatConductor(e.target.value)} className="calc-select">
                        <option value="cu">Electrolytic Copper (99.99% ETP)</option>
                        <option value="al">Electrical Aluminium EC Grade</option>
                      </select>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Active Part Mass Breakdown</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">Estimated Active Part Weight</div>
                        <div className="calc-result-main">~{matBreakdown.totalWeightKg.toLocaleString()} kg</div>
                        <p className="calc-result-sub">
                          Estimated active material mass for a standard {matKva} kVA distribution transformer.
                        </p>
                      </div>

                      <div className="calc-metrics-row">
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Winding Metal</span>
                          <span className="calc-metric-val">{matBreakdown.condWeightKg.toLocaleString()} kg</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">CRGO Core</span>
                          <span className="calc-metric-val">{matBreakdown.coreWeightKg.toLocaleString()} kg</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Dielectric Oil</span>
                          <span className="calc-metric-val">{matBreakdown.oilWeightKg.toLocaleString()} kg</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Tank &amp; Frame</span>
                          <span className="calc-metric-val">{matBreakdown.steelTankKg.toLocaleString()} kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- 15: CO2 SAVINGS ---------------- */}
              {activeToolId === 'co2-savings' && (
                <div className="calc-tool-grid">
                  <div className="calc-form-pane">
                    <h3 className="calc-pane-title">Energy Savings Comparison</h3>
                    <div className="calc-field-group">
                      <label htmlFor="co2-kva" className="calc-field-label">Transformer Rating (kVA)</label>
                      <input id="co2-kva" type="number" value={co2Kva} onChange={e => setCo2Kva(e.target.value)} className="calc-input" />
                    </div>

                    <div className="calc-metrics-row">
                      <div className="calc-field-group">
                        <label htmlFor="co2-loss" className="calc-field-label">Reduced Losses vs Standard (kW)</label>
                        <input id="co2-loss" type="number" step="0.1" value={co2DeltaKw} onChange={e => setCo2DeltaKw(e.target.value)} className="calc-input" />
                      </div>
                      <div className="calc-field-group">
                        <label htmlFor="co2-factor" className="calc-field-label">Grid Factor (kg CO₂/kWh)</label>
                        <input id="co2-factor" type="number" step="0.01" value={co2EmissionFactor} onChange={e => setCo2EmissionFactor(e.target.value)} className="calc-input" />
                      </div>
                    </div>
                  </div>

                  <div className="calc-result-pane">
                    <h3 className="calc-pane-title">Lifecycle Carbon Reduction</h3>
                    <div className="calc-result-card">
                      <div className="calc-result-hero-box">
                        <div className="calc-result-label">30-Year Carbon Reduction</div>
                        <div className="calc-result-main">{fmt(co2ThirtyYearTonnes, 1)} Tonnes CO₂</div>
                        <p className="calc-result-sub">
                          Annual reduction: <strong>{fmt(co2AnnualTonnes, 1)} tonnes/year</strong> ({fmt(co2AnnualMwh, 1)} MWh saved annually).
                        </p>
                      </div>

                      <div className="calc-metrics-row">
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Equivalent Trees</span>
                          <span className="calc-metric-val">~{co2TreesEquivalent.toLocaleString()} Trees</span>
                        </div>
                        <div className="calc-metric-tile">
                          <span className="calc-metric-lbl">Eco Standard</span>
                          <span className="calc-metric-val">Tier 2 EcoDesign</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
                  </div>
                </div>

                {/* =========================================================
                    TRANSFORMER SIZING FORMULAS & DEFINITIONS
                    ========================================================= */}
                {activeTool.id === 'kva' && (
                  <div className="calc-formulas-section">
                    <div className="calc-formulas-header">
                      <div className="calc-formulas-title-wrap">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B5CAB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                          <line x1="8" y1="7" x2="16" y2="7"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                        <h3 className="calc-formulas-title">Transformer Sizing Formulas &amp; Definitions</h3>
                      </div>
                      <span className="calc-badge-std">IEC 60076 &amp; IEEE C57</span>
                    </div>

                    <div className="calc-formulas-body">
                      {/* 1. Sizing Formulas */}
                      <div>
                        <div className="calc-subhead-row">
                          <h4 className="calc-subhead-title">1. Essential Transformer Sizing Formulas</h4>
                          <span className="calc-subhead-line"></span>
                        </div>

                        <div className="calc-formulas-grid">
                          {/* Formula 1 */}
                          <div className="calc-formula-card">
                            <div className="calc-formula-card-top">
                              <span className="calc-formula-card-tag">Core Formula</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>3-Phase Load</span>
                            </div>
                            <h5 className="calc-formula-card-title">Sizing from Active Load (kW)</h5>
                            <div className="calc-formula-math-display">
                              kVA = (kW ÷ cos φ) × (1 + Margin%)
                            </div>
                            <ul className="calc-formula-vars">
                              <li><strong>kW:</strong> Total active real power of connected equipment</li>
                              <li><strong>cos φ:</strong> Operating load power factor (typically 0.80 – 0.90)</li>
                              <li><strong>Margin%:</strong> Expansion reserve (standard 20% to 25%)</li>
                            </ul>
                          </div>

                          {/* Formula 2 */}
                          <div className="calc-formula-card">
                            <div className="calc-formula-card-top">
                              <span className="calc-formula-card-tag">Current Method</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>3-Phase Voltage</span>
                            </div>
                            <h5 className="calc-formula-card-title">Sizing from Voltage &amp; Current</h5>
                            <div className="calc-formula-math-display">
                              kVA = (√3 × V × I ÷ 1000) × (1 + Margin%)
                            </div>
                            <ul className="calc-formula-vars">
                              <li><strong>√3:</strong> 1.73205 (Three-phase line multiplier)</li>
                              <li><strong>V:</strong> Line-to-line operational voltage (e.g. 400V, 415V, 11kV)</li>
                              <li><strong>I:</strong> Full load aggregate circuit current (Amperes)</li>
                            </ul>
                          </div>

                          {/* Formula 3 */}
                          <div className="calc-formula-card">
                            <div className="calc-formula-card-top">
                              <span className="calc-formula-card-tag">Single Phase</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>1-Phase System</span>
                            </div>
                            <h5 className="calc-formula-card-title">Single-Phase Transformer Sizing</h5>
                            <div className="calc-formula-math-display">
                              kVA = (V × I ÷ 1000) × (1 + Margin%)
                            </div>
                            <ul className="calc-formula-vars">
                              <li><strong>V:</strong> Line-to-neutral terminal voltage (e.g. 230V, 240V)</li>
                              <li><strong>I:</strong> Total connected single-phase load current (A)</li>
                              <li><strong>Margin%:</strong> Continuous safety &amp; inrush margin</li>
                            </ul>
                          </div>

                          {/* Formula 4 */}
                          <div className="calc-formula-card">
                            <div className="calc-formula-card-top">
                              <span className="calc-formula-card-tag">Rated Current</span>
                              <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>Secondary Full Load</span>
                            </div>
                            <h5 className="calc-formula-card-title">Full Load Secondary Current (In)</h5>
                            <div className="calc-formula-math-display">
                              In = (kVA × 1000) ÷ (√3 × Vsec)
                            </div>
                            <ul className="calc-formula-vars">
                              <li><strong>kVA:</strong> Transformer nominal nameplate rating</li>
                              <li><strong>Vsec:</strong> Secondary line voltage (e.g. 400V)</li>
                              <li><strong>In:</strong> Continuous rated current for cable &amp; ACB sizing</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* 2. Key Engineering Definitions */}
                      <div>
                        <div className="calc-subhead-row">
                          <h4 className="calc-subhead-title">2. Transformer Engineering Definitions</h4>
                          <span className="calc-subhead-line"></span>
                        </div>

                        <div className="calc-defs-grid">
                          {/* Def 1 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Apparent Power</span>
                              <span className="calc-def-symbol">S (kVA / MVA)</span>
                            </div>
                            <p className="calc-def-desc">
                              The vector sum of active (real) power and reactive power (S = √(P² + Q²)). Transformers are universally rated in kVA because core and coil thermal dissipation is limited by total voltage and current, regardless of the load power factor.
                            </p>
                          </div>

                          {/* Def 2 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Active / Real Power</span>
                              <span className="calc-def-symbol">P (kW / MW)</span>
                            </div>
                            <p className="calc-def-desc">
                              The real usable electrical energy converted into mechanical torque, thermal heating, or lighting output by connected loads. Related to apparent power by P = S × cos φ.
                            </p>
                          </div>

                          {/* Def 3 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Power Factor</span>
                              <span className="calc-def-symbol">cos φ (PF)</span>
                            </div>
                            <p className="calc-def-desc">
                              The ratio of working power (kW) to total apparent power (kVA). Standard uncorrected industrial facilities operate between 0.80 and 0.85 lagging; power-factor corrected modern facilities target 0.95 to 0.98.
                            </p>
                          </div>

                          {/* Def 4 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Expansion Margin</span>
                              <span className="calc-def-symbol">Margin (%)</span>
                            </div>
                            <p className="calc-def-desc">
                              A reserve allowance (typically 20% to 25% under IEC 60076) added to continuous base load. Prevents premature transformer aging, accommodates motor inrush starting transients, and avoids nuisance breaker tripping.
                            </p>
                          </div>

                          {/* Def 5 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Percent Impedance</span>
                              <span className="calc-def-symbol">%Z (Uk%)</span>
                            </div>
                            <p className="calc-def-desc">
                              The percentage of rated primary voltage required to circulate full rated current with the secondary short-circuited. Governs short-circuit fault current levels, busbar mechanical bracing, and terminal voltage regulation under load.
                            </p>
                          </div>

                          {/* Def 6 */}
                          <div className="calc-def-card">
                            <div className="calc-def-head">
                              <span className="calc-def-term">Standard Preferred Ratings</span>
                              <span className="calc-def-symbol">IEC 60076-1 §4.2</span>
                            </div>
                            <p className="calc-def-desc">
                              Standardized geometric progressions of transformer ratings (100, 160, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 5000 kVA). Calculated requirements are always matched to the nearest standard manufactured rating.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Standard IEC Reference Section Below the Card (for kVA) */}
                {activeTool.id === 'kva' && (
                  <details className="calc-reference-details" open>
                    <summary className="calc-details-summary">
                      <span className="calc-details-line"></span>
                      <span>Standard kVA Ratings &amp; Typical Applications (IEC 60076)</span>
                      <svg className="calc-details-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="calc-details-table-wrap">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="calc-ref-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                          <thead>
                            <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
                              <th style={{ padding: '0.85rem 1rem', color: '#0A1E3C', fontWeight: '700' }}>Rating (kVA)</th>
                              <th style={{ padding: '0.85rem 1rem', color: '#0A1E3C', fontWeight: '700' }}>Phase &amp; Type</th>
                              <th style={{ padding: '0.85rem 1rem', color: '#0A1E3C', fontWeight: '700' }}>Typical Applications</th>
                              <th style={{ padding: '0.85rem 1rem', color: '#0A1E3C', fontWeight: '700' }}>Recommended Cooling</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0B5CAB' }}>25 – 100 kVA</td>
                              <td style={{ padding: '0.75rem 1rem' }}>1Φ / 3Φ Pole-Mounted</td>
                              <td style={{ padding: '0.75rem 1rem' }}>Rural electrification, light commercial, irrigation pumps</td>
                              <td style={{ padding: '0.75rem 1rem' }}>ONAN Sealed Tank</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0B5CAB' }}>160 – 315 kVA</td>
                              <td style={{ padding: '0.75rem 1rem' }}>3Φ Distribution</td>
                              <td style={{ padding: '0.75rem 1rem' }}>Residential housing blocks, commercial stores, workshops</td>
                              <td style={{ padding: '0.75rem 1rem' }}>ONAN / KNAN Eco-Fluid</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0B5CAB' }}>400 – 800 kVA</td>
                              <td style={{ padding: '0.75rem 1rem' }}>3Φ Pad / Substation</td>
                              <td style={{ padding: '0.75rem 1rem' }}>Medium industrial factories, shopping malls, high-rise buildings</td>
                              <td style={{ padding: '0.75rem 1rem' }}>ONAN / Cast Resin AN</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0B5CAB' }}>1,000 – 2,500 kVA</td>
                              <td style={{ padding: '0.75rem 1rem' }}>3Φ Heavy Distribution</td>
                              <td style={{ padding: '0.75rem 1rem' }}>Textile mills, heavy manufacturing, data centers, hospitals</td>
                              <td style={{ padding: '0.75rem 1rem' }}>ONAN / Cast Resin F-Class</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#0B5CAB' }}>3,150 – 5,000 kVA</td>
                              <td style={{ padding: '0.75rem 1rem' }}>3Φ Substation Primary</td>
                              <td style={{ padding: '0.75rem 1rem' }}>33kV Grid substations, renewable solar/wind generation parks</td>
                              <td style={{ padding: '0.75rem 1rem' }}>ONAF Forced Air / Conservator</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </details>
                )}

                {/* Authoritative Engineering Reference */}
                <div className="calc-auth-reference-card">
                  <div className="calc-auth-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="calc-auth-kicker">Authoritative Reference</span>
                    <h4 className="calc-auth-title">{activeTool.standard} Standards Compliance</h4>
                    <p className="calc-auth-text">
                      {activeTool.title} equations and rating progressions comply with {activeTool.standard} standards. BPEL engineers and manufactures liquid-filled and cast resin dry-type transformers certified to international standards and verified by independent test authorities.
                    </p>
                  </div>
                </div>

                {/* Next Calculator Navigation */}
                <div className="calc-next-nav-row">
                  <button
                    type="button"
                    className="calc-next-btn"
                    onClick={() => {
                      const curIdx = CALCULATORS_DATA.findIndex(c => c.id === activeTool.id);
                      const nextIdx = (curIdx + 1) % CALCULATORS_DATA.length;
                      const next = CALCULATORS_DATA[nextIdx];
                      setActiveToolId(next.id);
                      if (typeof window !== 'undefined' && window.history?.replaceState) {
                        window.history.replaceState(null, '', `/calculators/${next.id}/`);
                      }
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                  >
                    <div>
                      <span className="calc-next-label">Next Calculator</span>
                      <div className="calc-next-name">
                        {CALCULATORS_DATA[(CALCULATORS_DATA.findIndex(c => c.id === activeTool.id) + 1) % CALCULATORS_DATA.length].title}
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B5CAB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </main>
            </div>
          )}
        </div>
      </section>

{/* =========================================================
          SIGNATURE BOTTOM CONSULTATION BANNER
          ========================================================= */}
      <section className="calc-cta-sec" aria-label="Custom Calculation Support">
        <div className="wrap">
          <div className="standards-consult-box fade-in-up" style={{ marginTop: 0 }}>
            <div className="standards-consult-copy">
              <span className="standards-consult-tag">TECHNICAL CONSULTATION &amp; SIZING</span>
              <h3>Need a Custom Sizing Calculation or Substation Load Flow Study?</h3>
              <p>
                Our practicing electrical engineering team can review your single-line diagram (SLD), calculate short-circuit withstand tolerances, evaluate harmonic derating, and issue an engineered proposal.
              </p>
            </div>
            <div className="standards-consult-actions">
              <Link className="btn btn--primary" href="/contact/">
                <span>Talk to an Engineer</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
      </section>
    </div>
  );
}
