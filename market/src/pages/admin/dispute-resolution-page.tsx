import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface Dispute {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  vendor: {
    name: string;
    email: string;
    avatar?: string;
  };
  order: {
    id: string;
    amount: string;
    product: string;
  };
  issue: {
    type:
      | "product_quality"
      | "delivery_delay"
      | "wrong_item"
      | "refund_request"
      | "vendor_dispute";
    description: string;
    evidence: string[];
  };
  status: "open" | "investigating" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolution?: string;
}

const mockDisputes: Dispute[] = [
  {
    id: "DIS001",
    customer: {
      name: "Fatima Mohammed",
      email: "fatima.mohammed@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b9e7?w=40&h=40&fit=crop&crop=face",
    },
    vendor: {
      name: "Ibrahim Traditional Crafts",
      email: "ibrahim.crafts@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    order: {
      id: "#KK001",
      amount: "₦18,500",
      product: "Traditional Adire Fabric",
    },
    issue: {
      type: "product_quality",
      description:
        "The fabric received has defects and poor coloring. Not as described in the listing.",
      evidence: ["photo1.jpg", "photo2.jpg"],
    },
    status: "open",
    priority: "high",
    createdAt: "2024-03-20T10:30:00Z",
    updatedAt: "2024-03-20T10:30:00Z",
  },
  {
    id: "DIS002",
    customer: {
      name: "Ahmed Usman",
      email: "ahmed.usman@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    vendor: {
      name: "Aisha Spice House",
      email: "aisha.spices@email.com",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
    },
    order: {
      id: "#KK002",
      amount: "₦3,200",
      product: "Northern Suya Spice Mix",
    },
    issue: {
      type: "delivery_delay",
      description:
        "Order was supposed to arrive 5 days ago. No communication from vendor.",
      evidence: ["screenshot1.jpg"],
    },
    status: "investigating",
    priority: "medium",
    createdAt: "2024-03-18T14:15:00Z",
    updatedAt: "2024-03-19T09:22:00Z",
    assignedTo: "Admin",
  },
  {
    id: "DIS003",
    customer: {
      name: "Zainab Ibrahim",
      email: "zainab.ibrahim@email.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    vendor: {
      name: "Sani Leather Works",
      email: "sani.leather@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    order: {
      id: "#KK003",
      amount: "₦12,000",
      product: "Handcrafted Leather Bag",
    },
    issue: {
      type: "refund_request",
      description: "Customer received wrong color. Requesting full refund.",
      evidence: [],
    },
    status: "resolved",
    priority: "low",
    createdAt: "2024-03-15T11:45:00Z",
    updatedAt: "2024-03-17T16:30:00Z",
    assignedTo: "Admin",
    resolution:
      "Full refund processed. Vendor updated listing for better color accuracy.",
  },
];

export const DisputeResolutionPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "investigating":
        return <ClockIcon className="w-4 h-4" />;
      case "resolved":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "closed":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIssueTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; ha: string }> = {
      product_quality: { en: "Product Quality", ha: "Ingancin Kaya" },
      delivery_delay: { en: "Delivery Delay", ha: "Jinkirin Isar" },
      wrong_item: { en: "Wrong Item", ha: "Kayan da ba daidai ba" },
      refund_request: { en: "Refund Request", ha: "Neman Mayar da Kuɗi" },
      vendor_dispute: { en: "Vendor Dispute", ha: "Rikicin Dillali" },
    };
    return language === "ha"
      ? labels[type]?.ha || type
      : labels[type]?.en || type;
  };

  const filteredDisputes = mockDisputes.filter((dispute) => {
    const matchesSearch =
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.order.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || dispute.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || dispute.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return language === "ha" ? "Jiya" : "Yesterday";
    if (diffDays < 7)
      return `${diffDays} ${
        language === "ha" ? "kwanaki da suka wuce" : "days ago"
      }`;
    return date.toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {language === "ha"
                  ? "Warware Rikice-rikice"
                  : "Dispute Resolution"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ha"
                  ? "Gudanar da kuma warware rikice-rikice tsakanin masu siyayya da masu sayarwa"
                  : "Manage and resolve disputes between buyers and sellers"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredDisputes.length}{" "}
                {language === "ha" ? "rikice-rikice" : "disputes"}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: language === "ha" ? "A Buɗe" : "Open",
              value: mockDisputes.filter((d) => d.status === "open").length,
              color: "bg-red-500",
              icon: ExclamationTriangleIcon,
            },
            {
              label: language === "ha" ? "Ana Bincike" : "Investigating",
              value: mockDisputes.filter((d) => d.status === "investigating")
                .length,
              color: "bg-yellow-500",
              icon: ClockIcon,
            },
            {
              label: language === "ha" ? "An Warware" : "Resolved",
              value: mockDisputes.filter((d) => d.status === "resolved").length,
              color: "bg-green-500",
              icon: CheckCircleIcon,
            },
            {
              label: language === "ha" ? "Muhimmanci Girma" : "High Priority",
              value: mockDisputes.filter((d) => d.priority === "high").length,
              color: "bg-purple-500",
              icon: ExclamationTriangleIcon,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ha"
                    ? "Nema rikice-rikice..."
                    : "Search disputes..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">
                    {language === "ha" ? "Dukan Hali" : "All Status"}
                  </option>
                  <option value="open">
                    {language === "ha" ? "A Buɗe" : "Open"}
                  </option>
                  <option value="investigating">
                    {language === "ha" ? "Ana Bincike" : "Investigating"}
                  </option>
                  <option value="resolved">
                    {language === "ha" ? "An Warware" : "Resolved"}
                  </option>
                  <option value="closed">
                    {language === "ha" ? "An Rufe" : "Closed"}
                  </option>
                </select>
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">
                  {language === "ha" ? "Dukan Muhimmanci" : "All Priority"}
                </option>
                <option value="high">
                  {language === "ha" ? "Girma" : "High"}
                </option>
                <option value="medium">
                  {language === "ha" ? "Matsakaici" : "Medium"}
                </option>
                <option value="low">
                  {language === "ha" ? "Ƙanana" : "Low"}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Disputes Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Rikici ID" : "Dispute ID"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Abokin Ciniki" : "Customer"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Dillali" : "Vendor"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Matsala" : "Issue"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kuɗi" : "Amount"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Muhimmanci" : "Priority"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Hali" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kwanan Wata" : "Created"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDisputes.map((dispute) => (
                  <tr key={dispute.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dispute.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={dispute.customer.avatar}
                            alt={dispute.customer.name}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {dispute.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {dispute.order.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={dispute.vendor.avatar}
                            alt={dispute.vendor.name}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {dispute.vendor.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {getIssueTypeLabel(dispute.issue.type)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {dispute.order.product}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dispute.order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          dispute.priority
                        )}`}
                      >
                        {dispute.priority.charAt(0).toUpperCase() +
                          dispute.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          dispute.status
                        )}`}
                      >
                        {getStatusIcon(dispute.status)}
                        <span className="ml-1 capitalize">
                          {dispute.status}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(dispute.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedDispute(dispute)}
                          className="text-blue-600 hover:text-blue-800"
                          title={language === "ha" ? "Duba" : "View Details"}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          title={language === "ha" ? "Saƙonuwa" : "Messages"}
                        >
                          <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-800"
                          title={language === "ha" ? "Takardun" : "Documents"}
                        >
                          <DocumentTextIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredDisputes.length === 0 && (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === "ha" ? "Babu rikice-rikice" : "No disputes found"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language === "ha"
                ? "Canza neman ko tace don samun sakamako"
                : "Try adjusting your search or filters to find what you're looking for"}
            </p>
          </div>
        )}

        {/* Dispute Detail Modal */}
        {selectedDispute && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={() => setSelectedDispute(null)}
              ></div>
              <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {language === "ha"
                        ? "Cikakken Bayani"
                        : "Dispute Details"}{" "}
                      - {selectedDispute.id}
                    </h2>
                    <button
                      onClick={() => setSelectedDispute(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {language === "ha"
                            ? "Bayani na Rikici"
                            : "Dispute Information"}
                        </h3>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              {language === "ha"
                                ? "Nau'in Matsala"
                                : "Issue Type"}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {getIssueTypeLabel(selectedDispute.issue.type)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              {language === "ha"
                                ? "Bayanin Matsala"
                                : "Description"}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {selectedDispute.issue.description}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {language === "ha"
                            ? "Bayani na Oda"
                            : "Order Information"}
                        </h3>
                        <dl className="space-y-3">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              {language === "ha" ? "Oda ID" : "Order ID"}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {selectedDispute.order.id}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              {language === "ha" ? "Kaya" : "Product"}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {selectedDispute.order.product}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">
                              {language === "ha" ? "Kuɗi" : "Amount"}
                            </dt>
                            <dd className="text-sm text-gray-900">
                              {selectedDispute.order.amount}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {selectedDispute.resolution && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          {language === "ha" ? "Mafita" : "Resolution"}
                        </h3>
                        <p className="text-sm text-gray-900 bg-green-50 p-4 rounded-lg">
                          {selectedDispute.resolution}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        {language === "ha" ? "Aika Saƙo" : "Send Message"}
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                        {language === "ha" ? "Warware" : "Resolve"}
                      </button>
                    </div>
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
