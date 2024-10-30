import React from 'react';
import { Box } from '@mui/material';

import { Text } from '../Text';

interface TranslationHeaderProps {
  selectedMenu: React.ReactElement;
  iconButtons: React.ReactElement[];
}

export const TranslationHeader = ({
  selectedMenu,
  iconButtons,
}: TranslationHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 16px 0px 24px',
        height: '48px',
      }}
    >
      <Box sx={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
        <Text color='gray' variant='h6'>
          Target
        </Text>
        {selectedMenu}
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          gap: '8px',
        }}
      >
        {iconButtons.map(
          item =>
            // eslint-disable-next-line react/no-array-index-key
            item
        )}
      </Box>
    </Box>
  );
};
