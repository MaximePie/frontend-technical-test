import Head from 'next/head';
import React from 'react';
import styles from '../../styles/Home.module.scss';

type LayoutProps = {
  children: JSX.Element,
}

export default function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>
      {children}
      <footer className="Footer">
        &copy; leboncoin -
        {' '}
        {year}
      </footer>
    </div>
  );
}
