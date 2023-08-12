import React, {
  createContext, useState, ReactNode, useMemo, FC, useCallback,
} from 'react';
import { ModalProps } from './Modal';

/**
 * Интерфейс для значения контекста модальных окон.
 *
 * @interface ModalContextValue
 */
interface ModalContextValue {
  /**
   * Метод для отображения модального окна.
   *
   * @param {React.ComponentType<ModalProps>} content Компонент модального окна.
   * @param {ModalProps} props Свойства для передачи компоненту модального окна.
   */
  show: (content: React.ComponentType<ModalProps>, props: ModalProps) => void;

  /**
   * Метод для закрытия всех открытых модальных окон.
   */
  closeAll: () => void;

  /**
   * Метод для получения списка операций модальных окон.
   *
   * @returns {ModalOperation[]} Список операций модальных окон.
   */
  getOperations: () => ModalOperation[];
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * Интерфейс для свойств провайдера модальных окон.
 *
 * @interface ModalProviderProps
 */
interface ModalProviderProps {
  /**
   * Дочерние компоненты, которые будут обернуты провайдером модальных окон.
   */
  children: ReactNode;
}

/**
 * Интерфейс для описания операции модального окна.
 *
 * @interface ModalOperation
 */
export interface ModalOperation {
  /**
   * Компонент, который будет отображен в модальном окне.
   */
  component: React.ComponentType<ModalProps>;

  /**
   * Свойства для передачи компоненту модального окна.
   */
  props: ModalProps;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalOperation[]>([]);

  const show = useCallback((content: React.ComponentType<ModalProps>, props: ModalProps) => {
    setModals((prevModals) => [...prevModals, { component: content, props }]);
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  const getOperations = useCallback(() => modals, [modals]);

  const contextValue = useMemo(() => ({
    show,
    closeAll,
    getOperations,
  }), [show, closeAll, getOperations]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modals.map((modal, index) => (
        <React.Fragment key={modal.props.key ?? index.toString()}>
          {modal.component && <modal.component {...modal.props} />}
        </React.Fragment>
      ))}
    </ModalContext.Provider>
  );
};
