import { badges } from '../data/badges.js';
import { useAppContext } from '../context/AppContext.jsx';
import { useTranslation } from 'react-i18next';

export default function BadgeCase() {
  const { unlockedBadges, claimBadge } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="badge-case">
      <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Achievements</h2>
      <div className="badge-grid">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`badge-item ${isUnlocked ? 'badge-item--unlocked' : 'badge-item--locked'}`}>
              <div className="badge-icon">{badge.icon}</div>
              <div className="badge-details">
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-desc">{badge.description}</p>
                {!isUnlocked && (
                  <button className="badge-claim-btn" onClick={() => claimBadge(badge.id)}>
                    Claim Badge
                  </button>
                )}
                {isUnlocked && <span className="badge-status">✅ Claimed</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
