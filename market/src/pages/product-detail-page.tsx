import React, { useState } from "react";
import { MainLayout } from "../components/layout/main-layout";
import { ProductFeatures } from "../components/product/product-features";
import { CustomerReviews } from "../components/product/customer-reviews";
import { useLanguage } from "../state/language-context";
import {
  StarIcon,
  HeartIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

// Sample product data
const productData = {
  id: "1",
  name: "Paisley Bandana Pattern Ribbed Crew Sock",
  nameHa: "Safa mai Tsarin Paisley",
  price: 4950,
  originalPrice: 12000,
  images: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
  ],
  seller: "Malam Ibrahim Textiles",
  sellerHa: "Yadudduka na Malam Ibrahim",
  rating: 4.8,
  reviewCount: 156,
  description:
    "Authentic handwoven traditional fabric with intricate paisley patterns. Made by skilled artisans in Kano using time-honored techniques passed down through generations.",
  descriptionHa:
    "Yadudduka na gargajiya da aka saƙa da hannu tare da kyawawan tsarin paisley. An yi shi ta hannun gwanaye a Kano ta amfani da dabarun da aka riƙa hawa daga tsara zuwa tsara.",
  style: "94273893",
  color: "Tan",
  size: "ONE SIZE",
  inStock: true,
  lastOneInStock: true,
  features: [
    "Handwoven by master craftsmen",
    "Traditional Kano patterns",
    "Premium cotton blend",
    "Machine washable",
    "One size fits most",
  ],
  featuresHa: [
    "Ana yin shi da hannun gwanaye",
    "Tsarin Kano na gargajiya",
    "Auduga mai kyau",
    "Ana iya wanke da injin",
    "Girman daya ya dace da yawanci",
  ],
};

export const ProductDetailPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const StarRating: React.FC<{ rating: number; size?: "sm" | "md" }> = ({
    rating,
    size = "sm",
  }) => {
    const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= Math.floor(rating) ? (
            <StarIconSolid
              key={star}
              className={`${iconSize} text-yellow-400`}
            />
          ) : (
            <StarIcon key={star} className={`${iconSize} text-gray-300`} />
          )
        )}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-primary hover:underline">
              Back to Results
            </a>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={productData.images[selectedImage]}
                alt={language === "ha" ? productData.nameHa : productData.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl font-semibold text-drab-dark-brown mb-2">
                {language === "ha" ? productData.nameHa : productData.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <StarRating rating={productData.rating} />
                <span className="text-sm text-gray-600">Write a Review</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold text-red-600">
                  {formatPrice(productData.price)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Color: </span>
                <span>{productData.color}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-100 border border-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-red-500 border border-gray-300 rounded-full"></div>
                <div className="w-6 h-6 bg-blue-500 border border-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Size:</span>
              </div>
              <div className="border border-secondary px-4 py-3 text-center bg-white-smoke">
                <span className="font-medium">{productData.size}</span>
              </div>
              {productData.lastOneInStock && (
                <p className="text-sm text-primary">Last one in stock!</p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full bg-primary text-white py-4 font-medium hover:bg-drab-dark-brown transition-colors">
                Add to Bag
              </button>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <span>Or 4 interest-free installments of ₦1,238 with</span>
                <span className="font-bold">Klarna</span>
                <InformationCircleIcon className="w-4 h-4" />
              </div>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-full border border-secondary py-3 font-medium hover:border-primary transition-colors flex items-center justify-center"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-white-smoke p-4 space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🚚</span>
                </div>
                <span className="font-medium">Free Shipping Over ₦50,000</span>
              </div>
              <p className="text-gray-600 ml-6">
                5-8 business days. Faster Shipping Options
              </p>
              <p className="text-gray-600 ml-6">
                Shipping restrictions may apply to your location
              </p>
            </div>

            {/* Store Availability */}
            <div className="border-t border-secondary pt-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">📍</span>
                </div>
                <span>Selected quantity not available at this store</span>
                <InformationCircleIcon className="w-4 h-4" />
              </div>
              <p className="text-gray-600 text-sm mt-1 ml-6">KANO</p>
              <button className="text-primary text-sm underline ml-6 mt-1">
                Check Other Stores
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-secondary pt-6 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Product Details</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === "ha"
                    ? productData.descriptionHa
                    : productData.description}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <strong>Style #</strong> {productData.style}
                </div>
                <div>
                  <strong>Color</strong> {productData.color}
                </div>
                <div>
                  <strong>Size</strong> {productData.size}
                </div>
              </div>

              <p className="text-sm text-red-600">
                This item cannot be returned or exchanged.
              </p>
            </div>
          </div>
        </div>

        {/* Product Features Section */}
        <section className="mt-16">
          <ProductFeatures
            features={productData.features}
            featuresHa={productData.featuresHa}
          />
        </section>

        {/* Customer Reviews Section */}
        <section className="mt-16">
          <CustomerReviews
            productRating={productData.rating}
            totalReviews={productData.reviewCount}
          />
        </section>

        {/* You May Also Like */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-drab-dark-brown mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 mb-3 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1558618666 + item
                    }-fcd25c85cd64?w=300&h=300&fit=crop`}
                    alt={`Related Product ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-drab-dark-brown group-hover:underline">
                  Related Traditional Item {item}
                </h3>
                <p className="text-sm text-gray-600">Kano Artisans</p>
                <div className="flex items-center space-x-1 my-1">
                  <StarRating rating={4} />
                  <span className="text-xs text-gray-600">(45)</span>
                </div>
                <p className="text-sm font-semibold text-drab-dark-brown">
                  ₦3,500
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
