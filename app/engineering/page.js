import Lifecycle from '@/components/Lifecycle';
import Quality from '@/components/Quality';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { MANUFACTURING_STEPS } from '@/lib/resources';
import { waLink } from '@/lib/data';
import { WA_PATH } from '@/lib/icons';

export const metadata = {
  title: 'Engineering & Manufacturing',
  description: 'How BPEL designs, manufactures and tests transformers: a twelve-step process from technical approval to invoice submission and a full routine, type and special test programme.'
};

export default function EngineeringPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About', href: '/about/' }, { label: 'Engineering' }]} label="ENGINEERING & MANUFACTURING" title="Where Precision Meets Power"
        desc="Every transformer is designed, built and tested under one roof, so quality is controlled at each step."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg">
        <a className="btn btn--primary" href="/contact/">
          Request Technical Proposal <ArrowRight />
        </a>
        <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={WA_PATH} /></svg>
          <span>WhatsApp Chat</span>
        </a>
      </PageHero>

      <section className="sec" aria-label="Manufacturing process">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MANUFACTURING PROCESS</p>
            <h2>Twelve steps from technical approval to invoice submission</h2>
            <p className="sec-head__desc">Each stage has its own checks, so problems are caught where they start rather than at final test.</p>
          </header>
          <ol className="steps">
            {MANUFACTURING_STEPS.map((s, i) => (
              <li className="fade-in-up" data-delay={(i % 5) * 70} key={s.t}><h3>{s.t}</h3><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="lifecycle" className="sec sec--dark" aria-label="Project lifecycle"><Lifecycle /></section>

      {/* Official Certificates & Test Reports Inspection Slider */}
      <section className="sec sec--alt" aria-label="Certificates & Test Reports">
        <Quality showWhy={false} viewAll={true} />
      </section>
    </>
  );
}
