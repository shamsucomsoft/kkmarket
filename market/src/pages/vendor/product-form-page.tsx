import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { productService } from "../../services/product.service";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import type { Product } from "../../types";
import { FormField } from "../../components/ui/FormField";
import { FormError } from "../../components/ui/FormError";

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

  const [formError, setFormError] = useState<string | null>(null);
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
      const msg = error instanceof Error ? error.message : "Operation failed";
      setFormError(msg);
    }
  };

  return (
    <ProtectedRoute roles={["vendor"]}>
      <div className="max-w-xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Product" : "Add Product"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {formError && <FormError message={formError} />}
          <div>
            <FormField label="Name" htmlFor="name" error={errors.name?.message as string}>
              <input type="text" id="name" {...register("name")} className="input-text" placeholder="Product name" />
            </FormField>
          </div>

          <div>
            <FormField label="Description" htmlFor="description" error={errors.description?.message as string}>
              <textarea id="description" rows={4} {...register("description")} className="input-text" />
            </FormField>
          </div>

          <div>
            <FormField label="Category" htmlFor="category" error={errors.category?.message as string}>
              <input id="category" type="text" {...register("category")} className="input-text" placeholder="e.g. Clothing" />
            </FormField>
          </div>

          <div>
            <FormField label="Base Price (₦)" htmlFor="basePrice" error={errors.basePrice?.message as string}>
              <input id="basePrice" type="number" step="0.01" {...register("basePrice")}
                className="input-text" placeholder="0.00" />
            </FormField>
          </div>

          <div>
            <FormField label="Images" htmlFor="images" error={errors.images?.message as string}>
              <input id="images" type="file" multiple accept="image/*" {...register("images")} className="input-text" />
            </FormField>
            {isEditMode && existingProduct && existingProduct.images.length > 0 && (
              <div className="mt-2 flex space-x-2 overflow-x-auto">
                {existingProduct.images.map((img) => (
                  <img key={img} src={img} alt="prod" className="h-16 w-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}