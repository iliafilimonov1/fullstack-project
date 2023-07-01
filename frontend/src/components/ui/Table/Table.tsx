import React, { useRef } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

interface TableProps<T> {
  headers: { key: keyof T; name: string; width?: number }[];
  data: T[];
  onDropdownOptionSelect: (option: string, row: T) => void;
}

const Table = <T,>({ data, headers, onDropdownOptionSelect }: TableProps<T>): React.ReactElement => {
  const headsRef = useRef<HTMLTableRowElement>(null);

  const handleDropdownOptionClick = (option: string, row: T) => {
    if (onDropdownOptionSelect) {
      onDropdownOptionSelect(option, row);
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
              <tr key={`${index}_${String(item[headers[0].key])}`}>
                {headers.map((header) => (
                  <td key={`${String(header.key)}_${String(item[headers[0].key])}`} className="py-2 px-4 border">
                    {String(item[header.key])}
                  </td>
                ))}
                <td className="p-0">
                  <DropdownMenu
                    onOptionSelect={(option) => handleDropdownOptionClick(option, item)}
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
