import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { CharacterLabel } from '../CharacterLabel';
import { Text } from '../Text';

interface TranslationSegmentProps {
  startTime: string;
  endTime: string;
  textSegment: string;
  speakerLabel: string;
  characterCount?: number;
  isLoading: boolean;
}

export const TranslationSegment = ({
  startTime,
  endTime,
  textSegment,
  speakerLabel,
  characterCount,
  isLoading,
}: TranslationSegmentProps) => {
  return (
    <Box
      sx={{
        marginBottom: '10px',
        padding: '16px 12px 16px 24px',
        border: '1px solid var(--sys-light-Outline-Variant, #C4C5D0)',
        display: 'inline-flex',
        gap: '12px',
      }}
    >
      <Box>
        {characterCount !== undefined && (
          <CharacterLabel count={characterCount} />
        )}
        <Text color='gray' variant='body2'>
          {speakerLabel}
        </Text>
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
      <Box style={{ width: '24px' }}>
        {isLoading ? (
          <CircularProgress sx={{ color: 'rgba(127, 50, 218, 1)' }} size={16} />
        ) : null}
      </Box>
    </Box>
  );
};
