import '../styles/globals.css';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AppProps } from 'next/app';
import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import authStore from '../store/AuthStore/AuthStore';

const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = authStore;

  const PageWrapper = isAuthenticated ? MainLayout : AuthLayout;

  useEffect(() => {
    authStore.checkAndRefreshTokens();
  }, []);

  return (
    <main>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </main>
  );
};

export default observer(App);
