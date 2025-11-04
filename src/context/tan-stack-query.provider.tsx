import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';

interface TanStackQueryProviderProps {
  children: React.ReactNode;
}

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const TanStackQueryProvider: React.FC<TanStackQueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
