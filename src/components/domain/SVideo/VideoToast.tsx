import React from 'react';
import { Typography } from '@mui/material';

import { useTranslate } from '~/context';

import { TooltipWrapper } from './Style';

interface IVideoToastProps {
  type: string;
  options: any[];
}

export const VideoToast = ({ type = 'video', options = [] }: IVideoToastProps) => {
  const { targetAccent, targetVoice } = useTranslate();

  const dubLabel = (lang: string) =>
    options.filter(option => option.code === lang)[0].label;

  return (
    <TooltipWrapper type={type}>
      <Typography
        variant='caption'
        fontWeight={400}
        color='#fff'
        sx={{ display: 'block' }}
      >
        Now playing:
      </Typography>
      <Typography variant='caption' fontWeight={400} color='#fff'>
        {dubLabel(targetAccent)},{' '}
        {targetVoice === 'native'
          ? 'Native speaker'
          : targetVoice === 'source'
          ? 'Original speaker'
          : 'Multiple voices'}
      </Typography>
    </TooltipWrapper>
  );
}
