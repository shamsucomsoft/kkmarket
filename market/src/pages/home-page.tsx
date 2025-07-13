import React, { useState, useEffect } from "react";
import { MainLayout } from "../components/layout/main-layout";
import { CategoryGrid } from "../components/product/category-grid";
import { ProductGrid } from "../components/product/product-grid";
import { useLanguage } from "../state/language-context";
import { productService } from "../services/product.service";
import { Product } from "../types";

interface HomePageState {
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const [state, setState] = useState<HomePageState>({
    featuredProducts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const products = await productService.getFeaturedProducts(8);
        setState(prev => ({ 
          ...prev, 
          featuredProducts: products, 
          isLoading: false 
        }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error instanceof Error ? error.message : 'Failed to load featured products',
          isLoading: false 
        }));
      }
    };

    fetchFeaturedProducts();
  }, []);

  const { featuredProducts, isLoading, error } = state;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {language === "ha" ? "Barka da zuwa kasuwar Arewa" : "Welcome to Northern Nigeria Market"}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {language === "ha" 
                  ? "Sayi kayayyakin gargajiya na inganci daga kasuwanci na yankin Arewa"
                  : "Discover authentic handmade crafts from Northern Nigeria's finest artisans"
                }
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  {language === "ha" ? "Fara Saye-saye" : "Start Shopping"}
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                  {language === "ha" ? "Koyo Fiye" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === "ha" ? "Nau'in Kayayyaki" : "Shop by Category"}
            </h2>
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === "ha" ? "Kayayyaki Masu Shahara" : "Featured Products"}
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {language === "ha" ? "Sake Gwada" : "Try Again"}
                </button>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {language === "ha" ? "Babu kayayyaki masu shahara a yanzu" : "No featured products available"}
                </p>
              </div>
            ) : (
              <ProductGrid products={featuredProducts} />
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {language === "ha" ? "Me yasa za ku zabe mu?" : "Why Choose Us?"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "ha" ? "Kayayyaki na Gaske" : "Authentic Products"}
                </h3>
                <p className="text-gray-600">
                  {language === "ha" 
                    ? "Duk kayayyakinmu na gargajiya ne kuma an yi su da hannu"
                    : "All our products are traditional and handmade by skilled artisans"
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "ha" ? "Farashin da ya Dace" : "Fair Pricing"}
                </h3>
                <p className="text-gray-600">
                  {language === "ha" 
                    ? "Muna ba da farashi mai adalci ga duka mai saye da mai sayarwa"
                    : "We offer fair prices that benefit both buyers and sellers"
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === "ha" ? "Sauri da Aminci" : "Fast & Secure"}
                </h3>
                <p className="text-gray-600">
                  {language === "ha" 
                    ? "Muna tabbatar da isar da kayan cikin sauri da aminci"
                    : "We ensure fast and secure delivery of your orders"
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {language === "ha" ? "Sami Labari" : "Stay Updated"}
            </h2>
            <p className="text-xl mb-8">
              {language === "ha" 
                ? "Shiga cikin jerin masu karbar labari don samun sabon labari"
                : "Subscribe to our newsletter for the latest products and offers"
              }
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder={language === "ha" ? "Shigar da email" : "Enter your email"}
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition">
                {language === "ha" ? "Shiga" : "Subscribe"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};
