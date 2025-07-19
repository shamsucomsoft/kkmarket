import React from "react";

interface AdminButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  onClick,
  type = "button",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent";
      case "secondary":
        return "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border-transparent";
      case "danger":
        return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent";
      case "ghost":
        return "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent";
      case "outline":
        return "bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border-gray-300";
      default:
        return "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-transparent";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg border
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={baseClasses}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {Icon && iconPosition === "left" && !loading && (
        <Icon className="w-4 h-4" />
      )}
      {children}
      {Icon && iconPosition === "right" && !loading && (
        <Icon className="w-4 h-4" />
      )}
    </button>
  );
};
