import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import OptimizedImage from '../components/OptimizedImage';

const formatPrice = (npr: number) => `NPR ${npr.toLocaleString()}`;

function ProductPage({ products }: { products: Product[] }) {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0]?.id ?? '');
  const [size, setSize] = useState(product?.sizes[0] ?? 'Free Size');
  const { addToCart } = useCart();

  const selected = useMemo(() => {
    if (!product) return null;
    return product.variants.find((item) => item.id === selectedVariantId) ?? product.variants[0];
  }, [product, selectedVariantId]);

  if (!product || !selected) {
    return (
      <main className="mx-auto w-[min(1180px,92vw)] py-14 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded-lg font-semibold">
          Back to Shop
        </Link>
      </main>
    );
  }

  const onAdd = () => {
    addToCart({
      productId: product.id,
      variantId: selected.id,
      name: product.name,
      color: selected.color,
      image: selected.image,
      price: selected.price,
      size
    });
  };

  return (
    <main className="mx-auto w-[min(1180px,92vw)] py-8 grid gap-6 md:grid-cols-[minmax(280px,480px)_1fr]">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <OptimizedImage
          src={selected.image}
          alt={`${product.name} ${selected.color}`}
          className="w-full aspect-[3/4] object-contain p-3 bg-slate-50"
          priority
        />
      </div>

      <section>
        <p className="text-xs text-slate-500">
          {product.category} / {product.subcategory}
        </p>
        <h1 className="font-display text-4xl mt-1">{product.name}</h1>
        <p className="mt-4 text-slate-700">{selected.description ?? product.description}</p>
        <p className="text-slate-500 mt-2">Material: {product.material}</p>
        <p className="text-2xl font-extrabold text-brand-700 mt-3">{formatPrice(selected.price)}</p>

        <div className="mt-5">
          <p className="font-semibold mb-2">Color</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  variant.id === selected.id
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-slate-300 text-slate-600'
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="size" className="font-semibold">
            Size
          </label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full mt-1 rounded-lg border border-slate-300 px-3 py-2 max-w-xs"
          >
            {product.sizes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <button onClick={onAdd} className="mt-5 bg-accent text-white px-5 py-3 rounded-xl font-bold">
          Add To Cart
        </button>
      </section>
    </main>
  );
}

export default ProductPage;
