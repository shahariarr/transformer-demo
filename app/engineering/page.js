import Lifecycle from '@/components/Lifecycle';
import { PageHero, ArrowRight } from '@/components/PageParts';
import { MANUFACTURING_STEPS, TEST_GROUPS } from '@/lib/resources';

export const metadata = {
  title: 'Engineering & Manufacturing',
  description: 'How BPEL designs, manufactures and tests transformers: a ten-step manufacturing process and a full routine, type and special test programme.'
};

export default function EngineeringPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'About', href: '/about/' }, { label: 'Engineering' }]} label="ENGINEERING & MANUFACTURING" title="Where Precision Meets Power"
        desc="Every transformer is designed, built and tested under one roof, so quality is controlled at each step."
        image="/assets/images/lifecycle/04-manufacturing-fat.jpg">
        <a className="btn btn--primary" href="/contact/">Request Technical Proposal</a>
        <a className="btn btn--ghost" href="/certifications/">Certifications</a>
      </PageHero>

      <section className="sec" aria-label="Manufacturing process">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">MANUFACTURING PROCESS</p>
            <h2>Ten steps from design to dispatch</h2>
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

      <section className="sec sec--alt" aria-label="Test programme">
        <div className="wrap">
          <header className="sec-head fade-in-up">
            <p className="label">TESTING</p>
            <h2>Tested before it leaves the factory</h2>
            <p className="sec-head__desc">Tests follow the IEC 60076 series. Customers are welcome to witness factory acceptance testing.</p>
          </header>
          <div className="lgrid">
            {TEST_GROUPS.map((g, i) => (
              <div className="panel fade-in-up" data-delay={i * 80} key={g.t}>
                <h3>{g.t}</h3>
                <p style={{ margin: 0, color: 'var(--ink-2)' }}>{g.d}</p>
                <ul className="ticks">{g.items.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="fade-in-up" style={{ marginTop: '2rem' }}>
            <a className="btn btn--primary" href="/certifications/">View Test Reports <ArrowRight /></a>
          </p>
        </div>
      </section>
    </>
  );
}
