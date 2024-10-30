import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { DubSection } from './DubSection';

const meta: Meta<typeof DubSection> = {
  title: 'Components/ui/DubSection',
  component: DubSection,
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

type Story = StoryObj<typeof DubSection>;

export const Default: Story = {};
