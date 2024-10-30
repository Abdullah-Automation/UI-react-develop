import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/LogoutRounded';

import { theme } from '~/config';

import { CreditBalance } from '../CreditBalance';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { CustomAvatar } from '../Avatar';

import { NewPageHeader } from './PageHeader';

const meta: Meta<typeof NewPageHeader> = {
  title: 'Components/ui/PageHeader',
  component: NewPageHeader,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    isEditPage: {
      control: 'boolean',
      description: 'Determines the layout of the header',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NewPageHeader>;

export const EditPage: Story = {
  args: {
    isEditPage: true,
    projectName: 'My Project',
    creditBalance: <CreditBalance balance='100.0' />,
    avatarButton: (
      <CustomAvatar
        letter='X'
        menuItems={[
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
        ]}
      />
    ),
    iconButton: (
      <IconButton
        color='neutral'
        icon={<ArrowBack />}
        size='medium'
        onClick={() => {}}
      />
    ),
    Button: (
      <Button
        color='secondary'
        variant='contained'
        size='small'
        onClick={() => {}}
      >
        Share
      </Button>
    ),
  },
};

export const HomePage: Story = {
  args: {
    isEditPage: false,
    avatarButton: (
      <CustomAvatar
        letter='X'
        menuItems={[
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
        ]}
      />
    ),
    Button: (
      <Button
        color='neutral'
        variant='outlined'
        size='small'
        startIcon={<PaymentIcon />}
        onClick={() => {}}
      >
        Get more credits
      </Button>
    ),
  },
};
