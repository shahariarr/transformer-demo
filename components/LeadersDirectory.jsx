import LeaderCard from './LeaderCard';

export default function LeadersDirectory({ leaders }) {
  return (
    <div className="leaders-grid">
      {leaders.map((leader, i) => (
        <LeaderCard
          key={leader.slug}
          leader={leader}
          delay={60 + (i % 3) * 60}
          isFullPage={true}
        />
      ))}
    </div>
  );
}

