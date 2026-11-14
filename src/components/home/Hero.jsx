import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { MEDIA } from '@/lib/media';
import { SITE } from '@/lib/site';

const STRIP = [
  { image: MEDIA.aisle, label: 'Groceries & Provisions', note: 'Restocked daily' },
  { image: MEDIA.fashion, label: 'Fashion & Ready-to-wear', note: 'Native & modern' },
  { image: MEDIA.shoes, label: 'Shoes & Bags', note: 'Leather, hand-picked' },
];

export default function Hero() {
  return (
    <section className="relative pt-[68px] md:pt-[76px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <div className="flex items-center justify-between gap-4 border-t border-foreground/15 pt-4">
          <span className="eyebrow text-foreground/50">
            Est. 2026 &mdash; {SITE.city}, {SITE.state}
          </span>
          <span className="eyebrow hidden text-foreground/50 md:block">
            Groceries &middot; Ready-to-wear &middot; Shoes &middot; Beauty
          </span>
          <span className="eyebrow text-foreground/50">001 / 009</span>
        </div>

        <div className="grid items-end gap-8 pb-8 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1 className="display text-[clamp(3.6rem,12.5vw,10.5rem)] text-foreground">
              July&rsquo;s <span className="italic text-brass">Mart</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-foreground/65">
              Fresh provisions, ready-to-wear, footwear and beauty &mdash; four
              departments under one roof in the heart of Awka. Curated weekly,
              delivered across Anambra.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-ink px-6 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass"
              >
                Explore the Mart
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/visit"
                className="link-underline text-[0.68rem] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
              >
                Plan your visit
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 px-5 md:gap-1.5 md:px-10">
        {STRIP.map((tile) => (
          <figure key={tile.label} className="group relative overflow-hidden bg-secondary">
            <div className="aspect-[3/4] md:aspect-[4/3]">
              <Image
                src={tile.image}
                alt={tile.label}
                className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
              />
            </div>
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <figcaption className="pointer-events-none absolute inset-x-2 bottom-2 md:inset-x-4 md:bottom-4">
              <span className="eyebrow block text-[8px] text-white/70 md:text-[9px]">
                {tile.note}
              </span>
              <span className="mt-1 block font-heading text-[13px] leading-tight text-white md:text-lg">
                {tile.label}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}