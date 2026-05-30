import { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fiscodex-theme') || 'retro';
  });

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      const stored = localStorage.getItem('fiscodex-badges');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('fiscodex-theme', theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fiscodex-badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'retro' ? 'modern' : 'retro');
  };

  const claimBadge = (badgeId) => {
    if (!unlockedBadges.includes(badgeId)) {
      setUnlockedBadges([...unlockedBadges, badgeId]);
    }
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, unlockedBadges, claimBadge }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
