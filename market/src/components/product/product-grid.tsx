import React from "react";
import { useLanguage } from "../../state/language-context";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../../store/cart.store";
import { useToast } from "../ui/toast-provider";
import type { Product } from "../../types";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showAddToCart?: boolean;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  showAddToCart = true,
}) => {
  const { language } = useLanguage();
  const addToCart = useCartStore((s) => s.addToCart);
  const { addToast } = useToast();

  return (
    <section className="py-0">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-drab-dark-brown mb-4">
            {title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-secondary hover:border-primary transition-colors group cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.images[0] ?? ""}
                alt={language === "ha" ? product.nameHa : product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* No SALE badge logic currently */}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-base font-medium text-drab-dark-brown mb-1 line-clamp-2">
                {language === "ha" ? product.nameHa : product.name}
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                {language === "ha"
                  ? product.vendor?.businessNameHa ??
                    product.vendor?.businessName ??
                    ""
                  : product.vendor?.businessName ?? ""}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <StarRating rating={product.rating} />
                <span className="text-sm text-gray-600 ml-2">
                  ({product.totalReviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-4">
                <span className="text-lg font-semibold text-drab-dark-brown">
                  {formatPrice(product.basePrice)}
                </span>
                {/* No original price/discount for now */}
              </div>

              {/* Actions */}
              {showAddToCart && (
                <button
                  onClick={() => {
                    addToCart(product, undefined, 1);
                    addToast(
                      language === "ha"
                        ? "An ƙara kaya a kwandon siyayya"
                        : "Added to cart",
                      "success"
                    );
                  }}
                  className="w-full bg-primary text-white py-2 px-4 font-medium hover:bg-drab-dark-brown transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {language === "ha" ? "Sayi" : "Add to Bag"}
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
