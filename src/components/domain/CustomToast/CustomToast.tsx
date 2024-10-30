import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { lightModeColors } from '~/config/theme/colors';
import { Button } from '~/components/ui';

interface IProps {
  message: string;
  variant?: string;
  loading?: boolean;
  disabled?: boolean;
  isCenter?: boolean;
  onUpdate?: () => void;
  onClose: () => void;
  type?: 'Dismiss' | 'Alert';
}

export const CustomToast = ({
  message,
  variant = 'primary',
  isCenter = false,
  loading = false,
  disabled = false,
  onUpdate,
  onClose,
  type = 'Alert',
}: IProps) => {
  if (type === 'Dismiss') {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          p: '8px 8px 8px 16px',
          backgroundColor:
            variant === 'primary' ? lightModeColors.purple90 : '#E7FBF9',
        }}
      >
        <Typography
          variant='subtitle2'
          color='#1B1B1F'
          sx={{
            width: isCenter ? '100%' : 'inherit',
            textAlign: isCenter ? 'center' : 'inherit',
          }}
        >
          {message}
        </Typography>
        <Box display='flex' alignItems='center' gap={0.25}>
          <Button
            size='small'
            variant='contained'
            sx={{ width: '63px' }}
            color={variant === 'primary' ? 'secondary' : 'tertiary'}
            loading={loading}
            disabled={disabled}
            onClick={onUpdate}
          >
            Update
          </Button>
          <Button
            size='small'
            variant='text'
            color={variant === 'primary' ? 'secondary' : 'tertiary'}
            disabled={disabled}
            onClick={onClose}
          >
            Dismiss
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box position='absolute' bottom='24px' right='24px'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          p: '14px 6px 14px 16px',
          minWidth: '344px',
          backgroundColor: lightModeColors.purple90,
          boxShadow:
            '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
        }}
      >
        <Typography variant='body2' color='#1B1B1F'>
          {message}
        </Typography>
        <IconButton
          sx={{ p: 0, width: 14, height: 14, mr: 2 }}
          onClick={onClose}
        >
          <CloseIcon
            sx={{
              color: '#1B1B1F',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
