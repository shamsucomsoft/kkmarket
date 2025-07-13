import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { productService } from "../../services/product.service";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import type { Product } from "../../types";

interface ProductFormInputs {
  name: string;
  description: string;
  category: string;
  basePrice: number;
  images?: FileList;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  basePrice: yup
    .number()
    .typeError("Base price must be a number")
    .positive("Base price must be positive")
    .required("Base price is required"),
  images: yup.mixed<FileList>().optional(),
});

export function VendorProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(schema) as Resolver<ProductFormInputs, any>,
    defaultValues: {
      name: "",
      description: "",
      category: "",
      basePrice: undefined as unknown as number,
      images: undefined,
    },
  });

  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      productService
        .getProduct(id)
        .then((prod) => {
          setExistingProduct(prod);
          setValue("name", prod.name);
          setValue("description", prod.description);
          setValue("category", prod.category);
          setValue("basePrice", prod.basePrice);
        })
        .catch(console.error);
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      let productId = id;
      if (isEditMode && id) {
        await productService.updateProduct(id, {
          name: data.name,
          description: data.description,
          category: data.category,
          basePrice: data.basePrice,
        });
      } else {
        const product = await productService.createProduct({
          name: data.name,
          description: data.description,
          category: data.category,
          basePrice: data.basePrice,
        });
        productId = product.id;
      }

      // Upload images if any
      if (productId && data.images && data.images.length > 0) {
        const filesArray = Array.from(data.images) as File[];
        await productService.uploadProductImages(productId, filesArray);
      }

      navigate("/vendor/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute roles={["vendor"]}>
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">{errors.description.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              {...register("category")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">{errors.category.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₦)</label>
            <input
              type="number"
              step="0.01"
              {...register("basePrice")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.basePrice && (
              <p className="text-xs text-red-600 mt-1">{errors.basePrice.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <input type="file" multiple accept="image/*" {...register("images")}/>
            {errors.images && (
              <p className="text-xs text-red-600 mt-1">{errors.images.message as string}</p>
            )}
            {isEditMode && existingProduct && existingProduct.images.length > 0 && (
              <div className="mt-2 flex space-x-2 overflow-x-auto">
                {existingProduct.images.map((img) => (
                  <img key={img} src={img} alt="prod" className="h-16 w-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}