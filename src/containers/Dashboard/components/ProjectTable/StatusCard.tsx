import { Box, Typography } from '@mui/material';

interface IStatusCard {
  title: string;
  variant?: string;
}

export const StatusCard = ({ title, variant = 'primary' }: IStatusCard) => {
  return (
    <Box
      display='flex'
      width='fit-content'
      p='4px 10px 4px 10px'
      sx={{
        borderRadius: '8px',
        background:
          variant === 'primary'
            ? '#BAD7E7'
            : variant === 'secondary'
            ? '#FCD5C8'
            : variant === 'success'
            ? '#79D46E5C'
            : '#FCD5C8',
      }}
    >
      <Typography
        variant='caption'
        color={
          variant === 'primary'
            ? '#1B1B1F'
            : variant === 'secondary'
            ? '#1B1B1F'
            : variant === 'success'
            ? '#1B1B1F'
            : '#642A17'
        }
      >
        {title}
      </Typography>
    </Box>
  );
};
