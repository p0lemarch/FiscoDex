import { useTranslation } from 'react-i18next';

function SearchBar({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <div className="search-bar" id="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <input
        type="text"
        id="search-input"
        className="search-bar__input"
        placeholder={t('app.search')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={t('app.search')}
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
          id="search-clear"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
