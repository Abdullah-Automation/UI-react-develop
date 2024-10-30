import React from 'react';
import { Box, styled } from '@mui/material';

import { VideoWrapper } from './VideoWrapper';
import { LanguageHeader } from './LanguageHeader';
// @ts-ignore
import { SegmentsWrapper } from './SegmentsWrapper';

export const TranscriptAndTranslationEditor = () => {
  return (
    <Wrapper>
      <Box position='relative' flex={2.5}>
        <Box display='flex'>
          <LanguageHeader />
          <LanguageHeader type='Translation' />
        </Box>
        <SegmentsWrapper />
      </Box>
      <VideoWrapper />
    </Wrapper>
  );
};

const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  border: '1px solid #E0E1EC',
  width: '100%',
  boxSizing: 'border-box',
});
