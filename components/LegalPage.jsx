import { PageHero } from './PageParts';

/* Placeholder legal page: headings to fill in once the company supplies its own text */
export default function LegalPage({ title, sections }) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} label="LEGAL" title={title} />
      <section className="sec" aria-label={title}>
        <div className="wrap"><div className="prose">
          <div className="note-box"><p><strong>Placeholder.</strong> This page outlines the sections a {title.toLowerCase()} normally covers. Replace it with text approved by the company&apos;s legal advisers before going live.</p></div>
          {sections.map(([h, p]) => (
            <div key={h}>
              <h2>{h}</h2>
              <p>{p}</p>
            </div>
          ))}
        </div></div>
      </section>
    </>
  );
}
