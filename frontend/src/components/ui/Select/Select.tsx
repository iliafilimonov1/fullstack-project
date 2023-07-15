import React, {
  useRef, useState, useEffect, useCallback,
} from 'react';
import { GoChevronDown } from 'react-icons/go';
import { useOnClickOutside } from 'usehooks-ts';
import Input from '../Input/Input';
import { SelectOption, SelectProps } from './types';

const Select: React.FC<SelectProps> = ({
  options, onSelect, selectedOption, disabled, label, className, defaultValue
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [
    selectedValue,
    setSelectedValue,
  ] = useState<SelectOption | undefined | null>(selectedOption);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const closeHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const lastIndex = options.length - 1;

    const navigateUp = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex === null || prevIndex === 0 ? lastIndex : prevIndex - 1),
      );
    };

    const navigateDown = () => {
      setSelectedIndex(
        (prevIndex) => (prevIndex === null || prevIndex === lastIndex ? 0 : prevIndex + 1),
      );
    };

    switch (e.key) {
      case 'Enter':
        setIsOpen(!isOpen);

        if (selectedIndex !== null) {
          setSelectedValue(options[selectedIndex]);
        }
        break;
      case 'Escape':
        closeHandler();
        break;
      case 'ArrowUp':
        navigateUp();
        break;
      case 'ArrowDown':
        navigateDown();
        break;
      case 'Tab':
        if (e.shiftKey) {
          navigateUp();
        } else {
          navigateDown();
        }
        break;
      default:
        break;
    }
  };

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
      setSelectedValue((prevValue) => (!isOpen ? selectedOption || null : prevValue));
    }
  }, [isOpen, disabled, selectedOption]);

  const handleOptionClick = useCallback((value: SelectOption, index: number) => {
    if (!disabled) {
      setSelectedIndex(index);
      onSelect?.(value);
      setSelectedValue(value);
      setIsOpen(false);
    }
  }, [disabled, onSelect]);

  useEffect(() => {
    setSelectedIndex(options.findIndex((option) => option.title === selectedOption?.title) || null);
    setSelectedValue(selectedOption || defaultValue || null);
  }, [options, selectedOption, defaultValue]);

  return (
    <div>
      {label && (<div className="pb-1">{label}</div>)}
      <div
        ref={containerRef}
        className={`relative h-8 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className || ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Input
          className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          value={selectedValue ? selectedValue.title : ''}
          readOnly
        />
        <GoChevronDown
          className={`absolute top-1/2 mt-[-8px] right-3 transform transition-transform ${isOpen ? 'rotate-180' : ''} cursor-pointer ${disabled ? 'pointer-events-none cursor-not-allowed' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
        />
        {isOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-36 overflow-auto">
            {options.map((option, index) => (
              <li
                key={option.title}
                aria-selected={index === selectedIndex ? 'true' : 'false'}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? 'bg-gray-200' : ''}`}
                onClick={() => handleOptionClick(option, index)}
                role="option"
              >
                {option.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';
export default React.memo(Select);
