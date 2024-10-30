import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Button } from '~/components/ui';

import {
  HeaderWrapper,
  ModalContent,
  ModalFooter,
} from '../DeleteProjectModal';
import { CreditRow } from '../PaddleCheckoutOverlay/CreditRow';

interface IConfirmCreditsModalProps {
  creditRequired: number;
  creditRemaining: number;
  successCallback: (data: any) => void;
  handleClose: (type: string) => void;
}

export const ConfirmCreditsModal = ({
  creditRequired,
  creditRemaining,
  successCallback,
  handleClose,
}: IConfirmCreditsModalProps) => {
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
        <HeaderWrapper onClick={() => handleClose(`Confirm credits modal`)}>
          <Typography variant='h4' color='#1B1B1F'>
            Credit Usage
          </Typography>
          <IconButton
            onClick={() => handleClose(`Confirm credits modal`)}
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
            Do you want to use your credits and proceed to generate this dub?
          </Typography>
        </Box>
        <Box>
          <CreditRow
            title='Credit required'
            icon='GreenCheckCircleIcon'
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
        <Button
          variant='text'
          color='secondary'
          onClick={() => handleClose(`Confirm credits modal`)}
        >
          Cancel
        </Button>
        <Button
          variant='text'
          color='secondary'
          onClick={() => successCallback('Confirm credits modal')}
        >
          Proceed
        </Button>
      </ModalFooter>
    </Dialog>
  );
};
