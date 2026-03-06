import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '../types';

type AddToCartInput = Omit<CartItem, 'id' | 'quantity'>;

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addToCart: (input: AddToCartInput) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = 'osha_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (input: AddToCartInput) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === input.productId &&
          item.variantId === input.variantId &&
          item.size === input.size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...input, id: crypto.randomUUID(), quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => setItems([]);

  const { count, subtotal } = useMemo(() => {
    const countValue = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalValue = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { count: countValue, subtotal: subtotalValue };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return ctx;
}
