import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { CharacterLabel } from './CharacterLabel';

const meta: Meta<typeof CharacterLabel> = {
  title: 'Components/ui/CharacterLabel',
  component: CharacterLabel,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    count: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof CharacterLabel>;

export const Default: Story = {
  args: {
    count: 20,
  },
};
