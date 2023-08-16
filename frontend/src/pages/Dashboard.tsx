import React, { ReactNode, useContext } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { ModalContext } from '../components/ui/Overlay/ModalContext';
import ModalContent from '@/components/ui/Overlay/ModalContent';
import ModalWrapper from '@/components/ui/Overlay/ModalWrapper';
// import Alert from '@/components/ui/Alert/Alert';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const modalContext = useContext(ModalContext);

  const openModal = () => {
    console.log('Modal opened');
    // @ts-ignore
    modalContext?.show(ModalContent, {
      isActive: true,
      zIndex: 1000,
      depth: 1,
      abort: () => {
        console.log('Abort function called from ModalWrapper');
        modalContext.closeAll();
      },
    });
  };

  return (
    <MainLayout>
      <h1>This is the Dashboard</h1>
      <ModalWrapper>
        <button
          onClick={openModal}
          type="button"
        >
          Open Modal Button
        </button>
      </ModalWrapper>

      {children}
      {/* <Alert variant="info">
        <h2>Registration Successful!</h2>
        <p>You are now registered. Welcome aboard!</p>
      </Alert> */}
    </MainLayout>
  );
};

export default Dashboard;
