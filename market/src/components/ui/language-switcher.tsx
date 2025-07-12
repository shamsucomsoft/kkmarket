import React from "react";
import { useLanguage } from "../../state/language-context";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: "en" | "ha") => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 shadow-md">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          language === "en"
            ? "bg-primary text-white shadow-md"
            : "text-gray-700 hover:bg-white/50"
        }`}
      >
        {t("language.en")}
      </button>
      <button
        onClick={() => handleLanguageChange("ha")}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
          language === "ha"
            ? "bg-primary text-white shadow-md"
            : "text-gray-700 hover:bg-white/50"
        }`}
      >
        {t("language.ha")}
      </button>
    </div>
  );
};
