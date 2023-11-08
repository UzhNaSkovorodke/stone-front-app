import type { Meta, StoryObj } from '@storybook/react'

import { ButtonBase } from './index'

const args: React.ComponentProps<typeof ButtonBase> = {
  children: 'Button',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ButtonBase> = {
  title: 'UIKit/ButtonBase',
  component: ButtonBase,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof ButtonBase>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
