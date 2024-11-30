import { create } from 'zustand';
import { CartItem, Product, User } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setUser: (user: User | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  wishlist: [],
  user: null,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        cartItem => cartItem.productId === item.productId && cartItem.size === item.size
      );

      if (existingItem) {
        return {
          cart: state.cart.map(cartItem =>
            cartItem.productId === item.productId && cartItem.size === item.size
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        };
      }

      return {
        cart: [...state.cart, item]
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId)
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    })),
  clearCart: () => set({ cart: [] }),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId]
    })),
  setUser: (user) => set({ user })
}));