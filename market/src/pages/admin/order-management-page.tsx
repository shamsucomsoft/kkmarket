import React, { useState, useEffect } from "react";
import { useLanguage } from "../../state/language-context";
import { orderService } from "../../services/order.service";
import { handleApiError } from "../../services/api";
import type { Order } from "../../types";
import { DashboardLayout as AdminLayout } from "../../components/layout/dashboard-layout";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  MetricCard,
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminTable,
  AdminPagination,
  StatusBadge,
  AdminButton,
} from "../../components/ui/admin";

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
  sortBy: string;
  sortDirection: "asc" | "desc";
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
    sortBy: "",
    sortDirection: "asc",
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
    sortBy,
    sortDirection,
    orderStats,
  } = state;

  useEffect(() => {
    fetchOrders();
    fetchOrderStats();
  }, [
    currentPage,
    selectedStatus,
    selectedPaymentMethod,
    dateFrom,
    dateTo,
    sortBy,
    sortDirection,
  ]);

  const fetchOrders = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const filters = {
        page: currentPage,
        limit: 10,
        ...(selectedStatus && { status: selectedStatus }),
        ...(dateFrom && { dateFrom }),
        ...(dateTo && { dateTo }),
      };

      const response = await orderService.getVendorOrders(filters);

      setState((prev) => ({
        ...prev,
        orders: response.data,
        totalPages: response.pagination.totalPages,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
        isLoading: false,
      }));
    }
  };

  const fetchOrderStats = async () => {
    try {
      const stats = await orderService.getOrderStats();
      setState((prev) => ({
        ...prev,
        orderStats: stats,
      }));
    } catch (error) {
      console.error("Failed to fetch order stats:", error);
    }
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus as any } : order
        ),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleSort = (column: string) => {
    setState((prev) => ({
      ...prev,
      sortBy: column,
      sortDirection:
        prev.sortBy === column && prev.sortDirection === "asc" ? "desc" : "asc",
    }));
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPaymentMethod =
      !selectedPaymentMethod || order.paymentMethod === selectedPaymentMethod;

    return matchesSearch && matchesPaymentMethod;
  });

  const statusOptions = [
    { value: "", label: language === "ha" ? "Duk matsayi" : "All statuses" },
    {
      value: "pending",
      label: language === "ha" ? "Jiran amincewa" : "Pending",
    },
    {
      value: "confirmed",
      label: language === "ha" ? "An amince" : "Confirmed",
    },
    {
      value: "processing",
      label: language === "ha" ? "Ana sarrafa" : "Processing",
    },
    { value: "shipped", label: language === "ha" ? "An aika" : "Shipped" },
    { value: "delivered", label: language === "ha" ? "An isar" : "Delivered" },
    { value: "cancelled", label: language === "ha" ? "An soke" : "Cancelled" },
  ];

  const paymentMethodOptions = [
    { value: "", label: language === "ha" ? "Duk hanyoyi" : "All methods" },
    {
      value: "cash_on_delivery",
      label: language === "ha" ? "Biya a lokacin isar" : "Cash on Delivery",
    },
    {
      value: "bank_transfer",
      label: language === "ha" ? "Canja kudin banki" : "Bank Transfer",
    },
    { value: "card", label: language === "ha" ? "Katin kudin" : "Card" },
    {
      value: "mobile_money",
      label: language === "ha" ? "Kudin hannu" : "Mobile Money",
    },
  ];

  const tableColumns = [
    {
      key: "orderNumber",
      title: language === "ha" ? "Lambar Oda" : "Order ID",
      render: (order: Order) => (
        <div>
          <span className="font-medium text-gray-900">{order.orderNumber}</span>
          <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "customer",
      title: language === "ha" ? "Abokin Ciniki" : "Customer",
      render: (order: Order) => (
        <div>
          <p className="font-medium text-gray-900">
            {order.user.firstName} {order.user.lastName}
          </p>
          <p className="text-sm text-gray-500">{order.user.email}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "items",
      title: language === "ha" ? "Kayayyaki" : "Items",
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">
            {order.items.length}
          </span>
          <span className="text-sm text-gray-500">
            {language === "ha" ? "kayayyaki" : "items"}
          </span>
        </div>
      ),
      align: "center" as const,
    },
    {
      key: "total",
      title: language === "ha" ? "Jimla" : "Total",
      render: (order: Order) => (
        <span className="font-medium text-gray-900">
          {formatPrice(order.total)}
        </span>
      ),
      sortable: true,
      align: "right" as const,
    },
    {
      key: "status",
      title: language === "ha" ? "Matsayi" : "Status",
      render: (order: Order) => <StatusBadge status={order.status} />,
      sortable: true,
    },
    {
      key: "paymentStatus",
      title: language === "ha" ? "Biya" : "Payment",
      render: (order: Order) => (
        <StatusBadge status={order.paymentStatus} variant="outline" />
      ),
      sortable: true,
    },
    {
      key: "actions",
      title: language === "ha" ? "Ayyuka" : "Actions",
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title={language === "ha" ? "Duba" : "View"}
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <select
            value={order.status}
            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">
              {language === "ha" ? "Jiran amincewa" : "Pending"}
            </option>
            <option value="confirmed">
              {language === "ha" ? "An amince" : "Confirmed"}
            </option>
            <option value="processing">
              {language === "ha" ? "Ana sarrafa" : "Processing"}
            </option>
            <option value="shipped">
              {language === "ha" ? "An aika" : "Shipped"}
            </option>
            <option value="delivered">
              {language === "ha" ? "An isar" : "Delivered"}
            </option>
            <option value="cancelled">
              {language === "ha" ? "An soke" : "Cancelled"}
            </option>
          </select>
        </div>
      ),
      align: "center" as const,
    },
  ];

  if (error) {
    return (
      <AdminLayout>
        <AdminCard className="text-center py-12">
          <div className="text-red-600 mb-4">
            <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-medium">Error loading orders</p>
            <p className="text-sm">{error}</p>
          </div>
          <AdminButton onClick={fetchOrders} icon={ArrowPathIcon}>
            {language === "ha" ? "Sake Gwada" : "Try Again"}
          </AdminButton>
        </AdminCard>
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
          <p className="text-gray-600 mt-1">
            {language === "ha"
              ? "Sarrafa duk odoci da suke shigowa"
              : "Manage all incoming orders and track their progress"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            title={language === "ha" ? "Jimillar Odoci" : "Total Orders"}
            value={orderStats.totalOrders.toString()}
            icon={ClipboardDocumentListIcon}
            iconBg="bg-blue-600"
          />
          <MetricCard
            title={language === "ha" ? "Jiran Amincewa" : "Pending"}
            value={orderStats.pendingOrders.toString()}
            icon={ClockIcon}
            iconBg="bg-yellow-600"
          />
          <MetricCard
            title={language === "ha" ? "An Aika" : "Shipped"}
            value={orderStats.shippedOrders.toString()}
            icon={TruckIcon}
            iconBg="bg-blue-600"
          />
          <MetricCard
            title={language === "ha" ? "An Isar" : "Delivered"}
            value={orderStats.deliveredOrders.toString()}
            icon={CheckCircleIcon}
            iconBg="bg-green-600"
          />
          <MetricCard
            title={language === "ha" ? "Kudin Shiga" : "Revenue"}
            value={formatPrice(orderStats.totalRevenue)}
            icon={BanknotesIcon}
            iconBg="bg-purple-600"
          />
        </div>

        {/* Filters */}
        <AdminCard
          title={language === "ha" ? "Tace Odoci" : "Filter Orders"}
          className="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <AdminInput
              label={language === "ha" ? "Bincike" : "Search"}
              value={searchTerm}
              onChange={(e) =>
                setState((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              placeholder={
                language === "ha" ? "Binciken oda..." : "Search orders..."
              }
              icon={MagnifyingGlassIcon}
            />
            <AdminSelect
              label={language === "ha" ? "Matsayi" : "Status"}
              value={selectedStatus}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  selectedStatus: e.target.value,
                }))
              }
              options={statusOptions}
            />
            <AdminSelect
              label={language === "ha" ? "Hanyar Biya" : "Payment Method"}
              value={selectedPaymentMethod}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  selectedPaymentMethod: e.target.value,
                }))
              }
              options={paymentMethodOptions}
            />
            <AdminInput
              label={language === "ha" ? "Daga" : "From"}
              type="date"
              value={dateFrom}
              onChange={(e) =>
                setState((prev) => ({ ...prev, dateFrom: e.target.value }))
              }
            />
            <AdminInput
              label={language === "ha" ? "Zuwa" : "To"}
              type="date"
              value={dateTo}
              onChange={(e) =>
                setState((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
          <div className="mt-4">
            <AdminButton onClick={fetchOrders} icon={FunnelIcon}>
              {language === "ha" ? "Tace" : "Filter"}
            </AdminButton>
          </div>
        </AdminCard>

        {/* Orders Table */}
        <AdminCard
          title={language === "ha" ? "Odoci" : "Orders"}
          className="bg-white"
        >
          <AdminTable
            data={filteredOrders}
            columns={tableColumns}
            loading={isLoading}
            getItemId={(item) => item.id}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            emptyMessage={
              language === "ha" ? "Babu odoci a yanzu" : "No orders found"
            }
          />
          <AdminPagination
            currentPage={currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) =>
              setState((prev) => ({ ...prev, currentPage: page }))
            }
            totalItems={filteredOrders.length}
            itemsPerPage={10}
            showItemsInfo={true}
          />
        </AdminCard>
      </div>
    </AdminLayout>
  );
};
