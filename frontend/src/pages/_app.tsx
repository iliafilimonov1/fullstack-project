import MainLayout from '@/Layouts/MainLayout';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <main>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    <div id="modal" />
  </main>
);

export default React.memo(App);
