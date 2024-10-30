import React from 'react';
import { Box } from '@mui/material';

import { Text } from '../Text';

interface CreditBalanceProps {
  balance: string;
}

export const CreditBalance = ({ balance }: CreditBalanceProps) => {
  return (
    <Box>
      <Text color='black' variant='subtitle2'>
        Credit Balance
      </Text>
      <Text color='black' variant='h6'>{`${balance} min`}</Text>
    </Box>
  );
};
