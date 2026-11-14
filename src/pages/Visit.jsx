import { MapPin, Clock, Phone, Car, Package } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { MEDIA } from '@/lib/media';
import { HOURS, SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/format';
import Reveal from '@/components/site/Reveal';

export default function Visit() {
  return (
    <>
      <section className="relative pt-[68px] md:pt-[76px]">
        <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-ink">
          <Image
            src={MEDIA.exterior}
            alt="July's Mart in Awka, Anambra State"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-[1680px] px-5 pb-10 md:px-10 md:pb-14">
              <p className="eyebrow text-brass">Plan your visit</p>
              <h1 className="display mt-3 text-[clamp(2.4rem,7vw,5.5rem)] text-ivory">
                Come to the mart.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1680px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow text-foreground/40">The address</p>
              <h2 className="display mt-4 text-[clamp(1.9rem,3.4vw,2.8rem)] text-foreground">
                {SITE.address}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-foreground/55">
                Two minutes off the expressway, with parking at the front of the
                building and a covered walkway to the entrance. Come in through
                the grocery doors or the fashion side — both open onto the same
                floor.
              </p>

              <div className="mt-8 space-y-5 border-t border-foreground/15 pt-8">
                <div className="flex gap-3">
                  <Car className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                  <p className="text-sm text-foreground/65">
                    Free customer parking &middot; security on site
                  </p>
                </div>
                <div className="flex gap-3">
                  <Package className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                  <p className="text-sm text-foreground/65">
                    Collect online orders at the concierge desk, no queue
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                    className="text-sm text-foreground/65 hover:text-foreground"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="bg-secondary/70 p-7 md:p-10">
                <div className="flex items-center gap-2 eyebrow text-[9px] text-foreground/40">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Opening hours
                </div>
                <ul className="mt-6 divide-y divide-foreground/10">
                  {HOURS.map((slot) => (
                    <li
                      key={slot.day}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span className="text-sm text-foreground/75">{slot.day}</span>
                      <span className="font-heading text-lg text-foreground">{slot.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[12px] leading-relaxed text-foreground/45">
                  Public holidays: 10:00 — 18:00. Delivery runs until 7pm daily.
                </p>
                <a
                  href={whatsappLink(`Hello ${SITE.name}, I would like directions to the mart.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 bg-ink py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass"
                >
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Ask for directions
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/70">
        <div className="mx-auto grid w-full max-w-[1680px] gap-8 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
          <div className="md:col-span-5">
            <p className="eyebrow text-brass">Bulk &amp; business supply</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.9rem)] text-foreground">
              Shopping for a household, an office or an event?
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-sm leading-relaxed text-foreground/60">
              Send us the list and the date. We price it at trade rates, invoice
              it properly and deliver on the day you need it — weekly for offices
              and hotels, or one-off for weddings and end-of-year parties.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
              <a
                href={whatsappLink(
                  `Hello ${SITE.name}, I would like a quote for a bulk order.`
                )}
                target="_blank"
                rel="noreferrer"
                className="bg-ink px-6 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass"
              >
                Request a quote
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline self-center text-[0.68rem] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}