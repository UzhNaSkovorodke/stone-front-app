import type { Meta, StoryObj } from '@storybook/react'

import { InputGroupped } from './index'
import { InputNumber } from '../InputNumber'

const args: React.ComponentProps<typeof InputGroupped> = {}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InputGroupped> = {
  title: 'UIKit/InputGroupped',
  component: InputGroupped,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof InputGroupped>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: (args) => (
    <InputGroupped {...args}>
      <InputNumber />
      <InputNumber post="м²" />
    </InputGroupped>
  ),
}

export const Three: Story = {
  render: (args) => (
    <InputGroupped {...args}>
      <InputNumber />
      <InputNumber />
      <InputNumber />
    </InputGroupped>
  ),
}
