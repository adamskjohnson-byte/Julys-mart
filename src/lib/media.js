export const MEDIA = {
  // Store photography
  aisle:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/bbbd63581_generated_79586e86.png',
  fashion:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/cffdb3201_generated_e5f596dc.png',
  shoes:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/1005efac7_generated_72f3111e.png',
  beauty:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/665fd8bad_generated_fd8e73d4.png',
  exterior:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/979d37aca_generated_03d1cd93.png',
  atrium:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/7d8ccd51a_generated_54b88427.png',
  produce:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/0bac155e8_generated_e6348032.png',
  shopper:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/86193606d_generated_d0a5fa8e.png',

  // Product photography
  rice: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/6158a4673_generated_83b55c23.png',
  palmOil: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/a9a74e369_generated_74a66867.png',
  tomatoes: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/dd118230b_generated_cc816a9a.png',
  mackerel: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/a1e822e76_generated_d216d448.png',
  agbada: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/3526ae1f4_generated_05e38ac8.png',
  dress: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/2550983dd_generated_3621219e.png',
  kaftan: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/6cd6d595f_generated_32da1e1e.png',
  loafers: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/3e13ebd3f_generated_d48d4bdd.png',
  mules: '/__generating__/14ccba7d-3e50-4d86-b7a7-dd7231b29b5a7.png',
  tote: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/7a05c1a86_generated_b1366356.png',
  shea: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/3f9f65aad_generated_b00eb8f2.png',
  oud: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/12ec75525_generated_add84e57.png',
  serum: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/977fd1efd_generated_b32085f5.png',
};

export const DEPARTMENT_MEDIA = {
  groceries: MEDIA.aisle,
  fashion: MEDIA.fashion,
  shoes: MEDIA.shoes,
  beauty: MEDIA.beauty,
};

const isResolved = (url) =>
  typeof url === 'string' && url.length > 0 && !url.startsWith('/__generating__/');

/**
 * Product records may store either a full image URL or a key from MEDIA.
 * Until a product's own photograph is ready, its department photo stands in.
 */
export const resolveImage = (value, fallback = MEDIA.atrium) => {
  if (!value) return fallback;
  return MEDIA[value] || value;
};

export const productImage = (product = {}) => {
  const direct = MEDIA[product.image] || product.image;
  if (isResolved(direct)) return direct;
  return DEPARTMENT_MEDIA[product.department] || MEDIA.atrium;
};