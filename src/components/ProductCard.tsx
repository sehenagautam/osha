import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import OptimizedImage from './OptimizedImage';

const formatPrice = (npr: number) => `NPR ${npr.toLocaleString()}`;

function ProductCard({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id);
  const { addToCart } = useCart();

  const selected = useMemo(
    () => product.variants.find((item) => item.id === selectedVariantId) ?? product.variants[0],
    [product.variants, selectedVariantId]
  );

  const onAdd = () => {
    addToCart({
      productId: product.id,
      variantId: selected.id,
      name: product.name,
      color: selected.color,
      image: selected.image,
      price: selected.price,
      size: product.sizes[0] ?? 'Free Size'
    });
  };

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_38px_rgba(15,23,42,0.1)] transition">
      <Link to={`/product/${product.slug}`} className="block bg-slate-50 aspect-[3/4]">
        <OptimizedImage
          src={selected.image}
          alt={`${product.name} ${selected.color}`}
          className="w-full h-full object-contain p-3"
        />
      </Link>
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
          {product.category} / {product.subcategory}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="font-semibold text-[1.08rem] leading-7 mt-2 block hover:text-brand-500"
        >
          {product.name}
        </Link>
        <p className="font-extrabold text-brand-700 mt-2 text-2xl leading-none">{formatPrice(selected.price)}</p>

        {product.variants.length > 1 ? (
          <div className="flex flex-wrap gap-2 mt-3 mb-4">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`px-3 py-1 text-xs rounded-full border ${
                  variant.id === selected.id
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-slate-300 text-slate-600'
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-2 mb-4 text-sm text-slate-500">Color: {selected.color}</p>
        )}

        <button onClick={onAdd} className="w-full bg-accent text-white rounded-xl py-2.5 font-semibold tracking-wide">
          Add To Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
