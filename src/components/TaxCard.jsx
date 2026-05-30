import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TAX_TYPES } from '../data/taxes.js';
import TypeBadge from './TypeBadge.jsx';

function TaxCard({ tax, index }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const dexStr = String(tax.dexNumber).padStart(3, '0');

  if (tax.isPlaceholder) {
    return (
      <article className="tax-card tax-card--undiscovered">
        <div className="tax-card__content">
          <div className="tax-card__header">
            <h2 className="tax-card__name">???</h2>
            <span className="tax-card__hp">?? HP</span>
          </div>
          <div className="tax-card__portrait">
            <span className="tax-card__icon">❓</span>
          </div>
          <div className="tax-card__info-bar">
            <span>No. {dexStr} Unknown Tax</span>
          </div>
          <div className="tax-card__attacks">
            <div className="tax-card__attack">
              <span className="attack-name">???</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  const typeInfo = TAX_TYPES[tax.type];
  const attacks = t(`taxes.${tax.id}.attacks`, { returnObjects: true }) || [];
  const weaknesses = t(`taxes.${tax.id}.weaknesses`, { returnObjects: true }) || [];
  
  const handleClick = () => {
    navigate(`/tax/${tax.dexNumber}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      className={`tax-card animate-pop stagger-${(index % 8) + 1} ${tax.rarity === 'legendary' ? 'tax-card--legendary' : ''} ${tax.rarity === 'mythical' ? 'tax-card--mythical' : ''}`}
      style={{ '--card-color': typeInfo.color }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      <div className="tax-card__content">
        {/* Header: Name and HP */}
        <div className="tax-card__header">
          <h2 className="tax-card__name">{t(`taxes.${tax.id}.name`)}</h2>
          <span className="tax-card__hp">{tax.hp} HP <TypeBadge type={tax.type} /></span>
        </div>

        {/* Portrait/Screen */}
        <div className="tax-card__portrait">
          <span className="tax-card__icon">{typeInfo.emoji}</span>
        </div>

        {/* Info Bar */}
        <div className="tax-card__info-bar">
          <span className="tax-card__dex-number">No. {dexStr} Belgian Tax</span>
        </div>

        {/* Attacks Area */}
        <div className="tax-card__attacks">
          {Array.isArray(attacks) && attacks.slice(0, 2).map((attack, i) => (
            <div className="tax-card__attack" key={i}>
              <div className="attack-row">
                <span className="attack-icon">⚔️</span>
                <span className="attack-name">{attack.name}</span>
                <span className="attack-damage">{attack.damage}</span>
              </div>
              <p className="attack-effect-preview">{attack.effect}</p>
            </div>
          ))}
        </div>

        {/* Card Footer (Weaknesses/Resistance) */}
        <div className="tax-card__footer">
          <div className="card-stat">
            <small>Weakness</small>
            <span>{Array.isArray(weaknesses) && weaknesses.length > 0 ? weaknesses[0] : 'None'}</span>
          </div>
          <div className="card-stat">
            <small>Rarity</small>
            <span style={{ textTransform: 'capitalize' }}>{tax.rarity}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaxCard;
