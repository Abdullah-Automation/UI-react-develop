import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import { IconButton } from '../IconButton';
import { DubPanel } from '../DubPanel';
import { SelectedMenu } from '../SelectMenu';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const DubSection = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  // expand/hide panel not implemented
  const [expanded] = useState(true);

  // const togglePanel = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: expanded ? 'fit-content' : '48px',
        height: expanded ? 'fit-content' : '48px',
        border: '1px solid var(--sys-light-Outline-Variant, #C4C5D0)',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: '#C4C5D0',
            padding: '0px 8px 0px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {expanded && (
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{ minHeight: '48px', height: '48px', alignItems: 'center' }}
            >
              <Tab label='Original' {...a11yProps(0)} />
              <Tab label='Dub' {...a11yProps(1)} />
            </Tabs>
          )}
          <IconButton
            color='neutral'
            icon={
              expanded ? (
                <KeyboardDoubleArrowRightIcon />
              ) : (
                <KeyboardDoubleArrowLeftIcon />
              )
            }
          />
        </Box>
        <CustomTabPanel value={value} index={0}>
          <DubPanel isFirstDub />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DubPanel
            isFirstDub={false}
            dubOptions={
              <SelectedMenu
                options={[
                  'Castilian, Original Speaker',
                  'Latin American, Native Speaker',
                  'Latin American, Multiple Speakers',
                ]}
              />
            }
            isDisabled
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};
