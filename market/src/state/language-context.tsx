import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Language = "en" | "ha";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.deals": "Deals",
    "nav.cart": "Cart",
    "nav.profile": "Profile",
    "nav.search.placeholder": "What are you looking for...",

    // New navigation items
    "nav.new": "New",
    "nav.electronics": "Electronics",
    "nav.furniture": "Furniture",
    "nav.clothing": "Clothing",
    "nav.traditional-crafts": "Traditional Crafts",
    "nav.sale": "Sale",

    // Footer
    "footer.about": "About Us",
    "footer.contact": "Contact",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",

    // Hero Section
    "hero.title": "The Heart of Kano's Commerce, Delivered to You",
    "hero.subtitle":
      "Discover authentic traditional crafts and products from skilled artisans across Kano State",
    "hero.cta": "Shop Now",

    // Categories
    "categories.title": "Shop by Category",
    "categories.subtitle": "Explore our diverse collection",

    // Products
    "products.featured": "Featured Products",
    "products.addToCart": "Add to Cart",
    "products.viewDetails": "View Details",
    "products.price": "Price",
    "products.seller": "Seller",
    "products.rating": "Rating",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.continue": "Continue Shopping",
    "cart.checkout": "Proceed to Checkout",
    "cart.subtotal": "Subtotal",
    "cart.delivery": "Delivery",
    "cart.total": "Total",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",

    // Language switcher
    "language.en": "English",
    "language.ha": "Hausa",
  },
  ha: {
    // Navigation
    "nav.home": "Gida",
    "nav.categories": "Nau'in Kayayyaki",
    "nav.deals": "Rangwame",
    "nav.cart": "Katu",
    "nav.profile": "Bayanin Mai Amfani",
    "nav.search.placeholder": "Me kuke nema...",

    // New navigation items
    "nav.new": "Sabo",
    "nav.electronics": "Na'urorin Lantarki",
    "nav.furniture": "Kayan Gida",
    "nav.clothing": "Tufafi",
    "nav.traditional-crafts": "Sana'o'in Gargajiya",
    "nav.sale": "Rangwame",

    // Footer
    "footer.about": "Game da Mu",
    "footer.contact": "Tuntuɓe Mu",
    "footer.terms": "Sharuɗɗan Sabis",
    "footer.privacy": "Manufar Sirri",

    // Hero Section
    "hero.title": "Zuciyar Kasuwancin Kano, An Kawo Muku",
    "hero.subtitle":
      "Gano kayayyaki na gargajiya da kuma samfuran gwanaye daga jihar Kano",
    "hero.cta": "Fara Siyayya",

    // Categories
    "categories.title": "Zaɓi Bisa Nau'i",
    "categories.subtitle": "Bincika tarin kayayyakinmu",

    // Products
    "products.featured": "Kayayyaki Na Musamman",
    "products.addToCart": "Saka a Karta",
    "products.viewDetails": "Duba Cikakken Bayani",
    "products.price": "Farashi",
    "products.seller": "Mai Sayarwa",
    "products.rating": "Kimanta",

    // Cart
    "cart.title": "Karta",
    "cart.empty": "Karta ta babu komai",
    "cart.continue": "Ci Gaba da Siyayya",
    "cart.checkout": "Ci Gaba da Biyan Kuɗi",
    "cart.subtotal": "Jimlar Farashi",
    "cart.delivery": "Isar da Kayayyaki",
    "cart.total": "Jimla",

    // Common
    "common.loading": "Ana Lodawa...",
    "common.error": "An sami kuskure",
    "common.success": "Nasara",
    "common.cancel": "Soke",
    "common.save": "Ajiye",
    "common.edit": "Gyara",
    "common.delete": "Share",
    "common.view": "Duba",
    "common.back": "Koma Baya",
    "common.next": "Na Gaba",
    "common.previous": "Na Baya",

    // Language switcher
    "language.en": "English",
    "language.ha": "Hausa",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
