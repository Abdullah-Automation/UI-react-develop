import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import { Button, SvgImage } from '~/components/ui';
import { useVoiceover } from '~/context';

interface IVoicePlay {
  id: string;
}

export const VoicePlay = ({ id = '' }: IVoicePlay) => {
  const { audioSrc, generating } = useVoiceover();

  const handleDownload = () => {
    window.analytics.track(`Voiceover Download`, {
      voiceOverId: id,
    });

    window.location.href = audioSrc;
  };

  const voicePlayer = useMemo(() => {
    return (
      <audio
        key={audioSrc}
        style={{
          width: 'calc(100% - 150px)',
          height: '54px',
        }}
        controls
      >
        <source src={audioSrc} type='audio/ogg' />
        <source src={audioSrc} type='audio/mpeg' />
        Your browser does not support HTML video.
      </audio>
    );
  }, [audioSrc]);

  return (
    <Box
      height='88px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{ borderBottom: '1px solid #E0E1EC' }}
    >
      {generating ? (
        <BeatLoader color='#E0E1EC' />
      ) : audioSrc !== '' ? (
        <Box
          display='flex'
          alignItems='center'
          width='100%'
          gap={3}
          p='5px 32px 5px 16px'
        >
          {voicePlayer}
          <Button
            color='tertiary'
            variant='outlined'
            startIcon={
              <FileDownloadOutlinedIcon
                sx={{ fontSize: 18, color: '#2CBAAD' }}
              />
            }
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
      ) : (
        <SvgImage name='DarkVideoIcon' />
      )}
    </Box>
  );
};
