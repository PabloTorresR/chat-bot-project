import { WithChildren } from '@chat-app/types/with-children';
import React from 'react';

import { createContext } from 'use-context-selector';
import { useAuthManager } from '../hooks/auth-manager';

const useContextData = () => {
  const { user, ...authManager } = useAuthManager();

  return {
    authManager,
    user,
  };
};

type TContext = ReturnType<typeof useContextData>;

export const UserContext = createContext<TContext | undefined>(undefined);

export const UserProvider = ({ children }: WithChildren) => {
  const data = useContextData();

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
