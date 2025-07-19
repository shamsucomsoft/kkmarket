import { apiClient } from "./api";
import type { Wishlist, WishlistItem, Product } from "../types";

export class WishlistService {
  // Get user's wishlist
  async getWishlist(): Promise<Wishlist> {
    const response = await apiClient.get<Wishlist>("/wishlist");
    return response;
  }

  // Add product to wishlist
  async addToWishlist(productId: string): Promise<WishlistItem> {
    const response = await apiClient.post<WishlistItem>("/wishlist", {
      productId,
    });
    return response;
  }

  // Remove product from wishlist
  async removeFromWishlist(productId: string): Promise<void> {
    await apiClient.delete(`/wishlist/${productId}`);
  }

  // Check if product is in wishlist
  async isInWishlist(productId: string): Promise<boolean> {
    try {
      const response = await apiClient.get<{ isInWishlist: boolean }>(
        `/wishlist/check/${productId}`
      );
      return response.isInWishlist;
    } catch {
      return false;
    }
  }

  // Move item from wishlist to cart
  async moveToCart(productId: string, quantity = 1): Promise<void> {
    await apiClient.post("/wishlist/move-to-cart", { productId, quantity });
  }

  // Clear entire wishlist
  async clearWishlist(): Promise<void> {
    await apiClient.delete("/wishlist");
  }
}

export const wishlistService = new WishlistService();
