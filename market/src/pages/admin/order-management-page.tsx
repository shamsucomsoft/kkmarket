import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  EyeIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Order {
  id: string;
  customer: string;
  customerPhone: string;
  products: {
    name: string;
    nameHa: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: string;
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Fatima Abdullah",
    customerPhone: "+234 803 123 4567",
    products: [
      {
        name: "Authentic Kano Indigo Adire",
        nameHa: "Adire Indigo na Kano na Gaske",
        quantity: 2,
        price: 18500,
      },
    ],
    total: 37000,
    status: "processing",
    orderDate: "2024-01-15",
    shippingAddress: "No. 15 Ahmadu Bello Way, Kano",
  },
  {
    id: "ORD-002",
    customer: "Musa Garba",
    customerPhone: "+234 806 987 6543",
    products: [
      {
        name: "Northern Suya Spice Mix",
        nameHa: "Kayan Yajin Suya na Arewa",
        quantity: 5,
        price: 3200,
      },
    ],
    total: 16000,
    status: "shipped",
    orderDate: "2024-01-14",
    shippingAddress: "Sabon Gari Market, Kano",
  },
];

export const OrderManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <ClockIcon className="h-4 w-4" />;
      case "processing":
        return <ClockIcon className="h-4 w-4" />;
      case "shipped":
        return <TruckIcon className="h-4 w-4" />;
      case "delivered":
        return <CheckCircleIcon className="h-4 w-4" />;
      case "cancelled":
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: { en: "Pending", ha: "Yana Jira" },
      processing: { en: "Processing", ha: "Ana Sarrafa" },
      shipped: { en: "Shipped", ha: "An Aika" },
      delivered: { en: "Delivered", ha: "An Kai" },
      cancelled: { en: "Cancelled", ha: "An Soke" },
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {language === "ha" ? "Sarrafa Oda-odi" : "Order Management"}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {language === "ha"
              ? "Sarrafa duk oda-odin da aka yi"
              : "Manage all customer orders and their status"}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Lambar Oda" : "Order ID"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Abokin Ciniki" : "Customer"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Jimla" : "Total"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Matsayi" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Kwanan Wata" : "Date"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {getStatusText(order.status)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary hover:text-orange-600"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as Order["status"]
                            )
                          }
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20  p-5 border w-96 shadow-lg rounded-xl bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {language === "ha" ? "Cikakken Bayanin Oda" : "Order Details"}
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === "ha"
                      ? "Bayanin Abokin Ciniki"
                      : "Customer Information"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customerPhone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.shippingAddress}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {language === "ha" ? "Kayayyaki" : "Products"}
                  </h4>
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {language === "ha" ? product.nameHa : product.name}
                      </span>
                      <span>
                        {product.quantity} × {formatPrice(product.price)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>{language === "ha" ? "Jimla" : "Total"}</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
