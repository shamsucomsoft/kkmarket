import React, { useState } from "react";
import { useLanguage } from "../../state/language-context";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface FilterSection {
  id: string;
  title: string;
  titleHa: string;
  options: FilterOption[];
}

interface FilterOption {
  id: string;
  label: string;
  labelHa: string;
  count?: number;
}

const filterSections: FilterSection[] = [
  {
    id: "category",
    title: "Category",
    titleHa: "Rarrabuwa",
    options: [
      {
        id: "fashion",
        label: "Fashion & Textiles",
        labelHa: "Fashion da Yadudduka",
        count: 145,
      },
      {
        id: "food",
        label: "Food & Spices",
        labelHa: "Abinci da Kayan Yaji",
        count: 89,
      },
      {
        id: "crafts",
        label: "Arts & Crafts",
        labelHa: "Fasaha da Sana'a",
        count: 67,
      },
      {
        id: "electronics",
        label: "Electronics",
        labelHa: "Lantarki",
        count: 234,
      },
      {
        id: "beauty",
        label: "Beauty & Health",
        labelHa: "Kyau da Lafiya",
        count: 156,
      },
      {
        id: "home",
        label: "Home & Garden",
        labelHa: "Gida da Lambu",
        count: 98,
      },
    ],
  },
  {
    id: "seller",
    title: "Seller",
    titleHa: "Mai Sayarwa",
    options: [
      {
        id: "kano-textiles",
        label: "Kano Textiles Co.",
        labelHa: "Kamfanin Yadudduka na Kano",
        count: 45,
      },
      {
        id: "spice-masters",
        label: "Spice Masters",
        labelHa: "Masu Kayan Yaji",
        count: 32,
      },
      {
        id: "leather-crafts",
        label: "Leather Crafts",
        labelHa: "Sana'ar Fata",
        count: 28,
      },
      {
        id: "kano-pottery",
        label: "Kano Pottery",
        labelHa: "Tukwane na Kano",
        count: 19,
      },
      {
        id: "pure-honey",
        label: "Pure Honey Co.",
        labelHa: "Kamfanin Zuma Mai Tsarki",
        count: 15,
      },
    ],
  },
];

export const ProductFilters: React.FC = () => {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    category: true,
    seller: true,
    price: true,
  });
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

      {/* Price Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <span className="font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
                placeholder="Min ₦"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
                placeholder="Max ₦"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Filter Sections */}
      {filterSections.map((section) => (
        <div
          key={section.id}
          className="mb-6 border-b border-gray-200 pb-4 last:border-b-0"
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full py-2 text-left"
          >
            <span className="font-medium text-gray-900">
              {language === "ha" ? section.titleHa : section.title}
            </span>
            {expandedSections[section.id] ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {expandedSections[section.id] && (
            <div className="mt-3 space-y-2">
              {section.options.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {language === "ha" ? option.labelHa : option.label}
                    <span className="text-gray-500 ml-1">({option.count})</span>
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button className="w-full text-primary hover:text-orange-600 font-medium text-sm border border-primary hover:border-orange-600 py-2 px-4 rounded-lg transition-colors">
        Clear All Filters
      </button>
    </div>
  );
};
