import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import { useSegment, useTranslate } from '~/context';
import { checkValidation, getLanguageLabel } from '~/utils/helpers';
import { LightTooltip } from '~/components/ui';

import { AddDub } from './AddDub';

export const CreateFirstDub = () => {
  const { targetLang } = useTranslate();
  const { validation } = useSegment();

  return (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      mb={4}
    >
      <Box display='flex' alignItems='center' gap={1}>
        {!checkValidation(validation) && (
          <LightTooltip
            placement='top'
            title='Please resolve the time overlap before you proceed to generation.'
          >
            <ErrorIcon sx={{ color: '#C4441C', fontSize: '20px' }} />
          </LightTooltip>
        )}
        <Typography variant='h5' color='#1B1B1F'>
          Create your first dub
        </Typography>
      </Box>
      <Box width='70%'>
        <Typography variant='h6' fontWeight={400} color='#45464F'>
          To create your first dub in{' '}
          {getLanguageLabel(targetLang.toLocaleUpperCase())}, make sure you have
          reviewed the transcription and translation.
        </Typography>
      </Box>
      <AddDub />
    </Box>
  );
};
