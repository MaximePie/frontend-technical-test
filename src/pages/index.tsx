import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Conversations from './Conversations';

function Home() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>
      <Conversations />
      <footer className={styles.footer}>
        &copy; leboncoin -
        {' '}
        {year}
      </footer>
    </div>
  );
}

export default Home;
