import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 420);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-foreground/15 bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:border-brass hover:text-brass motion-reduce:transition-none md:bottom-8 md:right-8"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.6} />
    </button>
  );
}
