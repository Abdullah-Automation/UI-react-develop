import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Button } from '~/components/ui';
import { HeaderWrapper, ModalFooter, ModalTitle } from '~/components/domain';

interface IAddVoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export const AddVoiceModal = ({ open, onClose }: IAddVoiceModalProps) => {
  const [isJoined, setIsJoined] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
  };

  const handleJoinWaitlist = () => {
    setIsJoined(!isJoined);
  };

  return (
    <Dialog fullScreen={false} maxWidth='xs' onClose={() => {}} open={open}>
      <ModalTitle isLargeSpacing>
        <HeaderWrapper onClick={() => {}}>
          <Typography
            variant='h4'
            color='#1B1B1F'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              px: 2,
            }}
          >
            Coming soon
          </Typography>
        </HeaderWrapper>
      </ModalTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box px='16px'>
          <Typography variant='subtitle2' color='#45464F'>
            Join our waitlist for Composite Voices where you can customize a
            desired synthesized voice!
          </Typography>
          <Button
            color='tertiary'
            sx={{ mt: 3 }}
            variant='outlined'
            startIcon={
              isJoined ? (
                <CheckCircleIcon sx={{ fontSize: 18 }} />
              ) : (
                <AvTimerIcon sx={{ fontSize: 18 }} />
              )
            }
            onClick={handleJoinWaitlist}
          >
            Join our waitlist
          </Button>
        </Box>
      </DialogContent>
      <ModalFooter>
        <Button
          color='tertiary'
          sx={{ width: '100%', mx: 2 }}
          onClick={handleClose}
        >
          Back to dashboard
        </Button>
      </ModalFooter>
    </Dialog>
  );
};
