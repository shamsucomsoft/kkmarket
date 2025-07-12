import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BuildingStorefrontIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface SupportTicket {
  id: string;
  subject: string;
  subjectHa: string;
  description: string;
  descriptionHa: string;
  category:
    | "account"
    | "payment"
    | "technical"
    | "vendor"
    | "dispute"
    | "general";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting_response" | "resolved" | "closed";
  requester: {
    id: string;
    name: string;
    email: string;
    type: "user" | "vendor";
    avatar?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastResponse?: string;
  responseCount: number;
  tags: string[];
}

const mockTickets: SupportTicket[] = [
  {
    id: "SUP001",
    subject: "Unable to complete payment",
    subjectHa: "Ba zan iya kammala biyan kuɗi ba",
    description:
      "I'm trying to purchase a traditional fabric but the payment keeps failing. I've tried multiple cards.",
    descriptionHa:
      "Ina ƙoƙarin siyan yadudduka na gargajiya amma biyan kuɗi yana ci gaba da ɓatawa. Na gwada katunan da yawa.",
    category: "payment",
    priority: "high",
    status: "open",
    requester: {
      id: "user_001",
      name: "Fatima Mohammed",
      email: "fatima.mohammed@email.com",
      type: "user",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b9e7?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: "2024-03-20T14:30:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
    responseCount: 0,
    tags: ["payment", "urgent"],
  },
  {
    id: "SUP002",
    subject: "How to update vendor profile",
    subjectHa: "Yadda za a sabunta bayanan dillali",
    description:
      "I need help updating my vendor profile information and adding more product categories.",
    descriptionHa:
      "Ina bukatar taimako don sabunta bayanan dillali na da ƙara ƙarin nau'ikan kayayyaki.",
    category: "vendor",
    priority: "medium",
    status: "in_progress",
    requester: {
      id: "vendor_001",
      name: "Ibrahim Traditional Crafts",
      email: "ibrahim.crafts@email.com",
      type: "vendor",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    assignedTo: {
      id: "admin_001",
      name: "Admin Support",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: "2024-03-20T10:15:00Z",
    updatedAt: "2024-03-20T12:30:00Z",
    lastResponse: "2 hours ago",
    responseCount: 3,
    tags: ["vendor", "profile"],
  },
  {
    id: "SUP003",
    subject: "Account temporarily suspended",
    subjectHa: "An dakatar da asusun wucin gadi",
    description:
      "My account has been suspended and I can't access my vendor dashboard. Please help resolve this.",
    descriptionHa:
      "An dakatar da asusun na kuma ba zan iya shiga dashboard na ba. Don Allah ku taimake ni warware wannan.",
    category: "account",
    priority: "urgent",
    status: "waiting_response",
    requester: {
      id: "vendor_002",
      name: "Aisha Spice House",
      email: "aisha.spices@email.com",
      type: "vendor",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
    },
    assignedTo: {
      id: "admin_002",
      name: "Admin Review",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: "2024-03-19T16:45:00Z",
    updatedAt: "2024-03-20T09:20:00Z",
    lastResponse: "8 hours ago",
    responseCount: 5,
    tags: ["account", "suspension", "urgent"],
  },
  {
    id: "SUP004",
    subject: "Website loading slowly",
    subjectHa: "Gidan yanar gizon yana bugawa a hankali",
    description:
      "The website takes too long to load, especially the product pages.",
    descriptionHa:
      "Gidan yanar gizon yana ɗaukar lokaci mai tsawo don yin lodi, musamman shafukan kayayyaki.",
    category: "technical",
    priority: "low",
    status: "resolved",
    requester: {
      id: "user_002",
      name: "Ahmed Usman",
      email: "ahmed.usman@email.com",
      type: "user",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    assignedTo: {
      id: "admin_003",
      name: "Tech Support",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    createdAt: "2024-03-18T14:20:00Z",
    updatedAt: "2024-03-19T11:15:00Z",
    lastResponse: "1 day ago",
    responseCount: 2,
    tags: ["performance", "technical"],
  },
];

export const SupportPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "waiting_response":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case "in_progress":
        return <ClockIcon className="w-4 h-4" />;
      case "waiting_response":
        return <ChatBubbleLeftRightIcon className="w-4 h-4" />;
      case "resolved":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "closed":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "urgent":
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

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { en: string; ha: string }> = {
      account: { en: "Account", ha: "Asusun" },
      payment: { en: "Payment", ha: "Biyan Kuɗi" },
      technical: { en: "Technical", ha: "Fasaha" },
      vendor: { en: "Vendor", ha: "Dillali" },
      dispute: { en: "Dispute", ha: "Rikici" },
      general: { en: "General", ha: "Gabaɗaya" },
    };
    return language === "ha"
      ? labels[category]?.ha || category
      : labels[category]?.en || category;
  };

  const filteredTickets = mockTickets.filter((ticket) => {
    const subject = language === "ha" ? ticket.subjectHa : ticket.subject;
    const description =
      language === "ha" ? ticket.descriptionHa : ticket.description;

    const matchesSearch =
      subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || ticket.category === filterCategory;
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
                {language === "ha" ? "Taimako" : "Support Center"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ha"
                  ? "Gudanar da tambayoyin taimako da buƙatun masu amfani"
                  : "Manage support tickets and user help requests"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredTickets.length}{" "}
                {language === "ha" ? "tikiti" : "tickets"}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            {
              label: language === "ha" ? "A Buɗe" : "Open",
              value: mockTickets.filter((t) => t.status === "open").length,
              color: "bg-red-500",
              icon: ExclamationTriangleIcon,
            },
            {
              label: language === "ha" ? "Ana Aiki" : "In Progress",
              value: mockTickets.filter((t) => t.status === "in_progress")
                .length,
              color: "bg-blue-500",
              icon: ClockIcon,
            },
            {
              label: language === "ha" ? "Muhimmanci Girma" : "High Priority",
              value: mockTickets.filter(
                (t) => t.priority === "high" || t.priority === "urgent"
              ).length,
              color: "bg-orange-500",
              icon: ExclamationTriangleIcon,
            },
            {
              label: language === "ha" ? "An Warware" : "Resolved",
              value: mockTickets.filter((t) => t.status === "resolved").length,
              color: "bg-green-500",
              icon: CheckCircleIcon,
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
                  language === "ha" ? "Nema tikiti..." : "Search tickets..."
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
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">
                    {language === "ha" ? "Dukan Nau'i" : "All Categories"}
                  </option>
                  <option value="account">
                    {language === "ha" ? "Asusun" : "Account"}
                  </option>
                  <option value="payment">
                    {language === "ha" ? "Biyan Kuɗi" : "Payment"}
                  </option>
                  <option value="technical">
                    {language === "ha" ? "Fasaha" : "Technical"}
                  </option>
                  <option value="vendor">
                    {language === "ha" ? "Dillali" : "Vendor"}
                  </option>
                  <option value="dispute">
                    {language === "ha" ? "Rikici" : "Dispute"}
                  </option>
                  <option value="general">
                    {language === "ha" ? "Gabaɗaya" : "General"}
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
                <option value="urgent">
                  {language === "ha" ? "Gaggawa" : "Urgent"}
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
                <option value="open">
                  {language === "ha" ? "A Buɗe" : "Open"}
                </option>
                <option value="in_progress">
                  {language === "ha" ? "Ana Aiki" : "In Progress"}
                </option>
                <option value="waiting_response">
                  {language === "ha" ? "Jiran Amsa" : "Waiting Response"}
                </option>
                <option value="resolved">
                  {language === "ha" ? "An Warware" : "Resolved"}
                </option>
                <option value="closed">
                  {language === "ha" ? "An Rufe" : "Closed"}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Support Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {ticket.requester.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={ticket.requester.avatar}
                        alt={ticket.requester.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        {ticket.requester.type === "vendor" ? (
                          <BuildingStorefrontIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <UserIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        {ticket.id}
                      </span>

                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1 capitalize">
                          {ticket.status.replace("_", " ")}
                        </span>
                      </span>

                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority.charAt(0).toUpperCase() +
                          ticket.priority.slice(1)}
                      </span>

                      <span className="text-xs text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {language === "ha" ? ticket.subjectHa : ticket.subject}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {language === "ha"
                        ? ticket.descriptionHa
                        : ticket.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          {language === "ha" ? "Mai nema:" : "Requester:"}{" "}
                          {ticket.requester.name}
                        </span>

                        {ticket.assignedTo && (
                          <span>
                            {language === "ha"
                              ? "Wanda aka ba:"
                              : "Assigned to:"}{" "}
                            {ticket.assignedTo.name}
                          </span>
                        )}

                        <span className="flex items-center">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          {ticket.responseCount}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {ticket.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
                    className="text-green-600 hover:text-green-800"
                    title={language === "ha" ? "Amsa" : "Reply"}
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === "ha" ? "Babu tikiti" : "No tickets found"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language === "ha"
                ? "Canza neman ko tace don samun sakamako"
                : "Try adjusting your search or filters to find what you're looking for"}
            </p>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={() => setSelectedTicket(null)}
              ></div>
              <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedTicket.id}
                      </h2>
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          selectedTicket.status
                        )}`}
                      >
                        {getStatusIcon(selectedTicket.status)}
                        <span className="ml-1 capitalize">
                          {selectedTicket.status.replace("_", " ")}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {language === "ha"
                          ? selectedTicket.subjectHa
                          : selectedTicket.subject}
                      </h3>
                      <p className="text-gray-700">
                        {language === "ha"
                          ? selectedTicket.descriptionHa
                          : selectedTicket.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          {language === "ha" ? "Mai Nema" : "Requester"}
                        </h4>
                        <div className="flex items-center space-x-3">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={selectedTicket.requester.avatar}
                            alt={selectedTicket.requester.name}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {selectedTicket.requester.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {selectedTicket.requester.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          {language === "ha" ? "Bayani" : "Details"}
                        </h4>
                        <dl className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-gray-500">
                              {language === "ha" ? "Nau'i:" : "Category:"}
                            </dt>
                            <dd className="text-gray-900">
                              {getCategoryLabel(selectedTicket.category)}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">
                              {language === "ha" ? "Muhimmanci:" : "Priority:"}
                            </dt>
                            <dd className="text-gray-900 capitalize">
                              {selectedTicket.priority}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-gray-500">
                              {language === "ha" ? "Amsoshi:" : "Responses:"}
                            </dt>
                            <dd className="text-gray-900">
                              {selectedTicket.responseCount}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        {language === "ha" ? "Sanya Hannu" : "Assign"}
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                        {language === "ha" ? "Amsa" : "Reply"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
