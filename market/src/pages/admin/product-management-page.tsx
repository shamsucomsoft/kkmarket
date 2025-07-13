import React, { useState, useEffect } from "react";
import { useLanguage } from "../../state/language-context";
import { AdminLayout } from "../../components/layout/admin-layout";
import { productService } from "../../services/product.service";
import { handleApiError } from "../../services/api";
import { Product } from "../../types";

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
    showCreateModal,
    showEditModal,
    editingProduct
  } = state;

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, selectedStatus, searchTerm]);

  const fetchProducts = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const filters = {
        page: currentPage,
        limit: 10,
        ...(searchTerm && { query: searchTerm }),
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
      };

      const response = await productService.getVendorProducts(filters);
      
      setState(prev => ({
        ...prev,
        products: response.data,
        totalPages: response.pagination.totalPages,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
        isLoading: false,
      }));
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      setState(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedProducts.map(id => productService.deleteProduct(id))
      );
      setState(prev => ({
        ...prev,
        products: prev.products.filter(p => !selectedProducts.includes(p.id)),
        selectedProducts: [],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleUpdateStatus = async (productId: string, status: string) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      await productService.updateProduct(productId, { status });
      setState(prev => ({
        ...prev,
        products: prev.products.map(p =>
          p.id === productId ? { ...p, status } : p
        ),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: handleApiError(error),
      }));
    }
  };

  const handleSelectProduct = (productId: string) => {
    setState(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.includes(productId)
        ? prev.selectedProducts.filter(id => id !== productId)
        : [...prev.selectedProducts, productId],
    }));
  };

  const handleSelectAll = () => {
    setState(prev => ({
      ...prev,
      selectedProducts: 
        prev.selectedProducts.length === products.length 
          ? [] 
          : products.map(p => p.id),
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "out_of_stock":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {language === "ha" ? "Sake Gwada" : "Try Again"}
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Sarrafa Kayayyaki" : "Product Management"}
            </h1>
            <p className="text-gray-600">
              {language === "ha" 
                ? "Sarrafa kayayyakin da kuke sayarwa"
                : "Manage your products and inventory"
              }
            </p>
          </div>
          <button
            onClick={() => setState(prev => ({ ...prev, showCreateModal: true }))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {language === "ha" ? "Kara Kaya" : "Add Product"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Jimillar Kayayyaki" : "Total Products"}
                </p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Kayayyaki masu Aiki" : "Active Products"}
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.status === "active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Kayayyaki marasa Stock" : "Out of Stock"}
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter((p) => p.status === "out_of_stock").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === "ha" ? "Kayayyaki marasa Aiki" : "Inactive Products"}
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter((p) => p.status === "inactive").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Bincike" : "Search"}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setState(prev => ({ ...prev, searchTerm: e.target.value }))}
                placeholder={language === "ha" ? "Binciken kaya..." : "Search products..."}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Nau'i" : "Category"}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setState(prev => ({ ...prev, selectedCategory: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{language === "ha" ? "Duk nau'i" : "All categories"}</option>
                <option value="Textiles">{language === "ha" ? "Yadudduka" : "Textiles"}</option>
                <option value="Food & Spices">{language === "ha" ? "Abinci da Kayan yaji" : "Food & Spices"}</option>
                <option value="Leather">{language === "ha" ? "Fata" : "Leather"}</option>
                <option value="Jewelry">{language === "ha" ? "Kayan ado" : "Jewelry"}</option>
                <option value="Pottery">{language === "ha" ? "Tukwane" : "Pottery"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {language === "ha" ? "Matsayi" : "Status"}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setState(prev => ({ ...prev, selectedStatus: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{language === "ha" ? "Duk matsayi" : "All statuses"}</option>
                <option value="active">{language === "ha" ? "Mai aiki" : "Active"}</option>
                <option value="inactive">{language === "ha" ? "Marasa aiki" : "Inactive"}</option>
                <option value="out_of_stock">{language === "ha" ? "Marasa stock" : "Out of Stock"}</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchProducts}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {language === "ha" ? "Tace" : "Filter"}
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        {selectedProducts.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} {language === "ha" ? "kayayyaki an zaɓa" : "products selected"}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  {language === "ha" ? "Share" : "Delete Selected"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Kaya" : "Product"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Nau'i" : "Category"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Farashi" : "Price"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Matsayi" : "Status"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ƙira" : "Created"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language === "ha" ? "Ayyuka" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.images[0] || "/placeholder.jpg"}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {language === "ha" ? product.nameHa : product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {language === "ha" ? product.categoryHa : product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(product.basePrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(product.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setState(prev => ({ 
                            ...prev, 
                            showEditModal: true, 
                            editingProduct: product 
                          }))}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {language === "ha" ? "Gyara" : "Edit"}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {language === "ha" ? "Share" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setState(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {language === "ha" ? "Baya" : "Previous"}
            </button>
            <span className="px-3 py-2 text-sm text-gray-700">
              {language === "ha" ? `Shafi ${currentPage} na ${state.totalPages}` : `Page ${currentPage} of ${state.totalPages}`}
            </span>
            <button
              onClick={() => setState(prev => ({ ...prev, currentPage: Math.min(state.totalPages, prev.currentPage + 1) }))}
              disabled={currentPage === state.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {language === "ha" ? "Gaba" : "Next"}
            </button>
          </nav>
        </div>
      </div>
    </AdminLayout>
  );
};
