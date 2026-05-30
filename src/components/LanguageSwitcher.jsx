import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'nl', flag: '🇧🇪', label: 'NL' },
  { code: 'fr', flag: '🇧🇪', label: 'FR' },
  { code: 'de', flag: '🇩🇪', label: 'DE' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <nav className="lang-switcher" id="language-switcher" aria-label="Language selection">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          id={`lang-btn-${lang.code}`}
          className={`lang-switcher__option ${i18n.language === lang.code ? 'lang-switcher__option--active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={i18n.language === lang.code}
        >
          <span className="lang-switcher__flag">{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default LanguageSwitcher;
