import React, { useRef } from 'react';
import DropdownMenu from '../Dropdown/DropdownMenu';
import { RiEyeLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

interface TableProps<T> {
  headers: { key: keyof T; name: string; width?: number }[];
  data: T[];
  onDropdownOptionSelect: (option: string, row: T) => void;
  emptyMessage?: string;
}

const Table = ({ data, headers, onDropdownOptionSelect, emptyMessage }: TableProps<any>): React.ReactElement => {
  const headsRef = useRef<HTMLTableRowElement>(null);

  const handleDropdownOptionClick = (option: string, row: any) => {
    if (onDropdownOptionSelect) {
      onDropdownOptionSelect(option, row);
    }
  };

  const dropDownItems = [
    { text: 'Открыть', icon: <RiEyeLine className="text-gray-600 mr-2 w-4" size={18} /> },
    { text: 'Редактировать', icon: <RiEdit2Line className="text-gray-600 mr-2 w-4" size={18} /> },
    { text: 'Удалить', icon: <RiDeleteBinLine className="text-gray-600 mr-2 w-4" size={18} /> },
  ];

  return (
    <table className="w-full border-collapse">
      <colgroup>
        {headers.map((header) => (
          <col key={String(header.key)} style={{ width: header.width }} />
        ))}
      </colgroup>
      <thead>
        <tr ref={headsRef}>
          {headers.map((header) => (
            <th
              key={String(header.key)}
              className="py-2 px-4 font-medium cursor-move bg-blue-200 text-blue-500 border border-blue-500"
            >
              {header.name}
            </th>
          ))}
          <th className="py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={`${index}`}>
            {headers.map((header) => (
              <td key={`${String(header.key)}_${index}`} className="py-2 px-4 border">
                {String(item[header.key])}
              </td>
            ))}
            <td className="p-0">
              <DropdownMenu items={dropDownItems} onOptionSelect={(option) => handleDropdownOptionClick(option, item)} />
            </td>
          </tr>
        ))}
        {data.length === 0 && (
          <tr>
            <td className="py-2 px-4 text-center border" colSpan={headers.length + 1}>
              {emptyMessage || 'Таблица пуста'}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;