import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ProductCard from '@/components/shop/ProductCard';
import QuickView from '@/components/shop/QuickView';
import ShopFilters from '@/components/shop/ShopFilters';
import Reveal from '@/components/site/Reveal';
import { DEPARTMENTS } from '@/lib/catalog';

const PAGE_SIZE = 12;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const department = searchParams.get('department') || 'all';
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-created_date');
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [active, setActive] = useState(null);

  const query = () => {
    const filters = {};
    if (department !== 'all') filters.department = department;
    if (search.trim()) filters.name = { $regex: search.trim(), $options: 'i' };
    return filters;
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    base44.entities.Product.filter(query(), { sort, limit: PAGE_SIZE })
      .then((page) => {
        if (!active) return;
        setItems(page.items || []);
        setNextCursor(page.next_cursor || null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [department, search, sort]);

  const loadMore = async () => {
    if (!nextCursor) return;
    setLoadingMore(true);
    const page = await base44.entities.Product.filter(query(), {
      sort,
      limit: PAGE_SIZE,
      cursor: nextCursor,
    });
    setItems((previous) => [...previous, ...(page.items || [])]);
    setNextCursor(page.next_cursor || null);
    setLoadingMore(false);
  };

  const setDepartment = (key) => {
    const params = new URLSearchParams(searchParams);
    if (key === 'all') params.delete('department');
    else params.set('department', key);
    setSearchParams(params, { replace: true });
  };

  const current = DEPARTMENTS.find((entry) => entry.key === department);

  return (
    <>
      <section className="pt-[68px] md:pt-[76px]">
        <div className="mx-auto w-full max-w-[1680px] px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-12">
          <p className="eyebrow text-brass">
            {current ? current.name : 'The whole mart'}
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="display max-w-2xl text-[clamp(2.4rem,6vw,4.6rem)] text-foreground">
              {current ? `Shop ${current.short.toLowerCase()}` : 'Every shelf, in one place'}
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/55">
              {current
                ? current.blurb
                : 'Provisions, drinks, snacks and skincare for the week. Shop in store at July’s Mart, Awka.'}
            </p>
          </div>
        </div>
      </section>

      <ShopFilters
        department={department}
        onDepartment={setDepartment}
        search={search}
        onSearch={setSearch}
        sort={sort}
        onSort={setSort}
        total={items.length}
      />

      <section className="mx-auto w-full max-w-[1680px] px-5 py-10 md:px-10 md:py-14">
        {loading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-4 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[4/5] animate-pulse bg-secondary" />
                <div className="mt-4 h-2.5 w-1/3 animate-pulse bg-secondary" />
                <div className="mt-2.5 h-3.5 w-2/3 animate-pulse bg-secondary" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="border border-foreground/10 px-6 py-24 text-center">
            <p className="font-heading text-2xl text-foreground">Nothing on this shelf yet.</p>
            <p className="mt-2 text-sm text-foreground/50">
              Try another department, or clear the search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setDepartment('all');
              }}
              className="mt-7 border border-foreground/20 px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-ink hover:text-foreground"
            >
              Show everything
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:gap-x-4 lg:grid-cols-4 lg:gap-y-14">
              {items.map((product, index) => (
                <Reveal key={product.id} delay={(index % 4) * 0.05}>
                  <ProductCard product={product} onOpen={setActive} />
                </Reveal>
              ))}
            </div>

            {nextCursor && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="border border-foreground/20 px-8 py-4 text-[0.68rem] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-ink hover:text-foreground disabled:opacity-50"
                >
                  {loadingMore ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <QuickView product={active} onClose={() => setActive(null)} />
    </>
  );
}