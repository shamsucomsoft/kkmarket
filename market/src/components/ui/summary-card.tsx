import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

interface SummaryCardProps {
  icon: React.ElementType;
  iconBgClass?: string; // e.g., "bg-blue-500"
  value: React.ReactNode;
  label: string;
  secondaryValue?: React.ReactNode;
  secondaryLabel?: string;
  change?: string; // e.g., "+15%"
  trending?: "up" | "down";
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  iconBgClass = "bg-primary",
  value,
  label,
  secondaryValue,
  secondaryLabel,
  change,
  trending,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconBgClass} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div
            className={`flex items-center text-sm ${
              trending === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trending === "up" ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
        {secondaryValue && (
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {secondaryValue}
            </div>
            {secondaryLabel && (
              <div className="text-xs text-gray-500">{secondaryLabel}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
