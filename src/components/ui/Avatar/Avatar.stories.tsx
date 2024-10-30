import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/LogoutRounded';

import { theme } from '~/config';

import { CustomAvatar } from './Avatar';

const meta: Meta<typeof CustomAvatar> = {
  title: 'Components/ui/CustomAvatar',
  component: CustomAvatar,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof CustomAvatar>;

export const AvatarButton: Story = {
  args: {
    letter: 'X',
    menuItems: [
      {
        primaryText: 'Username',
        secondaryText: 'Account settings',
        type: '2-line',
        CustomAvatar: <CustomAvatar letter='X' />,
      },
      {
        leadingIcon: <PaymentIcon />,
        primaryText: 'Buy more credits',
        type: '1-line',
      },
      {
        divider: true,
        leadingIcon: <LogoutIcon />,
        primaryText: 'Log out',
        type: '1-line',
      },
      // Add more menu items as needed
    ],
  },
};

export const AvatarIcon: Story = {
  args: {
    letter: 'X',
  },
};
