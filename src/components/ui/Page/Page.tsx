import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { ROUTES } from '~/config';
import { useCreditsHelper } from '~/utils/helpers/creditPurchase';
import { useAuth, useCurrentUserBalance } from '~/context';
import { useViewportSizing } from '~/utils/hooks';

import { PageHeader } from './PageHeader';
import { PageContent, Wrapper } from './Style';
import { PagePublic } from './PagePublic';

interface IPage {
  isPrivate?: boolean;
  isEditPage?: boolean;
  isLargePage?: boolean;
  title?: string;
  desc?: string;
  children: React.ReactNode;
}

export const Page = ({
  isPrivate = false,
  isEditPage = false,
  isLargePage = false,
  title = '',
  desc = '',
  children,
}: IPage) => {
  const router = useRouter();
  const { checkingUser, currentUser } = useAuth();
  const { isMobile } = useViewportSizing();
  const { getCreditBalance } = useCreditsHelper();
  const [ready, setReady] = useState<boolean>(false);
  // TODO: need to update redirection since login page is loaded first.
  const { setCurrentUserBalance } = useCurrentUserBalance();
  function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
  }

  useEffect(() => {
    const initPage = () => {
      if (!checkingUser && isPrivate) {
        const loginPath = `/login?from=${encodeURIComponent(getURL())}`;
        router.push(loginPath);
      }

      if (checkingUser && isPrivate === false) {
        const entryURL = router.query.from;
        if (entryURL === ROUTES.LOGIN) {
          router.push(ROUTES.DASHBOARD);
        } else if (
          (router.pathname === ROUTES.PRIVACYPOLICY ||
            router.pathname === ROUTES.TERMSOFSERVICE) === false
        ) {
          router.push(
            (entryURL && decodeURIComponent(entryURL as string)) ??
              ROUTES.DASHBOARD
          );
        }
      }

      setReady(true);
    };
    initPage();
  }, [checkingUser, isPrivate, router]);

  useEffect(() => {
    if (currentUser) {
      const fetchCreditBalance = async () => {
        const balance = await getCreditBalance(currentUser.id);
        setCurrentUserBalance(balance?.credits || 0);
      };

      fetchCreditBalance();
    }
  }, [currentUser, getCreditBalance, setCurrentUserBalance]);

  if (!ready) {
    return null;
  }

  if (!isPrivate) {
    return (
      <PagePublic
        isMobile={isMobile}
        isLargePage={isLargePage}
        title={title}
        desc={desc}
      >
        {children}{' '}
      </PagePublic>
    );
  }

  return (
    <Wrapper>
      <PageHeader isEditPage={isEditPage} />
      <PageContent iseditpage={isEditPage ? 'true' : 'false'}>
        {children}
      </PageContent>
    </Wrapper>
  );
};
