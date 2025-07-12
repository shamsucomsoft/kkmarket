import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../state/language-context";
import {
  HomeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  ClipboardDocumentListIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const adminNavigationItems = [
  {
    name: "Dashboard",
    nameHa: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Product Management",
    nameHa: "Sarrafa Kayayyaki",
    href: "/admin/products",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "User Management",
    nameHa: "Sarrafa Masu Amfani",
    href: "/admin/users",
    icon: UsersIcon,
  },
  {
    name: "Orders",
    nameHa: "Odaroji",
    href: "/admin/orders",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Analytics",
    nameHa: "Bincike",
    href: "/admin/analytics",
    icon: ChartBarIcon,
  },
  {
    name: "Dispute Resolution",
    nameHa: "Warware Rikici",
    href: "/admin/disputes",
    icon: ExclamationTriangleIcon,
  },
];

const systemItems = [
  {
    name: "Notifications",
    nameHa: "Sanarwa",
    href: "/admin/notifications",
    icon: BellIcon,
  },
  {
    name: "Settings",
    nameHa: "Saitunan",
    href: "/admin/settings",
    icon: Cog6ToothIcon,
  },
  {
    name: "Support",
    nameHa: "Taimako",
    href: "/admin/support",
    icon: QuestionMarkCircleIcon,
  },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-white-smoke">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white">
            <SidebarContent
              language={language}
              isCurrentPath={isCurrentPath}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent
          language={language}
          isCurrentPath={isCurrentPath}
          onLinkClick={() => {}}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-secondary">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KK</span>
            </div>
            <span className="font-semibold text-drab-dark-brown">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<{
  language: string;
  isCurrentPath: (path: string) => boolean;
  onLinkClick: () => void;
}> = ({ language, isCurrentPath, onLinkClick }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-secondary">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-secondary">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-drab-dark-brown text-sm">
              Kantin Kwari
            </span>
            <span className="text-xs text-gray-500">
              {language === "ha" ? "Panel na Admin" : "Admin Panel"}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === "ha" ? "Nema..." : "Search..."}
            className="w-full pl-10 pr-4 py-2 bg-white-smoke border border-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-6 space-y-8">
        {/* Platform Management Section */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {language === "ha" ? "SARRAFA DANDAMALI" : "PLATFORM MANAGEMENT"}
          </div>
          <nav className="space-y-1">
            {adminNavigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onLinkClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? "bg-white-smoke text-drab-dark-brown border border-secondary"
                    : "text-gray-600 hover:text-drab-dark-brown hover:bg-white-smoke"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {language === "ha" ? item.nameHa : item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* System Section */}
        <div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {language === "ha" ? "TSARIN" : "SYSTEM"}
          </div>
          <nav className="space-y-1">
            {systemItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onLinkClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isCurrentPath(item.href)
                    ? "bg-white-smoke text-drab-dark-brown border border-secondary"
                    : "text-gray-600 hover:text-drab-dark-brown hover:bg-white-smoke"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {language === "ha" ? item.nameHa : item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Admin Profile & Actions */}
      <div className="p-6 border-t border-secondary">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-medium">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-drab-dark-brown truncate">
              {language === "ha" ? "Admin" : "Administrator"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {language === "ha" ? "Mai Gudanar Platform" : "Platform Manager"}
            </p>
          </div>
        </div>
        <Link
          to="/logout"
          onClick={onLinkClick}
          className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          {language === "ha" ? "Fita" : "Logout"}
        </Link>
      </div>
    </div>
  );
};
