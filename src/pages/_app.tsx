import React from 'react';
import type { AppProps } from 'next/app';
import { getLoggedUserId } from '../utils/getLoggedUserId';
import '../styles/globals.scss';

// Default way to get a logged user
export const loggedUserId = getLoggedUserId();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
