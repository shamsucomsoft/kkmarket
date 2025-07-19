import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  selectedItems?: string[];
  onSelectItem?: (id: string) => void;
  onSelectAll?: () => void;
  getItemId?: (item: T) => string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
  emptyMessage?: string;
  className?: string;
}

export function AdminTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  getItemId,
  sortBy,
  sortDirection,
  onSort,
  emptyMessage = "No data available",
  className = "",
}: AdminTableProps<T>) {
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected =
    selectedItems.length > 0 && selectedItems.length < data.length;

  const handleSort = (column: Column<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }

    const value = (item as any)[column.key];
    return value?.toString() || "";
  };

  const getAlignment = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl border border-gray-100 ${className}`}
      >
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={onSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider ${getAlignment(
                    column.align
                  )} ${column.width || ""}`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column)}
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                      {column.title}
                      {sortBy === column.key && (
                        <>
                          {sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    column.title
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const itemId = getItemId ? getItemId(item) : index.toString();
                const isSelected = selectedItems.includes(itemId);

                return (
                  <tr
                    key={itemId}
                    className={`hover:bg-gray-50 transition-colors ${
                      isSelected ? "bg-blue-50" : ""
                    }`}
                  >
                    {selectable && (
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectItem?.(itemId)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-6 py-4 whitespace-nowrap text-sm ${getAlignment(
                          column.align
                        )}`}
                      >
                        {renderCell(item, column)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
