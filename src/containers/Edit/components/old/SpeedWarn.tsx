import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import NorthIcon from '@mui/icons-material/North';

import { LightTooltip } from '~/components/ui';

interface IProps {
  transcriptionLength: number;
  translationLength: number;
  percentage: number;
}

export const SpeedWarn = ({
  percentage,
  transcriptionLength,
  translationLength,
}: IProps) => {
  return (
    <LightTooltip
      placement='bottom-start'
      title={
        <Box width='240px' p='4px 0'>
          <Box display='flex' alignItems='center' gap={1} mb={1}>
            <Box display='flex' alignItems='center'>
              <Box
                sx={{
                  bgcolor: '#79D46EE3',
                  p: '0px 4px 0px 4px',
                  borderRadius: '4px 0px 0px 4px',
                }}
              >
                <Typography
                  variant='caption'
                  color='#fff'
                  fontSize={10}
                  lineHeight='16px'
                >
                  {`${transcriptionLength} characters`}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: '#E2292FE3',
                  p: '0px 4px 0px 4px',
                  borderRadius: '0px 4px 4px 0px',
                }}
              >
                <Typography
                  variant='caption'
                  color='#fff'
                  fontSize={10}
                  lineHeight='16px'
                >
                  {`${translationLength} characters`}
                </Typography>
              </Box>
            </Box>
            <Box display='flex' alignItems='center'>
              <NorthIcon
                sx={{
                  color: '#E2292F',
                  fontSize: 14,
                  transform:
                    translationLength > transcriptionLength
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                }}
              />
              <Typography variant='caption' color='#E2292F'>
                {`${percentage.toFixed(1)}%`}
              </Typography>
            </Box>
          </Box>

          <Typography variant='caption' color='#FFFFFF' fontWeight={400}>
            We recommend that you rewrite it for better dub quality.
          </Typography>
        </Box>
      }
    >
      <ErrorIcon sx={{ color: '#E2292FDE', fontSize: 16, cursor: 'pointer' }} />
    </LightTooltip>
  );
}
