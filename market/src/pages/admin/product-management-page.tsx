import {
  ArchiveBoxIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import { SummaryCard } from "../../components/ui/summary-card";

interface Product {
  id: string;
  name: string;
  nameHa: string;
  description: string;
  category: string;
  subcategory: string;
  vendor: {
    id: string;
    name: string;
    email: string;
  };
  price: number;
  originalPrice?: number;
  stock: number;
  lowStockThreshold: number;
  status: "active" | "inactive" | "pending" | "rejected" | "out_of_stock";
  approval: "approved" | "pending" | "rejected";
  featured: boolean;
  rating: number;
  reviewCount: number;
  totalSales: number;
  totalRevenue: number;
  image: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastSold?: string;
}

const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Authentic Kano Indigo Adire",
    nameHa: "Adire Indigo na Kano na Gaske",
    description: "Traditional hand-dyed indigo fabric from Kano artisans",
    category: "Textiles",
    subcategory: "Traditional Fabrics",
    vendor: {
      id: "V001",
      name: "Ibrahim Traditional Crafts",
      email: "ibrahim@example.com",
    },
    price: 18500,
    originalPrice: 25000,
    stock: 25,
    lowStockThreshold: 10,
    status: "active",
    approval: "approved",
    featured: true,
    rating: 4.8,
    reviewCount: 23,
    totalSales: 156,
    totalRevenue: 2888000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    ],
    tags: ["traditional", "handmade", "indigo", "fabric"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:20:00Z",
    lastSold: "2024-03-20T12:15:00Z",
  },
  {
    id: "P002",
    name: "Northern Suya Spice Mix",
    nameHa: "Kayan Yajin Suya na Arewa",
    description: "Authentic spice blend for traditional Nigerian suya",
    category: "Food & Spices",
    subcategory: "Spice Blends",
    vendor: {
      id: "V002",
      name: "Aisha Spice House",
      email: "aisha@example.com",
    },
    price: 3200,
    stock: 150,
    lowStockThreshold: 50,
    status: "active",
    approval: "approved",
    featured: false,
    rating: 4.6,
    reviewCount: 67,
    totalSales: 234,
    totalRevenue: 748800,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    ],
    tags: ["spices", "suya", "traditional", "food"],
    createdAt: "2024-02-10T08:15:00Z",
    updatedAt: "2024-03-19T16:30:00Z",
    lastSold: "2024-03-19T18:45:00Z",
  },
  {
    id: "P003",
    name: "Handwoven Kano Leather Bag",
    nameHa: "Jakar Fata ta Kano da Hannu",
    description: "Premium leather bag handcrafted by Kano artisans",
    category: "Leather Goods",
    subcategory: "Bags & Accessories",
    vendor: {
      id: "V003",
      name: "Sani Leather Works",
      email: "sani@example.com",
    },
    price: 12000,
    originalPrice: 15000,
    stock: 8,
    lowStockThreshold: 10,
    status: "active",
    approval: "approved",
    featured: true,
    rating: 4.9,
    reviewCount: 45,
    totalSales: 89,
    totalRevenue: 1068000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    ],
    tags: ["leather", "handmade", "bag", "accessories"],
    createdAt: "2024-01-28T14:20:00Z",
    updatedAt: "2024-03-18T10:45:00Z",
    lastSold: "2024-03-18T15:30:00Z",
  },
  {
    id: "P004",
    name: "Traditional Pottery Water Jug",
    nameHa: "Tulu na Kano na Ruwa",
    description: "Handcrafted clay water jug with traditional designs",
    category: "Pottery",
    subcategory: "Household Items",
    vendor: {
      id: "V004",
      name: "Garba Pottery Works",
      email: "garba@example.com",
    },
    price: 5500,
    stock: 0,
    lowStockThreshold: 15,
    status: "out_of_stock",
    approval: "approved",
    featured: false,
    rating: 4.5,
    reviewCount: 34,
    totalSales: 67,
    totalRevenue: 368500,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    ],
    tags: ["pottery", "traditional", "water", "household"],
    createdAt: "2024-03-05T12:00:00Z",
    updatedAt: "2024-03-20T09:15:00Z",
    lastSold: "2024-03-19T14:20:00Z",
  },
  {
    id: "P005",
    name: "Coral Beads Necklace Set",
    nameHa: "Kayan Wuyan Murjani",
    description: "Elegant coral beads necklace with traditional design",
    category: "Jewelry",
    subcategory: "Necklaces",
    vendor: {
      id: "V005",
      name: "Fatima Jewelry",
      email: "fatima@example.com",
    },
    price: 22000,
    originalPrice: 28000,
    stock: 12,
    lowStockThreshold: 5,
    status: "pending",
    approval: "pending",
    featured: false,
    rating: 0,
    reviewCount: 0,
    totalSales: 0,
    totalRevenue: 0,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    ],
    tags: ["jewelry", "coral", "beads", "traditional"],
    createdAt: "2024-03-20T10:30:00Z",
    updatedAt: "2024-03-20T10:30:00Z",
  },
];

export const ProductManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterApproval, setFilterApproval] = useState<string>("all");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("updated");

  const categories = [
    "Textiles",
    "Food & Spices",
    "Leather Goods",
    "Pottery",
    "Jewelry",
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "out_of_stock":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "inactive":
        return <XCircleIcon className="w-4 h-4" />;
      case "pending":
        return <ClockIcon className="w-4 h-4" />;
      case "rejected":
        return <XCircleIcon className="w-4 h-4" />;
      case "out_of_stock":
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getApprovalColor = (approval: string) => {
    switch (approval.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    const name = language === "ha" ? product.nameHa : product.name;
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || product.status === filterStatus;
    const matchesApproval =
      filterApproval === "all" || product.approval === filterApproval;
    return matchesSearch && matchesCategory && matchesStatus && matchesApproval;
  });

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((product) => product.id));
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
                {language === "ha" ? "Sarrafa Kayayyaki" : "Product Management"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ha"
                  ? "Gudanar da dukkan kayayyakin dandamali"
                  : "Manage all products across the platform"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {filteredProducts.length}{" "}
                {language === "ha" ? "kayayyaki" : "products"}
              </span>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                <PlusIcon className="h-4 w-4 mr-2" />
                {language === "ha" ? "Ƙara Kaya" : "Add Product"}
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {[
            {
              label:
                language === "ha" ? "Jimillar Kayayyaki" : "Total Products",
              value: mockProducts.length,
              color: "bg-blue-500",
              icon: ArchiveBoxIcon,
            },
            {
              label: language === "ha" ? "Masu Aiki" : "Active",
              value: mockProducts.filter((p) => p.status === "active").length,
              color: "bg-green-500",
              icon: CheckCircleIcon,
            },
            {
              label: language === "ha" ? "Jiran Amincewa" : "Pending Approval",
              value: mockProducts.filter((p) => p.approval === "pending")
                .length,
              color: "bg-yellow-500",
              icon: ClockIcon,
            },
            {
              label: language === "ha" ? "Karancin Hannun Jari" : "Low Stock",
              value: mockProducts.filter(
                (p) => p.stock <= p.lowStockThreshold && p.stock > 0
              ).length,
              color: "bg-orange-500",
              icon: ExclamationTriangleIcon,
            },
          ].map((stat, index) => (
            <SummaryCard
              key={index}
              icon={stat.icon}
              iconBgClass={stat.color}
              value={stat.value}
              label={stat.label}
            />
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
                  language === "ha" ? "Nema kayayyaki..." : "Search products..."
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
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
                  {language === "ha" ? "Masu Aiki" : "Active"}
                </option>
                <option value="inactive">
                  {language === "ha" ? "Marasa Aiki" : "Inactive"}
                </option>
                <option value="pending">
                  {language === "ha" ? "Jiran" : "Pending"}
                </option>
                <option value="out_of_stock">
                  {language === "ha" ? "Hannun Jari ya Ƙare" : "Out of Stock"}
                </option>
              </select>

              <select
                value={filterApproval}
                onChange={(e) => setFilterApproval(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">
                  {language === "ha" ? "Dukan Amincewa" : "All Approval"}
                </option>
                <option value="approved">
                  {language === "ha" ? "An Amince" : "Approved"}
                </option>
                <option value="pending">
                  {language === "ha" ? "Jiran Amincewa" : "Pending"}
                </option>
                <option value="rejected">
                  {language === "ha" ? "An Ƙi" : "Rejected"}
                </option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="updated">
                  {language === "ha" ? "Kwanan Sabuntawa" : "Last Updated"}
                </option>
                <option value="created">
                  {language === "ha" ? "Kwanan Ƙirƙira" : "Date Created"}
                </option>
                <option value="sales">
                  {language === "ha" ? "Siyarwa" : "Total Sales"}
                </option>
                <option value="revenue">
                  {language === "ha" ? "Kudaden Shiga" : "Revenue"}
                </option>
                <option value="stock">
                  {language === "ha" ? "Hannun Jari" : "Stock Level"}
                </option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="text-sm text-blue-800">
                {selectedProducts.length}{" "}
                {language === "ha" ? "zaɓaɓɓu" : "selected"}
              </span>
              <div className="flex items-center space-x-3">
                <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                  {language === "ha" ? "Amince" : "Approve"}
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  {language === "ha" ? "Kunna" : "Activate"}
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                  {language === "ha" ? "Dakatar" : "Deactivate"}
                </button>
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  {language === "ha" ? "Goge" : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedProducts.length === filteredProducts.length
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kaya" : "Product"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Dillali" : "Vendor"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Farashi" : "Price"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Hannun Jari" : "Stock"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Siyarwa" : "Sales"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Hali" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Amincewa" : "Approval"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image}
                            alt={
                              language === "ha" ? product.nameHa : product.name
                            }
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {language === "ha" ? product.nameHa : product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.id} • {product.category}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {product.featured && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Featured
                              </span>
                            )}
                            {product.stock <= product.lowStockThreshold &&
                              product.stock > 0 && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  Low Stock
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.vendor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.vendor.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {product.lowStockThreshold}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.totalSales}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(product.totalRevenue)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {getStatusIcon(product.status)}
                        <span className="ml-1 capitalize">
                          {product.status.replace("_", " ")}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getApprovalColor(
                          product.approval
                        )}`}
                      >
                        {product.approval.charAt(0).toUpperCase() +
                          product.approval.slice(1)}
                      </span>
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
                          title={language === "ha" ? "Goge" : "Delete"}
                        >
                          <TrashIcon className="h-4 w-4" />
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
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ArchiveBoxIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === "ha" ? "Babu kayayyaki" : "No products found"}
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
