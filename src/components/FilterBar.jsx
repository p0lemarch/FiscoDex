import { useTranslation } from 'react-i18next';
import { TAX_TYPES } from '../data/taxes.js';

function FilterBar({ activeFilter, onFilterChange }) {
  const { t } = useTranslation();

  const filters = [
    { id: 'all', label: t('app.allTypes'), color: '#94A3B8' },
    ...Object.entries(TAX_TYPES).map(([id, info]) => ({
      id,
      label: `${info.emoji} ${t(info.labelKey)}`,
      color: info.color,
    })),
  ];

  return (
    <div className="filter-bar" id="filter-bar" role="tablist" aria-label="Filter by type">
      {filters.map((filter) => (
        <button
          key={filter.id}
          id={`filter-${filter.id}`}
          className={`filter-pill ${activeFilter === filter.id ? 'filter-pill--active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
          role="tab"
          aria-selected={activeFilter === filter.id}
          style={
            activeFilter === filter.id
              ? { '--pill-color': filter.color }
              : {}
          }
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
