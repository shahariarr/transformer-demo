import { PageHero } from '@/components/PageParts';
import { GLOSSARY } from '@/lib/resources';

export const metadata = {
  title: 'Glossary',
  description: 'Plain-language definitions of common transformer and substation terms.'
};

export default function GlossaryPage() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources/' }, { label: 'Glossary' }]} label="RESOURCES" title="Transformer Glossary"
        desc="Common terms you will meet in transformer specifications and test reports." />
      <section className="sec" aria-label="Glossary">
        <div className="wrap wrap--narrow">
          <dl className="deflist fade-in-up">
            {GLOSSARY.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>
    </>
  );
}
