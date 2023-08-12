import React, { useState } from 'react';
import Modal from './Modal';

interface ModalContentProps {
  isActive?: boolean;
  success?: () => void;
  abort?: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ isActive, success, abort }) => {
  const [showSubModal, setShowSubModal] = useState(false);

  const openSubModal = () => {
    setShowSubModal(true);
  };

  const closeSubModal = () => {
    setShowSubModal(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Modal Content</h2>
      <p>This is the content of the modal window.</p>
      {isActive && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={openSubModal}
            type="button"
          >
            Success
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={abort}
            type="button"
          >
            Abort
          </button>
        </div>
      )}

      {showSubModal && (
        <Modal
          abort={() => {
            closeSubModal();
            if (abort) {
              abort();
            }
          }}
          depth={2}
          onClose={closeSubModal}
          success={() => {
            closeSubModal();
            if (success) {
              success();
            }
          }}
          zIndex={1001}
          isActive
        >
          <div className="p-2">
            <h3 className="text-lg font-semibold mb-1">Sub Modal Content</h3>
            <p>This is the content of the sub modal window.</p>
            <div className="mt-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded mr-1"
                onClick={() => {
                  closeSubModal();
                  if (success) {
                    success();
                  }
                }}
                type="button"
              >
                Success
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => {
                  closeSubModal();
                  if (abort) {
                    abort();
                  }
                }}
                type="button"
              >
                Abort
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ModalContent;
