import { MapPin, Phone, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { MEDIA } from '@/lib/media';
import { HOURS, SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/format';
import Reveal from '@/components/site/Reveal';

export default function VisitBlock() {
  return (
    <section id="visit" className="bg-secondary/70">
      <div className="mx-auto grid w-full max-w-[1680px] gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-6">
          <Reveal>
            <p className="eyebrow text-brass">Plan your visit</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.4rem)]">
              Find us in {SITE.city}.
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <span className="flex items-center gap-2 eyebrow text-[9px] text-foreground/40">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Address
                </span>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {SITE.address}
                </p>
                <p className="mt-1 text-[12px] text-foreground/40">
                  Free parking &middot; Wheelchair access
                </p>
              </div>

              <div>
                <span className="flex items-center gap-2 eyebrow text-[9px] text-foreground/40">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Opening hours
                </span>
                <ul className="mt-3 space-y-1.5 text-sm text-foreground/70">
                  {HOURS.map((slot) => (
                    <li key={slot.day} className="flex justify-between gap-4">
                      <span>{slot.day}</span>
                      <span className="text-foreground/45">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={whatsappLink(`Hello ${SITE.name}, I would like to make an enquiry.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-6 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="link-underline inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="md:col-span-6">
          <div className="aspect-[4/3] overflow-hidden bg-secondary md:aspect-[5/4]">
            <Image
              src={MEDIA.exterior}
              alt="July's Mart building in Awka, Anambra State"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}