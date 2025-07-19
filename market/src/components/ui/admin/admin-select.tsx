import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AdminSelectProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  selectClassName?: string;
  id?: string;
  name?: string;
}

export const AdminSelect: React.FC<AdminSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  size = "md",
  disabled = false,
  required = false,
  error,
  success = false,
  className = "",
  selectClassName = "",
  id,
  name,
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

  const selectClasses = `
    block w-full rounded-lg border
    bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-offset-0
    transition-colors duration-200
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    appearance-none cursor-pointer
    pr-10
    ${getSizeClasses()}
    ${getStateClasses()}
    ${selectClassName}
  `;

  const selectId =
    id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={selectClasses}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
