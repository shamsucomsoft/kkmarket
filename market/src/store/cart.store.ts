import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart, CartItem, Product, ProductVariant } from "../types";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (
    product: Product,
    variant?: ProductVariant,
    quantity?: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: string, variantId?: string) => boolean;
  getCartItem: (productId: string, variantId?: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isLoading: false,
      error: null,

      addToCart: (product: Product, variant?: ProductVariant, quantity = 1) => {
        const state = get();
        const existingCart = state.cart;

        // Calculate price including variant adjustment
        const price = variant
          ? product.basePrice + variant.priceAdjustment
          : product.basePrice;

        // Check if item already exists in cart
        const existingItemIndex =
          existingCart?.items.findIndex(
            (item) =>
              item.productId === product.id && item.variantId === variant?.id
          ) ?? -1;

        if (existingItemIndex >= 0 && existingCart) {
          // Update existing item quantity
          const updatedItems = [...existingCart.items];
          updatedItems[existingItemIndex].quantity += quantity;

          const updatedCart = {
            ...existingCart,
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.priceAtTime * item.quantity,
              0
            ),
            updatedAt: new Date().toISOString(),
          };

          set({ cart: updatedCart });
        } else {
          // Add new item to cart
          const newItem: CartItem = {
            id: `${product.id}-${variant?.id || "base"}-${Date.now()}`,
            productId: product.id,
            product,
            variantId: variant?.id,
            variant,
            quantity,
            priceAtTime: price,
            addedAt: new Date().toISOString(),
          };

          const updatedItems = existingCart
            ? [...existingCart.items, newItem]
            : [newItem];
          const updatedCart: Cart = {
            id: existingCart?.id || `cart-${Date.now()}`,
            userId: existingCart?.userId || "guest",
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.priceAtTime * item.quantity,
              0
            ),
            updatedAt: new Date().toISOString(),
          };

          set({ cart: updatedCart });
        }
      },

      removeFromCart: (itemId: string) => {
        const state = get();
        if (!state.cart) return;

        const updatedItems = state.cart.items.filter(
          (item) => item.id !== itemId
        );
        const updatedCart = {
          ...state.cart,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.priceAtTime * item.quantity,
            0
          ),
          updatedAt: new Date().toISOString(),
        };

        set({ cart: updatedCart });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const state = get();
        if (!state.cart || quantity < 1) return;

        const updatedItems = state.cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        const updatedCart = {
          ...state.cart,
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
          totalPrice: updatedItems.reduce(
            (sum, item) => sum + item.priceAtTime * item.quantity,
            0
          ),
          updatedAt: new Date().toISOString(),
        };

        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: null, error: null });
      },

      getCartTotal: () => {
        const state = get();
        return state.cart?.totalPrice || 0;
      },

      getCartItemCount: () => {
        const state = get();
        return state.cart?.totalItems || 0;
      },

      isInCart: (productId: string, variantId?: string) => {
        const state = get();
        if (!state.cart) return false;

        return state.cart.items.some(
          (item) => item.productId === productId && item.variantId === variantId
        );
      },

      getCartItem: (productId: string, variantId?: string) => {
        const state = get();
        if (!state.cart) return undefined;

        return state.cart.items.find(
          (item) => item.productId === productId && item.variantId === variantId
        );
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);
