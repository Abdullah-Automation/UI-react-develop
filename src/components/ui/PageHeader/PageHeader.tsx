import React from 'react';
import { Box } from '@mui/material';

import { Text } from '../Text';
import { SvgImage } from '../SvgImg';

interface PageHeaderProps {
  isEditPage?: boolean;
  projectName: string;
  creditBalance: React.ReactElement;
  avatarButton: React.ReactElement;
  iconButton: React.ReactElement;
  Button: React.ReactElement;
}

export const NewPageHeader = ({
  isEditPage,
  projectName,
  creditBalance,
  avatarButton,
  iconButton,
  Button,
}: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 24px 6px 32px',
      }}
    >
      {isEditPage ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginRight: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {iconButton}
            <Text color='black' variant='body1'>
              {projectName}
            </Text>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {creditBalance}
            {Button}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginRight: '16px',
          }}
        >
          <SvgImage name='LogoIcon' width={44.5} height={24} />
          {Button}
        </Box>
      )}
      {avatarButton}
    </Box>
  );
};
