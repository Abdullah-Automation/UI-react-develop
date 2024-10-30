import React from 'react';
import { Box, Typography } from '@mui/material';

import { SvgImage } from '~/components/ui';

interface ICreditRow {
  title: string;
  value: string;
  icon: any;
  border?: boolean;
}

export const CreditRow = ({ title, value, icon, border = false }: ICreditRow) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      p='10px 12px'
      borderBottom={border ? '1px solid #E0E1EC' : 'none'}
    >
      <Box display='flex' alignItems='center'>
        <SvgImage name={icon} width={20} height={20} className='icon-class' />
        <Typography ml='18px' variant='body2' color='#1B1B1F'>
          {title}
        </Typography>
      </Box>
      <Typography color='#49454F' variant='body2'>
        {value}
      </Typography>
    </Box>
  );
}
