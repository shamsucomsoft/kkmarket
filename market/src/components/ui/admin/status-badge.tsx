import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  MinusCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline" | "dot";
  size?: "sm" | "md" | "lg";
  className?: string;
  customColors?: {
    [key: string]: {
      bg: string;
      text: string;
      border?: string;
    };
  };
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = "default",
  size = "md",
  className = "",
  customColors,
}) => {
  const getDefaultColors = (status: string) => {
    const statusLower = status.toLowerCase();

    const colorMap: {
      [key: string]: { bg: string; text: string; border?: string };
    } = {
      // Success states
      active: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      approved: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      completed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      delivered: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      confirmed: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      paid: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      resolved: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },

      // Warning states
      pending: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-300",
      },
      processing: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-300",
      },
      review: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-300",
      },
      out_of_stock: {
        bg: "bg-gray-200",
        text: "text-gray-700",
        border: "border-gray-300",
      },

      // Info states
      shipped: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      in_transit: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      draft: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },

      // Error states
      rejected: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },
      cancelled: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },
      failed: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },
      inactive: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },
      expired: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },
      open: {
        bg: "bg-gray-300",
        text: "text-gray-900",
        border: "border-gray-400",
      },

      // Neutral states
      refunded: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      on_hold: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
      paused: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      },
    };

    return (
      colorMap[statusLower] || {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
      }
    );
  };

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();

    const iconMap: {
      [key: string]: React.ComponentType<{ className?: string }>;
    } = {
      active: CheckCircleIcon,
      approved: CheckCircleIcon,
      completed: CheckCircleIcon,
      delivered: CheckCircleIcon,
      confirmed: CheckCircleIcon,
      paid: CheckCircleIcon,
      resolved: CheckCircleIcon,

      pending: ClockIcon,
      processing: ClockIcon,
      review: ClockIcon,

      shipped: InformationCircleIcon,
      in_transit: InformationCircleIcon,
      draft: InformationCircleIcon,

      rejected: XCircleIcon,
      cancelled: XCircleIcon,
      failed: XCircleIcon,
      inactive: XCircleIcon,
      expired: XCircleIcon,
      open: ExclamationCircleIcon,

      refunded: MinusCircleIcon,
      on_hold: MinusCircleIcon,
      paused: MinusCircleIcon,
      out_of_stock: ExclamationCircleIcon,
    };

    return iconMap[statusLower] || InformationCircleIcon;
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs";
      case "md":
        return "px-2.5 py-0.5 text-sm";
      case "lg":
        return "px-3 py-1 text-sm";
      default:
        return "px-2.5 py-0.5 text-sm";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "md":
        return "w-4 h-4";
      case "lg":
        return "w-4 h-4";
      default:
        return "w-4 h-4";
    }
  };

  const colors = customColors?.[status] || getDefaultColors(status);
  const Icon = getStatusIcon(status);

  const baseClasses = `
    inline-flex items-center gap-1 font-medium rounded-full
    ${getSizeClasses()}
    ${className}
  `;

  const variantClasses = {
    default: `${colors.bg} ${colors.text}`,
    outline: `bg-white ${colors.text} border ${colors.border}`,
    dot: `${colors.bg} ${colors.text} relative pl-4`,
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {variant === "dot" && (
        <span
          className={`absolute left-1.5 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${colors.bg
            .replace("bg-", "bg-")
            .replace("-100", "-500")}`}
        />
      )}
      {variant !== "dot" && <Icon className={getIconSize()} />}
      <span className="capitalize">{status.replace("_", " ")}</span>
    </span>
  );
};
