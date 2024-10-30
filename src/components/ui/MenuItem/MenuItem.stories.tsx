import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/Inbox';

import { theme } from '~/config';

import { CustomAvatar } from '../Avatar';

import { CustomMenuItem } from './MenuItem';

const meta: Meta<typeof CustomMenuItem> = {
  title: 'Components/ui/CustomMenuItem',
  component: CustomMenuItem,
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

type Story = StoryObj<typeof CustomMenuItem>;

export const withIcon: Story = {
  args: {
    type: '1-line',
    leadingIcon: <InboxIcon />,
    primaryText: 'Inbox',
    selected: false,
  },
};

export const withoutIcon: Story = {
  args: {
    type: '1-line',
    secondaryText: 'Inbox',
    selected: false,
  },
};

export const Profile: Story = {
  args: {
    type: '2-line',
    CustomAvatar: <CustomAvatar letter='X' />,
    primaryText: 'Xinyi Zhu',
    secondaryText: 'free trial',
    selected: false,
  },
};
