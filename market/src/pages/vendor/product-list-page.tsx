import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../../services/product.service";
import { useRequest } from "../../hooks/use-request";
import type { Product } from "../../types";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export function VendorProductListPage() {
  const {
    data: products,
    loading,
    error,
    run,
  } = useRequest<Product[]>(async () => {
    const res = await productService.getVendorProducts();
    return res.data;
  });

  useEffect(() => {
    run();
  }, [run]);

  return (
    <ProtectedRoute roles={["vendor"]}>
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Products</h1>
          <Link
            to="/vendor/products/new"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Add Product
          </Link>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.name}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
              <p className="text-sm text-gray-600 truncate">
                {product.description}
              </p>
              <span className="mt-auto text-lg font-bold">
                ₦{product.basePrice.toLocaleString()}
              </span>
              <div className="mt-4 flex space-x-2">
                <Link
                  to={`/vendor/products/${product.id}/edit`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm("Are you sure to delete this product?")) {
                      try {
                        await productService.deleteProduct(product.id);
                        run();
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}