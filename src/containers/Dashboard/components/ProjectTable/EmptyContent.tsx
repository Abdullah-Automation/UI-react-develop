import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import TranslateImg from '~/assets/images/dub_onboard.png';

export const EmptyContent = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      p='36px 0'
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Image src={TranslateImg} width={142} height={137} />
        <Typography variant='h5' color='#1B1B1F' mt={3}>
          Make Your Content Globally Accessible
        </Typography>
        <Typography variant='body2' color='#5D5E66' mb={3}>
          Speechlab empowers publishers and creators to expand reach globally
        </Typography>
      </Box>
    </Box>
  );
}
