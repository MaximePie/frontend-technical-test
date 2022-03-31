import React from 'react';
import Head from 'next/head';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from '../styles/Home.module.scss';
import Conversations from './Conversations';
import Conversation from './conversation/[id]';

function Home() {
  const year = new Date().getFullYear();

  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Head>
          <title>Frontend Technical test - Leboncoin</title>
          <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
        </Head>
        <Routes>
          <Route element={<Conversation />} path="/conversation/:id" />
          <Route element={<Conversations />} path="/a" />
        </Routes>
        <footer className={styles.footer}>
          &copy; leboncoin -
          {' '}
          {year}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default Home;
