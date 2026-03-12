import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OptimizedImage from '../components/OptimizedImage';

const formatPrice = (value: number) => `Rs ${value.toLocaleString()}`;
const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1481301750744092682/Towd38cHyHjFoL7ABPxirW77qrVKt4sWwyjjITbFMP-VDMcqfWdyPlG4Zb6qu3s_jcl8';

type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

const initialForm: CheckoutForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: ''
};

function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const onChange =
    (key: keyof CheckoutForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const buildOrderLines = () => {
    const lines = items.map(
      (item) =>
        `${item.name} (${item.color}, ${item.size}) x${item.quantity} = ${formatPrice(
          item.price * item.quantity
        )}`
    );
    const full = lines.join('\n');
    return full.length > 1000 ? `${full.slice(0, 997)}...` : full;
  };

  const placeOrder = async () => {
    if (!items.length) {
      setFeedback({ type: 'error', text: 'Your cart is empty.' });
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      setFeedback({ type: 'error', text: 'Please fill Customer Name, Phone Number, and Delivery Address.' });
      return;
    }

    setPlacingOrder(true);
    setFeedback(null);

    try {
      const payload = {
        content: 'New front-end cart checkout request',
        embeds: [
          {
            title: 'New Order',
            color: 8195151,
            fields: [
              { name: 'Customer Name', value: form.name.trim(), inline: false },
              { name: 'Phone Number', value: form.phone.trim(), inline: false },
              { name: 'Email', value: form.email.trim() || 'N/A', inline: false },
              { name: 'Address', value: form.address.trim(), inline: false },
              { name: 'Total Items', value: String(totalItems), inline: false },
              { name: 'Subtotal', value: formatPrice(subtotal), inline: false },
              { name: 'Order Items', value: buildOrderLines(), inline: false },
              { name: 'Notes', value: form.notes.trim() || 'N/A', inline: false }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      clearCart();
      setForm(initialForm);
      setFeedback({ type: 'success', text: 'Order placed successfully. Your checkout request has been sent.' });
    } catch {
      setFeedback({
        type: 'error',
        text: 'Could not send order to checkout channel. Please try again.'
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="mx-auto w-[min(1240px,94vw)] py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl font-display text-brand-900">Your Cart</h1>
        <Link to="/shop" className="bg-white border border-slate-300 px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-50">
          Continue Shopping
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
        <section className="bg-[#f7f4f4] border border-[#dfd5d5] rounded-2xl p-5 min-h-[560px]">
          {!items.length ? (
            <p className="text-slate-600 text-lg">Your cart is currently empty.</p>
          ) : (
            <div className="grid gap-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-[#e6dfdf] p-3 grid gap-3 md:grid-cols-[88px_1fr_auto_auto] items-center"
                >
                  <OptimizedImage
                    src={item.image}
                    alt={`${item.name} ${item.color}`}
                    className="h-24 w-full md:w-[88px] rounded object-contain bg-[#f5f5f5]"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-500">
                      Color: {item.color} | Size: {item.size}
                    </p>
                    <p className="font-semibold text-brand-900">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center rounded border border-slate-300 overflow-hidden w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="text-red-600 font-semibold text-sm">
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="bg-[#f7f4f4] border border-[#dfd5d5] rounded-2xl p-5 h-fit">
          <h2 className="text-4xl font-display text-brand-900 mb-4">Checkout Details</h2>
          <p className="text-slate-700 mb-4">
            Total ({totalItems} items): <strong>{formatPrice(subtotal)}</strong>
          </p>

          <div className="space-y-3">
            <input
              value={form.name}
              onChange={onChange('name')}
              placeholder="Customer Name *"
              className="w-full rounded-xl border border-[#d8cdcd] bg-[#f1ecec] px-4 py-3"
            />
            <input
              value={form.phone}
              onChange={onChange('phone')}
              placeholder="Phone Number *"
              className="w-full rounded-xl border border-[#d8cdcd] bg-[#f1ecec] px-4 py-3"
            />
            <input
              value={form.email}
              onChange={onChange('email')}
              placeholder="Email (optional)"
              className="w-full rounded-xl border border-[#d8cdcd] bg-[#f1ecec] px-4 py-3"
            />
            <textarea
              value={form.address}
              onChange={onChange('address')}
              placeholder="Delivery Address *"
              rows={3}
              className="w-full rounded-xl border border-[#d8cdcd] bg-[#f1ecec] px-4 py-3 resize-none"
            />
            <textarea
              value={form.notes}
              onChange={onChange('notes')}
              placeholder="Notes (optional)"
              rows={3}
              className="w-full rounded-xl border border-[#d8cdcd] bg-[#f1ecec] px-4 py-3 resize-none"
            />
          </div>

          {feedback ? (
            <p
              className={`mt-4 text-sm ${
                feedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {feedback.text}
            </p>
          ) : null}

          <button
            onClick={placeOrder}
            disabled={placingOrder}
            className="w-full mt-4 bg-accent text-white rounded-xl py-3.5 font-bold disabled:opacity-70"
          >
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
