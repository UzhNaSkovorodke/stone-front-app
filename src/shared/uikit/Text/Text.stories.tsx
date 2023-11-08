import type { Meta, StoryObj } from '@storybook/react'

import { Text } from './index'

const args: React.ComponentProps<typeof Text> = {
  children: 'Text content',
  s: '32',
  lh: '40',
  w: '500',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Text> = {
  title: 'UIKit/Text',
  component: Text,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Text>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
