import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "vendor" | "admin";
  status: "active" | "suspended" | "pending";
  joinDate: string;
  lastActive: string;
  totalOrders: number;
  totalSpent: string;
  location: string;
  avatar?: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Fatima Mohammed",
    email: "fatima.mohammed@email.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalOrders: 23,
    totalSpent: "₦145,600",
    location: "Kano, Nigeria",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b9e7?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Ahmed Usman",
    email: "ahmed.usman@email.com",
    role: "vendor",
    status: "active",
    joinDate: "2024-02-10",
    lastActive: "1 day ago",
    totalOrders: 156,
    totalSpent: "₦89,200",
    location: "Lagos, Nigeria",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Zainab Ibrahim",
    email: "zainab.ibrahim@email.com",
    role: "user",
    status: "suspended",
    joinDate: "2024-03-05",
    lastActive: "1 week ago",
    totalOrders: 5,
    totalSpent: "₦32,100",
    location: "Abuja, Nigeria",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Malam Ibrahim Crafts",
    email: "ibrahim.crafts@email.com",
    role: "vendor",
    status: "pending",
    joinDate: "2024-03-20",
    lastActive: "3 hours ago",
    totalOrders: 0,
    totalSpent: "₦0",
    location: "Kano, Nigeria",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: "5",
    name: "Hajiya Aisha",
    email: "aisha.spices@email.com",
    role: "vendor",
    status: "active",
    joinDate: "2024-01-28",
    lastActive: "5 minutes ago",
    totalOrders: 342,
    totalSpent: "₦245,800",
    location: "Kano, Nigeria",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
  },
];

export const UserManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "suspended":
        return <XCircleIcon className="w-4 h-4" />;
      case "pending":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "vendor":
        return "bg-blue-100 text-blue-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {language === "ha" ? "Sarrafa Masu Amfani" : "User Management"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ha"
                  ? "Gudanar da dukkan masu amfani da platform"
                  : "Manage all platform users and their permissions"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredUsers.length}{" "}
                {language === "ha" ? "masu amfani" : "users"}
              </span>
            </div>
          </div>
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
                  language === "ha" ? "Nema masu amfani..." : "Search users..."
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
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">
                    {language === "ha" ? "Dukan Matsayi" : "All Roles"}
                  </option>
                  <option value="user">
                    {language === "ha" ? "Mai Amfani" : "User"}
                  </option>
                  <option value="vendor">
                    {language === "ha" ? "Dillali" : "Vendor"}
                  </option>
                  <option value="admin">
                    {language === "ha" ? "Admin" : "Admin"}
                  </option>
                </select>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">
                  {language === "ha" ? "Dukan Hali" : "All Status"}
                </option>
                <option value="active">
                  {language === "ha" ? "Mai Aiki" : "Active"}
                </option>
                <option value="suspended">
                  {language === "ha" ? "An Dakatar" : "Suspended"}
                </option>
                <option value="pending">
                  {language === "ha" ? "Jiran" : "Pending"}
                </option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="text-sm text-blue-800">
                {selectedUsers.length}{" "}
                {language === "ha" ? "zaɓaɓɓu" : "selected"}
              </span>
              <div className="flex items-center space-x-3">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {language === "ha" ? "Kunna" : "Activate"}
                </button>
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  {language === "ha" ? "Dakatar" : "Suspend"}
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                  {language === "ha" ? "Aika Saƙo" : "Send Message"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Mai Amfani" : "User"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Matsayi" : "Role"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Hali" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Oda" : "Orders"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kuɗi" : "Spent"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kwanan Wata" : "Joined"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <UsersIcon className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalOrders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.joinDate).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {language === "ha" ? "Karshe:" : "Last:"}{" "}
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title={language === "ha" ? "Duba" : "View"}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          title={language === "ha" ? "Gyara" : "Edit"}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title={language === "ha" ? "Dakatar" : "Suspend"}
                        >
                          <NoSymbolIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600"
                          title={language === "ha" ? "Ƙarin" : "More"}
                        >
                          <EllipsisVerticalIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === "ha" ? "Babu masu amfani" : "No users found"}
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
