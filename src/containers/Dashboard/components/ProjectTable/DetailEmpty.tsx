import { Box, Typography } from '@mui/material';

interface IDetailEmpty {
  onRedirect: () => void;
}

export const DetailEmpty = ({ onRedirect }: IDetailEmpty) => {
  return (
    <Box display='flex' alignItems='center' p='10px 10px 10px 96px'>
      <Typography variant='h6' color='#909094'>
        You do not have any dub for this project yet. Click &nbsp;
      </Typography>
      <Typography
        variant='h6'
        color='#832AD0'
        sx={{ cursor: 'pointer' }}
        onClick={onRedirect}
      >
        here &nbsp;
      </Typography>
      <Typography variant='h6' color='#909094'>
        to create your first dub.
      </Typography>
    </Box>
  );
}
