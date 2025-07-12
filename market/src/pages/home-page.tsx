import React from "react";
import { MainLayout } from "../components/layout/main-layout";
import { CategoryGrid } from "../components/product/category-grid";
import { ProductGrid } from "../components/product/product-grid";
import { useLanguage } from "../state/language-context";

const featuredProducts = [
  {
    id: "1",
    name: "Authentic Kano Indigo Adire",
    nameHa: "Adire Indigo na Kano na Gaske",
    price: 18500,
    originalPrice: 25000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    seller: "Malam Ibrahim Textiles",
    sellerHa: "Yadudduka na Malam Ibrahim",
    rating: 5,
    reviewCount: 23,
  },
  {
    id: "2",
    name: "Northern Suya Spice Mix (500g)",
    nameHa: "Kayan Yajin Suya na Arewa (Gram 500)",
    price: 3200,
    originalPrice: 4000,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    seller: "Hajiya Aisha Spices",
    sellerHa: "Kayan Yaji na Hajiya Aisha",
    rating: 4,
    reviewCount: 67,
  },
  {
    id: "3",
    name: "Handwoven Kano Leather Bag",
    nameHa: "Jakar Fata ta Kano da Hannu",
    price: 12000,
    originalPrice: 15000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    seller: "Alhaji Sani Leather Works",
    sellerHa: "Aikin Fata na Alhaji Sani",
    rating: 5,
    reviewCount: 45,
  },
  {
    id: "4",
    name: "Traditional Hausa Cap (Hula)",
    nameHa: "Hula ta Gargajiya ta Hausa",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    seller: "Malam Usman Caps",
    sellerHa: "Huluna na Malam Usman",
    rating: 4,
    reviewCount: 89,
  },
  {
    id: "5",
    name: "Kano Pottery Water Jug",
    nameHa: "Tulu na Kano na Ruwa",
    price: 5500,
    originalPrice: 7000,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "Hajiya Zainab Pottery",
    sellerHa: "Tukwane na Hajiya Zainab",
    rating: 5,
    reviewCount: 34,
  },
  {
    id: "6",
    name: "Coral Beads Necklace Set",
    nameHa: "Kayan Wuyan Murjani",
    price: 22000,
    originalPrice: 28000,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    seller: "Hajiya Fatima Jewelry",
    sellerHa: "Kayan Ado na Hajiya Fatima",
    rating: 5,
    reviewCount: 156,
  },
];

export const HomePage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Grid - Exact UO Layout */}
      <div className="w-full">
        {/* Top Row - 3 Equal Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[400px]">
          {/* Left Image */}
          <div className="relative bg-amber-100 overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1542060744-6796c4614aff?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
              alt="Hausa Traditional Fabrics"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-lg font-semibold mb-2">
                Traditional Crafts
              </h3>
              <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Center Image with Blue Banner */}
          <div className="relative bg-blue-600 overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1520975969378-4cda3b64745f?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
              alt="Hausa Fashion Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute top-6 left-6 right-6 text-center">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                The Kano Artisan Edit
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <h1
                className="text-white text-4xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                kantin kwari
              </h1>
              <button className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors">
                SHOP THE EDIT
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative bg-yellow-100 overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1606813903436-771beee21c1d?w=600&h=400&fit=crop&crop=center&auto=format&q=80"
              alt="Home Appliances Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-lg font-semibold mb-2">
                Premium Collection
              </h3>
              <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                EXPLORE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row - 2 Equal Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[300px]">
          {/* Left Image */}
          <div className="relative bg-gray-200 overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e27c?w=800&h=300&fit=crop&crop=center&auto=format&q=80"
              alt="Kitchen Appliances"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                Kano Leather Works
              </h3>
              <p className="text-white/90 text-sm mb-3">
                Handcrafted by master artisans
              </p>
              <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                SHOP LEATHER
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative bg-green-100 overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1496430430191-84eae52f1a5c?w=800&h=300&fit=crop&crop=center&auto=format&q=80"
              alt="Hausa Traditional Attire"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                Traditional Pottery
              </h3>
              <p className="text-white/90 text-sm mb-3">
                Authentic Hausa ceramics
              </p>
              <button className="bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                SHOP POTTERY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-drab-dark-brown">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {language === "ha"
                ? "Gano da kayayyakin gargajiya na Kano"
                : "Discover authentic traditional crafts from Kano artisans"}
            </p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-drab-dark-brown">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              {language === "ha"
                ? "Zaɓaɓɓun kayayyaki daga gwanaye na Kano"
                : "Handpicked items from master craftsmen of Kano"}
            </p>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Get updates on new arrivals and exclusive offers
          </h2>
          <div className="flex justify-center mt-6">
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white text-black text-sm border-0 focus:outline-none"
              />
              <button className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-1">
                Secure Payment
              </h3>
              <p className="text-xs text-gray-600">
                Safe and secure payment processing
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-1">
                Fast Delivery
              </h3>
              <p className="text-xs text-gray-600">
                Quick delivery across Kano and beyond
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-1">
                Quality Assured
              </h3>
              <p className="text-xs text-gray-600">
                Authentic crafts from skilled artisans
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
