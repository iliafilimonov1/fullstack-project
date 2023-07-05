import React from 'react';
import TableRow from './TableRow';

interface TableCell<T> {
  key: keyof T;
  name?: string;
}

interface TableProps<T> {
  headers: TableCell<T>[];
  data: T[];
  onDropdownOptionSelect: (option: string, row: T) => void;
  emptyMessage?: string;
}

const Table = <T extends object>({ data, headers, onDropdownOptionSelect, emptyMessage }: TableProps<T>): React.ReactElement => {
  return (
    <div className="w-full">
      <div className="flex flex-row">
        {headers.map((header) => (
          <div
            key={String(header.key)}
            className="py-2 px-4 font-medium cursor-move bg-blue-200 text-blue-500 border border-blue-500"
          >
            {header.name}
          </div>
        ))}
        <div className="py-2 px-4 flex-grow"></div>
      </div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <TableRow<T>
            key={`${index}`}
            rowData={item}
            onDropdownOptionSelect={onDropdownOptionSelect}
          />
        ))
      ) : (
        <div className="flex flex-row">
          <div
            className="py-2 px-4 text-center border"
            style={{ gridColumn: `1 / span ${headers.length + 1}` }}
          >
            {emptyMessage || 'Таблица пуста'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
