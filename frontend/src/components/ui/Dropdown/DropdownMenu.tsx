import React, { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useOnClickOutside, useToggle } from 'usehooks-ts';
import DropdownMenuItem from './DropdownMenuItem';
import Button from '../Button/Button';
import { DropdownMenuProps } from './types';

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, onOptionSelect }) => {
  const [isOpen, toggleIsOpen] = useToggle();
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, toggleIsOpen);

  const handleItemClick = (option: string) => {
    toggleIsOpen();
    onOptionSelect?.(option);
  };

  return (
    <div className="relative inline-flex">
      <Button
        icon={<BiDotsHorizontalRounded />}
        onClick={toggleIsOpen}
        variant="secondary"
      />
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 z-10 w-60 py-2 mb-2 mt-2 bg-white rounded-md shadow-lg"
        >
          {items.map(({ icon, text }, index) => (
            <DropdownMenuItem
              key={`${index.toString()}_`}
              icon={icon}
              onItemClick={handleItemClick}
              text={text}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(DropdownMenu);
