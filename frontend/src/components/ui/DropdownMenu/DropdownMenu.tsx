import React, { useState, useRef, useEffect } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface DropDownItem {
  text: string;
  icon: React.ReactNode;
}

interface DropdownMenuProps {
  items: DropDownItem[];
  onOptionSelect?: (option: string) => void;
}

const DropdownMenu = ({ items, onOptionSelect }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

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
        <ul
          ref={menuRef}
          className="absolute right-0 z-10 w-60 py-2 mb-2 mt-2 bg-white rounded-md shadow-lg"
        >
          {items.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => handleItemClick(item.text)}
              >
                {item.icon}
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
