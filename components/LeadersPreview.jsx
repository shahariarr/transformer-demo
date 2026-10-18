import { LEADERS } from '@/lib/leaders';
import ViewAll from './ViewAll';
import LeaderCard from './LeaderCard';

const CADRE_INDICES = {
  'ashraful-islam': '// 01 FOUNDER & MD',
  'rezaul-karim': '// 02 R&D INNOVATION',
  'tariqul-hasan': '// 03 PLANT OPERATIONS'
};

export default function LeadersPreview() {
  const featured = LEADERS.slice(0, 3);

  return (
    <div className="wrap">
      {/* Executive Section Header */}
      <div className="exec-preview__head">
        <div>
          <div className="exec-header-badge fade-in-up">
            <span className="exec-header-badge__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span>EXECUTIVE GOVERNANCE</span>
          </div>
          <h2 className="fade-in-up" data-delay="80">Led by Seasoned Electrical Engineers</h2>
          <p className="lead fade-in-up" data-delay="160">
            Guided by practicing high-voltage engineers, research fellows, and manufacturing directors with decades of real-world power grid experience.
          </p>
        </div>
        <div className="fade-in-up" data-delay="200">
          <ViewAll href="/about/leaders/">All 6 Directors</ViewAll>
        </div>
      </div>

      {/* Corporate Executive Cards Grid */}
      <div className="exec-grid exec-grid--3col">
        {featured.map((leader, i) => (
          <LeaderCard
            key={leader.slug}
            leader={leader}
            delay={80 + i * 80}
            isFullPage={false}
            index={CADRE_INDICES[leader.slug]}
          />
        ))}
      </div>
    </div>
  );
}
