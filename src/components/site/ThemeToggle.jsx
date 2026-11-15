import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ isDark, onToggle }) {
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="grid h-10 w-10 place-items-center text-foreground/70 transition-colors hover:text-foreground motion-reduce:transition-none"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
    </button>
  );
}
