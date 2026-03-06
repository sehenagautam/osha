import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import type { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`/data/products.json?v=${Date.now()}`, { cache: 'no-store' });
        const data = (await response.json()) as Product[];
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const schema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'OSHA Clothing & Apparels',
      url: 'https://osha-clothing.vercel.app',
      image: 'https://osha-clothing.vercel.app/optimized/osha_logo.jpg',
      sameAs: ['https://www.facebook.com/profile.php?id=61583871238196'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+9779851003737',
        contactType: 'customer service',
        areaServed: 'NP'
      }
    }),
    []
  );

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      {loading ? (
        <main className="mx-auto w-[min(1180px,92vw)] py-12 text-center">
          <h2 className="text-2xl font-bold">Loading collections...</h2>
        </main>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/shop" element={<ShopPage products={products} />} />
          <Route path="/product/:slug" element={<ProductPage products={products} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
