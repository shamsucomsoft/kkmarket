import React from "react";

interface AdminInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "datetime-local"
    | "time";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  className?: string;
  inputClassName?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const AdminInput: React.FC<AdminInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  size = "md",
  disabled = false,
  required = false,
  error,
  success = false,
  icon: Icon,
  iconPosition = "left",
  className = "",
  inputClassName = "",
  id,
  name,
  autoComplete,
  onFocus,
  onBlur,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-4 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  const getStateClasses = () => {
    if (error) {
      return "border-red-300 focus:border-red-500 focus:ring-red-500";
    }
    if (success) {
      return "border-green-300 focus:border-green-500 focus:ring-green-500";
    }
    return "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  };

  const inputClasses = `
    block w-full rounded-lg border
    bg-white text-gray-900 placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-offset-0
    transition-colors duration-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${getSizeClasses()}
    ${getStateClasses()}
    ${Icon && iconPosition === "left" ? "pl-10" : ""}
    ${Icon && iconPosition === "right" ? "pr-10" : ""}
    ${inputClassName}
  `;

  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
        />
        {Icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
