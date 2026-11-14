import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { DEPARTMENTS } from '@/lib/catalog';

export function useDepartments() {
  return DEPARTMENTS;
}

// Rotates through departments so the edit never shows two of the same shelf side by side.
function interleave(products) {
  const groups = {};
  products.forEach((product) => {
    groups[product.department] = groups[product.department] || [];
    groups[product.department].push(product);
  });
  const ordered = [];
  let remaining = true;
  while (remaining) {
    remaining = false;
    Object.keys(groups).forEach((key) => {
      const next = groups[key].shift();
      if (next) {
        ordered.push(next);
        remaining = true;
      }
    });
  }
  return ordered;
}

export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    base44.entities.Product.filter(
      { featured: true },
      { limit, sort: 'created_date' }
    ).then((page) => {
      if (active) setProducts(interleave(page.items || []));
    });
    return () => {
      active = false;
    };
  }, [limit]);

  return products;
}

export function departmentName(key) {
  return DEPARTMENTS.find((department) => department.key === key)?.short || key;
}