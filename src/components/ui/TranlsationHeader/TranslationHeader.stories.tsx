import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import Download from '@mui/icons-material/FileDownloadOutlined';
import PostAdd from '@mui/icons-material/PostAdd';

import { theme } from '~/config';

import { IconButton } from '../IconButton';
import { SelectedMenu } from '../SelectMenu';

import { TranslationHeader } from './TranslationHeader';

const meta: Meta<typeof TranslationHeader> = {
  title: 'Components/ui/TranslationHeader',
  component: TranslationHeader,
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

type Story = StoryObj<typeof TranslationHeader>;

export const English: Story = {
  args: {
    selectedMenu: (
      <SelectedMenu
        options={['French', 'German', 'Italian', 'Portuguese', 'Spanish']}
      />
    ),
    iconButtons: [
      <IconButton
        color='neutral'
        icon={<PostAdd />}
        size='medium'
        onClick={() => {}}
      />,
      <IconButton
        color='neutral'
        icon={<Download />}
        size='medium'
        onClick={() => {}}
      />,
    ],
  },
};

export const Spanish: Story = {
  args: {
    selectedMenu: (
      <SelectedMenu
        options={['French', 'German', 'Italian', 'Portuguese', 'Spanish']}
      />
    ),
    iconButtons: [
      <IconButton
        color='neutral'
        icon={<PostAdd />}
        size='medium'
        onClick={() => {}}
      />,
      <IconButton
        color='neutral'
        icon={<Download />}
        size='medium'
        onClick={() => {}}
      />,
    ],
  },
};
