import { Search, X } from 'lucide-react';
import { DEPARTMENTS } from '@/lib/catalog';

const SORTS = [
  { value: '-created_date', label: 'Latest' },
  { value: 'price', label: 'Price: low to high' },
  { value: '-price', label: 'Price: high to low' },
  { value: 'name', label: 'A — Z' },
];

export default function ShopFilters({
  department,
  onDepartment,
  search,
  onSearch,
  sort,
  onSort,
  total,
}) {
  const chips = [{ key: 'all', short: 'Everything' }, ...DEPARTMENTS];

  return (
    <div className="sticky top-[68px] z-30 border-y border-foreground/10 bg-background/90 backdrop-blur-xl md:top-[76px]">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {chips.map((chip) => {
            const active = department === chip.key;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => onDepartment(chip.key)}
                className={`shrink-0 border px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                  active
                    ? 'border-ink bg-ink text-ivory'
                    : 'border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {chip.short}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-t border-foreground/10 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5 border-b border-foreground/15 pb-2 sm:w-64">
            <Search className="h-4 w-4 text-foreground/35" strokeWidth={1.5} />
            <input
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search the mart"
              aria-label="Search products"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/35 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearch('')}
                aria-label="Clear search"
                className="text-foreground/35 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] text-foreground/40">
              {total} {total === 1 ? 'item' : 'items'}
            </span>
            <select
              value={sort}
              onChange={(event) => onSort(event.target.value)}
              aria-label="Sort products"
              className="bg-transparent text-[10px] uppercase tracking-[0.16em] text-foreground/60 focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}