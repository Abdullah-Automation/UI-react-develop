import React from 'react';
import Image from 'next/image';
import { Box, Link, Typography } from '@mui/material';

import { AuthWrapper } from '~/containers/Auth/Login';
import { TermsOfService } from '~/components/domain';
import Logo from '~/assets/images/logo.png';

import { MobilePage } from './MobilePage';
import { AuthForm, AuthHeader, Title, Wrapper } from './Style';

interface IPagePublic {
  isMobile?: boolean;
  isLargePage?: boolean;
  title?: string;
  desc?: string;
  children: React.ReactNode;
}

export const PagePublic = ({
  isMobile = false,
  isLargePage = false,
  title = '',
  desc = '',
  children,
}: IPagePublic) => {
  return (
    <Wrapper>
      <AuthHeader>
        <Link href='/'>
          <Image src={Logo} alt='speechlab logo' width={59} height={32} />
        </Link>
      </AuthHeader>
      <AuthForm islarge={isLargePage ? 'true' : 'false'}>
        {isMobile ? (
          <MobilePage />
        ) : (
          <AuthWrapper gap='24px !important'>
            <Box>
              <Title>{title}</Title>
              <Typography
                variant='body2'
                fontWeight={400}
                color='#45464F'
                mt={2}
              >
                {desc}
              </Typography>
            </Box>

            {children}
          </AuthWrapper>
        )}
      </AuthForm>
      <TermsOfService isLargePage={isLargePage} isMobile={isMobile} />
    </Wrapper>
  );
}
