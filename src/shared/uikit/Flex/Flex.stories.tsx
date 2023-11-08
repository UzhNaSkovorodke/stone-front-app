import type { Meta, StoryObj } from '@storybook/react'

import { Flex } from './index'

const args: React.ComponentProps<typeof Flex> = {
  children: 'Flex content',
  ai: 'center',
  jc: 'center',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Flex> = {
  title: 'UIKit/Flex',
  component: Flex,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Flex>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
