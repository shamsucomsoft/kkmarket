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
  XMarkIcon,
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
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-md">
            <SidebarContent
              language={language}
              isCurrentPath={isCurrentPath}
              onLinkClick={() => setSidebarOpen(false)}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent
          language={language}
          isCurrentPath={isCurrentPath}
          onLinkClick={() => {}}
        />
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>

              <div className="hidden sm:flex items-center gap-3">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={language === "ha" ? "Nema..." : "Search..."}
                    className="w-96 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors relative">
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gray-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AD</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {language === "ha" ? "Admin" : "Administrator"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === "ha"
                      ? "Mai Gudanar Platform"
                      : "Platform Manager"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<{
  language: string;
  isCurrentPath: (path: string) => boolean;
  onLinkClick: () => void;
  onClose?: () => void;
}> = ({ language, isCurrentPath, onLinkClick, onClose }) => {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">KK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 text-lg">
              Kantin Kwari
            </span>
            <span className="text-sm text-gray-500">
              {language === "ha" ? "Panel na Admin" : "Admin Panel"}
            </span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 -mr-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-6 space-y-8">
        {/* Main Navigation */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {language === "ha" ? "SARRAFA DANDAMALI" : "MAIN NAVIGATION"}
          </div>
          <nav className="space-y-2">
            {adminNavigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onLinkClick}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isCurrentPath(item.href)
                    ? "bg-gray-50 text-gray-700 border-l-4 border-gray-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{language === "ha" ? item.nameHa : item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* System Navigation */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            {language === "ha" ? "TSARIN" : "SYSTEM"}
          </div>
          <nav className="space-y-2">
            {systemItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={onLinkClick}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isCurrentPath(item.href)
                    ? "bg-gray-50 text-gray-700 border-l-4 border-gray-600"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{language === "ha" ? item.nameHa : item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* User Profile & Actions */}
      <div className="p-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {language === "ha" ? "Admin" : "Administrator"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {language === "ha"
                  ? "Mai Gudanar Platform"
                  : "Platform Manager"}
              </p>
            </div>
          </div>
          <Link
            to="/logout"
            onClick={onLinkClick}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            <span>{language === "ha" ? "Fita" : "Logout"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
