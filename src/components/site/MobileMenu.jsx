import { motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Brand from '@/components/site/Brand';
import { DEPARTMENTS } from '@/lib/catalog';
import { NAV, SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/format';
import { resolveImage } from '@/lib/media';
import { Image } from '@/components/ui/image';
import ThemeToggle from '@/components/site/ThemeToggle';

export default function MobileMenu({ onClose, isDark, onToggleTheme }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-y-auto bg-background lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-[68px] items-center justify-between px-5">
        <Brand />
        <div className="flex items-center gap-1">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-14 pt-4">
        <p className="eyebrow text-foreground/40">Departments</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {DEPARTMENTS.map((department) => (
            <Link
              key={department.key}
              to={`/shop?department=${department.key}`}
              onClick={onClose}
              className="group relative overflow-hidden bg-secondary"
            >
              <div className="aspect-[4/5]">
                <Image
                  src={resolveImage(department.image)}
                  alt={department.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span className="absolute inset-x-3 bottom-3 font-heading text-lg leading-tight text-white">
                {department.short}
              </span>
            </Link>
          ))}
        </div>

        <nav className="mt-10 flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="flex items-center justify-between py-4 font-heading text-2xl text-foreground"
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 text-brass" />
            </Link>
          ))}
        </nav>

        <a
          href={whatsappLink(`Hello ${SITE.name}, I would like to make an enquiry.`)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 flex items-center justify-center gap-2 bg-ink px-6 py-4 text-[0.7rem] uppercase tracking-[0.18em] text-ivory"
        >
          Chat on WhatsApp
        </a>
        <p className="mt-6 text-center text-xs text-foreground/50">
          {SITE.address}
          <br />
          Open daily &middot; 8:00 — 21:00
        </p>
      </div>
    </motion.div>
  );
}