import { styled } from '@mui/styles';
import { Box, Typography, Container } from '@mui/material';

export const Wrapper = styled(Container)({
  marginTop: '30px',
  paddingBottom: '56px',
});

export const Title = styled(Typography)({
  fontWeight: 800,
  fontSize: '18px',
  color: '#000000',
});

export const SubTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: '12px',
  color: '#8C8E99',
});

export const Desc = styled(Typography)({
  fontWeight: 500,
  fontSize: '16px',
  color: '#8C8E99',
});

export const Block = styled(Box)({
  fontWeight: 500,
  fontSize: '14px',
  color: '#000000',
  marginBottom: '24px',
});

export const BlockTitle = styled(Typography)({
  fontWeight: 800,
  fontSize: '16px',
  color: '#000000',
  marginBottom: '16px',
});

export const FormLink = styled(Typography)({
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '16px',
  color: '#3E56F6',
  '&:hover': {
    cursor: 'pointer',
  },
});

export const FormLinkSmall = styled(Typography)({
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '14px',
  color: '#3E56F6',
  '&:hover': {
    cursor: 'pointer',
  },
});
