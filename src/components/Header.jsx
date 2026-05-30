import { useTranslation } from 'react-i18next';
import { taxes } from '../data/taxes.js';
import { useAppContext } from '../context/AppContext.jsx';

const LANGUAGES = [
  { code: 'nl', label: 'NL' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="lang-switcher">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className={`lang-switcher__option ${i18n.language === lang.code ? 'lang-switcher__option--active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="app-header">
      <div className="app-title">
        <span>{t('app.title')}</span>
      </div>
      <div className="tracker">
        {t('app.discovered', { count: taxes.length })}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button 
          onClick={toggleTheme} 
          style={{ padding: '8px', fontSize: '1.2rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', cursor: 'pointer' }}
          title="Toggle Theme"
        >
          {theme === 'retro' ? '🕹️ Retro' : '🔮 Modern'}
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
