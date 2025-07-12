import React, { useState } from "react";
import { MainLayout } from "../components/layout/main-layout";
import { useLanguage } from "../state/language-context";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

const categories = [
  {
    id: "adire-textiles",
    name: "Adire & Traditional Fabrics",
    nameHa: "Adire da Yaduddukan Gargajiya",
    description:
      "Authentic indigo-dyed fabrics and traditional Northern Nigerian textiles",
    descriptionHa: "Yaduddukan Adire da na gargajiya na Arewacin Najeriya",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    productCount: 245,
    featured: true,
  },
  {
    id: "spices-seasonings",
    name: "Northern Spices & Seasonings",
    nameHa: "Kayan Yaji da Dandano na Arewa",
    description: "Premium spices and seasonings from Northern Nigeria",
    descriptionHa: "Kayan yaji da dandano masu kyau daga Arewacin Najeriya",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=400&fit=crop",
    productCount: 187,
    featured: true,
  },
  {
    id: "leather-works",
    name: "Kano Leather Works",
    nameHa: "Aikin Fata na Kano",
    description: "Handcrafted leather goods from skilled Kano artisans",
    descriptionHa: "Kayan fata da hannun gwaninta na Kano suka yi",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop",
    productCount: 156,
    featured: true,
  },
];

export const CategoriesPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.nameHa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeatured || category.featured;
    return matchesSearch && matchesFeatured;
  });

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-drab-dark-brown mb-2">
            {language === "ha" ? "Rarrabuwar Kayayyaki" : "Product Categories"}
          </h1>
          <p className="text-gray-600">
            {language === "ha"
              ? "Nemo daga cikin nau'in kayayyaki masu yawa"
              : "Browse our wide range of product categories"}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ha"
                    ? "Nemo nau'in kaya..."
                    : "Search categories..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFeatured(!showFeatured)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                showFeatured
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              {language === "ha" ? "Fitattun" : "Featured"}
            </button>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={language === "ha" ? category.nameHa : category.name}
                  className="w-full h-48 object-cover"
                />
                {category.featured && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                    {language === "ha" ? "Fitacce" : "Featured"}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {category.productCount}{" "}
                  {language === "ha" ? "kayayyaki" : "items"}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-drab-dark-brown mb-2">
                  {language === "ha" ? category.nameHa : category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === "ha"
                    ? category.descriptionHa
                    : category.description}
                </p>
                <a
                  href={`/category/${category.id}`}
                  className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  {language === "ha" ? "Duba Kayayyaki" : "Browse Products"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
