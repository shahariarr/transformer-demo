import { HIGHLIGHTS, ABOUT_BADGE_SVG } from '@/lib/about';
import RawSvg from './RawSvg';

export default function About() {
  return (
    <div className="wrap about__grid">
      <div className="about__copy">
        <p className="label fade-in-left">ABOUT OUR COMPANY</p>
        <h2 className="fade-in-left" data-delay="100">Engineering Expertise. Built Around Reliability.</h2>
        <p className="lead fade-in-left" data-delay="200">Our engineers and manufacturing team work from specification through to quality assurance, installation and commissioning, so each project stays accountable to its drawings and to the network it joins.</p>
        <ul className="highlights">
          {HIGHLIGHTS.map((h, i) => (
            <li className="fade-in-up" data-delay={280 + i * 90} key={h.t}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: h.i }} />
              <div><h3>{h.t}</h3><p>{h.d}</p></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__media">
        <div className="about-collage">
          <div className="about-card about-card--main fade-in-right" data-delay="150">
            <img src="/assets/images/about-campus.jpg" alt="Voltline Power Manufacturing Campus" className="about-card__img" loading="lazy" decoding="async" />
          </div>

          <div className="about-card about-card--sub fade-in-up" data-delay="280">
            <img src="/assets/images/about-tower.jpg" alt="Voltline Power Corporate Headquarters" className="about-card__img" loading="lazy" decoding="async" />
          </div>

          <div className="about-badge fade-in-right" data-delay="380" tabIndex="0" role="region" aria-label="Founded In 1985 Years">
            <div className="about-badge__icon">
              <RawSvg markup={ABOUT_BADGE_SVG} />
            </div>
            <div className="about-badge__label">Founded In</div>
            <div className="about-badge__stat">
              <span className="about-badge__num">1985</span>
              <span className="about-badge__unit">Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
