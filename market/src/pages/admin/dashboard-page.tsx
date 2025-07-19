import React from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  UsersIcon,
  BuildingStorefrontIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { MetricCard, AdminCard, StatusBadge } from "../../components/ui/admin";

const platformMetrics = [
  {
    title: "Total Users",
    titleHa: "Jimillar Masu Amfani",
    value: "12,847",
    change: "+23%",
    changeType: "positive" as const,
    trend: "up" as const,
    icon: UsersIcon,
    iconBg: "bg-gray-600",
  },
  {
    title: "Active Products",
    titleHa: "Kayayyaki Masu Aiki",
    value: "3,456",
    change: "+15%",
    changeType: "positive" as const,
    trend: "up" as const,
    icon: BuildingStorefrontIcon,
    iconBg: "bg-gray-600",
  },
  {
    title: "Monthly Revenue",
    titleHa: "Kudin Shiga na Wata",
    value: "₦2.4M",
    change: "+18%",
    changeType: "positive" as const,
    trend: "up" as const,
    icon: BanknotesIcon,
    iconBg: "bg-gray-600",
  },
  {
    title: "Support Tickets",
    titleHa: "Tambayoyin Taimako",
    value: "47",
    change: "-8%",
    changeType: "positive" as const,
    trend: "down" as const,
    icon: ExclamationTriangleIcon,
    iconBg: "bg-gray-600",
  },
];

const quickStats = [
  {
    label: "Orders Today",
    labelHa: "Odoci Yau",
    value: "124",
    icon: ShoppingCartIcon,
    color: "text-gray-600",
  },
  {
    label: "Page Views",
    labelHa: "Kallon Shafi",
    value: "8,432",
    icon: EyeIcon,
    color: "text-gray-600",
  },
  {
    label: "Conversion Rate",
    labelHa: "Adadin Juya",
    value: "3.2%",
    icon: ArrowTrendingUpIcon,
    color: "text-gray-600",
  },
];

const recentProducts = [
  {
    id: 1,
    name: "Traditional Kano Indigo Fabric",
    vendor: "Ibrahim Traditional Crafts",
    price: "₦18,500",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    dateSubmitted: "2 hours ago",
  },
  {
    id: 2,
    name: "Handwoven Leather Bag",
    vendor: "Sani Leather Works",
    price: "₦12,000",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=40&h=40&fit=crop",
    dateSubmitted: "5 hours ago",
  },
  {
    id: 3,
    name: "Traditional Pottery Set",
    vendor: "Garba Pottery Works",
    price: "₦8,500",
    status: "rejected",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=40&h=40&fit=crop",
    dateSubmitted: "1 day ago",
  },
];

const topProducts = [
  {
    name: "Authentic Indigo Adire",
    category: "Traditional Textiles",
    sales: "₦185,000",
    orders: 234,
    rating: 4.8,
  },
  {
    name: "Kano Leather Sandals",
    category: "Footwear",
    sales: "₦142,000",
    orders: 189,
    rating: 4.9,
  },
  {
    name: "Northern Spice Collection",
    category: "Food & Spices",
    sales: "₦98,000",
    orders: 156,
    rating: 4.7,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order received",
    subtitle: "Order #12345 from Fatima Mohammed",
    time: "2 minutes ago",
    icon: ShoppingCartIcon,
    color: "text-gray-600",
  },
  {
    id: 2,
    type: "user",
    title: "New user registration",
    subtitle: "Ahmed Usman joined the platform",
    time: "15 minutes ago",
    icon: UsersIcon,
    color: "text-gray-600",
  },
  {
    id: 3,
    type: "product",
    title: "Product approved",
    subtitle: "Traditional Leather Bag by Sani Works",
    time: "1 hour ago",
    icon: BuildingStorefrontIcon,
    color: "text-gray-600",
  },
];

export const DashboardPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            {language === "ha"
              ? "Maraba da zuwa, Admin"
              : "Welcome back, Admin"}
          </h1>
          <p className="text-gray-100">
            {language === "ha"
              ? "Ga takaitaccen bayanin ayyukan platform na yau"
              : "Here's what's happening on your platform today"}
          </p>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={language === "ha" ? metric.titleHa : metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              trend={metric.trend}
              icon={metric.icon}
              iconBg={metric.iconBg}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <AdminCard
          title={language === "ha" ? "Takaitaccen Kididdigar" : "Quick Stats"}
          className="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div className={`p-2 rounded-lg bg-white ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {language === "ha" ? stat.labelHa : stat.label}
                  </p>
                  <p className="text-xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Product Submissions */}
          <AdminCard
            title={language === "ha" ? "Sabbin Kayayyaki" : "Recent Products"}
            subtitle={
              language === "ha"
                ? "Kayayyaki da aka gabatar"
                : "Latest product submissions"
            }
            action={
              <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                {language === "ha" ? "Duba Duka" : "View All"}
              </button>
            }
          >
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {product.vendor}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {product.dateSubmitted}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={product.status} />
                </div>
              ))}
            </div>
          </AdminCard>

          {/* Top Performing Products */}
          <AdminCard
            title={
              language === "ha" ? "Kayayyaki Masu Cin Gaba" : "Top Products"
            }
            subtitle={
              language === "ha"
                ? "Kayayyaki da suka fi sayarwa"
                : "Best performing products"
            }
            action={
              <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
                {language === "ha" ? "Duba Duka" : "View All"}
              </button>
            }
          >
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {product.name.split(" ")[0][0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-gray-900">
                        {product.sales}
                      </span>
                      <span className="text-xs text-gray-500">
                        • {product.orders} orders
                      </span>
                      <span className="text-xs text-gray-500">
                        • ⭐ {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Recent Activity */}
        <AdminCard
          title={language === "ha" ? "Sabbin Ayyuka" : "Recent Activity"}
          subtitle={
            language === "ha"
              ? "Ayyukan da aka yi a baya-bayan nan"
              : "Latest platform activities"
          }
        >
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-500">{activity.subtitle}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </DashboardLayout>
  );
};
