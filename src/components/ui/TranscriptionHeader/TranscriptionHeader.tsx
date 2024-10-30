import React from 'react';
import { Box } from '@mui/material';

import { Text } from '../Text';

interface TranscriptionHeaderProps {
  //   isEditPage: boolean;
  sourceLanguage: string;
  iconButton: React.ReactElement;
}

export const TranscriptionHeader = ({
  sourceLanguage,
  iconButton,
}: TranscriptionHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px 8px 40px',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        <Text color='gray' variant='h6'>
          Original
        </Text>
        <Text color='black' variant='h6'>
          {sourceLanguage}
        </Text>
      </Box>
      <Box>{iconButton}</Box>
    </Box>
  );
};
