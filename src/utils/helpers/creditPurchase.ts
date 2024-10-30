import { useAuth, useCurrentUserBalance, useToast } from '~/context';

export function useCreditsHelper() {
  const { getCurrentUserCreditBalance, currentUser } = useAuth();
  const { showErrorToast } = useToast();

  const { currentUserBalance, setCurrentUserBalance } = useCurrentUserBalance();
  const SKUs = {
    SPEECH_TO_SPEECH: 'speech_to_speech',
    ADDITIONAL_LANGUAGE: 'additional_language',
    ADDITIONAL_ACCENT: 'additional_accent',
  };

  const skuDetails = {
    speech_to_speech: { price: 0.4 },
    additional_language: { price: 0.4 },
    additional_accent: { price: 0.4 },
  };

  const hasEnoughCredits = async (seconds: number) => {
    const minutes = Math.ceil(seconds / 60);
    const consumeCredits = calculateConsumeCredits('speech_to_speech', minutes);
    const userCreditBalance = await getCreditBalance(currentUser?.id);
    setCurrentUserBalance(userCreditBalance?.credits || 0);
    const creditBalanceResponse = {
      consumeCredits,
      userCreditBalance: userCreditBalance.credits,
      hasEnoughCredits: false,
    };
    if (userCreditBalance?.credits >= consumeCredits) {
      creditBalanceResponse.hasEnoughCredits = true;
    }
    return creditBalanceResponse;
  };

  // Function to get the price per minute for a specific SKU
  const getPricePerMinute = (sku: string) => {
    // @ts-ignore
    return skuDetails[sku]?.price || 0;
  };

  const getCreditBalance = async (userid: string) => {
    try {
      if (userid) {
        const userCreditBalance = await getCurrentUserCreditBalance(userid);
        setCurrentUserBalance(userCreditBalance?.credits || 0);
        return userCreditBalance;
      }
      return currentUserBalance;
    } catch (e) {
      showErrorToast('Getting current Credit went wrong.');
      return null;
    }
  };

  // Function to calculate the total cost for a specific SKU and duration
  const calculateCost = (sku: string, minutes: number) => {
    const pricePerMinute = getPricePerMinute(sku);
    return pricePerMinute * minutes;
  };

  const calculateConsumeCredits = (sku: string, minutes: number) => {
    const pricePerMinute = getPricePerMinute(sku);
    const cost = pricePerMinute * minutes;
    const creditsPerDollar = 1 / pricePerMinute;
    return Math.floor(cost * creditsPerDollar);
  };

  // Function to calculate the number of credits for a specific purchase amount
  const calculatePurchaseCredits = (purchaseAmount: number) => {
    const pricePerMinute = getPricePerMinute(SKUs.SPEECH_TO_SPEECH);
    const creditsPerDollar = 1 / pricePerMinute;
    return Math.floor(purchaseAmount * creditsPerDollar);
  };

  return {
    getCreditBalance,
    hasEnoughCredits,
    getPricePerMinute,
    calculateCost,
    calculateConsumeCredits,
    calculatePurchaseCredits,
  };
}
