import React from 'react';
import { DropdownMenuItemProps } from './types';

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ text, icon, onItemClick }) => (
  <div
    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
    onClick={() => onItemClick?.(text)}
  >
    {icon}
    {text}
  </div>
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

export default React.memo(DropdownMenuItem);
