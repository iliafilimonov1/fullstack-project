import '../styles/globals.css';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      {isAuthenticated ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      )}
      <div id="modal" />
    </main>
  );
};

export default React.memo(App);
