import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  BellAlertIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface Notification {
  id: string;
  type: "system" | "order" | "user" | "vendor" | "security" | "maintenance";
  priority: "low" | "medium" | "high" | "critical";
  title: string;
  titleHa: string;
  message: string;
  messageHa: string;
  status: "unread" | "read" | "archived";
  createdAt: string;
  updatedAt: string;
  actionRequired: boolean;
  relatedEntity?: {
    type: "user" | "vendor" | "order" | "dispute";
    id: string;
    name: string;
  };
  metadata?: Record<string, unknown>;
}

const mockNotifications: Notification[] = [
  {
    id: "NOT001",
    type: "security",
    priority: "critical",
    title: "Multiple Failed Login Attempts",
    titleHa: "Yunwa da Yawa na Shiga ba Nasara",
    message:
      "User account fatima.mohammed@email.com has had 5 failed login attempts in the last hour.",
    messageHa:
      "Asusun mai amfani fatima.mohammed@email.com ya sami yunwa 5 na shiga ba nasara a cikin sa'a guda.",
    status: "unread",
    createdAt: "2024-03-20T15:30:00Z",
    updatedAt: "2024-03-20T15:30:00Z",
    actionRequired: true,
    relatedEntity: {
      type: "user",
      id: "user_001",
      name: "Fatima Mohammed",
    },
  },
  {
    id: "NOT002",
    type: "vendor",
    priority: "high",
    title: "New Vendor Application",
    titleHa: "Sabon Neman Dillali",
    message:
      "Ibrahim Traditional Crafts has submitted a vendor application and requires review.",
    messageHa:
      "Ibrahim Traditional Crafts ya gabatar da neman dillali kuma yana bukatar dubawa.",
    status: "unread",
    createdAt: "2024-03-20T14:15:00Z",
    updatedAt: "2024-03-20T14:15:00Z",
    actionRequired: true,
    relatedEntity: {
      type: "vendor",
      id: "vendor_001",
      name: "Ibrahim Traditional Crafts",
    },
  },
  {
    id: "NOT003",
    type: "order",
    priority: "medium",
    title: "Order Dispute Filed",
    titleHa: "An Gabatar da Rikicin Oda",
    message:
      "Customer has filed a dispute for order #KK001 regarding product quality.",
    messageHa:
      "Abokin ciniki ya gabatar da rikici kan oda #KK001 game da ingancin kaya.",
    status: "read",
    createdAt: "2024-03-20T12:45:00Z",
    updatedAt: "2024-03-20T13:00:00Z",
    actionRequired: true,
    relatedEntity: {
      type: "dispute",
      id: "dispute_001",
      name: "Order #KK001 Dispute",
    },
  },
  {
    id: "NOT004",
    type: "system",
    priority: "low",
    title: "Daily Backup Completed",
    titleHa: "An Kammala Ajiyar Yau",
    message: "System backup completed successfully at 03:00 AM.",
    messageHa: "An kammala ajiyar tsarin cikin nasara da karfe 03:00 na safe.",
    status: "read",
    createdAt: "2024-03-20T03:00:00Z",
    updatedAt: "2024-03-20T03:00:00Z",
    actionRequired: false,
  },
  {
    id: "NOT005",
    type: "maintenance",
    priority: "medium",
    title: "Scheduled Maintenance",
    titleHa: "Gyaran da aka tsara",
    message: "Platform maintenance is scheduled for Sunday 2:00 AM - 4:00 AM.",
    messageHa:
      "An tsara gyaran dandamali ranar Lahadi karfe 2:00 na safe - 4:00 na safe.",
    status: "unread",
    createdAt: "2024-03-19T16:20:00Z",
    updatedAt: "2024-03-19T16:20:00Z",
    actionRequired: false,
  },
];

export const NotificationsPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "system":
        return "bg-blue-100 text-blue-800";
      case "order":
        return "bg-green-100 text-green-800";
      case "user":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-yellow-100 text-yellow-800";
      case "security":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "high":
        return <BellAlertIcon className="w-4 h-4" />;
      case "medium":
        return <InformationCircleIcon className="w-4 h-4" />;
      case "low":
        return <CheckCircleIcon className="w-4 h-4" />;
      default:
        return <InformationCircleIcon className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; ha: string }> = {
      system: { en: "System", ha: "Tsarin" },
      order: { en: "Order", ha: "Oda" },
      user: { en: "User", ha: "Mai Amfani" },
      vendor: { en: "Vendor", ha: "Dillali" },
      security: { en: "Security", ha: "Tsaro" },
      maintenance: { en: "Maintenance", ha: "Gyara" },
    };
    return language === "ha"
      ? labels[type]?.ha || type
      : labels[type]?.en || type;
  };

  const filteredNotifications = mockNotifications.filter((notification) => {
    const title = language === "ha" ? notification.titleHa : notification.title;
    const message =
      language === "ha" ? notification.messageHa : notification.message;

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || notification.type === filterType;
    const matchesPriority =
      filterPriority === "all" || notification.priority === filterPriority;
    const matchesStatus =
      filterStatus === "all" || notification.status === filterStatus;
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60)
      return `${diffMinutes} ${
        language === "ha" ? "minti da suka wuce" : "minutes ago"
      }`;
    if (diffHours < 24)
      return `${diffHours} ${
        language === "ha" ? "sa'o'i da suka wuce" : "hours ago"
      }`;
    if (diffDays === 1) return language === "ha" ? "Jiya" : "Yesterday";
    if (diffDays < 7)
      return `${diffDays} ${
        language === "ha" ? "kwanaki da suka wuce" : "days ago"
      }`;
    return date.toLocaleDateString();
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {language === "ha" ? "Sanarwa" : "Notifications"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ha"
                  ? "Gudanar da sanarwar tsarin da faɗakarwa"
                  : "Manage system notifications and alerts"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredNotifications.length}{" "}
                {language === "ha" ? "sanarwa" : "notifications"}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: language === "ha" ? "Ba a Karanta ba" : "Unread",
              value: mockNotifications.filter((n) => n.status === "unread")
                .length,
              color: "bg-red-500",
              icon: BellIcon,
            },
            {
              label:
                language === "ha" ? "Ana Bukatar Mataki" : "Action Required",
              value: mockNotifications.filter((n) => n.actionRequired).length,
              color: "bg-orange-500",
              icon: ExclamationTriangleIcon,
            },
            {
              label: language === "ha" ? "Muhimmanci Girma" : "High Priority",
              value: mockNotifications.filter(
                (n) => n.priority === "high" || n.priority === "critical"
              ).length,
              color: "bg-yellow-500",
              icon: BellAlertIcon,
            },
            {
              label: language === "ha" ? "Yau" : "Today",
              value: mockNotifications.filter((n) => {
                const today = new Date().toDateString();
                return new Date(n.createdAt).toDateString() === today;
              }).length,
              color: "bg-blue-500",
              icon: ClockIcon,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ha"
                    ? "Nema sanarwa..."
                    : "Search notifications..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">
                    {language === "ha" ? "Dukan Nau'i" : "All Types"}
                  </option>
                  <option value="system">
                    {language === "ha" ? "Tsarin" : "System"}
                  </option>
                  <option value="order">
                    {language === "ha" ? "Oda" : "Order"}
                  </option>
                  <option value="user">
                    {language === "ha" ? "Mai Amfani" : "User"}
                  </option>
                  <option value="vendor">
                    {language === "ha" ? "Dillali" : "Vendor"}
                  </option>
                  <option value="security">
                    {language === "ha" ? "Tsaro" : "Security"}
                  </option>
                  <option value="maintenance">
                    {language === "ha" ? "Gyara" : "Maintenance"}
                  </option>
                </select>
              </div>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">
                  {language === "ha" ? "Dukan Muhimmanci" : "All Priority"}
                </option>
                <option value="critical">
                  {language === "ha" ? "Matukar Muhimmanci" : "Critical"}
                </option>
                <option value="high">
                  {language === "ha" ? "Girma" : "High"}
                </option>
                <option value="medium">
                  {language === "ha" ? "Matsakaici" : "Medium"}
                </option>
                <option value="low">
                  {language === "ha" ? "Ƙanana" : "Low"}
                </option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">
                  {language === "ha" ? "Dukan Hali" : "All Status"}
                </option>
                <option value="unread">
                  {language === "ha" ? "Ba a Karanta ba" : "Unread"}
                </option>
                <option value="read">
                  {language === "ha" ? "An Karanta" : "Read"}
                </option>
                <option value="archived">
                  {language === "ha" ? "An Ajiye" : "Archived"}
                </option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="text-sm text-blue-800">
                {selectedNotifications.length}{" "}
                {language === "ha" ? "zaɓaɓɓu" : "selected"}
              </span>
              <div className="flex items-center space-x-3">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {language === "ha"
                    ? "Yi Alama Kamar an Karanta"
                    : "Mark as Read"}
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                  {language === "ha" ? "Ajiye" : "Archive"}
                </button>
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  {language === "ha" ? "Goge" : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg border border-gray-200 p-6 ${
                notification.status === "unread"
                  ? "border-l-4 border-l-primary"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => handleSelectNotification(notification.id)}
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {getTypeLabel(notification.type)}
                      </span>

                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          notification.priority
                        )}`}
                      >
                        {getPriorityIcon(notification.priority)}
                        <span className="ml-1 capitalize">
                          {notification.priority}
                        </span>
                      </span>

                      {notification.actionRequired && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                          {language === "ha"
                            ? "Ana Bukatar Mataki"
                            : "Action Required"}
                        </span>
                      )}

                      <span className="text-xs text-gray-500">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {language === "ha"
                        ? notification.titleHa
                        : notification.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3">
                      {language === "ha"
                        ? notification.messageHa
                        : notification.message}
                    </p>

                    {notification.relatedEntity && (
                      <div className="text-sm text-gray-500">
                        {language === "ha" ? "Alaƙa da:" : "Related to:"}{" "}
                        {notification.relatedEntity.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title={language === "ha" ? "Duba" : "View"}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>

                  <button
                    className="text-red-600 hover:text-red-800"
                    title={language === "ha" ? "Goge" : "Delete"}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === "ha" ? "Babu sanarwa" : "No notifications found"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language === "ha"
                ? "Canza neman ko tace don samun sakamako"
                : "Try adjusting your search or filters to find what you're looking for"}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
