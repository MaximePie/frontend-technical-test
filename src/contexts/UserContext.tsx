import React, {
  createContext, ReactElement, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import APIManager from '../server/APIManager';
import Routes from '../utils/routes';

interface connectedUserType {
  id: number | null,
  setId: Function,
  logout: Function
}

const userInitialValue: connectedUserType = {
  id: 1,
  setId: () => {},
  logout: () => {},
};

export const userContext = createContext(userInitialValue);

interface UserContextProviderProps {
  children: ReactElement
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({ id: user?.id, setId: setUserId, logout }), [user]);

  useEffect(() => {
    if (!user?.id && !router.pathname.includes(Routes.USERS)) {
      router.push('/');
    }
  }, [user]);

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );

  /**
   * Sets the connected user id to 0
   */
  function logout() {
    setUser({
      ...user,
      id: 0,
    });
  }

  /**
   * Set the new value of the id of the user
   * @param id - number The new value of the user Id
   */
  function setUserId(id: number | string) {
    setUser({
      ...user,
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    });
  }
}
