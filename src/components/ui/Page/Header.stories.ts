import type { Meta, StoryObj } from '@storybook/react';

import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'components/examples/Header',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const LoggedIn: Story = {
  args: {},
};

export const LoggedOut: Story = {};
