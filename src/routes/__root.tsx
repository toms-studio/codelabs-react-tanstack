import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/header';
import { RootProvider } from '@/context/root';

export const Route = createRootRoute({
  component: () => (
    <RootProvider>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </RootProvider>
  ),
});
