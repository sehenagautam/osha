import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OptimizedImage from '../components/OptimizedImage';

const formatPrice = (npr: number) => `NPR ${npr.toLocaleString()}`;

function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (!items.length) {
    return (
      <main className="mx-auto w-[min(1180px,92vw)] py-14 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-slate-600 mt-1">Browse collections and add your favorite styles.</p>
        <Link to="/shop" className="inline-block mt-4 bg-accent text-white px-4 py-2 rounded-lg font-semibold">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-[min(1180px,92vw)] py-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
      <section>
        <h1 className="text-3xl font-display mb-4">Cart</h1>
        <div className="grid gap-3">
          {items.map((item) => (
            <article key={item.id} className="bg-white rounded-xl border border-slate-200 p-3 grid gap-3 md:grid-cols-[90px_1fr_auto_auto] items-center">
              <OptimizedImage src={item.image} alt={`${item.name} ${item.color}`} className="h-24 w-full md:w-[90px] rounded object-cover" />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-slate-500">
                  Color: {item.color} | Size: {item.size}
                </p>
                <p className="font-semibold">{formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center rounded border border-slate-300 overflow-hidden w-fit">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-slate-100">
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-slate-100">
                  +
                </button>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-bold">
                Remove
              </button>
            </article>
          ))}
        </div>
      </section>

      <aside className="bg-white rounded-xl border border-slate-200 p-4 h-fit space-y-3">
        <h3 className="font-bold text-xl">Order Summary</h3>
        <p>
          Subtotal <strong>{formatPrice(subtotal)}</strong>
        </p>
        <p className="text-sm text-slate-600">Delivery and final payment will be confirmed on WhatsApp.</p>
        <a
          href="https://wa.me/9779851003737"
          target="_blank"
          rel="noreferrer noopener"
          className="block text-center bg-accent text-white px-4 py-2 rounded-lg font-bold"
        >
          Order on WhatsApp
        </a>
        <button onClick={clearCart} className="w-full bg-slate-200 px-4 py-2 rounded-lg font-semibold">
          Clear Cart
        </button>
      </aside>
    </main>
  );
}

export default CartPage;
