/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import dynamic from 'next/dynamic';
import 'bulma/css/bulma.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { UserProvider } from '../UserContext/UserContext';
import '@fortawesome/fontawesome-free/css/all.css';

const DynamicMainNav = dynamic(() => import('../components/MainNav/MainNav'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>Next-App V2</title>
      </Head>
      <DynamicMainNav />
      <Component {...pageProps} />
    </UserProvider>
  );
}
