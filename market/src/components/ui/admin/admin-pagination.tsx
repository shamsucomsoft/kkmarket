import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showItemsInfo?: boolean;
  className?: string;
}

export const AdminPagination: React.FC<AdminPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showItemsInfo = true,
  className = "",
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const getItemsInfo = () => {
    if (!totalItems || !itemsPerPage) return null;

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return `Showing ${start} to ${end} of ${totalItems} entries`;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return showItemsInfo && totalItems ? (
      <div
        className={`flex justify-between items-center px-6 py-3 ${className}`}
      >
        <p className="text-sm text-gray-700">{getItemsInfo()}</p>
      </div>
    ) : null;
  }

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-gray-200 ${className}`}
    >
      {showItemsInfo && (
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-700">{getItemsInfo()}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border
            transition-colors duration-200
            ${
              currentPage === 1
                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-1">
          {generatePageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === "..." ? (
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`
                    px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200
                    ${
                      page === currentPage
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border
            transition-colors duration-200
            ${
              currentPage === totalPages
                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
        >
          Next
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
