import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import { paddleProductId } from '~/config';
import { useAuth, useCurrentUserBalance } from '~/context';
import { CustomAvatar } from '~/components/ui';
import { useCheckoutSuccess } from '~/utils/hooks';

import { WaitingModal } from './Style';

interface IUserMenu {
  isEditPage?: boolean;
  anchorElUser: null | HTMLElement;
  setAnchorElUser: (val: null | HTMLElement) => void;
}

export const UserMenu = ({
  isEditPage,
  anchorElUser,
  setAnchorElUser,
}: IUserMenu) => {
  const { logOut, currentUser } = useAuth();
  const { currentUserBalance } = useCurrentUserBalance();

  const [showWaitingModal, setShowWaitingModal] = useState(false);

  const handleCloseUserMenu = (setting: string) => {
    if (setting === 'Logout') {
      logOut();
    }

    setAnchorElUser(null);
  };

  const handleClose = () => {};

  const handlePayOnlySuccess = () => {};

  const handleSuccess = useCheckoutSuccess(
    handlePayOnlySuccess,
    handleClose,
    setShowWaitingModal
  );

  const handleCheckout = () => {
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        product: paddleProductId.toString(),
        email: currentUser.email,
        successCallback: handleSuccess,
        closeCallback: handleClose,
      });
      window.analytics.track(`Paddle checkout`, {
        product: paddleProductId.toString(),
        email: currentUser.email,
      });
    }
  };

  return (
    <>
      <Menu
        sx={{ mt: '28px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          disableRipple
          sx={{
            width: '290px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '&:hover': {
              background: '#fff',
            },
            '&:active': {
              background: '#fff',
            },
            '&:focus': {
              background: '#fff',
            },
          }}
        >
          {!isEditPage && (
            <Typography variant='caption' color='#49454F'>
              {currentUser?.email || ''}
            </Typography>
          )}
          <Box display='flex' alignItems='center' mt={isEditPage ? 0 : '4px'}>
            <CustomAvatar letter={currentUser?.firstName.charAt(0) || ''} />
            <Box ml={2} py='6px'>
              <Typography variant='body1' color='#1B1B1F'>
                {`${currentUser?.firstName || ''} ${
                  currentUser?.lastName || ''
                }`}
              </Typography>
              <Box display='flex' alignItems='center'>
                <Typography variant='subtitle2' color='#45464F'>
                  Credits
                </Typography>
                <Typography
                  variant='subtitle2'
                  color='#45464F'
                  sx={{ px: '3px' }}
                >
                  ・
                </Typography>
                <Typography variant='subtitle2' color='#45464F'>
                  {`${currentUserBalance}m`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </MenuItem>
        {isEditPage && (
          <MenuItem sx={{ width: '290px' }} onClick={handleCheckout}>
            <CreditCardIcon sx={{ color: '#000000', fontSize: '18px' }} />
            <Typography variant='body2' color='#1B1B1F' sx={{ ml: '16px' }}>
              Buy more credits
            </Typography>
          </MenuItem>
        )}
        <Divider sx={{ my: '5.5px !important' }} />
        <MenuItem
          sx={{ width: '290px' }}
          onClick={() => handleCloseUserMenu('Logout')}
        >
          <LogoutIcon sx={{ color: '#000000', fontSize: '18px' }} />
          <Typography variant='body2' color='#1B1B1F' margin='0 0 0 16px'>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      {showWaitingModal && (
        <WaitingModal>
          <Typography variant='body1'>
            Waiting for Credits to Arrive in Account...
          </Typography>
        </WaitingModal>
      )}
    </>
  );
};
