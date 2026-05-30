import { useTranslation } from 'react-i18next';
import { RARITIES } from '../data/taxes.js';

function RarityBadge({ rarity }) {
  const { t } = useTranslation();
  const rarityInfo = RARITIES[rarity];

  if (!rarityInfo) return null;

  return (
    <span className={`rarity-badge rarity-badge--${rarity}`}>
      <span className="rarity-badge__stars" aria-hidden="true">
        {'★'.repeat(rarityInfo.stars)}
      </span>
      <span className="rarity-badge__label">{t(rarityInfo.labelKey)}</span>
    </span>
  );
}

export default RarityBadge;
