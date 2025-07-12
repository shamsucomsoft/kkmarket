import React from "react";
import { useLanguage } from "../../state/language-context";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

interface ProductFeaturesProps {
  features?: string[];
  featuresHa?: string[];
  className?: string;
}

const defaultFeatures = [
  "Handcrafted by skilled Kano artisans",
  "Premium quality materials",
  "Traditional techniques preserved",
  "Authentic cultural designs",
  "Sustainable production methods",
  "Quality tested and verified",
];

const defaultFeaturesHa = [
  "Ana yin su da hannun gwanaye na Kano",
  "Kayan aiki masu inganci",
  "Ana adana dabarun gargajiya",
  "Zane-zane na al'ada na gaske",
  "Hanyoyin samarwa masu dorewa",
  "An gwada su kuma an tabbatar",
];

const additionalFeatures = [
  {
    icon: ShieldCheckIcon,
    title: "Authenticity Guarantee",
    titleHa: "Tabbacin Asali",
    description: "Certified authentic traditional craft",
    descriptionHa: "Sana'ar gargajiya da aka tabbatar",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    titleHa: "Sauri na Isakuwa",
    description: "Quick delivery across Kano and beyond",
    descriptionHa: "Sauri na isakuwa a ko'ina a Kano da kuma nesa",
  },
  {
    icon: StarIcon,
    title: "Master Craftsmanship",
    titleHa: "Gwanin Sana'a",
    description: "Made by experienced artisans",
    descriptionHa: "Gwanaye masu gogewa sun yi",
  },
  {
    icon: CheckCircleIcon,
    title: "Quality Assurance",
    titleHa: "Tabbacin Inganci",
    description: "Rigorous quality control process",
    descriptionHa: "Tsarin sarrafa inganci mai tsanani",
  },
];

export const ProductFeatures: React.FC<ProductFeaturesProps> = ({
  features = defaultFeatures,
  featuresHa = defaultFeaturesHa,
  className = "",
}) => {
  const { language } = useLanguage();

  return (
    <div className={`bg-white-smoke p-6 rounded-lg ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-drab-dark-brown mb-4">
          {language === "ha" ? "Fasalolin Kaya" : "Product Features"}
        </h3>

        {/* Main features list */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-drab-dark-brown">
                {language === "ha" && featuresHa[index]
                  ? featuresHa[index]
                  : feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional feature highlights */}
      <div className="border-t border-secondary pt-6">
        <h4 className="text-md font-medium text-drab-dark-brown mb-4">
          {language === "ha" ? "Abubuwan da ke damun mu" : "What We Stand For"}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-drab-dark-brown">
                  {language === "ha" ? feature.titleHa : feature.title}
                </h5>
                <p className="text-xs text-gray-600 mt-1">
                  {language === "ha"
                    ? feature.descriptionHa
                    : feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural heritage note */}
      <div className="mt-6 p-4 bg-secondary bg-opacity-10 rounded-lg border border-secondary">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🏺</div>
          <div>
            <h5 className="text-sm font-medium text-drab-dark-brown">
              {language === "ha" ? "Gadon Al'ada" : "Cultural Heritage"}
            </h5>
            <p className="text-xs text-gray-600 mt-1">
              {language === "ha"
                ? "Wannan kaya yana wakiltar al'adun gargajiya na Kano da kuma fasaha da aka riko na tsararraki masu yawa."
                : "This product represents the traditional culture of Kano and the artistry preserved for generations."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
