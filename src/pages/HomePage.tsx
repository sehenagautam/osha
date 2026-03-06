import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

function HomePage({ products }: { products: Product[] }) {
  const featuredOrder = [
    'koshki-floral-kurthi-red',
    'bridge-town-party-set-red',
    'cazora-comfort-fit-maroon',
    'portway-signature-set-light-maroon',
    'koshki-brand-signature-kurthi',
    'party-wear-designer-dress',
    'mk-woolen-signature-set',
    'dola-silk-festive'
  ];

  const featured = [
    ...featuredOrder
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => Boolean(product))
  ];

  return (
    <>
      <section className="py-12 md:py-14">
        <div className="mx-auto w-[min(1280px,95vw)] bg-gradient-to-br from-brand-700 via-brand-500 to-[#169187] rounded-[2rem] text-white p-7 md:p-12 grid gap-8 md:grid-cols-[0.86fr_1.14fr] items-center overflow-hidden shadow-[0_24px_70px_rgba(15,118,110,0.28)]">
          <div className="relative z-10">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-brand-100/90">New Season Collection</p>
            <h1 className="font-display text-4xl md:text-6xl mt-3 leading-[1.03]">OSHA Clothing & Apparels</h1>
            <p className="text-brand-100/95 mt-5 max-w-xl text-[17px] leading-8">
              Handcrafted kurtha, cord sets, party wear, and winter collections with rich embroidery, soft drape, and
              elegant silhouettes for festive and everyday styling.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-accent text-white px-6 py-3.5 rounded-xl mt-7 font-bold tracking-wide hover:brightness-110 transition"
            >
              Shop Collection
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/25 shadow-2xl bg-black/20">
              <video
                className="w-full h-[350px] md:h-[500px] object-contain bg-black/30"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/optimized/koshki_red.jpg"
              >
                <source src="/krutha_video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent pointer-events-none" />
              <div className="absolute left-4 bottom-4 md:left-7 md:bottom-7 pointer-events-none">
                <p className="text-sm md:text-base font-medium tracking-wide text-white/65">Style Spotlight</p>
                <p className="text-xl md:text-3xl font-semibold text-white/55">Featured Kurtha Video</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1240px,94vw)] flex items-center justify-between">
        <h2 className="font-display text-4xl md:text-5xl leading-tight">Featured Products</h2>
        <Link to="/shop" className="font-semibold tracking-wide text-brand-500 uppercase text-sm">
          View All
        </Link>
      </section>

      <section className="mx-auto w-[min(1240px,94vw)] grid gap-5 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] py-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

export default HomePage;
