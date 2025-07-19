import { apiClient } from "./api";
import type {
  Order,
  CreateOrderDto,
  UpdateOrderStatusDto,
  SearchResults,
  OrderStats,
} from "../types";

export class OrderService {
  // Customer order endpoints
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post<Order>("/orders", orderData);
    return response;
  }

  async getMyOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>("/orders");
    return response;
  }

  async getOrder(orderId: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${orderId}`);
    return response;
  }

  // Admin/Vendor order endpoints
  async getAllOrders(
    filters: {
      page?: number;
      limit?: number;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    } = {}
  ): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>(
      "/orders/admin",
      filters
    );
    return response;
  }

  async getVendorOrders(
    filters: {
      page?: number;
      limit?: number;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    } = {}
  ): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>(
      "/orders/vendor/my-orders",
      filters
    );
    return response;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${orderId}/status`, {
      status,
    });
    return response;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${orderId}/cancel`);
    return response;
  }

  async getOrderAnalytics(period: string = "30d"): Promise<any> {
    const response = await apiClient.get(`/orders/analytics`, { period });
    return response;
  }

  // Order statistics
  async getOrderStats(): Promise<OrderStats> {
    const response = await apiClient.get<OrderStats>("/orders/stats");
    return response;
  }
}

export const orderService = new OrderService();
