import React, { useState, useEffect } from "react";
import { useLanguage } from "../../state/language-context";
import { AdminLayout } from "../../components/layout/admin-layout";
import { orderService } from "../../services/order.service";
import { handleApiError } from "../../services/api";
import { Order } from "../../types";

interface OrderManagementState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedStatus: string;
  selectedPaymentMethod: string;
  currentPage: number;
  totalPages: number;
  dateFrom: string;
  dateTo: string;
  orderStats: {
    totalOrders: number;
    pendingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  };
}

export const OrderManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const [state, setState] = useState<OrderManagementState>({
    orders: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    selectedStatus: "",
    selectedPaymentMethod: "",
    currentPage: 1,
    totalPages: 1,
    dateFrom: "",
    dateTo: "",
    orderStats: {
      totalOrders: 0,
      pendingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      totalRevenue: 0,
    },
  });

  const {
    orders,
    isLoading,
    error,
    searchTerm,
    selectedStatus,
    selectedPaymentMethod,
    currentPage,
    dateFrom,
    dateTo,
    orderStats,
  } = state;

  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, [currentPage, selectedStatus, selectedPaymentMethod, dateFrom, dateTo]);

  const fetchOrders = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const filters = {
        page: currentPage,
        limit: 10,
        ...(selectedStatus && { status: selectedStatus }),
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      };

      const response = await orderService.getVendorOrders(filters);
      
      setState(prev => ({
        ...prev,
        orders: response.data,
        totalPages: response.pagination.totalPages,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
        isLoading: false,
      }));
    }
  };

  const fetchOrderStats = async () => {
    try {
      const stats = await orderService.getOrderStats();
      setState(prev => ({
        ...prev,
        orderStats: stats,
      }));
    } catch (error) {
      console.error("Failed to fetch order stats:", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setState(prev => ({
        ...prev,
        orders: prev.orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPaymentMethod = 
      !selectedPaymentMethod || order.paymentMethod === selectedPaymentMethod;

    return matchesSearch && matchesPaymentMethod;
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {language === "ha" ? "Sake Gwada" : "Try Again"}
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === "ha" ? "Sarrafa Odoci" : "Order Management"}
          </h1>
          <p className="text-gray-600">
            {language === "ha" 
              ? "Sarrafa duk odoci da suke shigowa"
              : "Manage all incoming orders and track their progress"
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Jimillar Odoci" : "Total Orders"}
                </p>
                <p className="text-2xl font-bold text-gray-900">{orderStats.totalOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Jiran Amincewa" : "Pending"}
                </p>
                <p className="text-2xl font-bold text-yellow-600">{orderStats.pendingOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "An Aika" : "Shipped"}
                </p>
                <p className="text-2xl font-bold text-blue-600">{orderStats.shippedOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "An Isar" : "Delivered"}
                </p>
                <p className="text-2xl font-bold text-green-600">{orderStats.deliveredOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Kudin Shiga" : "Revenue"}
                </p>
                <p className="text-2xl font-bold text-purple-600">{formatPrice(orderStats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Bincike" : "Search"}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                placeholder={language === "ha" ? "Binciken oda..." : "Search orders..."}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Matsayi" : "Status"}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setState(prev => ({ ...prev, selectedStatus: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{language === "ha" ? "Duk matsayi" : "All statuses"}</option>
                <option value="pending">{language === "ha" ? "Jiran amincewa" : "Pending"}</option>
                <option value="confirmed">{language === "ha" ? "An amince" : "Confirmed"}</option>
                <option value="processing">{language === "ha" ? "Ana sarrafa" : "Processing"}</option>
                <option value="shipped">{language === "ha" ? "An aika" : "Shipped"}</option>
                <option value="delivered">{language === "ha" ? "An isar" : "Delivered"}</option>
                <option value="cancelled">{language === "ha" ? "An soke" : "Cancelled"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Hanyar Biya" : "Payment Method"}
              </label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => setState(prev => ({ ...prev, selectedPaymentMethod: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{language === "ha" ? "Duk hanyoyi" : "All methods"}</option>
                <option value="cash_on_delivery">{language === "ha" ? "Biya a lokacin isar" : "Cash on Delivery"}</option>
                <option value="bank_transfer">{language === "ha" ? "Canja kudin banki" : "Bank Transfer"}</option>
                <option value="card">{language === "ha" ? "Katin kudin" : "Card"}</option>
                <option value="mobile_money">{language === "ha" ? "Kudin hannu" : "Mobile Money"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Daga" : "From"}
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setState(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Zuwa" : "To"}
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setState(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={fetchOrders}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {language === "ha" ? "Tace" : "Filter"}
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Lambar Oda" : "Order ID"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Abokin Ciniki" : "Customer"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kayayyaki" : "Items"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Jimla" : "Total"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Matsayi" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Biya" : "Payment"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kwanan wata" : "Date"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.user.firstName} {order.user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.length} {language === "ha" ? "kayayyaki" : "items"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">{language === "ha" ? "Jiran amincewa" : "Pending"}</option>
                          <option value="confirmed">{language === "ha" ? "An amince" : "Confirmed"}</option>
                          <option value="processing">{language === "ha" ? "Ana sarrafa" : "Processing"}</option>
                          <option value="shipped">{language === "ha" ? "An aika" : "Shipped"}</option>
                          <option value="delivered">{language === "ha" ? "An isar" : "Delivered"}</option>
                          <option value="cancelled">{language === "ha" ? "An soke" : "Cancelled"}</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {language === "ha" ? "Babu odoci a yanzu" : "No orders found"}
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setState(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {language === "ha" ? "Baya" : "Previous"}
            </button>
            <span className="px-3 py-2 text-sm text-gray-700">
              {language === "ha" ? `Shafi ${currentPage} na ${state.totalPages}` : `Page ${currentPage} of ${state.totalPages}`}
            </span>
            <button
              onClick={() => setState(prev => ({ ...prev, currentPage: Math.min(state.totalPages, prev.currentPage + 1) }))}
              disabled={currentPage === state.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {language === "ha" ? "Gaba" : "Next"}
            </button>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
};
