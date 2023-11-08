import type { Meta, StoryObj } from '@storybook/react'

import { Tag } from './index'

const args: React.ComponentProps<typeof Tag> = {
  children: 'Tag',
  variant: 'button',
  size: 'medium',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tag> = {
  title: 'UIKit/Tag',
  component: Tag,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Tag>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const MetroTag: Story = {
  render: () => {
    return (
      <>
        <Tag size="small"></Tag>
      </>
    )
  },
}
