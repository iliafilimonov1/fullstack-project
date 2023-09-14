import React, { ReactNode } from 'react';
import { RiEyeLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import DropdownMenu from '../Dropdown/DropdownMenu';

interface DropdownCellProps<T> {
  onOptionSelect?: (option: string) => void;
  icon?: ReactNode;
  row?: T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
const DropdownCell = <T, _>({ onOptionSelect, icon, row }: DropdownCellProps<T>) => {
  const handleDropdownOptionClick = (option: string) => {
    onOptionSelect?.(option);
  };

  console.log(row);

  const dropDownItems = [
    {
      text: 'Открыть',
      icon: <RiEyeLine
        className="text-gray-600 mr-2 w-4"
        size={18}
      />,
    },
    {
      text: 'Редактировать',
      icon: <RiEdit2Line
        className="text-gray-600 mr-2 w-4"
        size={18}
      />,
    },
    {
      text: 'Удалить',
      icon: <RiDeleteBinLine
        className="text-gray-600 mr-2 w-4"
        size={18}
      />,
    },
  ];

  return (
    <div className="flex items-center border border-gray-300 justify-center">
      {icon && <span className="text-gray-600 mr-2 w-4">{icon}</span>}
      <DropdownMenu
        items={dropDownItems}
        onOptionSelect={handleDropdownOptionClick}
      />
    </div>
  );
};

export default React.memo(DropdownCell);
