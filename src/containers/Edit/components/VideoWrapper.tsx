import React, { useEffect, useState } from 'react';
import { Box, Tab, Typography, IconButton } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import { LightTooltip } from '~/components/ui';
import { useTranscribe, useTranslate } from '~/context';

import { VideoPlayer } from './VideoPlayer';

export const VideoWrapper = () => {
  const { isTranslated } = useTranslate();
  const { showVideoSection, setShowVideoSection } = useTranscribe();

  const [currentVideo, setCurrentVideo] = useState<string>('original');

  // @ts-ignore
  const handleVideoSwitch = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentVideo(newValue);
  };

  const handleVideoSection = () => {
    setShowVideoSection(!showVideoSection);
  };

  useEffect(() => {
    if (isTranslated !== true) {
      setCurrentVideo('original');
    }
  }, [isTranslated]);

  return (
    <Box
      style={{
        width: showVideoSection ? '100%' : '48px',
        flex: showVideoSection ? 1 : 'none',
        height: 'calc(100vh - 50px)',
        borderLeft: '1px solid #E0E1EC',
      }}
    >
      <TabContext value={currentVideo}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          p={showVideoSection ? '0 16px 0 0' : '0 8px 0'}
          sx={{
            borderBottom: showVideoSection ? '1px solid #E0E1EC' : 'none',
          }}
        >
          <TabList
            sx={{ '& .MuiTabs-indicator': { display: 'none' } }}
            onChange={handleVideoSwitch}
          >
            <Tab
              label={
                <TabLabel videoType='original' currentType={currentVideo} />
              }
              value='original'
            />
            <Tab
              label={<TabLabel videoType='dub' currentType={currentVideo} />}
              value='dub'
              // eslint-disable-next-line no-unneeded-ternary
              disabled={isTranslated !== true ? true : false}
            />
          </TabList>

          <LightTooltip
            placement='bottom'
            title={`${showVideoSection ? 'Hide' : 'Show'} video panel`}
          >
            <IconButton onClick={handleVideoSection} color='neutral'>
              <KeyboardDoubleArrowRightIcon
                sx={{
                  transform: `${
                    showVideoSection ? 'rotate(0deg)' : 'rotate(180deg)'
                  }`,
                }}
              />
            </IconButton>
          </LightTooltip>
        </Box>
        {showVideoSection && (
          <>
            <TabPanel value='original'>
              <VideoPlayer type='original' />
            </TabPanel>
            <TabPanel value='dub'>
              <VideoPlayer type='dub' />
            </TabPanel>
          </>
        )}
      </TabContext>
    </Box>
  );
};

interface ITabLabel {
  videoType: string;
  currentType: string;
}

const TabLabel = ({ videoType = 'original', currentType }: ITabLabel) => {
  return (
    <Typography
      variant='h6'
      color={videoType === currentType ? '#1B1B1F' : '#909094'}
      sx={{ textTransform: 'capitalize' }}
    >
      {videoType}
    </Typography>
  );
};
