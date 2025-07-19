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
import {
  MetricCard,
  AdminCard,
  AdminButton,
  AdminSelect,
} from "../../components/ui/admin";

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

  const periodOptions = [
    {
      value: "7days",
      label: language === "ha" ? "Kwanaki 7" : "Last 7 days",
    },
    {
      value: "30days",
      label: language === "ha" ? "Kwanaki 30" : "Last 30 days",
    },
    {
      value: "6months",
      label: language === "ha" ? "Watanni 6" : "Last 6 months",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Bincike da Nazari" : "Analytics & Insights"}
            </h1>
            <p className="mt-1 text-gray-600">
              {language === "ha"
                ? "Duba cikakken bayyani kan kasuwancin ku"
                : "Track your business performance and growth"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <AdminSelect
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              options={periodOptions}
            />
            <AdminButton
              onClick={handleRefresh}
              loading={isLoading}
              icon={ArrowPathIcon}
            >
              {language === "ha" ? "Sabunta" : "Refresh"}
            </AdminButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={language === "ha" ? "Kudaden Shiga" : "Revenue"}
            value={formatPrice(currentMonth.revenue)}
            change={`${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth.toFixed(
              1
            )}%`}
            trend={revenueGrowth >= 0 ? "up" : "down"}
            changeType={revenueGrowth >= 0 ? "positive" : "negative"}
            subtitle={
              language === "ha" ? "daga watan da ya gabata" : "from last month"
            }
            icon={CurrencyDollarIcon}
            iconBg="bg-green-600"
          />
          <MetricCard
            title={language === "ha" ? "Oda-odi" : "Orders"}
            value={currentMonth.orders.toLocaleString()}
            change={`${ordersGrowth >= 0 ? "+" : ""}${ordersGrowth.toFixed(
              1
            )}%`}
            trend={ordersGrowth >= 0 ? "up" : "down"}
            changeType={ordersGrowth >= 0 ? "positive" : "negative"}
            subtitle={
              language === "ha" ? "daga watan da ya gabata" : "from last month"
            }
            icon={ShoppingCartIcon}
            iconBg="bg-blue-600"
          />
          <MetricCard
            title={language === "ha" ? "Masu Ziyara" : "Visitors"}
            value={currentMonth.visitors.toLocaleString()}
            change={`${visitorsGrowth >= 0 ? "+" : ""}${visitorsGrowth.toFixed(
              1
            )}%`}
            trend={visitorsGrowth >= 0 ? "up" : "down"}
            changeType={visitorsGrowth >= 0 ? "positive" : "negative"}
            subtitle={
              language === "ha" ? "daga watan da ya gabata" : "from last month"
            }
            icon={EyeIcon}
            iconBg="bg-purple-600"
          />
          <MetricCard
            title={language === "ha" ? "Adadin Juya" : "Conversion Rate"}
            value={`${currentMonth.conversionRate.toFixed(1)}%`}
            subtitle={
              language === "ha"
                ? "daga masu ziyara zuwa masu siya"
                : "visitors to buyers"
            }
            icon={UsersIcon}
            iconBg="bg-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminCard
            title={
              language === "ha"
                ? "Kudaden Shiga na Watanni 6"
                : "Revenue Trend (6 Months)"
            }
            action={<ChartBarIcon className="w-5 h-5 text-gray-400" />}
          >
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ChartBarIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
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
          </AdminCard>

          <AdminCard
            title={
              language === "ha"
                ? "Oda-odi da Masu Ziyara"
                : "Orders vs Visitors"
            }
            action={<EyeIcon className="w-5 h-5 text-gray-400" />}
          >
            <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ArrowTrendingUpIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
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
          </AdminCard>
        </div>
      </div>
    </DashboardLayout>
  );
};
