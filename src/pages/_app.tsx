import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { UserContextProvider } from '../contexts/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
