import { SITE } from '@/lib/site';

export const naira = (amount) => `₦${Number(amount || 0).toLocaleString('en-NG')}`;

export const whatsappLink = (message) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

export const buildOrderMessage = ({ items, subtotal, customer, note }) => {
  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.name} × ${item.qty} — ${naira(item.price * item.qty)}`
  );

  return [
    `New order — ${SITE.name}`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    note ? `Note: ${note}` : null,
    '',
    ...lines,
    '',
    `Subtotal: ${naira(subtotal)}`,
    'Timing: confirmed on the phone',
  ]
    .filter((line) => line !== null)
    .join('\n');
};