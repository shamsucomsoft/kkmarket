import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../state/language-context";
import { useSearchStore } from "../../store/search.store";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface AdvancedSearchProps {
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
  onSearch?: (query: string) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  placeholder,
  showFilters = false,
  className = "",
  onSearch,
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    query,
    suggestions,
    searchHistory,
    setQuery,
    getSuggestions,
    searchProducts,
    clearHistory,
  } = useSearchStore();

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (inputValue.trim() && inputValue !== query) {
        getSuggestions(inputValue);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, getSuggestions, query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
  };

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || inputValue.trim();
    if (!finalQuery) return;

    setQuery(finalQuery);
    setInputValue(finalQuery);
    setIsOpen(false);

    if (onSearch) {
      onSearch(finalQuery);
    } else {
      searchProducts();
      navigate(`/search?q=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  const handleHistoryClick = (historyItem: string) => {
    handleSearch(historyItem);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    setQuery("");
    inputRef.current?.focus();
  };

  const showDropdown =
    isOpen && (suggestions.length > 0 || searchHistory.length > 0);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-20 py-3 border border-secondary rounded-lg bg-white text-drab-dark-brown placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder={
            placeholder ||
            (language === "ha"
              ? "Nemo kayayyaki, kasuwanni, ko dillalai..."
              : "Search products, vendors, or categories...")
          }
        />

        {/* Search Icon */}
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

        {/* Action Buttons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {inputValue && (
            <button
              onClick={handleClearInput}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => handleSearch()}
            className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-drab-dark-brown transition-colors"
          >
            {language === "ha" ? "Nemo" : "Search"}
          </button>

          {showFilters && (
            <button
              onClick={() => navigate("/search")}
              className="p-1 text-gray-400 hover:text-primary transition-colors"
              title={language === "ha" ? "Bude Tacewa" : "Advanced Filters"}
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown with Suggestions and History */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-secondary rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === "ha" ? "Shawarwari" : "Suggestions"}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-white-smoke transition-colors flex items-center"
                >
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-drab-dark-brown">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-between">
                <span>
                  {language === "ha"
                    ? "Binciken da ya wuce"
                    : "Recent Searches"}
                </span>
                <button
                  onClick={clearHistory}
                  className="text-xs text-primary hover:text-drab-dark-brown"
                >
                  {language === "ha" ? "Share" : "Clear"}
                </button>
              </div>
              {searchHistory.slice(0, 5).map((historyItem, index) => (
                <button
                  key={`history-${index}`}
                  onClick={() => handleHistoryClick(historyItem)}
                  className="w-full px-4 py-3 text-left hover:bg-white-smoke transition-colors flex items-center"
                >
                  <ClockIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{historyItem}</span>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {suggestions.length === 0 &&
            searchHistory.length === 0 &&
            inputValue.trim() && (
              <div className="px-4 py-6 text-center text-gray-500">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm">
                  {language === "ha"
                    ? "Babu shawarwari da aka samu"
                    : "No suggestions found"}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
