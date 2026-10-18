import { DATA } from '@/lib/data';
import Media from './Media';
import SectionHead from './SectionHead';

const IND_SPANS = [7, 5, 4, 4, 4, 3, 4, 5];

export default function Industries() {
  return (
    <>
      <div className="stars-container" aria-hidden="true">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <div className="wrap">
        <SectionHead label="INDUSTRIES WE SERVE" title="Powering Diverse Industries"
          desc="Engineered power solutions for the facilities and infrastructure that keep industries moving." />
        <p className="demo-note fade-in-up" data-delay="200">Illustrative industries until the company&apos;s actual customer sectors are confirmed.</p>
        <div className="ind-grid">
          {DATA.industries.map((p, i) => (
            <article className="ind fade-in-up" style={{ '--span': IND_SPANS[i] }} data-delay={(i % 3) * 110} key={p.name}>
              <Media item={p} parallax reveal={false} />
              <div className="ind__body"><h3>{p.name}</h3><p>{p.desc}</p></div>
              <a className="ind__link" href={`/industries/${p.slug}/`} aria-label={`${p.name}: learn more`}></a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
