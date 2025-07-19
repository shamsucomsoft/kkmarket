import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminButton,
  AdminTable,
  AdminPagination,
  StatusBadge,
  MetricCard,
} from "../../components/ui/admin";

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
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
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
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
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
  const [filterRole, setFilterRole] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    }
  };

  const roleOptions = [
    { value: "", label: language === "ha" ? "Dukan Matsayi" : "All Roles" },
    { value: "user", label: language === "ha" ? "Mai Amfani" : "User" },
    { value: "vendor", label: language === "ha" ? "Dillali" : "Vendor" },
    { value: "admin", label: language === "ha" ? "Admin" : "Admin" },
  ];

  const statusOptions = [
    { value: "", label: language === "ha" ? "Dukan Hali" : "All Statuses" },
    { value: "active", label: language === "ha" ? "Mai Aiki" : "Active" },
    {
      value: "suspended",
      label: language === "ha" ? "An Dakatar" : "Suspended",
    },
    { value: "pending", label: language === "ha" ? "Jiran" : "Pending" },
  ];

  const tableColumns = [
    {
      key: "user",
      title: language === "ha" ? "Mai Amfani" : "User",
      render: (user: User) => (
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={user.avatar}
              alt={user.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      title: language === "ha" ? "Matsayi" : "Role",
      render: (user: User) => (
        <StatusBadge
          status={user.role}
          customColors={{
            admin: { bg: "bg-gray-100", text: "text-gray-800" },
            vendor: { bg: "bg-gray-100", text: "text-gray-800" },
            user: { bg: "bg-gray-100", text: "text-gray-800" },
          }}
        />
      ),
    },
    {
      key: "status",
      title: language === "ha" ? "Hali" : "Status",
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: "joinDate",
      title: language === "ha" ? "Kwanan Wata" : "Joined",
      render: (user: User) => (
        <div>
          <p className="text-sm text-gray-700">
            {new Date(user.joinDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500">{user.lastActive}</p>
        </div>
      ),
    },
    {
      key: "actions",
      title: language === "ha" ? "Ayyuka" : "Actions",
      align: "center" as const,
      render: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1 text-gray-500 hover:text-gray-600 transition-colors">
            <EyeIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-600 transition-colors">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-500 hover:text-gray-600 transition-colors">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Sarrafa Masu Amfani" : "User Management"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ha"
                ? "Gudanar da dukkan masu amfani da platform"
                : "Manage all platform users and their permissions"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={language === "ha" ? "Jimillar Masu Amfani" : "Total Users"}
            value={mockUsers.length.toString()}
            icon={UsersIcon}
            iconBg="bg-gray-600"
          />
          <MetricCard
            title={language === "ha" ? "Masu Amfani masu Aiki" : "Active Users"}
            value={mockUsers
              .filter((u) => u.status === "active")
              .length.toString()}
            icon={CheckCircleIcon}
            iconBg="bg-gray-600"
          />
          <MetricCard
            title={
              language === "ha"
                ? "Masu Amfani da aka Dakatar"
                : "Suspended Users"
            }
            value={mockUsers
              .filter((u) => u.status === "suspended")
              .length.toString()}
            icon={XCircleIcon}
            iconBg="bg-gray-600"
          />
          <MetricCard
            title={
              language === "ha" ? "Masu Amfani masu Jiran" : "Pending Users"
            }
            value={mockUsers
              .filter((u) => u.status === "pending")
              .length.toString()}
            icon={EllipsisVerticalIcon}
            iconBg="bg-gray-600"
          />
        </div>

        {/* Filters and Search */}
        <AdminCard>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <AdminInput
                placeholder={
                  language === "ha" ? "Nema masu amfani..." : "Search users..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={MagnifyingGlassIcon}
              />
            </div>
            <div className="flex items-center gap-4">
              <AdminSelect
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                options={roleOptions}
              />
              <AdminSelect
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={statusOptions}
              />
              <AdminButton icon={FunnelIcon}>
                {language === "ha" ? "Tace" : "Filter"}
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <AdminCard className="bg-gray-50 border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {selectedUsers.length}{" "}
                {language === "ha" ? "zaɓaɓɓu" : "selected"}
              </span>
              <div className="flex items-center gap-3">
                <AdminButton variant="outline" size="sm">
                  {language === "ha" ? "Kunna" : "Activate"}
                </AdminButton>
                <AdminButton variant="outline" size="sm">
                  {language === "ha" ? "Dakatar" : "Suspend"}
                </AdminButton>
                <AdminButton variant="primary" size="sm" icon={EnvelopeIcon}>
                  {language === "ha" ? "Aika Saƙo" : "Send Message"}
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        )}

        {/* Users Table */}
        <AdminCard>
          <AdminTable
            data={paginatedUsers}
            columns={tableColumns}
            selectable
            selectedItems={selectedUsers}
            onSelectItem={handleSelectUser}
            onSelectAll={handleSelectAll}
            getItemId={(user) => user.id}
          />
          <AdminPagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={usersPerPage}
          />
        </AdminCard>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <AdminCard>
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
          </AdminCard>
        )}
      </div>
    </DashboardLayout>
  );
};
