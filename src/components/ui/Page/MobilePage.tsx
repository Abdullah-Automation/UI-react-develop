import React from 'react';
import { Box, Typography } from '@mui/material';

export const MobilePage = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      width='290px'
      mt='-180px'
      gap='16px'
    >
      <Typography variant='h4' textAlign='center'>
        Uh-oh! Looks like you are using a mobile device
      </Typography>
      <Typography
        variant='body2'
        fontWeight={400}
        textAlign='center'
        color='#45464F'
      >
        We built Speechlab to be viewed on desktop, so we suggest visiting the
        platform on a different and bigger device.
      </Typography>
    </Box>
  );
};
