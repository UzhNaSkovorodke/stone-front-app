import type { Meta, StoryObj } from '@storybook/react'

import { Box } from './index'

const args: React.ComponentProps<typeof Box> = {
  children: 'Content inside the Box',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Box> = {
  title: 'UIKit/Box',
  component: Box,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Box>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
