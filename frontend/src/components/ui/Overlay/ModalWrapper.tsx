import React, { useContext } from 'react';
import Modal from './Modal';
import { ModalContext } from './ModalContext';

/**
 * Свойства компонента ModalWrapper.
 *
 * @interface ModalWrapperProps
 */
interface ModalWrapperProps {
  /**
   * Дочерние элементы, которые будут обернуты компонентом ModalWrapper.
   */
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  const modalContext = useContext(ModalContext);

  const closeModal = () => {
    if (modalContext) {
      modalContext.closeAll();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {modalContext?.getOperations().map((operation, index) => {
        const uniqueKey = operation.props.key ?? index.toString();

        return (
          <React.Fragment key={uniqueKey}>
            <Modal
              abort={operation.props.abort}
              depth={operation.props.depth}
              isActive={operation.props.isActive}
              onClose={closeModal}
              success={operation.props.success}
              zIndex={operation.props.zIndex}
            >
              {React.createElement(operation.component, operation.props)}
            </Modal>
          </React.Fragment>
        );
      })}
      {children}
    </div>
  );
};

export default ModalWrapper;
