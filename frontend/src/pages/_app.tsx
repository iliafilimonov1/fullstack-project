import '../styles/globals.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import authStore from "@/store/AuthStore/AuthStore";
import MainLayout from '../Layouts/MainLayout';
import AuthLayout from '../Layouts/AuthLayout';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const isAuthenticated = authStore.isAuthenticated;
  console.log(isAuthenticated)
  //const router = useRouter();

  // useEffect(() => {
  //   // При изменении роута проверяем аутентификацию пользователя
  //   authStore.checkAuthStatus();
  // }, [router.asPath]);

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
