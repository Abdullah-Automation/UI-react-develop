import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '~/context';
import { Button } from '~/components/ui';
import { useCheckoutSuccess } from '~/utils/hooks/useCheckoutSuccess';

import {
  HeaderWrapper,
  ModalContent,
  ModalFooter,
} from '../DeleteProjectModal';

import { CreditRow } from './CreditRow';

interface IPaddleCheckoutOverlayProps {
  productId: string;
  creditRequired: number;
  creditRemaining: number;
  successCallback: (data: any) => void;
  handleClose: () => void;
}

declare global {
  interface Window {
    Paddle: any;
  }
}

export const PaddleCheckoutOverlay = ({
  productId,
  creditRequired,
  creditRemaining,
  successCallback,
  handleClose,
}: IPaddleCheckoutOverlayProps) => {
  const checkoutContainer = useRef(null);
  const isHandleSuccessCalled = useRef(false);
  const { currentUser } = useAuth();
  const [showWaitingModal, setShowWaitingModal] = useState(false);

  const handleSuccess = useCheckoutSuccess(
    successCallback,
    handleClose,
    setShowWaitingModal
  );

  const handleCheckout = () => {
    console.log('handleCheckout called');
    if (window.Paddle) {
      console.log('Opening new Paddle checkout modal');
      window.Paddle.Checkout.open({
        product: productId,
        email: currentUser.email,
        successCallback: handleSuccess,
        closeCallback: handleClose,
      });
      window.analytics.track(`Paddle checkout`, {
        product: productId,
        email: currentUser.email,
      });
    }
  };

  // This effect will run only when the component mounts
  useEffect(() => {
    // Reset the flag when the component mounts
    isHandleSuccessCalled.current = false;

    // Optional: You can also reset the flag when the component unmounts
    return () => {
      isHandleSuccessCalled.current = false;
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      onClose={handleClose}
      open
      sx={{
        width: 390,
        margin: 'auto',
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 2 }}>
        <HeaderWrapper onClick={handleClose}>
          <Typography variant='h4' color='#1B1B1F'>
            Credit Usage
          </Typography>
          <IconButton
            onClick={handleClose}
            title='Close Purchase Credits Popup'
            aria-label='Close Purchase Credits Popup'
            sx={{
              position: 'absolute',
              right: 10,
              top: 16,
              color: '#8C8E99',
            }}
          >
            <CloseIcon />
          </IconButton>
        </HeaderWrapper>
      </DialogTitle>
      <ModalContent>
        <Box mb={3}>
          <Typography variant='body2' color='#45464F'>
            You do not have enough credits to generate this dub. Please purchase
            more credits to proceed.
          </Typography>
        </Box>
        <Box>
          <CreditRow
            title='Credit required'
            icon='AlertRedIcon'
            value={`${creditRequired}m`}
            border
          />
          <CreditRow
            title='Credit Remaining'
            icon='DiamondIcon'
            value={`${creditRemaining}m`}
          />
        </Box>
      </ModalContent>
      <ModalFooter>
        <Button variant='text' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='text' color='secondary' onClick={handleCheckout}>
          Purchase
        </Button>
      </ModalFooter>
      {showWaitingModal && (
        <WaitingModal>
          <Typography variant='body1'>
            Waiting for Credits to Arrive in Account...
          </Typography>
        </WaitingModal>
      )}
      <div ref={checkoutContainer} />
    </Dialog>
  );
};

const WaitingModal = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  border: 2px solid #b30000; /* Added border style */
`;
