import React, { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropdownMenuItem, { DropdownMenuItemProps } from './DropdownMenuItem';
import { useOnClickOutside, useToggle } from 'usehooks-ts';
import Button from '../Button/Button';

interface DropdownMenuProps {
  items: Omit<DropdownMenuItemProps, 'onItemClick'>[];
  onOptionSelect?: (option: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onOptionSelect }) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(menuRef, toggleIsOpen)

  const handleItemClick = (option: string) => {
    toggleIsOpen();
    onOptionSelect?.(option);
  };

  return (
    <div className="relative inline-flex">
      <Button
        variant="secondary"
        onClick={toggleIsOpen}
        icon={<BiDotsHorizontalRounded />}
      />
      {isOpen && (
        <div
          ref={menuRef}
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
