import { apiClient } from "./api";
import type { Order, CreateOrderDto, UpdateOrderStatusDto, SearchResults } from "../types";

export class OrderService {
  // Customer order endpoints
  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await apiClient.post<Order>("/orders", orderData);
    return response.data!;
  }

  async getMyOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>("/orders");
    return response.data!;
  }


  async getOrder(orderId: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${orderId}`);
    return response.data!;
  }

  // Admin/Vendor order endpoints
  async getAllOrders(filters: {
    page?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  } = {}): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>("/orders/admin", filters);
    return response.data!;
  }

  async getVendorOrders(filters: {
    page?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  } = {}): Promise<SearchResults<Order>> {
    const response = await apiClient.get<SearchResults<Order>>("/orders/vendor/my-orders", filters);
    return response.data!;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${orderId}/status`, { status });
    return response.data!;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${orderId}/cancel`);
    return response.data!;
  }

  async getOrderAnalytics(period: string = "30d"): Promise<any> {
    const response = await apiClient.get(`/orders/analytics`, { period });
    return response.data!;
  }

  // Order statistics
  async getOrderStats(): Promise<{
    totalOrders: number;
    pendingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  }> {
    const response = await apiClient.get("/orders/stats");
    return response.data!;
  }
}

export const orderService = new OrderService();