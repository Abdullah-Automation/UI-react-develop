import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '~/config';

import { SelectedMenu } from '../SelectMenu';

import { DubPanel } from './DubPanel';

const meta: Meta<typeof DubPanel> = {
  title: 'Components/ui/DubPanel',
  component: DubPanel,
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

type Story = StoryObj<typeof DubPanel>;

export const FirstDub: Story = {
  args: {
    isFirstDub: true,
  },
};

export const Dubpanel: Story = {
  args: {
    isFirstDub: false,
    dubOptions: (
      <SelectedMenu
        options={[
          'Castilian, Original Speaker',
          'Latin American, Native Speaker',
          'Latin American, Multiple Speakers',
        ]}
      />
    ),
    isDisabled: true,
  },
};
