import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X, Truck, MapPin } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { naira } from '@/lib/format';
import { productImage } from '@/lib/media';
import { departmentName } from '@/hooks/useCatalog';
import { useCart } from '@/context/CartContext';

export default function QuickView({ product, onClose }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const close = () => {
    setQty(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} />
          <motion.aside
            key={product.id}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[520px] flex-col overflow-y-auto bg-background"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
              <span className="eyebrow text-foreground/45">
                {departmentName(product.department)}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center text-foreground/60 transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="aspect-[4/5] w-full bg-secondary">
              <Image
                src={productImage(product)}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col px-5 py-6 md:px-8">
              <h2 className="display text-[clamp(1.9rem,4vw,2.6rem)] text-foreground">
                {product.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {product.blurb}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-heading text-2xl text-foreground">
                  {naira(product.price)}
                </span>
                <span className="text-xs text-foreground/45">{product.unit}</span>
              </div>

              <div className="mt-7 flex items-stretch gap-3">
                <div className="flex items-center border border-foreground/20">
                  <button
                    type="button"
                    onClick={() => setQty((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-12 w-11 place-items-center text-foreground/70 hover:text-foreground"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((value) => value + 1)}
                    aria-label="Increase quantity"
                    className="grid h-12 w-11 place-items-center text-foreground/70 hover:text-foreground"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    add(product, qty);
                    close();
                  }}
                  className="flex-1 bg-ink px-6 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass"
                >
                  Add to bag
                </button>
              </div>

              <div className="mt-8 space-y-3 border-t border-foreground/10 pt-6 text-[12px] text-foreground/55">
                <p className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-brass" strokeWidth={1.5} />
                  Same-day delivery across Awka on orders before 4pm
                </p>
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-brass" strokeWidth={1.5} />
                  Collect free at the counter, 12 Zik Avenue
                </p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}