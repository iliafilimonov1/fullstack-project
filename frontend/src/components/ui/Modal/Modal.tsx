import { extractStyles } from '@/services/utils';
import React, {
  useLayoutEffect,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import ReactDom from 'react-dom';
import ModalLayout from './ModalLayout';
import type { ModalProps } from './types';

/** Длительность анимации с мс */
const ModalAnimationDuration = 400;

const Modal: React.FC<ModalProps> = ({ children, onClose, className }) => {
  let modalRoot: HTMLElement | null;
  if (document) {
    modalRoot = document?.getElementById('modal');
    if (!modalRoot) {
      const portal = document.createElement('div');
      portal.id = 'modal';
      document.body.appendChild(portal);
    }
  }
  /** Открыта ли модалка (для анимации) */
  const [isOpen, setOpen] = useState(false);

  /** Запуск анимации открытия модалки */
  const openModal = () => {
    setTimeout(() => setOpen(true), 0);
  };

  /** Запуск анимации закрытия модалки */
  const closeModal = () => {
    if (onClose) {
      setOpen(false);
      setTimeout(() => {
        onClose();
      }, ModalAnimationDuration);
    }
  };

  /** Элемент модального окна, который будет монтироваться */
  const elem = useMemo(() => {
    const temp = document.createElement('div');
    /** Обработчик закрытия при клике вне окна модалки */
    temp.onclick = (e) => {
      if (e.target === elem) {
        if (onClose) {
          closeModal();
        }
      }
    };
    return temp;
  }, [onClose]);

  /** Реф на окно внутри оверлея */
  const modalRef = useRef<HTMLDivElement>(null);

  /** Обработчик закрытия через Esc */
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const lastModal = document.getElementById('modal')?.lastChild;
      if (lastModal === elem) {
        closeModal();
      }
    }
  };

  /** Монтирование модалки в DOM */
  useLayoutEffect(() => {
    elem.className = 'fixed w-full h-full top-0 left-0 flex bg-slate-400/30 z-50';
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
      {children}
    </ModalLayout>,
    elem,
  );
};

Modal.displayName = 'Modal';

export default React.memo(Modal);
