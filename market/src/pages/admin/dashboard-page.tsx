import React from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import { PageHeader } from "../../components/ui/page-header";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { SummaryCard } from "../../components/ui/summary-card";
import { DataTable } from "../../components/ui/data-table";

const platformMetrics = [
  {
    title: "Total Users",
    titleHa: "Jimillar Masu Amfani",
    value: "12,847",
    subtitle: "Active Users",
    subtitleHa: "Masu Amfani da Suke Aiki",
    change: "+23%",
    trending: "up",
    icon: UsersIcon,
    color: "bg-blue-500",
  },
  {
    title: "Total Products",
    titleHa: "Jimillar Kayayyaki",
    value: "3,456",
    subtitle: "Active",
    subtitleHa: "Masu Aiki",
    secondValue: "127",
    secondSubtitle: "Pending Review",
    secondSubtitleHa: "Jiran Dubawa",
    change: "+15%",
    trending: "up",
    icon: BuildingStorefrontIcon,
    color: "bg-green-500",
  },
  {
    title: "Total Sales",
    titleHa: "Jimillar Siyarwa",
    value: "₦2.4M",
    subtitle: "This Month",
    subtitleHa: "Wannan Wata",
    change: "+18%",
    trending: "up",
    icon: BanknotesIcon,
    color: "bg-purple-500",
  },
  {
    title: "Support Tickets",
    titleHa: "Tambayoyin Taimako",
    value: "47",
    subtitle: "Open",
    subtitleHa: "A Buɗe",
    secondValue: "312",
    secondSubtitle: "Resolved",
    secondSubtitleHa: "Da Aka Magance",
    change: "-8%",
    trending: "down",
    icon: ExclamationTriangleIcon,
    color: "bg-red-500",
  },
];

const recentProductApprovals = [
  {
    name: "Traditional Kano Indigo Fabric",
    vendor: "Ibrahim Traditional Crafts",
    category: "Textiles",
    price: "₦18,500",
    dateSubmitted: "2 hours ago",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
  },
  {
    name: "Handwoven Leather Bag",
    vendor: "Sani Leather Works",
    category: "Leather Goods",
    price: "₦12,000",
    dateSubmitted: "5 hours ago",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=40&h=40&fit=crop",
  },
  {
    name: "Traditional Pottery Set",
    vendor: "Garba Pottery Works",
    category: "Pottery",
    price: "₦8,500",
    dateSubmitted: "1 day ago",
    status: "rejected",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=40&h=40&fit=crop",
  },
];

const topPerformingProducts = [
  {
    name: "Authentic Indigo Adire",
    category: "Traditional Textiles",
    sales: "₦185,000",
    orders: "234",
    rating: 4.8,
    stock: 45,
  },
  {
    name: "Kano Leather Sandals",
    category: "Footwear",
    sales: "₦142,000",
    orders: "189",
    rating: 4.9,
    stock: 23,
  },
  {
    name: "Northern Spice Collection",
    category: "Food & Spices",
    sales: "₦98,000",
    orders: "156",
    rating: 4.7,
    stock: 78,
  },
];

const recentDisputes = [
  {
    id: "#DIS001",
    customer: "Fatima Mohammed",
    product: "Traditional Adire Fabric",
    issue: "Product Quality",
    amount: "₦18,500",
    status: "open",
    date: "2 hours ago",
  },
  {
    id: "#DIS002",
    customer: "Ahmed Usman",
    product: "Leather Bag",
    issue: "Delivery Delay",
    amount: "₦12,000",
    status: "resolved",
    date: "1 day ago",
  },
];

export const DashboardPage: React.FC = () => {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "open":
        return "bg-red-100 text-red-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <ClockIcon className="w-4 h-4" />;
      case "approved":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      case "open":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "resolved":
        return <CheckCircleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <PageHeader
          title={language === "ha" ? "Panel na Admin" : "Admin Dashboard"}
          subtitle={
            language === "ha" ? "Kallo na Platform" : "Platform Overview"
          }
          actions={
            <span className="text-sm text-gray-500">
              {language === "ha" ? "Sabunta:" : "Updated:"} 01:20:02 PM
            </span>
          }
        />

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformMetrics.map((metric, index) => (
            <SummaryCard
              key={index}
              icon={metric.icon}
              iconBgClass={metric.color}
              value={metric.value}
              label={language === "ha" ? metric.titleHa : metric.title}
              secondaryValue={metric.secondValue}
              secondaryLabel={
                metric.secondSubtitle &&
                (language === "ha"
                  ? metric.secondSubtitleHa
                  : metric.secondSubtitle)
              }
              change={metric.change}
              trending={metric.trending as "up" | "down"}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Product Approvals */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === "ha"
                  ? "Sabbin Kayayyakin da Suka Gabatar"
                  : "Recent Product Approvals"}
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                {language === "ha" ? "Duba Duka" : "View All"}
              </button>
            </div>

            <div className="space-y-4">
              {recentProductApprovals.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.vendor} • {product.category}
                      </div>
                      <div className="text-xs text-gray-400">
                        {product.dateSubmitted}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {getStatusIcon(product.status)}
                      <span className="ml-1 capitalize">{product.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Products */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {language === "ha"
                  ? "Dillalai Masu Cin Gaba"
                  : "Top Performing Products"}
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                {language === "ha" ? "Duba Duka" : "View All"}
              </button>
            </div>

            <div className="space-y-4">
              {topPerformingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {product.name.split(" ")[0][0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.category} • ⭐ {product.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {product.sales}
                    </div>
                    <div className="text-xs text-gray-500">
                      {product.orders} orders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Disputes */}
        <div className="mt-8">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {language === "ha"
                    ? "Sabbin Rikice-rikice"
                    : "Recent Disputes"}
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  {language === "ha" ? "Duba Duka" : "View All Disputes"}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <DataTable
                data={recentDisputes}
                getRowKey={(d) => d.id}
                columns={[
                  {
                    header: language === "ha" ? "ID" : "Dispute ID",
                    accessor: "id",
                  },
                  {
                    header: language === "ha" ? "Abokin Ciniki" : "Customer",
                    accessor: "customer",
                  },
                  {
                    header: language === "ha" ? "Kayayyaki" : "Product",
                    accessor: "product",
                  },
                  {
                    header: language === "ha" ? "Matsala" : "Issue",
                    accessor: "issue",
                  },
                  {
                    header: language === "ha" ? "Kuɗi" : "Amount",
                    accessor: "amount",
                  },
                  {
                    header: language === "ha" ? "Hali" : "Status",
                    render: (row) => (
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          row.status
                        )}`}
                      >
                        {getStatusIcon(row.status)}
                        <span className="ml-1 capitalize">{row.status}</span>
                      </span>
                    ),
                  },
                  {
                    header: language === "ha" ? "Kwanan Wata" : "Date",
                    accessor: "date",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
