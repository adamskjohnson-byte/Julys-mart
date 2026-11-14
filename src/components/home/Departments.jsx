import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { resolveImage } from '@/lib/media';
import Reveal from '@/components/site/Reveal';
import { useDepartments } from '@/hooks/useCatalog';

export default function Departments() {
  const departments = useDepartments();

  return (
    <section id="departments" className="mx-auto w-full max-w-[1680px] px-5 py-20 md:px-10 md:py-32">
      <div className="flex flex-col gap-8 border-t border-foreground/15 pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-brass">Inside the Mart</p>
          <h2 className="display mt-4 max-w-xl text-[clamp(2.2rem,5vw,4.2rem)]">
            Four departments.
            <br />
            One address.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-foreground/55">
          Each department is run by its own floor team &mdash; inspected, priced
          and shelved by hand, so what you see here is what is waiting on the
          floor.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-4">
        {departments.map((department, index) => (
          <Reveal key={department.key} delay={index * 0.07}>
            <Link
              to={`/shop?department=${department.key}`}
              className="group relative block overflow-hidden bg-secondary"
            >
              <div className="aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src={resolveImage(department.image)}
                  alt={department.name}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
              <span className="absolute left-4 top-4 eyebrow text-[9px] text-white/65">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="font-heading text-[22px] leading-tight">
                  {department.name}
                </h3>
                <div className="grid grid-rows-[1fr] transition-all duration-500 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-2 text-[11px] leading-relaxed text-white/60">
                      {department.items.join(' · ')}
                    </p>
                  </div>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 eyebrow text-[9px] text-white/85">
                  Shop {department.short}
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}