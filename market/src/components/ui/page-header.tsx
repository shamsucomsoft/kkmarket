import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => (
  <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-drab-dark-brown">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex-shrink-0">{actions}</div>}
  </div>
);
