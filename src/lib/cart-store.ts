'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, VideoMessage, SingingTelegram } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, videoMessage?: VideoMessage, singingTelegram?: SingingTelegram) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  promoCode: string | null;
  discount: number;
  setPromoCode: (code: string | null, discount: number) => void;
  deliveryOption: 'standard' | 'same-day';
  setDeliveryOption: (option: 'standard' | 'same-day') => void;
  getDeliveryFee: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discount: 0,
      deliveryOption: 'standard',

      addItem: (product, quantity = 1, videoMessage, singingTelegram) => {
        const items = get().items;
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { product, quantity, videoMessage, singingTelegram },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], promoCode: null, discount: 0 });
      },

      getTotal: () => {
        const items = get().items;
        const subtotal = items.reduce((total, item) => {
          let itemTotal = item.product.price * item.quantity;
          if (item.singingTelegram?.enabled) {
            itemTotal += item.singingTelegram.price;
          }
          return total + itemTotal;
        }, 0);
        const discount = get().discount;
        const deliveryFee = get().getDeliveryFee();
        return Math.max(0, subtotal - discount + deliveryFee);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      setPromoCode: (code, discount) => {
        set({ promoCode: code, discount });
      },

      setDeliveryOption: (option) => {
        set({ deliveryOption: option });
      },

      getDeliveryFee: () => {
        return get().deliveryOption === 'same-day' ? 12.99 : 6.99;
      },
    }),
    {
      name: 'toronto-gifts-cart',
    }
  )
);
