import React, {
  createContext, ReactElement, useMemo, useState,
} from 'react';

interface connectedUserType {
  id: number | null,
  setId: Function
}

const userInitialValue: connectedUserType = {
  id: 1,
  setId: () => {
  },
};

export const userContext = createContext(userInitialValue);

interface UserContextProviderProps {
  children: ReactElement
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({ id: user?.id, setId: setUserId }), [user]);

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );

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
