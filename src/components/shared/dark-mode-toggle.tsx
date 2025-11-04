import { Moon, Sun } from 'lucide-react';
import type React from 'react';
import { Button } from '@/components/ui/button';
import { useDarkMode } from '@/hooks/utilities/use-dark-mode';
import { cn } from '@/lib/utils';

interface DarkModeToggleProps {
  variant?: 'default' | 'icon' | 'minimal';
  className?: string;
  showLabel?: boolean;
}

/**
 * DarkModeToggle Component
 *
 * A reusable component for toggling dark mode throughout the application.
 * Supports multiple variants for different UI contexts.
 *
 * @param variant - The visual style of the toggle ('default' | 'icon' | 'minimal')
 * @param className - Additional CSS classes
 * @param showLabel - Whether to show the text label (default: false)
 */
export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  variant = 'default',
  className,
  showLabel = false,
}) => {
  const { isDarkMode, toggle } = useDarkMode();

  // Icon variant - just the icon button
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        type="button"
        size="icon"
        onClick={toggle}
        className={cn('relative', className)}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    );
  }

  // Minimal variant - simple text button
  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'flex items-center gap-2 text-sm hover:opacity-80 transition-opacity',
          className
        )}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <>
            <Sun className="h-4 w-4" />
            {showLabel && <span>Light Mode</span>}
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            {showLabel && <span>Dark Mode</span>}
          </>
        )}
      </button>
    );
  }

  // Default variant - button with icon and optional label
  return (
    <Button
      variant="outline"
      onClick={toggle}
      className={cn('flex items-center gap-2', className)}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <>
          <Sun className="h-4 w-4" />
          {showLabel && <span>Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          {showLabel && <span>Dark Mode</span>}
        </>
      )}
    </Button>
  );
};
