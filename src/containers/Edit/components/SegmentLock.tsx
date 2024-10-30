import React from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';

import { SvgImage, LightTooltip } from '~/components/ui';

interface ISegmentLock {
  type?: 'lock' | 'loading';
  content: string;
  onTextLockChange: (content: string) => void;
}

export const SegmentLock = ({
  type = 'lock',
  content,
  onTextLockChange,
}: ISegmentLock) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 6,
        right: 6,
      }}
    >
      {type === 'loading' ? (
        <LoadingSegment />
      ) : (
        <LightTooltip
          placement='bottom-start'
          title={`Auto-sync is off. Click here to turn on the sync again. `}
          onClick={() => onTextLockChange(content)}
        >
          <IconButton size='small' color='secondary'>
            <SvgImage name='LockSegmentIcon' width={16} height={16} />
          </IconButton>
        </LightTooltip>
      )}
    </Box>
  );
};

export const LoadingSegment = () => {
  return (
    <IconButton
      size='small'
      sx={{
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <CircularProgress sx={{ color: '#7F32DA' }} size={16} />
    </IconButton>
  );
};
