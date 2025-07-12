import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Wishlist, WishlistItem, Product } from "../types";
import { wishlistService } from "../services/wishlist.service";
import { handleApiError } from "../services/api";

interface WishlistState {
  wishlist: Wishlist | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
  getWishlistCount: () => number;
  clearError: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: null,
      isLoading: false,
      error: null,

      loadWishlist: async () => {
        set({ isLoading: true, error: null });
        try {
          const wishlist = await wishlistService.getWishlist();
          set({ wishlist, isLoading: false });
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
        }
      },

      addToWishlist: async (product: Product) => {
        set({ isLoading: true, error: null });
        try {
          const newItem = await wishlistService.addToWishlist(product.id);

          const state = get();
          const updatedWishlist = state.wishlist
            ? {
                ...state.wishlist,
                items: [...state.wishlist.items, newItem],
                updatedAt: new Date().toISOString(),
              }
            : {
                id: `wishlist-${Date.now()}`,
                userId: "current-user",
                items: [newItem],
                updatedAt: new Date().toISOString(),
              };

          set({ wishlist: updatedWishlist, isLoading: false });
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
          throw error;
        }
      },

      removeFromWishlist: async (productId: string) => {
        set({ isLoading: true, error: null });
        try {
          await wishlistService.removeFromWishlist(productId);

          const state = get();
          if (state.wishlist) {
            const updatedItems = state.wishlist.items.filter(
              (item) => item.productId !== productId
            );

            set({
              wishlist: {
                ...state.wishlist,
                items: updatedItems,
                updatedAt: new Date().toISOString(),
              },
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
          throw error;
        }
      },

      toggleWishlist: async (product: Product) => {
        const isCurrentlyInWishlist = get().isInWishlist(product.id);

        if (isCurrentlyInWishlist) {
          await get().removeFromWishlist(product.id);
        } else {
          await get().addToWishlist(product);
        }
      },

      isInWishlist: (productId: string) => {
        const state = get();
        return (
          state.wishlist?.items.some((item) => item.productId === productId) ||
          false
        );
      },

      clearWishlist: async () => {
        set({ isLoading: true, error: null });
        try {
          await wishlistService.clearWishlist();
          set({ wishlist: null, isLoading: false });
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
          throw error;
        }
      },

      getWishlistCount: () => {
        const state = get();
        return state.wishlist?.items.length || 0;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        wishlist: state.wishlist,
      }),
    }
  )
);
