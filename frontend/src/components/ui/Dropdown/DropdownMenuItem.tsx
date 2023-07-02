import React from 'react';

export interface DropdownMenuItemProps {
  text: string;
  icon?: React.ReactNode;
  onItemClick?: (option: string) => void;
}

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ text, icon, onItemClick }) => {
  return (
    <div
      className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
      onClick={() => onItemClick?.(text)}
    >
      {icon}
      {text}
    </div>
  );
};

export default DropdownMenuItem;