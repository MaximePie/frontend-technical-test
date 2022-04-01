import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';
import { User } from '../../types/user';
import Routes from '../../utils/routes';
import { userContext } from '../../contexts/UserContext';

interface UserCardProps {
  user: User,
}

export default function UserCard({ user }: UserCardProps) {
  const { id, nickname, image } = user;
  const { setId: setLoggedInUserId } = useContext(userContext);
  const router = useRouter();

  return (
    <div className="UserCard">
      <Avatar alt={nickname} name={nickname} src={image} />
      <button type="button" className="UserCard__login" onClick={loginAsUser}>Se connecter</button>
    </div>
  );

  /**
   * Connect as the selected user and redirect
   * to its conversations page
   */
  function loginAsUser(): void {
    setLoggedInUserId(id);
    router.push(Routes.CONVERSATIONS);
  }
}
