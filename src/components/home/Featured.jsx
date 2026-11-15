import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import QuickView from '@/components/shop/QuickView';
import Reveal from '@/components/site/Reveal';
import { useFeaturedProducts } from '@/hooks/useCatalog';

export default function Featured() {
  const products = useFeaturedProducts();
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 pb-20 md:px-10 md:pb-32">
      <div className="flex flex-col gap-6 border-t border-foreground/15 pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-brass">On the shelves now</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,5vw,4.2rem)]">The July Edit</h2>
        </div>
        <Link
          to="/shop"
          className="link-underline inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground"
        >
          View everything
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-4 lg:mt-14 lg:grid-cols-4 lg:gap-y-12">
        {products.map((product, index) => (
          <Reveal key={product.id} delay={(index % 4) * 0.06}>
            <ProductCard product={product} onOpen={setActive} />
          </Reveal>
        ))}
      </div>

      <QuickView product={active} onClose={() => setActive(null)} />
    </section>
  );
}