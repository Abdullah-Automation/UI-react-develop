import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import Download from '@mui/icons-material/FileDownloadOutlined';

import { theme } from '~/config';

import { IconButton } from '../IconButton';

import { TranscriptionHeader } from './TranscriptionHeader';

const meta: Meta<typeof TranscriptionHeader> = {
  title: 'Components/ui/TranscriptionHeader',
  component: TranscriptionHeader,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // argTypes: {
  // },
};

export default meta;

type Story = StoryObj<typeof TranscriptionHeader>;

export const English: Story = {
  args: {
    sourceLanguage: 'English',
    iconButton: (
      <IconButton
        color='neutral'
        icon={<Download />}
        size='medium'
        onClick={() => {}}
      />
    ),
  },
};

export const Spanish: Story = {
  args: {
    sourceLanguage: 'Spanish',
    iconButton: (
      <IconButton
        color='neutral'
        icon={<Download />}
        size='medium'
        onClick={() => {}}
      />
    ),
  },
};
