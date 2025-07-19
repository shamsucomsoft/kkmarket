import React from "react";

interface AdminCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  shadow?: "none" | "sm" | "md" | "lg";
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  padding = "lg",
  border = true,
  shadow = "sm",
}) => {
  const getPadding = () => {
    switch (padding) {
      case "none":
        return "p-0";
      case "sm":
        return "p-3";
      case "md":
        return "p-4";
      case "lg":
        return "p-6";
      default:
        return "p-6";
    }
  };

  const getShadow = () => {
    switch (shadow) {
      case "none":
        return "shadow-none";
      case "sm":
        return "shadow-sm";
      case "md":
        return "shadow-md";
      case "lg":
        return "shadow-lg";
      default:
        return "shadow-sm";
    }
  };

  return (
    <div
      className={`
      bg-white rounded-xl 
      ${border ? "border border-gray-100" : ""} 
      ${getShadow()} 
      hover:shadow-sm transition-shadow
      ${className}
    `}
    >
      {(title || subtitle || action) && (
        <div
          className={`
          ${getPadding()} 
          ${border ? "border-b border-gray-100" : ""}
          ${headerClassName}
        `}
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex items-center gap-2">{action}</div>}
          </div>
        </div>
      )}
      <div
        className={`
        ${title || subtitle || action ? "" : getPadding()} 
        ${bodyClassName}
      `}
      >
        {children}
      </div>
    </div>
  );
};
