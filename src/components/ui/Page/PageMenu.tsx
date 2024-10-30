import React from 'react';
import { Box } from '@mui/material';

// import { ROUTES } from '~/config';

export const PageMenu = () => {
  // const router = useRouter();
  // const isDashboardPage = useMemo(() => {
  //   if ([ROUTES.DASHBOARD, '/', ''].includes(router.pathname)) {
  //     return true;
  //   }

  //   return false;
  // }, [router.pathname]);

  return (
    <Box display='flex' alignItems='center' gap={4} ml={4}>
      {/* <Typography
        variant='body2'
        color={isDashboardPage ? '#1B1B1F' : '#45464F'}
        sx={{
          cursor: 'pointer',
          fontWeight: isDashboardPage ? 600 : 500,
        }}
        onClick={() => {
          router.push(ROUTES.DASHBOARD);
        }}
      >
        Speechlab Dub
      </Typography>

      {(process.env.API_URL === 'https://api-translate-dev.speechlab.ai/v1' ||
        process.env.API_URL === 'http://localhost/v1') && (
        <Typography
          variant='body2'
          color={isDashboardPage ? '#45464F' : '#1B1B1F'}
          sx={{
            cursor: 'pointer',
            fontWeight: isDashboardPage ? 500 : 600,
          }}
          onClick={() => {
            window.analytics.track(`Voiceover Page`, {});
            router.push(ROUTES.VOICEOVER);
          }}
        >
          Speechlab Voiceover
        </Typography>
      )} */}
    </Box>
  );
}
