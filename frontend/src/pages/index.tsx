import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';

/** Домашняя страница */
const Home = () => (
  <div>
    <Head>
      <title>Platform</title>
      <meta
        content="Platform"
        name="educational online platform for students"
      />
      <meta
        content="width=device-width, initial-scale=1"
        name="viewport"
      />
      <link
        href="/favicon.ico"
        rel="icon"
      />
    </Head>
    <div className="px-6 py-10 grid grid-cols-2 gap-2" />
  </div>
);

export default observer(Home);
