import { useMemo } from 'react';
import { Box, Menu, MenuItem, Typography, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { TranscriptionApi } from '~/api';
import { useSpeakers, useToast } from '~/context';

interface ISpeaker {
  currentSpeaker: string;
  transId: string;
  type: string;
  retainAudio: boolean;
  anchorSpeaker: null | HTMLElement;
  handleSpeakerClose: () => void;
  handleSelectSpeaker: (speaker: string) => void;
}

export const Speaker = ({
  currentSpeaker,
  anchorSpeaker,
  transId,
  type,
  handleSpeakerClose,
  handleSelectSpeaker,
}: ISpeaker) => {
  const { showErrorToast } = useToast();
  const { speakersCtx, setSpeakersCtx } = useSpeakers();

  const newSpeakerTitle = useMemo(() => {
    const speakersData = speakersCtx
      .filter(speaker => speaker !== 'Retain audio')
      .sort();

    const lastSpeakerIndex =
      speakersData[speakersData.length - 1]?.split(' ')[1];

    return `Speaker ${parseInt(lastSpeakerIndex || '0', 10) + 1}`;
  }, [speakersCtx]);

  const handleNewSpeaker = async () => {
    try {
      const newSpeakers = [...speakersCtx, newSpeakerTitle];
      setSpeakersCtx(newSpeakers);
      await TranscriptionApi.updateTranscription(transId, {
        speakers: newSpeakers,
      });
    } catch (e) {
      setSpeakersCtx(speakersCtx.splice(-1));
      showErrorToast('Creating new speaker went wrong.');
      console.log('UpdateTranscription Error', e);
    }
  };

  const orderedSpeakers = useMemo(() => {
    return speakersCtx
      .filter(speaker => speaker !== 'Retain audio')
      .sort()
      .concat('Retain audio');
  }, [speakersCtx]);

  if (speakersCtx.length === 0) {
    return null;
  }

  return (
    <Menu anchorEl={anchorSpeaker} open onClose={handleSpeakerClose}>
      {orderedSpeakers.map(speaker => (
        <MenuItem
          key={speaker}
          sx={{ width: '200px' }}
          onClick={handleSpeakerClose}
        >
          <Box
            width='100%'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            onClick={() => handleSelectSpeaker(speaker)}
          >
            <Typography color='#1B1B1F' variant='subtitle2'>
              {speaker}
            </Typography>
            {currentSpeaker === speaker && (
              <CheckIcon
                sx={{
                  fontSize: '18px',
                  color: type === 'Transcription' ? '#3A4ADE' : '#832AD0',
                }}
              />
            )}
          </Box>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem sx={{ width: '200px' }}>
        <Box onClick={handleNewSpeaker}>
          <Typography color='#1B1B1F' variant='subtitle2'>
            Add a new speaker
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
}
