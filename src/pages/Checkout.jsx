import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { useCart } from '@/context/CartContext';
import { buildOrderMessage, naira, whatsappLink } from '@/lib/format';
import { productImage } from '@/lib/media';
import { SITE } from '@/lib/site';

const emptyForm = { name: '', phone: '', address: '', note: '' };

export default function Checkout() {
  const { items, subtotal, count, clear } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [fulfilment, setFulfilment] = useState('delivery');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [placed, setPlaced] = useState(null);

  const update = (field) => (event) =>
    setForm((previous) => ({ ...previous, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Tell us who to ask for.';
    if (!form.phone.trim()) nextErrors.phone = 'We need a number to call you on.';
    if (fulfilment === 'delivery' && !form.address.trim()) {
      nextErrors.address = 'Add the address for delivery.';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSaving(true);

    const reference = `JM-${Math.floor(1000 + Math.random() * 9000)}`;
    const lines = items
      .map((item, index) => `${index + 1}. ${item.name} (${item.unit}) × ${item.qty} — ${naira(item.price * item.qty)}`)
      .join('\n');

    const order = await base44.entities.Order.create({
      reference,
      customer_name: form.name.trim(),
      phone: form.phone.trim(),
      address: fulfilment === 'delivery' ? form.address.trim() : 'Pick up at the mart',
      note: form.note.trim(),
      fulfilment,
      lines,
      item_count: count,
      subtotal,
      status: 'new',
    });

    setPlaced({
      reference: order?.reference || reference,
      message: buildOrderMessage({
        items,
        subtotal,
        customer: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          address: fulfilment === 'delivery' ? form.address.trim() : 'Pick up at the mart',
        },
        note: form.note.trim(),
      }),
    });
    clear();
    setSaving(false);
  };

  if (placed) {
    return (
      <section className="mx-auto w-full max-w-[1680px] px-5 pb-24 pt-[120px] md:px-10 md:pt-[160px]">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-brass text-brass">
            <Check className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <p className="mt-7 eyebrow text-foreground/40">Request {placed.reference}</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] text-foreground">
            Your order is with the concierge.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/60">
            We have your list. Send it on WhatsApp so the floor team can confirm
            stock and the total before anything leaves the mart.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <a
              href={whatsappLink(placed.message)}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-ink px-8 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass sm:w-auto"
            >
              Confirm on WhatsApp
            </a>
            <Link
              to="/shop"
              className="link-underline text-[0.68rem] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
            >
              Back to the mart
            </Link>
          </div>
          <p className="mt-10 text-[11px] text-foreground/35">
            {SITE.address} &middot; Open daily
          </p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto w-full max-w-[1680px] px-5 pb-24 pt-[120px] text-center md:px-10 md:pt-[160px]">
        <h1 className="display text-[clamp(2rem,5vw,3.2rem)] text-foreground">
          Your bag is empty.
        </h1>
        <p className="mt-3 text-sm text-foreground/55">
          Add a few things from the shelves and come back.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-ink px-7 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass"
        >
          Shop the mart
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1680px] px-5 pb-20 pt-[100px] md:px-10 md:pt-[136px]">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-foreground/45 hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Continue shopping
      </Link>

      <h1 className="display mt-6 text-[clamp(2.2rem,5vw,3.8rem)] text-foreground">
        Request your order
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/55">
        No card needed. Send the list, we call you to confirm stock, then you pay
        at the counter or on delivery.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <form onSubmit={submit} className="lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block sm:col-span-1">
              <span className="eyebrow text-[9px] text-foreground/45">Full name</span>
              <input
                value={form.name}
                onChange={update('name')}
                className="mt-2 w-full border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
                placeholder="Chidera Okeke"
              />
              {errors.name && <span className="mt-1.5 block text-[11px] text-destructive">{errors.name}</span>}
            </label>

            <label className="block sm:col-span-1">
              <span className="eyebrow text-[9px] text-foreground/45">Phone</span>
              <input
                value={form.phone}
                onChange={update('phone')}
                inputMode="tel"
                className="mt-2 w-full border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
                placeholder="0803 000 0000"
              />
              {errors.phone && <span className="mt-1.5 block text-[11px] text-destructive">{errors.phone}</span>}
            </label>
          </div>

          <div className="mt-8">
            <span className="eyebrow text-[9px] text-foreground/45">How should we get it to you?</span>
            <div className="mt-3 flex gap-3">
              {[
                { key: 'delivery', label: 'Deliver to me' },
                { key: 'pickup', label: 'Pick up at the mart' },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFulfilment(option.key)}
                  className={`flex-1 border px-4 py-3.5 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    fulfilment === option.key
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-foreground/15 text-foreground/60 hover:border-foreground/40'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {fulfilment === 'delivery' && (
            <label className="mt-8 block">
              <span className="eyebrow text-[9px] text-foreground/45">Delivery address</span>
              <textarea
                value={form.address}
                onChange={update('address')}
                rows={3}
                className="mt-2 w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
                placeholder="House number, street, area — Onitsha"
              />
              {errors.address && <span className="mt-1.5 block text-[11px] text-destructive">{errors.address}</span>}
            </label>
          )}

          <label className="mt-8 block">
            <span className="eyebrow text-[9px] text-foreground/45">Anything we should know?</span>
            <textarea
              value={form.note}
              onChange={update('note')}
              rows={2}
              className="mt-2 w-full resize-none border-b border-foreground/20 bg-transparent py-3 text-sm focus:border-ink focus:outline-none"
              placeholder="Ripe tomatoes, call before you arrive…"
            />
          </label>

          <button
            type="submit"
            disabled={saving}
            className="mt-10 inline-flex items-center gap-2 bg-ink px-8 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:bg-brass disabled:opacity-60"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {saving ? 'Sending…' : 'Send order request'}
          </button>
        </form>

        <aside className="lg:col-span-5">
          <div className="bg-secondary/70 p-6 md:p-8">
            <p className="eyebrow text-foreground/40">Your list ({count})</p>
            <ul className="mt-5 divide-y divide-foreground/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="h-16 w-14 shrink-0 overflow-hidden bg-background">
                    <Image
                      src={productImage(item)}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-[16px] leading-tight text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[11px] text-foreground/45">
                        {item.unit} &middot; qty {item.qty}
                      </p>
                    </div>
                    <span className="text-[13px] text-foreground/70">
                      {naira(item.price * item.qty)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-baseline justify-between border-t border-foreground/15 pt-5">
              <span className="eyebrow text-foreground/40">Subtotal</span>
              <span className="font-heading text-2xl text-foreground">{naira(subtotal)}</span>
            </div>
            <p className="mt-2 text-[11px] text-foreground/45">
              Confirmed on the phone. Nothing is charged here.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}