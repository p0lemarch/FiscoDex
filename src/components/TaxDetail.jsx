import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TAX_TYPES, taxes } from '../data/taxes.js';
import TypeBadge from './TypeBadge.jsx';

function TaxDetail({ tax }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const typeInfo = TAX_TYPES[tax.type];
  const dexStr = String(tax.dexNumber).padStart(3, '0');

  // Find previous and next tax
  const currentIndex = taxes.findIndex((tx) => tx.id === tax.id);
  const prevTax = currentIndex > 0 ? taxes[currentIndex - 1] : null;
  const nextTax = currentIndex < taxes.length - 1 ? taxes[currentIndex + 1] : null;

  // Attacks
  const attacks = t(`taxes.${tax.id}.attacks`, { returnObjects: true }) || [];
  const strengths = t(`taxes.${tax.id}.strengths`, { returnObjects: true }) || [];
  const weaknesses = t(`taxes.${tax.id}.weaknesses`, { returnObjects: true }) || [];

  return (
    <div className="detail-page animate-flash" style={{ animationIterationCount: 1 }}>
      <button className="back-button" onClick={() => navigate('/')}>
        &lt; {t('app.backToList')}
      </button>

      <div className="detail-container">
        {/* Left Column */}
        <div className="detail-left">
          <div className="detail-portrait">
            <span className="detail-portrait__icon">{typeInfo?.emoji}</span>
          </div>
          
          <div className="detail-info-box">
            <div className="detail-dex">No. {dexStr}</div>
            <h1 className="detail-name">{t(`taxes.${tax.id}.name`)}</h1>
            <TypeBadge type={tax.type} />
            <div className="detail-hp">{t('app.hp', { defaultValue: 'HP' })} <span>{tax.hp}</span></div>
          </div>

          {tax.evolution?.to && (
            <div className="evolution-box">
              <div>{t('app.evolvesTo', { defaultValue: 'Evolves into:' })}</div>
              <span className="evolution-arrow">⬇️</span>
              <div>{t(`taxes.${tax.evolution.to}.name`, { defaultValue: tax.evolution.to })}</div>
              <div style={{ fontSize: '0.7rem', marginTop: '5px' }}>({tax.evolution.method})</div>
            </div>
          )}
          {tax.evolution?.from && (
            <div className="evolution-box">
              <div>{t('app.evolvesFrom', { defaultValue: 'Evolves from:' })}</div>
              <span className="evolution-arrow">⬆️</span>
              <div>{t(`taxes.${tax.evolution.from}.name`, { defaultValue: tax.evolution.from })}</div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="detail-right">
          <div className="detail-section">
            <h2 className="detail-section__title">{t('app.description', { defaultValue: 'Description' })}</h2>
            <div className="detail-description">
              {t(`taxes.${tax.id}.description`)}
            </div>
            
            <h2 className="detail-section__title">{t('app.attacks', { defaultValue: 'Attacks' })}</h2>
            <div className="attack-list">
              {Array.isArray(attacks) && attacks.map((attack, i) => (
                <div className="attack-item" key={i}>
                  <div className="attack-header">
                    <span className="attack-name">{attack.name}</span>
                    <span className="attack-damage">{attack.damage}</span>
                  </div>
                  <div className="attack-effect">{attack.effect}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section matchups">
            <div className="matchup-box">
              <h2 className="detail-section__title">{t('app.strengths', { defaultValue: 'Strengths' })}</h2>
              <ul className="matchup-list">
                {Array.isArray(strengths) && strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="matchup-box">
              <h2 className="detail-section__title">{t('app.weaknesses', { defaultValue: 'Weaknesses' })}</h2>
              <ul className="matchup-list">
                {Array.isArray(weaknesses) && weaknesses.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="detail-nav">
            {prevTax ? (
              <button onClick={() => navigate(`/tax/${prevTax.dexNumber}`)} className="back-button">
                &lt; {t('app.previous', { defaultValue: 'Prev' })}
              </button>
            ) : <div />}
            {nextTax ? (
              <button onClick={() => navigate(`/tax/${nextTax.dexNumber}`)} className="back-button">
                {t('app.next', { defaultValue: 'Next' })} &gt;
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaxDetail;
