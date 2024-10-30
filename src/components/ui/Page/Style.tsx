import { Box, styled, Typography, AppBar } from '@mui/material';

export const Wrapper = styled(Box)({
  position: 'relative',
  background: '#FFFFFF',
  height: '100%',
});

export const AuthHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '42px 0',
});

export const PageContent = styled(Box)<{ iseditpage?: string }>(
  ({ iseditpage }) => ({
    position: 'relative',
    padding: iseditpage === 'true' ? 0 : '0 24px 0 32px',
    background: '#fff',
    marginTop: iseditpage === 'true' ? '48px' : '0',
  })
);

export const AuthForm = styled(Box)<{ islarge?: string }>(({ islarge }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '40px',
  height: islarge === 'true' ? '100%' : 'calc(100vh - 160px)',
  paddingBottom: islarge === 'true' ? '216px' : '0px',
}));

export const Title = styled(Typography)({
  fontWeight: 600,
  fontSize: '26px',
  lineHeight: '44px',
  letterSpacing: '0px',
  color: '#000000',
  width: '100%',
  textAlign: 'center',
});

export const Header = styled(AppBar)<{ iseditpage?: string }>(
  ({ iseditpage = 'false' }) => ({
    background: '#FFF',
    borderBottom: iseditpage === 'true' ? '0' : '1px solid #E0E1EC',
    boxShadow: 'none',
    padding: '0 24px 0 32px',
  })
);

export const WaitingModal = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  border: 2px solid #b30000; /* Added border style */
`;

export const UserSettingWrapper = styled(Box)<{
  anchor: null | HTMLElement;
  iseditpage?: string;
}>(({ anchor = null, iseditpage = 'false' }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: iseditpage === 'true' ? '4px' : '10px',
  padding: '6px',
  borderRadius: '32px',
  background: anchor ? 'rgba(69, 70, 79, 0.08)' : 'inherit',
  '&:hover': {
    cursor: 'pointer',
    background: 'rgba(69, 70, 79, 0.08)',
  },
}));
