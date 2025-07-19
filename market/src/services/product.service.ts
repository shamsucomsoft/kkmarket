import { apiClient } from "./api";
import type { Product, SearchFilters, SearchResults, Review } from "../types";

export class ProductService {
  // Get all products with search and filters
  async getProducts(
    filters: SearchFilters = {}
  ): Promise<SearchResults<Product>> {
    const response = await apiClient.get<SearchResults<Product>>(
      "/products",
      filters
    );
    return response;
  }

  // Get single product by ID
  async getProduct(productId: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${productId}`);
    return response;
  }

  // Search products with advanced filtering
  async searchProducts(
    filters: SearchFilters
  ): Promise<SearchResults<Product>> {
    const response = await apiClient.get<SearchResults<Product>>(
      "/products/search",
      filters
    );
    return response;
  }

  // Get search suggestions for autocomplete
  async getSearchSuggestions(query: string): Promise<string[]> {
    const response = await apiClient.get<string[]>("/products/suggestions", {
      query,
    });
    return response;
  }

  // Get featured products
  async getFeaturedProducts(limit = 12): Promise<Product[]> {
    const response = await apiClient.get<Product[]>("/products/featured", {
      limit,
    });
    return response;
  }

  // Get products by category
  async getProductsByCategory(
    category: string,
    filters: SearchFilters = {}
  ): Promise<SearchResults<Product>> {
    const response = await apiClient.get<SearchResults<Product>>(
      `/products/category/${category}`,
      filters
    );
    return response;
  }

  // Get products by vendor
  async getProductsByVendor(
    vendorId: string,
    filters: SearchFilters = {}
  ): Promise<SearchResults<Product>> {
    const response = await apiClient.get<SearchResults<Product>>(
      `/vendors/${vendorId}/products`,
      filters
    );
    return response;
  }

  // Get related products
  async getRelatedProducts(productId: string, limit = 8): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(
      `/products/${productId}/related`,
      { limit }
    );
    return response;
  }

  // Get product reviews
  async getProductReviews(
    productId: string,
    page = 1,
    limit = 20
  ): Promise<SearchResults<Review>> {
    const response = await apiClient.get<SearchResults<Review>>(
      `/products/${productId}/reviews`,
      {
        page,
        limit,
      }
    );
    return response;
  }

  // VENDOR ENDPOINTS (Protected)

  // Create new product (vendor only)
  async createProduct(productData: Partial<Product>): Promise<Product> {
    const response = await apiClient.post<Product>("/products", productData);
    return response;
  }

  // Update existing product (vendor only)
  async updateProduct(
    productId: string,
    productData: Partial<Product>
  ): Promise<Product> {
    const response = await apiClient.put<Product>(
      `/products/${productId}`,
      productData
    );
    return response;
  }

  // Delete product (vendor only)
  async deleteProduct(productId: string): Promise<void> {
    await apiClient.delete(`/products/${productId}`);
  }

  // Upload product images
  async uploadProductImages(
    productId: string,
    images: File[]
  ): Promise<string[]> {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const response = await apiClient.upload<string[]>(
      `/products/${productId}/images`,
      formData
    );
    return response;
  }

  // Get vendor's products (vendor only)
  async getVendorProducts(
    filters: SearchFilters = {}
  ): Promise<SearchResults<Product>> {
    const response = await apiClient.get<SearchResults<Product>>(
      "/products/vendor/my-products",
      filters
    );
    return response;
  }

  // Get product analytics for vendor
  async getProductAnalytics(productId: string, days = 30): Promise<any> {
    const response = await apiClient.get(
      `/vendor/products/${productId}/analytics`,
      { days }
    );
    return response;
  }

  // Bulk update product status
  async bulkUpdateProductStatus(
    productIds: string[],
    status: string
  ): Promise<void> {
    await apiClient.put("/vendor/products/bulk-status", {
      productIds,
      status,
    });
  }

  // Get categories with product counts
  async getCategories(): Promise<
    { name: string; nameHa: string; count: number }[]
  > {
    const response = await apiClient.get<
      { name: string; nameHa: string; count: number }[]
    >("/products/categories");
    return response;
  }

  // Get price range for filters
  async getPriceRange(): Promise<{ min: number; max: number }> {
    const response = await apiClient.get<{ min: number; max: number }>(
      "/products/price-range"
    );
    return response;
  }
}

export const productService = new ProductService();
