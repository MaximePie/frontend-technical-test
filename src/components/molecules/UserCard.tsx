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
      <Avatar round="100px" className="UserCard__avatar" alt={nickname} name={nickname} src={image} />
      <h4>{nickname}</h4>
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
