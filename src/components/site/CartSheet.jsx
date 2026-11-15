import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { naira } from '@/lib/format';
import { productImage } from '@/lib/media';
import { useCart } from '@/context/CartContext';

export default function CartSheet() {
  const { items, open, setOpen, setQty, remove, subtotal, count } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-background"
          >
            <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
              <span className="eyebrow text-foreground/60">
                Your bag {count > 0 && `(${count})`}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="grid h-9 w-9 place-items-center text-foreground/60 transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-heading text-2xl text-foreground">Your bag is empty.</p>
                <p className="mt-2 text-sm text-foreground/50">
                  Start with the departments &mdash; provisions, drinks, snacks or skincare.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setOpen(false)}
                  className="mt-7 bg-ink px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass"
                >
                  Shop the mart
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  <ul className="divide-y divide-foreground/10">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-4 py-5">
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-secondary">
                          <Image
                            src={productImage(item)}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-heading text-[17px] leading-tight text-foreground">
                              {item.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label={`Remove ${item.name}`}
                              className="text-foreground/35 transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <p className="mt-1 text-[12px] text-foreground/45">{item.unit}</p>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-foreground/20">
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center text-foreground/60 hover:text-foreground"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-xs">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => setQty(item.id, item.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center text-foreground/60 hover:text-foreground"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm text-foreground/80">
                              {naira(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-foreground/10 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-foreground/45">Subtotal</span>
                    <span className="font-heading text-2xl text-foreground">
                      {naira(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-foreground/45">
                    Confirmed when we call you back. Nothing is charged here.
                  </p>
                  <Link
                    to="/checkout"
                    onClick={() => setOpen(false)}
                    className="mt-4 block bg-ink py-4 text-center text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass"
                  >
                    Request this order
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.16em] text-foreground/45 hover:text-foreground"
                  >
                    Keep shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}