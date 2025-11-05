import type React from 'react';
import { DarkModeProvider } from './dark-mode.provider';
import { TanStackQueryProvider } from './tanstack-query.provider';

interface RootProviderProps {
  children: React.ReactNode;
}

/**
 * RootProvider Component
 *
 * Combines all context providers into a single root provider.
 * This simplifies the component tree and ensures all providers
 * are available throughout the application.
 */
export const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return (
    <TanStackQueryProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </TanStackQueryProvider>
  );
};
