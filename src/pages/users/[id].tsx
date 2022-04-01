import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/layout';

export default function User() {
  const { query } = useRouter();
  const { id } = query;
  console.log(id);

  return (
    <Layout>
      <p>Haha</p>
    </Layout>
  );
}
