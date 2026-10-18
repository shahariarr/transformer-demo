'use client';

import { useState, useMemo } from 'react';
import LeaderCard from './LeaderCard';

const FILTERS = [
  { id: 'all', label: 'All Directorate' },
  { id: 'board', label: 'Executive Board', depts: ['Executive Board'] },
  { id: 'rnd-qa', label: 'R&D & Testing Lab', depts: ['R&D & Science Lab', 'Testing & Metrology'] },
  { id: 'plant-epc', label: 'Plant & Substation EPC', depts: ['Plant Operations', 'Turnkey EPC'] },
  { id: 'finance', label: 'Finance & Strategy', depts: ['Finance & Strategy'] }
];

const CADRE_INDICES = {
  'ashraful-islam': '// 01 FOUNDER & MD',
  'rezaul-karim': '// 02 R&D INNOVATION',
  'tariqul-hasan': '// 03 PLANT OPERATIONS',
  'farhana-chowdhury': '// 04 TESTING BAY & QA',
  'mahmudur-rahman': '// 05 TURNKEY EPC',
  'nabila-ahmed': '// 06 STRATEGY & FINANCE'
};

export default function LeadersDirectory({ leaders }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const founder = useMemo(() => {
    return leaders.find((l) => l.slug === 'ashraful-islam');
  }, [leaders]);

  const otherLeaders = useMemo(() => {
    return leaders.filter((l) => l.slug !== 'ashraful-islam');
  }, [leaders]);

  const filteredLeaders = useMemo(() => {
    if (activeFilter === 'all') return leaders;
    const filterObj = FILTERS.find((f) => f.id === activeFilter);
    if (!filterObj || !filterObj.depts) return leaders;
    return leaders.filter((l) => filterObj.depts.includes(l.dept));
  }, [activeFilter, leaders]);

  return (
    <div className="gov-directory">
      {/* Modern Engineering Filter Bar */}
      <div className="gov-filter-bar fade-in-up" role="tablist" aria-label="Leadership Departments">
        <div className="gov-filter-tabs">
          {FILTERS.map((tab) => {
            const count = tab.id === 'all'
              ? leaders.length
              : leaders.filter((l) => tab.depts?.includes(l.dept)).length;
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                className={`gov-tab ${isActive ? 'gov-tab--active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                <span>{tab.label}</span>
                <span className="gov-tab__count">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="gov-filter-meta">
          <span className="gov-filter-pulse" aria-hidden="true" />
          <span>Active Directorate: {filteredLeaders.length} Members</span>
        </div>
      </div>

      {/* Directory Content Display */}
      {activeFilter === 'all' ? (
        <div className="gov-roster">
          {/* Executive Anchor: Founder & Managing Director */}
          {founder && (
            <div className="gov-anchor-wrap">
              <LeaderCard
                leader={founder}
                delay={60}
                isFullPage={true}
                isAnchor={true}
                index={CADRE_INDICES[founder.slug]}
              />
            </div>
          )}

          {/* Directorate Sub-header */}
          <div className="gov-subhead fade-in-up">
            <div className="gov-subhead__line" />
            <span className="gov-subhead__text">TECHNICAL & OPERATIONAL DIRECTORATE</span>
            <div className="gov-subhead__line" />
          </div>

          {/* Grid of Directors */}
          <div className="exec-grid exec-grid--3col">
            {otherLeaders.map((leader, i) => (
              <LeaderCard
                key={leader.slug}
                leader={leader}
                delay={100 + i * 60}
                isFullPage={true}
                index={CADRE_INDICES[leader.slug]}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Filtered Grid Display */
        <div className="exec-grid exec-grid--3col">
          {filteredLeaders.map((leader, i) => (
            <LeaderCard
              key={leader.slug}
              leader={leader}
              delay={i * 60}
              isFullPage={true}
              isAnchor={leader.slug === 'ashraful-islam' && filteredLeaders.length === 1}
              index={CADRE_INDICES[leader.slug]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
