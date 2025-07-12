import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { MainLayout } from "../components/layout/main-layout";
import { ProductGrid } from "../components/product/product-grid";
import { useLanguage } from "../state/language-context";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const products = [
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
  {
    id: "7",
    name: "Traditional Wooden Stool",
    nameHa: "Kujera ta Itace ta Gargajiya",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    seller: "Wood Crafts Kano",
    sellerHa: "Sana'ar Itace na Kano",
    rating: 4,
    reviewCount: 67,
  },
  {
    id: "8",
    name: "Hausa Embroidery Scarf",
    nameHa: "Gyale na Dinkin Hausa",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    seller: "Embroidery Art",
    sellerHa: "Fasahar Dinki",
    rating: 4,
    reviewCount: 112,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Furniture",
  "Clothing",
  "Traditional Crafts",
];

const priceRanges = [
  "All Prices",
  "Under ₦5,000",
  "₦5,000 - ₦10,000",
  "₦10,000 - ₦20,000",
  "₦20,000 - ₦50,000",
  "Over ₦50,000",
];

const sortOptions = [
  "Best Match",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
  "Customer Rating",
];

// Category display names
const categoryNames: Record<string, { en: string; ha: string }> = {
  electronics: { en: "Electronics", ha: "Na'urorin Lantarki" },
  furniture: { en: "Furniture", ha: "Kayan Gida" },
  clothing: { en: "Clothing", ha: "Tufafi" },
  crafts: { en: "Traditional Crafts", ha: "Sana'o'in Gargajiya" },
  phones: { en: "Phones & Tablets", ha: "Wayoyi da Tablets" },
  computers: { en: "Computers", ha: "Kwamfutoci" },
  audio: { en: "Audio & Video", ha: "Sauti da Bidiyo" },
  gaming: { en: "Gaming", ha: "Wasanni" },
  accessories: { en: "Accessories", ha: "Kayan Haɗi" },
  "living-room": { en: "Living Room", ha: "Ɗakin Zama" },
  bedroom: { en: "Bedroom", ha: "Ɗakin Kwana" },
  kitchen: { en: "Kitchen & Dining", ha: "Dafawa da Cin Abinci" },
  office: { en: "Office", ha: "Ofis" },
  storage: { en: "Storage", ha: "Ajiya" },
  men: { en: "Men's Clothing", ha: "Tufafin Maza" },
  women: { en: "Women's Clothing", ha: "Tufafin Mata" },
  traditional: { en: "Traditional Wear", ha: "Tufafin Gargajiya" },
  shoes: { en: "Shoes", ha: "Takalma" },
  pottery: { en: "Pottery", ha: "Tukwane" },
  textiles: { en: "Textiles", ha: "Yadudduka" },
  leather: { en: "Leather Goods", ha: "Kayan Fata" },
  jewelry: { en: "Jewelry", ha: "Kayan Ado" },
};

export const ProductListPage: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("q") || "";
  const { category, subcategory } = useParams<{
    category?: string;
    subcategory?: string;
  }>();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [sortBy, setSortBy] = useState("Best Match");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery] = useState(initialSearch.toLowerCase());

  // Get display name for current category/subcategory
  const getCurrentDisplayName = () => {
    if (subcategory && categoryNames[subcategory]) {
      return language === "ha"
        ? categoryNames[subcategory].ha
        : categoryNames[subcategory].en;
    }
    if (category && categoryNames[category]) {
      return language === "ha"
        ? categoryNames[category].ha
        : categoryNames[category].en;
    }
    return language === "ha" ? "Dukkan Kayayyaki" : "All Products";
  };

  // Generate breadcrumb
  const getBreadcrumb = () => {
    const breadcrumb = [
      { name: language === "ha" ? "Gida" : "Home", href: "/" },
    ];

    if (category) {
      const categoryName = categoryNames[category];
      if (categoryName) {
        breadcrumb.push({
          name: language === "ha" ? categoryName.ha : categoryName.en,
          href: `/categories/${category}`,
        });
      }
    }

    if (subcategory) {
      const subcategoryName = categoryNames[subcategory];
      if (subcategoryName) {
        breadcrumb.push({
          name: language === "ha" ? subcategoryName.ha : subcategoryName.en,
          href: `/categories/${category}/${subcategory}`,
        });
      }
    }

    return breadcrumb;
  };

  useEffect(() => {
    // Update selected category when URL changes
    if (category && categoryNames[category]) {
      const categoryName = categoryNames[category];
      setSelectedCategory(
        language === "ha" ? categoryName.ha : categoryName.en
      );
    } else {
      setSelectedCategory("All Categories");
    }
  }, [category, subcategory, language]);

  const breadcrumb = getBreadcrumb();
  const displayName = initialSearch
    ? `Search: "${initialSearch}"`
    : getCurrentDisplayName();

  const displayedProducts = products.filter((p) => {
    const name = language === "ha" ? p.nameHa : p.name;
    return name.toLowerCase().includes(searchQuery);
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <span className="text-gray-400">/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-drab-dark-brown">{item.name}</span>
                ) : (
                  <Link to={item.href} className="text-primary hover:underline">
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-drab-dark-brown">
              {displayName}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {products.length} {language === "ha" ? "kayayyaki" : "items"}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium hover:border-black transition-colors"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:border-black"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 space-y-6`}
          >
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-4 uppercase tracking-wider">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((categoryItem) => (
                  <button
                    key={categoryItem}
                    onClick={() => setSelectedCategory(categoryItem)}
                    className={`block w-full text-left text-sm py-1 ${
                      selectedCategory === categoryItem
                        ? "text-drab-dark-brown font-medium"
                        : "text-gray-600 hover:text-drab-dark-brown"
                    }`}
                  >
                    {categoryItem}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-4 uppercase tracking-wider">
                Price
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`block w-full text-left text-sm py-1 ${
                      selectedPriceRange === range
                        ? "text-drab-dark-brown font-medium"
                        : "text-gray-600 hover:text-drab-dark-brown"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-4 uppercase tracking-wider">
                Size
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className="border border-secondary py-2 text-sm font-medium hover:border-primary transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-semibold text-drab-dark-brown mb-4 uppercase tracking-wider">
                Color
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {[
                  "bg-black",
                  "bg-white border",
                  "bg-gray-500",
                  "bg-red-500",
                  "bg-blue-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-indigo-500",
                  "bg-orange-500",
                  "bg-teal-500",
                ].map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${color} hover:scale-110 transition-transform`}
                  />
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedPriceRange("All Prices");
              }}
              className="text-sm text-primary underline hover:text-drab-dark-brown"
            >
              Clear All Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid products={displayedProducts} showAddToCart={true} />
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-black">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile filter content would go here - same as sidebar */}
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-wider">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map((categoryItem) => (
                      <button
                        key={categoryItem}
                        onClick={() => setSelectedCategory(categoryItem)}
                        className={`block w-full text-left text-sm py-1 ${
                          selectedCategory === categoryItem
                            ? "text-black font-medium"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {categoryItem}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-wider">
                    Price
                  </h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        onClick={() => setSelectedPriceRange(range)}
                        className={`block w-full text-left text-sm py-1 ${
                          selectedPriceRange === range
                            ? "text-black font-medium"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
