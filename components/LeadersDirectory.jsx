import LeaderCard from './LeaderCard';

export default function LeadersDirectory({ leaders }) {
  return (
    <div className="creative-team-section" style={{ padding: '24px 0 0' }}>
      <div className="row">
        {leaders.map((leader, i) => (
          <LeaderCard
            key={leader.slug}
            leader={leader}
            delay={60 + (i % 3) * 60}
            isFullPage={true}
          />
        ))}
      </div>
    </div>
  );
}
