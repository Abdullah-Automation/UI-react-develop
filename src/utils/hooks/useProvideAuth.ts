import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';

import { ROUTES, USER_TOKEN } from '~/config';
import { AuthApi, IAuthForm, UsersApi } from '~/api';
import { trackUserIdentify } from '~/utils/helpers/track';

import { useLocalStorage } from './useLocalStorage';

export type UseProvideAuthType = {
  loading: boolean;
  error: string;
  handleLogin: (data: IAuthForm) => void;
  checkingUser: boolean;
  logOut: (url?: string) => void;
  currentUser: any | null;
  currentUserCreditBalance: number | 0;
  getCurrentUserCreditBalance: (userId: string) => Promise<any | number>;
};

export const useProvideAuth = (): UseProvideAuthType => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserCreditBalance, setCurrentUserCreditBalance] = useState<
    number | 0
  >(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [savedAuthToken, savedAuthTokenToLocalstorage] = useLocalStorage(
    USER_TOKEN,
    null
  );
  const [checkingUser, setCheckingUser] = useState<boolean>(!!savedAuthToken);

  const router = useRouter();

  const getCurrentUser = async (userId: string): Promise<any | null> => {
    try {
      if (!userId) {
        setCurrentUser(null);
        return null;
      }

      const result = await AuthApi.getUser(userId);
      setCurrentUser(result);
      return result;
    } catch (err: any) {
      setCheckingUser(false);
      return null;
    }
  };

  const getCurrentUserCreditBalance = async (
    userId: string
  ): Promise<any | number> => {
    try {
      if (!userId) {
        setCurrentUserCreditBalance(0);
        return;
      }

      const result = await UsersApi.getUserCreditBalanceById(userId);
      setCurrentUserCreditBalance(result.credits);
      return result;
    } catch (err: any) {}
  };

  const handleLogin = async ({ email, password }: IAuthForm) => {
    setLoading(true);
    setError('');
    try {
      const result = await AuthApi.login({
        email,
        password,
      });

      savedAuthTokenToLocalstorage(result);
      const currUser = await getCurrentUser(result.user.id);
      await getCurrentUserCreditBalance(result.user.id);
      trackUserIdentify({ id: result.user.id, email });
      setLoading(false);
      setError('');

      if (currUser) {
        setCheckingUser(true);
        Sentry.configureScope(scope => {
          scope.setUser({
            id: result.user.id,
            email,
            // You can also include other user attributes
          });
        });

        let entryURL = router.query.from;
        if (entryURL === '/login') entryURL = '';
        router.push(
          (entryURL && decodeURIComponent(entryURL as string)) ??
            ROUTES.DASHBOARD
        );
      }
    } catch (err: any) {
      console.log('login error: ', err);
      setError(err?.response?.data?.message || 'Login is failed!');
      savedAuthTokenToLocalstorage(null);
      setCheckingUser(false);
    }
    setLoading(false);
  };

  const logOut = async (logOutUrl: string = ROUTES.LOGIN) => {
    setLoading(true);

    function clearUserState() {
      savedAuthTokenToLocalstorage(null);
      setCurrentUser(null);
      setCheckingUser(false);
      router.push(logOutUrl);
    }

    try {
      await AuthApi.logout({
        tokens: {
          idToken: savedAuthToken.tokens.idToken.jwtToken,
          refreshToken: savedAuthToken.tokens.refreshToken.token,
        },
      });
      clearUserState();
    } catch (err) {
      console.log('logout failed: ', err);
      clearUserState();
    }
    setLoading(false);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        if (savedAuthToken.user.id) {
          await getCurrentUser(savedAuthToken.user.id);
        } else {
          savedAuthTokenToLocalstorage(null);
        }
      } catch (error) {
        savedAuthTokenToLocalstorage(null);
        setCheckingUser(false);
      }
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    handleLogin,
    checkingUser,
    logOut,
    currentUser,
    currentUserCreditBalance,
    getCurrentUserCreditBalance,
  };
};
