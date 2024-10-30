import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { SelectedMenu } from './SelectMenu';

const meta: Meta<typeof SelectedMenu> = {
  title: 'Components/ui/SelectedMenu',
  component: SelectedMenu,
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

type Story = StoryObj<typeof SelectedMenu>;

export const LanguageSelection: Story = {
  args: {
    options: ['Select', 'French', 'German', 'Italian', 'Portuguese', 'Spanish'],
  },
};

export const Dubselection: Story = {
  args: {
    options: [
      'Select',
      'Castilian, Original Speaker',
      'Latin American, Native Speaker',
      'Latin American, Multiple Speakers',
    ],
  },
};

export const Accentselection: Story = {
  args: {
    isSpeakerLabel: false,
    options: ['Select', 'Spanish – Latin American', 'Spanish – Castilian'],
  },
};

export const Voiceselection: Story = {
  args: {
    isSpeakerLabel: false,
    options: ['Select', 'Original Speaker', 'Native Speaker'],
  },
};

export const Speakerlabelselection: Story = {
  args: {
    isSpeakerLabel: true,
    options: ['Speaker 1', 'Speaker 2', 'Speaker 3'],
  },
};
