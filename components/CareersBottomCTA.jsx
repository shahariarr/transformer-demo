import Link from 'next/link';

export default function CareersBottomCTA() {
  return (
    <div className="wrap">
      <div className="careers-bottom-cta fade-in-up">
        <div className="careers-bottom-cta__content">
          <span className="careers-bottom-cta__kicker">CAN&apos;T FIND YOUR EXACT DISCIPLINE?</span>
          <h2 className="careers-bottom-cta__title">We Are Always Looking for Exceptional Engineering Minds</h2>
          <p className="careers-bottom-cta__desc">
            Even if there isn&apos;t an active vacancy matching your profile today, we welcome speculative applications from electrical, mechanical, civil, and industrial production engineers across Bangladesh.
          </p>
          <div className="careers-bottom-cta__actions">
            <Link href="/careers/apply?job=open-application" className="btn btn--primary">
              <span>Submit Open Application</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="mailto:hr@bpel.com.bd" className="btn btn--ghost">
              <span>Email Technical HR Directly</span>
            </a>
          </div>
        </div>

        <div className="careers-bottom-cta__stat-col">
          <div className="careers-bottom-badge">
            <div className="careers-bottom-badge__icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="careers-bottom-badge__text">
              <strong>100% In-House FAT</strong>
              <span>Accredited 200kV Laboratory</span>
            </div>
          </div>

          <div className="careers-bottom-badge">
            <div className="careers-bottom-badge__icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="careers-bottom-badge__text">
              <strong>Zero-Accident Safety</strong>
              <span>OHSAS &amp; ISO 45001 Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
