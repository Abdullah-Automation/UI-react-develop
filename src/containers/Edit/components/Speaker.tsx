import { useMemo } from 'react';
import { Box, Menu, MenuItem, Typography, Divider } from '@mui/material';

import { TranscriptionApi } from '~/api';
import { useSpeakers, useToast, useProject } from '~/context';

interface ISpeaker {
  currentSpeaker: string;
  retainAudio: boolean;
  anchorSpeaker: null | HTMLElement;
  handleSpeakerClose: () => void;
  handleSelectSpeaker: (speaker: string) => void;
}

export const Speaker = ({
  currentSpeaker,
  anchorSpeaker,
  handleSpeakerClose,
  handleSelectSpeaker,
}: ISpeaker) => {
  const { showErrorToast } = useToast();
  const { project } = useProject();
  const { speakersCtx, setSpeakersCtx } = useSpeakers();

  const newSpeakerTitle = useMemo(() => {
    const speakersData = speakersCtx
      .filter(speaker => speaker !== 'Retain audio')
      .sort((a: string, b: string) => {
        // @ts-ignore
        const indexA = parseInt(a.split(' ')[1], 10);
        // @ts-ignore
        const indexB = parseInt(b.split(' ')[1], 10);
        return indexA - indexB;
      });

    const lastSpeakerIndex =
      speakersData[speakersData.length - 1]?.split(' ')[1];

    return `Speaker ${parseInt(lastSpeakerIndex || '0', 10) + 1}`;
  }, [speakersCtx]);

  const handleNewSpeaker = async () => {
    try {
      const newSpeakers = [...speakersCtx, newSpeakerTitle];
      setSpeakersCtx(newSpeakers);
      await TranscriptionApi.updateTranscription(project.transcriptionId, {
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
      .sort((a: string, b: string) => {
        // @ts-ignore
        const indexA = parseInt(a.split(' ')[1], 10);
        // @ts-ignore
        const indexB = parseInt(b.split(' ')[1], 10);
        return indexA - indexB;
      })
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
          selected={currentSpeaker === speaker}
        >
          <Box
            width='100%'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            onClick={() => handleSelectSpeaker(speaker)}
          >
            <Typography
              color={
                currentSpeaker === speaker ? 'rgba(131, 42, 208, 1)' : '#1B1B1F'
              }
              variant='body2'
            >
              {speaker}
            </Typography>
            {/* {currentSpeaker === speaker && (
              <CheckIcon
                sx={{
                  fontSize: '18px',
                  color: type === 'Transcription' ? '#3A4ADE' : '#832AD0',
                }}
              />
            )} */}
          </Box>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem sx={{ width: '200px' }}>
        <Box onClick={handleNewSpeaker}>
          <Typography color='#1B1B1F' variant='body2'>
            Add a new speaker
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};
