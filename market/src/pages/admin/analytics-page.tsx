import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const analyticsData = [
  {
    period: "Jan",
    revenue: 450000,
    orders: 89,
    visitors: 1200,
    conversionRate: 7.4,
  },
  {
    period: "Feb",
    revenue: 520000,
    orders: 104,
    visitors: 1350,
    conversionRate: 7.7,
  },
  {
    period: "Mar",
    revenue: 480000,
    orders: 96,
    visitors: 1280,
    conversionRate: 7.5,
  },
  {
    period: "Apr",
    revenue: 650000,
    orders: 130,
    visitors: 1650,
    conversionRate: 7.9,
  },
  {
    period: "May",
    revenue: 720000,
    orders: 145,
    visitors: 1800,
    conversionRate: 8.1,
  },
  {
    period: "Jun",
    revenue: 680000,
    orders: 136,
    visitors: 1720,
    conversionRate: 7.9,
  },
];

export const AnalyticsPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const currentMonth = analyticsData[analyticsData.length - 1];
  const previousMonth = analyticsData[analyticsData.length - 2];

  const revenueGrowth =
    ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) *
    100;
  const ordersGrowth =
    ((currentMonth.orders - previousMonth.orders) / previousMonth.orders) * 100;
  const visitorsGrowth =
    ((currentMonth.visitors - previousMonth.visitors) /
      previousMonth.visitors) *
    100;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Bincike da Nazari" : "Analytics & Insights"}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {language === "ha"
                ? "Duba cikakken bayyani kan kasuwancin ku"
                : "Track your business performance and growth"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="7days">
                {language === "ha" ? "Kwanaki 7" : "Last 7 days"}
              </option>
              <option value="30days">
                {language === "ha" ? "Kwanaki 30" : "Last 30 days"}
              </option>
              <option value="6months">
                {language === "ha" ? "Watanni 6" : "Last 6 months"}
              </option>
            </select>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              <ArrowPathIcon
                className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              {language === "ha" ? "Sabunta" : "Refresh"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-primary" />
              </div>
              {getGrowthIcon(revenueGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {language === "ha"
                  ? "Kudaden Shiga na Watan nan"
                  : "Monthly Revenue"}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatPrice(currentMonth.revenue)}
              </p>
              <p
                className={`text-sm flex items-center ${getGrowthColor(
                  revenueGrowth
                )}`}
              >
                <span className="mr-1">
                  {revenueGrowth >= 0 ? "+" : ""}
                  {revenueGrowth.toFixed(1)}%
                </span>
                <span className="text-gray-500">
                  {language === "ha"
                    ? "daga watan da ya gabata"
                    : "from last month"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal/10 rounded-lg flex items-center justify-center">
                <ShoppingCartIcon className="h-6 w-6 text-teal" />
              </div>
              {getGrowthIcon(ordersGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {language === "ha" ? "Oda-odi na Watan nan" : "Monthly Orders"}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {currentMonth.orders.toLocaleString()}
              </p>
              <p
                className={`text-sm flex items-center ${getGrowthColor(
                  ordersGrowth
                )}`}
              >
                <span className="mr-1">
                  {ordersGrowth >= 0 ? "+" : ""}
                  {ordersGrowth.toFixed(1)}%
                </span>
                <span className="text-gray-500">
                  {language === "ha"
                    ? "daga watan da ya gabata"
                    : "from last month"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-blue-600" />
              </div>
              {getGrowthIcon(visitorsGrowth)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {language === "ha" ? "Masu Ziyara" : "Visitors"}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {currentMonth.visitors.toLocaleString()}
              </p>
              <p
                className={`text-sm flex items-center ${getGrowthColor(
                  visitorsGrowth
                )}`}
              >
                <span className="mr-1">
                  {visitorsGrowth >= 0 ? "+" : ""}
                  {visitorsGrowth.toFixed(1)}%
                </span>
                <span className="text-gray-500">
                  {language === "ha"
                    ? "daga watan da ya gabata"
                    : "from last month"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {language === "ha"
                  ? "Adadin Canjin Zuwa Siyayya"
                  : "Conversion Rate"}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {currentMonth.conversionRate.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">
                {language === "ha"
                  ? "daga masu ziyara zuwa masu siya"
                  : "visitors to buyers"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ha"
                  ? "Kudaden Shiga na Watanni 6"
                  : "Revenue Trend (6 Months)"}
              </h3>
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {language === "ha"
                    ? "Jadawalin Kudaden Shiga"
                    : "Revenue Chart"}
                </p>
                <p className="text-sm text-gray-500">
                  {language === "ha"
                    ? "Haɗi da Chart.js ko D3.js"
                    : "Integration with Chart.js or D3.js"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ha"
                  ? "Oda-odi da Masu Ziyara"
                  : "Orders vs Visitors"}
              </h3>
              <EyeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 bg-gradient-to-br from-teal/5 to-blue-100/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ArrowTrendingUpIcon className="h-16 w-16 text-teal mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  {language === "ha" ? "Jadawalin Oda-odi" : "Orders Chart"}
                </p>
                <p className="text-sm text-gray-500">
                  {language === "ha"
                    ? "Haɗi da Chart.js ko D3.js"
                    : "Integration with Chart.js or D3.js"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
