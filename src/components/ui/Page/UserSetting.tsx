import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { useAuth } from '~/context';
import { paddleProductId, paddleSandbox, paddleVendorId } from '~/config';
import { CustomAvatar, Button } from '~/components/ui';

import { UserMenu } from './UserMenu';
import { UserSettingWrapper } from './Style';

interface IUserSetting {
  isEditPage?: boolean;
}

export const UserSetting = ({ isEditPage }: IUserSetting) => {
  const { currentUser } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    script.async = true;

    script.onload = () => {
      if (window.Paddle) {
        window.Paddle.Setup({ vendor: paddleVendorId });
        if (paddleSandbox) {
          window.Paddle.Environment.set('sandbox');
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    window.analytics.track(`Profile icon clicked`, {});
  };

  const handleCheckout = () => {
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        product: paddleProductId.toString(),
        email: currentUser.email,
        successCallback: () => {},
        closeCallback: () => {},
      });
      window.analytics.track(`Paddle checkout`, {
        product: paddleProductId.toString(),
        email: currentUser.email,
      });
    }
  };

  return (
    <Box
      sx={{
        display: { md: 'flex' },
        ml: isEditPage ? 1.25 : 0,
        alignItems: 'center',
      }}
    >
      {!isEditPage && (
        <Button
          size='small'
          variant='outlined'
          color='neutral'
          sx={{ mr: 2 }}
          startIcon={<CreditCardIcon />}
          onClick={handleCheckout}
        >
          Get more credits
        </Button>
      )}
      <Tooltip title='Open settings'>
        <UserSettingWrapper
          iseditpage={isEditPage ? 'true' : 'false'}
          anchor={anchorElUser}
          onClick={handleOpenUserMenu}
        >
          <CustomAvatar letter={currentUser?.firstName.charAt(0) || ''} />
        </UserSettingWrapper>
      </Tooltip>
      <UserMenu
        isEditPage={isEditPage}
        anchorElUser={anchorElUser}
        setAnchorElUser={(val: null | HTMLElement) => setAnchorElUser(val)}
      />
    </Box>
  );
};
