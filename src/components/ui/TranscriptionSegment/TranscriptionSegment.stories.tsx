import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { SelectedMenu } from '../SelectMenu';

import { TranscriptionSegment } from './TranscriptionSegment';

const meta: Meta<typeof TranscriptionSegment> = {
  title: 'Components/ui/TranscriptionSegment',
  component: TranscriptionSegment,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // argTypes: {
  //     initials: { control: 'text' },
  // },
};

export default meta;

type Story = StoryObj<typeof TranscriptionSegment>;

export const Default: Story = {
  args: {
    segmentNumber: '1',
    startTime: '00:00:01.840',
    endTime: '00:00:08.039',
    textSegment:
      'Journey of a Braid is a project that was born out of my understanding of hair and how it is an extension of the soul.',
    speakerLabel: (
      <SelectedMenu
        isSpeakerLabel
        options={['Speaker 1', 'Speaker 2', 'Retain audio']}
      />
    ),
    characterCount: 57,
  },
};
