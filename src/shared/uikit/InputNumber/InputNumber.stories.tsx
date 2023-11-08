import type { Meta, StoryObj } from '@storybook/react'

import { InputNumber } from './index'

const args: React.ComponentProps<typeof InputNumber> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InputNumber> = {
  title: 'UIKit/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof InputNumber>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    integerScale: 4,
  },
}
