import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { theme } from '~/config';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Components/ui/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'onClick' },
    startIcon: {
      control: 'select',
      options: [null, '<AddIcon />', '<DeleteIcon />'],
      mapping: {
        null: null,
        '<AddIcon />': <AddIcon />,
        '<DeleteIcon />': <DeleteIcon />,
      },
    },
    endIcon: {
      control: 'select',
      options: [null, '<AddIcon />', '<DeleteIcon />'],
      mapping: {
        null: null,
        '<AddIcon />': <AddIcon />,
        '<DeleteIcon />': <DeleteIcon />,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Button',
    variant: 'contained',
    size: 'small',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Button',
    variant: 'contained',
    size: 'small',
  },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
    children: 'Button',
    variant: 'contained',
    size: 'small',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    children: 'Button',
    variant: 'contained',
    size: 'small',
  },
};
