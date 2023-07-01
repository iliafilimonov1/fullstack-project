import React, { useRef } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

interface TableProps<T> {
  headers: { key: keyof T; name: string; width?: number }[];
  data: T[];
  onRowClick?: (row: T) => void;
  onRowEdit?: (row: T) => void;
  onRowDelete?: (row: T) => void;
  isDropdownOpen?: boolean;
  onDropdownClick?: () => void;
}

const Table = <T,>({ data, headers, onRowClick, onRowEdit, onRowDelete }: TableProps<T>): React.ReactElement => {
  const headsRef = useRef<HTMLTableRowElement>(null);

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleRowEdit = (row: T) => {
    if (onRowEdit) {
      onRowEdit(row);
    }
  };

  const handleRowDelete = (row: T) => {
    if (onRowDelete) {
      onRowDelete(row);
    }
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr ref={headsRef}>
            {headers.map((header) => (
              <th
                key={String(header.key)}
                className="py-2 px-4 font-medium cursor-move bg-blue-200 text-blue-500 border border-blue-500"
                style={{
                  width: header.width,
                }}
              >
                {header.name}
              </th>
            ))}
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, index) => (
              <tr key={`${index}_${String(item[headers[0].key])}`} onClick={() => handleRowClick(item)}>
                {headers.map((header) => (
                  <td key={`${String(header.key)}_${String(item[headers[0].key])}`} className="py-2 px-4 border">
                    {String(item[header.key])}
                  </td>
                ))}
                <td className='p-0'>
                  <DropdownMenu
                    onViewClick={() => handleRowEdit(item)}
                    onEditClick={() => handleRowEdit(item)}
                    onDeleteClick={() => handleRowDelete(item)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 text-center border" colSpan={headers.length + 1}>
                No students available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
