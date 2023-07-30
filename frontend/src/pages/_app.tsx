import '../styles/globals.css';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import { AppProps } from 'next/app';


const App = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = useAuth();
  const PageWrapper = isAuthenticated ? MainLayout : AuthLayout;

  return (
    <main>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </main>
  );
};

export default React.memo(App);
