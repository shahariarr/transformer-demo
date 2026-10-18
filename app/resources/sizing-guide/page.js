import SizingCalculator from '@/components/SizingCalculator';
import { PageHero, ArrowRight } from '@/components/PageParts';

export const metadata = {
  title: 'Transformer Sizing Guide',
  description: 'Estimate the transformer kVA rating you need from your load or current, and pick the next standard rating.'
};

export default function SizingGuidePage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources/' }, { label: 'Sizing Guide' }]} label="RESOURCES" title="Transformer Sizing Guide"
        desc="A quick estimate of the kVA rating your project needs. Our engineers confirm the final size from your full load data." />

      <section className="sec" aria-label="Sizing calculator">
        <div className="wrap split">
          <div className="panel fade-in-left">
            <h3>kVA calculator</h3>
            <SizingCalculator />
          </div>
          <div className="detail__content">
            <div className="fade-in-up">
              <h2>How the estimate works</h2>
              <p className="lead">A transformer is rated by apparent power (kVA), which includes both real power (kW) and the reactive power drawn by motors and other inductive loads.</p>
            </div>
            <table className="spec-table fade-in-up">
              <tbody>
                <tr><th scope="row">From load</th><td>kVA = kW ÷ power factor</td></tr>
                <tr><th scope="row">Three-phase</th><td>kVA = √3 × V × I ÷ 1000</td></tr>
                <tr><th scope="row">Single-phase</th><td>kVA = V × I ÷ 1000</td></tr>
              </tbody>
            </table>
            <div className="fade-in-up">
              <h2>Things to consider</h2>
              <ul className="ticks">
                <li>Allow a margin for future load growth, typically 20–25%.</li>
                <li>Motor starting currents and harmonics from drives can need a larger rating.</li>
                <li>High ambient temperature or altitude reduces the usable rating.</li>
                <li>Diversity: not every load runs at full power at the same time.</li>
              </ul>
            </div>
            <div className="note-box fade-in-up"><p>This calculator gives an estimate only. It is not a substitute for a load study by a qualified engineer.</p></div>
            <div className="detail__actions fade-in-up">
              <a className="btn btn--primary" href="/contact/">Get It Sized by an Engineer <ArrowRight /></a>
              <a className="btn btn--ghost" href="/products/">View Products</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
