import React from 'react';
import { Box, IconButton } from '@mui/material';

import { SvgImage } from '../../ui/SvgImg';

import { PlayWrapper, AntSwitch, LightTooltip } from './Style';
// import { SVideoMenu } from './SVideoMenu';

interface IVideoBGToggleProps {
  type: string;
  // options: any[];
  audioToggleOn?: boolean;
  handleBackgroundAudioToggle?: () => void;
}

export const VideoBGToggle = ({
  type = 'video',
  // options = [],
  audioToggleOn,
  handleBackgroundAudioToggle,
}: IVideoBGToggleProps) => {
  return (
    <PlayWrapper type={type}>
      <Box display='flex' flexDirection='column' alignItems='flex-end' gap={1}>
        <LightTooltip
          placement='top'
          title={`Background: ${audioToggleOn ? 'On' : 'Off'}`}
        >
          <IconButton sx={{ p: 0, bgcolor: '#1B1B1F !important' }}>
            <AntSwitch
              defaultChecked={audioToggleOn}
              onChange={handleBackgroundAudioToggle}
              checkedIcon={
                <SvgImage height={12} width={12} name='AudioOnIcon' />
              }
              icon={<SvgImage height={12} width={12} name='AudioOffIcon' />}
              color='secondary'
            />
          </IconButton>
        </LightTooltip>
        {/* <SVideoMenu options={options} /> */}
      </Box>
    </PlayWrapper>
  );
};
