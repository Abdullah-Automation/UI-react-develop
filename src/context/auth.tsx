import React, { useContext, createContext } from 'react';

import {
  useProvideAuth,
  UseProvideAuthType,
} from '~/utils/hooks/useProvideAuth';

interface IAuthProvider {
  children: React.ReactNode;
}

const authContext = createContext<UseProvideAuthType>({} as UseProvideAuthType);

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = (): UseProvideAuthType => useContext(authContext);
