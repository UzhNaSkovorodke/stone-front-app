import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../Box'

import { Tag2 } from './index'

const args: React.ComponentProps<typeof Tag2> = {
  children: 'Tag',
  variant: 'white',
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Tag2> = {
  title: 'UIKit/Tag2',
  component: Tag2,
  tags: ['autodocs'],
  args,
}

export default meta
type Story = StoryObj<typeof Tag2>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
}

export const White: Story = {
  args: {
    children: 'Tag',
    variant: 'white',
  },
}

export const Black: Story = {
  render: () => (
    <Box bgColor="neutrals-gray-1" p="3">
      <Tag2 variant="black">Tag</Tag2>
    </Box>
  ),
}

export const MetroTag: Story = {
  render: () => <Tag2 variant="white" type="metro"></Tag2>,
}

export const CustomText: Story = {
  args: {
    children: <span style={{ fontSize: 20, lineHeight: '32px', color: 'red' }}>Tag</span>,
    variant: 'white',
  },
}
