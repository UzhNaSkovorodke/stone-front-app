import type { Meta, StoryObj } from '@storybook/react'

import { Collapse } from './index'

const args: React.ComponentProps<typeof Collapse> = {
  children: null,
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Collapse> = {
  title: 'UIKit/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Collapse>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    isOpen: true,
    children: 'Content '.repeat(200),
  },
}
