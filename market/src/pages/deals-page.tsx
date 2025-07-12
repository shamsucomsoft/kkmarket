import React, { useState } from "react";
import { MainLayout } from "../components/layout/main-layout";
import { useLanguage } from "../state/language-context";
import {
  ClockIcon,
  FireIcon,
  TagIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const deals = [
  {
    id: "flash-adire-1",
    title: "Premium Kano Indigo Adire Bundle",
    titleHa: "Fakitin Adire Indigo na Kano mai Daraja",
    description: "3 authentic indigo-dyed fabrics from master craftsmen",
    descriptionHa: "Yadudduka 3 na Adire Indigo daga gwanaye masu fasaha",
    type: "flash",
    discount: 40,
    originalPrice: 55000,
    salePrice: 33000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    seller: "Malam Ibrahim Textiles",
    sellerHa: "Yadudduka na Malam Ibrahim",
    rating: 4.8,
    reviews: 127,
    timeLeft: "2h 45m",
    badge: "Flash Sale",
    badgeHa: "Sayarwa ta Gaggawa",
    featured: true,
  },
  {
    id: "weekly-spices-1",
    title: "Northern Spices Mega Pack",
    titleHa: "Babban Fakitin Kayan Yaji na Arewa",
    description: "Complete spice collection for authentic Northern cuisine",
    descriptionHa: "Cikakken kayan yaji don abincin Arewa na gaske",
    type: "weekly",
    discount: 25,
    originalPrice: 15000,
    salePrice: 11250,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=400&fit=crop",
    seller: "Hajiya Aisha Spices",
    sellerHa: "Kayan Yaji na Hajiya Aisha",
    rating: 4.9,
    reviews: 89,
    badge: "Weekly Deal",
    badgeHa: "Yarjejeniya ta Mako",
    featured: true,
  },
];

export const DealsPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>("all");

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredDeals =
    selectedType === "all"
      ? deals
      : deals.filter((deal) => deal.type === selectedType);

  return (
    <MainLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <FireIcon className="h-8 w-8 mr-3" />
                <h1 className="text-3xl font-bold">
                  {language === "ha"
                    ? "Yarjejeniyoyi Masu Zafi"
                    : "Hot Deals & Offers"}
                </h1>
              </div>
              <p className="text-lg opacity-90">
                {language === "ha"
                  ? "Rage kuɗi har zuwa 45% akan kayayyaki masu kyau daga Kano"
                  : "Save up to 45% on premium products from Kano artisans"}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl">🔥</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "all", label: { en: "All Deals", ha: "Duk Yarjejeniyoyi" } },
            {
              key: "flash",
              label: { en: "Flash Sales", ha: "Sayarwa ta Gaggawa" },
            },
            {
              key: "weekly",
              label: { en: "Weekly Deals", ha: "Yarjejeniyoyi na Mako" },
            },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === filter.key
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter.label[language]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={deal.image}
                  alt={language === "ha" ? deal.titleHa : deal.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -{deal.discount}%
                </div>
                {deal.timeLeft && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {deal.timeLeft}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {language === "ha" ? deal.badgeHa : deal.badge}
                  </span>
                  <div className="flex items-center text-xs text-gray-600">
                    <StarIcon className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                    {deal.rating}
                  </div>
                </div>
                <h3 className="font-semibold text-drab-dark-brown mb-2">
                  {language === "ha" ? deal.titleHa : deal.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {language === "ha" ? deal.descriptionHa : deal.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-drab-dark-brown">
                      {formatPrice(deal.salePrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatPrice(deal.originalPrice)}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm">
                  {language === "ha" ? "Saya Yanzu" : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <TagIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-drab-dark-brown mb-2">
              {language === "ha" ? "Babu Yarjejeniyoyi" : "No Deals Available"}
            </h3>
            <p className="text-gray-600">
              {language === "ha"
                ? "Babu yarjejeniyoyi a wannan lokacin. Duba baya daga baya!"
                : "No deals available at this time. Check back later!"}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
