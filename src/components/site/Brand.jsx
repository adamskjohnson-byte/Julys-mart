import { Link } from 'react-router-dom';

export default function Brand({ dark = false, compact = false }) {
  return (
    <Link to="/" aria-label="July's Mart — home" className="group inline-flex items-center gap-3">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors duration-500 ${
          dark
            ? 'border-ivory/25 text-ivory group-hover:border-brass'
            : 'border-foreground/20 text-foreground group-hover:border-brass'
        }`}
      >
        <span className="font-heading text-[15px] leading-none tracking-tight">JM</span>
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`block font-heading text-[17px] uppercase tracking-[0.18em] ${
              dark ? 'text-ivory' : 'text-foreground'
            }`}
          >
            July&rsquo;s Mart
          </span>
          <span
            className={`eyebrow mt-1.5 block text-[8px] ${
              dark ? 'text-ivory/45' : 'text-foreground/45'
            }`}
          >
            Awka &middot; Anambra
          </span>
        </span>
      )}
    </Link>
  );
}