import { ShoppingBasket, Snowflake, Package, Sparkles } from 'lucide-react';
import Reveal from '@/components/site/Reveal';

const SERVICES = [
  {
    icon: ShoppingBasket,
    title: 'Personal shopping',
    copy: 'Send the list on WhatsApp and we shop it for you, bagged and waiting at the counter by the time you arrive.',
  },
  {
    icon: Snowflake,
    title: 'Chilled storage',
    copy: 'Drinks, wine and creams kept at the right temperature, from the shelf to your bag.',
  },
  {
    icon: Package,
    title: 'Bulk & business supply',
    copy: 'Weekly provisions for homes, offices, hotels and events — quoted, invoiced and packed for collection.',
  },
  {
    icon: Sparkles,
    title: 'Skincare guidance',
    copy: 'Ask at the creams counter which lotion or face cream suits your skin — no pressure to buy.',
  },
];

export default function Services() {
  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 py-20 md:px-10 md:py-32">
      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-brass">The Concierge</p>
          <h2 className="display mt-4 max-w-lg text-[clamp(2.2rem,5vw,4rem)]">
            Shopping, handled.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-foreground/55">
          The shelves are only half of it. These are the extras that make a shop
          at July&rsquo;s Mart easier.
        </p>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.07}>
            <div className="border-t border-foreground/15 pt-6">
              <div className="flex items-start justify-between">
                <service.icon className="h-5 w-5 text-brass" strokeWidth={1.25} />
                <span className="eyebrow text-[9px] text-foreground/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-heading text-[22px] leading-tight text-foreground">
                {service.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-foreground/55">
                {service.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}