import React from 'react';
import { Box } from '@mui/material';

import { CharacterLabel } from '../CharacterLabel';
import { Text } from '../Text';

interface TranscriptionSegmentProps {
  startTime: string;
  endTime: string;
  textSegment: string;
  speakerLabel: React.ReactElement;
  characterCount?: number;
  segmentNumber: string;
}

export const TranscriptionSegment = ({
  startTime,
  endTime,
  textSegment,
  speakerLabel,
  characterCount,
  segmentNumber,
}: TranscriptionSegmentProps) => {
  return (
    <Box
      sx={{
        marginBottom: '10px',
        padding: '16px',
        border: '1px solid var(--sys-light-Outline-Variant, #C4C5D0)',
        display: 'inline-flex',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          gap: '12px',
        }}
      >
        <Text color='gray' variant='subtitle2'>
          {segmentNumber}
        </Text>
        <Box sx={{ width: '84px' }}>
          {characterCount !== undefined && (
            <CharacterLabel count={characterCount} />
          )}
          {speakerLabel}
        </Box>
      </Box>
      <Box>
        <Text
          color='gray'
          variant='subtitle2'
        >{`${startTime} – ${endTime}`}</Text>
        <Text color='black' variant='body2'>
          {textSegment}
        </Text>
      </Box>
    </Box>
  );
};
