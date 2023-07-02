import React, { useState, useRef, useEffect, RefObject } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropdownMenuItem, { DropdownMenuItemProps } from './DropdownMenuItem';

interface DropdownMenuProps {
  items: Omit<DropdownMenuItemProps, 'onItemClick'>[];
  onOptionSelect?: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option: string) => {
    setIsOpen(false);
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="flex items-center justify-center py-2 w-10 h-10 focus:outline-none bg-gray-200"
        onClick={handleToggleMenu}
      >
        <BiDotsHorizontalRounded className="text-gray-400" size={18} />
      </button>
      {isOpen && (
        <div
          ref={menuRef as RefObject<HTMLDivElement>}
          className="absolute right-0 z-10 w-60 py-2 mb-2 mt-2 bg-white rounded-md shadow-lg"
        >
          {items.map(({ icon, text }, index) => (
            <DropdownMenuItem
              key={index}
              icon={icon}
              text={text}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
