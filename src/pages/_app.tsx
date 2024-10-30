import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import * as snippet from '@segment/snippet';
import Script from 'next/script';
import { useRouter } from 'next/router';

import { SegmentProvider } from '~/context/SegmentContext';
import { createEmotionCache } from '~/utils/helpers';
import {
  AuthProvider,
  ToastAlertProvider,
  TranslateProvider,
  SpeakersProvider,
  ExportProvider,
  DebugContext,
  VoiceoverProvider,
  VideoPlayerProvider,
  TranscribeProvider,
} from '~/context';
import { theme } from '~/config';
import { QueryLayout } from '~/components/layouts';
import '~/assets/scss/global.css';
import { CurrentUserBalanceProvider } from '~/context/currentUserBalance';

const clientSideEmotionCache = createEmotionCache();

type SpeechLabProps = AppProps & {
  emotionCache?: EmotionCache;
};

const SpeechLabApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: SpeechLabProps): JSX.Element => {
  const router = useRouter();
  let debug = Boolean(router.query.debug); // Cast to boolean, if debug param exists it will be true, otherwise false
  if (
    debug &&
    debug === true &&
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
  )
    debug = true;
  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    };
    if (process.env.NEXT_PUBLIC_NODE_ENV) {
      return snippet.max(options);
    }

    return snippet.min(options);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastAlertProvider>
          <VideoPlayerProvider>
            <TranscribeProvider>
              <TranslateProvider>
                <SpeakersProvider>
                  <ExportProvider>
                    <CurrentUserBalanceProvider>
                      <QueryLayout pageProps={pageProps}>
                        <SegmentProvider>
                          <VoiceoverProvider>
                            <CacheProvider value={emotionCache}>
                              <DebugContext.Provider value={debug}>
                                <Head>
                                  <title>Speechlab Speech-to-Speech App</title>
                                  <link href='/icons/favicon.png' />
                                  <meta
                                    property='og:title'
                                    content='Speechlab - Automate Your Dubbing Needs'
                                  />
                                  <meta
                                    property='og:description'
                                    content='Speechlab automates dubbing for audio and video. Upload a file and get an editable transcript, translation, and dub in the same voices. Download captions, subtitles, and dubbed audio/video.'
                                  />

                                  <meta
                                    property='og:image'
                                    content='https://uploads-ssl.webflow.com/62c5c81d8d9a3524f61b2ac7/6501f53e8baed0003b4fb04a_og-image.png'
                                  />
                                  <meta
                                    property='og:url'
                                    content='https://www.speechlab.ai/'
                                  />
                                  {/* Twitter Card Meta Tags */}
                                  <meta
                                    name='twitter:card'
                                    content='summary_large_image'
                                  />
                                  <meta
                                    name='twitter:title'
                                    content='Speechlab - Automate Your Dubbing Needs'
                                  />
                                  <meta
                                    name='twitter:description'
                                    content='Speechlab is used by creators to dub audio and video into new languages.'
                                  />
                                  <meta
                                    name='twitter:image'
                                    content='https://uploads-ssl.webflow.com/62c5c81d8d9a3524f61b2ac7/6501f53e8baed0003b4fb04a_og-image.png'
                                  />
                                </Head>
                                <div>
                                  {process.env.NEXT_PUBLIC_NODE_ENV ? (
                                    <Script
                                      dangerouslySetInnerHTML={{
                                        __html: loadSegment(),
                                      }}
                                      id='segmentScript'
                                    />
                                  ) : (
                                    <Script id='noAnalytics' />
                                  )}
                                  <Component {...pageProps} />
                                </div>
                              </DebugContext.Provider>
                            </CacheProvider>
                          </VoiceoverProvider>
                        </SegmentProvider>
                      </QueryLayout>
                    </CurrentUserBalanceProvider>
                  </ExportProvider>
                </SpeakersProvider>
              </TranslateProvider>
            </TranscribeProvider>
          </VideoPlayerProvider>
        </ToastAlertProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default SpeechLabApp;
