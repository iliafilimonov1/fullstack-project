import React, { useState, useRef, useEffect } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { RiEyeLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

interface DropdownMenuProps {
  // TODO Пока этот компонент выполняет эти функции он не ui компонент
  // Применяемость компонента очень заужена этими функциями
  onViewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  // TODO Долго думал что это :D, а потом как понял=)
  // Надо с этим что-то делать...
  onViewClick = () => { },
  onEditClick = () => { },
  onDeleteClick = () => { },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleItemClick = (action: () => void) => {
    setIsOpen(false);
    // По сути на 16-18 строчках кода ты гарантировал наличие action поэтому проверка лишняя и в 27 строке она у тебя не undefine | ()=> void
    // а всегда ()=> void
    if (action) {
      action();
    }
  };
  
  // TODO useOnClickOutside может сократить эту реализацию и скорее всего не нужно будет ловить эвент
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
          <li>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              // TODO Вот это поворот)))
              // Надо что-то придумать...
              onClick={() => handleItemClick(onViewClick)}
            >
              <RiEyeLine className="text-gray-600 mr-2 w-4" size={18} />
              Открыть
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleItemClick(onEditClick)}
            >
              <RiEdit2Line className="text-gray-600 mr-2 w-4" size={18} />
              Редактировать
            </button>
          </li>
          {/* По сути три одинаковые кнопки просто иконки разные... Надо что-то придумать */}
          <li>
            <button
              type="button"
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => handleItemClick(onDeleteClick)}
            >
              <RiDeleteBinLine className="text-gray-600 mr-2 w-4" size={18} />
              Удалить
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

//TODO Можно добавить пропс closeWhenScroll?: boolean и если true закрывть при скроле
//TODO Желательно до компонента нужно доставать табом и открывать его на энтер и закрывать на escape  
//TODO Открываться самой менюшке лучше под кнопкой, сейчас он перекрывает кнопку

export default DropdownMenu;
