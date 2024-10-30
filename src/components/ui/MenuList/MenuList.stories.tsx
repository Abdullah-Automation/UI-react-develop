import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import PaymentIcon from '@mui/icons-material/Payment';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/RemoveCircle';
import Share from '@mui/icons-material/Share';
import Delete from '@mui/icons-material/Delete';
import Rename from '@mui/icons-material/DriveFileRenameOutline';

import { theme } from '~/config';

import { CustomAvatar } from '../Avatar';

import { CustomMenuList } from './MenuList';

const meta: Meta<typeof CustomMenuList> = {
  title: 'Components/ui/CustomMenuList',
  component: CustomMenuList,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  // argTypes: {
  //     count: { control: 'number' },
  // },
};

export default meta;

type Story = StoryObj<typeof CustomMenuList>;

export const LanguageMenu: Story = {
  args: {
    menuItems: [
      {
        type: '1-line',
        secondaryText: 'French',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'German',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Italian',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Portuguese',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Spanish',
        selected: false,
      },
      // Add more menu items as needed
    ],
  },
};

export const VoiceMenu: Story = {
  args: {
    menuItems: [
      {
        type: '1-line',
        secondaryText: 'Original Speaker',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Native Speaker',
        selected: false,
      },
      // Add more menu items as needed
    ],
  },
};

export const SpeakerMenu: Story = {
  args: {
    menuItems: [
      {
        type: '1-line',
        secondaryText: 'Speaker 1',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Speaker 2',
        selected: false,
        // divider: true,
      },
      {
        leadingIcon: <Add />,
        primaryText: 'Add a new speaker',
        type: '1-line',
        divider: true,
      },
      // Add more menu items as needed
    ],
  },
};

export const AccessMenu: Story = {
  args: {
    menuItems: [
      {
        type: '1-line',
        secondaryText: 'Editor',
        selected: false,
      },
      {
        type: '1-line',
        secondaryText: 'Viewer',
        selected: false,
        // divider: true,
      },
      {
        leadingIcon: <Remove />,
        primaryText: 'Remove access',
        type: '1-line',
        divider: true,
      },
      // Add more menu items as needed
    ],
  },
};

export const ProfileMenu: Story = {
  args: {
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

export const ProjectMenu: Story = {
  args: {
    menuItems: [
      {
        leadingIcon: <Share />,
        primaryText: 'Share',
        type: '1-line',
      },
      {
        leadingIcon: <Rename />,
        primaryText: 'Rename',
        type: '1-line',
      },
      {
        leadingIcon: <Delete />,
        primaryText: 'Delete Project',
        type: '1-line',
      },
      // Add more menu items as needed
    ],
  },
};
