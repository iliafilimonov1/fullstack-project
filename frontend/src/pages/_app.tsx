import MainLayout from '@/Layouts/MainLayout';
import { setupStore } from '@/store/store';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import '../styles/globals.css';

const store = setupStore();

const App = ({ Component, pageProps }: AppProps) => (
  <main>
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
    <div id="modal" />
  </main>

);

export default React.memo(App);
