import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { SvgImage } from '~/components/ui';

interface ILoadingVideo {
  mediaCategory: string;
}

export const LoadingVideo = ({ mediaCategory }: ILoadingVideo) => {
  const isAudio = mediaCategory === 'audio';
  return (
    <VideoWrapper className='video' isaudio={isAudio ? 'true' : 'false'}>
      <EmptyVideo>
        <SvgImage name='DarkVideoIcon' />
      </EmptyVideo>
    </VideoWrapper>
  );
};

export const VideoWrapper = styled(Box)<{ isaudio?: string }>(
  ({ isaudio }) => ({
    position: 'relative',
    background: '#fff',
    borderBottom: '1px solid #E0E1EC',
    height: isaudio === 'true' ? '186px' : '294px',
    '&:hover': {
      cursor: 'pointer',
    },
  })
);

export const EmptyVideo = styled(Box)({
  width: '100%',
  height: '100%',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
