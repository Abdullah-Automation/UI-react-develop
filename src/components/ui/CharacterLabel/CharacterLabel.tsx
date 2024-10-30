import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

import { LightTooltip } from '~/components/ui';

import { Text } from '../Text';

interface CharacterLabelProps {
  count: number;
  variant?: string;
}

export const CharacterLabel = ({
  count,
  variant = 'primary',
}: CharacterLabelProps) => {
  const CharLabel = useMemo(() => {
    return (
      <Box
        sx={{
          padding: '0px 4px',
          width: 'fit-content',
          display: 'flex',
          textAlign: 'center',
          borderRadius: '4px',
          cursor: 'pointer',
          background:
            variant === 'primary' ? 'rgba(224, 225, 236, 1)' : '#E2292F',
        }}
      >
        <Text
          color={variant === 'primary' ? 'rgba(144, 144, 148, 1)' : '#FFFFFF'}
          variant='overline'
        >{`${count} chars`}</Text>
      </Box>
    );
  }, [count, variant]);

  if (variant === 'primary') {
    return CharLabel;
  }

  return (
    <LightTooltip
      placement='top-start'
      title={
        <Typography variant='caption' color='#FFFFFF' fontWeight={400}>
          We recommend that you rewrite it for better dub quality.
        </Typography>
      }
    >
      {CharLabel}
    </LightTooltip>
  );
};
