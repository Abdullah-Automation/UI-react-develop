import React, { useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { Button } from '~/components/ui';

interface IProps {
  type: string;
  loading: boolean;
  onCancel?: () => void;
  onSave: (autoSave: boolean) => void;
}

export const EditTool = ({ type, loading = false, onSave }: IProps) => {
  const currentColor = useMemo(() => {
    if (type === 'Transcription') {
      return '#3A4ADE';
    }
    if (type === 'Voiceover') {
      return '#2CBAAD';
    }

    return '#832AD0';
  }, [type]);

  return (
    <Box
      position='absolute'
      display='flex'
      alignItems='center'
      sx={{
        zIndex: 9,
        left: '50%',
        transform:
          type === 'Voiceover'
            ? 'translate(-50%, -56px)'
            : 'translate(-50%, 14px)',
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026',
      }}
    >
      <Button
        variant='text'
        color={type === 'Transcription' ? 'primary' : 'secondary'}
        sx={{
          color: '#45464F',
          height: '48px',
          width: '95px',
          borderRadius: '16px',
          gap: '2px',
        }}
        onClick={() => onSave(false)}
        startIcon={
          loading ? (
            <CircularProgress
              sx={{
                color: currentColor,
              }}
              size={18}
            />
          ) : (
            <SaveOutlinedIcon
              sx={{
                color: currentColor,
                fontSize: '20px',
              }}
            />
          )
        }
      >
        Save
      </Button>
    </Box>
  );
};
