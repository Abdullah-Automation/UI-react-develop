import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import SpeakerModal from './SpeakerModal';

const meta: Meta<typeof SpeakerModal> = {
  title: 'Components/ui/SpeakerModal',
  component: SpeakerModal,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SpeakerModal>;

export const Default: Story = {
  args: {},
};
