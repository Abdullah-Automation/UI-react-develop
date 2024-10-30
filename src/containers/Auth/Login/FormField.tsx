import { styled } from '@mui/styles';
import { Box, Typography, InputLabel } from '@mui/material';

interface IFormField {
  title?: string;
  children: React.ReactNode;
}

export const FormField = ({ title, children }: IFormField) => {
  return (
    <Box width='100%'>
      <FormLabel>{title}</FormLabel>
      {children}
    </Box>
  );
};

export const AuthWrapper = styled(Box)({
  width: '348px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

export const FormLabel = styled(InputLabel)({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: '#1B1B1F',
  marginBottom: '8px',
});

export const FormLink = styled(Typography)({
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: '#3A4ADE',
  '&:hover': {
    cursor: 'pointer',
  },
});
