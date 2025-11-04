import { useContext } from 'react';
import { DarkModeContext } from '@/context/dark-mode.provider';

/**
 * Custom hook for accessing dark mode functionality
 *
 * This is a convenience hook for accessing the dark mode context.
 * It provides a cleaner API for components that need dark mode functionality.
 *
 * @example
 * ```tsx
 * import { useDarkMode } from '@/hooks/utility/use-dark-mode';
 *
 * function MyComponent() {
 *   const { isDarkMode, toggle } = useDarkMode();
 *
 *   return (
 *     <button onClick={toggle}>
 *       {isDarkMode ? 'Light Mode' : 'Dark Mode'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
