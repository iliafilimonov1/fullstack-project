import React, {
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import ReactDom from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { extractStyles } from '@/services/utils';
import ModalLayout from './ModalLayout';
import type { ModalProps } from './types';
import Button from '../Button/Button';

/** Длительность анимации с мс */
const ModalAnimationDuration = 200;

const Modal: React.FC<ModalProps> = ({
  children, onClose, className, title,
}) => {
  // контейнер для всех модалок
  let modalRoot: HTMLElement | null;
  if (typeof document !== 'undefined') {
    modalRoot = document?.getElementById('modal');
    if (!modalRoot) {
      const portal = document.createElement('div');
      portal.id = 'modal';
      document.body.appendChild(portal);
      modalRoot = portal; // иначе первый клик не работает
    }
  }
  /** Открыта ли модалка (для анимации) */
  const [isOpen, setOpen] = useState(false);

  /** Запуск анимации открытия модалки */
  const openModal = () => {
    requestAnimationFrame(() => setOpen(true));
  };

  /** Запуск анимации закрытия модалки */
  const closeModal = useCallback(() => {
    if (onClose) {
      requestAnimationFrame(() => {
        // setOpen(false);
        onClose();
      });
    }
  }, [onClose]);

  /** Элемент модального окна, который будет монтироваться */
  const elem = useMemo(() => {
    const temp = document.createElement('div');
    temp.setAttribute('data-modal-overlay', 'true');

    temp.onclick = (e) => {
      if (e.target instanceof HTMLDivElement && e.target.getAttribute('data-modal-overlay') === 'true') {
        if (onClose) {
          closeModal();
        }
      }
    };
    return temp;
  }, [onClose, closeModal]);

  /** Реф на окно внутри оверлея */
  const modalRef = useRef<HTMLDivElement>(null);

  /** Обработчик закрытия через Esc */
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  /** Монтирование модалки в DOM */
  useLayoutEffect(() => {
    elem.className = 'fixed w-full h-full top-0 left-0 flex bg-black/30 z-3';
    modalRoot?.appendChild(elem);
    openModal();
    return () => {
      modalRoot?.removeChild(elem);
    };
  }, []);

  /** Добавление обработчика закрытия по нажатию на Esc */
  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return ReactDom.createPortal(
    <ModalLayout
      ref={modalRef}
      className={extractStyles`
        transition  
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      duration={ModalAnimationDuration}
    >
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
          size="md"
          variant="ghost"
        >
          <GrFormClose />
        </Button>
      </header>
      {children}
    </ModalLayout>,
    elem,
  );
};

Modal.displayName = 'Modal';

export default React.memo(Modal);
