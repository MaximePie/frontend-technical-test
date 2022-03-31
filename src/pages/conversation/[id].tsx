import React from 'react';
import { useRouter } from 'next/router';

export default function Conversation() {
  const { query } = useRouter();
  const { id } = query;
  return (
    <div className="Conversation">
      <h4>This is Conversation component</h4>
      {JSON.stringify(id)}
    </div>
  );
}
