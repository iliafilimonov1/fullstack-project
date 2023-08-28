import '../styles/globals.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppProps } from 'next/app';
import { ModalProvider } from '../components/ui/Overlay/ModalContext';

import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import useStores from '@/hooks/useStores';

const App = ({ Component, pageProps }: AppProps) => {
  const { authStore } = useStores();

  const PageWrapper = authStore.isAuthenticated ? MainLayout : AuthLayout;

  useEffect(() => {
    authStore.checkAndRefreshTokens();
  }, [authStore]);

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
