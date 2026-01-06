import { create } from 'zustand';
import { Product } from '@/data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    const { items } = get();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
  removeItem: (productId) => {
    const { items } = get();
    set({ items: items.filter((item) => item.id !== productId) });
  },
  updateQuantity: (productId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      set({ items: items.filter((item) => item.id !== productId) });
    } else {
      set({
        items: items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      });
    }
  },
  clearCart: () => set({ items: [] }),
  total: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
