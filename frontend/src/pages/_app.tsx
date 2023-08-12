import '../styles/globals.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppProps } from 'next/app';
import { ModalProvider } from '../components/ui/Overlay/ModalContext';

import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import authStore from '../store/AuthStore/AuthStore';
import ProtectedRoute from '@/components/ProtectedRoute';

const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = authStore;

  const PageWrapper = isAuthenticated ? MainLayout : AuthLayout;

  useEffect(() => {
    authStore.checkAndRefreshTokens();
  }, [isAuthenticated]);

  return (
    <ModalProvider>
      <main>
        <PageWrapper>
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </PageWrapper>
      </main>
    </ModalProvider>
  );
};

export default observer(App);
