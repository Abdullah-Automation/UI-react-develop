import React from 'react';
import { Box, Typography, styled } from '@mui/material';

interface IVoiceSegment {
  id: string;
  isEditing: boolean;
  data: any;
  onSegmentChange: (id: string, content: string) => void;
}

export const VoiceSegment = ({
  id,
  isEditing = false,
  data,
  onSegmentChange,
}: IVoiceSegment) => {
  const { content } = data;

  const handleSegmentContent = (e: any) => {
    onSegmentChange(id, e.currentTarget.value);
  };

  return (
    <Box>
      {isEditing ? (
        <SegmentInput value={content} onChange={handleSegmentContent} />
      ) : (
        <Typography variant='body1' color='#1B1B1F'>
          {content}
        </Typography>
      )}
    </Box>
  );
}

const SegmentInput = styled(`textarea`)({
  width: '100%',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  color: '#1B1B1F',
  letterSpacing: '0.5px',
  fontFamily: 'Inter,Arial,sans-serif,-apple-system',
  height: 'calc(100vh - 48px - 24px - 88px - 128px - 44px - 32px)',
  padding: 0,
  border: 'none',
  outline: 'none',
  '&:hover': {
    border: 'none',
  },
});
