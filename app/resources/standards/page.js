import { PageHero } from '@/components/PageParts';
import { STANDARDS } from '@/lib/resources';
import styles from './page.module.css';

export const metadata = {
  title: 'Standards',
  description: 'The IEC, IEEE and ISO standards that BPEL transformers, switchgear and quality systems follow.'
};

export default function StandardsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources/' }, { label: 'Standards' }]} label="RESOURCES" title="Standards We Work To"
        desc="International standards for transformer design, testing, switchgear and management systems." />
      <section className="sec" aria-label="Standards">
        <div className="wrap wrap--narrow">
          <dl className="deflist fade-in-up">
            {STANDARDS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
          <p className="note-box fade-in-up" style={{ marginTop: '1.5rem' }}>The standards applied to a specific order are agreed in the technical offer for that project.</p>
        </div>
      </section>
    </>
  );
}
