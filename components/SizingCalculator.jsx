'use client';

import { useState } from 'react';
import { STANDARD_KVA } from '@/lib/resources';

/* Estimates transformer kVA from a load (kW + power factor) or from voltage and current,
   adds a growth margin and picks the next standard rating. */
const num = v => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };
const fmt = n => n.toLocaleString(undefined, { maximumFractionDigits: 1 });

export default function SizingCalculator() {
  const [mode, setMode] = useState('load');
  const [kw, setKw] = useState('800');
  const [pf, setPf] = useState('0.85');
  const [volts, setVolts] = useState('400');
  const [amps, setAmps] = useState('1200');
  const [phase, setPhase] = useState('3');
  const [margin, setMargin] = useState('20');

  const base = mode === 'load'
    ? (num(pf) <= 1 && num(pf) > 0 ? num(kw) / num(pf) : 0)
    : (phase === '3' ? Math.sqrt(3) : 1) * num(volts) * num(amps) / 1000;
  const required = base * (1 + num(margin) / 100);
  const pick = STANDARD_KVA.find(r => r >= required);

  const field = (id, label, value, set, extra = {}) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="number" inputMode="decimal" min="0" value={value} onChange={e => set(e.target.value)} {...extra} />
    </div>
  );

  return (
    <div className="calc">
      <div className="calc__tabs" role="group" aria-label="Calculation method">
        <button type="button" aria-pressed={mode === 'load'} onClick={() => setMode('load')}>From load (kW)</button>
        <button type="button" aria-pressed={mode === 'current'} onClick={() => setMode('current')}>From voltage &amp; current</button>
      </div>

      {mode === 'load' ? (
        <div className="form__row">
          {field('calc-kw', 'Total load (kW)', kw, setKw)}
          {field('calc-pf', 'Power factor (0–1)', pf, setPf, { step: '0.01', max: '1' })}
        </div>
      ) : (
        <>
          <div className="form__row">
            {field('calc-v', 'Line voltage (V)', volts, setVolts)}
            {field('calc-a', 'Load current (A)', amps, setAmps)}
          </div>
          <div className="field">
            <label htmlFor="calc-phase">Supply</label>
            <select id="calc-phase" value={phase} onChange={e => setPhase(e.target.value)}>
              <option value="3">Three-phase</option>
              <option value="1">Single-phase</option>
            </select>
          </div>
        </>
      )}
      {field('calc-margin', 'Margin for growth (%)', margin, setMargin)}

      <div className="calc__result" aria-live="polite">
        <p style={{ margin: 0 }}>Recommended standard rating</p>
        <strong>{pick ? `${pick.toLocaleString()} kVA` : required ? 'Above 20,000 kVA' : '—'}</strong>
        <p>Load {fmt(base)} kVA + {num(margin)}% margin = {fmt(required)} kVA required.{!pick && required ? ' Contact us for a power transformer design.' : ''}</p>
      </div>

      <ul className="kva-chips" aria-label="Standard ratings">
        {STANDARD_KVA.map(r => <li key={r} className={r === pick ? 'is-pick' : ''}>{r.toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
