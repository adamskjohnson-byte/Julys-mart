export const MEDIA = {
  // Department photography
  provisions:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/803cb3e6b_generated_image.png',
  provisionsDepartment: '/images/sections.jpeg',
  provisionsHero: '/images/provitions.jpeg',
  drinks:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/c2970d87c_generated_image.png',
  drinksHero: '/images/softdrinks.jpeg',
  drinksDepartment: '/images/softdrinks.jpeg',
  snacks:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/c0e1d1475_generated_image.png',
  snacksHero: '/images/snacks.jpeg',
  snacksDepartment: '/images/biscuits.jpeg',
  skincare:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/8afe145c5_generated_image.png',
  skincareDepartment: '/images/skincare.jpeg',

  // Store photography
  exterior:
    '/images/shoppingproof.jpeg',
  atrium:
    '/images/fruits.jpeg',
  produce:
    '/images/creams.jpeg',

  // Product photography
  rice: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/a3cfcfb24_generated_image.png',
  oil: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/5e394355c_generated_image.png',
  spaghetti:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/8c702d4be_generated_image.png',
  wine: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/0bec138cb_generated_image.png',
  malt: 'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/3a2325fb7_generated_image.png',
  juice:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/21433ea6b_generated_image.png',
  crackers:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/899adb7a3_generated_image.png',
  digestive:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/cf4104811_generated_image.png',
  cookies:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/425623f8f_generated_image.png',
  sheaCream:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/9ed7fdf94_generated_image.png',
  faceCream:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/79c4226b5_generated_image.png',
  lotion:
    'https://media.base44.com/images/public/6af8779ac9354199bfa6f2f1/676d9552b_generated_image.png',
};

export const DEPARTMENT_MEDIA = {
  provisions: MEDIA.provisions,
  drinks: MEDIA.drinks,
  snacks: MEDIA.snacks,
  skincare: MEDIA.skincare,
};

const isResolved = (url) =>
  typeof url === 'string' && url.length > 0 && !url.startsWith('/__generating__/');

/**
 * Product records may store either a full image URL or a key from MEDIA.
 * Until a product's own photograph is ready, its department photo stands in.
 */
export const resolveImage = (value, fallback = MEDIA.provisions) => {
  if (!value) return fallback;
  return MEDIA[value] || value;
};

export const productImage = (product = {}) => {
  const direct = MEDIA[product.image] || product.image;
  if (isResolved(direct)) return direct;
  return DEPARTMENT_MEDIA[product.department] || MEDIA.provisions;
};