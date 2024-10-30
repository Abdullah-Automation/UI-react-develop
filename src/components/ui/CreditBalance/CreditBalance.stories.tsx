import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { CreditBalance } from './CreditBalance';

const meta: Meta<typeof CreditBalance> = {
  title: 'Components/ui/CreditBalance',
  component: CreditBalance,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    balance: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof CreditBalance>;

export const Default: Story = {
  args: {
    balance: '100.0',
  },
};
