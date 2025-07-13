import { apiClient } from "./api";
import type { Order, SearchResults } from "../types";

export class OrderService {
  // Customer: Create order
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const response = await apiClient.post<Order>("/orders", orderData);
    return response.data!;
  }

  // Customer: Get own orders
  async getMyOrders(params: { page?: number; limit?: number } = {}): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>("/orders", params);
    return response.data!;
  }

  // Customer: Get order by ID
  async getOrder(orderId: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${orderId}`);
    return response.data!;
  }

  // Vendor: Get vendor orders
  async getVendorOrders(params: { page?: number; limit?: number } = {}): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>("/orders/vendor/my-orders", params);
    return response.data!;
  }

  // Vendor: Update order status
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${orderId}/status`, { status });
    return response.data!;
  }
}

export const orderService = new OrderService();