import { Image } from '@/components/ui/image';
import { Plus } from 'lucide-react';
import { naira } from '@/lib/format';
import { productImage } from '@/lib/media';
import { departmentName } from '@/hooks/useCatalog';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product, onOpen }) {
  const { add } = useCart();

  return (
    <article className="group relative">
      <button
        type="button"
        onClick={() => onOpen?.(product)}
        className="block w-full text-left"
      >
        <div className="relative overflow-hidden bg-secondary">
          <div className="aspect-[4/5] w-full">
            <Image
              src={productImage(product)}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          {product.badge && (
            <span className="eyebrow absolute left-3 top-3 bg-background/90 px-2 py-1 text-[8px] text-foreground/80 backdrop-blur">
              {product.badge}
            </span>
          )}
          <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 bg-ink/85 py-2.5 text-center opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="eyebrow text-[8px] text-ivory">Quick view</span>
          </span>
        </div>
        <div className="pt-4">
          <p className="eyebrow text-[8px] text-foreground/40">
            {departmentName(product.department)}
          </p>
          <h3 className="mt-2 font-heading text-[19px] leading-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[13px] text-foreground/60">
            {naira(product.price)}
            <span className="ml-1.5 text-[11px] text-foreground/40">{product.unit}</span>
          </p>
        </div>
      </button>

      <button
        type="button"
        onClick={() => add(product)}
        aria-label={`Add ${product.name} to your bag`}
        className="absolute right-0 top-0 grid h-9 w-9 place-items-center bg-background/90 text-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-brass hover:text-white focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
      >
        <Plus className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </article>
  );
}