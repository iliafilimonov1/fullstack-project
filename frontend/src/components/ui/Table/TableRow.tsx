import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { observer } from 'mobx-react-lite';
import DropdownCell from './DropDownCell';
import TextCell from './TextCell';

interface TableRowProps<T> {
  rowData?: T;
  onDropdownOptionSelect?: (option: string, row: T) => void;
}

const TableRow = <T extends object>({
  rowData,
  onDropdownOptionSelect,
}: TableRowProps<T>): React.ReactElement => {
  const rows = Object.keys(rowData || {}).filter((key) => key !== 'id') as (keyof T)[];

  return (
    <div className="flex flex-row">
      {rows.map((key, index) => (
        <TextCell<T>
          key={`${String(key)}_${index.toString()}`}
          value={String(rowData?.[key])}
        />
      ))}
      <div className="py-2 px-4 border border-gray-300 flex items-center">
        <DropdownCell
          icon={<BiDotsHorizontalRounded />}
          onOptionSelect={(option) => onDropdownOptionSelect?.(option, rowData as T)}
          row={rowData}
        />
      </div>
    </div>
  );
};

export default observer(TableRow);
