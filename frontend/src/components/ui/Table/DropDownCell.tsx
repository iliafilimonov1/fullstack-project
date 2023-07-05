import React, { ReactNode } from 'react';
import DropdownMenu from '../Dropdown/DropdownMenu';
import { RiEyeLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

interface DropdownCellProps<T> {
  onOptionSelect?: (option: string) => void;
  icon?: ReactNode;
  row?: T;
}

const DropdownCell = <T,>({ onOptionSelect, icon }: DropdownCellProps<T>) => {
  const handleDropdownOptionClick = (option: string) => {
    onOptionSelect?.(option);
  };

  const dropDownItems = [
    { text: 'Открыть', icon: <RiEyeLine className="text-gray-600 mr-2 w-4" size={18} /> },
    { text: 'Редактировать', icon: <RiEdit2Line className="text-gray-600 mr-2 w-4" size={18} /> },
    { text: 'Удалить', icon: <RiDeleteBinLine className="text-gray-600 mr-2 w-4" size={18} /> },
  ];

  return (
    <div className="flex items-center border border-gray-300 justify-center">
      {icon && <span className="text-gray-600 mr-2 w-4">{icon}</span>}
      <DropdownMenu items={dropDownItems} onOptionSelect={handleDropdownOptionClick} />
    </div>
  );
};

export default DropdownCell;
