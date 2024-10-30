import React from 'react';
import { Box, Dialog, Typography } from '@mui/material';

import { Button } from '~/components/ui';
import { HeaderWrapper, ModalFooter, ModalTitle } from '~/components/domain';

import { ModalContent } from '../DeleteProjectModal';

interface IWarnMsgModalProps {
  open: boolean;
  type?: string;
  onBack: () => void;
  onContinue: () => void;
}

export const WarnMsgModal = ({
  open,
  type = 'translation',
  onContinue,
  onBack,
}: IWarnMsgModalProps) => {
  return (
    <Dialog fullScreen={false} maxWidth='xs' onClose={() => {}} open={open}>
      <ModalTitle isLargeSpacing onClose={onBack}>
        <HeaderWrapper onClick={() => {}}>
          <Typography variant='h5' color='#1B1B1F'>
            Reminder
          </Typography>
        </HeaderWrapper>
      </ModalTitle>
      <ModalContent sx={{ pb: 3 }}>
        <Typography variant='body2' color='#45464F'>
          {type === 'translation'
            ? `Please make sure that you have fully review the transcription before
          you proceed to translation. You can still make edits to your
          transcription after you have the translation, but that will overwrite
          your existing translation. Do you want to continue?`
            : `Please note that making edits to your transcription will overwrite your previous editing efforts to the translation. Do you still want to continue?`}
        </Typography>
      </ModalContent>
      <ModalFooter>
        <Box>
          <Button color='secondary' sx={{ width: '100%' }} onClick={onContinue}>
            {type === 'translation'
              ? `Yes, continue to translate`
              : `Yes, continue to edit transcription`}
          </Button>

          <Button
            color='secondary'
            variant='outlined'
            sx={{ width: '100%', mt: 1 }}
            onClick={onBack}
          >
            {type === 'translation'
              ? `No, go back to transcription`
              : `No, return to project page`}
          </Button>
        </Box>
      </ModalFooter>
    </Dialog>
  );
};
