import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { Text } from './Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  title: 'Components/ui/Text',
  component: Text,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
      ],
    },
    color: {
      control: 'color',
    },
    children: {
      control: 'text',
      name: 'Text Content',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const H1: Story = {
  args: {
    color: 'black',
    variant: 'h1',
    children: 'Sample text',
  },
};

export const H2: Story = {
  args: {
    color: 'black',
    variant: 'h2',
    children: 'Sample text',
  },
};

export const H3: Story = {
  args: {
    color: 'black',
    variant: 'h3',
    children: 'Sample text',
  },
};

export const H4: Story = {
  args: {
    color: 'black',
    variant: 'h4',
    children: 'Sample text',
  },
};

export const H5: Story = {
  args: {
    color: 'black',
    variant: 'h5',
    children: 'Sample text',
  },
};

export const H6: Story = {
  args: {
    color: 'black',
    variant: 'h6',
    children: 'Sample text',
  },
};

export const subtitle1: Story = {
  args: {
    color: 'black',
    variant: 'subtitle1',
    children: 'Sample text',
  },
};

export const subtitle2: Story = {
  args: {
    color: 'black',
    variant: 'subtitle2',
    children: 'Sample text',
  },
};

export const body1: Story = {
  args: {
    color: 'black',
    variant: 'body1',
    children: 'Sample text',
  },
};

export const body2: Story = {
  args: {
    color: 'black',
    variant: 'body2',
    children: 'Sample text',
  },
};

export const caption: Story = {
  args: {
    color: 'black',
    variant: 'caption',
    children: 'Sample text',
  },
};

export const overline: Story = {
  args: {
    color: 'black',
    variant: 'caption',
    children: 'Sample text',
  },
};
