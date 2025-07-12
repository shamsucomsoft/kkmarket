import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout/dashboard-layout";
import { useLanguage } from "../../state/language-context";
import {
  UserIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const initialProfile = {
  name: "Malam Ibrahim Yusuf",
  email: "ibrahim.textiles@gmail.com",
  phone: "+234 803 123 4567",
  shopName: "Ibrahim Traditional Textiles",
  shopNameHa: "Yaduddukan Gargajiya na Ibrahim",
  shopDescription:
    "Premium traditional fabrics and authentic Adire from Kano artisans",
  address: "Shop 45, Kantin Kwari Market, Kano",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  verified: true,
  businessType: "Traditional Crafts",
};

export const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    {
      id: "profile",
      name: { en: "Profile", ha: "Bayanin Sirri" },
      icon: UserIcon,
    },
    {
      id: "notifications",
      name: { en: "Notifications", ha: "Sanarwa" },
      icon: BellIcon,
    },
    {
      id: "payment",
      name: { en: "Payment", ha: "Biyan Kuɗi" },
      icon: CreditCardIcon,
    },
    {
      id: "security",
      name: { en: "Security", ha: "Tsaro" },
      icon: ShieldCheckIcon,
    },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  const updateProfile = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === "ha" ? "Saitunan Asusun" : "Account Settings"}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              {language === "ha"
                ? "Sarrafa bayanin ku da saitunan shago"
                : "Manage your account information and shop preferences"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing && (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  {language === "ha" ? "Soke" : "Cancel"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  <CheckIcon className="h-4 w-4 mr-2" />
                  {isSaving
                    ? language === "ha"
                      ? "Ana Ajiye..."
                      : "Saving..."
                    : language === "ha"
                    ? "Ajiye Canje-canje"
                    : "Save Changes"}
                </button>
              </>
            )}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                {language === "ha" ? "Gyara" : "Edit"}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name[language]}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              {activeTab === "profile" && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {language === "ha"
                      ? "Bayanin Sirri"
                      : "Personal Information"}
                  </h3>

                  <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      {isEditing && (
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-orange-600">
                          <CameraIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {profile.name}
                      </h4>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                      {profile.verified && (
                        <div className="flex items-center mt-2">
                          <ShieldCheckIcon className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm text-green-600 font-medium">
                            {language === "ha"
                              ? "An Tabbatar"
                              : "Verified Seller"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ha" ? "Sunan Cikakke" : "Full Name"}
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => updateProfile("name", e.target.value)}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ha" ? "Imel" : "Email Address"}
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile("email", e.target.value)}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ha" ? "Lambar Waya" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => updateProfile("phone", e.target.value)}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ha"
                          ? "Nau'in Kasuwanci"
                          : "Business Type"}
                      </label>
                      <select
                        value={profile.businessType}
                        onChange={(e) =>
                          updateProfile("businessType", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      >
                        <option value="Traditional Crafts">
                          Traditional Crafts
                        </option>
                        <option value="Food & Spices">Food & Spices</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Leather Goods">Leather Goods</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === "ha" ? "Adireshi" : "Address"}
                      </label>
                      <textarea
                        value={profile.address}
                        onChange={(e) =>
                          updateProfile("address", e.target.value)
                        }
                        disabled={!isEditing}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {language === "ha"
                      ? "Saitunan Sanarwa"
                      : "Notification Preferences"}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === "ha"
                        ? "Saitunan sanarwa za a ƙara nan"
                        : "Notification settings will be added here"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {language === "ha"
                      ? "Saitunan Biyan Kuɗi"
                      : "Payment Settings"}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <CreditCardIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === "ha"
                        ? "Haɗi da hanyoyin biyan kuɗi kamar Paystack, Flutterwave"
                        : "Integration with payment gateways like Paystack, Flutterwave"}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    {language === "ha" ? "Saitunan Tsaro" : "Security Settings"}
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <ShieldCheckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === "ha"
                        ? "Canja kalmar sirri, tabbatarwa ta hanyoyi biyu, da sauran saitunan tsaro"
                        : "Password change, two-factor authentication, and other security settings"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
