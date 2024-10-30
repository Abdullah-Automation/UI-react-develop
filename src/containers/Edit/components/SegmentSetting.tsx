import React, { memo, useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';

import { CharacterLabel } from '~/components/ui';
import { useSegment } from '~/context/SegmentContext';
import {
  getPercentageBetweenGaps,
  isValideSpeedUpLanguage,
} from '~/utils/helpers';
import { useTranslate } from '~/context';
import {
  LIMIT_SPEED_UP_TRANSCRIPTION_COUNT,
  MIN_SPEED_UP_PERCENTAGE,
} from '~/config';

import { Speaker } from './Speaker';

interface ISegmentSetting {
  segment: any;
  type: string;
  transcriptionSegment?: string;
  index: any;
}

export const SegmentSetting = memo(
  ({ segment, type, index, transcriptionSegment = '' }: ISegmentSetting) => {
    const { id, retainAudio = false, speaker, content } = segment ?? {};
    const [currentSpeaker, setCurrentSpeaker] = useState<string>(speaker);
    const [anchorSpeaker, setAnchorSpeaker] = useState<null | HTMLElement>(
      null
    );
    const open = Boolean(anchorSpeaker);
    const { saveSegmentSpeaker } = useSegment();
    const { targetLang } = useTranslate();

    useEffect(() => {
      setCurrentSpeaker(speaker);
    }, [speaker]);

    const handleSpeakerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (type === 'transcription') {
        setAnchorSpeaker(event.currentTarget);
        window.analytics.track(`Speaker click ${event.currentTarget}`, {});
      }
    };

    const handleSelectSpeaker = (speaker: string) => {
      setCurrentSpeaker(speaker);

      window.analytics.track(`Speaker change`, { speaker, segmentId: id });

      if (speaker === 'Retain audio') {
        window.analytics.track(`User Retaining audio`, {
          speaker,
          segmentId: id,
        });
      }
      saveSegmentSpeaker(index, speaker);
    };

    const handleSpeakerClose = () => {
      setAnchorSpeaker(null);
      window.analytics.track(`Handle speaker close`, {});
    };

    const loadVariant = useMemo(() => {
      const contentLengthForComparison = content ? content.length : 0;

      if (
        type === 'translation' &&
        !retainAudio &&
        !retainAudio &&
        currentSpeaker !== 'Retain audio' &&
        isValideSpeedUpLanguage(targetLang) &&
        getPercentageBetweenGaps(
          transcriptionSegment.length,
          contentLengthForComparison
        ) > MIN_SPEED_UP_PERCENTAGE &&
        transcriptionSegment.length > LIMIT_SPEED_UP_TRANSCRIPTION_COUNT
      ) {
        return 'secondary';
      }
      return 'primary';
    }, [
      content,
      currentSpeaker,
      retainAudio,
      targetLang,
      transcriptionSegment.length,
      type,
    ]);

    return (
      <Box width='112px'>
        {content?.length !== undefined && (
          <CharacterLabel count={content?.length} variant={loadVariant} />
        )}
        <Typography
          color='#909094'
          variant='body2'
          sx={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            ...(type === 'transcription' && {
              '&:hover': {
                color: '#1B1B1F',
              },
            }),
          }}
          onClick={handleSpeakerClick}
        >
          {retainAudio ? 'Retain audio' : currentSpeaker}
        </Typography>

        {open && (
          <Speaker
            retainAudio={retainAudio}
            currentSpeaker={currentSpeaker}
            anchorSpeaker={anchorSpeaker}
            handleSpeakerClose={handleSpeakerClose}
            handleSelectSpeaker={handleSelectSpeaker}
          />
        )}
      </Box>
    );
  }
);
