import React from "react";
import { useLanguage } from "../../state/language-context";

interface Category {
  id: string;
  name: string;
  nameHa: string;
  image: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Mobile Phones & Tablets",
    nameHa: "Wayoyi da Tablets",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "📱",
  },
  {
    id: "2",
    name: "Kitchen Appliances",
    nameHa: "Kayan Kicin",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e27c?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "🍳",
  },
  {
    id: "3",
    name: "Hausa Traditional Wear",
    nameHa: "Tufafin Gargajiya",
    image:
      "https://images.unsplash.com/photo-1542060744-6796c4614aff?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "👗",
  },
  {
    id: "4",
    name: "Shoes & Sandals",
    nameHa: "Takalma da Sandal",
    image:
      "https://images.unsplash.com/photo-1528701800489-20b323b415d2?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "👟",
  },
  {
    id: "5",
    name: "Televisions & Accessories",
    nameHa: "Talbijin da Kayayyaki",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b82b9c9?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "📺",
  },
  {
    id: "6",
    name: "Fabrics & Textiles",
    nameHa: "Yadudduka",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&auto=format&q=80",
    icon: "🧵",
  },
];

export const CategoryGrid: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="group cursor-pointer">
            {/* Category Image */}
            <div className="relative aspect-square overflow-hidden bg-white-smoke mb-3 border border-secondary group-hover:border-primary transition-colors">
              <img
                src={category.image}
                alt={language === "ha" ? category.nameHa : category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
              <div className="absolute bottom-2 left-2">
                <span className="text-2xl">{category.icon}</span>
              </div>
            </div>

            {/* Category Info */}
            <div className="text-center">
              <h3 className="text-sm font-medium text-drab-dark-brown group-hover:underline">
                {language === "ha" ? category.nameHa : category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
