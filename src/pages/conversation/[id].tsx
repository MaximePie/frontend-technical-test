import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layouts/layout';

export default function Conversation() {
  const { query } = useRouter();
  const { id } = query;
  return (
    <Layout>
      <div className="Conversation">
        <h4>This is Conversation component</h4>
        {JSON.stringify(id)}
      </div>
    </Layout>
  );
}
