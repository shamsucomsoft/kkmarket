import { apiClient } from "./api";
import type { Vendor, SearchResults } from "../types";

export class VendorService {
  async getVendors(params: { page?: number; limit?: number } = {}) {
    const res = await apiClient.get<SearchResults<Vendor>>("/vendors", params);
    return res.data!;
  }
}

export const vendorService = new VendorService();