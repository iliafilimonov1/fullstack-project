import React from 'react';

/**
 * Интерфейс для свойств компонента модального окна.
 *
 * @interface ModalProps
 */
export interface ModalProps {
  /**
   * Уникальный ключ для элемента.
   */
  key?: string;

  /**
   * Определяет, активно ли модальное окно.
   */
  isActive?: boolean;

  /**
   * Callback-функция, вызываемая при закрытии модального окна.
   */
  onClose?: () => void;

  /**
   * Значение z-index для модального окна.
   */
  zIndex: number;

  /**
   * Уровень глубины модального окна.
   */
  depth: number;

  /**
   * Callback-функция, вызываемая при нажатии кнопки "Ok".
   */
  success: () => void;

  /**
   * Callback-функция, вызываемая при нажатии кнопки "Cancel".
   */
  abort: () => void;

  /**
   * Содержимое, которое будет отображаться внутри модального окна.
   */
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isActive,
  onClose,
  zIndex,
  depth,
  success,
  abort,
  children,
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      style={{ zIndex: zIndex + depth }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => success()}
            type="button"
          >
            Success
          </button>
          <button
            className="px-4 py-2 ml-2 bg-red-500 text-white rounded"
            onClick={() => abort()}
            type="button"
          >
            Abort
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
