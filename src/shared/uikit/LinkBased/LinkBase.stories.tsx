import type { Meta, StoryObj } from '@storybook/react'

import { LinkBase } from './index'

const args: React.ComponentProps<typeof LinkBase> = {
  children: 'Link',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof LinkBase> = {
  title: 'UIKit/LinkBase',
  component: LinkBase,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof LinkBase>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}
