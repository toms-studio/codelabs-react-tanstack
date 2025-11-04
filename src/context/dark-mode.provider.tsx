import type React from 'react';
import { createContext, useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';
import { STORAGE_KEYS } from '@/constants';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode({
    localStorageKey: STORAGE_KEYS.DARK_MODE,
    initializeWithValue: true,
    defaultValue: true,
  });

  // Sync dark mode with document element
  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid re-rendering
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      enable();
      root.classList.add('dark');
    } else {
      disable();
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const value: DarkModeContextType = {
    isDarkMode,
    toggle,
    enable,
    disable,
  };

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};
