import React, { useState } from "react";
import { MainLayout } from "../components/layout/main-layout";
import { useLanguage } from "../state/language-context";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const initialCartItems = [
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
    quantity: 2,
    inStock: true,
    style: "94273893",
    color: "Indigo",
    size: "ONE SIZE",
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
    quantity: 3,
    inStock: true,
    style: "94276680",
    color: "Natural",
    size: "500g",
  },
];

export const CartPage: React.FC = () => {
  const { language } = useLanguage();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal >= 25000 ? 0 : 2000;
  const tax = Math.round(subtotal * 0.075); // 7.5% VAT
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-drab-dark-brown mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Discover amazing products from local Kano artisans
            </p>
            <a
              href="/"
              className="bg-primary text-white px-8 py-3 font-medium hover:bg-drab-dark-brown transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-drab-dark-brown">
                Ship or Pick Up
              </span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-drab-dark-brown">
                Delivery
              </span>
            </div>
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-400 text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-400">
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold text-drab-dark-brown mb-6">
              Shipping to:{" "}
              {language === "ha" ? "Kano, Najeriya" : "Kano, Nigeria"}
              <button className="ml-4 text-sm text-primary underline">
                Change
              </button>
            </h1>

            {/* Shipping Info */}
            <div className="bg-gray-50 border border-gray-200 p-4 mb-6">
              <div className="text-sm text-black">
                <strong>Malam Ibrahim</strong>
                <br />
                Shop 45, Kantin Kwari Market
                <br />
                Kano, Nigeria
                <br />
                +234 803 123 4567
              </div>
              <div className="mt-3 text-sm">
                <strong>Tue, May 13 - ₦6.95</strong>
                <br />
                <span className="text-gray-600">Standard Shipping</span>
                <br />
                <span className="text-gray-600">
                  Delivery based on orders placed in the next 11 hours and 20
                  minutes
                </span>
              </div>
              <button className="mt-3 text-sm text-primary underline">
                More Shipping Options
              </button>
            </div>

            {/* Items Table */}
            <div className="border border-gray-200">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-black">
                  <div className="col-span-1">
                    <button className="text-primary underline">Edit Bag</button>
                  </div>
                  <div className="col-span-5">Item</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total Price</div>
                </div>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-6 border-b border-gray-200 last:border-b-0"
                >
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-1">
                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={language === "ha" ? item.nameHa : item.name}
                        className="w-20 h-20 object-cover border border-gray-200"
                      />
                    </div>
                    <div className="col-span-5">
                      <h3 className="font-medium text-drab-dark-brown mb-1">
                        {language === "ha" ? item.nameHa : item.name}
                      </h3>
                      <p className="text-sm text-green-600 mb-2">
                        Delivered by May 13, 2025
                      </p>
                      <div className="text-sm text-drab-dark-brown space-y-1">
                        <div>
                          <strong>Style #</strong> {item.style}
                        </div>
                        <div>
                          <strong>Color</strong> {item.color}
                        </div>
                        <div>
                          <strong>Size</strong> {item.size}
                        </div>
                      </div>
                      <p className="text-sm text-red-600 mt-2">
                        This item cannot be returned or exchanged.
                      </p>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="text-sm">
                        <div className="text-red-600 font-medium">
                          {formatPrice(item.price)}
                        </div>
                        <div className="text-gray-500 line-through">
                          {formatPrice(item.originalPrice)}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-secondary flex items-center justify-center hover:bg-white-smoke"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-secondary flex items-center justify-center hover:bg-white-smoke"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-xs text-gray-500 hover:text-drab-dark-brown"
                      >
                        <TrashIcon className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                    <div className="col-span-2 text-center">
                      <div className="text-sm font-medium text-drab-dark-brown">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div className="text-xs text-gray-500 line-through">
                        {formatPrice(item.originalPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-secondary p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-drab-dark-brown">
                  Order Summary
                </h2>
                <span className="text-sm text-primary underline">
                  800.282.2200
                </span>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-drab-dark-brown">Subtotal</span>
                  <span className="text-drab-dark-brown">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-drab-dark-brown">Shipping</span>
                  <span className="text-drab-dark-brown">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-drab-dark-brown">Tax</span>
                  <span className="text-drab-dark-brown">
                    {formatPrice(tax)}
                  </span>
                </div>
                <div className="border-t border-secondary pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-drab-dark-brown">
                      Total
                    </span>
                    <span className="font-semibold text-drab-dark-brown">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 font-medium hover:bg-drab-dark-brown transition-colors mb-4">
                Proceed to Payment
              </button>

              {/* Promo Code */}
              <div className="border-t border-secondary pt-4">
                <button className="flex items-center justify-between w-full text-sm text-drab-dark-brown">
                  <span>Promo Code</span>
                  <span>+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
