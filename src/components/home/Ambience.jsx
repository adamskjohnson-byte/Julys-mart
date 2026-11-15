import { Image } from '@/components/ui/image';
import { MEDIA } from '@/lib/media';
import Reveal from '@/components/site/Reveal';

export default function Ambience() {
  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 pb-20 md:px-10 md:pb-32">
      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
        <Reveal className="md:col-span-7">
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            <Image
              src={MEDIA.atrium}
              alt="Fresh fruit and produce displays inside a supermarket"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col justify-between gap-6 md:col-span-5">
          <Reveal delay={0.1}>
            <blockquote className="font-heading text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.25] text-foreground">
              &ldquo;We built July&rsquo;s Mart so that a family in Anambra State could do a
              full week&rsquo;s shop and still have time for everything else.&rdquo;
            </blockquote>
            <p className="mt-4 eyebrow text-[9px] text-foreground/40">
              The July&rsquo;s Mart floor team
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <Image
                src={MEDIA.produce}
                alt="Creams, lotions and personal care products displayed on supermarket shelves"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}