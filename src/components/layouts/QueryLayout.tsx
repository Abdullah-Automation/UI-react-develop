import React, { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type QueryLayoutProps = {
  pageProps: any;
  children: JSX.Element;
};

export const QueryLayout = ({
  children,
  pageProps,
}: QueryLayoutProps): JSX.Element | null => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
