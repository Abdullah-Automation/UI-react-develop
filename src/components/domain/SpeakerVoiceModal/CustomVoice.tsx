import React, { useMemo } from 'react';
import _ from 'lodash';
import { Box, Typography } from '@mui/material';

import { Select } from '~/components/ui';
import { useTranslate } from '~/context';
import { ORIGIN_VOICES } from '~/config';

interface ICustomVoiceProps {
  newDialect: string;
  speakers: any[];
  setSpeakers: (speakers: any[]) => void;
}

export const CustomVoice = ({
  newDialect,
  speakers,
  setSpeakers,
}: ICustomVoiceProps) => {
  const { langAccents } = useTranslate();

  const handleCustomVoiceChange = (e: any, index: number) => {
    speakers[index].voiceMatchingMode = e.target.value;
    setSpeakers([...speakers]);
  };

  const SpeakerVoices = useMemo(() => {
    const nativeMatchingEnabled = langAccents.filter(
      accent => accent?.code === newDialect
    )[0]?.nativeMatchingEnabled;

    return nativeMatchingEnabled ? ORIGIN_VOICES : [ORIGIN_VOICES[0]];
  }, [langAccents, newDialect]);

  return (
    <Box>
      <Box display='grid' gridTemplateColumns='1fr 2fr' gap={2} mt={3}>
        <Typography variant='subtitle1' color='#909094' ml={1}>
          Name
        </Typography>
        <Typography variant='subtitle1' color='#909094'>
          Voice
        </Typography>
      </Box>
      {speakers.map((item, index) => (
        <Box
          key={item.speaker}
          display='grid'
          gridTemplateColumns='1fr 2fr'
          mt={1}
        >
          <Typography
            variant='h6'
            color='#1B1B1F'
            sx={{ display: 'flex', alignItems: 'center' }}
            ml={1}
          >
            {item.speaker}
          </Typography>
          <Box>
            <Select
              disableUnderline
              variant='filled'
              value={
                SpeakerVoices.length === 1 ? 'source' : item.voiceMatchingMode
              }
              sx={{
                flex: 1,
                padding: '5px 0',
                ml: '4px',
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    width: 240,
                  },
                },
              }}
              onChange={(e: any) => handleCustomVoiceChange(e, index)}
              options={SpeakerVoices.map((voice: any) => ({
                name: voice.label,
                value: voice.code,
              }))}
              label={value =>
                SpeakerVoices.filter((accent: any) => accent.code === value)[0]
                  ?.label || 'Select Target Voice'
              }
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
