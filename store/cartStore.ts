"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Cart } from "@/types";

interface CartStore {
  cart: Cart;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setShipping: (amount: number) => void;
}

const calculateTotals = (
  items: CartItem[],
  discount: number,
  shipping: number
) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal - discount + tax + shipping;
  return { subtotal, tax, total };
};

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addItem: (item) => {
        const { cart } = get();
        const existingIndex = cart.items.findIndex(
          (i) =>
            i.productId === item.productId && i.variantId === item.variantId
        );

        let newItems: CartItem[];
        if (existingIndex > -1) {
          newItems = cart.items.map((i, idx) =>
            idx === existingIndex
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newItems = [...cart.items, { ...item, id: crypto.randomUUID() }];
        }

        const totals = calculateTotals(newItems, cart.discount, cart.shipping);
        set({ cart: { ...cart, items: newItems, ...totals } });
      },

      removeItem: (itemId) => {
        const { cart } = get();
        const newItems = cart.items.filter((i) => i.id !== itemId);
        const totals = calculateTotals(newItems, cart.discount, cart.shipping);
        set({ cart: { ...cart, items: newItems, ...totals } });
      },

      updateQuantity: (itemId, quantity) => {
        const { cart } = get();
        if (quantity < 1) return;

        const newItems = cart.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        );
        const totals = calculateTotals(newItems, cart.discount, cart.shipping);
        set({ cart: { ...cart, items: newItems, ...totals } });
      },

      clearCart: () => set({ cart: initialCart }),

      applyCoupon: (code, discount) => {
        const { cart } = get();
        const totals = calculateTotals(cart.items, discount, cart.shipping);
        set({ cart: { ...cart, couponCode: code, discount, ...totals } });
      },

      removeCoupon: () => {
        const { cart } = get();
        const totals = calculateTotals(cart.items, 0, cart.shipping);
        set({
          cart: { ...cart, couponCode: undefined, discount: 0, ...totals },
        });
      },

      setShipping: (amount) => {
        const { cart } = get();
        const totals = calculateTotals(cart.items, cart.discount, amount);
        set({ cart: { ...cart, shipping: amount, ...totals } });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
