import React from "react";

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => string;
  headerClassName?: string;
  rowClassName?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowKey,
  headerClassName = "bg-gray-50",
  rowClassName = "hover:bg-gray-50",
  className = "w-full",
}: DataTableProps<T>) {
  return (
    <table className={className}>
      <thead className={headerClassName}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.header}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row) => (
          <tr key={getRowKey(row)} className={rowClassName}>
            {columns.map((col) => (
              <td
                key={col.header}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {col.render
                  ? col.render(row)
                  : (row as any)[col.accessor as string]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
