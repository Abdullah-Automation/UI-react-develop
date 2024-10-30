import { createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface ICurrentUserBalanceContextProps {
  currentUserBalance: number;
  setCurrentUserBalance: (value: number) => void;
}

export const CurrentUserBalanceContext =
  createContext<ICurrentUserBalanceContextProps>({
    currentUserBalance: 0,
    // @ts-ignore
    setCurrentUserBalance: (value: number) => {},
  });

interface ICurrentUserBalanceProviderProps {
  children: ReactNode;
}

export const CurrentUserBalanceProvider: React.FC<
  ICurrentUserBalanceProviderProps
> = ({ children }) => {
  const [currentUserBalance, setCurrentUserBalance] = useState<number>(0);

  const balanceProviderValue = useMemo(
    () => ({ currentUserBalance, setCurrentUserBalance }),
    [currentUserBalance, setCurrentUserBalance]
  );

  return (
    <CurrentUserBalanceContext.Provider value={balanceProviderValue}>
      {children}
    </CurrentUserBalanceContext.Provider>
  );
};

export const useCurrentUserBalance = (): ICurrentUserBalanceContextProps =>
  useContext(CurrentUserBalanceContext);
