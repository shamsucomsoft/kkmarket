import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "../components/layout/main-layout";
import { useLanguage } from "../state/language-context";
import { useWishlistStore } from "../store/wishlist.store";
import { useCartStore } from "../store/cart.store";
import {
  HeartIcon,
  ShoppingBagIcon,
  TrashIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export const WishlistPage: React.FC = () => {
  const { language } = useLanguage();
  const {
    wishlist,
    isLoading,
    error,
    loadWishlist,
    removeFromWishlist,
    getWishlistCount,
  } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleMoveToCart = async (productId: string) => {
    const item = wishlist?.items.find((item) => item.productId === productId);
    if (item) {
      await addToCart(item.product);
      await removeFromWishlist(productId);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              {language === "ha" ? "Kuskure ya faru" : "An error occurred"}
            </div>
            <button
              onClick={loadWishlist}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-drab-dark-brown transition-colors"
            >
              {language === "ha" ? "Sake gwadawa" : "Try Again"}
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const isEmpty = !wishlist || wishlist.items.length === 0;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-drab-dark-brown">
              {language === "ha" ? "Abubuwan da nake so" : "My Wishlist"}
            </h1>
            <p className="text-gray-600 mt-2">
              {getWishlistCount()} {language === "ha" ? "kayayyaki" : "items"}
            </p>
          </div>

          {!isEmpty && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() =>
                  wishlist?.items.forEach((item) =>
                    handleMoveToCart(item.productId)
                  )
                }
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-drab-dark-brown transition-colors"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span>
                  {language === "ha"
                    ? "Ɗauke duk zuwa kanti"
                    : "Move All to Cart"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="text-center py-16">
            <HeartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-drab-dark-brown mb-4">
              {language === "ha"
                ? "Babu abubuwan da kuke so"
                : "Your wishlist is empty"}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {language === "ha"
                ? "Ku fara ajiye kayayyakin da kuke so don samun sauƙin komawa zuwa gare su daga baya."
                : "Start saving items you love to easily find them later and keep track of what you want."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-drab-dark-brown transition-colors"
            >
              <span>
                {language === "ha" ? "Bincika Kayayyaki" : "Explore Products"}
              </span>
            </Link>
          </div>
        )}

        {/* Wishlist Items Grid */}
        {!isEmpty && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist!.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={
                        language === "ha"
                          ? item.product.nameHa
                          : item.product.name
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  </button>

                  {/* Sale Badge */}
                  {item.product.basePrice < item.product.basePrice * 1.2 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                      SALE
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-base font-medium text-drab-dark-brown mb-2 line-clamp-2 hover:underline">
                      {language === "ha"
                        ? item.product.nameHa
                        : item.product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 mb-2">
                    {item.product.vendor?.businessName || "Kantin Kwari"}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.product.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({item.product.totalReviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-semibold text-drab-dark-brown">
                      {formatPrice(item.product.basePrice)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMoveToCart(item.product.id)}
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-drab-dark-brown transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                      <span className="text-sm">
                        {language === "ha" ? "Ɗauke zuwa kanti" : "Add to Cart"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleRemoveFromWishlist(item.product.id)}
                      className="p-2 border border-secondary rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
                      title={language === "ha" ? "Cire" : "Remove"}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Added Date */}
                  <p className="text-xs text-gray-500 mt-2">
                    {language === "ha" ? "An ƙara" : "Added"}{" "}
                    {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Continue Shopping */}
        {!isEmpty && (
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-drab-dark-brown transition-colors"
            >
              <span>
                {language === "ha" ? "Cigaba da saye" : "Continue Shopping"}
              </span>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
