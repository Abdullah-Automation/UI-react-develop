import { useRef, useEffect } from 'react';

import { useCreditsHelper } from '~/utils/helpers/creditPurchase';
import { useAuth, useCurrentUserBalance } from '~/context';

export const useCheckoutSuccess = (
  successCallback: Function,
  handleClose: Function,
  setShowWaitingModal: Function
) => {
  const isHandleSuccessCalled = useRef(false);
  const { getCreditBalance } = useCreditsHelper();
  const { currentUser } = useAuth();
  const { currentUserBalance } = useCurrentUserBalance();

  useEffect(() => {
    isHandleSuccessCalled.current = false;
    return () => {
      isHandleSuccessCalled.current = false;
    };
  }, []);

  const getCreditBalanceForUser = async (userid: string) => {
    const userCreditBalance = await getCreditBalance(userid);
    return userCreditBalance;
  };

  const startPolling = async () => {
    setShowWaitingModal(true);
    const startTime = Date.now();
    const timeout = 20000; // Maximum polling duration in milliseconds
    const interval = 1000; // Polling interval in milliseconds

    while (Date.now() - startTime < timeout) {
      // eslint-disable-next-line no-await-in-loop
      const previousUserBalance = currentUserBalance;
      const userCreditBalance = await getCreditBalanceForUser(currentUser.id);
      console.log(`userCreditBalance${JSON.stringify(userCreditBalance)}`);
      if (userCreditBalance.credits !== previousUserBalance) {
        setShowWaitingModal(false);
        successCallback({ checkout: { amount: userCreditBalance } });
        handleClose();
        return;
      }

      // eslint-disable-next-line no-await-in-loop,no-promise-executor-return
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    setShowWaitingModal(false);
    console.log('Credit balance not updated in time');
  };

  const handleSuccess = () => {
    if (!isHandleSuccessCalled.current) {
      isHandleSuccessCalled.current = true;
      window.analytics.track(`Paddle Checkout Overlay success`, {});
      setTimeout(() => {
        startPolling();
      }, 100); // 2000 milliseconds = 2 seconds
    } else {
      console.log('handleSuccess has already been called');
    }
  };

  return handleSuccess;
};
