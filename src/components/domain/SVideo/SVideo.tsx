import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

import { trackVideoSeekClick } from '~/utils/helpers';
import { useVideoPlayerContext } from '~/context';

import { VideoBGToggle } from './VideoBGToggle';

interface ISVideoProps {
  type: string;
  mediaUrl: string;
  seekTime: number;
  onSeeked?: any;
  audioToggleOn?: boolean;
  showToggle: boolean;
  handleBackgroundAudioToggle?: () => void;
}

export const SVideo = ({
  type = 'video',
  mediaUrl = '',
  audioToggleOn,
  showToggle,
  handleBackgroundAudioToggle,
}: ISVideoProps) => {
  const transcriptionVideo = useRef(null);
  const { trackedInfo, handleTrackSegment } = useVideoPlayerContext();

  useEffect(() => {
    if (
      transcriptionVideo.current &&
      !Number.isNaN(trackedInfo.trackedTime) &&
      Number.isFinite(trackedInfo.trackedTime)
    ) {
      if (
        // @ts-ignore
        trackedInfo.trackedTime <= transcriptionVideo.current.currentTime &&
        // @ts-ignore
        transcriptionVideo.current.currentTime <= trackedInfo.endTrackedTIme
      ) {
        // don't track
      } else {
        // @ts-ignore
        transcriptionVideo.current.currentTime = trackedInfo.trackedTime;
      }
    }
  }, [trackedInfo]);

  const handleTrackerClick = () => {
    trackVideoSeekClick();

    if (transcriptionVideo && transcriptionVideo.current) {
      // @ts-ignore
      if (trackedInfo.trackedTime !== transcriptionVideo.current?.currentTime) {
        handleTrackSegment({
          trackedTime:
            // @ts-ignore
            Math.round(transcriptionVideo.current.currentTime * 100) / 100,
          type: 'video',
          endTrackedTIme:
            // @ts-ignore
            Math.round(transcriptionVideo.current.currentTime * 100) / 100,
        });
      }
    }
  };

  return (
    <Box>
      {type === 'audio' ? (
        <Box>
          <audio
            ref={transcriptionVideo}
            onSeeked={handleTrackerClick}
            style={{
              width: 'calc(100% + 24px)',
              height: '54px',
              marginLeft: '-10px',
            }}
            controls
          >
            <source src={mediaUrl} type='audio/mpeg' />
            Your browser does not support HTML video.
          </audio>
        </Box>
      ) : (
        <video
          ref={transcriptionVideo}
          onSeeked={handleTrackerClick}
          width='100%'
          height='294px'
          style={{ background: '#000' }}
          controls
        >
          <source src={mediaUrl} type='video/mp4' />
          Your browser does not support HTML video.
        </video>
      )}
      {handleBackgroundAudioToggle && showToggle && (
        <VideoBGToggle
          type={type}
          audioToggleOn={audioToggleOn}
          handleBackgroundAudioToggle={handleBackgroundAudioToggle}
        />
      )}
    </Box>
  );
};
