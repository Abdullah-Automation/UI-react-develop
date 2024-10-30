import { styled } from '@mui/styles';
import { Box, Typography } from '@mui/material';

interface IProps {
  isMobile?: boolean;
  isLargePage: boolean;
}

export const TermsOfService = ({ isMobile, isLargePage = false }: IProps) => {
  return (
    <Box
      sx={{
        position: isLargePage ? 'relative' : 'absolute',
        pb: isLargePage ? '24px' : '0',
        bottom: isLargePage ? 0 : '24px',
        width: isMobile ? 'auto' : '500px',
        left: '50%',
        transform: 'translate(-50%, 0px)',
      }}
    >
      <Wrapper>
        <a
          href='https://www.speechlab.ai/terms-of-service'
          target='_blank'
          rel='noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <FormLink variant='subtitle2'>Terms of Service</FormLink>
        </a>
        <a
          href='https://www.speechlab.ai/privacy-policy'
          target='_blank'
          rel='noreferrer'
          style={{ textDecoration: 'none' }}
        >
          <FormLink variant='subtitle2'>Privacy Policy</FormLink>
        </a>
      </Wrapper>
    </Box>
  );
}

const Wrapper = styled(Box)({
  borderTop: '1px solid #E0E1EC',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
  width: '100%',
  paddingTop: '24px',
});

const FormLink = styled(Typography)({
  textDecoration: 'none',
  color: '#000000',
  whiteSpace: 'nowrap',
  '&:hover': {
    cursor: 'pointer',
  },
});
