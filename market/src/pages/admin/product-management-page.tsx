import React, { useState, useEffect } from "react";
import { useLanguage } from "../../state/language-context";
import { DashboardLayout as AdminLayout } from "../../components/layout/dashboard-layout";
import { productService } from "../../services/product.service";
import { handleApiError } from "../../services/api";
import type { Product } from "../../types";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  MetricCard,
  AdminCard,
  AdminButton,
  AdminInput,
  AdminSelect,
  AdminTable,
  AdminPagination,
  StatusBadge,
} from "../../components/ui/admin";

interface ProductManagementState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedProducts: string[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string;
  selectedStatus: string;
  showCreateModal: boolean;
  showEditModal: boolean;
  editingProduct: Product | null;
  sortBy: string;
  sortDirection: "asc" | "desc";
}

export const ProductManagementPage: React.FC = () => {
  const { language } = useLanguage();
  const [state, setState] = useState<ProductManagementState>({
    products: [],
    isLoading: true,
    error: null,
    searchTerm: "",
    selectedProducts: [],
    currentPage: 1,
    totalPages: 1,
    selectedCategory: "",
    selectedStatus: "",
    showCreateModal: false,
    showEditModal: false,
    editingProduct: null,
    sortBy: "",
    sortDirection: "asc",
  });

  const {
    products,
    isLoading,
    error,
    searchTerm,
    selectedProducts,
    currentPage,
    selectedCategory,
    selectedStatus,
    sortBy,
    sortDirection,
  } = state;

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    selectedCategory,
    selectedStatus,
    searchTerm,
    sortBy,
    sortDirection,
  ]);

  const fetchProducts = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const filters = {
        page: currentPage,
        limit: 10,
        ...(searchTerm && { query: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
        // ...(sortBy && { sortBy, sortDirection }),
      };

      const response = await productService.getVendorProducts(filters);

      setState((prev) => ({
        ...prev,
        products: response.data,
        totalPages: response.pagination?.totalPages || 1,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
        isLoading: false,
      }));
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p.id !== productId),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) => productService.deleteProduct(id))
      );
      setState((prev) => ({
        ...prev,
        products: prev.products.filter((p) => !selectedProducts.includes(p.id)),
        selectedProducts: [],
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleUpdateStatus = async (productId: string, status: string) => {
    try {
      await productService.updateProduct(productId, {
        status: status as "draft" | "active" | "inactive" | "out_of_stock",
      });
      setState((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === productId ? { ...p, status: status as any } : p
        ),
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleSelectProduct = (productId: string) => {
    setState((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter((id) => id !== productId)
        : [...prev.selectedProducts, productId],
    }));
  };

  const handleSelectAll = () => {
    setState((prev) => ({
      ...prev,
      selectedProducts:
        prev.selectedProducts.length === products.length
          ? []
          : products.map((p) => p.id),
    }));
  };

  const handleSort = (column: string) => {
    setState((prev) => ({
      ...prev,
      sortBy: column,
      sortDirection:
        prev.sortBy === column && prev.sortDirection === "asc" ? "desc" : "asc",
    }));
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getProductStats = () => {
    const total = products.length;
    const active = products.filter((p) => p.status === "active").length;
    const inactive = products.filter((p) => p.status === "inactive").length;
    const outOfStock = products.filter(
      (p) => p.status === "out_of_stock"
    ).length;

    return { total, active, inactive, outOfStock };
  };

  const stats = getProductStats();

  const categoryOptions = [
    { value: "", label: language === "ha" ? "Duk nau'i" : "All categories" },
    { value: "Textiles", label: language === "ha" ? "Yadudduka" : "Textiles" },
    {
      value: "Food & Spices",
      label: language === "ha" ? "Abinci da Kayan yaji" : "Food & Spices",
    },
    { value: "Leather", label: language === "ha" ? "Fata" : "Leather" },
    { value: "Jewelry", label: language === "ha" ? "Kayan ado" : "Jewelry" },
    { value: "Pottery", label: language === "ha" ? "Tukwane" : "Pottery" },
  ];

  const statusOptions = [
    { value: "", label: language === "ha" ? "Duk matsayi" : "All statuses" },
    { value: "active", label: language === "ha" ? "Mai aiki" : "Active" },
    {
      value: "inactive",
      label: language === "ha" ? "Marasa aiki" : "Inactive",
    },
    {
      value: "out_of_stock",
      label: language === "ha" ? "Marasa stock" : "Out of Stock",
    },
  ];

  const tableColumns = [
    {
      key: "name",
      title: language === "ha" ? "Kaya" : "Product",
      render: (product: Product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900 truncate max-w-40">
              {language === "ha" ? product.nameHa : product.name}
            </h4>
            <p className="text-sm text-gray-500">ID: {product.id}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "category",
      title: language === "ha" ? "Nau'i" : "Category",
      render: (product: Product) => (
        <span className="text-sm text-gray-700">
          {language === "ha" ? product.categoryHa : product.category}
        </span>
      ),
      sortable: true,
    },
    {
      key: "basePrice",
      title: language === "ha" ? "Farashi" : "Price",
      render: (product: Product) => (
        <span className="font-medium text-gray-900">
          {formatPrice(product.basePrice)}
        </span>
      ),
      sortable: true,
      align: "right" as const,
    },
    {
      key: "status",
      title: language === "ha" ? "Matsayi" : "Status",
      render: (product: Product) => <StatusBadge status={product.status} />,
      sortable: true,
    },
    {
      key: "createdAt",
      title: language === "ha" ? "Ƙira" : "Created",
      render: (product: Product) => (
        <span className="text-sm text-gray-500">
          {formatDate(product.createdAt)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "actions",
      title: language === "ha" ? "Ayyuka" : "Actions",
      render: (product: Product) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title={language === "ha" ? "Duba" : "View"}
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                showEditModal: true,
                editingProduct: product,
              }))
            }
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title={language === "ha" ? "Gyara" : "Edit"}
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            title={language === "ha" ? "Share" : "Delete"}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
      align: "center" as const,
    },
  ];

  if (error) {
    return (
      <AdminLayout>
        <AdminCard className="text-center py-12">
          <div className="text-red-600 mb-4">
            <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg font-medium">Error loading products</p>
            <p className="text-sm">{error}</p>
          </div>
          <AdminButton onClick={fetchProducts} icon={ArrowPathIcon}>
            {language === "ha" ? "Sake Gwada" : "Try Again"}
          </AdminButton>
        </AdminCard>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Sarrafa Kayayyaki" : "Product Management"}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === "ha"
                ? "Sarrafa kayayyakin da kuke sayarwa"
                : "Manage your products and inventory"}
            </p>
          </div>
          <AdminButton
            onClick={() =>
              setState((prev) => ({ ...prev, showCreateModal: true }))
            }
            icon={PlusIcon}
          >
            {language === "ha" ? "Kara Kaya" : "Add Product"}
          </AdminButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title={language === "ha" ? "Jimillar Kayayyaki" : "Total Products"}
            value={stats.total.toString()}
            icon={BuildingStorefrontIcon}
            iconBg="bg-blue-600"
          />
          <MetricCard
            title={
              language === "ha" ? "Kayayyaki masu Aiki" : "Active Products"
            }
            value={stats.active.toString()}
            icon={CheckCircleIcon}
            iconBg="bg-green-600"
          />
          <MetricCard
            title={
              language === "ha" ? "Kayayyaki marasa Stock" : "Out of Stock"
            }
            value={stats.outOfStock.toString()}
            icon={ExclamationTriangleIcon}
            iconBg="bg-orange-600"
          />
          <MetricCard
            title={
              language === "ha" ? "Kayayyaki marasa Aiki" : "Inactive Products"
            }
            value={stats.inactive.toString()}
            icon={XCircleIcon}
            iconBg="bg-red-600"
          />
        </div>

        {/* Filters */}
        <AdminCard
          title={language === "ha" ? "Tace Kayayyaki" : "Filter Products"}
          className="bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AdminInput
              label={language === "ha" ? "Bincike" : "Search"}
              value={searchTerm}
              onChange={(e) =>
                setState((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              placeholder={
                language === "ha" ? "Binciken kaya..." : "Search products..."
              }
              icon={MagnifyingGlassIcon}
            />
            <AdminSelect
              label={language === "ha" ? "Nau'i" : "Category"}
              value={selectedCategory}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  selectedCategory: e.target.value,
                }))
              }
              options={categoryOptions}
            />
            <AdminSelect
              label={language === "ha" ? "Matsayi" : "Status"}
              value={selectedStatus}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  selectedStatus: e.target.value,
                }))
              }
              options={statusOptions}
            />
            <div className="flex items-end">
              <AdminButton
                onClick={fetchProducts}
                icon={FunnelIcon}
                className="w-full"
              >
                {language === "ha" ? "Tace" : "Filter"}
              </AdminButton>
            </div>
          </div>
        </AdminCard>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <AdminCard className="bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedProducts.length}{" "}
                {language === "ha" ? "kayayyaki an zaɓa" : "products selected"}
              </span>
              <AdminButton
                onClick={handleBulkDelete}
                variant="danger"
                size="sm"
                icon={TrashIcon}
              >
                {language === "ha" ? "Share" : "Delete Selected"}
              </AdminButton>
            </div>
          </AdminCard>
        )}

        {/* Products Table */}
        <AdminCard
          title={language === "ha" ? "Kayayyaki" : "Products"}
          className="bg-white"
        >
          <AdminTable
            data={products}
            columns={tableColumns}
            loading={isLoading}
            selectable={true}
            selectedItems={selectedProducts}
            onSelectItem={handleSelectProduct}
            onSelectAll={handleSelectAll}
            getItemId={(item) => item.id}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            emptyMessage={
              language === "ha" ? "Babu kayayyaki" : "No products found"
            }
          />
          <AdminPagination
            currentPage={currentPage}
            totalPages={state.totalPages}
            onPageChange={(page) =>
              setState((prev) => ({ ...prev, currentPage: page }))
            }
            totalItems={products.length * state.totalPages}
            itemsPerPage={10}
            showItemsInfo={true}
          />
        </AdminCard>
      </div>
    </AdminLayout>
  );
};
