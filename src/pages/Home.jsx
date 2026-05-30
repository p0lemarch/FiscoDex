import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { taxes } from '../data/taxes.js';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import TaxCard from '../components/TaxCard.jsx';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [wildEncounter, setWildEncounter] = useState(null);

  const filteredTaxes = useMemo(() => {
    let result = taxes;

    if (activeFilter !== 'all') {
      result = result.filter((tax) => tax.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((tax) => {
        const name = t(`taxes.${tax.id}.name`).toLowerCase();
        const dexStr = String(tax.dexNumber).padStart(3, '0');
        return name.includes(query) || dexStr.includes(query);
      });
    }

    return result;
  }, [searchQuery, activeFilter, t]);

  // Generate placeholders to reach 153 total entries in the Pokédex
  const totalInGame = 153;
  const placeholders = Array.from({ length: totalInGame - taxes.length }).map((_, i) => ({
    isPlaceholder: true,
    dexNumber: taxes.length + i + 1
  }));

  // Wild encounter logic (5% chance on click/navigation)
  useEffect(() => {
    const handleRandomEncounter = () => {
      if (!wildEncounter && Math.random() < 0.05) {
        const randomTax = taxes[Math.floor(Math.random() * taxes.length)];
        setWildEncounter(randomTax);
      }
    };
    
    window.addEventListener('click', handleRandomEncounter);
    return () => window.removeEventListener('click', handleRandomEncounter);
  }, [wildEncounter]);

  const handleFight = () => {
    navigate(`/tax/${wildEncounter.dexNumber}`);
    setWildEncounter(null);
  };

  const handleRun = () => {
    setWildEncounter(null);
  };

  return (
    <div className="home-page container">
      {/* Wild Encounter Overlay */}
      {wildEncounter && (
        <div className="wild-encounter-overlay">
          <div className="wild-encounter-box">
            <h2>{t('app.wildEncounter', { tax: t(`taxes.${wildEncounter.id}.name`) })}</h2>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={handleFight}>FIGHT</button>
              <button onClick={handleRun}>RUN</button>
            </div>
          </div>
        </div>
      )}

      <div className="search-filter-section">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="tax-grid">
        {filteredTaxes.map((tax, index) => (
          <TaxCard key={tax.id} tax={tax} index={index} />
        ))}
        {/* Only show placeholders if no search/filter is active */}
        {activeFilter === 'all' && !searchQuery && placeholders.map((p) => (
          <TaxCard key={`placeholder-${p.dexNumber}`} tax={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
