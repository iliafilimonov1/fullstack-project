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
import type { ModalProps } from './types';
import Button from '../Button/Button';
import ModalPanel from './ModalPanel';

/** Длительность анимации с мс */
const ModalAnimationDuration = 200;

const Modal: React.FC<ModalProps> = ({
  children, onClose, className, title,
}) => {
  // контейнер для всех модалок
  const modalRoot = useMemo(() => {
    const portal = document.createElement('div');
    portal.id = 'modal';
    document.body.appendChild(portal);
    return portal;
  }, []);

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

  /** Реф на окно внутри оверлея */
  const modalRef = useRef<HTMLDivElement>(null);

  /** Элемент модального окна, который будет монтироваться */
  const modalOverlay = useMemo(() => {
    const overlay = document.createElement('div');
    overlay.setAttribute('data-modal-overlay', 'true');
    return overlay;
  }, []);

  /** Обработчик клика на оверлее */
  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const target = e.currentTarget;
    const isOverlay = target.getAttribute('data-modal-overlay') === 'true';

    if (isOverlay) {
      if (onClose) {
        closeModal();
      }
    }
  }, []);

  /** Монтирование модалки в DOM */
  useLayoutEffect(() => {
    modalOverlay.className = 'fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/40 z-50';
    modalRoot?.appendChild(modalOverlay);

    const handleDocumentClick = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLDivElement)) { return; }

      const isOverlay = e.target.getAttribute('data-modal-overlay') === 'true';
      if (isOverlay && onClose) {
        closeModal();
      }
    };

    modalOverlay.addEventListener('click', handleDocumentClick);
    openModal();

    return () => {
      modalRoot?.removeChild(modalOverlay);
      modalOverlay.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  /** Обработчик закрытия через Esc */
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  /** Добавление обработчика закрытия по нажатию на Esc */
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return ReactDom.createPortal(
    <ModalPanel
      ref={modalRef}
      className={extractStyles`
        transition
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      duration={ModalAnimationDuration}
      onClick={handleOverlayClick}
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

    </ModalPanel>,
    modalOverlay,
  );
};

Modal.displayName = 'Modal';

export default React.memo(Modal);
