import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../state/language-context";
import { useCartStore } from "../../store/cart.store";
import { useWishlistStore } from "../../store/wishlist.store";
import { LanguageSwitcher } from "../ui/language-switcher";
import { AdvancedSearch } from "../ui/advanced-search";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { getCartItemCount } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  const menuItems = [
    {
      name: "New",
      nameHa: "Sabo",
      href: "/",
    },
    {
      name: "Electronics",
      nameHa: "Na'urorin Lantarki",
      href: "/categories/electronics",
      submenu: [
        {
          name: "Phones & Tablets",
          nameHa: "Wayoyi da Tablets",
          href: "/categories/electronics/phones",
        },
        {
          name: "Computers",
          nameHa: "Kwamfutoci",
          href: "/categories/electronics/computers",
        },
        {
          name: "Audio & Video",
          nameHa: "Sauti da Bidiyo",
          href: "/categories/electronics/audio",
        },
        {
          name: "Gaming",
          nameHa: "Wasanni",
          href: "/categories/electronics/gaming",
        },
        {
          name: "Accessories",
          nameHa: "Kayan Haɗi",
          href: "/categories/electronics/accessories",
        },
      ],
    },
    {
      name: "Furniture",
      nameHa: "Kayan Gida",
      href: "/categories/furniture",
      submenu: [
        {
          name: "Living Room",
          nameHa: "Ɗakin Zama",
          href: "/categories/furniture/living-room",
        },
        {
          name: "Bedroom",
          nameHa: "Ɗakin Kwana",
          href: "/categories/furniture/bedroom",
        },
        {
          name: "Kitchen & Dining",
          nameHa: "Dafawa da Cin Abinci",
          href: "/categories/furniture/kitchen",
        },
        {
          name: "Office",
          nameHa: "Ofis",
          href: "/categories/furniture/office",
        },
        {
          name: "Storage",
          nameHa: "Ajiya",
          href: "/categories/furniture/storage",
        },
      ],
    },
    {
      name: "Clothing",
      nameHa: "Tufafi",
      href: "/categories/clothing",
      submenu: [
        { name: "Men", nameHa: "Maza", href: "/categories/clothing/men" },
        { name: "Women", nameHa: "Mata", href: "/categories/clothing/women" },
        {
          name: "Traditional Wear",
          nameHa: "Tufafin Gargajiya",
          href: "/categories/clothing/traditional",
        },
        {
          name: "Accessories",
          nameHa: "Kayan Ado",
          href: "/categories/clothing/accessories",
        },
        {
          name: "Shoes",
          nameHa: "Takalma",
          href: "/categories/clothing/shoes",
        },
      ],
    },
    {
      name: "Traditional Crafts",
      nameHa: "Sana'o'in Gargajiya",
      href: "/categories/crafts",
      submenu: [
        {
          name: "Pottery",
          nameHa: "Tukwane",
          href: "/categories/crafts/pottery",
        },
        {
          name: "Textiles",
          nameHa: "Yadudduka",
          href: "/categories/crafts/textiles",
        },
        {
          name: "Leather Goods",
          nameHa: "Kayan Fata",
          href: "/categories/crafts/leather",
        },
        {
          name: "Jewelry",
          nameHa: "Kayan Ado",
          href: "/categories/crafts/jewelry",
        },
      ],
    },
  ];

  const handleMouseEnter = (itemName: string) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top promotional banner */}
      <div className="bg-secondary text-drab-dark-brown text-center py-2 text-sm font-medium">
        <span className="hidden md:inline">
          Free Shipping On Orders ₦50,000+{" "}
        </span>
        <Link to="/shipping-details" className="underline font-semibold">
          Details
        </Link>
        <span className="ml-4 hidden md:inline">
          LOCK IN: KANO MARKET IS COMING TO KANTIN KWARI
        </span>
        <Link to="/notify-signup" className="underline font-semibold ml-2">
          SIGN-UP TO BE NOTIFIED
        </Link>
      </div>

      {/* Secondary header */}
      <div className="border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center space-x-4 text-sm">
            <Link
              to="/sms-signup"
              className="text-drab-dark-brown hover:underline"
            >
              Sign Up For SMS
            </Link>
            <Link to="/stores" className="text-drab-dark-brown hover:underline">
              Stores
            </Link>
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              <Link
                to="/admin/dashboard"
                className="text-drab-dark-brown hover:underline"
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main navigation row */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-primary tracking-tight"
              >
                KANTIN KWARI
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <div className="flex items-center justify-center space-x-12">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.submenu && handleMouseEnter(item.name)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center ${
                        location.pathname.startsWith(item.href)
                          ? "text-primary underline font-semibold"
                          : "text-drab-dark-brown"
                      } hover:underline font-medium py-2 whitespace-nowrap`}
                    >
                      {item.name}
                      {item.submenu && (
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.submenu && activeDropdown === item.name && (
                      <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 shadow-lg z-50">
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-drab-dark-brown hover:bg-white-smoke"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <LanguageSwitcher />
              <Link
                to="/wishlist"
                className="text-drab-dark-brown hover:text-gray-600 relative"
              >
                <HeartIcon className="h-6 w-6" />
                {getWishlistCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getWishlistCount()}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="text-drab-dark-brown hover:text-gray-600 relative"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-drab-dark-brown hover:text-gray-600 p-2"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search bar row */}
          <div className="hidden md:block pb-4">
            <div className="flex justify-center">
              <AdvancedSearch
                className="w-full max-w-2xl"
                showFilters={true}
                placeholder={t("nav.search.placeholder")}
              />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <AdvancedSearch placeholder={t("nav.search.placeholder")} />
              </div>

              {menuItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-drab-dark-brown hover:bg-white-smoke block px-3 py-2 text-base font-medium"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="text-gray-600 hover:bg-white-smoke block px-3 py-2 text-sm"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/deals"
                className="text-red-600 hover:bg-white-smoke block px-3 py-2 text-base font-medium"
              >
                Sale
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold">KANTIN KWARI</span>
              </div>
              <p className="text-sm text-gray-300 max-w-md">
                The authentic marketplace for traditional Nigerian crafts and
                products from Kano artisans.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Customer Service
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/stores"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Returns + Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transparency"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    CA Transparency
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessibility"
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center">
            <p className="text-sm text-gray-300">
              © 2024 Kantin Kwari. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Questions?</span>
              <Link to="/contact" className="text-sm text-white underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
