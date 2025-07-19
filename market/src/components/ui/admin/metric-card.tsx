import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ComponentType<{ className?: string }>;
  iconBg?: string;
  subtitle?: string;
  trend?: "up" | "down";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconBg = "bg-gray-500",
  subtitle,
  trend,
  className = "",
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-gray-600";
      case "negative":
        return "text-gray-800";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-none border border-gray-100 hover:shadow-sm transition-shadow ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {Icon && (
              <div className={`p-2 rounded-lg ${iconBg}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          {change && (
            <div className="flex items-center gap-1">
              {trend === "up" && (
                <ArrowUpIcon className="w-4 h-4 text-gray-600" />
              )}
              {trend === "down" && (
                <ArrowDownIcon className="w-4 h-4 text-gray-800" />
              )}
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
