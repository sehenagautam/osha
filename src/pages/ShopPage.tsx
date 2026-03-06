import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

function ShopPage({ products }: { products: Product[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? 'All';
  const subcategory = searchParams.get('subcategory') ?? 'All';

  const categories = ['All', ...new Set(products.map((item) => item.category))];
  const subcategories = [
    'All',
    ...new Set(
      products
        .filter((item) => category === 'All' || item.category === category)
        .map((item) => item.subcategory)
    )
  ];

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return products.filter((product) => {
      const inCategory = category === 'All' || product.category === category;
      const inSubcategory = subcategory === 'All' || product.subcategory === subcategory;
      const haystack = [
        product.name,
        product.description,
        product.category,
        product.subcategory,
        ...product.variants.map((v) => v.color)
      ]
        .join(' ')
        .toLowerCase();
      const searchMatch = !term || haystack.includes(term);
      return inCategory && inSubcategory && searchMatch;
    });
  }, [products, search, category, subcategory]);

  const updateFilter = (key: 'search' | 'category' | 'subcategory', value: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value || value === 'All') params.delete(key);
    else params.set(key, value);

    if (key === 'category') params.delete('subcategory');

    setSearchParams(params);
  };

  return (
    <main className="mx-auto w-[min(1180px,92vw)] py-7 grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit">
        <h3 className="font-bold text-lg mb-3">Search & Filter</h3>

        <label className="block text-sm text-slate-600 mb-3">
          Search
          <input
            value={search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-300 px-3 py-2"
            placeholder="Product, category, color"
          />
        </label>

        <label className="block text-sm text-slate-600 mb-3">
          Category
          <select
            value={category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-300 px-3 py-2"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-slate-600">
          Subcategory
          <select
            value={subcategory}
            onChange={(e) => updateFilter('subcategory', e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-300 px-3 py-2"
          >
            {subcategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </aside>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl">Collections</h2>
          <p className="text-slate-600">{filtered.length} products found</p>
        </div>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ShopPage;
