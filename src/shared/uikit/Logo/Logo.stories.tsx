import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from './index'

const args: React.ComponentProps<typeof Logo> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Logo> = {
  title: 'UIKit/Logo',
  component: Logo,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Logo>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
