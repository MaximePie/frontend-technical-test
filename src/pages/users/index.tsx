import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/layout';
import { User } from '../../types/user';
import Routes from '../../utils/routes';
import APIManager from '../../server/APIManager';
import UserCard from '../../components/molecules/UserCard';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  useEffect(fetchUsers, []);
  return (
    <Layout>
      <>
        <h2 className="Users__header">Welcome! Wait... who are you, yet?</h2>
        <div className="Users">
          {users.map((user) => <UserCard key={user.id} user={user} actionText="Login" />)}
          {!isLoading && !users.length && (
            <div>
              <p>There are no User for the moment.</p>
              <button onClick={createUsers}>Create 4 users</button>
            </div>
          )}
        </div>
      </>
    </Layout>
  );

  /**
   * Will call the database to create more users
   * and refresh the content
   */
  function createUsers() {
    APIManager.getFromServer(Routes.CREATE_USERS).then(fetchUsers);
  }

  /**
   * Fetch the user's list and update the users state
   * with the retrieved results
   */
  function fetchUsers(): void {
    setLoadingState(true);
    APIManager.getFromServer(Routes.USERS).then((response) => {
      setLoadingState(false);
      if (response.data) {
        setUsers(response.data);
      }
    });
  }
}
