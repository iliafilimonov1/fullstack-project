/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';

interface TableProps<T extends Partial<Record<keyof T, React.ReactNode>>> {
  headers: { key: keyof T; name: string; width?: number }[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const Table = <T extends Partial<Record<keyof T, React.ReactNode>>>({
  data,
  headers,
  onRowClick,
}: TableProps<T>): React.ReactElement => {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };
  const headsRef = useRef<HTMLTableRowElement>(null);

  const [draggableElement, setDraggableElement] = useState<keyof T>();

  const [localHeaders, setLocalHeaders] = useState(headers);

  const dragHandler = useCallback((
    eventHeaderKey: keyof T,
    event: React.DragEvent<HTMLHeadElement>,
  ) => {
    const newHeaders = [...localHeaders];
    const draggableHeaderIndex = localHeaders.findIndex((h) => h.key === draggableElement);
    const dragOverHeaderIndex = localHeaders.findIndex((h) => h.key === eventHeaderKey);

    if (dragOverHeaderIndex > draggableHeaderIndex) {
      newHeaders.splice(
        draggableHeaderIndex,
        2,
        ...[localHeaders[dragOverHeaderIndex], localHeaders[draggableHeaderIndex]],
      );
    } else if (dragOverHeaderIndex < draggableHeaderIndex) {
      newHeaders.splice(
        dragOverHeaderIndex,
        2,
        ...[localHeaders[draggableHeaderIndex], localHeaders[dragOverHeaderIndex]],
      );
    }
    setLocalHeaders(newHeaders);
  }, [draggableElement, localHeaders]);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr
          ref={headsRef}
        >
          {localHeaders.map((header) => (
            <th
              key={header.key.toString()}
              className="py-2 px-4 font-medium bg-blue-200 text-blue-500 border border-blue-500 cursor-move"
              onDragOver={(e) => {
                dragHandler(header.key, e);
              }}
              onDragStart={() => setDraggableElement(header.key)}
              style={{
                width: header.width,
              }}
              draggable
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.length ? (
          data.map((item, index) => (
            <tr
              key={`${index.toString()}_`}
              onClick={() => handleRowClick(item)}
            >
              {localHeaders.map((header) => (
                <td
                  key={`${header.key.toString()}${index.toString()}`}
                  className="py-2 px-4 border"
                >
                  {item[header.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="py-2 px-4 text-center border"
              colSpan={headers.length}
            >
              No students available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
