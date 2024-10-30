import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { theme } from '~/config';

import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/ui/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onClick: { action: 'onClick' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    icon: <AddIcon />,
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    icon: <AddIcon />,
    color: 'secondary',
  },
};

export const Neutral: Story = {
  args: {
    icon: <AddIcon />,
    color: 'neutral',
  },
};
