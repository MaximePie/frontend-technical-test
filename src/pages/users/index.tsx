import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { User } from '../../types/user';
import Routes from '../../utils/routes';
import APIManager from '../../server/APIManager';
import UserCard from '../../components/molecules/UserCard';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(fetchUsers, []);
  return (
    <Layout>
      <>
        <h2>Welcome! Wait... who are you, yet?</h2>
        <div className="Users">
          {users.map((user) => <UserCard key={user.id} user={user} />)}
        </div>
      </>
    </Layout>
  );

  /**
   * Fetch the user's list and update the users state
   * with the retrieved results
   */
  function fetchUsers(): void {
    APIManager.getFromServer(Routes.USERS).then((response) => {
      if (response.data) {
        setUsers(response.data);
      }
    });
  }
}
