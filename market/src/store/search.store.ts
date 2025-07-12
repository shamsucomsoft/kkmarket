import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, SearchFilters, SearchResults } from "../types";
import { productService } from "../services/product.service";
import { handleApiError } from "../services/api";

interface SearchState {
  query: string;
  filters: SearchFilters;
  results: SearchResults<Product> | null;
  suggestions: string[];
  searchHistory: string[];
  isLoading: boolean;
  error: string | null;
  facets: {
    categories: { name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    ratings: { rating: number; count: number }[];
  } | null;

  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearFilters: () => void;
  searchProducts: () => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  clearError: () => void;
  loadMore: () => Promise<void>;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      query: "",
      filters: {
        page: 1,
        limit: 20,
        sortBy: "newest",
      },
      results: null,
      suggestions: [],
      searchHistory: [],
      isLoading: false,
      error: null,
      facets: null,

      setQuery: (query: string) => {
        set({ query });
      },

      setFilters: (newFilters: Partial<SearchFilters>) => {
        const currentFilters = get().filters;
        set({
          filters: {
            ...currentFilters,
            ...newFilters,
            page: newFilters.page || 1, // Reset to page 1 when filters change
          },
        });
      },

      clearFilters: () => {
        set({
          filters: {
            page: 1,
            limit: 20,
            sortBy: "newest",
          },
        });
      },

      searchProducts: async () => {
        const { query, filters } = get();
        set({ isLoading: true, error: null });

        try {
          const searchFilters = {
            ...filters,
            ...(query ? { query } : {}),
          };

          const results = await productService.searchProducts(searchFilters);

          set({
            results,
            facets: results.facets || null,
            isLoading: false,
          });

          // Add to search history if query exists
          if (query.trim()) {
            get().addToHistory(query.trim());
          }
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
        }
      },

      getSuggestions: async (query: string) => {
        if (!query.trim()) {
          set({ suggestions: [] });
          return;
        }

        try {
          const suggestions = await productService.getSearchSuggestions(query);
          set({ suggestions });
        } catch (error) {
          // Silently fail for suggestions
          set({ suggestions: [] });
        }
      },

      addToHistory: (query: string) => {
        const { searchHistory } = get();
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) return;

        const updatedHistory = [
          normalizedQuery,
          ...searchHistory.filter((item) => item !== normalizedQuery),
        ].slice(0, 10); // Keep only last 10 searches

        set({ searchHistory: updatedHistory });
      },

      clearHistory: () => {
        set({ searchHistory: [] });
      },

      clearError: () => {
        set({ error: null });
      },

      loadMore: async () => {
        const { filters, results } = get();

        if (
          !results ||
          results.pagination.page >= results.pagination.totalPages
        ) {
          return;
        }

        const nextPage = results.pagination.page + 1;
        set({
          filters: { ...filters, page: nextPage },
          isLoading: true,
        });

        try {
          const { query } = get();
          const searchFilters = {
            ...filters,
            page: nextPage,
            ...(query ? { query } : {}),
          };

          const newResults = await productService.searchProducts(searchFilters);

          // Append new results to existing ones
          const combinedResults = {
            ...newResults,
            data: [...results.data, ...newResults.data],
          };

          set({
            results: combinedResults,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "search-storage",
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        filters: {
          sortBy: state.filters.sortBy,
        },
      }),
    }
  )
);
