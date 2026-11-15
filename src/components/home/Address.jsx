import Reveal from '@/components/site/Reveal';

const FACTS = [
  { value: '04', label: 'Departments under one roof' },
  { value: 'Daily', label: 'Shelves restocked' },
  { value: '7 days', label: 'Open every week' },
  { value: '1', label: 'Address to remember' },
];

export default function Address() {
  return (
    <section id="story" className="bg-ink text-ivory">
      <div className="mx-auto grid w-full max-w-[1680px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-brass">The Address</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,5vw,4rem)]">
              A supermarket built for
              <br />
              the way Anambra shops.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ivory/70 md:text-lg">
              July&rsquo;s Mart opened in Anambra with a single idea: a family should
              be able to do a full week&rsquo;s shop and restock the house
              in one afternoon, under one roof.
            </p>
            <p className="mt-5 text-base leading-relaxed text-ivory/50">
              That means provisions that are actually fresh, prices that are
              clear on the shelf, and staff who know where everything sits. No
              queues for the sake of queues. Shop in store at July&rsquo;s Mart,
              Anambra State.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ivory/15 pt-8 sm:grid-cols-4">
            {FACTS.map((fact, index) => (
              <Reveal key={fact.label} delay={0.15 + index * 0.06}>
                <p className="font-heading text-[26px] leading-none text-brass">
                  {fact.value}
                </p>
                <p className="mt-2 text-[11px] leading-snug text-ivory/45">
                  {fact.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}