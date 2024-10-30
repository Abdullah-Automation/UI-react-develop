import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { TranslationSegment } from './TranslationSegment';

const meta: Meta<typeof TranslationSegment> = {
  title: 'Components/ui/TranslationSegment',
  component: TranslationSegment,
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

type Story = StoryObj<typeof TranslationSegment>;

export const Default: Story = {
  args: {
    startTime: '00:00:01.840',
    endTime: '00:00:08.039',
    textSegment:
      'Viaje de una trenza es un proyecto que nació de mi comprensión del cabello y de cómo es una extensión del alma.',
    speakerLabel: 'Speaker 1',
    characterCount: 57,
    isLoading: true,
  },
};
