import { Link } from '@tanstack/react-router';
import { DarkModeToggle } from '@/components/shared/dark-mode-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          React Vite Boilerplate
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-2">
            <Button asChild variant="ghost">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>
          <DarkModeToggle variant="icon" />
        </div>
      </div>
    </header>
  );
}
