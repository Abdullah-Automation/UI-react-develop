import React from 'react';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Text } from '../Text';
import { Button } from '../Button';

interface DubPanelProps {
  isFirstDub: boolean;
  dubOptions?: React.ReactElement; // available dubs
  video?: React.ReactElement;
  isDisabled?: boolean; // enabled or disabled
}

export const DubPanel = ({
  isFirstDub,
  dubOptions,
  //   video,
  isDisabled,
}: DubPanelProps) => {
  return (
    <Box
      sx={{
        width: '392px',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '24px 24px 24px 24px',
      }}
    >
      {isFirstDub ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            width: '240px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyItems: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              gap: '4px',
            }}
          >
            <Text color='black' variant='h5' align='center'>
              Create your first dub
            </Text>
            <Text color='black' variant='body2' align='center'>
              To create your first dub in Spanish, make sure you have reviewed
              the transcription and the translation.
            </Text>
          </Box>
          <Button
            color='secondary'
            variant='contained'
            startIcon={<AddIcon />}
            size='medium'
            onClick={() => {}}
          >
            Create
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            // alignItems: 'center',
            justifyContent: 'space-between',
            display: 'inline-flex',
            flexDirection: 'column',
            // border: '1px solid var(--sys-light-Outline-Variant, #C4C5D0)',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text color='black' variant='h6'>
                Speaker voice
              </Text>
              <Button
                color='neutral'
                variant='text'
                startIcon={<AddIcon />}
                size='small'
                onClick={() => {}}
              >
                Add dub
              </Button>
            </Box>
            {dubOptions}
          </Box>
          <Button
            disabled={isDisabled}
            color='secondary'
            onClick={() => {}}
            size='medium'
            variant='contained'
          >
            Update dub
          </Button>
        </Box>
      )}
    </Box>
  );
};
